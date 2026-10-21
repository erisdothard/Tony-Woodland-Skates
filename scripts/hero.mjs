/* Hero and portfolio video from Tony's own clips in the Operation Tony Drive folder.
   Sources live in assets-src/ (git-ignored):
     rooted.mov        the Rhude x Honda "Rooted" promo (540x960, 15 s), for the Tony page.
   The "French Class" skate film (IMG_3264.mp4) was tried as the hero and rejected: too quirky for
   the sponsored-athlete feel. The hero direction is open; see src/components/Hero.tsx.
   Writes public/hero/*.mp4 and poster JPEGs. Needs ffmpeg on PATH.
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
const H264 = ['-c:v', 'libx264', '-preset', 'slow', '-g', '48', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
// Light denoise: the film grain costs more bits than the picture.
const DN = 'hqdn3d=4:3:6:4.5';

const jobs = [
  // Rooted: 15 s vertical, shown small on /tony
  ['rooted.mp4', ['-i', src('rooted.mov'), '-vf', 'scale=-2:720,fps=24', ...H264, '-crf', '30']],
  ['rooted.jpg', ['-ss', '1', '-i', src('rooted.mov'), '-frames:v', '1', '-vf', 'scale=-2:720', '-q:v', '4']],
];
for (const [name, args] of jobs) {
  run([...args, path.join(out, name)]);
  console.log(name.padEnd(20), `${(statSync(path.join(out, name)).size / 1024).toFixed(0)} KB`);
}
