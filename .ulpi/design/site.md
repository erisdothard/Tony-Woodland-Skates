# TONY Skate Club. Feature spec v1

Source: Eris, 2026-10-21. "Equal split" between the club and Tony. Diplo's Run Club is inspiration for
the vibe only; we are not copying its features. No RSVP, no merch, no ticketing in v1.

## Routes

| route | job | sections in order |
|---|---|---|
| `/` | Show the brand, then send people one of two ways | hero film loop with ladder and rails, the split (Club / Tony), the club field (short), edits room (featured edit plus list), contact sheet (12 photos), footer |
| `/club` | Get a local to show up | title + fisheye photo; the orange field: what it is, who it is for, what to bring, where and when (TODO(confirm)); a photo strip of skate shots; follow CTA |
| `/tony` | Get a brand to book him | title + portrait; short bio; "Skate" block (Rollerblade team, street and freeride, setup, edits link); "Model" contact sheet of portfolio shots; press links; booking block |
| `/edits` | Watch | the video room with every edit |
| `not-found` | Recover | ladder: LOST LOST LOST TONY, link home |

## Content facts (public sources, 2026-10-21)
- Tony (Anthony) Woodland, Nashville TN. Rollerblade team rider, discipline Street / Freeride.
  Setup on the Rollerblade team page: Blank SK / Twister XT.
  Source: rollerblade.com/usa/en/the-rollerblade-experience/team/tony-woodland
- Rollerblade's "My Escape – Tony's World" (2021) calls him a model and professional skater, and
  says he started skating at 13 in Nashville.
- Nashville Scene, Summer Guide 2026: he started greenway skate outings, open to anyone at any
  level, now hosted by Austin Black of Skate Nashville. TODO(confirm) whether TONY Skate Club is
  that group, and its schedule and location.
- Instagram @ynotwoodland. Facebook anthony.woodland.739.
- Edits (YouTube): Rollerblade "Rockit" 1j8R7Y7CJHs; Rollerblade "Tony Woodland" U6aXyUZ9cEw;
  Rollerblade "Tony Woodland 2025" _YQfCCO5nvw (short); SK Films "Tony Woodland – Los Angeles"
  hraOpDyJZ0o; Rollerblade "Twister XT Unboxing by Tony Woodland" cc2pZo5FazI.

## Media
- Hero: OPEN. Eris's TONY GIF was inspiration only and is not used. "French Class" (IMG_3264.mp4)
  was cut as a loop and rejected on 2026-10-21: too quirky for the sponsored-athlete feel. Options:
  a stop-motion cut of the skate stills, or real street footage from Tony. Until then the hero is
  the fisheye still with the ladder and rails.
- Portfolio clip: the Rhude x Honda "Rooted" promo (IMG_5273.mov), encoded by the same script.
- Not used: IMG_2268.mp4, a group lifestyle commercial Tony appears in for a few seconds.
- Photos: `scripts/photos.json` lists Drive file IDs, roles and alt text. `scripts/photos.mjs`
  downloads them from the "Operation Tony" Drive folder (link-shared), converts HEIC, auto-orients,
  resizes to a 2000px long edge, writes `public/photos/<key>.jpg` and generates
  `src/content/photos.ts`. Originals are never committed.
- Photo credits: unknown. TODO(confirm) who shot them; credit lines go in `photos.json`.

## Behaviour
- Burst: see DESIGN.md "Signature". It pauses when the tab is hidden or the hero is off screen.
- Lite YouTube: show the thumbnail and a play button; load the iframe from youtube-nocookie on click.
- Contact sheet lightbox: native `<dialog>`, arrow keys, Esc closes, focus returns to the thumbnail.
- Nav: becomes solid after 24px of scroll; the phone menu is a `<dialog>`-based panel.

## Not in v1 (built so it can drop in)
- RSVP or calendar block on `/club` (Luma embed or Supabase form).
- Merch or drop waitlist.
- Press kit PDF.
