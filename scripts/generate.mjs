// Static page generator: renders every route in FR (root), EN (/en) and AR (/ar, RTL) from src/data.
// Run: node scripts/generate.mjs   (BASE and SITE_URL env vars optional)
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { UI, LANGS, DEFAULT_LANG, LANG_LABEL, LANG_NAME, LOCALE, CONTACT } from '../src/data/ui.js';
import { SERVICES, PRODUCTS, CASES } from '../src/data/content.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const SITE = (process.env.SITE_URL || 'https://hsprint.ma').replace(/\/$/, '');
const PREFIX = BASE.slice(0, -1);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const prefix = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);
const url = (lang, path) => `${PREFIX}${prefix(lang)}${path}`;
const abs = (lang, path) => `${SITE}${prefix(lang)}${path}`;

const ICON = {
  moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
  sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  arrow: '<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z"/><path d="M9 9.5c.3 1.6 1.9 3.6 3.6 4.4l1.2-1.1 2 .9c-.2 1.3-1.2 2-2.3 1.8C10.7 15 8.6 12.7 8 10.2 7.8 9.1 8.5 8.1 9.8 8l.9 2-1.7-.5z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
};

const LEAD_TXT = {
  fr: 'Selon quantité et complexité. [À confirmer]',
  en: 'Depends on quantity and complexity. [To confirm]',
  ar: 'حسب الكمية والتعقيد. [قيد التأكيد]',
};

/* ---------- shared fragments ---------- */
const themeBtn = (lang) => `<button class="theme-btn" type="button" aria-label="${esc(UI[lang].theme)}" title="${esc(UI[lang].theme)}">${ICON.moon}${ICON.sun}</button>`;
const logo = (lang, cls = '') => `<a class="logo ${cls}" href="${url(lang, '/')}" aria-label="${esc(UI[lang].siteName)}"><span class="logo-box"><b>VIEVA</b><i>SERVICES</i></span></a>`;

function langLinks(lang, path) {
  return `<div class="lang" aria-label="Langue">${LANGS.map((l) => `<a href="${url(l, path)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${LANG_LABEL[l]}</a>`).join('')}</div>`;
}

function header(lang, path, current) {
  const t = UI[lang];
  const cur = (k) => (current === k ? ' aria-current="page"' : '');
  const mega = SERVICES.map((s) => `<a href="${url(lang, `/services/${s.slug}/`)}">${esc(s.name[lang])}</a>`).join('');
  return `<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="nav"><div class="wrap">
  ${logo(lang)}
  <nav aria-label="Navigation"><ul>
    <li><a href="${url(lang, '/services/')}"${cur('services')}>${esc(t.nav.services)}</a><div class="mega"><div>${mega}</div></div></li>
    <li><a href="${url(lang, '/catalogue/')}"${cur('catalogue')}>${esc(t.nav.catalogue)}</a></li>
    <li><a href="${url(lang, '/realisations/')}"${cur('work')}>${esc(t.nav.work)}</a></li>
    <li><a href="${url(lang, '/a-propos/')}"${cur('about')}>${esc(t.nav.about)}</a></li>
    <li><a href="${url(lang, '/contact/')}"${cur('contact')}>${esc(t.nav.contact)}</a></li>
  </ul></nav>
  <div class="nav-r">
    ${langLinks(lang, path)}
    ${themeBtn(lang)}
    <a class="basket-link" id="basketLink" href="${url(lang, '/devis/')}" data-label="${esc(t.basket)}">${esc(t.basket)} <b id="basketCount">0</b></a>
    <a class="btn g nav-cta" href="${url(lang, '/devis/')}" data-track="quote_click">${esc(t.quote)}</a>
    <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(t.openMenu)}" data-open="${esc(t.openMenu)}" data-close="${esc(t.closeMenu)}"><span></span><span></span></button>
  </div>
</div></header>
<div class="drawer" id="drawer" hidden>
  <nav aria-label="Menu">
    <a href="${url(lang, '/services/')}">${esc(t.nav.services)}</a>
    <a href="${url(lang, '/catalogue/')}">${esc(t.nav.catalogue)}</a>
    <a href="${url(lang, '/realisations/')}">${esc(t.nav.work)}</a>
    <a href="${url(lang, '/a-propos/')}">${esc(t.nav.about)}</a>
    <a href="${url(lang, '/contact/')}">${esc(t.nav.contact)}</a>
  </nav>
  <div class="drawer-foot">
    <a class="btn dark" href="${url(lang, '/devis/')}">${esc(t.quoteCta)}</a>
    <div style="display:flex;gap:12px;align-items:center">${langLinks(lang, path)}${themeBtn(lang)}</div>
    <div class="mono">${CONTACT.phone}<br>${CONTACT.email}</div>
  </div>
</div>`;
}

function footer(lang) {
  const t = UI[lang], f = t.footer;
  return `<footer><div class="wrap foot">
  <div>${logo(lang, 'lg')}<p style="max-width:34ch;margin-top:26px">${esc(f.tagline)}</p></div>
  <div><b>${esc(f.services)}</b>${SERVICES.slice(0, 5).map((s) => `<a href="${url(lang, `/services/${s.slug}/`)}">${esc(s.name[lang])}</a>`).join('')}<a href="${url(lang, '/catalogue/')}">${esc(t.nav.catalogue)}</a></div>
  <div><b>${esc(f.contact)}</b><span>${esc(CONTACT.address)}</span><span dir="ltr">${CONTACT.phone}</span><span dir="ltr">${CONTACT.mobile}</span><span>${CONTACT.email}</span><span>${esc(f.hours)}</span></div>
  <div><b>${esc(f.company)}</b><span class="mono" dir="ltr" style="font-size:11px;line-height:1.8;text-align:start">ICE ${CONTACT.legal.ice}<br>RC ${CONTACT.legal.rc} · IF ${CONTACT.legal.if}<br>TP ${CONTACT.legal.tp}</span><a href="${url(lang, '/mentions-legales/')}">${esc(f.legal)}</a><a href="${url(lang, '/confidentialite/')}">${esc(f.privacy)}</a></div>
</div>
<div class="wrap legal mono"><span>${esc(f.rights)}</span><span>${esc(f.preview)}</span></div></footer>`;
}

function actionBar(lang, waText) {
  const t = UI[lang];
  return `<nav class="bar" aria-label="${esc(t.call)} / ${esc(t.whatsapp)} / ${esc(t.quoteShort)}">
  <a href="tel:${CONTACT.phoneHref}" data-track="phone_click">${ICON.phone}${esc(t.call)}</a>
  <a href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waText)}" rel="noopener" data-track="whatsapp_click">${ICON.wa}${esc(t.whatsapp)}</a>
  <a class="primary" href="${url(lang, '/devis/')}" data-track="quote_click">${esc(t.quoteShort)}</a>
</nav>
<a class="wa-float" href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waText)}" rel="noopener" aria-label="${esc(t.waFloat)}" data-track="whatsapp_click">${ICON.wa}</a>`;
}

function crumbs(lang, items) {
  const t = UI[lang];
  const all = [{ label: t.homeLabel, href: url(lang, '/') }, ...items];
  return `<nav aria-label="${esc(t.breadcrumb)}"><ol class="crumbs mono">${all.map((c, i) => (i === all.length - 1 ? `<li aria-current="page">${esc(c.label)}</li>` : `<li><a href="${c.href}">${esc(c.label)}</a></li>`)).join('')}</ol></nav>`;
}

function phero(lang, items, title, lead, ctas = '') {
  return `<section class="phero"><div class="wrap">${crumbs(lang, items)}<h1>${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${ctas ? `<div class="cta-row">${ctas}</div>` : ''}</div></section>`;
}

const shot = (c1, c2, label, cls = '') => `<div class="shot ${cls}" style="--c1:${c1};--c2:${c2}"><span class="mono">[Photo] ${esc(label)}</span></div>`;

function productCard(lang, p) {
  const t = UI[lang];
  const name = p.name[lang];
  const svc = SERVICES.find((s) => s.slug === p.service);
  return `<article class="pcard" data-service="${p.service}">
  ${shot(p.c1, p.c2, name, 'wide')}
  <div class="meta">${esc(svc.name[lang])}</div>
  <h3><a href="${url(lang, `/catalogue/${p.slug}/`)}">${esc(name)}</a></h3>
  <p>${esc(p.desc[lang])}</p>
  <div class="actions">
    <button class="btn g sm add" type="button" aria-pressed="false" data-slug="${p.slug}" data-name="${esc(name)}" data-service="${p.service}" data-add="${esc(t.filter.add)}" data-added="${esc(t.filter.added)}">${esc(t.filter.add)}</button>
    <a class="btn ghost sm" href="${url(lang, `/catalogue/${p.slug}/`)}">${esc(t.discover)}</a>
  </div>
</article>`;
}

function caseCard(lang, c) {
  const svc = SERVICES.find((s) => s.slug === c.service);
  return `<a class="card" href="${url(lang, `/realisations/${c.slug}/`)}" data-reveal>${shot(c.c1, c.c2, c.name[lang])}<div class="chips"><span class="pill">${esc(svc.name[lang])}</span><span class="pill">${esc(c.sector[lang])}</span></div><h3>${esc(c.name[lang])}</h3></a>`;
}

function serviceRow(lang, s) {
  return `<a class="svc" href="${url(lang, `/services/${s.slug}/`)}" data-c1="${s.c1}" data-c2="${s.c2}"><div class="svc-in"><h3>${esc(s.name[lang])}</h3><span class="tag mono">${esc(s.tag[lang])}</span><div class="desc"><p>${esc(s.short[lang])}</p></div></div></a>`;
}

const quoteBtn = (lang, cls = 'dark') => `<a class="btn ${cls}" href="${url(lang, '/devis/')}" data-track="quote_click">${esc(UI[lang].quoteCta)} ${ICON.arrow}</a>`;
const waBtn = (lang, text, cls = 'ghost-dark') => `<a class="btn ${cls}" href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}" rel="noopener" data-track="whatsapp_click">${ICON.wa} ${esc(UI[lang].whatsapp)}</a>`;

function ctaBand(lang) {
  const h = UI[lang].home;
  return `<section class="block quote"><div class="wrap">
  <div class="eyebrow mono">${esc(UI[lang].quote)}</div>
  <h2 data-reveal style="margin-top:18px">${esc(h.ctaTitle[0])}<em>${esc(h.ctaTitle[1])}</em></h2>
  <div class="q-grid"><div><p>${esc(h.ctaText)}</p><div class="mono" dir="ltr" style="color:var(--band-fg)">${CONTACT.phone}<br>${CONTACT.email}</div></div>
  <div class="cta-row" style="justify-content:flex-start">${quoteBtn(lang, 'g')}${waBtn(lang, UI[lang].waMsg, 'ghost')}</div></div>
</div></section>`;
}

/* ---------- page bodies ---------- */
function homeBody(lang) {
  const t = UI[lang], h = t.home, hero = t.hero;
  const lines = hero.lines.map((l) => `<span class="line" data-t="${esc(l)}">${lang === 'ar' ? esc(l) : ''}</span>`).join('');
  const stats = t.stats.map(([n, l]) => `<div><b data-n="${n}">${n}</b><span>${esc(l)}</span></div>`).join('');
  const steps = h.steps.map(([a, b], i) => `<div class="step" data-reveal><div class="sw">${i + 1}</div><h3>${esc(a)}</h3><p>${esc(b)}</p></div>`).join('');
  const half = Math.ceil(h.sectors.length / 2);
  const mq = t.marquee.map((m) => `<span>${esc(m)}</span>`).join('');
  return `<section class="hero" id="hero" aria-label="${esc(hero.label)}" data-banner="${esc(hero.banner)}" data-banner-right="${esc(hero.bannerRight)}">
  <canvas id="gl" aria-hidden="true"></canvas>
  <div class="marks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <div class="hero-top mono" aria-hidden="true"><span>${esc(hero.top[0])}</span><span>${esc(hero.top[1])}</span></div>
  <div class="wrap">
    <h1 id="h1" aria-label="${esc(hero.label)}">${lines}</h1>
    <div class="hero-row">
      <p>${esc(hero.sub)}</p>
      <div style="display:flex;flex-direction:column;gap:18px;align-items:flex-start">
        <div class="cta-row">
          <a class="btn dark" href="${url(lang, '/devis/')}" data-track="quote_click">${esc(t.quoteCta)} ${ICON.arrow}</a>
          <a class="btn ghost-dark" href="${url(lang, '/realisations/')}">${esc(hero.seeWork)}</a>
        </div>
        <div class="ticks mono">${hero.ticks.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
      </div>
    </div>
  </div>
</section>
<div class="marquee" aria-hidden="true"><div class="track" id="mq">${mq}</div></div>
<div class="stats" id="stats">${stats}</div>
<section class="block" id="services">
  <div class="wrap head" data-reveal><div><div class="eyebrow mono" style="margin-bottom:18px">${esc(h.servicesEyebrow)}</div><h2>${esc(h.servicesTitle)}</h2></div><p>${esc(h.servicesNote)}</p></div>
  <div class="svc-list" id="svcs">${SERVICES.map((s) => serviceRow(lang, s)).join('')}</div>
</section>
<div class="peek" id="peek" aria-hidden="true"></div>
<section class="block work" id="realisations"><div class="wrap">
  <div class="head" data-reveal><div><div class="eyebrow mono" style="margin-bottom:18px">${esc(h.workEyebrow)}</div><h2>${esc(h.workTitle)}</h2></div><p>${esc(h.workNote)}</p></div>
  <div class="strip" id="strip">${CASES.map((c) => caseCard(lang, c)).join('')}</div>
  <div class="work-foot"><a class="btn" href="${url(lang, '/realisations/')}">${esc(h.allWork)}</a></div>
</div></section>
<section class="block" id="methode"><div class="wrap">
  <div class="head" data-reveal><div><div class="eyebrow mono" style="margin-bottom:18px">${esc(h.methodEyebrow)}</div><h2>${esc(h.methodTitle)}</h2></div><p>${esc(h.methodNote)}</p></div>
  <div class="steps" id="steps"><div class="rail" aria-hidden="true"><i id="railfill"></i></div>${steps}</div>
</div></section>
<section class="sectors" aria-label="${esc(h.sectorsTitle)}">
  <div class="wrap"><h2 data-reveal>${esc(h.sectorsTitle)}</h2></div>
  <div class="row" id="r1">${h.sectors.slice(0, half).map((s) => `<span>${esc(s)}</span>`).join('')}</div>
  <div class="row rev" id="r2">${h.sectors.slice(half).map((s) => `<span>${esc(s)}</span>`).join('')}</div>
</section>
${ctaBand(lang)}`;
}

function servicesBody(lang) {
  const t = UI[lang], p = t.pages.services;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead, quoteBtn(lang))}
<section class="block"><div class="svc-list" id="svcs">${SERVICES.map((s) => serviceRow(lang, s)).join('')}</div></section>
<div class="peek" id="peek" aria-hidden="true"></div>
${ctaBand(lang)}`;
}

function serviceBody(lang, s) {
  const t = UI[lang], sp = t.spec;
  const prods = PRODUCTS.filter((p) => p.service === s.slug);
  const cases = CASES.filter((c) => c.service === s.slug);
  const faq = s.faq.map(([q, a]) => `<details><summary>${esc(q[lang])}</summary><p>${esc(a[lang])}</p></details>`).join('');
  return `${phero(lang, [{ label: t.nav.services, href: url(lang, '/services/') }, { label: s.name[lang] }], s.name[lang], s.short[lang], quoteBtn(lang) + waBtn(lang, `${t.waMsg} (${s.name[lang]})`))}
<section class="block"><div class="wrap stack">
  <div class="cols">
    <div class="prose"><h2>${esc(sp.intro)}</h2><p>${esc(s.intro[lang])}</p><h2>${esc(sp.use)}</h2><ul class="checks">${s.uses.map((u) => `<li>${esc(u[lang])}</li>`).join('')}</ul></div>
    <aside class="panel sticky-panel"><h3 style="font-size:24px;margin-bottom:10px">${esc(t.quoteCta)}</h3><p style="color:var(--mute);margin:0 0 18px">${esc(t.pages.devis.lead)}</p><div class="cta-row">${quoteBtn(lang, 'g')}</div></aside>
  </div>
  ${prods.length ? `<div><div class="hr-top head"><h2 style="font-size:clamp(32px,4vw,60px)">${esc(sp.products)}</h2></div><div class="pgrid">${prods.map((p) => productCard(lang, p)).join('')}</div></div>` : ''}
  <div class="faq"><div class="hr-top head"><h2 style="font-size:clamp(32px,4vw,60px)">${esc(sp.faq)}</h2></div>${faq}</div>
  ${cases.length ? `<div><div class="hr-top head"><h2 style="font-size:clamp(32px,4vw,60px)">${esc(sp.cases)}</h2></div><div class="pgrid">${cases.map((c) => caseCard(lang, c)).join('')}</div></div>` : ''}
</div></section>
${ctaBand(lang)}`;
}

function catalogueBody(lang) {
  const t = UI[lang], p = t.pages.catalogue;
  const chips = [`<button class="fbtn" type="button" data-filter="all" aria-pressed="true">${esc(t.filter.all)}</button>`, ...SERVICES.filter((s) => PRODUCTS.some((x) => x.service === s.slug)).map((s) => `<button class="fbtn" type="button" data-filter="${s.slug}" aria-pressed="false">${esc(s.name[lang])}</button>`)].join('');
  return `${phero(lang, [{ label: p.title }], p.title, p.lead)}
<section class="block"><div class="wrap">
  <div class="toolbar" role="group" aria-label="${esc(p.title)}" id="filters">${chips}</div>
  <div class="pgrid" id="pgrid">${PRODUCTS.map((x) => productCard(lang, x)).join('')}</div>
  <p class="empty" id="none" hidden>${esc(t.filter.none)}</p>
</div></section>
${ctaBand(lang)}`;
}

function productBody(lang, p) {
  const t = UI[lang], sp = t.spec;
  const svc = SERVICES.find((s) => s.slug === p.service);
  const rel = PRODUCTS.filter((x) => x.service === p.service && x.slug !== p.slug).slice(0, 3);
  return `${phero(lang, [{ label: t.nav.catalogue, href: url(lang, '/catalogue/') }, { label: p.name[lang] }], p.name[lang], p.desc[lang])}
<section class="block"><div class="wrap stack">
  <div class="cols">
    <div>${shot(p.c1, p.c2, p.name[lang], 'wide')}</div>
    <div>
      <dl class="spec">
        <dt>${esc(sp.service)}</dt><dd><a href="${url(lang, `/services/${svc.slug}/`)}">${esc(svc.name[lang])}</a></dd>
        <dt>${esc(sp.material)}</dt><dd>${esc(p.material[lang])}</dd>
        <dt>${esc(sp.sizes)}</dt><dd>${esc(p.sizes[lang])}</dd>
        <dt>${esc(sp.finish)}</dt><dd>${esc(p.finish[lang])}</dd>
        <dt>${esc(sp.lead)}</dt><dd>${esc(LEAD_TXT[lang])}</dd>
      </dl>
      <div class="cta-row" style="margin-top:24px">
        <button class="btn g add" type="button" aria-pressed="false" data-slug="${p.slug}" data-name="${esc(p.name[lang])}" data-service="${p.service}" data-add="${esc(t.filter.add)}" data-added="${esc(t.filter.added)}">${esc(t.filter.add)}</button>
        <a class="btn ghost" href="${url(lang, '/devis/')}">${esc(t.quoteCta)}</a>
      </div>
    </div>
  </div>
  ${rel.length ? `<div><div class="hr-top head"><h2 style="font-size:clamp(32px,4vw,60px)">${esc(sp.related)}</h2></div><div class="pgrid">${rel.map((x) => productCard(lang, x)).join('')}</div></div>` : ''}
</div></section>`;
}

function workBody(lang) {
  const t = UI[lang], p = t.pages.work;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead)}
<section class="block work"><div class="wrap"><div class="pgrid">${CASES.map((c) => caseCard(lang, c)).join('')}</div><p class="empty">${esc(t.home.workNote)}</p></div></section>
${ctaBand(lang)}`;
}

function caseBody(lang, c) {
  const t = UI[lang], sp = t.spec;
  const svc = SERVICES.find((s) => s.slug === c.service);
  return `${phero(lang, [{ label: t.nav.work, href: url(lang, '/realisations/') }, { label: c.name[lang] }], c.name[lang], '')}
<section class="block"><div class="wrap stack"><div class="cols">
  <div class="prose"><div>${shot(c.c1, c.c2, c.name[lang], 'wide')}</div><h2 style="margin-top:1.4em">${esc(sp.brief)}</h2><p>${esc(c.brief[lang])}</p><h2>${esc(sp.delivered)}</h2><ul class="checks">${c.delivered.map((d) => `<li>${esc(d[lang])}</li>`).join('')}</ul></div>
  <aside class="panel sticky-panel"><dl class="spec" style="margin-bottom:20px"><dt>${esc(sp.service)}</dt><dd><a href="${url(lang, `/services/${svc.slug}/`)}">${esc(svc.name[lang])}</a></dd><dt>${esc(sp.sector)}</dt><dd>${esc(c.sector[lang])}</dd></dl>${quoteBtn(lang, 'g')}</aside>
</div></div></section>
${ctaBand(lang)}`;
}

function aboutBody(lang) {
  const t = UI[lang], a = t.about, p = t.pages.about;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead, quoteBtn(lang))}
<section class="block"><div class="wrap stack">
  <div class="cols"><div class="prose"><h2>${esc(a.storyTitle)}</h2>${a.story.map((x) => `<p>${esc(x)}</p>`).join('')}</div>
  <div class="panel"><h3 style="font-size:24px;margin-bottom:10px">${esc(a.zoneTitle)}</h3><p style="margin:0;color:var(--mute)">${esc(a.zone)}</p></div></div>
  <div><div class="hr-top head"><h2 style="font-size:clamp(32px,4vw,60px)">${esc(a.valuesTitle)}</h2></div><div class="cgrid">${a.values.map(([h, d]) => `<div class="panel"><h3 style="font-size:24px">${esc(h)}</h3><p style="margin:0;color:var(--mute)">${esc(d)}</p></div>`).join('')}</div></div>
</div></section>
${ctaBand(lang)}`;
}

function contactBody(lang) {
  const t = UI[lang], c = t.contact, p = t.pages.contact;
  const map = `https://www.openstreetmap.org/search?query=${encodeURIComponent(CONTACT.address)}`;
  const copy = (v) => `<button class="btn ghost sm copy" type="button" data-copy="${esc(v)}" data-copied="${esc(c.copied)}" data-label="${esc(c.copy)}">${esc(c.copy)}</button>`;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead, quoteBtn(lang) + waBtn(lang, t.waMsg))}
<section class="block"><div class="wrap cgrid">
  <div class="panel"><span class="mono">${esc(c.reach)}</span><a class="big" href="tel:${CONTACT.phoneHref}" dir="ltr" data-track="phone_click">${CONTACT.phone}</a>${copy(CONTACT.phone)}</div>
  <div class="panel"><span class="mono">${esc(t.whatsapp)}</span><a class="big" href="https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.waMsg)}" rel="noopener" dir="ltr" data-track="whatsapp_click">${CONTACT.mobile}</a>${copy(CONTACT.mobile)}</div>
  <div class="panel"><span class="mono">Email</span><a class="big" href="mailto:${CONTACT.email}">${CONTACT.email}</a>${copy(CONTACT.email)}</div>
  <div class="panel"><span class="mono">${esc(c.address)}</span><span class="big" style="font-size:22px">${esc(CONTACT.address)}</span><a class="btn ghost sm copy" href="${map}" rel="noopener">${esc(c.map)}</a></div>
  <div class="panel"><span class="mono">${esc(c.hours)}</span><span class="big" style="font-size:22px">${esc(c.hoursVal)}</span></div>
</div></section>`;
}

function legalBody(lang) {
  const t = UI[lang], p = t.pages.legal, l = t.legalPage;
  const L2 = CONTACT.legal;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead)}
<section class="block"><div class="wrap"><div class="legal-prose">
  <h2>${esc(l.company)}</h2><p>${esc(t.siteName)}</p>
  <h2>${esc(l.address)}</h2><p>${esc(CONTACT.address)}</p>
  <h2>${esc(l.identifiers)}</h2><p dir="ltr" style="text-align:start">ICE ${L2.ice}<br>RC ${L2.rc}<br>IF ${L2.if}<br>TP ${L2.tp}</p>
  <h2>${esc(l.publisher)}</h2><p>${esc(l.publisherVal)}</p>
  <h2>${esc(l.host)}</h2><p>${esc(l.hostVal)}</p>
</div></div></section>`;
}

function privacyBody(lang) {
  const t = UI[lang], p = t.pages.privacy, l = t.legalPage;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead)}
<section class="block"><div class="wrap"><div class="legal-prose">
  ${l.privacy.map(([h, d]) => `<h2>${esc(h)}</h2><p>${esc(d)}</p>`).join('')}
  <div class="note-box">${esc(l.note)}</div>
</div></div></section>`;
}

function devisBody(lang) {
  const t = UI[lang], f = t.form, p = t.pages.devis;
  const svcBtns = SERVICES.map((s) => `<button type="button" class="sbtn" aria-pressed="false" data-slug="${s.slug}"><b>${esc(s.name[lang])}</b><span>${esc(s.tag[lang])}</span></button>`).join('');
  const mats = f.materials.map((m) => `<option>${esc(m)}</option>`).join('');
  const aside = f.aside;
  return `${phero(lang, [{ label: p.title }], p.title, p.lead)}
<section class="block"><div class="wrap wizard-wrap">
  <div class="wizard">
    <form class="wcard" id="wizard" novalidate>
      <div id="wsteps">
        <div class="wstep-head"><span id="wlabel"></span><span id="wpct"></span></div>
        <div class="wbar" aria-hidden="true"><i id="wfill" style="width:20%"></i></div>

        <section data-step="1"><h2>${esc(f.s1)}</h2><p class="sub">${esc(f.s1n)}</p><div class="sgrid">${svcBtns}</div></section>

        <section data-step="2" hidden><h2>${esc(f.s2)}</h2><div class="basket-box" id="wbasket" hidden><b>${esc(f.basketTitle)}</b><div class="chips" id="wbasketList"></div></div>
          <div class="fgrid">
            <label class="fl full" for="product">${esc(f.product)}<input id="product" name="product" type="text" placeholder="${esc(f.productPh)}"></label>
            <label class="fl" for="width">${esc(f.width)}<input id="width" name="width" type="number" min="0" inputmode="numeric"></label>
            <label class="fl" for="height">${esc(f.height)}<input id="height" name="height" type="number" min="0" inputmode="numeric"></label>
            <label class="fl" for="qty">${esc(f.qty)}<input id="qty" name="qty" type="number" min="1" inputmode="numeric"></label>
            <label class="fl" for="material">${esc(f.material)}<select id="material" name="material"><option value="">${esc(f.unknown)}</option>${mats}</select></label>
            <fieldset class="radios"><legend>${esc(f.install)}</legend><label><input type="radio" name="install" value="yes"> ${esc(f.yes)}</label><label><input type="radio" name="install" value="no"> ${esc(f.no)}</label></fieldset>
          </div></section>

        <section data-step="3" hidden><h2>${esc(f.s3)}</h2><p class="sub">${esc(f.s3n)}</p>
          <label class="drop" id="drop" for="fileInput">${ICON.upload}<b>${esc(f.drop)}</b><span style="color:var(--mute);font-size:14px">${esc(f.later)}</span><input id="fileInput" name="files" type="file" multiple accept=".pdf,.ai,.png,.jpg,.jpeg"></label>
          <ul class="files" id="fileList"></ul></section>

        <section data-step="4" hidden><h2>${esc(f.s4)}</h2>
          <div class="fgrid">
            <label class="fl" for="date">${esc(f.date)}<input id="date" name="date" type="date"></label>
            <label class="fl" for="city">${esc(f.city)}<input id="city" name="city" type="text" placeholder="${esc(f.cityPh)}"></label>
            <fieldset class="radios"><legend>${esc(f.mode)}</legend><label><input type="radio" name="mode" value="delivery" checked> ${esc(f.delivery)}</label><label><input type="radio" name="mode" value="pickup"> ${esc(f.pickup)}</label></fieldset>
            <label class="fl full" for="comment">${esc(f.comment)}<textarea id="comment" name="comment" rows="4" placeholder="${esc(f.commentPh)}"></textarea></label>
          </div></section>

        <section data-step="5" hidden><h2>${esc(f.s5)}</h2>
          <div class="fgrid">
            <label class="fl" for="name">${esc(f.name)}<input id="name" name="name" type="text" autocomplete="name"></label>
            <label class="fl" for="company">${esc(f.company)}<input id="company" name="company" type="text" autocomplete="organization"></label>
            <label class="fl" for="role">${esc(f.role)}<input id="role" name="role" type="text" autocomplete="organization-title"></label>
            <label class="fl" for="phone">${esc(f.phone)}<input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr"></label>
            <label class="fl full" for="email">${esc(f.email)}<input id="email" name="email" type="email" autocomplete="email" dir="ltr"></label>
            <label class="fl full" for="ice">${esc(f.ice)}<input id="ice" name="ice" type="text" inputmode="numeric" dir="ltr"></label>
            <div class="honey" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          </div></section>

        <p class="err" id="werr" role="alert"></p>
        <div class="wnav"><button class="btn ghost" type="button" id="wprev">${esc(f.prev)}</button><button class="btn g" type="button" id="wnext">${esc(f.next)}</button></div>
      </div>

      <div class="wdone" id="wdone" hidden>
        <span class="ok">${ICON.check}</span><h2>${esc(f.doneTitle)}</h2><p style="color:var(--mute);max-width:44ch;margin:0">${esc(f.doneText)}</p>
        <a class="btn g" id="wasend" href="#" rel="noopener" data-track="whatsapp_click" hidden>${ICON.wa} ${esc(f.waBtn)}</a>
        <p id="wpreview" style="color:var(--mute);max-width:52ch;margin:0" hidden>${esc(f.waAttach)} <b id="wfiles"></b></p>
        <button class="btn ghost" type="button" id="wrestart">${esc(f.restart)}</button>
      </div>
    </form>
  </div>
  <aside class="wizard-aside">
    <div class="dark-card"><h3>${esc(aside.wa)}</h3><p>${esc(aside.waText)}</p>${waBtn(lang, t.waMsg, 'g')}<p class="mono" dir="ltr" style="color:var(--band-mute)">${esc(aside.or)} ${CONTACT.phone}</p></div>
    <div class="panel"><h3 style="font-size:22px;margin-bottom:14px">${esc(aside.why)}</h3><ul class="checks">${aside.whyItems.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </aside>
</div></section>`;
}

/* ---------- page registry ---------- */
function pages() {
  const out = [];
  out.push({ key: 'home', nav: 'home', path: '/', title: (l) => UI[l].siteName + ' · ' + UI[l].hero.label, desc: (l) => UI[l].hero.sub, body: homeBody });
  out.push({ key: 'services', nav: 'services', path: '/services/', title: (l) => UI[l].pages.services.title, desc: (l) => UI[l].pages.services.lead, body: servicesBody });
  for (const s of SERVICES) out.push({ key: 'service', nav: 'services', path: `/services/${s.slug}/`, title: (l) => s.name[l], desc: (l) => s.short[l], body: (l) => serviceBody(l, s), ld: (l) => ({ '@type': 'Service', name: s.name[l], description: s.short[l], provider: { '@type': 'LocalBusiness', name: 'Vieva Services' }, areaServed: 'MA' }), crumbs: (l) => [[UI[l].nav.services, '/services/'], [s.name[l]]] });
  out.push({ key: 'catalogue', nav: 'catalogue', path: '/catalogue/', title: (l) => UI[l].pages.catalogue.title, desc: (l) => UI[l].pages.catalogue.lead, body: catalogueBody });
  for (const p of PRODUCTS) out.push({ key: 'product', nav: 'catalogue', path: `/catalogue/${p.slug}/`, title: (l) => p.name[l], desc: (l) => p.desc[l], body: (l) => productBody(l, p), ld: (l) => ({ '@type': 'Product', name: p.name[l], description: p.desc[l], material: p.material[l], brand: { '@type': 'Brand', name: 'Vieva Services' } }), crumbs: (l) => [[UI[l].nav.catalogue, '/catalogue/'], [p.name[l]]] });
  out.push({ key: 'work', nav: 'work', path: '/realisations/', title: (l) => UI[l].pages.work.title, desc: (l) => UI[l].pages.work.lead, body: workBody });
  for (const c of CASES) out.push({ key: 'case', nav: 'work', path: `/realisations/${c.slug}/`, title: (l) => c.name[l], desc: (l) => c.brief[l], body: (l) => caseBody(l, c), crumbs: (l) => [[UI[l].nav.work, '/realisations/'], [c.name[l]]] });
  out.push({ key: 'about', nav: 'about', path: '/a-propos/', title: (l) => UI[l].pages.about.title, desc: (l) => UI[l].pages.about.lead, body: aboutBody });
  out.push({ key: 'contact', nav: 'contact', path: '/contact/', title: (l) => UI[l].pages.contact.title, desc: (l) => UI[l].pages.contact.lead, body: contactBody });
  out.push({ key: 'devis', nav: '', path: '/devis/', title: (l) => UI[l].pages.devis.title, desc: (l) => UI[l].pages.devis.lead, body: devisBody });
  out.push({ key: 'legal', nav: '', path: '/mentions-legales/', title: (l) => UI[l].pages.legal.title, desc: (l) => UI[l].pages.legal.lead, body: legalBody });
  out.push({ key: 'privacy', nav: '', path: '/confidentialite/', title: (l) => UI[l].pages.privacy.title, desc: (l) => UI[l].pages.privacy.lead, body: privacyBody });
  return out;
}

/* ---------- document ---------- */
function document(lang, page) {
  const t = UI[lang];
  const title = page.key === 'home' ? page.title(lang) : `${page.title(lang)} · ${t.siteName}`;
  const desc = page.desc(lang);
  const alts = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(l, page.path)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${abs(DEFAULT_LANG, page.path)}">`;
  const ld = [];
  if (page.key === 'home') ld.push({ '@type': 'LocalBusiness', name: 'Vieva Services', url: abs(lang, '/'), telephone: CONTACT.phone, email: CONTACT.email, address: { '@type': 'PostalAddress', streetAddress: 'Lot Massira, Résidence Costa del Sol, Étg 4, App 21', addressLocality: 'Mohammedia', addressCountry: 'MA' }, areaServed: 'MA', taxID: CONTACT.legal.ice });
  if (page.ld) ld.push(page.ld(lang));
  if (page.crumbs) ld.push({ '@type': 'BreadcrumbList', itemListElement: [[t.homeLabel, '/'], ...page.crumbs(lang)].map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, ...(p ? { item: abs(lang, p) } : {}) })) });
  const waText = page.key === 'home' ? t.waMsg : `${t.waMsg} (${page.title(lang)})`;
  const cfg = {
    lang, dir: t.dir, base: PREFIX, wa: CONTACT.whatsapp, waMsg: t.waMsg, devis: url(lang, '/devis/'),
    form: { ...t.form, stepOf: t.form.stepOf('{n}') }, filter: t.filter,
    services: SERVICES.map((s) => ({ slug: s.slug, name: s.name[lang] })),
    fontsAr: lang === 'ar',
  };
  const fonts = `family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@500;600;700${lang === 'ar' ? '&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700' : ''}`;
  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#00A857">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0A1410">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(lang, page.path)}">
${alts}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(t.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(lang, page.path)}">
<meta property="og:locale" content="${LOCALE[lang]}">
<meta property="og:image" content="${SITE}/og.svg">
<meta name="twitter:card" content="summary_large_image">
<script>try{var t=localStorage.getItem('vieva-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="icon" href="${PREFIX}/logo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fonts}&display=swap" rel="stylesheet">
${ld.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script>` : ''}
</head>
<body data-page="${page.key}" data-lang="${lang}">
${header(lang, page.path, page.nav)}
<main id="main">
${page.body(lang)}
</main>
${footer(lang)}
${actionBar(lang, waText)}
<div class="ring" id="ring"></div>
<script type="application/json" id="cfg">${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>
<script type="module" src="${PREFIX}/src/main.js"></script>
</body>
</html>
`;
}

/* ---------- write ---------- */
const GENERATED = ['index.html', 'services', 'catalogue', 'realisations', 'a-propos', 'contact', 'devis', 'mentions-legales', 'confidentialite', 'en', 'ar'];
for (const g of GENERATED) rmSync(join(ROOT, g), { recursive: true, force: true });

const list = pages();
const written = [];
for (const lang of LANGS) {
  for (const page of list) {
    const dir = join(ROOT, prefix(lang).slice(1), page.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), document(lang, page));
    written.push({ lang, path: page.path });
  }
}

// sitemap + robots + og image
mkdirSync(join(ROOT, 'public'), { recursive: true });
const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${list
  .map((p) => LANGS.map((l) => `<url><loc>${abs(l, p.path)}</loc>${LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${abs(a, p.path)}"/>`).join('')}</url>`).join('\n'))
  .join('\n')}\n</urlset>\n`;
writeFileSync(join(ROOT, 'public/sitemap.xml'), sm);
writeFileSync(join(ROOT, 'public/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(ROOT, 'public/og.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#00A857"/><rect x="300" y="170" width="600" height="250" fill="none" stroke="#06110B" stroke-width="14"/><text x="600" y="345" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="150" letter-spacing="10" fill="#06110B">VIEVA</text><rect x="450" y="395" width="300" height="52" fill="#06110B"/><text x="600" y="432" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-weight="600" font-size="28" letter-spacing="6" fill="#00A857">SERVICES</text></svg>\n`);
console.log(`generated ${written.length} pages (${list.length} routes × ${LANGS.length} languages)`);
