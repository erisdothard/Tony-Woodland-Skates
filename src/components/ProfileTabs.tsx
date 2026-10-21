import Link from 'next/link';
import { tony } from '@/content/site';

/* Model / Skate: Tony's two profiles. The active tab carries the orange underline, like the nav. */
export function ProfileTabs({ current }: { current: string }) {
  return (
    <nav aria-label="Tony's profiles" className="mt-10 flex gap-8">
      {tony.tabs.map((t) => {
        const active = t.href === current;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? 'page' : undefined}
            className={`type-title relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-pants after:transition-transform after:duration-150 ${
              active ? 'after:scale-x-100' : 'text-ink/60 after:scale-x-0 hover:text-ink hover:after:scale-x-100'
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
