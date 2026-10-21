import { Ladder } from './Ladder';

/* The hero: real footage of Tony on his Rollerblade Twister XTs (10 s of his Rollerblade team part,
   looping, muted) with the brand set as live type over it. DESIGN.md "Signature".
   Phones: 9:16, full bleed. From md: the clip stands as a 9:16 poster column on concrete. The TONY
   ladder sits in white over the lower half of the footage, inside the column, so his face and torso
   stay clear of the type; SKATE CLUB rails hold the edges in ink. A 15% ink scrim, deepening to 55% at the bottom, keeps the white type
   legible on the clip's bright Capitol frames, and a concrete fade at the top keeps the ink nav legible
   over the dark boot. The ladder steps in once on load, four beats at 200 ms. */
export function Hero({ label }: { label: string }) {
  return (
    <section aria-label={label} className="relative h-svh min-h-[560px] overflow-hidden bg-concrete">
      {/* Footage. 9:16, encoded at the source's native 1080x1920 so no screen enlarges it. */}
      <div className="absolute inset-0 md:inset-x-auto md:left-1/2 md:aspect-[9/16] md:max-w-[640px] md:-translate-x-1/2">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/tony-v3-1080.jpg"
          aria-hidden
        >
          <source src="/hero/tony-v3-1080.mp4" type="video/mp4" />
        </video>
        {/* Scrims: ink for the white type, concrete at the top for the nav. */}
        <div aria-hidden className="absolute inset-0 bg-ink/15" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-b from-transparent to-ink/40" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-concrete/90 to-transparent" />
      </div>

      {/* The ladder, white, inside the footage and over its lower half, as in the mockup. Sized by the
          viewport height from md (inside the 9:16 column); by width on phones, with a gutter for the rails. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[16svh] text-white">
        <div className="w-[78vw] [container-type:inline-size] md:w-[min(50svh,460px)]">
          <Ladder words={['Tony', 'Tony', 'Tony', 'Tony']} fit={26} className="ladder-in" />
        </div>
      </div>

      {/* Rails: SKATE CLUB up both edges. White on footage (phones), ink on concrete (desktop). */}
      {(['left', 'right'] as const).map((side) => (
        <p
          key={side}
          aria-hidden
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[clamp(1.4rem,4.5vw,2.6rem)] leading-none text-white [writing-mode:vertical-rl] md:text-ink ${
            side === 'left' ? 'left-3 rotate-180 md:left-8' : 'right-3 md:right-8'
          }`}
        >
          <span className="type-brand">Skate</span> <span className="type-rail-thin">Club</span>
        </p>
      ))}

      {/* Scroll cue. */}
      <span aria-hidden className="absolute bottom-0 left-1/2 h-[12svh] w-px bg-white md:bg-ink" />
    </section>
  );
}
