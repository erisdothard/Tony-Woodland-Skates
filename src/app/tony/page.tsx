import type { Metadata } from 'next';
import Image from 'next/image';
import { Book } from '@/components/Book';
import { BrandWork } from '@/components/BrandWork';
import { FilmRoom } from '@/components/FilmRoom';
import { ProfileTabs } from '@/components/ProfileTabs';
import { site, tony } from '@/content/site';
import { photo } from '@/content/photos';
import { bookPhotos } from '@/content/books';

export const metadata: Metadata = { title: 'Tony: model', description: tony.lead };

// Tony's modeling profile: who he is, his book by shoot, his brand and film work, how to book him.
export default function TonyModelPage() {
  const portrait = photo('studio-tank');
  return (
    <>
      <section className="bg-fin">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 pt-28 pb-16 md:grid-cols-[7fr_5fr] md:items-end md:px-8 md:pt-36 md:pb-24">
          <div>
            <h1 className="type-display">{tony.title}</h1>
            <p className="measure mt-8 text-title font-medium [font-variation-settings:'wdth'_105]">{tony.lead}</p>
            <ProfileTabs current="/tony" />
          </div>
          <div className="relative aspect-[2/3] w-full">
            <Image src={portrait.src} alt={portrait.alt} fill preload sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" blurDataURL={portrait.blur} className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="model" className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-32">
        <div className="mb-14 grid gap-8 md:grid-cols-[5fr_7fr] md:items-end">
          <h2 id="model" className="type-brand text-[clamp(3.5rem,10vw,8rem)]">
            {tony.model.title}
          </h2>
          <div>
            <p className="measure">{tony.model.body}</p>
            <a href={`mailto:${site.email}`} className="btn mt-6">
              {tony.model.cta}
            </a>
          </div>
        </div>
        <Book photos={bookPhotos('model')} label="Model book" />
      </section>

      <BrandWork {...tony.brands} />

      <FilmRoom {...tony.screen} />

      <section aria-label="About Tony" className="border-t border-ink">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-12 px-4 py-24 md:grid-cols-[7fr_5fr] md:px-8 md:py-32">
          <div className="space-y-6">
            {tony.bio.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
          </div>
          <figure className="md:pt-2">
            <blockquote className="type-title">“{tony.quote.text}”</blockquote>
            <figcaption className="mt-3 text-small text-asphalt">{tony.quote.source}</figcaption>
            <p className="mt-10 border-t border-ink pt-4 text-small">
              <span className="font-bold">{tony.aside.q}</span> {tony.aside.a}
            </p>
          </figure>
        </div>
      </section>

      <section aria-labelledby="press" className="border-t border-ink">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 py-24 md:grid-cols-[5fr_7fr] md:px-8 md:py-32">
          <h2 id="press" className="type-display">
            {tony.press.title}
          </h2>
          <ul className="divide-y divide-ink border-y border-ink">
            {tony.press.items.map((p) => (
              <li key={p.url}>
                <a href={p.url} className="group block py-5">
                  <span className="block text-small text-asphalt">{p.outlet}</span>
                  <span className="type-title mt-1 block underline decoration-1 underline-offset-4 group-hover:text-pants-deep group-hover:decoration-2">
                    {p.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
