/* Sharpness gate: the "no soft media" rule in CLAUDE.md. For every <img> and <video> on each route, it compares
   the pixels drawn on a 2x laptop and a 3x phone to the file's real pixels and lists anything enlarged.
     pnpm dev   (or pnpm start)
     SHOOT_URL=http://localhost:3000 node scripts/sharpness.mjs                                      */
import { chromium } from 'playwright';
const b = await chromium.launch();
const bad = [];
for (const [tag, vp, dpr] of [['laptop', { width: 1440, height: 900 }, 2], ['phone', { width: 390, height: 844 }, 3]]) {
  const p = await (await b.newContext({ viewport: vp, deviceScaleFactor: dpr })).newPage();
  for (const r of ['/', '/club', '/tony', '/edits']) {
    await p.goto((process.env.SHOOT_URL ?? 'http://localhost:3000') + r, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 700) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(150); }
    await p.waitForTimeout(800);
    const rows = await p.evaluate(async (dpr) => {
      const out = [];
      for (const el of document.querySelectorAll('img, video')) {
        const box = el.getBoundingClientRect(); if (box.width < 40) continue;
        let nw, nh, src;
        if (el.tagName === 'VIDEO') {
          src = el.currentSrc || el.querySelector('source')?.src || el.poster;
          nw = el.videoWidth; nh = el.videoHeight;
          if (!nw) { const i = new Image(); i.src = el.poster; await i.decode().catch(() => {}); nw = i.naturalWidth; nh = i.naturalHeight; src = el.poster; }
        } else {
          src = el.currentSrc;
          // naturalWidth is density-adjusted for srcset images; fetch the real file to get true pixels.
          const i = new Image(); i.src = src; await i.decode().catch(() => {});
          nw = i.naturalWidth; nh = i.naturalHeight;
        }
        if (!nw) continue;
        const fit = getComputedStyle(el).objectFit;
        const s = fit === 'cover' ? Math.max(box.width / nw, box.height / nh) : Math.min(box.width / nw, box.height / nh);
        out.push({ src: decodeURIComponent(src.replace(location.origin, '')).slice(0, 90), ratio: +(s * dpr).toFixed(2), natural: `${nw}x${nh}`, box: `${Math.round(box.width)}x${Math.round(box.height)}` });
      }
      return out;
    }, dpr);
    for (const x of rows) if (x.ratio > 1.05) bad.push({ tag, r, ...x });
  }
}
console.log(bad.length ? bad.map((x) => `${x.tag.padEnd(6)} ${x.r.padEnd(6)} x${x.ratio}  ${x.natural} in ${x.box}  ${x.src}`).join('\n') : 'no upscaled media');
await b.close();
