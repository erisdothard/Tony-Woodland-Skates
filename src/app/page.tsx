import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Split } from '@/components/Split';
import { ClubField } from '@/components/ClubField';
import { ClipReel } from '@/components/ClipReel';
import { ContactSheet } from '@/components/ContactSheet';
import { club, home } from '@/content/site';
import { clips } from '@/content/clips';
import { photo } from '@/content/photos';
import { moment } from '@/content/moments';

// Mostly skating (8 of 12), then four shoot days. Portrait frames only, for the even 4:5 grid.
const SHEET = [
  'garage-perch', 'dome-air', 'headphones-ramp', 'fragrance-close',
  'ledge-grind', 'garage-ledge', 'mountain-road-4', 'western-wheat',
  'handplant', 'pool-air', 'garage-wall', 'night-hat',
] as const;

export default function Home() {
  return (
    <>
      <Hero label={home.heroLabel} />
      <Split
        halves={[
          { ...home.split.club, photo: photo('rb-garage'), ground: 'pants' },
          { ...home.split.tony, photo: photo('studio-hand'), moment: moment('tony-smile'), ground: 'fin' },
        ]}
      />
      <ClipReel title={home.edits.title} clips={clips} link={{ href: '/edits', label: home.edits.link }} />
      <section aria-labelledby="sheet" className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-36">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="sheet" className="type-display">
            {home.sheet.title}
          </h2>
          <p className="text-asphalt">{home.sheet.body}</p>
        </div>
        <ContactSheet grid photos={SHEET.map(photo)} />
      </section>
      <ClubField title={home.club.title} body={home.club.body} facts={club.facts} cta={club.cta}>
        <p className="mt-8">
          <Link href="/club" className="link font-semibold">
            {home.split.club.link}
          </Link>
        </p>
      </ClubField>
    </>
  );
}
