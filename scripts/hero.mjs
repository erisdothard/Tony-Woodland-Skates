/* Hero and portfolio video. Sources live in assets-src/ (git-ignored):
     edits/U6aXyUZ9cEw.mp4  Rollerblade's "Tony Woodland" team part (2023, 1080x1920, 25 s), pulled by
                            scripts/fetch-edits.sh. The hero is two pieces of it (see LOOP below).
                            TODO(confirm): Rollerblade's OK to use it on Tony's site.
     rooted.mov             the Rhude x Honda "Rooted" promo (540x960, 15 s), for the Tony page.
   The clip is native 9:16, so both the desktop poster column (720 px) and the phone full bleed
   (540 px) are downscales. Versioned names (tony-v3): never overwrite a media file in place.
   Writes public/hero/. Needs ffmpeg on PATH.
     node scripts/hero.mjs                                                                      */
import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = (f) => path.join(root, 'assets-src', f);
const out = path.join(root, 'public/hero');
await mkdir(out, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-g', '60', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
const DN = 'hqdn3d=2:1:3:2';
// Two pieces of the team part, joined: 6.5 s to 13.55 s (Twister XT close-up, push-off, the ledge jump
// at the Capitol, landing) and 14.35 s to 17.5 s (Capitol wide, the stair gap, the fisheye plaza).
// The gap between them is the edit's own inverted flash and a black-and-white run, which strobe in a
// loop. 6.0 to 6.5 s has prism fringes on the boot, so the in-point is 6.5. 10.2 s in all.
const TEAM = src('edits/U6aXyUZ9cEw.mp4');
const LOOP = (w, h) =>
  `[0:v]trim=6.5:13.55,setpts=PTS-STARTPTS[a];[0:v]trim=14.35:17.5,setpts=PTS-STARTPTS[b];` +
  `[a][b]concat=n=2:v=1:a=0,${DN},scale=${w}:${h},fps=30[v]`;
const POSTER = ['-ss', '12.25']; // mid-air at the ledge, the Capitol behind him

// One file at the source's native 1080x1920 for every screen. Smaller encodes were enlarged by the
// browser (1.9x on a retina laptop, 2.6x on a phone) and looked soft. Rule: no soft media.
const jobs = [
  ['tony-v3-1080.mp4', ['-i', TEAM, '-filter_complex', LOOP(1080, 1920), '-map', '[v]', ...H264, '-crf', '28']],
  ['tony-v3-1080.jpg', [...POSTER, '-i', TEAM, '-frames:v', '1', '-q:v', '3']],
  ['rooted.mp4', ['-i', src('rooted.mov'), '-vf', 'scale=-2:720,fps=24', ...H264, '-crf', '30']],
  ['rooted.jpg', ['-ss', '1', '-i', src('rooted.mov'), '-frames:v', '1', '-vf', 'scale=-2:720', '-q:v', '4']],
];
for (const [name, args] of jobs) {
  const input = args[args.indexOf('-i') + 1];
  if (!existsSync(input)) { console.log(name.padEnd(16), `skipped, no ${path.relative(root, input)}`); continue; }
  run([...args, path.join(out, name)]);
  console.log(name.padEnd(16), `${(statSync(path.join(out, name)).size / 1024).toFixed(0)} KB`);
}
