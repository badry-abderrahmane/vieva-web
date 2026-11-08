# vieva-web

Marketing site for Vieva Services (large-format printing, events, installation, supplies), Morocco.

- Plan and phases: [docs/PLAN.md](docs/PLAN.md)
- Design review (colors, layout): [docs/DESIGN-REVIEW.md](docs/DESIGN-REVIEW.md)

## Run

```bash
npm install
npm run dev      # generates pages, then http://localhost:5173
npm run build    # generates 90 pages into dist/
npm run check    # links, SEO tags, unique ids on dist/
npm run preview  # serves dist/ on :4173 (needed by e2e)
npm run e2e      # Chrome smoke test: basket, quote form, mobile menu, RTL
npm run api      # reference quote API on :8787 (see docs/API.md)
```

Copy `.env.example` to `.env` to connect the quote form to the API (`VITE_QUOTE_ENDPOINT`). Without it the form runs in preview mode and sends nothing.

## Structure

```
scripts/generate.mjs   renders every page in FR, EN and AR from src/data
scripts/check.mjs      post-build checks
scripts/e2e.mjs        browser smoke test (Chrome over CDP)
src/data/ui.js         UI strings (FR, EN, AR)
src/data/content.js    services, products, case studies
src/style.css          tokens, light and dark themes, RTL, mobile rules
src/main.js            entry; loads page modules on demand
src/home.js, scene.js  home page: 3D hero (three.js) and motion (GSAP); only loaded on the home page
src/wizard.js          5-step quote form
src/basket.js          quote basket (localStorage)
server/index.mjs       reference quote API and lead inbox
docs/                  PLAN, DESIGN-REVIEW, API
```

Generated and git-ignored: `index.html`, the page folders (`services/`, `catalogue/`, `en/`, `ar/`, ...), `public/sitemap.xml`, `public/robots.txt`, `public/og.svg`.

## Themes and languages

Light and dark follow the system setting. French is the default (root URLs); English lives under `/en/` and Arabic (right-to-left) under `/ar/`.

Stack: Vite, three.js 0.128, GSAP 3.12. Fonts from Google Fonts.
