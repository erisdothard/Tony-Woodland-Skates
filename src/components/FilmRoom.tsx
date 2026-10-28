'use client';

import { useEffect, useRef, useState } from 'react';

export type Film = { title: string; by: string; note: string; length: string; src: string; poster: string; width: number; height: number };

/* Film and music: Tony's longer pieces, on the ink ground. One player and the list beside it. Nothing
   autoplays: these run up to three and a half minutes with sound, so a piece starts only when someone
   picks it. Pieces are never drawn larger than their own pixels (a third on a 3x phone, half on 2x). */
export function FilmRoom({ title, body, films }: { title: string; body: string; films: readonly Film[] }) {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const film = films[active];

  useEffect(() => {
    if (started) ref.current?.play().catch(() => {}); // play refused: the controls stay for a tap
  }, [active, started]);

  return (
    <section aria-labelledby="film" className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-32">
        <div className="mb-12 grid gap-8 md:grid-cols-[5fr_7fr] md:items-end">
          <h2 id="film" className="type-display">
            {title}
          </h2>
          <p className="measure text-white/80">{body}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
          <div className="flex items-center justify-center bg-black/40 md:h-[min(62svh,560px)]">
            <video
              ref={ref}
              key={film.src}
              src={film.src}
              poster={film.poster}
              width={film.width}
              height={film.height}
              controls
              playsInline
              preload="none"
              aria-label={`${film.title}, ${film.by}`}
              onPlay={() => setStarted(true)}
              className="h-auto max-h-full w-auto max-w-[min(100%,calc(var(--w)/3))] md:max-w-[min(100%,calc(var(--w)/2))]"
              style={{ '--w': `${film.width}px` } as React.CSSProperties}
            />
          </div>

          <ol className="border-t border-white/30">
            {films.map((f, i) => (
              <li key={f.src} className="border-b border-white/30">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setStarted(true);
                  }}
                  aria-current={i === active ? 'true' : undefined}
                  className={`relative grid w-full grid-cols-[4.5rem_1fr] items-center gap-4 py-4 pl-5 text-left transition-colors duration-150 ${
                    i === active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-4 left-0 w-[3px] bg-pants transition-opacity duration-150 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.poster} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                  <span>
                    <span className="type-title block">{f.title}</span>
                    <span className="mt-1 block text-small text-white/70">
                      {f.by}. {f.note} <span className="tabular-nums">{f.length}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
