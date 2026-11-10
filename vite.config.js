import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Multi-page build: every generated index.html is an entry. Run `npm run gen` first (build and dev do it for you).
const SKIP = new Set(['node_modules', 'dist', 'src', 'public', 'scripts', 'docs', 'server', '.git']);
function htmlEntries(dir, out = {}) {
  // withFileTypes avoids a stat per file: Vite's temporary vite.config.js.timestamp-*.mjs can vanish mid-walk
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const name = ent.name;
    if (SKIP.has(name) || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (ent.isDirectory()) htmlEntries(p, out);
    else if (name === 'index.html') out[p.slice(resolve('.').length + 1).replace(/[\\/]/g, '_').replace(/_?index\.html$/, '') || 'index'] = p;
  }
  return out;
}

export default defineConfig(({ command }) => ({
  base: process.env.BASE || '/',
  build: { chunkSizeWarningLimit: 900, rollupOptions: { input: command === 'build' ? htmlEntries(resolve('.')) : undefined } },
}));
