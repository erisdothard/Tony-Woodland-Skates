---
project: TONY Skate Club
register: brand
aesthetic_direction: street-skate gig poster on daylight concrete, built from Tony's own burst GIF
color_strategy: restrained, one hot accent used as a field
design_system: bespoke
design_variance: 7
motion_intensity: 5
visual_density: 4
---

# TONY Skate Club. Design language (LOCKED)

Written 2026-10-21 from Eris's brief: "the vibe of diplosrunclub.com, but better", the TONY GIF as the
look, and an equal split between the club and Tony himself. The values live in
`src/app/globals.css` (`@theme`). This file says why, and where each value is allowed.

Every page must read as the same poster series if placed side by side.

## Design read

Tony Woodland is a Nashville street and freeride skater on the Rollerblade team, and a working model.
He started free greenway group skates that anyone can join. The site has two jobs, weighted equally:
1. **Club:** make a Nashville local want to show up and skate.
2. **Tony:** make a brand, photographer or editor want to book him, as a skater or as a model.

Eris's mockup GIF sets the mood: daylight concrete, orange pants and black skates, the word TONY
stacked four times, SKATE CLUB rails up the edges, and a wordmark of TONY over four wheels. The site
takes that mood and those type ideas and builds them over Tony's own photos and film. The GIF itself
is not used (Eris, 2026-10-21: "that was just vibes").

## What the reference board taught us (docs/inspo/README.md)

- Every skate site on the board is dark or grey. **We stay in daylight.** Concrete white is the ground.
- The skate references lead with footage (Quasi, Them). Photos and video come first here; copy is short.
- Fantom shows a flat colour field per section. We use the same idea with only Tony's orange.
- Palace's fading text ladder and the GIF's TONY ladder are the same move. That is the signature.

## Hard exclusions

- No dark-mode-by-default page. Ink black is for type and the video room only.
- No all-caps eyebrow labels, no middle-dot meta strings, no mono "data" labels, no arrows on links.
- No card grids with rounded corners and shadows. No glass, no gradient text, no gradient washes.
- No fade-and-slide-up on every section. The hero burst is the one orchestrated moment.
- No marquee ticker. No fake stats. No logo row of brands we have not confirmed.
- Never put the orange behind small text in white, and never use orange for body text.

## Signature: the film and the ladder

Revised 2026-10-21 (later the same day): Eris's TONY GIF was a mood reference, not an asset. Nothing
from it is on the site. The hero *image* is open (see site.md): the "French Class" loop was rejected
the same day as too quirky for the sponsored-athlete feel Eris wants. The type over it is the
mockup's idea set live:
- the ladder, TONY four times, ink, sized by the viewport, stepping in once on load in four beats
  200 ms apart with no easing, then holding. It never strobes;
- the rails, SKATE CLUB vertical at both edges, bold then thin;
- a thin ink line dropping out of the bottom, as the scroll cue.
Reduced motion: the poster frame, the ladder at rest, no video playback.

Echoes elsewhere, all static:
- **The ladder** appears once more, in the footer: SKATE three times, then CLUB. The 404 page sets
  LOST three times, then TONY.
- **The wheel mark** (four circles, from the wordmark) is the bullet in fact lists and the favicon.
- **The rails** only appear in the hero.

## Color (locked)

Sampled 2026-10-21 from the GIF (pants, sky, garage fins) and the fisheye skate shot (IMG_6110).

| role | token | hex | use |
|---|---|---|---|
| ground | `concrete` | #EEF2F5 | page background, cool daylight white from the GIF's sky and fins |
| ink | `ink` | #000000 | type, the wordmark, rules, the video room background. True black, like the wordmark |
| accent | `pants` | #EB3A23 | Tony's pants. The club field, large display type, the active nav underline. Never small text |
| accent text | `pants-deep` | #C42A16 | orange used as text on concrete when it must be small (links on hover only) |
| secondary | `fin` | #B5C9D4 | garage-fin blue. Hairline rules, the Tony split panel, image placeholders |
| muted | `asphalt` | #4F5866 | captions, secondary copy |
| paper | `white` | #FFFFFF | type over photos and on the ink room |

Weighting: concrete and photos carry about 80% of every page, ink type about 15%, and orange at most
5% outside the one orange field per page.

### Contrast (WCAG 2.2 AA, measured 2026-10-21)

| text \ ground | concrete | pants | fin | ink | white |
|---|---|---|---|---|---|
| ink | 18.65 | 5.16 | 12.27 | n/a | 21.00 |
| asphalt | 6.39 | 1.77 (banned) | 4.20 (large only) | 2.92 (banned) | 7.19 |
| pants | 3.61 (display ≥ 24px bold only) | n/a | 2.38 (banned) | 5.16 | 4.07 |
| pants-deep | 5.06 | n/a | 3.33 | 3.69 | 5.69 |
| white | 1.13 (banned) | 4.07 (large only) | 1.71 (banned) | 21.00 | n/a |

Rule: on the orange field, all type is ink.

## Type (locked)

One family, **Archivo** (variable, `wdth` 62–125, `wght` 100–900), self-hosted through `next/font`.
The width axis is the personality: the wordmark is the widest and heaviest, reading copy is normal
width. That is the same contrast as the GIF's SKATE (bold) CLUB (thin).

| role | settings | use |
|---|---|---|
| ladder / wordmark | wdth 125, wght 900, uppercase, tracking 0.02em, line-height 0.86 | TONY, SKATE, CLUB only. The brand's own words |
| rail thin | wdth 125, wght 200, uppercase, tracking 0.08em | the CLUB half of the rails |
| display | wdth 118, wght 800, sentence case, tracking -0.01em, line-height 0.98 | page and section titles |
| title | wdth 110, wght 700, sentence case, line-height 1.1 | sub-titles, list heads |
| body | wdth 100, wght 400, 17–19px, line-height 1.55, measure ≤ 62ch | reading copy |
| small | wdth 100, wght 500, 14px | captions, nav, footer |

Uppercase is only for the three brand words. Everything else is sentence case.

Sizes: small 14px; body clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem); title clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
display clamp(2.5rem, 1.4rem + 5vw, 6.5rem); ladder is set by its container (`cqi`).

## Scales (locked)

- **Spacing:** 4px base. Section rhythm is 96 / 144 / 192.
- **Content max width:** 1320px, with a 16px gutter on phones and 32px from `md`.
- **Radius:** 0 everywhere. Wheels are the only circles.
- **Shadow:** none.
- **Rules:** 1px ink at 100%, or fin.
- **Motion:** burst cadence 200 / 1000 ms, stepped with no easing (it is stop-motion). UI transitions
  run 160 ms with `cubic-bezier(0.2, 0, 0, 1)`. No bounce, no parallax.
- **z-layers:** photo 0, ladder 10, rails 20, nav 30, menu 40, skip-link 50.

## Layout vocabulary

1. **Hero (home only).** Full viewport.
   - Phone: the burst is full-bleed, 9:16, exactly the GIF.
   - From `md`: the burst becomes a centred 9:16 poster column on concrete, with the wordmark above
     it, rails at the viewport edges and a ladder wider than the column.
   - A 1px ink scroll line drops from the bottom of the column.
2. **The split.** Two equal halves, side by side from `md` and stacked on phones. Each is a
   full-height photo with one display word set into it and one sentence.
   - The Club half sits on the orange field.
   - The Tony half sits on fin.
   - Each half links to its page. This is the "equal split" from the brief.
3. **Orange field.** Club information, ink type on `pants`, a short fact list with wheel bullets, and
   one action: follow on Instagram for the next skate. One orange field per page, at most.
4. **Contact sheet.** The photo wall is laid out like a photographer's contact sheet: tight
   uneven rows, hairline gaps, real aspect ratios, no cropping to squares, captions only on hover
   or focus. Clicking a photo opens it full screen.
5. **Video room.** The only ink-ground section. One large player with a list of edits beside it
   (stacked under it on phones). Choosing an edit loads it into the player. Players load only on
   click (lite YouTube).
6. **Footer.** Concrete ground, a static SKATE / SKATE / SKATE / CLUB ladder, and links in Tony's
   voice. "Watch" goes to the edits, "Skate" goes to the club, "Book" is the email.

Nav: wordmark centred, the way it sits in the GIF. Club and Edits on the left, Tony and Book on the
right. On phones it is the wordmark plus a Menu button that opens a full-screen orange panel.
Over the hero it is transparent. It turns solid concrete with a 1px ink rule once the page scrolls.

## Voice

Short, local, a little funny, like his Rollerblade Q&A ("I would be a horse"). Verbs first. No
marketing filler, no em-dashes in visible copy, no exclamation marks. Actions are named for what
happens: "Follow for the next skate", "Email Tony", "Watch the edit". All copy lives in
`src/content/site.ts`. Anything not publicly confirmed is marked `TODO(confirm)` in that file.

## Review against the generic defaults (frontend-design pass 2, 2026-10-21)

The first plan (`/root/.claude/plans/this-is-a-gif-humming-dolphin.md`) was checked against the
generic-page traits. These changes were made before any code was written:

| first plan | why it was generic | now |
|---|---|---|
| ink #0B0B0B with signal orange #FF4A1C, dark sections | the "near-black plus one vermilion accent" default, and the same as every skate site on the board | daylight concrete ground. True black only for type. Orange used as a field |
| Unbounded or Archivo Expanded display plus Inter or Geist body | two stock families picked by reflex | one family, Archivo, with the width axis carrying the voice |
| "NASHVILLE • STREET • FREERIDE • ALL LEVELS •" marquee | middle-dot meta string plus a marquee | cut |
| tracked uppercase section labels | template chrome | uppercase only for TONY / SKATE / CLUB |
| scroll reveals on every section via `motion` | scattered effects | one burst in the hero. No animation library |
| three edit cards in a row | card-grid default | a video room: one player and a list |
| masonry gallery | default | a contact sheet at true aspect ratios, which is a photographer's own format and suits a model |
| Tony section about skating only | missed the material: the Drive folder is mostly his modeling work | the Tony page covers both: skater and model |
