// Builds inline SVG for the Vieva Services logo from the client's vector artwork (src/data/logo-art.js).
// compact: wordmark + petals + SERVICES (header, footer). full: adds the CMYK filet and PRINT • EVENT • SOLUTIONS.
// brush: the home hero version. Every part sits under a mask painted by a stroke; a textured "swash" in the
// part's ink rides on top of each stroke and dries away. Without JS the masks are fully painted, so the logo shows.
import { LOGO } from '../src/data/logo-art.js';

const BARS = ['#00ADEF', '#EC008C', '#FFF200', 'currentColor'];
// the CMYK filet as four ruled lines (x from, x to), so the brush version can draw them
const RULES = [[44.95, 237.76], [237.76, 430.57], [430.57, 623.39], [623.39, 816.2]];
const VB = { compact: '40 58 784 414', full: '30 52 800 500' };

// paint order: the fan opens left to right (file order is back to front: coral … yellow)
const PAINT = [4, 3, 2, 1, 0];
const WORD_STROKES = ['M28 214C300 196 560 228 842 202', 'M28 294C300 280 560 306 842 286', 'M28 364C300 352 560 378 842 358'];
const SVC_STROKE = 'M298 442C460 436 640 448 832 440';

const petal = (p, extra = '') => `<path fill="${p.c}" style="mix-blend-mode:multiply" transform="translate(${p.t})" d="${p.d}"${extra}/>`;
const filePetal = (p) => `<path fill="${p.c}" fill-opacity=".9" transform="translate(${p.t})" d="${p.d}"/>`;
const glyphs = (list) => list.map((g) => `<path transform="translate(${g.t})" d="${g.d}"/>`).join('');

export function logoSvg({ variant = 'compact', brush = false, id = 'lg', label = 'Vieva Services', cls = '', base = '' } = {}) {
  const full = variant === 'full';
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  if (!brush) {
    return `<svg class="logo-svg ${cls}" viewBox="${VB[variant]}" ${a11y}>
<g class="lg-petals" style="isolation:isolate">${LOGO.petals.map((p) => petal(p)).join('')}</g>
<g class="lg-word" fill="currentColor">${LOGO.word.map((d) => `<path d="${d}"/>`).join('')}${glyphs(LOGO.services)}</g>
${full ? `<g class="lg-bars">${LOGO.bars.map((d, i) => `<path fill="${BARS[i]}" d="${d}"/>`).join('')}</g><g class="lg-tag" fill="currentColor">${glyphs(LOGO.tagline)}</g>` : ''}
</svg>`;
  }

  const m = (k) => `${id}-${k}`;
  const masks = [
    ...LOGO.petals.map((p, i) => `<mask id="${m('p' + i)}" maskUnits="userSpaceOnUse" x="0" y="0" width="860" height="620"><path class="bm bm-p" data-i="${i}" d="${p.stroke}" stroke="#fff" stroke-width="124" stroke-linecap="round" fill="none"/></mask>`),
    `<mask id="${m('w')}" maskUnits="userSpaceOnUse" x="0" y="0" width="860" height="620">${WORD_STROKES.map((d, i) => `<path class="bm bm-w" data-i="${i}" d="${d}" stroke="#fff" stroke-width="100" stroke-linecap="round" fill="none"/>`).join('')}</mask>`,
    `<mask id="${m('s')}" maskUnits="userSpaceOnUse" x="0" y="0" width="860" height="620"><path class="bm bm-s" d="${SVC_STROKE}" stroke="#fff" stroke-width="64" stroke-linecap="round" fill="none"/></mask>`,
  ].join('');
  // wet paint: a raster dry-brush stroke (public/brush) laid along each stroke, at full ink, revealed by a clip that grows
  let n = 0;
  const swash = (d, w, colour, cls, extra = '') => {
    const pts = d.match(/-?\d+\.?\d*/g).map(Number);
    const [sx, sy] = pts.slice(0, 2), [ex, ey] = pts.slice(-2);
    const len = Math.hypot(ex - sx, ey - sy) + w * 0.35, ang = (Math.atan2(ey - sy, ex - sx) * 180) / Math.PI;
    const k = n++, tf = `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${ang.toFixed(2)})`;
    const img = `${base}/brush/stroke-${k % 3}.png`;
    defs.push(`<mask id="${m('bt' + k)}" maskUnits="userSpaceOnUse" x="0" y="0" width="860" height="620"><image href="${img}" x="${(-w * 0.18).toFixed(1)}" y="${(-w / 2).toFixed(1)}" width="${len.toFixed(1)}" height="${w}" preserveAspectRatio="none" transform="${tf}"/></mask>`);
    defs.push(`<clipPath id="${m('bc' + k)}"><rect class="brev" data-len="${(len + w * 0.2).toFixed(1)}" x="${(-w * 0.2).toFixed(1)}" y="${(-w).toFixed(1)}" width="${(len + w * 0.2).toFixed(1)}" height="${w * 2}" transform="${tf}"/></clipPath>`);
    return `<g class="sw ${cls}"${extra} clip-path="url(#${m('bc' + k)})"><rect width="860" height="620" fill="${colour}" mask="url(#${m('bt' + k)})"/></g>`;
  };
  const defs = [];
  const petals = PAINT.map((i) => `<g mask="url(#${m('p' + i)})">${petal(LOGO.petals[i])}</g>`).join('');
  const swashP = PAINT.map((i) => swash(LOGO.petals[i].stroke, 150, LOGO.petals[i].c, 'sw-p', ` data-i="${i}"`)).join('');
  const swashW = WORD_STROKES.map((d, i) => swash(d, 118, 'currentColor', 'sw-w', ` data-i="${i}"`)).join('');
  const swashS = swash(SVC_STROKE, 74, 'currentColor', 'sw-s');
  return `<svg class="logo-svg logo-brush ${cls}" viewBox="${VB[variant]}" ${a11y}>
<defs>${masks}${defs.join('')}</defs>
<g class="lg-petals" style="isolation:isolate">${petals}</g>
<g class="lg-word" fill="currentColor"><g mask="url(#${m('w')})">${LOGO.word.map((d) => `<path d="${d}"/>`).join('')}</g><g mask="url(#${m('s')})">${glyphs(LOGO.services)}</g></g>
${full ? `<g class="lg-bars">${RULES.map(([x1, x2], i) => `<path class="lg-rule" d="M${x1} 488.43H${x2}" stroke="${BARS[i]}" stroke-width="6.75" fill="none"/>`).join('')}</g><g class="lg-tag" fill="currentColor">${glyphs(LOGO.tagline)}</g>` : ''}
<g class="swashes" aria-hidden="true">${swashP}${swashW}${swashS}</g>
</svg>`;
}

/** Fan base points of each petal (for the scroll story's fan-out), in artboard units. */
export const PETAL_BASES = LOGO.petals.map((p) => p.base);

/** Standalone files: the full logo and a petals-only favicon. */
export function logoFile() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.full}" width="800" height="500">
<g>${LOGO.petals.map(filePetal).join('')}</g>
<g fill="#100F0D">${LOGO.word.map((d) => `<path d="${d}"/>`).join('')}${glyphs(LOGO.services)}${glyphs(LOGO.tagline)}</g>
${LOGO.bars.map((d, i) => `<path fill="${i === 3 ? '#231F20' : BARS[i]}" d="${d}"/>`).join('')}
</svg>\n`;
}

export function faviconFile() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="455 55 335 205">${LOGO.petals.map(filePetal).join('')}</svg>\n`;
}
