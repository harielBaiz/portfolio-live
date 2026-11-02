/* ask.js — AI assistant: right-side drawer (nav "Ask AI") + inline input on the landing page.
 *
 * Talks to the portfolio-agent server (POST /api/chat). The feature is OFF unless the
 * server URL is known, so the live site never shows a dead button:
 *   - on localhost / 127.0.0.1 / file:// it defaults to http://localhost:3000/api/chat
 *   - in production set  window.ASK_CONFIG = { apiUrl: 'https://…/api/chat' }  before this script.
 *
 * UI copy lives in js/site.js (keys ask.* and nav.ask, EN + ES), like the rest of the site.
 * States: empty (suggestions), thinking, answer, no answer, error (network / server / timeout / rate limit).
 */
(function () {
  'use strict';

  var cfg = window.ASK_CONFIG || {};
  var host = location.hostname;
  var isLocal = !host || host === 'localhost' || host === '127.0.0.1';
  // Production backend (Cloudflare Worker, see agent/). Only used on the real site; other hosts stay hidden.
  var PROD_API = 'https://portfolio-assistant.hariel-baiz.workers.dev/api/chat';
  var isProd = host === 'harielbaiz.com' || host === 'www.harielbaiz.com';
  var API = cfg.apiUrl || (isLocal ? 'http://localhost:3000/api/chat' : isProd ? PROD_API : '');
  if (!API) return;

  var STORE_KEY = 'ask-chat-v1';
  var NO_ANSWER = '[[NO_ANSWER]]';
  var TIMEOUT_MS = 30000;
  var MAX_STORED = 20;

  var CHIPS = ['ask.chip1', 'ask.chip2', 'ask.chip3', 'ask.chip4'];
  var ICON = {
    warn: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    help: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    fresh: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
  };

  /* ── i18n (strings come from the site.js dictionary) ───────────── */
  function lang() { return (document.documentElement.lang || 'en').slice(0, 2) === 'es' ? 'es' : 'en'; }
  function t(key, vars) {
    var d = (typeof i18n !== 'undefined' && i18n[lang()] && i18n[lang()][key]) ||
            (typeof i18n !== 'undefined' && i18n.en && i18n.en[key]) || key;
    if (vars) Object.keys(vars).forEach(function (k) { d = d.replace('{' + k + '}', vars[k]); });
    return d;
  }
  function translate(root) {
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'))); });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var s = t(el.getAttribute('data-i18n-aria'));
      el.setAttribute('aria-label', s);
      if (el.hasAttribute('data-ask-titled')) el.setAttribute('title', s);
    });
  }

  /* ── tiny DOM helpers ──────────────────────────────────────────── */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html; // only ever static markup or our own icons
    return n;
  }
  function txt(s) { return document.createTextNode(s); }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function isPhone() { return window.matchMedia && window.matchMedia('(max-width: 640px)').matches; }

  /* ── state ─────────────────────────────────────────────────────── */
  var msgs = [];           // { role: 'user'|'bot', kind: 'text'|'noanswer', text }
  var busy = false;
  var lastTrigger = null;
  var thinkingEl = null, thinkTimers = [], inflight = null;
  var drawer, log, body, form, input, sendBtn;

  function load() {
    try { var s = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]'); if (Array.isArray(s)) msgs = s.slice(-MAX_STORED); } catch (e) { msgs = []; }
  }
  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-MAX_STORED))); } catch (e) {}
  }

  /* ── safe rich text: **bold**, "- " lists, links to our own pages ─ */
  var LINK_RE = /(\/?(?:case-study-[a-z-]+|about|how-i-work)\.html|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+|(?:www\.)?harielbaiz\.com|linkedin\.com\/in\/[\w-]+)/gi;
  var HOSTS = /^(www\.)?(linkedin\.com|harielbaiz\.com|github\.com)$/i;

  function linkFor(raw) {
    var clean = raw.replace(/[.,;:!?]+$/, '');
    var href = null, external = false;
    if (/^\/?(case-study-[a-z-]+|about|how-i-work)\.html$/i.test(clean)) href = clean.replace(/^\//, '');
    else if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(clean)) {
      // only Ariel's own address becomes a link (the one the site already exposes)
      var own = emailHref().replace(/^mailto:/i, '').toLowerCase();
      if (own && clean.toLowerCase() === own) href = 'mailto:' + clean;
    }
    else {
      var u = /^https?:\/\//i.test(clean) ? clean : 'https://' + clean;
      try { if (HOSTS.test(new URL(u).hostname)) { href = u; external = true; } } catch (e) {}
    }
    return href ? { href: href, text: clean, rest: raw.slice(clean.length), external: external } : null;
  }
  function appendInline(parent, text) {
    text.split(/(\*\*[^*]+\*\*)/).forEach(function (part) {
      if (!part) return;
      var holder = parent;
      if (/^\*\*[^*]+\*\*$/.test(part)) { holder = el('strong'); parent.appendChild(holder); part = part.slice(2, -2); }
      var last = 0, m; LINK_RE.lastIndex = 0;
      while ((m = LINK_RE.exec(part))) {
        var l = linkFor(m[0]);
        if (!l) continue;
        if (m.index > last) holder.appendChild(txt(part.slice(last, m.index)));
        var a = el('a'); a.href = l.href; a.textContent = l.text;
        if (l.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        holder.appendChild(a);
        if (l.rest) holder.appendChild(txt(l.rest));
        last = m.index + m[0].length;
      }
      if (last < part.length) holder.appendChild(txt(part.slice(last)));
    });
  }
  function renderRich(parent, text) {
    String(text).replace(/\r/g, '').trim().split(/\n{2,}/).forEach(function (block) {
      var lines = block.split('\n');
      if (lines.every(function (l) { return /^\s*[-•*]\s+/.test(l); })) {
        var ul = el('ul');
        lines.forEach(function (l) { var li = el('li'); appendInline(li, l.replace(/^\s*[-•*]\s+/, '')); ul.appendChild(li); });
        parent.appendChild(ul);
      } else {
        var p = el('p');
        lines.forEach(function (l, i) { if (i) p.appendChild(el('br')); appendInline(p, l); });
        parent.appendChild(p);
      }
    });
  }

  /* ── build the drawer ──────────────────────────────────────────── */
  function build() {
    drawer = el('aside', 'ask-drawer',
      '<header class="ask-head">' +
        '<div class="ask-head__text"><h2 id="ask-title" data-i18n="ask.title"></h2><p class="ask-sub" data-i18n="ask.sub"></p></div>' +
        '<div class="ask-head__actions">' +
          '<button type="button" class="ask-icon-btn" data-ask-new data-ask-titled data-i18n-aria="ask.new">' + ICON.fresh + '</button>' +
          '<button type="button" class="ask-icon-btn" data-ask-close data-ask-titled data-i18n-aria="ask.close">' + ICON.close + '</button>' +
        '</div>' +
      '</header>' +
      '<div class="ask-body"><div class="ask-log" role="log" aria-live="polite" aria-relevant="additions"></div></div>' +
      '<form class="ask-form" novalidate>' +
        '<div class="ask-field">' +
          '<label class="sr-only" for="ask-input" data-i18n="ask.placeholder"></label>' +
          '<textarea id="ask-input" rows="1" maxlength="1000" autocomplete="off" data-i18n-placeholder="ask.placeholder"></textarea>' +
          '<button type="submit" class="ask-send" data-i18n-aria="ask.send" disabled>' + ICON.send + '</button>' +
        '</div>' +
        '<p class="ask-disclaimer" data-i18n="ask.disclaimer"></p>' +
      '</form>');
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-labelledby', 'ask-title');
    drawer.inert = true;
    document.body.appendChild(drawer);
    translate(drawer);

    body = drawer.querySelector('.ask-body');
    log = drawer.querySelector('.ask-log');
    form = drawer.querySelector('.ask-form');
    input = drawer.querySelector('#ask-input');
    sendBtn = drawer.querySelector('.ask-send');

    drawer.addEventListener('click', function (e) {
      var c = e.target.closest('[data-ask-close]'); if (c) return close();
      if (e.target.closest('[data-ask-new]')) return reset();
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });
    input.addEventListener('input', function () { grow(); syncSend(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(); });
    // chips (delegated: they live inside the log)
    log.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-ask-chip]');
      if (chip) send(t(chip.getAttribute('data-ask-chip')));
    });

    load();
    renderAll();
  }

  function grow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; }
  function syncSend() { sendBtn.disabled = busy || !input.value.trim(); }

  /* ── open / close ─────────────────────────────────── */
  function isOpen() { return drawer && drawer.classList.contains('is-open'); }

  function open(trigger, question) {
    if (!drawer) build();
    if (trigger) lastTrigger = trigger;
    var menu = document.querySelector('.nav-toggle[aria-expanded="true"]');
    if (menu) menu.click();
    drawer.inert = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    if (isPhone()) document.documentElement.classList.add('ask-lock');
    scrollDown(true);
    setTimeout(function () { if (isOpen()) input.focus({ preventScroll: true }); }, reduceMotion && reduceMotion.matches ? 0 : 280);
    if (question) send(question);
  }
  function close() {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    document.documentElement.classList.remove('ask-lock');
    drawer.inert = true;
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
  }

  /* ── rendering ─────────────────────────────────────────────────── */
  function scrollDown(instant) {
    var smooth = !instant && !(reduceMotion && reduceMotion.matches);
    requestAnimationFrame(function () {
      if (body.scrollTo) body.scrollTo({ top: body.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
      else body.scrollTop = body.scrollHeight;
    });
  }
  function chipsRow(keys) {
    var row = el('div', 'ask-chips');
    keys.forEach(function (k) {
      var b = el('button', 'ask-chip'); b.type = 'button';
      b.setAttribute('data-ask-chip', k); b.setAttribute('data-i18n', k); b.textContent = t(k);
      row.appendChild(b);
    });
    return row;
  }
  function renderEmpty() {
    var box = el('div', 'ask-empty');
    var p = el('p'); p.setAttribute('data-i18n', 'ask.intro'); p.textContent = t('ask.intro');
    box.appendChild(p); box.appendChild(chipsRow(CHIPS));
    log.appendChild(box);
  }
  function userBubble(text) {
    var m = el('div', 'ask-msg ask-msg--user');
    var who = el('span', 'sr-only'); who.setAttribute('data-i18n', 'ask.you'); who.textContent = t('ask.you') + ': ';
    var b = el('div', 'ask-bubble'); b.textContent = text;
    m.appendChild(who); m.appendChild(b); return m;
  }
  function botBubble(text) {
    var m = el('div', 'ask-msg ask-msg--bot');
    var who = el('span', 'sr-only'); who.setAttribute('data-i18n', 'ask.bot'); who.textContent = t('ask.bot') + ': ';
    var b = el('div', 'ask-bubble'); renderRich(b, text);
    m.appendChild(who); m.appendChild(b); return m;
  }
  function emailHref() { var a = document.querySelector('[data-email-href]'); var h = a && a.getAttribute('href'); return h && /^mailto:/.test(h) ? h : ''; }
  function linkedinHref() { var a = document.querySelector('.nav-cta[href*="linkedin.com"]') || document.querySelector('a[href*="linkedin.com/in/"]'); return a ? a.href : ''; }

  function noAnswerCard(text) {
    var m = el('div', 'ask-msg ask-msg--bot ask-msg--noanswer');
    var c = el('div', 'ask-card ask-card--soft');
    var head = el('div', 'ask-card__head');
    head.appendChild(el('span', 'ask-card__icon', ICON.help));
    var h = el('h3', 'ask-card__title'); h.setAttribute('data-i18n', 'ask.noanswer.title'); h.textContent = t('ask.noanswer.title');
    head.appendChild(h); c.appendChild(head);
    if (text) { var p = el('p', 'ask-card__text'); p.textContent = text; c.appendChild(p); }
    var b = el('p', 'ask-card__text'); b.setAttribute('data-i18n', 'ask.noanswer.body'); b.textContent = t('ask.noanswer.body'); c.appendChild(b);
    var actions = el('div', 'ask-card__actions');
    var mail = emailHref(), li = linkedinHref();
    if (mail) { var a = el('a', 'ask-btn'); a.href = mail; a.setAttribute('data-i18n', 'ask.noanswer.email'); a.textContent = t('ask.noanswer.email'); actions.appendChild(a); }
    if (li) { var l = el('a', 'ask-btn ask-btn--ghost'); l.href = li; l.target = '_blank'; l.rel = 'noopener noreferrer'; l.textContent = 'LinkedIn'; actions.appendChild(l); }
    if (actions.children.length) c.appendChild(actions);
    var tr = el('p', 'ask-card__try'); tr.setAttribute('data-i18n', 'ask.noanswer.try'); tr.textContent = t('ask.noanswer.try'); c.appendChild(tr);
    c.appendChild(chipsRow(CHIPS.slice(0, 2)));
    m.appendChild(c); return m;
  }

  /* Daily-limit UI: a small "questions left" note, and a card when the budget is used up. */
  function noteNode(key) {
    var m = el('div', 'ask-msg ask-msg--bot ask-msg--note');
    var p = el('p', 'ask-note'); p.setAttribute('data-i18n', key); p.textContent = t(key);
    m.appendChild(p); return m;
  }
  function limitCard(kind) {
    var k = kind === 'busy' ? 'ask.busy' : 'ask.limit';
    var m = el('div', 'ask-msg ask-msg--bot ask-msg--noanswer');
    var c = el('div', 'ask-card ask-card--soft');
    var head = el('div', 'ask-card__head');
    head.appendChild(el('span', 'ask-card__icon', ICON.help));
    var h = el('h3', 'ask-card__title'); h.setAttribute('data-i18n', k + '.title'); h.textContent = t(k + '.title');
    head.appendChild(h); c.appendChild(head);
    var b = el('p', 'ask-card__text'); b.setAttribute('data-i18n', k + '.body'); b.textContent = t(k + '.body'); c.appendChild(b);
    var actions = el('div', 'ask-card__actions');
    var mail = emailHref(), li = linkedinHref();
    if (mail) { var a = el('a', 'ask-btn'); a.href = mail; a.setAttribute('data-i18n', 'ask.noanswer.email'); a.textContent = t('ask.noanswer.email'); actions.appendChild(a); }
    if (li) { var l = el('a', 'ask-btn ask-btn--ghost'); l.href = li; l.target = '_blank'; l.rel = 'noopener noreferrer'; l.textContent = 'LinkedIn'; actions.appendChild(l); }
    if (actions.children.length) c.appendChild(actions);
    m.appendChild(c); return m;
  }
  function showLimit(kind) {
    msgs.push({ role: 'bot', kind: 'limit', text: kind }); save();
    add(limitCard(kind));
    input.disabled = true; syncSend();
  }

  function renderAll() {
    log.innerHTML = '';
    var lastMsg = msgs[msgs.length - 1];
    input.disabled = !!(lastMsg && lastMsg.kind === 'limit'); syncSend();
    if (!msgs.length) { renderEmpty(); return; }
    msgs.forEach(function (m) {
      if (m.role === 'user') log.appendChild(userBubble(m.text));
      else if (m.kind === 'noanswer') log.appendChild(noAnswerCard(m.text));
      else if (m.kind === 'note') log.appendChild(noteNode(m.text));
      else if (m.kind === 'limit') log.appendChild(limitCard(m.text));
      else log.appendChild(botBubble(m.text));
    });
  }
  function add(node) {
    var empty = log.querySelector('.ask-empty'); if (empty) empty.remove();
    log.appendChild(node); scrollDown();
  }

  /* ── thinking indicator ────────────────────────────────────────── */
  function showThinking() {
    var m = el('div', 'ask-msg ask-msg--bot ask-msg--thinking');
    var b = el('div', 'ask-bubble ask-bubble--thinking');
    b.appendChild(el('span', 'ask-dots', '<i></i><i></i><i></i>'));
    var s = el('span', 'ask-status'); s.textContent = t('ask.thinking');
    b.appendChild(s); m.appendChild(b); thinkingEl = m; add(m);
    var steps = [[4000, 'ask.thinking2'], [10000, 'ask.thinking3']];
    steps.forEach(function (st) {
      thinkTimers.push(setTimeout(function () {
        s.textContent = t(st[1]); s.classList.remove('is-swap'); void s.offsetWidth; s.classList.add('is-swap');
      }, st[0]));
    });
  }
  function hideThinking() {
    thinkTimers.forEach(clearTimeout); thinkTimers = [];
    if (thinkingEl) { thinkingEl.remove(); thinkingEl = null; }
  }

  /* ── errors ────────────────────────────────────────────────────── */
  function errorCard(kind, retryAfter) {
    var m = el('div', 'ask-msg ask-msg--bot ask-msg--error');
    m.setAttribute('role', 'alert');
    var c = el('div', 'ask-card ask-card--error');
    var head = el('div', 'ask-card__head');
    head.appendChild(el('span', 'ask-card__icon', ICON.warn));
    var p = el('p', 'ask-card__text');
    var key = kind === 'network' ? 'ask.err.network' : kind === 'timeout' ? 'ask.err.timeout' : kind === 'rate' ? 'ask.err.rate' : 'ask.err.server';
    p.textContent = t(key, { n: retryAfter || 0 });
    head.appendChild(p); c.appendChild(head);
    var retry = el('button', 'ask-btn ask-btn--ghost'); retry.type = 'button';
    retry.textContent = t('ask.retry');
    c.appendChild(retry); m.appendChild(c);
    var timer = null;
    if (kind === 'rate' && retryAfter) {
      var left = retryAfter; retry.disabled = true;
      var tick = function () {
        left -= 1; p.textContent = t('ask.err.rate', { n: Math.max(left, 0) });
        retry.textContent = t('ask.retry') + (left > 0 ? ' (' + left + ')' : '');
        if (left <= 0) { clearInterval(timer); retry.disabled = false; retry.textContent = t('ask.retry'); }
      };
      timer = setInterval(tick, 1000);
      retry.textContent = t('ask.retry') + ' (' + left + ')';
    }
    retry.addEventListener('click', function () { if (timer) clearInterval(timer); m.remove(); request(); });
    return m;
  }

  /* ── talking to the server ─────────────────────────────────────── */
  function history() {
    return msgs.filter(function (m) { return m.kind !== 'note' && m.kind !== 'limit'; }).slice(-6).map(function (m) { return { role: m.role === 'user' ? 'user' : 'assistant', content: m.text }; });
  }
  function send(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    if (!isOpen()) { open(lastTrigger, null); }
    msgs.push({ role: 'user', kind: 'text', text: text.slice(0, 1000) }); save();
    add(userBubble(text.slice(0, 1000)));
    input.value = ''; grow();
    request();
  }
  function setBusy(v) { busy = v; drawer.classList.toggle('is-busy', v); syncSend(); }

  function request() {
    setBusy(true); showThinking();
    var ctrl = new AbortController(), timedOut = false;
    var timer = setTimeout(function () { timedOut = true; ctrl.abort(); }, TIMEOUT_MS);
    inflight = ctrl;
    fetch(API, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal,
      body: JSON.stringify({ messages: history(), lang: lang() })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data }; });
    }).then(function (r) {
      clearTimeout(timer);
      if (!r.res.ok) { var err = new Error('http'); err.status = r.res.status; err.data = r.data; throw err; }
      var reply = String((r.data && r.data.reply) || '').trim();
      hideThinking(); setBusy(false);
      if (!reply) return add(errorCard('server'));
      if (reply.indexOf(NO_ANSWER) === 0) {
        var rest = reply.slice(NO_ANSWER.length).trim();
        msgs.push({ role: 'bot', kind: 'noanswer', text: rest }); save();
        add(noAnswerCard(rest));
      } else {
        msgs.push({ role: 'bot', kind: 'text', text: reply.replace(NO_ANSWER, '').trim() }); save();
        add(botBubble(reply));
      }
      var left = r.data && r.data.remaining;
      if (typeof left === 'number') {
        if (left === 2 || left === 1) {
          var key = left === 2 ? 'ask.left2' : 'ask.left1';
          msgs.push({ role: 'bot', kind: 'note', text: key }); save();
          add(noteNode(key));
        } else if (left === 0) {
          showLimit('daily');
        }
      }
    }).catch(function (e) {
      clearTimeout(timer); hideThinking(); setBusy(false);
      if (e && e.name === 'AbortError') { if (timedOut) add(errorCard('timeout')); return; }
      if (e && e.status === 429 && e.data && (e.data.code === 'daily_limit' || e.data.code === 'busy')) return showLimit(e.data.code === 'busy' ? 'busy' : 'daily');
      if (e && e.status === 429) return add(errorCard('rate', (e.data && e.data.retryAfter) || 60));
      if (e && e.status) { if (window.console) console.warn('[ask] server error', e.status, e.data); return add(errorCard('server')); }
      add(errorCard('network'));
    }).then(function () { if (isOpen()) input.focus({ preventScroll: true }); });
  }

  function reset() {
    if (inflight) { try { inflight.abort(); } catch (e) {} }
    hideThinking(); setBusy(false);
    msgs = []; save(); renderAll(); input.value = ''; grow(); input.focus();
  }

  /* ── hook up the page ──────────────────────────────────────────── */
  function init() {
    document.querySelectorAll('[data-ask-open]').forEach(function (btn) {
      var li = btn.closest('li'); if (li) li.hidden = false; btn.hidden = false;
      btn.addEventListener('click', function () { open(btn); });
    });
    document.querySelectorAll('form[data-ask-inline]').forEach(function (f) {
      f.hidden = false;
      var field = f.querySelector('textarea');
      var fit = function () { field.style.height = 'auto'; field.style.height = Math.min(field.scrollHeight, 160) + 'px'; };
      field.addEventListener('input', fit);
      field.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); f.requestSubmit(); }
      });
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = field.value.trim();
        if (!q) { field.focus(); return; }
        field.value = ''; fit();
        open(field, q);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
