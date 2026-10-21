/* Hero and portfolio video. Sources live in assets-src/ (git-ignored):
     ledge-day.mp4  Razors Skate Co. clip of Tony, "Ledge day #slmint" (640x640, 24 s), from their
                    Facebook page. TODO(confirm): Razors' OK to use it on Tony's site.
     rooted.mov     the Rhude x Honda "Rooted" promo (540x960, 15 s), for the Tony page.
   The clip is native 640 px, so it is never upscaled on export: square for the desktop poster
   column, a 9:16 centre crop for phones. Light denoise, since the phone grain costs more bits than
   the picture. Writes public/hero/. Needs ffmpeg on PATH.
     node scripts/hero.mjs                                                                      */
import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = (f) => path.join(root, 'assets-src', f);
const out = path.join(root, 'public/hero');
await mkdir(out, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-g', '60', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
const DN = 'hqdn3d=3:2:4:3';
const CUT = ['-ss', '0', '-t', '12']; // two tricks, a clean loop point

const jobs = [
  ['ledge-sq.mp4', [...CUT, '-i', src('ledge-day.mp4'), '-vf', `${DN},fps=30`, ...H264, '-crf', '29']],
  ['ledge-pt.mp4', [...CUT, '-i', src('ledge-day.mp4'), '-vf', `${DN},crop=360:640:140:0,fps=30`, ...H264, '-crf', '29']],
  ['ledge-sq.jpg', ['-ss', '2', '-i', src('ledge-day.mp4'), '-frames:v', '1', '-q:v', '4']],
  ['ledge-pt.jpg', ['-ss', '2', '-i', src('ledge-day.mp4'), '-frames:v', '1', '-vf', 'crop=360:640:140:0', '-q:v', '4']],
  ['rooted.mp4', ['-i', src('rooted.mov'), '-vf', 'scale=-2:720,fps=24', ...H264, '-crf', '30']],
  ['rooted.jpg', ['-ss', '1', '-i', src('rooted.mov'), '-frames:v', '1', '-vf', 'scale=-2:720', '-q:v', '4']],
];
for (const [name, args] of jobs) {
  run([...args, path.join(out, name)]);
  console.log(name.padEnd(16), `${(statSync(path.join(out, name)).size / 1024).toFixed(0)} KB`);
}
