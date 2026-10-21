import Link from 'next/link';
import { Burst } from '@/components/Burst';
import { Split } from '@/components/Split';
import { ClubField } from '@/components/ClubField';
import { VideoRoom } from '@/components/VideoRoom';
import { ContactSheet } from '@/components/ContactSheet';
import { club, edits, home } from '@/content/site';
import { photo } from '@/content/photos';

const SHEET = [
  'dome-air', 'studio-reach', 'mountain-road', 'western-wheat', 'canopy-roll', 'studio-jump',
  'handplant', 'moto-field', 'spine-air', 'studio-tank', 'palms-grind', 'horse',
] as const;

export default function Home() {
  return (
    <>
      <Burst label={home.heroLabel} />
      <Split
        halves={[
          { ...home.split.club, photo: photo('fisheye-poles'), ground: 'pants' },
          { ...home.split.tony, photo: photo('studio-hand'), ground: 'fin' },
        ]}
      />
      <VideoRoom
        title={home.edits.title}
        edits={edits.slice(0, 3)}
        footer={
          <p className="mt-10">
            <Link href="/edits" className="link">
              {home.edits.link}
            </Link>
          </p>
        }
      />
      <section aria-labelledby="sheet" className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-36">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 id="sheet" className="type-display">
            {home.sheet.title}
          </h2>
          <p className="text-asphalt">{home.sheet.body}</p>
        </div>
        <ContactSheet photos={SHEET.map(photo)} />
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
