---
name: Vieva Services
description: Large-format print, events and installation in Morocco, set as a press run of the client's five petal inks on a gallery-white or graphite sheet.
colors:
  yellow: "#FFC72C"
  cyan: "#009EE2"
  indigo: "#3D2385"
  indigo-dark-mark: "#8B76E6"
  magenta: "#E6007E"
  coral: "#F35338"
  key-graphite: "#0B0F17"
  paper-white: "#FFFFFF"
  slate-ink: "#0F172A"
  slate-body: "#334155"
  slate-mute: "#526072"
  hairline: "#E2E8F0"
  hairline-strong: "#CBD5E1"
  surface: "#F8FAFC"
  error: "#B4231F"
  band-fg: "#F1F5F9"
  band-mute: "#B6C2D2"
  band-line: "#253247"
  shot-ground: "#F1F4F8"
  dark-fg: "#F1F5F9"
  dark-body: "#CBD5E1"
  dark-mute: "#94A3B8"
  dark-hairline: "#1E293B"
  dark-hairline-strong: "#334155"
  dark-surface: "#111827"
  dark-error: "#FF8A80"
typography:
  display:
    fontFamily: "Outfit, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(44px, 5.2vw, 88px)"
    fontWeight: 900
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(32px, 4.2vw, 60px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Outfit, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Outfit, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Plus Jakarta Sans, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(17px, 1.35vw, 19px)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "13.5px"
    fontWeight: 600
    lineHeight: 1.6
  figure:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "clamp(38px, 4.6vw, 68px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    fontFeature: "tnum"
  arabic:
    fontFamily: "Tajawal, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
rounded:
  label: "3px"
  plate: "4px"
  control: "6px"
  card: "8px"
  sheet: "10px"
  disc: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  container: "1360px"
  block: "clamp(64px, 9vw, 128px)"
  bento-gap: "14px"
  grid-gap: "20px"
  control-pad: "0 22px"
  control-pad-sm: "0 16px"
  card-pad: "clamp(22px, 2.4vw, 32px)"
components:
  button-quote:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.key-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-pad}"
    height: "48px"
  button-quote-hover:
    backgroundColor: "{colors.slate-ink}"
    textColor: "{colors.paper-white}"
  button-ink:
    backgroundColor: "{colors.slate-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-pad}"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.paper-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-pad}"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.slate-ink}"
    textColor: "{colors.paper-white}"
  button-sm:
    padding: "{spacing.control-pad-sm}"
    height: "40px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "48px"
  service-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "clamp(22px, 2.6vw, 30px)"
  placeholder-shot:
    backgroundColor: "{colors.shot-ground}"
    rounded: "{rounded.plate}"
  nav:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.slate-body}"
    height: "74px"
---

# Design System: Vieva Services

## Overview

**Creative North Star: "The Press Run"**

Every surface is a sheet coming off the press. The canvas is plain gallery white in daylight and graphite at night; type is slate, structure is 1px hairlines, and colour arrives only as ink: the five petal inks of the client's logo plus K, the key plate. Each service owns exactly one ink, and that ink follows it everywhere it appears: the brush swatch on its card, its petal marker, the checks in its lists, the underline of its filter, the overprint of its placeholder. A visitor should be able to tell which service they are inside from the ink alone.

The print vocabulary is literal and functional rather than ornamental. A 2px C-M-Y-K register line sits at the very top of every page; a 4px filet of the same four bars underlines every inner-page title; placeholders are proofs of two petals overprinted in multiply with crop marks at their corners and an honest "[Photo]" label; the home method is a four-plate proof that slides into register as the steps scroll by. Brush paint is the one gestural element: procedural dry-brush raster masks paint the hero logo on load, ink each service card's swatch, and lay a magenta swash under the closing call.

Density is editorial and calm: big Outfit headlines with tight negative tracking, generous section padding, an asymmetric numbered bento instead of equal card rows, and metadata set as plain text joined by middle dots. Corners stay small and square-ish; nothing is a pill.

**Key Characteristics:**
- Neutral sheet (white / graphite), slate type, 1px hairlines; ink is roughly a tenth of any screen.
- One petal ink per service, carried through a `--ink` variable to every mark of that service.
- C-M-Y-K register line on every page, filet under every inner title.
- Overprint (multiply) and crop marks as the placeholder and proof language.
- Raster dry-brush strokes as the only gesture: logo paint, card swatches, closing swash.
- Ink-wipe buttons that fill from the reading start (left in LTR, right in RTL).
- Full final state in the HTML; motion only adds, and reduced motion removes it entirely.

## Colors

Two neutral sheets, a slate type ramp, and five client-pinned petal inks plus K, all used as ink on paper rather than as fills.

### Primary
- **Process Cyan** (cyan): the action ink. Every "Devis gratuit" quote button, the mobile action bar's primary cell, the selection highlight, the caret, radio accents, the upload drop zone, the active-nav underline, the success disc, and dark-theme links and focus. Text on cyan is always key graphite, never white.

### Secondary
- **Process Magenta** (magenta): the "chosen" ink. The second ink of the ink button's wipe, the added-to-basket pressed state, the basket count when it holds items, the current-language underline, and the brush swash under the closing call. Also the ink of the Events service.
- **Petal Indigo** (indigo): light-theme link and focus colour, and the Decorative Panels service ink. In dark it is lifted to **Lifted Indigo** (indigo-dark-mark) for marks only; dark links and focus switch to cyan.

### Tertiary
- **Petal Yellow** (yellow): the Promo Items and Trophies ink and the Y plate. Text on yellow is key graphite.
- **Petal Coral** (coral): the Team Building ink.
- **Key Graphite** (key-graphite): the K plate and the Supplies service ink. In the theme layer K follows the text colour (it becomes dark-fg in dark), so the register line's fourth bar and K-inked marks always read as "type".

**Service-to-ink map (fixed):** Large-format print = cyan; Events = magenta; Team building = coral; Decorative panels = indigo; Promo items and trophies = yellow; IT supplies = K. Placeholders pair the service ink with a second ink (cyan with yellow, magenta with yellow, coral with cyan, indigo with magenta, yellow with magenta, K with cyan). The method's four steps are C, M, Y, K in that order; the About page's four values reuse the same order.

### Neutral
- **Paper White** (paper-white): the light canvas, and the fixed paper of every proof in both themes.
- **Slate Ink** (slate-ink): headings and primary text in light; the ink button fill.
- **Slate Body** (slate-body): secondary text, leads, nav links.
- **Slate Mute** (slate-mute): metadata, notes, crumbs, labels.
- **Hairline** (hairline) and **Strong Hairline** (hairline-strong): every rule, card border and divider; strong for form fields and dashed note boxes.
- **Surface** (surface): panels, the method band, file rows.
- **Graphite band**: the closing-call band uses key graphite in light and dark-surface in dark, with band-fg, band-mute and band-line.
- **Shot Ground** (shot-ground): placeholder paper; slightly darker (#E9EDF2) in dark so the proof still reads as paper.
- **Error** (error / dark-error): validation text and file-remove links only.
- Dark sheet: key graphite canvas, dark-fg, dark-body, dark-mute, dark-hairline, dark-hairline-strong, dark-surface.

### Named Rules
**The One Ink Rule.** A service is printed in one petal ink and only that ink. Set it once as `--ink` on the service's container and let every mark inherit it; never hand-pick a second accent for a service surface.

**The Fixed Process Rule.** Proofs and placeholders are paper, not theme. Their process inks (C #009EE2, M #E6007E, Y #FFC72C, K #0B0F17) and the dark K and indigo are pinned locally so a proof prints identically in light and dark.

**The Dark Key on Cyan Rule.** Anything set on cyan or yellow uses key graphite text (6.4:1 and 12.3:1). White on cyan fails (3.0:1).

**The WhatsApp Is Not Magenta Rule.** WhatsApp actions are cyan, ghost, or the graphite floating disc. Magenta means "chosen" and "closing"; it never colours the conversion hand-off.

## Typography

**Display Font:** Outfit (with Helvetica Neue, Arial)
**Body Font:** Plus Jakarta Sans (with system-ui, Segoe UI, Arial)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Menlo, Consolas)
**Arabic:** Tajawal replaces both display and body when the page language is Arabic.

**Character:** A heavy geometric display set tight and loud against a friendly humanist body; mono is reserved for numbers that are measured or counted, as on a job ticket.

### Hierarchy
- **Display** (900, clamp(44px, 5.2vw, 88px), 0.96, -0.035em): the home H1 and inner-page H1s (inner pages run to clamp(40px, 6vw, 88px), max 18ch). The closing call goes further, 900 at clamp(42px, 6.4vw, 96px), -0.04em.
- **Headline** (800, clamp(32px, 4.2vw, 60px), 1.02, -0.03em): section heads, the method title, the sectors title.
- **Title** (800, clamp(22px, 2vw, 28px), 1.1, -0.02em): service-card names (the lead card grows to clamp(32px, 4vw, 58px)), prose H2s, contact values.
- **Title Small** (700, 20px, 1.2, -0.01em): method steps, product and case cards, values.
- **Body** (400, 16px, 1.6): running text; prose at 17px capped near 65ch; leads at clamp(17px, 1.35vw, 19px) capped at 46 to 60ch.
- **Label** (600, 13.5px): metadata lines, card tags, crumbs, contact labels, wizard step head. Sentence case, no tracking, no capitals.
- **Figure** (JetBrains Mono 500, clamp(38px, 4.6vw, 68px), 1, -0.03em, tabular): the key-figures strip.
- **Mono** (JetBrains Mono, tabular): card numbers ("01."), plate keys (C M Y K), basket count, wizard percentage, phone numbers, legal IDs, placeholder labels.

### Named Rules
**The Measured Mono Rule.** Mono is for counted or measured things only: figures, numbers, dimensions, IDs, percentages. It never sets a heading or a label word.

**The Plain Metadata Rule.** Metadata is a line of 13.5px/600 slate-mute text with parts joined by a spaced middle dot (" · ", the dot itself muted and hidden from assistive tech). No chips, no pills, no capsules, no uppercase tracking.

**The Arabic Reset Rule.** In Arabic, headings drop to letter-spacing 0 and line-height 1.3, body rises to 17px/1.75, and buttons gain 0.28em top padding to centre Tajawal's metrics.

## Layout

A 1360px container with a fluid gutter of clamp(16px, 4vw, 56px) that respects safe-area insets. Sections breathe on clamp(64px, 9vw, 128px) vertical padding; stacked groups inside a section sit clamp(56px, 7vw, 96px) apart. Section heads are a two-column grid (1.3fr title, 1fr muted note) aligned to the baseline end.

The services grid is a numbered, asymmetric 12-column bento with a 14px gap: the first service spans 7 columns and two rows, the second and third span 5, the rest span 4. Every card carries a mono number ("01." to "06.") and its petal. At 1180px the cards go to halves with the first full width; at 760px every card is full width.

Other grids: the hero is 1.18fr logo / 1fr copy filling the first viewport; the key figures are four hairline-divided columns (two by two on phones); case studies sit in three columns; content pages use 1.5fr prose with a 1fr sticky panel; the wizard is 1.6fr card with a 1fr sticky aside. The method band is 0.9fr steps against a 1.1fr sticky proof.

Breakpoints: 1180px collapses nav links into the drawer; 980px stacks every two-column grid, puts the proof first and unsticks panels; 760px shrinks the header to 64px, hides header language, theme and quote, and brings in the fixed three-cell bottom action bar (call, WhatsApp, quote in cyan) with body padding to clear it.

RTL mirrors through logical properties throughout (inline-start/end, border-inline, padding-inline). Directional glyphs (arrows, swatches, swashes, the bar's primary icon) are flipped with scaleX(-1), and the ink wipe enters from the right.

## Elevation & Depth

Flat by default. Depth comes from hairlines, the surface tint and the graphite band, not from shadows. The few shadows are soft and belong only to objects that physically sit above the sheet: the printed proof, the open mega menu, and the floating WhatsApp disc. There are no hard offset shadows and no raised cards. The other depth device is overprint: multiply-blended petals and plates that darken where they cross.

### Shadow Vocabulary
- **Proof sheet** (`box-shadow: 0 1px 0 rgba(15,23,42,.06), 0 30px 60px -36px rgba(15,23,42,.5)`): the method's paper proof lifted off the band.
- **Menu drop** (`box-shadow: 0 24px 48px -28px rgba(15,23,42,.45)`): the services mega menu.
- **Float** (`box-shadow: 0 14px 30px -14px rgba(15,23,42,.55)`): the floating WhatsApp disc.

### Named Rules
**The Paper Lifts, Cards Don't Rule.** A shadow means "a separate object resting on the sheet". Cards, panels and buttons stay flat; their hover is ink, never lift.

**The Overprint Rule.** When two inks meet, they multiply. Placeholders, the logo petals and the proof plates all use `mix-blend-mode: multiply` inside an isolated group.

## Shapes

Small, square-ish corners keyed to the object: 3px for placeholder labels, 4px for proofs, shots, plate keys and the basket count, 6px for buttons, inputs and controls, 8px for service cards, panels and the drop zone, 10px for the wizard card and the mega menu. The only circles are the floating WhatsApp disc and the wizard's success mark. Rules are 1px; emphasis rules are 2px (values top rule, nav and language underlines) or 3px (filter underline). Dashed borders mean "not final": the note box and the upload drop zone.

The recurring silhouettes are print objects: the four-bar register line and filet, crop-mark corners (12px, 1px, at 45% graphite) on every placeholder, registration targets on the proof plates, and the logo petal reused as a service marker.

## Components

### Buttons
Confident and inky: a 6px block that floods with a second ink on hover.
- **Shape:** gently squared (6px), 48px tall, 0 22px padding, Plus Jakarta Sans 600 at 15.5px; small variant 40px tall, 0 16px, 14px.
- **Quote (primary):** cyan with key-graphite text; one per view region, always the "Devis gratuit" action, often with a trailing arrow.
- **Ink:** slate-ink fill with paper text; used for "add to basket". WhatsApp actions use the ghost button (or cyan for the final hand-off), never ink, because ink wipes to magenta. Its pressed (added) state is magenta with white text.
- **Ghost:** transparent with a 1.5px inset ring in text colour; secondary actions and most WhatsApp buttons. On the graphite band the ring and wipe turn white.
- **Hover / Focus:** a second ink wipes across from the reading start (clip-path, 0.4s, cubic-bezier(.16,1,.3,1)): quote wipes to text colour, ink wipes to magenta, ghost wipes to text colour; the arrow nudges 3px forward. Focus is a 3px focus-colour outline at 3px offset.

### Metadata and Filters
- **Metadata:** plain label text with " · " separators; never chips.
- **Filters:** text buttons on a hairline toolbar; the pressed filter turns full ink and takes a 3px underline in its service ink.

### Cards / Containers
- **Service card:** 8px, hairline border, paper ground, 240px minimum. A dry-brush swatch in the service ink crosses the top edge, a mono number sits under it, the petal floats at the inline end, the title sits at the bottom. Hover tints the ground 7% and the border 45% toward the ink, tilts the petal (-14deg, 1.12) and slides in an arrow.
- **Panel:** 8px, hairline border, surface ground, clamp(22px, 2.6vw, 30px) padding; sticky beside prose on wide screens.
- **Placeholder shot:** 4:3, 4px, shot-ground paper with crop marks, two petals overprinted in the service ink and its pair, and a mono "[Photo] name" label on translucent white.
- **Shadow Strategy:** flat; see Elevation.

### Inputs / Fields
- **Style:** 48px, 1px strong-hairline stroke, 6px, sheet ground, 16px text; labels 14px/600 slate-body above.
- **Focus:** 2px focus-colour outline at 0 offset with the border matching.
- **Service picker:** bordered tiles with the service petal; pressed adds a 1.5px inset ring and an 8% tint in the service ink.
- **Error:** error colour, 600 weight, reserved line height below the step.

### Navigation
- **Header:** sticky under the register line, 74px (64px on phones), 94% sheet with blur and a hairline bottom. Links are 15px/500 slate-body; the current page takes a 2px cyan underline at 8px offset. Services open a two-column mega menu of petal-marked links. Language links are underlined in magenta when current; Arabic is set in Tajawal.
- **Mobile:** below 1180px a drawer of 32px Outfit 800 links with hairline rules; below 760px the fixed bottom action bar.

### Register Line and Filet (signature)
Four equal bars, C, M, Y, K. The register line is 2px, sticky at the top of every page. The filet is 128 by 4px under every inner-page H1. The wizard progress bar is the same four bars revealed as the fill grows.

### Brush Paint (signature)
Three procedural dry-brush alpha masks (1400 by 200 PNG) applied as CSS masks or SVG image masks. On the home hero the full logo is painted: each petal, the wordmark and "SERVICES" sit under a stroke mask, while a wet swash in that part's ink grows along the stroke and lifts off; then the CMYK filet is ruled and the tagline set. Service swatches wipe in on scroll; the closing call's second line gets a magenta swash. Without JavaScript every mask is fully painted.

### The Proof (signature)
A 480 by 340 paper sheet with crop marks; four plates (C, M, Y, K) of a stand illustration, each with its own registration targets and colour patch, multiply together. On the home page each method step prints its plate offset, then slides it into register; the active step is full opacity, the others 36%.

## Do's and Don'ts

### Do:
- **Do** give every service surface its petal ink through `--ink` and let swatch, petal, checks, filters and placeholder inherit it.
- **Do** put the quote action on cyan with key-graphite text, and keep one reachable on every page (header, hero, closing band, mobile bar).
- **Do** start every page with the 2px C-M-Y-K register line and underline inner H1s with the 4px filet.
- **Do** set metadata as plain 13.5px/600 text joined by " · ".
- **Do** use overprint (multiply) petals with crop marks and a "[Photo]" label wherever real imagery is missing.
- **Do** use JetBrains Mono with tabular figures for numbers, dimensions, IDs and percentages.
- **Do** ship every element in its final state in the HTML; under `prefers-reduced-motion` skip the GSAP and Lenis story entirely and cut transitions to near zero.
- **Do** mirror with logical properties in RTL and flip directional marks with scaleX(-1).

### Don't:
- **Don't** use pills, chips or capsules for tags, metadata or filters; the only circles are the WhatsApp float and the success mark.
- **Don't** set white text on cyan or yellow.
- **Don't** colour WhatsApp actions magenta.
- **Don't** let process inks on proofs and placeholders follow the theme.
- **Don't** add a second accent to a service, or use petal inks as large background fills; the band is graphite, not ink.
- **Don't** lift cards or buttons with shadows; hover is an ink change.
- **Don't** arrange services as an equal row of cards; keep the numbered asymmetric bento.
- **Don't** reintroduce the retired brand green (#00A857).
