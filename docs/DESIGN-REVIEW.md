# Design review (v1 prototype → v2 in this repo)

Reviewed: the published prototype (`claude.ai/artifact/NTEy2sFHk2nFZQ2BXRmaEh`, version 2) against the HS Print spec and the earlier Vieva canvas.

## Colors

| Finding | Severity | Fix in this repo |
|---|---|---|
| Third headline line ("posé.") was paper-white on brand green: about 2.3:1 contrast, fails WCAG AA even for large text. | High | Deep green `#04281A` on `#00BF63` (about 6.3:1). Reads as a tonal accent. |
| Four extra greens were hard-coded in the hero and banner (`#12D676`, `#00A455`, `#1BD97B`, `#064A2C`) with no tokens. | Medium | Reduced to a named scale: `--green`, `--green-hi`, `--green-lo`, `--green-deep`, `--green-dark`, plus `--mint`. All components use tokens. |
| Logo tab text (8.5 px, ink on green) is legible but tiny in the nav. | Low | Tab text raised to 9 px, weight 600. Matches the supplied logo (ink on green). |
| Form placeholders on the ink quote section used the browser default grey (about 3:1). | Medium | Placeholder color set to `#7FA38F` (about 6:1 on ink). |
| Green text on paper (`#00BF63` on `#F2F7F3`) is about 2.1:1. | Avoided | Eyebrows and links on paper use `--green-ink #00663A` (about 6.6:1). Raw green is only used as a fill. |
| White-on-green is never used for text. | Pass | Ink on green everywhere (about 7.8:1). |

Palette stays: green `#00BF63` (sampled from the supplied logo), ink `#06110B`, paper `#F2F7F3`, mint `#CDF0DC`. Green leads in the hero, sectors band and hover states; ink anchors the marquee and quote section.

## Layout

| Finding | Severity | Fix |
|---|---|---|
| No mobile navigation: links disappeared below 980 px with no menu. | High | Menu button and full-screen drawer. |
| No persistent contact action on phones, though the spec asks for a sticky Call / WhatsApp / Devis bar. | High | Fixed bottom action bar below 760 px, safe-area aware. |
| Hero 3D objects sat behind the headline on the left, competing with the text. | Medium | Objects moved right and up; the banner stays the focal point. On phones the scene sits above the headline instead of behind it. |
| Language switch (FR / ع / EN) was decorative. | Medium | Kept as a visible placeholder. Real switching is Phase 4 (i18n with RTL). |
| Service descriptions only appeared on hover. | Medium | On touch they are always open. Hover keeps the reveal. |
| WebGL cost on phones (150×88 segments, DPR 2). | Medium | Mobile uses 100×60 segments and DPR 1.5, and pauses when off-screen. |
| Page is one long scroll with no catalogue, service pages, portfolio detail or full quote flow. | Scope | Planned in `PLAN.md`, phases 2 to 3. |
| Project cards are placeholders (`[Photo]`). | Content | Blocked on client photos (`PLAN.md`, "Needed from the client"). |

## What stays

Oversized type with a variable-font hover effect, the printed 3D banner, service rows that invert to green, a deep-green stats strip, and the sector marquee. Motion respects `prefers-reduced-motion`.

## Update: deeper brand green

The brand green moved from `#00BF63` (sampled from the supplied logo screenshot) to `#00A857` to reduce glare on large areas and improve contrast.

| Pair | Before | After |
|---|---|---|
| Ink on green | 7.9:1 | 6.2:1 (still AA) |
| White on green | 2.4:1 | 3.1:1 (large text and icons only) |
| Green on ink | 7.9:1 | 6.2:1 |
| Green on deep green | 6.5:1 | 5.1:1 |

The scale is now `--green #00A857`, `--green-hi #12BE6A`, `--green-lo #008F49`. The logo (nav, footer, `public/logo.svg`, banner texture) uses the same value. Small green text on paper still uses `--green-ink #00663A` (6.5:1).

## Update: dark and light themes

Both themes follow `prefers-color-scheme`. Brand green, the hero and the 3D scene stay the same in both. Neutrals switch through semantic tokens (`--bg`, `--fg`, `--surface`, `--tint`, `--band-bg`, `--btn-bg`), so no component hard-codes a theme color.

| Pair (dark) | Contrast |
|---|---|
| Text `#EAF3ED` on `#0A1410` | about 16:1 |
| Muted `#9DB5A6` on `#0A1410` | about 8:1 |
| Green text `#3DDC8A` on `#0A1410` | about 10:1 |
| Logo green `#00A857` on `#0A1410` | about 6:1 |

Buttons invert (light button on dark pages). Inner-page heroes, the sector band and the 3D hero stay green in both themes.

## Update: Arabic (RTL)

Logical properties (`inset-inline`, `border-inline`, `text-align: end`) flip the layout. Letter spacing is forced to 0 for Arabic so letters keep joining, and the headline is not split into letters. The 3D scene mirrors to the other side and the printed banner text is drawn right-to-left. Marquees stay left-to-right.
