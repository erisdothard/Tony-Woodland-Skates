'use client';

import { useEffect, useRef } from 'react';
import type { Moment as MomentData } from '@/content/moments';

/* A living still: a few silent seconds of Tony that behave like a photograph. No controls, no play
   icon. The poster shows first; the clip loads and plays only while it is on screen, and pauses when
   it leaves. Under reduced motion it never plays, so the poster is the photograph. DESIGN.md "Moments". */
export function Moment({ moment, className = '' }: { moment: MomentData; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can be refused (low-power mode, data saver). The poster stays up, which is the
          // intended fallback, so the rejection needs no handling beyond not throwing.
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={moment.poster}
      role="img"
      aria-label={moment.alt}
      style={{ objectPosition: moment.focus }}
      className={`size-full object-cover ${className}`}
    >
      <source src={moment.src} type="video/mp4" />
    </video>
  );
}
