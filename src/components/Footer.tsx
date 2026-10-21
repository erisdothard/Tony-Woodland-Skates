import Link from 'next/link';
import { footer, site } from '@/content/site';
import { Ladder } from './Ladder';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="border-t border-ink bg-concrete">
      <div className="mx-auto max-w-[var(--container-content)] px-4 pt-16 pb-8 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr]">
          <div className="max-w-[26rem] [container-type:inline-size]">
            <Ladder words={footer.ladder} fit={21} className="text-left" />
          </div>
          <div className="grid grid-cols-2 gap-8 self-end sm:grid-cols-3">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <h2 className="type-title">{c.title}</h2>
                <ul className="mt-4 space-y-2 text-small">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith('/') ? (
                        <Link href={l.href} className="link">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="link">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-ink pt-6 text-small text-asphalt">
          <Wordmark size="sm" className="text-ink" />
          <p>
            © 2026 {site.name}. {site.city}.
          </p>
          <a href={footer.credit.href} className="link">
            {footer.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
