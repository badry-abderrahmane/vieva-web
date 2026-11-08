# Vieva Services web: implementation plan

Goal: a French-first B2B site that turns corporate event and marketing buyers into quote requests. It is lead generation, not e-commerce. Source of truth for scope: the HS Print website specification (Claude Docs) and the Vieva design canvas.

## Stack

- Vite 5, vanilla JS (ES modules), plain CSS with design tokens.
- three.js 0.128 for the hero scene, GSAP 3.12 + ScrollTrigger for motion.
- Static output (`dist/`), deployable to any static host or GitHub Pages.
- The spec's Nuxt + Laravel stack is the long-term target. This repo is the front-end prototype and design source for it.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0. Foundation | Repo, Vite build, tokens, logo asset, docs | Done |
| 1. Home, desktop and mobile | Hero with 3D print stand, marquee, stats, services, work, method, sectors, CTA, footer. Mobile drawer and action bar. | Done |
| 2. Core pages | Services hub and six service pages, catalogue and 12 product pages, portfolio and 3 case pages, About, Contact, legal and privacy | Done (placeholder content) |
| 3. Quote flow | 5-step form with validation, file picking, quote basket, WhatsApp pre-filled messages, analytics events | Done (front end) |
| 4. Languages and SEO | FR / EN / AR with RTL, hreflang, canonical, schema.org, sitemap, robots, Open Graph | Done |
| 5. Back end | Reference API with lead inbox and CSV (done). Laravel + Filament production build and Ageno sync | Reference done; production not started |
| 6. Launch | Content, photos, QA, Lighthouse, DNS | Blocked on client content; QA tooling done |

Dark and light themes follow the system setting (`prefers-color-scheme`) on every page.

## Done in phases 2 to 6

- `scripts/generate.mjs` renders 30 routes in 3 languages (90 pages) from `src/data`. `npm run check` verifies links, SEO tags and ids on the build output. `npm run e2e` drives basket, quote form, filters, mobile menu and RTL in Chrome.
- `server/index.mjs` implements the quote API (see `docs/API.md`).

## Still open

- Real photos, texts, opening hours, founding year, product sizes and lead times. Every placeholder is shown in `[brackets]`.
- Arabic and English copy was written for this build and should be reviewed by a native speaker.
- Privacy and legal text is indicative and needs legal review.
- Production back end (Laravel + Filament), WhatsApp and email notifications, Ageno sync.
- Hosting, DNS, Google Business Profile, analytics tool choice, Lighthouse audit on the live host.
- Newsletter opt-in (in the spec, not built).

## Phase 1 breakdown (this commit)

1. Project scaffold and tokens (`src/style.css`).
2. Logo: vector recreation of the supplied mark (`public/logo.svg`), reference PNG kept in `public/brand/`.
3. Hero scene (`src/scene.js`): waving tarp textured from a 2D canvas (logo, tagline, eyelets), vinyl roll, trophy, forex panels. Mobile variant with fewer segments.
4. UI behavior (`src/main.js`): headline split and variable-font hover, GSAP reveals, counters, service swatch, card tilt, drawer, form preview.
5. Mobile: drawer, bottom action bar, stacked hero, always-open service rows, swipeable cards.
6. Accessibility: contrast fixes, focus styles, reduced motion, labelled controls.

## Acceptance criteria

- `npm run build` succeeds with no errors.
- No horizontal scroll at 390 px or 1440 px.
- All text meets WCAG AA contrast.
- Hero renders a WebGL scene; if WebGL fails the CSS fallback shows and the page still works.
- Phone width shows the drawer button and the bottom bar; desktop shows neither.

## Needed from the client

- Final vector logo (the current one is recreated from a screenshot).
- 20 to 40 project photos with sector and a one-line brief.
- Opening hours, founding year, team photo, city and service area.
- Confirmation of the WhatsApp number (the mobile number in the footer is used as a placeholder).
- Permission to show client logos.

## Open decisions

- Brand name on the site: "Vieva Services" (current) or "HS Print" (spec, domain `hsprint.ma`).
- Hosting: GitHub Pages for review builds, VPS behind Cloudflare for production.
