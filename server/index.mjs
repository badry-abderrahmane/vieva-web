// Reference API for quote requests (no dependencies, Node 20+).
// Production target is Laravel + Filament (see docs/API.md); this server defines and exercises the same contract.
//   POST /api/quotes        multipart/form-data  -> 201 { id }
//   GET  /admin             lead inbox (HTTP basic auth)
//   POST /admin/status      change lead status
//   GET  /admin/export.csv  CSV export
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID, timingSafeEqual } from 'node:crypto';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'data');
const DB = join(DIR, 'quotes.json');
const PORT = Number(process.env.PORT || 8787);
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || 'http://localhost:5173';
const ADMIN_USER = process.env.ADMIN_USER || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const WEBHOOK_URL = process.env.WEBHOOK_URL || '';
const MAX_FILE = 50 * 1024 * 1024, MAX_FILES = 10;
const OK_EXT = new Set(['pdf', 'ai', 'png', 'jpg', 'jpeg']);
const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'];

mkdirSync(join(DIR, 'uploads'), { recursive: true });
const load = () => (existsSync(DB) ? JSON.parse(readFileSync(DB, 'utf8')) : []);
const save = (rows) => writeFileSync(DB, JSON.stringify(rows, null, 2));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const hits = new Map(); // naive rate limit: 10 requests / hour / IP
function limited(ip) {
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < 3600e3);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 10;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };

function authed(req) {
  if (!ADMIN_USER || !ADMIN_PASSWORD) return null;
  const h = req.headers.authorization || '';
  const [u, p] = Buffer.from(h.replace(/^Basic /, ''), 'base64').toString().split(/:(.*)/s);
  const safe = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
  return Boolean(u && p && safe(u, ADMIN_USER) && safe(p, ADMIN_PASSWORD));
}

async function createQuote(req, res) {
  if (limited(req.socket.remoteAddress)) return json(res, 429, { error: 'rate_limited' });
  let form;
  try {
    form = await new Request('http://local/', { method: 'POST', headers: req.headers, body: Readable.toWeb(req), duplex: 'half' }).formData();
  } catch { return json(res, 400, { error: 'bad_form' }); }
  if (form.get('website')) return json(res, 201, { id: 'ignored' }); // honeypot
  const get = (k) => String(form.get(k) ?? '').trim().slice(0, 2000);
  const name = get('name'), phone = get('phone'), email = get('email');
  if (!name || (!phone && !email)) return json(res, 422, { error: 'missing_contact' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 422, { error: 'bad_email' });

  const id = randomUUID();
  const files = [];
  for (const f of form.getAll('files')) {
    if (typeof f === 'string') continue;
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (files.length >= MAX_FILES || !OK_EXT.has(ext) || f.size > MAX_FILE) return json(res, 422, { error: 'bad_file', file: f.name });
    const safeName = basename(f.name).replace(/[^\w.\-]+/g, '_');
    mkdirSync(join(DIR, 'uploads', id), { recursive: true });
    writeFileSync(join(DIR, 'uploads', id, safeName), Buffer.from(await f.arrayBuffer()));
    files.push({ name: safeName, size: f.size });
  }
  let basket = [];
  try { basket = JSON.parse(get('basket') || '[]'); } catch { /* ignore */ }
  const row = {
    id, createdAt: new Date().toISOString(), status: 'New', lang: get('lang'),
    services: form.getAll('services[]').map(String), product: get('product'), width: get('width'), height: get('height'), qty: get('qty'),
    material: get('material'), install: get('install'), date: get('date'), city: get('city'), mode: get('mode'), comment: get('comment'),
    name, company: get('company'), role: get('role'), phone, email, ice: get('ice'), basket, files,
  };
  const rows = load(); rows.unshift(row); save(rows);
  if (WEBHOOK_URL) fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: `New quote from ${name} (${phone || email}): ${row.product || row.services.join(', ')}` }) }).catch(() => {});
  json(res, 201, { id });
}

function inbox(res) {
  const rows = load();
  const body = rows.map((r) => `<tr><td>${esc(r.createdAt.slice(0, 16).replace('T', ' '))}</td><td>${esc(r.name)}<br><small>${esc(r.company)}</small></td><td>${esc(r.phone)}<br><small>${esc(r.email)}</small></td><td>${esc(r.services.join(', '))}<br><small>${esc(r.product)}</small></td><td>${esc(r.city)} ${esc(r.date)}</td><td>${r.files.length}</td>
  <td><form method="post" action="/admin/status"><input type="hidden" name="id" value="${esc(r.id)}"><select name="status" onchange="this.form.submit()">${STATUSES.map((s) => `<option${s === r.status ? ' selected' : ''}>${s}</option>`).join('')}</select></form></td></tr>`).join('');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><meta charset="utf-8"><title>Leads</title><style>body{font:15px system-ui;margin:24px}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ccc;padding:8px;text-align:left;vertical-align:top}small{color:#666}</style>
<h1>Leads (${rows.length})</h1><p><a href="/admin/export.csv">Export CSV</a></p><table><tr><th>Date</th><th>Name</th><th>Contact</th><th>Request</th><th>Where / when</th><th>Files</th><th>Status</th></tr>${body}</table>`);
}

function csv(res) {
  const cols = ['createdAt', 'status', 'name', 'company', 'role', 'phone', 'email', 'ice', 'services', 'product', 'width', 'height', 'qty', 'material', 'install', 'date', 'city', 'mode', 'comment'];
  const cell = (v) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`;
  res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="leads.csv"' });
  res.end([cols.join(','), ...load().map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n'));
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://local');
  cors(res);
  try {
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    if (req.method === 'POST' && pathname === '/api/quotes') return await createQuote(req, res);
    if (pathname.startsWith('/admin')) {
      const ok = authed(req);
      if (ok === null) return json(res, 503, { error: 'set ADMIN_USER and ADMIN_PASSWORD' });
      if (!ok) { res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Vieva leads"' }); return res.end(); }
      if (req.method === 'GET' && pathname === '/admin') return inbox(res);
      if (req.method === 'GET' && pathname === '/admin/export.csv') return csv(res);
      if (req.method === 'POST' && pathname === '/admin/status') {
        let raw = ''; for await (const c of req) raw += c;
        const p = new URLSearchParams(raw), rows = load(), row = rows.find((r) => r.id === p.get('id'));
        if (row && STATUSES.includes(p.get('status'))) { row.status = p.get('status'); save(rows); }
        res.writeHead(303, { Location: '/admin' }); return res.end();
      }
    }
    json(res, 404, { error: 'not_found' });
  } catch (e) { console.error(e); json(res, 500, { error: 'server_error' }); }
}).listen(PORT, () => console.log(`quote API on http://localhost:${PORT}`));
