// Catalogue filter by service. Supports ?c=<service-slug>.
export function initCatalogue() {
  const buttons = [...document.querySelectorAll('#filters .fbtn')];
  const cards = [...document.querySelectorAll('#pgrid .pcard')];
  const none = document.getElementById('none');
  if (!buttons.length) return;
  const apply = (key) => {
    let shown = 0;
    cards.forEach((c) => { const on = key === 'all' || c.dataset.service === key; c.hidden = !on; if (on) shown++; });
    buttons.forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === key ? 'true' : 'false'));
    none.hidden = shown > 0;
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
  const q = new URLSearchParams(location.search).get('c');
  if (q && buttons.some((b) => b.dataset.filter === q)) apply(q);
}
