# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Corporate event and marketing buyers in Morocco (communication managers, event organisers, agencies, brand and facilities teams) who need large-format print, event signage and installation, often against a date. They arrive on phone or desktop, in French first, with English and Arabic (RTL) supported. Confirmed with the user; other audiences (individuals, small businesses) are not targeted.

## Product Purpose

Vieva Services is a Moroccan printing and events company (large-format printing, events, team building, decorative panels, promo items and trophies, installation, supplies; based in Mohammedia, serving all of Morocco). The site exists to turn buyers into quote requests. It is lead generation, not e-commerce. Success is a completed quote request that arrives on WhatsApp.

## Positioning

One supplier for print, fabrication and on-site installation, so an event buyer deals with a single contact from file to finished stand. (Derived from the services content; the user has not restated it.)

## Operating Context

Buyers send artwork files (PDF, AI, PNG, JPG up to 50 MB) or ask for design help, approve a proof before printing, and often need delivery and installation on site. Many requests are time-bound by an event date.

## Capabilities and Constraints

- Static site built with Vite, vanilla JS, plain CSS tokens; GSAP 3.15 (ScrollTrigger, DrawSVG) and Lenis drive the home page's scroll story. 30 routes x FR/EN/AR = 90 generated pages from `src/data`.
- Quote flow: a 5-step form and a quote basket that end on a "Send on WhatsApp" button with the request pre-filled (number `+212 6 22 87 81 87`). No database, no admin, no payment. An optional reference quote API exists but is unused.
- Light and dark themes follow the system until the visitor toggles; the choice persists.
- Arabic is right-to-left. English and Arabic copy still needs native review. Legal and privacy text is indicative, pending legal review.
- Undecided: hosting, DNS, analytics tool, newsletter opt-in. The long-term target stack is Nuxt + Laravel.

## Brand Commitments

Brand name on the site is "Vieva Services" (confirmed); "HS Print" / hsprint.ma is not used. The client supplied the final vector logo (Nov 2026): black "Vieva" wordmark, a fan of five overprinted petals (yellow, blue, magenta, orange, coral), "SERVICES", a CMYK filet and the line "PRINT • EVENT • SOLUTIONS". The client's graphic charter (Cahier de Prescription Graphique) pins the palette (petal inks #FFC72C, #009EE2, #3D2385, #E6007E, #F35338 on white #FFFFFF / graphite #0B0F17), the fonts (Outfit, Plus Jakarta Sans, Tajawal, JetBrains Mono), zero-pill metadata and a numbered asymmetric services grid. The old brand green #00A857 is retired. The charter's "Guide de Design" panel is deliberately not built on the public site.

## Evidence on Hand

Service, catalogue and case-study content in `src/data/content.js`, with placeholders in `[brackets]` that the client must confirm. No real project photos, client logos, testimonials, opening hours or founding year exist yet. Do not fabricate them.

## Product Principles

1. Every page leads toward a quote request; the WhatsApp hand-off is the conversion.
2. French first, equal quality in English and Arabic (including RTL).
3. Never invent proof: show placeholders until the client supplies real content.
4. Phone use is primary; the quote action is always within reach.
5. Contrast and legibility are non-negotiable in both themes.

## Accessibility & Inclusion

Target WCAG AA contrast in both themes (documented in `docs/DESIGN-REVIEW.md`), respect `prefers-reduced-motion`, labelled controls and visible focus, and full RTL support for Arabic.
