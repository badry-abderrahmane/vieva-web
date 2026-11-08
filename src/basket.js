// Quote basket: items the visitor adds from the catalogue. Stored in localStorage, never sent until the quote form is submitted.
const KEY = 'vieva-basket';
const listeners = new Set();

export function getBasket() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((i) => i && typeof i.slug === 'string') : [];
  } catch (e) { return []; }
}

function save(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage blocked: keep in memory only */ memory = items; }
  listeners.forEach((fn) => fn(items));
}
let memory = null;

export function toggleItem(item) {
  const items = getBasket();
  const i = items.findIndex((x) => x.slug === item.slug);
  if (i >= 0) items.splice(i, 1); else items.push(item);
  save(items);
}

export function clearBasket() { save([]); }

export function onBasketChange(fn) {
  listeners.add(fn);
  window.addEventListener('storage', (e) => { if (e.key === KEY) fn(getBasket()); });
}
