// Home page story, told as a print run (GSAP + ScrollTrigger + DrawSVG, smooth scroll by Lenis):
// 1. the logo is painted by brush strokes on load (petals fan in, wordmark swept, CMYK filet ruled, tagline set);
// 2. scrolling away, the petals fan open; each service card is then inked with its petal colour;
// 3. the method overprints C, M, Y, K plates of a stand proof until they sit in register;
// 4. the sectors are inked one by one; a magenta brush swash paints under the closing call.
// Every element is in its final state in the HTML. Nothing here hides content unless the libraries loaded,
// and with reduced motion the page stays exactly as printed.
import { reduce } from './common.js';

// The hero carries its own WhatsApp button: hide the floating one while the hero is on screen.
const heroEl = document.querySelector('.hero');
if (heroEl && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => document.documentElement.classList.toggle('wa-hide', e.isIntersecting)).observe(heroEl);
}

export async function initHome() {
  if (reduce) return;
  let gsap, ScrollTrigger, DrawSVGPlugin, Lenis;
  try {
    [{ gsap }, { ScrollTrigger }, { DrawSVGPlugin }, { default: Lenis }] = await Promise.all([
      import('gsap'), import('gsap/ScrollTrigger'), import('gsap/DrawSVGPlugin'), import('lenis'),
    ]);
  } catch (e) { return; } // libraries unavailable: the page is already complete
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

  const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const steps = [paintLogo, fanPetals, inkServices, pressRun, inkSectors, paintCta];
  steps.forEach((fn) => { try { fn(gsap, ScrollTrigger); } catch (e) { /* one scene failing never blocks the others */ } });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* 1. brush-painted logo */
function paintLogo(gsap) {
  const svg = document.querySelector('#heroMark .logo-brush');
  if (!svg) return;
  const q = (s) => svg.querySelectorAll(s);
  const one = (s) => svg.querySelector(s);
  const order = [4, 3, 2, 1, 0]; // the fan opens left to right
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.15 });
  // each wet swash is revealed by its clip rect growing along the stroke
  const rev = (sel) => [...q(sel)].map((g) => svg.querySelector(`${g.getAttribute('clip-path').slice(4, -1)} rect`));
  const grow = (sel) => ({ targets: rev(sel), to: { attr: { width: (i, el) => el.dataset.len } } });
  // the wet paint lifts off along the stroke, uncovering the crisp mark (no fade through grey)
  const lift = (sel) => [rev(sel), { attr: { x: (i, el) => +el.dataset.x0 + +el.dataset.len, width: 0 }, ease: 'power2.in', duration: 0.5 }];
  gsap.set(q('.bm'), { drawSVG: '0%' });
  gsap.set(q('.sw'), { opacity: 1 });
  rev('.sw').forEach((r) => { r.dataset.x0 = r.getAttribute('x'); });
  gsap.set(rev('.sw'), { attr: { width: 0 } });
  gsap.set(q('.lg-rule'), { drawSVG: '0%' });
  gsap.set(q('.lg-tag path'), { opacity: 0 });

  order.forEach((i, k) => {
    const at = k * 0.16, g = grow(`.sw-p[data-i="${i}"]`);
    tl.to(one(`.bm-p[data-i="${i}"]`), { drawSVG: '100%', duration: 0.55 }, at)
      .to(g.targets, { ...g.to, duration: 0.55 }, at)
      .to(...lift(`.sw-p[data-i="${i}"]`), at + 0.62);
  });
  [0, 1, 2].forEach((i) => {
    const at = 0.62 + i * 0.24, g = grow(`.sw-w[data-i="${i}"]`);
    tl.to(one(`.bm-w[data-i="${i}"]`), { drawSVG: '100%', duration: 0.5, ease: 'power3.inOut' }, at)
      .to(g.targets, { ...g.to, duration: 0.5, ease: 'power3.inOut' }, at)
      .to(...lift(`.sw-w[data-i="${i}"]`), at + 0.56);
  });
  const gs = grow('.sw-s');
  tl.to(one('.bm-s'), { drawSVG: '100%', duration: 0.45, ease: 'power3.inOut' }, 1.38)
    .to(gs.targets, { ...gs.to, duration: 0.45, ease: 'power3.inOut' }, 1.38)
    .to(...lift('.sw-s'), 1.86)
    .to(q('.lg-rule'), { drawSVG: '100%', duration: 0.32, stagger: 0.11, ease: 'power2.inOut' }, 1.62)
    .to(q('.lg-tag path'), { opacity: 1, duration: 0.3, stagger: 0.022, ease: 'none' }, 1.95);
}

/* 2. the fan opens as the hero leaves */
function fanPetals(gsap) {
  const svg = document.querySelector('#heroMark .logo-brush');
  if (!svg) return;
  const groups = [...svg.querySelectorAll('.lg-petals > g')]; // paint order: yellow … coral
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: 0.6 } });
  groups.forEach((g, k) => tl.to(g, { rotation: (k - 2) * 9, svgOrigin: '612 245', ease: 'none' }, 0));
  tl.to('#heroMark', { yPercent: -8, ease: 'none' }, 0);
}

/* 3. each service is inked with its petal colour */
function inkServices(gsap) {
  document.querySelectorAll('.bento > li').forEach((li) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 90%', end: 'top 58%', scrub: 0.6 } });
    tl.fromTo(li.querySelector('.swatch'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power1.inOut' }, 0)
      .fromTo(li.querySelector('.bpetal'), { rotation: -50, scale: 0.3, opacity: 0, transformOrigin: '60% 95%' }, { rotation: 0, scale: 1, opacity: 1, ease: 'back.out(1.4)' }, 0.1);
  });
}

/* 4. the method as a press run: C, M, Y, K plates print, then slide into register */
function pressRun(gsap, ScrollTrigger) {
  const run = document.querySelector('.run');
  if (!run) return;
  run.classList.add('js-run');
  const items = [...run.querySelectorAll('.run-steps li')];
  const plates = ['c', 'm', 'y', 'k'].map((k) => run.querySelector(`.plate-${k}`));
  const off = [[-16, -10], [14, -13], [-12, 14], [15, 11]];
  plates.forEach((p, i) => gsap.set(p, { opacity: 0, x: off[i][0], y: off[i][1] }));
  items[0].classList.add('on');
  items.forEach((li, i) => {
    gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 78%', end: 'top 42%', scrub: 0.5 } })
      .to(plates[i], { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0)
      .to(plates[i], { x: 0, y: 0, duration: 0.55, ease: 'power3.inOut' }, 0.45);
    ScrollTrigger.create({
      trigger: li, start: 'top 60%', end: 'bottom 60%',
      onToggle: (self) => { if (self.isActive) items.forEach((x) => x.classList.toggle('on', x === li)); },
    });
  });
}

/* 5. sectors are inked in reading order */
function inkSectors(gsap, ScrollTrigger) {
  const runEl = document.querySelector('.sector-run');
  if (!runEl) return;
  const words = [...runEl.querySelectorAll('.sector')];
  document.querySelector('.sectors')?.classList.add('js-ink');
  ScrollTrigger.create({
    trigger: runEl, start: 'top 85%', end: 'bottom 50%', scrub: true,
    onUpdate: (self) => {
      const n = Math.round(self.progress * words.length);
      words.forEach((w, i) => w.classList.toggle('inked', i < n));
    },
  });
}

/* 6. a magenta swash is painted under the closing question */
function paintCta(gsap) {
  const sw = document.querySelector('#cta .cta-swash');
  if (!sw) return;
  gsap.fromTo(sw, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', scrollTrigger: { trigger: '#cta', start: 'top 80%', end: 'top 40%', scrub: 0.6 } });
}
