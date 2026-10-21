import { FactList } from './FactList';
import { site } from '@/content/site';

// The one orange field per page. Ink type only (DESIGN.md contrast table).
export function ClubField({
  title,
  body,
  facts,
  cta,
  children,
}: {
  title: string;
  body?: string;
  facts: readonly { term: string; detail: string }[];
  cta: string;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="club-field" className="on-pants bg-pants text-ink">
      <div className="mx-auto grid max-w-[var(--container-content)] gap-12 px-4 py-24 md:grid-cols-[5fr_7fr] md:px-8 md:py-36">
        <div>
          <h2 id="club-field" className="type-display">
            {title}
          </h2>
          {body && <p className="measure mt-6">{body}</p>}
          <a href={site.instagram.url} className="btn mt-10">
            {cta}
          </a>
          <p className="mt-3 text-small">{site.instagram.handle} on Instagram</p>
        </div>
        <div>
          <FactList items={facts} />
          {children}
        </div>
      </div>
    </section>
  );
}
