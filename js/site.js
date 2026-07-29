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
   Add Spanish translations to the `es` object below.
───────────────────────────────────────────────────────── */
const i18n = {
  en: {
    /* Nav */
    'nav.work':    'Work',
    'nav.about':   'About',
    'nav.resume':  'Resume',
    'nav.contact': 'Contact',

    /* Landing — hero */
    'hero.eyebrow': 'Product Designer · Design Systems',
    'hero.title':   'I design products that scale — and systems that hold them together.',
    'hero.sub':     '6+ years building B2B SaaS at Bitsight. I bridge design and engineering through token-based systems, research-driven decisions, and interfaces that make sense.',
    'hero.cta.work':  'See my work',
    'hero.cta.about': 'About me',

    /* Landing — work section */
    'work.label': 'Featured Work',
    'work.title': 'Three projects. One consistent thread.',
    'work.sub':   'Research-backed decisions, systems thinking, and a focus on outcomes — not just deliverables.',

    /* Card CTAs */
    'card.cta': 'Read Case Study',

    /* Landing — skills */
    'skills.label': 'Skills & Tools',
    'skills.title': 'What I bring to the table',

    /* Landing — about */
    'about.label': 'About',
    'about.title': 'Design that earns its place',
    'about.p1': "I'm a product designer with 6+ years building B2B SaaS tools. Most of that time was spent at Bitsight — a cybersecurity company where design decisions have real consequences for security teams managing hundreds of vendors.",
    'about.p2': "I care most about the work that happens between wireframes and shipping: the alignment conversations, the edge-case inventory, the moment a token system makes a color-blind mode trivially easy to add. Good design is often invisible. Broken design always isn't.",
    'about.p3': 'Outside of product work, I\'m drawn to typography, editorial design, and building things that feel considered — not assembled.',
    'about.cta.resume': 'View Resume ↗',
    'about.cta.hello':  'Say hello',

    /* Landing — contact */
    'contact.title': "Let's work together",
    'contact.sub':   'Open to product design and design systems roles. Remote-friendly.',

    /* Footer */
    'footer.copy': '© 2026 Hariel Baiz · Product Designer',
  },

  es: {
    /* Nav */
    'nav.work':    'Proyectos',
    'nav.about':   'Sobre mí',
    'nav.resume':  'CV',
    'nav.contact': 'Contacto',

    /* Landing — hero */
    'hero.eyebrow': 'Diseñador de Producto · Design Systems',
    'hero.title':   'Diseño productos que escalan — y los sistemas que los sostienen.',
    'hero.sub':     'Más de 6 años construyendo SaaS B2B en Bitsight. Conecto diseño e ingeniería a través de sistemas de tokens, decisiones basadas en investigación e interfaces que realmente tienen sentido.',
    'hero.cta.work':  'Ver proyectos',
    'hero.cta.about': 'Sobre mí',

    /* Landing — work */
    'work.label': 'Proyectos',
    'work.title': 'Tres proyectos. Un hilo conductor.',
    'work.sub':   'Decisiones respaldadas por investigación, pensamiento sistémico y foco en resultados — no solo en entregables.',

    /* Card CTAs */
    'card.cta': 'Ver Case Study',

    /* Landing — skills */
    'skills.label': 'Habilidades y Herramientas',
    'skills.title': 'Lo que aporto al equipo',

    /* Landing — about */
    'about.label': 'Sobre mí',
    'about.title': 'Diseño que se justifica solo',
    'about.p1': 'Soy diseñador de producto con más de 6 años construyendo herramientas SaaS B2B. La mayor parte de ese tiempo lo pasé en Bitsight — una empresa de ciberseguridad donde las decisiones de diseño tienen consecuencias reales para los equipos de seguridad.',
    'about.p2': 'Me importa el trabajo que ocurre entre los wireframes y el lanzamiento: las conversaciones de alineación, el inventario de edge cases, el momento en que un sistema de tokens hace que el modo daltónico sea trivialmente fácil de implementar.',
    'about.p3': 'Fuera del trabajo de producto, me atrae la tipografía, el diseño editorial y construir cosas que se sientan pensadas — no ensambladas.',
    'about.cta.resume': 'Ver CV ↗',
    'about.cta.hello':  'Hola',

    /* Landing — contact */
    'contact.title': 'Trabajemos juntos',
    'contact.sub':   'Abierto a roles de diseño de producto y design systems. Trabajo remoto.',

    /* Footer */
    'footer.copy': '© 2026 Hariel Baiz · Diseñador de Producto',
  },
};

let currentLang = localStorage.getItem('portfolio-lang') || 'en';

function setLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const str = i18n[lang][key];
    if (str !== undefined) el.textContent = str;
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
