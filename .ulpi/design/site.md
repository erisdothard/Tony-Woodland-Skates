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
- Instagram @ynotwoodland (13.8K followers, 466 posts, 2026-10-21). Bio: "Rollerblade USA Pro,
  Nashville TN, @rollerblade @theblockagency @blankrollingproducts @asphaltbeachskateshop
  @twmotorworks". Facebook anthony.woodland.739.
- Sponsors, sourced: Rollerblade and Blank pro team since January 2021; Razors Skate Co. before that
  (2017 to 2019), so no Razors footage on the site; Bloom Urethane signature wheel (2022). Modeling
  clients he has named: Dickies, Levi's, REI, 279 Fragrance, Swiftwick. Agency: The Block Agency.
  Full table with sources: `docs/research/sponsors-2026-10-21.md`. All TODO(confirm) with Tony.
- Community skate, from his 2026-05-27 post: "Next community skate June 7th, 6:30 PM, Shelby Park
  Greenway", co-tagged Rollerblade and Asphalt Beach Skate Shop. TODO(confirm) the cadence.
- Edits (YouTube): Rollerblade "Rockit" 1j8R7Y7CJHs; Rollerblade "Tony Woodland" U6aXyUZ9cEw;
  Rollerblade "Tony Woodland 2025" _YQfCCO5nvw (short); SK Films "Tony Woodland – Los Angeles"
  hraOpDyJZ0o; Rollerblade "Twister XT Unboxing by Tony Woodland" cc2pZo5FazI.

## Media
- Hero: 10 s of Rollerblade's "Tony Woodland" team part (U6aXyUZ9cEw, 2023, native 9:16), 6.5 s to
  13.55 s and 14.35 s to 17.5 s joined: Twister XT close-up with the Rollerblade logo, push-off, the
  ledge jump at the Capitol, the stair gap. The gap is the edit's inverted flash and black-and-white
  run, cut because they strobe in a loop. Pulled at full quality by `scripts/fetch-edits.sh` (2026-10-21, from Eris's laptop) and
  encoded by `scripts/hero.mjs` at native 1080x1920 for every screen, file names versioned
  `tony-v3-*`. Replaced the Razors "Ledge day" clip the same day: Tony is sponsored by Rollerblade and
  Razors is a competing skate brand. TODO(confirm) with Rollerblade.
  Eris's TONY GIF was inspiration only. "French Class" (IMG_3264.mp4) was tried and rejected.
- Rollerblade press photos of Tony (14, from rollerblade.com, listed in scripts/photos.json with a
  `url` and `credit: Rollerblade`). TODO(confirm) with Rollerblade before launch.
- Portfolio clip: the Rhude x Honda "Rooted" promo (IMG_5273.mov), encoded by the same script.
- Moments (see DESIGN.md "Moments"): cut by `scripts/moments.mjs` from Rockit (1j8R7Y7CJHs). Frame
  grabs from My Escape (YLcKPQl-tbo) and the Instagram reel (DIjUVA9qpY3) were removed as too soft. Eris's picks,
  2026-10-21: the reel's opening smile, My Escape, and Rollerblade's Facebook "Tony Woodland" video,
  which is the same film as the YouTube short _YQfCCO5nvw. TODO(confirm) with Rollerblade.
- Edits room order (Eris, 2026-10-21): My Escape, Rockit, team part, Pay Day (Blank, 9CIGkk0fzmE),
  the 2025 short. The Twister XT unboxing and the 2017 SK Films LA edit were dropped.
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
