import Image from 'next/image';
import { Ladder } from './Ladder';
import { photo } from '@/content/photos';

/* The hero. PLACEHOLDER (2026-10-21): one still while the hero direction is decided. Eris rejected
   the "French Class" loop ("wrong video for the Nike sponsor vibe"). Next: either a stop-motion cut
   of the skate stills, or real street footage from Tony. The type treatment stays: the ladder steps
   in once on load, four beats at 200 ms, then holds. DESIGN.md "Signature". */
export function Hero({ label }: { label: string }) {
  const still = photo('fisheye-poles');
  return (
    <section aria-label={label} className="relative h-svh min-h-[560px] overflow-hidden bg-fin">
      <Image src={still.src} alt="" fill preload sizes="100vw" placeholder="blur" blurDataURL={still.blur} className="object-cover" />

      {/* Scrim so the ink type and nav hold on the pale footage. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-concrete/40 via-transparent to-concrete/30" />

      {/* The ladder: the stacked word from Tony's mockup, set live. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center text-ink">
        <div className="w-[min(88vw,118svh)] [container-type:inline-size] md:w-[min(70vw,118svh)]">
          <Ladder words={['Tony', 'Tony', 'Tony', 'Tony']} fit={26} className="ladder-in" />
        </div>
      </div>

      {/* Rails: SKATE CLUB up both edges. */}
      {(['left', 'right'] as const).map((side) => (
        <p
          key={side}
          aria-hidden
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[clamp(1.4rem,4.5vw,2.6rem)] leading-none text-ink [writing-mode:vertical-rl] ${
            side === 'left' ? 'left-3 rotate-180 md:left-8' : 'right-3 md:right-8'
          }`}
        >
          <span className="type-brand">Skate</span> <span className="type-rail-thin">Club</span>
        </p>
      ))}

      {/* Scroll cue. */}
      <span aria-hidden className="absolute bottom-0 left-1/2 h-[12svh] w-px bg-ink" />
    </section>
  );
}
