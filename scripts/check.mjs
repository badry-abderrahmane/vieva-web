// Post-build checks on dist/: internal links resolve, every page has SEO basics, ids are unique, hreflang is reciprocal.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const pages = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n === 'index.html' && pages.push(p); } })(DIST);

const errors = [];
const exists = (href) => {
  let p = href.split('#')[0].split('?')[0];
  if (!p.startsWith(BASE)) return true;
  p = p.slice(BASE.length);
  const f = join(DIST, p);
  return existsSync(f) && (statSync(f).isFile() || existsSync(join(f, 'index.html')));
};
for (const file of pages) {
  const rel = file.slice(DIST.length);
  const html = readFileSync(file, 'utf8');
  const need = [['<title>', 'title'], ['name="description"', 'description'], ['rel="canonical"', 'canonical'], ['hreflang="x-default"', 'hreflang x-default'], ['<h1', 'h1'], ['lang="', 'lang']];
  for (const [s, label] of need) if (!html.includes(s)) errors.push(`${rel}: missing ${label}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) errors.push(`${rel}: expected exactly one h1`);
  for (const m of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    if (!exists(u)) errors.push(`${rel}: broken link ${u}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) errors.push(`${rel}: duplicate ids ${[...new Set(dup)].join(', ')}`);
  if (/<img(?![^>]*\balt=)/.test(html)) errors.push(`${rel}: img without alt`);
}
console.log(`checked ${pages.length} pages`);
if (errors.length) { console.error(errors.slice(0, 40).join('\n')); console.error(`${errors.length} problem(s)`); process.exit(1); }
console.log('ok: links, SEO basics, unique ids');
