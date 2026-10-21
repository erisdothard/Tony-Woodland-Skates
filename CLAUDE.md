# TONY Skate Club

Website for Tony Woodland (Nashville, Rollerblade team, street/freeride skater and model) and the
greenway group skates he started. Client of Eris (Syntra AI). Next.js 16 App Router, Tailwind v4,
pnpm, deployed on Vercel.

Read before UI work:
- `.ulpi/design/DESIGN.md`: the locked design language. Every colour, font, size and duration comes from it.
- `.ulpi/design/site.md`: the feature spec, content facts and sources.
- `docs/inspo/README.md`: the reference board and what we took from each site.
- `AGENTS.md`: this Next.js version differs from training data. Read `node_modules/next/dist/docs/` first.

## Commands
```bash
pnpm dev              # http://localhost:3000
pnpm lint && pnpm build
node scripts/photos.mjs   # pulls Drive photos -> public/photos + src/content/photos.ts
node scripts/hero.mjs     # encodes hero + portfolio loops from assets-src/*.mp4|mov (Drive clips)
node scripts/shoot.mjs    # visual gate: screenshots to docs/review/<date>/
```

## Rules
- All copy lives in `src/content/site.ts`. Unverified facts carry `TODO(confirm)`.
- Visual gate: every UI change gets 390px and 1440px captures in `docs/review/` before it is called done.
- No soft media (Eris, 2026-10-21). The rule is about quality loss, not about photographic style:
  no frame grabs of a moving skater used as photos, no image or video drawn larger than its real
  pixels on a 2x laptop or a 3x phone (encode video at the source's native size). A video frame is
  not a photo; for a still, use a real photograph. Check with `scripts/sharpness.mjs` and by viewing
  the file at 1:1 before calling media done.
- Professional photos are never "blurry". Slow shutter, light trails, motion drag, shallow focus and
  grain are the photographer's choices and part of a shoot's mood. Never cut a frame from a shoot
  Eris supplied for being soft; include every frame he picks.
- Never commit original photos. `assets-src/` and the photo cache are git-ignored.
