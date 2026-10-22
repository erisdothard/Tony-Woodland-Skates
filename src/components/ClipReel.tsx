'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Clip } from '@/content/clips';

/* "Watch Tony skate": his own quick clips from Instagram instead of a YouTube embed. Same layout as
   the photo book: the current clip large on the left, every clip beside it in an even grid that
   scrolls inside its own panel. Clips play muted on a loop; the player's sound button turns sound on,
   and that choice carries to the next clip. Under reduced motion nothing autoplays.
   Clips are never drawn larger than their own pixels on a 2x screen. */
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeMotion = (onChange: () => void) => {
  const q = reducedMotion();
  q.addEventListener('change', onChange);
  return () => q.removeEventListener('change', onChange);
};

export function ClipReel({ title, clips, link }: { title: string; clips: readonly Clip[]; link?: { href: string; label: string } }) {
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(true);
  const motion = useSyncExternalStore(subscribeMotion, () => !reducedMotion().matches, () => true);
  const thumbs = useRef<HTMLOListElement>(null);
  const clip = clips[i];
  const count = clips.length;
  const cols = [4, 5, 3, 6].find((c) => count % c === 0) ?? 4;
  const colClass = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6' }[cols];

  useEffect(() => {
    thumbs.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [i]);

  const step = (d: number) => setI((n) => (n + d + count) % count);

  return (
    <section aria-labelledby="clips-title" className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="clips-title" className="type-display">
            {title}
          </h2>
          {link && (
            <Link href={link.href} className="link font-semibold">
              {link.label}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-6">
          <div className="min-w-0">
            <div className="flex h-[70svh] max-h-[760px] items-center justify-center">
              <video
                key={clip.key}
                src={clip.src}
                poster={clip.poster}
                muted={muted}
                autoPlay={motion}
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={clip.alt}
                onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
                className="h-auto max-h-full w-auto max-w-full bg-ink"
                style={{ maxWidth: `min(100%, ${clip.width / 2}px)`, maxHeight: `min(100%, ${clip.height / 2}px)` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-small tabular-nums text-white/80">
                <span className="font-semibold text-white">{String(i + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous clip" className="min-h-11 border border-white px-4 text-small font-semibold transition-colors duration-150 hover:bg-white hover:text-ink">
                  Prev
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next clip" className="min-h-11 border border-white px-4 text-small font-semibold transition-colors duration-150 hover:bg-white hover:text-ink">
                  Next
                </button>
              </div>
            </div>
          </div>

          <ol
            ref={thumbs}
            aria-label="Clips"
            className={`flex min-w-0 gap-[3px] overflow-x-auto pb-1 md:grid md:h-[70svh] md:max-h-[760px] ${colClass} md:content-start md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pr-1`}
          >
            {clips.map((c, n) => (
              <li key={c.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Clip ${n + 1}`}
                  aria-current={n === i ? 'true' : undefined}
                  className={`relative block aspect-square h-20 overflow-hidden transition-opacity duration-150 md:h-auto md:w-full ${
                    n === i ? 'opacity-100 outline outline-2 -outline-offset-2 outline-pants' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={c.poster} alt="" fill sizes="(min-width: 768px) 10vw, 80px" placeholder="blur" blurDataURL={c.blur} className="object-cover" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
