import type { Metadata } from 'next';
import Image from 'next/image';
import { Book } from '@/components/Book';
import { FactList } from '@/components/FactList';
import { ProfileTabs } from '@/components/ProfileTabs';
import { ClipReel } from '@/components/ClipReel';
import { tony } from '@/content/site';
import { clips } from '@/content/clips';
import { photo } from '@/content/photos';
import { bookPhotos } from '@/content/books';

export const metadata: Metadata = { title: 'Tony: skate', description: tony.skate.lead };

// Tony's skating profile: team and setup, his skate book, and his clips from Instagram.
export default function TonySkatePage() {
  const hero = photo('garage-perch');
  return (
    <>
      <section className="bg-fin">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 pt-28 pb-16 md:grid-cols-[7fr_5fr] md:items-end md:px-8 md:pt-36 md:pb-24">
          <div>
            <h1 className="type-display">{tony.title}</h1>
            <p className="measure mt-8 text-title font-medium [font-variation-settings:'wdth'_105]">{tony.skate.lead}</p>
            <ProfileTabs current="/tony/skate" />
          </div>
          <div className="relative aspect-[2/3] w-full">
            <Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" blurDataURL={hero.blur} className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="skate" className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-32">
        <div className="mb-14 grid gap-10 md:grid-cols-[5fr_7fr] md:items-end">
          <h2 id="skate" className="type-brand text-[clamp(3.5rem,10vw,8rem)]">
            {tony.skate.title}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <FactList items={tony.skate.facts} />
            <div>
              <h3 className="type-title">{tony.film.title}</h3>
              <p className="measure mt-2 text-asphalt">{tony.film.body}</p>
            </div>
          </div>
        </div>
        <Book photos={bookPhotos('skate')} label="Skate book" />
      </section>

      <ClipReel title={tony.skate.watch} clips={clips} link={{ href: '/edits', label: 'Full edits' }} />
    </>
  );
}
