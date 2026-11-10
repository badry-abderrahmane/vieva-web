// Behavior shared by every page: config, tracking, theme, menu, reveals, basket buttons, copy buttons.
import { getBasket, toggleItem, onBasketChange } from './basket.js';

export const cfg = JSON.parse(document.getElementById('cfg').textContent);
export const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/** Analytics hook. Pushes to dataLayer (GA4/GTM) and Plausible when present. */
export function track(name, props) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event: name, ...props });
    if (typeof window.plausible === 'function') window.plausible(name, { props });
  } catch (e) { /* analytics must never break the page */ }
}

function initMenu() {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('drawer');
  if (!btn || !drawer) return;
  const set = (open) => {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? btn.dataset.close : btn.dataset.open);
    drawer.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => set(drawer.hidden));
  drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { set(false); btn.focus(); } });
  window.matchMedia('(min-width:1141px)').addEventListener('change', (e) => { if (e.matches) set(false); });
}

function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (reduce || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}

function initBasketUi() {
  const link = document.getElementById('basketLink');
  const count = document.getElementById('basketCount');
  const buttons = document.querySelectorAll('.add');
  const paint = () => {
    const items = getBasket();
    if (link) { link.classList.toggle('on', items.length > 0); count.textContent = items.length; }
    buttons.forEach((b) => {
      const on = items.some((i) => i.slug === b.dataset.slug);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = on ? b.dataset.added : b.dataset.add;
    });
  };
  buttons.forEach((b) => b.addEventListener('click', () => {
    toggleItem({ slug: b.dataset.slug, name: b.dataset.name, service: b.dataset.service });
    track('basket_toggle', { item: b.dataset.slug });
  }));
  onBasketChange(paint);
  paint();
}

function initCopy() {
  document.querySelectorAll('button.copy').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = b.dataset.copied; setTimeout(() => { b.textContent = b.dataset.label; }, 1600); }
    catch (e) { /* clipboard blocked: the text stays selectable on the page */ }
  }));
}

function initTheme() {
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = () => { try { const v = localStorage.getItem('vieva-theme'); return v === 'light' || v === 'dark' ? v : null; } catch (e) { return null; } };
  const apply = (t) => { root.dataset.theme = t; };
  apply(stored() || (mq.matches ? 'dark' : 'light'));
  document.querySelectorAll('.theme-btn').forEach((b) => b.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('vieva-theme', next); } catch (e) { /* storage blocked: the choice lasts for this page only */ }
    track('theme_toggle', { theme: next });
  }));
  // follow the system while the visitor has not chosen
  mq.addEventListener('change', (e) => { if (!stored()) apply(e.matches ? 'dark' : 'light'); });
}

export function initCommon() {
  document.documentElement.classList.add('js');
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-track]');
    if (t) track(t.dataset.track);
  });
  initTheme(); initMenu(); initReveal(); initBasketUi(); initCopy();
}
