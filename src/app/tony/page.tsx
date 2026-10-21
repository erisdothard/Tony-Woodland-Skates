import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactSheet } from '@/components/ContactSheet';
import { FactList } from '@/components/FactList';
import { site, tony } from '@/content/site';
import { photo, photoSet } from '@/content/photos';

export const metadata: Metadata = { title: 'Tony', description: tony.lead };

export default function TonyPage() {
  const portrait = photo('studio-tank');
  const skateShot = photo('rb-mural-wallride');
  return (
    <>
      <section className="bg-fin">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 pt-28 pb-16 md:grid-cols-[7fr_5fr] md:items-end md:px-8 md:pt-36 md:pb-24">
          <div>
            <h1 className="type-display">{tony.title}</h1>
            <p className="measure mt-8 text-title font-medium [font-variation-settings:'wdth'_105]">{tony.lead}</p>
          </div>
          <div className="relative aspect-[2/3] w-full">
            <Image src={portrait.src} alt={portrait.alt} fill preload sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" blurDataURL={portrait.blur} className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-label="About Tony" className="mx-auto grid max-w-[var(--container-content)] gap-12 px-4 py-24 md:grid-cols-[7fr_5fr] md:px-8 md:py-36">
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
      </section>

      <section aria-labelledby="skate" className="border-t border-ink">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-12 px-4 py-24 md:grid-cols-[5fr_7fr] md:px-8 md:py-36">
          <div>
            <h2 id="skate" className="type-brand text-[clamp(3.5rem,10vw,8rem)]">
              {tony.skate.title}
            </h2>
            <FactList items={tony.skate.facts} className="mt-10" />
            <p className="mt-8">
              <Link href="/edits" className="link font-semibold">
                {tony.skate.link}
              </Link>
            </p>
            <div className="mt-10 border-t border-ink pt-6">
              <h3 className="type-title">{tony.film.title}</h3>
              <p className="measure mt-2 text-asphalt">{tony.film.body}</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full">
            <Image src={skateShot.src} alt={skateShot.alt} fill sizes="(min-width: 768px) 55vw, 100vw" placeholder="blur" blurDataURL={skateShot.blur} className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="model" className="border-t border-ink">
        <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-36">
          <div className="mb-12 grid gap-8 md:grid-cols-[5fr_7fr] md:items-end">
            <h2 id="model" className="type-brand text-[clamp(3.5rem,10vw,8rem)]">
              {tony.model.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="measure">{tony.model.body}</p>
                <a href={`mailto:${site.email}`} className="btn mt-6">
                  {tony.model.cta}
                </a>
              </div>
              <figure className="w-[9.5rem]">
                <video
                  className="aspect-[9/16] w-full bg-fin object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={tony.model.reel.poster}
                  src={tony.model.reel.src}
                  aria-label={tony.model.reel.caption}
                />
                <figcaption className="mt-2 text-small text-asphalt">{tony.model.reel.caption}</figcaption>
              </figure>
            </div>
          </div>
          <ContactSheet photos={photoSet('model')} />
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
