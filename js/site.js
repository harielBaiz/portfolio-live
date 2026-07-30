// Mark JS as available immediately — prevents .reveal opacity:0 flash
document.documentElement.classList.add('js');

/**
 * site.js
 * ─────────────────────────────────────────────────────────
 * Hariel Baiz · Portfolio
 *
 * Features:
 *   1. Theme toggle   (light ↔ dark)  — persisted to localStorage
 *   2. Language switcher scaffold     — data-i18n hooks, EN/ES strings
 *   3. Scroll reveal  (IntersectionObserver on .reveal)
 *   4. Reading progress bar           (case study pages)
 * ─────────────────────────────────────────────────────────
 */

/* ─────────────────────────────────────────────────────────
   1. THEME TOGGLE
   ─────────────────────────────────────────────────────────
   Writes data-theme="dark" | "light" on <html>.
   Falls back to OS preference, persists via localStorage.
───────────────────────────────────────────────────────── */
(function initTheme() {
  const stored = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
}

/* ─────────────────────────────────────────────────────────
   2. LANGUAGE SWITCHER
   ─────────────────────────────────────────────────────────
   Usage: add data-i18n="key" to any element.
   Call setLang('es') to switch to Spanish.
   Call setLang('en') to switch back to English.

   Keys follow BEM-ish dot notation: "section.key"

   IMPORTANT — this dictionary is the source of truth for
   every element that has a data-i18n attribute, on every
   page. setLang('en') runs on load (see init below), so the
   `en` value here always overwrites whatever text currently
   sits in the HTML. To change copy for a data-i18n'd element:
     1. Find the key on the element in the HTML (e.g. nav.brand)
     2. Update the value for that key below (both `en` and,
        once ready, `es`)
   Editing the HTML text alone will NOT stick — it gets
   overwritten by this dictionary on the next load.
   Only nav.brand/nav.linkedin-style keys used identically
   across all 6 pages belong here; body copy that's unique
   to one page (About bio, case study prose) is NOT wired to
   data-i18n and can be edited directly in its HTML file.
───────────────────────────────────────────────────────── */
const i18n = {
  en: {
    /* Nav — identical across all 6 pages */
    'nav.brand':    'HAB',
    'nav.work':     'Work',
    'nav.about':    'About',
    'nav.resume':   'Resume',
    'nav.contact':  'Contact',
    'nav.linkedin': 'LinkedIn',

    /* Landing — hero */
    'hero.cta.work':  'See my work',
    'hero.cta.about': 'About me',

    /* Landing — work section */
    'work.label': 'Featured Work',

    /* Card CTAs */
    'card.cta': 'Read Case Study',

    /* Landing — contact (em tag intentional, rendered via innerHTML) */
    'contact.title': "Let's work together",
    'contact.sub':   'Open to product design and design systems roles. Remote-friendly.',

    /* Footer */
    'footer.copy': '© 2026 H. Ariel Baiz · Senior Product Designer',
  },

  es: {
    /* Nav — identical across all 6 pages */
    'nav.brand':    'HAB',
    'nav.work':     'Proyectos',
    'nav.about':    'Sobre mí',
    'nav.resume':   'CV',
    'nav.contact':  'Contacto',
    'nav.linkedin': 'LinkedIn',

    /* Landing — hero */
    'hero.cta.work':  'Ver proyectos',
    'hero.cta.about': 'Sobre mí',

    /* Landing — work */
    'work.label': 'Proyectos',

    /* Card CTAs */
    'card.cta': 'Ver Case Study',

    /* Landing — contact (em tag intentional, rendered via innerHTML) */
    'contact.title': 'Trabajemos <em>juntos</em>',
    'contact.sub':   'Abierto a roles de diseño de producto y design systems. Trabajo remoto.',

    /* Footer */
    'footer.copy': '© 2026 H. Ariel Baiz · Diseñador de Producto Senior',
  },
};

let currentLang = localStorage.getItem('portfolio-lang') || 'en';

function setLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update all elements with data-i18n attribute
  // (innerHTML, not textContent — some values like contact.title carry
  // an intentional <em> tag that textContent would silently strip)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const str = i18n[lang][key];
    if (str !== undefined) el.innerHTML = str;
  });

  // Update all elements with data-i18n-placeholder (inputs)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const str = i18n[lang][key];
    if (str !== undefined) el.setAttribute('placeholder', str);
  });

  // Update lang button active state
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.querySelector('.lang-active').textContent = lang.toUpperCase();
    btn.querySelector('.lang-label').textContent =
      lang === 'en' ? 'ES' : 'EN';
  });
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en');
}

/* ─────────────────────────────────────────────────────────
   3. SCROLL REVEAL
   ─────────────────────────────────────────────────────────
   Any element with class .reveal animates in when visible.
───────────────────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────
   4. READING PROGRESS BAR
   ─────────────────────────────────────────────────────────
   Updates .progress-fill width based on scroll position.
   Only runs when the element exists (case study pages).
───────────────────────────────────────────────────────── */
function initProgressBar() {
  const fill = document.getElementById('progressFill');
  if (!fill) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    fill.style.width = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   5. MEDIA LIGHTBOX
   ─────────────────────────────────────────────────────────
   Click any .media-block video or image to open it fullscreen
   in an overlay. Close via ×, backdrop, or Esc.
───────────────────────────────────────────────────────── */
function initMediaLightbox() {
  const media = document.querySelectorAll('.media-block video, .media-block img, .ai-banner img');
  if (!media.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'video-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Media lightbox');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'video-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';

  const lbVideo = document.createElement('video');
  lbVideo.controls = true;
  lbVideo.setAttribute('playsinline', '');
  lbVideo.style.display = 'none';

  const lbImg = document.createElement('img');
  lbImg.alt = '';
  lbImg.style.display = 'none';

  overlay.appendChild(closeBtn);
  overlay.appendChild(lbVideo);
  overlay.appendChild(lbImg);
  document.body.appendChild(overlay);

  function openVideo(src) {
    lbImg.style.display = 'none';
    lbImg.src = '';
    lbVideo.style.display = '';
    lbVideo.src = src;
    lbVideo.play().catch(() => {});
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function openImage(src, alt) {
    lbVideo.style.display = 'none';
    lbVideo.pause();
    lbVideo.src = '';
    lbImg.style.display = '';
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    lbVideo.pause();
    lbVideo.src = '';
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  media.forEach(el => {
    el.addEventListener('click', () => {
      if (el.tagName === 'VIDEO') {
        const src = el.querySelector('source')?.src || el.src;
        openVideo(src);
      } else {
        openImage(el.src, el.alt);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─────────────────────────────────────────────────────────
   8. TESTIMONIAL WORD REVEAL
   ─────────────────────────────────────────────────────────
   Splits each .testimonial-quote into per-word spans, then
   fades them in one by one when the quote scrolls into view,
   as if the person were speaking the line out loud.
───────────────────────────────────────────────────────── */
function initTestimonialReveal() {
  const quotes = document.querySelectorAll('.testimonial-quote');
  if (!quotes.length) return;

  quotes.forEach(quote => {
    const nodes = Array.from(quote.childNodes);
    const words = [];
    quote.textContent = '';

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part.length) return;
          if (/^\s+$/.test(part)) {
            quote.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'tq-word';
            span.textContent = part;
            quote.appendChild(span);
            words.push(span);
          }
        });
      } else {
        // Element node (e.g. <code>) — animate as a single word
        const span = document.createElement('span');
        span.className = 'tq-word';
        span.appendChild(node.cloneNode(true));
        quote.appendChild(span);
        words.push(span);
      }
    });

    words.forEach((w, i) => { w.style.transitionDelay = (i * 35) + 'ms'; });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-talking');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.testimonial-card').forEach(card => observer.observe(card));
}

/* ─────────────────────────────────────────────────────────
   9. MOBILE NAV (hamburger)
   ─────────────────────────────────────────────────────────
   Toggles the .nav-links dropdown panel below 640px.
   Closes on link click or click outside the nav.
───────────────────────────────────────────────────────── */
function initMobileNav() {
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    const nav = btn.closest('nav');
    const links = nav && nav.querySelector('.nav-links');
    if (!links) return;

    function close() {
      links.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  });
}

/* ─────────────────────────────────────────────────────────
   10. COPY EMAIL TO CLIPBOARD
   ─────────────────────────────────────────────────────────
   Button next to the contact email pill. Reads the already-
   injected email text from the sibling [data-email] element
   and copies it, swapping the icon to a checkmark briefly.
───────────────────────────────────────────────────────── */
function initCopyEmail() {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const emailEl = btn.closest('.email-copy-group')?.querySelector('[data-email]');
      const email = emailEl ? emailEl.textContent.trim() : '';
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        btn.classList.add('is-copied');
        btn.setAttribute('aria-label', 'Email copied');
        setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.setAttribute('aria-label', 'Copy email address');
        }, 1800);
      });
    });
  });
}

function initCarouselHoverSlow() {
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  if (!viewport || !track) return;

  // Web Animations API: changing playbackRate scales speed from the
  // animation's current position forward, unlike editing animation-duration
  // in CSS, which recalculates progress from elapsed-time / duration and
  // makes the track visibly jump back toward its start position.
  viewport.addEventListener('mouseenter', () => {
    track.getAnimations().forEach(anim => { anim.playbackRate = 0.25; });
  });
  viewport.addEventListener('mouseleave', () => {
    track.getAnimations().forEach(anim => { anim.playbackRate = 1; });
  });
}

/* ─────────────────────────────────────────────────────────
   INIT — runs after DOM is ready
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Wire theme toggle button(s)
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Apply stored language on page load (lang toggle UI removed for now,
  // but data-i18n content still resolves via setLang so this stays wired)
  setLang(currentLang);

  // Mobile nav (hamburger)
  initMobileNav();

  // Scroll reveal
  initReveal();

  // Progress bar (case studies)
  initProgressBar();

  // Media lightbox (images + videos)
  initMediaLightbox();

  // Testimonial word-by-word reveal
  initTestimonialReveal();

  // Copy email to clipboard button
  initCopyEmail();

  // Carousel slows on hover instead of pausing
  initCarouselHoverSlow();

  // Sync OS theme preference change (no stored value)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('portfolio-theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
});


/* ─────────────────────────────────────────────────────────
   6. EMAIL INJECTION — avoids Cloudflare obfuscation
   All mailto: links are written by JS at runtime.
   Replace YOUR_EMAIL below with your actual address.
───────────────────────────────────────────────────────── */
(function injectEmail() {
  // Split the email to prevent static scraping too
  const user   = 'hariel.baiz';
  const domain = 'gmail.com';
  const email  = user + '@' + domain;
  const mailto = 'mailto:' + email;

  document.querySelectorAll('[data-email]').forEach(el => {
    el.href        = mailto;
    el.textContent = email;
  });
  document.querySelectorAll('[data-email-href]').forEach(el => {
    el.href = mailto;
  });
})();


/* ─────────────────────────────────────────────────────────
   7. CASE STUDY INDEX — active section highlight
   Watches each section with an id and marks the matching
   .cs-index link as .is-active while it's in view.
───────────────────────────────────────────────────────── */
(function initCsIndex() {
  const nav = document.querySelector('.cs-index');
  const indexLinks = document.querySelectorAll('.cs-index a');
  if (!indexLinks.length) return;

  const sections = [...indexLinks].map(a =>
    document.querySelector(a.getAttribute('href'))
  ).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      indexLinks.forEach(a => a.classList.remove('is-active'));
      const active = document.querySelector(
        `.cs-index a[href="#${entry.target.id}"]`
      );
      if (active) active.classList.add('is-active');
    });
  }, {
    rootMargin: '-15% 0px -75% 0px'  /* fires when section top is ~15% from viewport top */
  });

  sections.forEach(s => observer.observe(s));

  // Reveal the fixed left rail only once the hero subtitle has
  // scrolled out of view — keeps it out of the way of the hero.
  const heroSub = document.querySelector('.hero-sub');
  if (nav && heroSub) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      nav.classList.toggle('is-visible', scrolledPast);
    }, { threshold: 0 });
    heroObserver.observe(heroSub);
  }
})();
