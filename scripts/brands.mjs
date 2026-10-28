/* Brand work and film work on the Tony page. Sources live in assets-src/ (git-ignored), from Eris's
   WeTransfer "portfolio-video" (2026-10-22):
     brands/stone-island.mov    IMG_0464, Stone Island for Rooted (540x960, 15 s)
     brands/rhude-honda.mov     IMG_5273, Rhude x Honda for Rooted (540x960, 15 s)
     brands/aime-leon-dore.mov  IMG_8192, Aimé Leon Dore for Rooted (540x960, 10 s)
     brands/be-shootin.mov      IMG_3470, Be Shootin' (1920x1080, 13 s)
     film/french-class.mp4      IMG_3264, halfnoise "French Class" video (2048x1152, 3:28)
     film/jack-and-diane.mov    IMG_7742, Jake Owen "I Was Jack (You Were Diane)" promo (1280x720, 59 s)
     film/hangar.mp4            joined_video_..., hangar and motorcycle fashion film (720x900, 60 s)
     film/outdoor-spot.mp4      IMG_2268, outdoor product spot (720x720, 56 s)
   Encoded at the source's native size with its sound (rule: no soft media). Versioned names: never
   overwrite a media file in place. Writes public/brands/ and public/film/. Needs ffmpeg on PATH.
     node scripts/brands.mjs                                                                    */
import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '128k'];

// [folder, source file, poster time in s, crf, filter]: each poster is a frame where the brand or Tony
// reads. The film pieces are long and play only on request, so they take a lighter crf. French Class is
// 2048 wide with heavy grain: 1920 wide at crf 30 keeps it under GitHub's 100 MB file limit (68 MB) and
// is still 2x the 960 px it is drawn at.
const clips = [
  ['brands', 'stone-island.mov', 3.5, 24],
  ['brands', 'rhude-honda.mov', 1, 24],
  ['brands', 'aime-leon-dore.mov', 1.5, 24],
  ['brands', 'be-shootin.mov', 0.8, 24],
  ['film', 'french-class.mp4', 58.6, 30, 'scale=1920:-2'],
  ['film', 'jack-and-diane.mov', 48, 26],
  ['film', 'hangar.mp4', 24.4, 26],
  ['film', 'outdoor-spot.mp4', 19.3, 26],
];
for (const [dir, file, at, crf, vf] of clips) {
  const input = path.join(root, 'assets-src', dir, file);
  const name = path.parse(file).name;
  const out = path.join(root, 'public', dir);
  await mkdir(out, { recursive: true });
  if (!existsSync(input)) { console.log(name.padEnd(16), 'skipped, no source'); continue; }
  for (const [target, args] of [
    [`${name}-v1.mp4`, ['-i', input, ...(vf ? ['-vf', vf] : []), ...H264, '-crf', String(crf)]],
    [`${name}-v1.jpg`, ['-ss', String(at), '-i', input, '-frames:v', '1', '-q:v', '3']],
  ]) {
    run([...args, path.join(out, target)]);
    console.log(`${dir}/${target}`.padEnd(30), `${(statSync(path.join(out, target)).size / 1024).toFixed(0)} KB`);
  }
}
