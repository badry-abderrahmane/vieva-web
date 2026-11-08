// Five-step quote form. Validates per step, handles file picking, submits to VITE_QUOTE_ENDPOINT when set.
import { cfg, track } from './common.js';
import { getBasket, clearBasket } from './basket.js';

const MAX_BYTES = 50 * 1024 * 1024;
const OK_EXT = ['pdf', 'ai', 'png', 'jpg', 'jpeg'];
const ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT || '';

export function initWizard() {
  const f = cfg.form;
  const form = document.getElementById('wizard');
  const steps = [...form.querySelectorAll('[data-step]')];
  const label = document.getElementById('wlabel');
  const pct = document.getElementById('wpct');
  const fill = document.getElementById('wfill');
  const err = document.getElementById('werr');
  const prev = document.getElementById('wprev');
  const next = document.getElementById('wnext');
  const stepsBox = document.getElementById('wsteps');
  const done = document.getElementById('wdone');
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');
  const picked = new Set();
  let files = [];
  let step = 1;
  let started = false;

  /* services: prefill from ?s= and from the basket */
  const sBtns = [...form.querySelectorAll('.sbtn')];
  const q = (new URLSearchParams(location.search).get('s') || '').split(',').filter(Boolean);
  q.forEach((s) => picked.add(s));
  getBasket().forEach((i) => i.service && picked.add(i.service));
  if (!picked.size) picked.add('impression-grand-format');
  const paintServices = () => sBtns.forEach((b) => b.setAttribute('aria-pressed', picked.has(b.dataset.slug) ? 'true' : 'false'));
  sBtns.forEach((b) => b.addEventListener('click', () => { picked.has(b.dataset.slug) ? picked.delete(b.dataset.slug) : picked.add(b.dataset.slug); paintServices(); err.textContent = ''; }));
  paintServices();

  /* basket summary in step 2 */
  const basket = getBasket();
  if (basket.length) {
    document.getElementById('wbasket').hidden = false;
    document.getElementById('wbasketList').innerHTML = basket.map((i) => `<span class="pill">${i.name.replace(/</g, '&lt;')}</span>`).join('');
    const prod = document.getElementById('product');
    if (!prod.value) prod.value = basket.map((i) => i.name).join(', ');
  }

  /* files */
  const ext = (n) => (n.split('.').pop() || '').toLowerCase();
  const paintFiles = () => {
    fileList.innerHTML = '';
    files.forEach((file, i) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = `${file.name} (${(file.size / 1048576).toFixed(1)} MB)`;
      const x = document.createElement('button');
      x.type = 'button'; x.className = 'x'; x.textContent = f.removeFile;
      x.addEventListener('click', () => { files.splice(i, 1); paintFiles(); });
      li.append(span, x); fileList.append(li);
    });
  };
  fileInput.addEventListener('change', () => {
    const problems = [];
    [...fileInput.files].forEach((file) => {
      if (!OK_EXT.includes(ext(file.name))) problems.push(`${f.badType} ${file.name}`);
      else if (file.size > MAX_BYTES) problems.push(`${f.tooBig} ${file.name}`);
      else files.push(file);
    });
    fileInput.value = '';
    err.textContent = problems.join(' ');
    paintFiles();
  });
  const drop = document.getElementById('drop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, () => drop.classList.add('over')));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, () => drop.classList.remove('over')));

  /* navigation */
  const show = (n) => {
    step = n;
    steps.forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    label.textContent = `${f.stepOf.replace('{n}', n)} · ${f.steps[n - 1]}`;
    pct.textContent = `${n * 20}%`;
    fill.style.width = `${n * 20}%`;
    prev.style.visibility = n === 1 ? 'hidden' : 'visible';
    next.textContent = n === 5 ? f.send : f.next;
    err.textContent = '';
    const h = steps[n - 1].querySelector('h2');
    if (h && started) { h.tabIndex = -1; h.focus({ preventScroll: false }); }
  };
  const val = (id) => (document.getElementById(id).value || '').trim();
  const validate = (n) => {
    if (n === 1 && !picked.size) return f.errService;
    if (n === 5) {
      if (!val('name') || (!val('phone') && !val('email'))) return f.errContact;
      if (val('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) return f.errEmail;
    }
    return '';
  };
  prev.addEventListener('click', () => { if (step > 1) show(step - 1); });
  next.addEventListener('click', () => {
    const problem = validate(step);
    if (problem) { err.textContent = problem; return; }
    started = true;
    if (step < 5) { if (step === 1) track('quote_start'); show(step + 1); } else submit();
  });
  form.addEventListener('submit', (e) => e.preventDefault());

  async function submit() {
    if (form.elements.website && form.elements.website.value) { finish(false); return; } // honeypot
    const data = new FormData();
    data.append('lang', cfg.lang);
    picked.forEach((s) => data.append('services[]', s));
    ['product', 'width', 'height', 'qty', 'material', 'date', 'city', 'comment', 'name', 'company', 'role', 'phone', 'email', 'ice'].forEach((k) => data.append(k, val(k)));
    ['install', 'mode'].forEach((k) => { const r = form.querySelector(`input[name=${k}]:checked`); data.append(k, r ? r.value : ''); });
    data.append('basket', JSON.stringify(getBasket()));
    files.forEach((file) => data.append('files', file, file.name));
    if (!ENDPOINT) { finish(true); return; }
    next.disabled = true;
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data });
      if (!res.ok) throw new Error(String(res.status));
      track('quote_submit');
      clearBasket();
      finish(false);
    } catch (e) {
      err.textContent = f.errSend;
    } finally { next.disabled = false; }
  }

  function finish(preview) {
    stepsBox.hidden = true;
    done.hidden = false;
    document.getElementById('wpreview').hidden = !preview;
    done.querySelector('h2').tabIndex = -1;
    done.querySelector('h2').focus();
  }
  document.getElementById('wrestart').addEventListener('click', () => {
    form.reset(); files = []; paintFiles(); picked.clear(); picked.add('impression-grand-format'); paintServices();
    done.hidden = true; stepsBox.hidden = false; started = false; show(1);
  });

  show(1);
}
