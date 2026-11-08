---
name: Vieva Services
description: Large-format print, events and installation in Morocco, set as a loud green print-shop proof sheet in light and dark.
colors:
  green: "#00A857"
  green-hi: "#12BE6A"
  green-lo: "#008F49"
  green-deep: "#064A2C"
  green-text: "#00663A"
  ink: "#06110B"
  ink-green: "#04281A"
  paper: "#F2F7F3"
  surface: "#FFFFFF"
  mute: "#46564D"
  line: "#BCD0C3"
  tint: "#CDF0DC"
  band-mute: "#B8D3C4"
  band-line: "#4C6F5C"
  night: "#0A1410"
  night-surface: "#111F17"
  night-text: "#EAF3ED"
  night-green-text: "#3DDC8A"
  error: "#C0341D"
  error-night: "#FF8A73"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(60px, 14.2vw, 236px)"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-0.03em"
    fontVariation: "'wght' 700, 'wdth' 86"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 6.4vw, 104px)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(22px, 2vw, 30px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "99px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "28px"
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(64px, 9vw, 150px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  chip-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  product-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "14px 14px 18px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "10px"
    padding: "12px 14px"
    height: "44px"
---

# Design System: Vieva Services

## Overview

**Creative North Star: "The Proof Sheet"**

The site behaves like a press proof pinned up in the workshop: a flat field of saturated brand green, ink-black type, halftone dots and crop marks. Everything the visitor sees comes from the print trade the company works in (registration corners on the hero, halftone dot fills on every product visual, a dotted overprint on the green heroes) rather than from a generic SaaS kit. The green is the paper; ink and near-white are the only other voices.

Density is bold and poster-like at display scale and quiet at reading scale: huge condensed Bricolage headlines sit on generous section padding, while body copy stays at 17px in a narrow measure. Interaction is wipe-and-fill (a color slides up through a button, a service row floods green on hover) so motion reads like ink being laid down, not like a glow. Two themes share the same green; only the neutrals and the green used as text change. PRODUCT.md commits to AA contrast in both themes, which is why green as text is a separate, darker (light) or lighter (dark) token from the brand green.

**Key Characteristics:**
- Brand green (#00A857) is fixed in both themes and floods entire bands (hero, page hero, sector ribbon, mobile drawer, hovered service rows).
- Ink-black and pale green-white buttons; pill shape everywhere interactive.
- Condensed variable display type (width axis 80-100) at poster scale with tight negative tracking.
- Halftone dot pattern is the only imagery language until real photos exist.
- Flat surfaces, hairline green-grey rules, one soft shadow reserved for floating things.
- Full RTL/Arabic parity; Arabic swaps to IBM Plex Sans Arabic and drops tracking.

## Colors

A single saturated print green over green-tinted neutrals: no second hue, with the neutrals leaning faintly green so ink, paper and rules all belong to the same sheet.

### Primary
- **Press Green** (#00A857): Brand fill. Heroes, hovered service rows, active chips, step markers, WhatsApp float, selected states, the logo. Text on it is always Ink Black, never white.
- **Lit Green** (#12BE6A) and **Shadow Green** (#008F49): The two ends of the hero gradient, giving the green field a slight lift; not used elsewhere.
- **Proof Green Text** (#00663A, dark theme #3DDC8A): Green used as text, eyebrow rule color and the focus ring. It exists because Press Green does not meet AA on paper.
- **Deep Forest** (#064A2C): Halftone dot color in product visuals and the scene.

### Neutral
- **Ink Black** (#06110B): Body text on light, primary button fill, text on green, the dark quote band.
- **Forest Ink** (#04281A): Stats strip and footer background in light theme.
- **Proof Paper** (#F2F7F3): Page background in light; button text on ink.
- **White Stock** (#FFFFFF): Cards, panels and fields (the lifted surface) in light theme.
- **Mute Moss** (#46564D): Secondary copy on paper.
- **Hairline Sage** (#BCD0C3): All borders and rules in light theme.
- **Tint Mint** (#CDF0DC): Work section background, file rows, basket box, note box.
- **Night Field** (#0A1410), **Night Surface** (#111F17), **Night Text** (#EAF3ED): Dark theme page, raised surface and text. Dark rules are #223A2D, mute #9DB5A6, tint #0F2218.
- **Band Mute** (#B8D3C4) and **Band Line** (#4C6F5C): Secondary text and rules on always-dark bands (quote, footer, stats).

### Semantic
- **Error Red** (#C0341D light, #FF8A73 dark): Form errors only.

### Named Rules
**The Ink-On-Green Rule.** Text on Press Green is Ink Black (#06110B). White on #00A857 fails contrast and is never used.
**The Two Greens Rule.** Green as a fill is Press Green; green as text or a focus ring is Proof Green Text. Never swap them.
**The One Hue Rule.** There is no second accent. Hierarchy comes from fill vs. ink vs. outline, not from new colors.

## Typography

**Display Font:** Bricolage Grotesque (with Helvetica Neue, Arial)
**Body Font:** Instrument Sans (with Helvetica Neue, Arial)
**Label/Mono Font:** JetBrains Mono
**Logo Font:** Poppins (logo lockup only)
**Arabic:** IBM Plex Sans Arabic replaces display and body, tracking forced to 0, line-height raised to 1.7 body and about 1.12 headlines.

**Character:** A compressed, heavy grotesque shouts at poster scale, while a friendly humanist sans carries reading text and a mono face labels specs like a job ticket.

### Hierarchy
- **Display** (700, clamp 60px to 236px, 0.84, wdth 86, -0.03em): The home hero wordmark lines only.
- **Headline** (700, clamp 40px to 104px, 0.94, wdth 88, -0.035em): Section h2; page hero h1 runs clamp 46px to 150px at 0.9 and wdth 84; the quote band h2 reaches 180px at 0.86.
- **Title** (600, 22px to 30px for cards; clamp 34px to 92px for service rows, 1.1 / 1, -0.02em / -0.035em): Card titles, service list rows, step titles (700, 26px to 38px).
- **Body** (400, 17px, 1.55): Reading text; lead paragraphs on green run 500 weight at 18px to 24px; prose is capped at 62ch, legal at 70ch.
- **Label** (400, 11px to 12px, 0.06em to 0.08em, uppercase mono): Meta lines, spec keys, pills, language switch.

### Named Rules
**The Width-Axis Rule.** Display sizes narrow the variable width axis (80 to 88) so big words fit; small headings reset to wdth 100.
**The Arabic Reset Rule.** In `[lang=ar]` letter-spacing is zero and width-axis settings are removed; never apply negative tracking to Arabic.

## Layout

Full-bleed bands stacked vertically, each inside a `.wrap` container (max 1680px) with a fluid gutter of clamp(16px, 4vw, 56px) that respects safe-area insets. Sections breathe with clamp(64px, 9vw, 150px) of vertical padding. Grids are simple and few: 3-up card strip, 4-up steps and stats, 1.2fr/1fr detail columns with a sticky side panel, auto-fill 280px product grid, 2-column form grid. Gaps run 8, 12, 16, 24, 28, then fluid clamps.

Breakpoints are 980px (nav collapses to a menu button and green drawer, strips become scroll-snap carousels, columns stack), 760px (fixed three-button bottom bar appears for phone, floating WhatsApp hides, hero becomes auto height) and 560px (single column forms, steps, footer). Logical properties (`inset-inline`, `margin-inline`, `border-inline`) carry RTL; hero gradient origin and directional arrows are mirrored explicitly. Phone is the primary device, so touch targets are 44px minimum (48px for buttons).

## Elevation & Depth

Flat and tonal by default. Depth comes from band color changes (paper, tint, green, ink) and hairline borders, not shadows. A single shadow token, `0 20px 50px rgba(6,17,11,.18)` (light) or `0 20px 50px rgba(0,0,0,.5)` (dark), is reserved for things that float above the page: the mega menu, the cursor-following service peek card, hovered product visuals and the WhatsApp button. The nav is the one glass element (88% page color with 14px backdrop blur).

### Named Rules
**The Flat-Until-Floating Rule.** A surface gets the shadow only if it overlays or lifts off other content. Resting cards use a 1px line, never a shadow.

## Shapes

Two shape families. Interactive things (buttons, chips, language switch, pills, basket link, icon buttons) are full pills (99px) or circles. Containers are softly rounded rectangles stepping 8, 10, 12, 14, 16px by size (product visuals 10px, fields 10px, selectable tiles 12px, product cards 14px, panels and wizard card 16px). Section rules are straight and thick: 2px ink rules top-edge service lists and spec tables, 3px green bars mark nav underline and the process rail. Crop-mark corners (22px, 2px ink) frame the home hero, and a 4px green side bar marks the note box. Product visuals are halftone dot fields (two radial-gradient dot grids offset by half a cell, rotated 14deg) darkened toward the bottom.

## Components

Confident and tactile: big hit areas, pill silhouettes, and a color wipe rather than a fade on every hover.

### Buttons
- **Shape:** Full pill (99px), 48px minimum height, 0 26px padding, 600 weight 16px. Small variant 40px / 14px.
- **Primary:** Ink Black fill with Proof Paper text (swaps to Proof Paper fill and ink text in dark).
- **Hover / Focus:** A second color slides up from the bottom over 0.45s (cubic-bezier .2,.7,.2,1) while text color flips; focus is a 3px Proof Green Text outline with 3px offset.
- **Green / Ghost:** Green variant is Press Green with ink text, wiping to ink. Ghost is transparent with a 2px inset ink ring that fills on hover. Dark and ghost-dark variants exist for use on green bands.

### Chips and Filters
- **Style:** Transparent pill with a 1.5px inset ring (line color; band-line on dark bands), 44px high, 14px to 15px text.
- **State:** Selected fills with Ink (filters) or Press Green (service picker), ring removed. Mono uppercase pills with a 1.5px ink ring tag items.

### Cards / Containers
- **Corner Style:** 14px (product card), 16px (panel, wizard card, dark card).
- **Background:** White Stock / Night Surface with a 1px Hairline Sage border; work band uses Tint Mint with borderless, shadowless cards.
- **Shadow Strategy:** None at rest; see Elevation.
- **Internal Padding:** 14px inside product cards around a visual, clamp(20px, 3vw, 32px) in panels.

### Inputs / Fields
- **Style:** Wizard fields are 10px-radius boxes on the surface color with a 1px line border and 44px minimum height. The home quote band uses bottom-border-only underline fields on the dark band.
- **Focus:** Border and 2px outline turn Press Green (wizard); underline turns green (band).
- **Error / Disabled:** Errors print in Error Red, 600 weight, below the step. Drop zone uses a 2px dashed line border that goes green with a 8% green wash on hover or drag.

### Navigation
Sticky, translucent bar with a 1px bottom line. 15px 500-weight links, a 3px green underline scaling in from the leading edge on hover or current page. Services open a mega menu (14px radius panel, shadow) on hover or focus. Language switch is a mono pill group; theme toggle is a 44px circle. Below 980px a menu button opens a full-screen Press Green drawer with 40px to 68px display links separated by 2px rules; below 760px a bottom bar adds Call, WhatsApp-style actions with the primary in green.

### Service Row (signature)
A full-width list row whose title is poster-sized. On hover it floods Press Green, the title slides 18px (mirrored in RTL) and widens its width axis to 100, a description unfolds via grid-rows, and a rotated halftone card follows the cursor. On touch devices descriptions are always open and the peek is off.

### Marquee and Ribbon
Looping uppercase display text on the ink band and a pill ribbon on the green sector band; both stay LTR in RTL pages and stop under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set text on Press Green in Ink Black (#06110B).
- **Do** use Proof Green Text (#00663A light, #3DDC8A dark) for any green text, links and focus rings.
- **Do** make every interactive control a pill with at least 44px height (48px for buttons) and a color-wipe hover.
- **Do** build placeholder imagery from the halftone dot pattern in the green family until real photos arrive.
- **Do** define colors per theme through the semantic tokens (`--bg`, `--fg`, `--surface`, `--line`, `--mute`, `--tint`) and keep green fixed.
- **Do** use logical properties and mirror directional details for RTL; keep tracking at 0 in Arabic.
- **Do** honor `prefers-reduced-motion` (marquees stop, transitions near zero).

### Don't:
- **Don't** put white text on Press Green.
- **Don't** introduce a second accent hue.
- **Don't** add shadows to resting cards; reserve the shadow for floating layers.
- **Don't** use negative letter-spacing or width-axis narrowing on Arabic or on small headings.
- **Don't** hard-code hex values in components when a semantic token exists (see drift noted in the report).
- **Don't** invent proof imagery (photos, logos, testimonials); show the halftone placeholder instead.
