// Home page only: 3D hero, headline interaction, counters, process rail.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScene } from './scene.js';
import { cfg, reduce, fine } from './common.js';

gsap.registerPlugin(ScrollTrigger);

export function initHome() {
  const hero = document.getElementById('hero');

  /* headline: split into letters (Latin only; Arabic letters must stay joined) */
  const chars = [];
  if (cfg.lang !== 'ar') {
    document.querySelectorAll('#h1 .line').forEach((line) => {
      const t = line.dataset.t;
      line.setAttribute('aria-hidden', 'true');
      for (const ch of t) {
        const s = document.createElement('span');
        s.className = 'ch'; s.textContent = ch;
        line.appendChild(s); chars.push(s);
      }
    });
  } else {
    document.querySelectorAll('#h1 .line').forEach((line) => line.setAttribute('aria-hidden', 'true'));
  }

  /* marquees: duplicate content for a seamless loop */
  ['mq', 'r1', 'r2'].forEach((id) => { const el = document.getElementById(id); if (el) el.innerHTML += el.innerHTML; });

  /* 3D scene */
  try {
    initScene(hero, reduce, { rtl: cfg.dir === 'rtl', banner: hero.dataset.banner, bannerRight: hero.dataset.bannerRight });
  } catch (err) { console.error(err); hero.classList.add('no-gl'); }

  /* variable-font hover on the headline */
  if (fine && !reduce && chars.length) {
    let px = -9999, py = -9999, on = false, measured = false, boxes = [];
    hero.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; on = true; });
    hero.addEventListener('pointerleave', () => { on = false; });
    const measure = () => { boxes = chars.map((c) => { const r = c.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); measured = true; };
    window.addEventListener('resize', () => { measured = false; });
    window.addEventListener('scroll', () => { measured = false; }, { passive: true });
    const cur = chars.map(() => 0);
    (function loop() {
      requestAnimationFrame(loop);
      if (!on && cur.every((v) => v < 0.01)) return;
      if (!measured) measure();
      for (let i = 0; i < chars.length; i++) {
        const d = on ? Math.hypot(px - boxes[i].x, py - boxes[i].y) : 9999;
        cur[i] += (Math.max(0, 1 - d / 280) - cur[i]) * 0.12;
        chars[i].style.fontVariationSettings = `"wght" ${Math.round(700 - 380 * cur[i])},"wdth" ${Math.round(86 + 14 * cur[i])}`;
      }
    })();
  }

  if (reduce) return;

  /* intro, process rail, counters */
  const targets = chars.length ? chars : document.querySelectorAll('#h1 .line');
  gsap.from(targets, chars.length ? { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.04, delay: 0.15 } : { yPercent: 40, opacity: 0.001, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.15 });
  gsap.from('.hero-row', { y: 36, duration: 1, ease: 'power3.out', delay: 0.7 });
  gsap.fromTo('#railfill', { scaleX: 0.08 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#steps', start: 'top 75%', end: 'bottom 55%', scrub: true } });
  document.querySelectorAll('#stats b').forEach((b) => {
    const n = Number(b.dataset.n), o = { v: n };
    ScrollTrigger.create({ trigger: b, start: 'top 92%', once: true, onEnter: () => {
      o.v = 0; b.textContent = '0';
      gsap.to(o, { v: n, duration: 1.6, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v); }, onComplete: () => { b.textContent = n; } });
    } });
  });
}
