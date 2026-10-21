'use client';

import { useState } from 'react';
import type { Edit } from '@/content/site';

/* The video room: the only ink-ground section. One player, a list of edits beside it.
   The player is a thumbnail until someone presses play; YouTube loads only then (nocookie). */
export function VideoRoom({
  title,
  edits,
  headingLevel = 2,
  footer,
}: {
  title: string;
  edits: Edit[];
  headingLevel?: 1 | 2;
  footer?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [thumbFallback, setThumbFallback] = useState<Record<string, boolean>>({});
  const edit = edits[active];
  const H = headingLevel === 1 ? 'h1' : 'h2';
  const thumb = `https://i.ytimg.com/vi/${edit.id}/${thumbFallback[edit.id] ? 'hqdefault' : 'maxresdefault'}.jpg`;

  return (
    <section aria-labelledby="video-room" className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-36">
        <H id="video-room" className="type-display">
          {title}
        </H>
        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
          <div className="relative aspect-video w-full bg-asphalt">
            {playing ? (
              <iframe
                key={edit.id}
                src={`https://www.youtube-nocookie.com/embed/${edit.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${edit.title}, ${edit.channel}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 size-full"
                aria-label={`Play ${edit.title}, ${edit.channel}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={thumb}
                  src={thumb}
                  alt=""
                  loading="lazy"
                  onLoad={(e) => {
                    // maxresdefault answers 120px wide when it does not exist.
                    if (e.currentTarget.naturalWidth <= 120) setThumbFallback((f) => ({ ...f, [edit.id]: true }));
                  }}
                  onError={() => setThumbFallback((f) => ({ ...f, [edit.id]: true }))}
                  className="size-full object-cover opacity-90 transition-opacity duration-150 group-hover:opacity-100"
                />
                <span className="btn absolute bottom-4 left-4 md:bottom-6 md:left-6">Watch {edit.title}</span>
              </button>
            )}
          </div>

          <ol className="border-t border-white/30">
            {edits.map((e, i) => (
              <li key={e.id} className="border-b border-white/30">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPlaying(true);
                  }}
                  aria-current={i === active ? 'true' : undefined}
                  className={`relative block w-full py-4 pl-5 text-left transition-colors duration-150 ${
                    i === active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-4 left-0 w-[3px] bg-pants transition-opacity duration-150 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <span className="type-title block">{e.title}</span>
                  <span className="mt-1 block text-small text-white/70">
                    {e.channel}. {e.note}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        {footer}
      </div>
    </section>
  );
}
