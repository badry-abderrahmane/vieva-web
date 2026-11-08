// Browser smoke test (needs Chrome and a running preview on :4173). Drives basket, quote wizard, filters and the mobile menu over CDP.
import { spawn } from 'node:child_process';

const BASE = process.env.E2E_URL || 'http://localhost:4173';
const chrome = spawn(process.env.CHROME || 'google-chrome', ['--headless=new', '--no-sandbox', '--remote-debugging-port=9333', '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
async function connect() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch('http://localhost:9333/json')).json();
      const page = list.find((t) => t.type === 'page');
      if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; }); break; }
    } catch { /* retry */ }
    await sleep(250);
  }
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
}
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails)); return r.result.result.value; };
const go = async (path) => { await send('Page.navigate', { url: BASE + path }); await sleep(1800); };
const results = [];
const ok = (name, cond, info = '') => { results.push([cond, name, info]); };

try {
  await connect();
  await send('Page.enable'); await send('Runtime.enable');
  await go('/');
  await ev('localStorage.clear()');

  // catalogue filter + basket
  await go('/catalogue/');
  ok('catalogue lists 12 products', (await ev("document.querySelectorAll('#pgrid .pcard').length")) === 12);
  await ev("document.querySelector('#filters [data-filter=evenementiel]').click()");
  ok('filter keeps only events products', (await ev("[...document.querySelectorAll('#pgrid .pcard')].filter(c=>!c.hidden).length")) === 3);
  await ev("document.querySelector('#pgrid .pcard:not([hidden]) .add').click()");
  ok('basket count shows 1', (await ev("document.getElementById('basketCount').textContent")) === '1');
  ok('basket link visible', (await ev("document.getElementById('basketLink').classList.contains('on')")) === true);

  // wizard
  await go('/devis/');
  const step = () => ev("document.getElementById('wlabel').textContent");
  ok('wizard starts on step 1', (await step()).includes('1'), await step());
  ok('basket service preselected', (await ev("document.querySelector('.sbtn[data-slug=evenementiel]').getAttribute('aria-pressed')")) === 'true');
  await ev("document.getElementById('wnext').click()");
  ok('moves to step 2', (await step()).includes('2'));
  ok('basket shown in step 2', (await ev("!document.getElementById('wbasket').hidden")) === true);
  for (let i = 0; i < 3; i++) await ev("document.getElementById('wnext').click()");
  ok('reaches step 5', (await step()).includes('5'), await step());
  await ev("document.getElementById('wnext').click()");
  ok('empty contact is rejected', (await ev("document.getElementById('werr').textContent")).length > 0);
  await ev("document.getElementById('name').value='Test';document.getElementById('email').value='bad'");
  await ev("document.getElementById('wnext').click()");
  ok('bad email is rejected', (await ev("document.getElementById('werr').textContent")).length > 0);
  await ev("document.getElementById('email').value='a@b.co'");
  await ev("document.getElementById('wnext').click()");
  ok('valid form shows confirmation', (await ev("!document.getElementById('wdone').hidden")) === true);
  ok('preview note shown without endpoint', (await ev("!document.getElementById('wpreview').hidden")) === true);

  // mobile menu
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await go('/');
  ok('menu button visible on mobile', (await ev("getComputedStyle(document.getElementById('menuBtn')).display")) === 'block');
  await ev("document.getElementById('menuBtn').click()");
  ok('drawer opens', (await ev("!document.getElementById('drawer').hidden")) === true);
  await ev("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))");
  ok('Escape closes drawer', (await ev("document.getElementById('drawer').hidden")) === true);
  ok('no horizontal overflow on mobile', (await ev('document.documentElement.scrollWidth <= window.innerWidth')) === true, await ev('document.documentElement.scrollWidth + ">" + window.innerWidth'));
  await go('/ar/');
  ok('arabic page is rtl', (await ev("document.documentElement.dir")) === 'rtl');
  ok('arabic: no horizontal overflow', (await ev('document.documentElement.scrollWidth <= window.innerWidth')) === true);
} catch (e) { ok('script ran', false, String(e)); }
finally { try { ws.close(); } catch {} chrome.kill(); }

let bad = 0;
for (const [c, n, i] of results) { console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${c ? '' : '  ' + i}`); if (!c) bad++; }
console.log(`${results.length - bad}/${results.length} passed`);
process.exit(bad ? 1 : 0);
