'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Photo } from '@/content/photos';

/* Tony's book: just the photos. A large stage on the left and every photo beside it in an even grid
   that scrolls inside its own panel, so the page never turns into one long scroll. Frames from the
   same shoot sit next to each other. Phones get the stage with a swipeable strip under it.
   The stage opens full screen. Photos are never drawn larger than their own pixels. */
export function Book({ photos, label }: { photos: Photo[]; label: string }) {
  const [i, setI] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbs = useRef<HTMLOListElement>(null);
  const count = photos.length;
  const photo = photos[i];
  const step = (d: number) => setI((n) => (n + d + count) % count);

  // Arrow keys step through the photos in full screen.
  useEffect(() => {
    const el = dialog.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((n) => (n + 1) % count);
      if (e.key === 'ArrowLeft') setI((n) => (n - 1 + count) % count);
    };
    el?.addEventListener('keydown', onKey);
    return () => el?.removeEventListener('keydown', onKey);
  }, [count]);

  // Keep the current thumbnail in view inside its panel.
  useEffect(() => {
    thumbs.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [i]);

  // The thumbnail grid always ends on a full row: four across if that fills it, else five, else three.
  const cols = [4, 5, 3].find((c) => count % c === 0) ?? 4;
  const colClass = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' }[cols];

  const capped = (p: Photo) => ({ maxWidth: `min(100%, ${p.width / 2}px)`, maxHeight: `min(100%, ${p.height / 2}px)` });

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-6">
      <div className="min-w-0">
        <div className="relative h-[64svh] max-h-[780px] md:h-[74svh]">
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="flex size-full cursor-zoom-in items-center justify-center"
            aria-label={`Photo ${i + 1} of ${count}. Open full screen`}
          >
            <Image
              key={photo.key}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 55vw, 100vw"
              placeholder="blur"
              blurDataURL={photo.blur}
              className="h-auto max-h-full w-auto max-w-full object-contain"
              style={capped(photo)}
            />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-small tabular-nums">
            <span className="font-semibold">{String(i + 1).padStart(3, '0')}</span>
            <span className="text-asphalt"> / {String(count).padStart(3, '0')}</span>
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="min-h-11 border border-ink px-4 text-small font-semibold transition-colors duration-150 hover:bg-ink hover:text-white">
              Prev
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="min-h-11 border border-ink px-4 text-small font-semibold transition-colors duration-150 hover:bg-ink hover:text-white">
              Next
            </button>
          </div>
        </div>
      </div>

      <ol
        ref={thumbs}
        aria-label={label}
        className={`flex min-w-0 gap-[3px] overflow-x-auto pb-1 md:grid md:h-[74svh] md:max-h-[780px] ${colClass} md:content-start md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pr-1`}
      >
        {photos.map((p, n) => (
          <li key={p.key} className="shrink-0">
            <button
              type="button"
              onClick={() => setI(n)}
              aria-label={`Photo ${n + 1}`}
              aria-current={n === i ? 'true' : undefined}
              className={`relative block aspect-square h-20 overflow-hidden transition-opacity duration-150 md:h-auto md:w-full ${
                n === i ? 'opacity-100 outline outline-2 -outline-offset-2 outline-pants' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={p.src} alt="" fill sizes="(min-width: 768px) 10vw, 80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ol>

      <dialog ref={dialog} aria-label="Photo" className="on-ink m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-white backdrop:bg-ink">
        <div className="flex h-full flex-col">
          <div className="flex items-baseline justify-between gap-4 px-4 py-4 md:px-8">
            <p className="text-small tabular-nums text-white/70">
              {String(i + 1).padStart(3, '0')} / {String(count).padStart(3, '0')}
            </p>
            <button type="button" onClick={() => dialog.current?.close()} className="py-2 font-semibold">
              Close
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-16">
            <Image
              key={photo.key}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              className="h-auto max-h-full w-auto max-w-full object-contain"
              style={capped(photo)}
            />
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize" />
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize" />
          </div>
        </div>
      </dialog>
    </div>
  );
}
