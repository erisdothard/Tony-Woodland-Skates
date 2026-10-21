/* Hero media from Tony's GIF (assets-src/tony.gif: 14 frames, 1080x1920, 11 x 200 ms then 3 x 1000 ms).
   The GIF already carries his wordmark, the TONY ladder and the GROUP LESSONS / FREESTYLE TRAINING /
   EVENTS captions; only its SKATE CLUB edge rails are cropped off, because the site sets those as
   live type. Writes:
     public/hero/burst.mp4   constant 5 fps so the 1000 ms holds survive, 1280 tall, ~600 KB
     public/hero/poster.webp the first frame (ladder on), for reduced motion and before playback
   Needs ffmpeg on PATH.                                                                        */
import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const gif = path.join(root, 'assets-src/tony.gif');
const out = path.join(root, 'public/hero');
const CROP = { w: 840, h: 1920, x: 126, y: 0 }; // inside both baked rails, keeps every caption

await mkdir(out, { recursive: true });
execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-i', gif,
  '-vf', `fps=5,crop=${CROP.w}:${CROP.h}:${CROP.x}:${CROP.y},hqdn3d=3:3:4:4,scale=-2:1280:flags=lanczos,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '26', '-tune', 'stillimage', '-g', '26',
  '-movflags', '+faststart', '-an', path.join(out, 'burst.mp4'),
]);
await sharp(gif, { page: 0 })
  .extract({ left: CROP.x, top: CROP.y, width: CROP.w, height: CROP.h })
  .resize({ height: 1280 })
  .webp({ quality: 80 })
  .toFile(path.join(out, 'poster.webp'));
console.log('wrote public/hero/burst.mp4 and poster.webp');
