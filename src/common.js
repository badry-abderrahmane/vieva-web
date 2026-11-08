// Behavior shared by every page: config, tracking, menu, reveals, basket buttons, cursor ring, copy buttons.
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
  window.matchMedia('(min-width:981px)').addEventListener('change', (e) => { if (e.matches) set(false); });
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

function initPeek() {
  const peek = document.getElementById('peek');
  const list = document.getElementById('svcs');
  if (!peek || !list || !fine) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  document.querySelectorAll('.svc').forEach((a) => {
    a.addEventListener('pointerenter', () => {
      peek.style.setProperty('--c1', a.dataset.c1);
      peek.style.setProperty('--c2', a.dataset.c2);
      peek.classList.add('on');
      peek.style.transform = 'translate(-50%,-50%) scale(1) rotate(-6deg)';
    });
    a.addEventListener('pointerleave', () => { peek.classList.remove('on'); peek.style.transform = 'translate(-50%,-50%) scale(.6) rotate(-6deg)'; });
  });
  list.addEventListener('pointermove', (e) => { tx = e.clientX + 150; ty = e.clientY; });
  (function loop() { requestAnimationFrame(loop); cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14; peek.style.left = cx + 'px'; peek.style.top = cy + 'px'; })();
}

function initTilt() {
  if (!fine || reduce) return;
  document.querySelectorAll('.card').forEach((card) => {
    const shot = card.querySelector('.shot');
    if (!shot) return;
    card.addEventListener('pointermove', (e) => {
      const r = shot.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      shot.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
    });
    card.addEventListener('pointerleave', () => { shot.style.transform = ''; });
  });
}

function initRing() {
  const ring = document.getElementById('ring');
  if (!ring || !fine) return;
  let rx = 0, ry = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; ring.style.opacity = 1; });
  document.addEventListener('pointerover', (e) => ring.classList.toggle('big', !!e.target.closest('a,button,.chip,.sbtn')));
  (function loop() { requestAnimationFrame(loop); rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2; ring.style.transform = `translate(${rx - ring.offsetWidth / 2}px,${ry - ring.offsetHeight / 2}px)`; })();
}

function initCopy() {
  document.querySelectorAll('button.copy').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = b.dataset.copied; setTimeout(() => { b.textContent = b.dataset.label; }, 1600); }
    catch (e) { /* clipboard blocked: the text stays selectable on the page */ }
  }));
}

export function initCommon() {
  document.documentElement.classList.add('js');
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-track]');
    if (t) track(t.dataset.track);
  });
  initMenu(); initReveal(); initBasketUi(); initPeek(); initTilt(); initRing(); initCopy();
}
