/* ================================================================
   GRAŻYNA NOWAK — JOURNEY OF HOPE
   script.js · Phase 001 Enhancement Layer
================================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────────
   1. NAV — scroll state + mobile toggle
──────────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

window.toggleMenu = function () {
  const open = navMobile.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
};

// Close mobile nav on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMobile.classList.contains('open')) {
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a, .nav-mobile a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });


/* ────────────────────────────────────────────────────────────────
   2. HERO PARALLAX
──────────────────────────────────────────────────────────────── */
const heroImg = document.querySelector('.hero-img');
const heroContent = document.querySelector('.hero-content');

if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `translateY(${y * 0.35}px)`;
      heroContent.style.transform = `translateY(${y * 0.15}px)`;
      heroContent.style.opacity = 1 - (y / (window.innerHeight * 0.75));
    }
  }, { passive: true });
}


/* ────────────────────────────────────────────────────────────────
   3. INTERSECTION OBSERVER — staggered reveal
──────────────────────────────────────────────────────────────── */
const revealTargets = document.querySelectorAll(
  '.timeline-item, .hope-quote, .update-card, .about-fact, ' +
  '.family-grid, .section-title, .about-lead, .update-video-card, ' +
  '.auction-detail, .auction-poster-wrap'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
revealTargets.forEach((el, i) => {
  const siblings = el.parentElement.querySelectorAll(el.tagName + '.' + [...el.classList].find(c => c.includes('-item') || c.includes('-quote') || c.includes('-fact') || c.includes('-card')) || '');
  const idx = [...siblings].indexOf(el);
  el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});


/* ────────────────────────────────────────────────────────────────
   4. COUNTER ANIMATION — about stats
──────────────────────────────────────────────────────────────── */
function animateCount(el, target, suffix = '') {
  const isDecimal = String(target).includes('.');
  const duration = 1400;
  const start = performance.now();
  const from = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * eased;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target.querySelector('.fact-number');
      if (!el || el.dataset.counted) return;
      el.dataset.counted = 'true';
      const raw = el.textContent.trim();
      const suffix = raw.replace(/[\d.]/g, '');
      const num = parseFloat(raw);
      animateCount(el, num, suffix);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-fact').forEach(el => counterObserver.observe(el));


/* ────────────────────────────────────────────────────────────────
   5. HOPE PARTICLE CANVAS — floating light dots in the hope section
──────────────────────────────────────────────────────────────── */
const hopeSection = document.querySelector('.hope');

if (hopeSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hope-canvas';
  hopeSection.insertBefore(canvas, hopeSection.firstChild);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = hopeSection.offsetWidth;
    canvas.height = hopeSection.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 10;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '45,90,61' : '196,119,122';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.opacity -= 0.0008;
      if (this.y < -10 || this.opacity <= 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = Array.from({ length: 40 }, () => {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      return p;
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(animateParticles);
  }

  const particleObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      resizeCanvas();
      initParticles();
      animateParticles();
    } else {
      cancelAnimationFrame(animFrame);
    }
  });
  particleObserver.observe(hopeSection);

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  }, { passive: true });
}


/* ────────────────────────────────────────────────────────────────
   6. SMOOTH ANCHOR SCROLL with offset
──────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ────────────────────────────────────────────────────────────────
   7. TIMELINE PROGRESS LINE — fills as user scrolls through it
──────────────────────────────────────────────────────────────── */
const timeline = document.querySelector('.timeline');

if (timeline) {
  const progressLine = document.createElement('div');
  progressLine.className = 'timeline-progress';
  timeline.insertBefore(progressLine, timeline.firstChild);

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    const timelineH = timeline.offsetHeight;
    const scrolled = Math.max(0, windowH * 0.6 - rect.top);
    const pct = Math.min(scrolled / timelineH, 1) * 100;
    progressLine.style.height = pct + '%';
  }, { passive: true });
}


/* ────────────────────────────────────────────────────────────────
   8. SUPPORT SECTION — pulse heartbeat on the CTA button
──────────────────────────────────────────────────────────────── */
const supportBtn = document.querySelector('.btn-support');

if (supportBtn) {
  let pulseTimeout;

  const pulseObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      function pulse() {
        supportBtn.classList.add('pulse');
        setTimeout(() => supportBtn.classList.remove('pulse'), 700);
        pulseTimeout = setTimeout(pulse, 3200);
      }
      pulseTimeout = setTimeout(pulse, 1200);
    } else {
      clearTimeout(pulseTimeout);
    }
  }, { threshold: 0.5 });

  pulseObserver.observe(supportBtn);
}


/* ────────────────────────────────────────────────────────────────
   9. FAMILY IMAGE — subtle Ken Burns effect on scroll into view
──────────────────────────────────────────────────────────────── */
const familyImgWrap = document.querySelector('.family-image-wrap');

if (familyImgWrap) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      familyImgWrap.classList.add('ken-burns');
    }
  }, { threshold: 0.3 }).observe(familyImgWrap);
}


/* ────────────────────────────────────────────────────────────────
   10. QUOTE CARDS — cursor glow follow effect
──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.hope-quote').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', x + '%');
    card.style.setProperty('--glow-y', y + '%');
    card.classList.add('glowing');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('glowing');
  });
});


/* ────────────────────────────────────────────────────────────────
   11. SCROLL PROGRESS BAR — top of page
──────────────────────────────────────────────────────────────── */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}, { passive: true });


/* ────────────────────────────────────────────────────────────────
   12. TIMELINE CARDS — tilt on hover (desktop only)
──────────────────────────────────────────────────────────────── */
if (window.innerWidth > 900 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ────────────────────────────────────────────────────────────────
   13. SECTION EYEBROW TYPEWRITER — for section labels
──────────────────────────────────────────────────────────────── */
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      if (el.dataset.typed) return;
      el.dataset.typed = 'true';
      el.textContent = '';
      el.style.borderRight = '1.5px solid currentColor';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => el.style.borderRight = 'none', 400);
        }
      }, 40);
      labelObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));


/* ────────────────────────────────────────────────────────────────
   14. SHARE BUTTON — native share API or clipboard fallback
──────────────────────────────────────────────────────────────── */
const shareBtn = document.getElementById('shareBtn');

if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Grażyna Nowak — Journey of Hope',
      text: 'A mother\'s fight. A family\'s strength. A community\'s support. Please share and support Grażyna.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = 'Link copied!';
        setTimeout(() => shareBtn.textContent = 'Share This Page', 2000);
      }
    } catch (err) {
      console.log('Share cancelled');
    }
  });
}


/* ────────────────────────────────────────────────────────────────
   15. CHARITY AUCTION — poster lightbox modal
──────────────────────────────────────────────────────────────── */
const auctionModal = document.getElementById('auctionModal');
const auctionPosterBtn = document.getElementById('auctionPosterBtn');
const auctionModalBackdrop = document.getElementById('auctionModalBackdrop');
const auctionModalClose = document.getElementById('auctionModalClose');

if (auctionModal && auctionPosterBtn) {
  function openAuctionModal() {
    auctionModal.classList.add('open');
    auctionModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeAuctionModal() {
    auctionModal.classList.remove('open');
    auctionModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  auctionPosterBtn.addEventListener('click', openAuctionModal);
  auctionModalBackdrop.addEventListener('click', closeAuctionModal);
  auctionModalClose.addEventListener('click', closeAuctionModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && auctionModal.classList.contains('open')) closeAuctionModal();
  });
}


/* ────────────────────────────────────────────────────────────────
   16. INIT LOG
──────────────────────────────────────────────────────────────── */
console.log(
  '%c Grażyna Nowak — Journey of Hope ',
  'background: #2D5A3D; color: #fff; font-size: 14px; padding: 6px 12px; border-radius: 4px; font-family: serif;'
);
console.log('%c Phase 001 · Foundation Build · script.js loaded', 'color: #C4777A; font-size: 11px;');
