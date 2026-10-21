import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '@/content/photos';

type Half = { word: string; line: string; link: string; href: string; photo: Photo; ground: 'pants' | 'fin' };

// The brief's "equal split": club and Tony, side by side, each a full-height photo with its word set into it.
export function Split({ halves }: { halves: [Half, Half] }) {
  return (
    <section aria-label="Two ways in" className="grid md:grid-cols-2">
      {halves.map((h) => (
        <Link
          key={h.href}
          href={h.href}
          className={`group relative flex min-h-[88svh] [container-type:inline-size] flex-col justify-end overflow-hidden ${h.ground === 'pants' ? 'on-pants bg-pants' : 'bg-fin'} text-ink`}
        >
          <div className="absolute inset-x-4 top-20 bottom-[13.5rem] overflow-hidden md:inset-x-8 md:top-24 md:bottom-[15rem]">
            <Image
              src={h.photo.src}
              alt={h.photo.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={h.photo.blur}
              className="object-cover transition-transform duration-500 ease-[var(--ease-ui)] group-hover:scale-[1.03]"
            />
          </div>
          <div className="relative px-4 pb-8 md:px-8 md:pb-10">
            <p className="type-brand -mb-[0.06em] text-[17cqi]">{h.word}</p>
            <p className="measure mt-4 font-medium">{h.line}</p>
            <p className="mt-3 text-small font-bold underline decoration-1 underline-offset-4 [font-variation-settings:'wdth'_112] group-hover:decoration-2">
              {h.link}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
