'use client';

import { useEffect, useRef, useState } from 'react';

export type Spot = { brand: string; credit: string; src: string; poster: string; width: number; height: number };

/* Brand work: the branded spots Tony has fronted, apart from his book. Each spot plays muted while it
   is on screen and pauses off it; its sound button turns sound on for that spot only. Under reduced
   motion nothing autoplays. Spots are never drawn larger than their own pixels on a 2x screen. */
export function BrandWork({ title, body, spots }: { title: string; body: string; spots: readonly Spot[] }) {
  const [loud, setLoud] = useState<number | null>(null);

  return (
    <section aria-labelledby="brands" className="border-t border-ink">
      <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-32">
        <div className="mb-14 grid gap-8 md:grid-cols-[5fr_7fr] md:items-end">
          <h2 id="brands" className="type-brand text-[clamp(3.5rem,10vw,8rem)]">
            {title}
          </h2>
          <p className="measure">{body}</p>
        </div>
        {/* Tall spots first, the wide one last at the foot of the row: it is the softest source. */}
        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 items-start gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:items-end md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {spots.map((s, i) => (
            <li key={s.src} className={`shrink-0 snap-start ${s.height > s.width ? 'w-[180px] md:w-auto' : 'w-[78vw] md:w-auto'}`}>
              <SpotPlayer spot={s} loud={loud === i} onSound={() => setLoud(loud === i ? null : i)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpotPlayer({ spot, loud, onSound }: { spot: Spot; loud: boolean; onSound: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {}); // autoplay refused: the poster stays
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = !loud;
    if (loud) video.play().catch(() => {});
  }, [loud]);

  return (
    // Capped at its own pixels: a third of them on a 3x phone, half on a 2x laptop.
    <figure
      className="max-w-[calc(var(--w)/3)] md:max-w-[calc(var(--w)/2)]"
      style={{ '--w': `${spot.width}px` } as React.CSSProperties}
    >
      <video
        ref={ref}
        src={spot.src}
        poster={spot.poster}
        width={spot.width}
        height={spot.height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${spot.brand}, ${spot.credit}, with Tony`}
        className="h-auto w-full bg-fin"
      />
      <figcaption className="mt-2 flex items-start justify-between gap-3">
        <span className="text-small">
          <span className="block font-bold">{spot.brand}</span>
          <span className="block text-asphalt">{spot.credit}</span>
        </span>
        <button
          type="button"
          onClick={onSound}
          aria-pressed={loud}
          aria-label={`Sound for ${spot.brand}`}
          className="min-h-11 shrink-0 border border-ink px-3 text-small font-semibold transition-colors duration-150 hover:bg-ink hover:text-white aria-pressed:bg-ink aria-pressed:text-white"
        >
          Sound
        </button>
      </figcaption>
    </figure>
  );
}
