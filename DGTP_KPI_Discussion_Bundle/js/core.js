'use strict';
// ── LOADER ──────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) { l.classList.add('hidden'); setTimeout(() => l.remove(), 500); }
    document.querySelectorAll('.prog-fill').forEach(b => setTimeout(() => b.classList.add('animated'), 300));
  }, 1950);
});
// ── SCROLL PROGRESS ─────────────────────────────────────────────────────────
const sp = document.getElementById('scroll-progress');
function updateSP() {
  const sc = document.documentElement.scrollHeight - window.innerHeight;
  if (sp) sp.style.transform = `scaleX(${sc > 0 ? window.scrollY / sc : 0})`;
}
window.addEventListener('scroll', updateSP, { passive: true });
// ── NAV SCROLL ───────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
// ── ACTIVE NAV LINK ──────────────────────────────────────────────────────────
const sectionEls = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.35 }).observe && sectionEls.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.35 }).observe(s)
);
// ── REVEAL ───────────────────────────────────────────────────────────────────
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.s-prog-fill').forEach(b => setTimeout(() => b.classList.add('animated'), 200));
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
// ── COUNTERS ─────────────────────────────────────────────────────────────────
function animCount(el, target, dur = 1600, sfx = '') {
  const t0 = performance.now();
  const isF = target % 1 !== 0;
  (function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = isF ? (e * target).toFixed(1) + sfx : Math.floor(e * target) + sfx;
    if (p < 1) requestAnimationFrame(step); else el.textContent = target + sfx;
  })(t0);
}
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    animCount(el, parseFloat(el.dataset.count), 1600, el.dataset.suffix || '');
    cObs.unobserve(el);
  });
}, { threshold: 0.5 }).observe && (() => {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      animCount(el, parseFloat(el.dataset.count), 1600, el.dataset.suffix || '');
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));
})();
// ── TOOLTIP ───────────────────────────────────────────────────────────────────
const tt = document.createElement('div');
tt.className = 'tooltip';
document.body.appendChild(tt);
function attachTooltips(root) {
  (root || document).querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', () => { tt.textContent = el.dataset.tooltip; tt.classList.add('visible'); });
    el.addEventListener('mousemove', e => { tt.style.left = (e.clientX + 14) + 'px'; tt.style.top = (e.clientY - 8) + 'px'; });
    el.addEventListener('mouseleave', () => tt.classList.remove('visible'));
  });
}
attachTooltips();
window.attachTooltips = attachTooltips;
// ── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
