/* Resized copies of every web master, made at build time so the site never calls Vercel's image
   optimizer (its monthly quota ran out in Nov 2026 and every photo on the live site went 402).
   src/lib/image-loader.ts points next/image at these files. Output is git-ignored.

     node scripts/variants.mjs          # runs automatically before `pnpm dev` and `pnpm build`  */
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');
// Keep in step with next.config.ts (imageSizes + deviceSizes). 2000 is the master itself.
const WIDTHS = [160, 256, 384, 640, 828, 1200];
const DIRS = ['photos', 'clips'];

const mtime = (p) => stat(p).then((s) => s.mtimeMs, () => 0);
let made = 0;
for (const dir of DIRS) {
  const files = (await readdir(path.join(pub, dir))).filter((f) => f.endsWith('.jpg'));
  for (const w of WIDTHS) await mkdir(path.join(pub, 'v', String(w), dir), { recursive: true });
  await Promise.all(files.map(async (f) => {
    const src = path.join(pub, dir, f);
    const at = await mtime(src);
    for (const w of WIDTHS) {
      const dest = path.join(pub, 'v', String(w), dir, f);
      if ((await mtime(dest)) >= at) continue;
      // Never enlarged: a master narrower than `w` is copied at its real size.
      await sharp(src).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
      made++;
    }
  }));
}
console.log(`image variants: ${made} written`);
