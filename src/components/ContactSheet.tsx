'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Photo } from '@/content/photos';

/* A photographer's contact sheet: justified rows at each photo's true aspect ratio, hairline gaps,
   nothing cropped to a square. Click opens the photo full screen (native <dialog>). */
export function ContactSheet({ photos, rowHeight = 260 }: { photos: Photo[]; rowHeight?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const show = (i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setOpen(i);
    dialog.current?.showModal();
  };
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => {
      setOpen(null);
      opener.current?.focus();
    };
    el.addEventListener('keydown', onKey);
    el.addEventListener('close', onClose);
    return () => {
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('close', onClose);
    };
  }, [step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="flex flex-wrap gap-[3px]" style={{ ['--row' as string]: `${rowHeight}px` }}>
        {photos.map((p, i) => {
          const ratio = p.width / p.height;
          return (
            <li
              key={p.key}
              className="relative max-md:[--row:150px]"
              style={{ flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio})` }}
            >
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                className="group block w-full"
                aria-label={`Open photo: ${p.alt}`}
              >
                <span className="relative block w-full" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes={`(min-width: 768px) ${Math.round(rowHeight * ratio * 1.4)}px, 50vw`}
                    placeholder="blur"
                    blurDataURL={p.blur}
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-150 group-hover:bg-ink/10" />
                </span>
              </button>
            </li>
          );
        })}
        {/* Keeps the last row from stretching. */}
        <li aria-hidden className="grow-[10]" />
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? current.alt : 'Photo'}
        className="on-ink m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-white backdrop:bg-ink"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-4 text-small md:px-8">
              <span>
                {open! + 1} of {photos.length}
              </span>
              <button type="button" onClick={() => dialog.current?.close()} className="py-2 font-semibold">
                Close
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image key={current.key} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <button type="button" onClick={() => step(-1)} className="py-2 text-small font-semibold">
                Previous
              </button>
              <p className="measure text-center text-small text-white/80">{current.alt}</p>
              <button type="button" onClick={() => step(1)} className="py-2 text-small font-semibold">
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
