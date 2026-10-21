import type { Metadata } from 'next';
import Image from 'next/image';
import { ClubField } from '@/components/ClubField';
import { ContactSheet } from '@/components/ContactSheet';
import { Wheels } from '@/components/Wordmark';
import { club } from '@/content/site';
import { photo } from '@/content/photos';

export const metadata: Metadata = { title: 'Club', description: club.lead };

const STRIP = ['rb-nashville-skyline', 'park-cruise', 'rb-nashville-street', 'mountain-road', 'rb-lace-up', 'bowl-low', 'rb-reflection', 'mountain-road-2', 'rb-bowl', 'rb-park-air'] as const;

export default function ClubPage() {
  const hero = photo('rb-garage');
  return (
    <>
      <section className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 pt-28 pb-20 md:grid-cols-[7fr_5fr] md:items-end md:px-8 md:pt-36 md:pb-28">
        <div>
          <h1 className="type-display">{club.title}</h1>
          <p className="measure mt-8 text-title font-medium [font-variation-settings:'wdth'_105]">{club.lead}</p>
        </div>
        <div className="relative aspect-[4/5] w-full">
          <Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" blurDataURL={hero.blur} className="object-cover" />
        </div>
      </section>

      <ClubField title="How it works" facts={club.facts} cta={club.cta} />

      <section aria-labelledby="manners" className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 py-24 md:grid-cols-[5fr_7fr] md:px-8 md:py-36">
        <h2 id="manners" className="type-display">
          {club.etiquette.title}
        </h2>
        <ul className="divide-y divide-ink border-y border-ink">
          {club.etiquette.items.map((t) => (
            <li key={t} className="flex items-baseline gap-4 py-4">
              <Wheels className="shrink-0 text-[0.8rem]" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Skate photos" className="mx-auto max-w-[var(--container-content)] px-4 pb-24 md:px-8 md:pb-36">
        <ContactSheet photos={STRIP.map(photo)} rowHeight={240} />
      </section>
    </>
  );
}
