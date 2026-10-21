import { Ladder } from './Ladder';

/* The hero: real footage of Tony skating (a Razors Skate Co. clip, 12 s, looping, muted) with the
   brand set as live type over it. DESIGN.md "Signature".
   Phones: a 9:16 crop, full bleed. From md: the square clip stands as a poster column on concrete,
   the TONY ladder sits inside it in white, and SKATE CLUB rails hold the edges in ink. The ladder steps in once on load, four beats at 200 ms. */
export function Hero({ label }: { label: string }) {
  return (
    <section aria-label={label} className="relative h-svh min-h-[560px] overflow-hidden bg-concrete">
      {/* Footage. Native 640 px, so the column is capped to that and never upscaled past 1.4x. */}
      <div className="absolute inset-0 md:inset-y-0 md:left-1/2 md:w-[min(100svh,860px)] md:-translate-x-1/2">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/ledge-pt.jpg"
          aria-hidden
        >
          <source src="/hero/ledge-sq.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/hero/ledge-pt.mp4" type="video/mp4" />
        </video>
      </div>

      {/* The ladder, white, inside the footage, as in the mockup. Sized by the viewport height from md
          so four lines take about 55% of the screen; by width on phones. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
        <div className="w-[88vw] [container-type:inline-size] md:w-[min(62svh,520px)]">
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
