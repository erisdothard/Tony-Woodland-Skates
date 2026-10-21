'use client';

import { useEffect, useRef, useState } from 'react';
import { Ladder } from './Ladder';

/* Tony's GIF, rebuilt as code. DESIGN.md "Signature: the burst".
   Ten clean frames (public/burst, from scripts/burst.mjs). The GIF's own rhythm: one strobe frame,
   seven fast frames, three strobe frames, three slow frames. Stepped, never eased: it is stop-motion. */
const FRAMES = 10;
const STEPS: { frame: number; ladder: boolean; ms: number }[] = [
  { frame: 9, ladder: true, ms: 200 },
  ...[0, 1, 2, 3, 4, 5, 6].map((frame) => ({ frame, ladder: false, ms: 200 })),
  { frame: 0, ladder: true, ms: 200 },
  { frame: 3, ladder: true, ms: 200 },
  { frame: 2, ladder: true, ms: 200 },
  { frame: 7, ladder: false, ms: 1000 },
  { frame: 8, ladder: false, ms: 1000 },
  { frame: 9, ladder: false, ms: 1000 },
];

const src = (i: number, w: number) => `/burst/${String(i).padStart(2, '0')}-${w}.webp`;

export function Burst({ label }: { label: string }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);

  // Start only once every frame has decoded, so the burst never flashes a blank.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = true;
    let inView = true;
    let ready = false;
    const sync = () => setPlaying(ready && visible && inView);

    Promise.all(frames.current.map((img) => img?.decode().catch(() => undefined))).then(() => {
      ready = true;
      sync();
    });
    const onVis = () => {
      visible = document.visibilityState === 'visible';
      sync();
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    if (root.current) io.observe(root.current);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].ms);
    return () => clearTimeout(t);
  }, [playing, step]);

  // Before it plays (and always under reduced motion) the poster holds frame 0 with the ladder on.
  const { frame, ladder } = playing ? STEPS[step] : { frame: 0, ladder: true };
  const show = ladder ? 'opacity-100' : 'opacity-0';

  return (
    <section
      ref={root}
      aria-label={label}
      className="relative h-svh min-h-[560px] overflow-hidden bg-concrete"
    >
      {/* The photo: full-bleed 9:16 on phones, a centred poster column from md. */}
      <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 bg-fin md:w-[56.25svh] md:min-w-[315px]">
        {Array.from({ length: FRAMES }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            ref={(el) => {
              frames.current[i] = el;
            }}
            src={src(i, 540)}
            srcSet={`${src(i, 540)} 540w, ${src(i, 1080)} 1080w`}
            sizes="(min-width: 768px) 56vh, 100vw"
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 size-full object-cover ${i === frame ? 'visible' : 'invisible'}`}
          />
        ))}
      </div>

      {/* The ladder. Ink on concrete, white where it crosses the photo (two clipped layers). */}
      <div aria-hidden className={`pointer-events-none absolute inset-0 hidden items-center justify-center text-ink md:flex ${show}`}>
        <div className="w-[min(94vw,112svh)] [container-type:inline-size]">
          <Ladder words={['Tony', 'Tony', 'Tony', 'Tony']} fit={26} />
        </div>
      </div>
      <div
        aria-hidden
        className={`on-photo pointer-events-none absolute inset-0 flex items-center justify-center text-white md:[clip-path:inset(0_min(calc(50%_-_28.125svh),calc(50%_-_157.5px)))] ${show}`}
      >
        <div className="w-[68vw] [container-type:inline-size] md:w-[min(94vw,112svh)]">
          <Ladder words={['Tony', 'Tony', 'Tony', 'Tony']} fit={26} />
        </div>
      </div>

      {/* Rails: SKATE CLUB on both edges, as in the GIF. */}
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-[38%] left-3 text-[clamp(1.4rem,4.5vw,2.6rem)] leading-none text-ink [writing-mode:vertical-rl] rotate-180 md:left-8 md:bottom-1/2 md:translate-y-1/2"
      >
        <span className="type-brand">Skate</span> <span className="type-rail-thin">Club</span>
      </p>
      <p
        aria-hidden
        className="pointer-events-none absolute right-3 top-[38%] text-[clamp(1.4rem,4.5vw,2.6rem)] leading-none text-white [writing-mode:vertical-rl] md:right-8 md:top-1/2 md:-translate-y-1/2 md:text-ink"
      >
        <span className="type-brand">Skate</span> <span className="type-rail-thin">Club</span>
      </p>

      {/* Scroll cue: the GIF's thin line dropping out of the frame. */}
      <span aria-hidden className="absolute bottom-0 left-1/2 h-[14svh] w-px bg-white" />
    </section>
  );
}
