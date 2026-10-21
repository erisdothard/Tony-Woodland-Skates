import { Wheels } from './Wordmark';

// Term and detail pairs with the four-wheel mark as the bullet. Used on the orange field and on /tony.
export function FactList({ items, className = '' }: { items: readonly { term: string; detail: string }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-current border-y border-current ${className}`}>
      {items.map((f) => (
        <div key={f.term} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 md:grid-cols-[10rem_1fr]">
          <dt className="flex items-center gap-3 font-bold [font-variation-settings:'wdth'_112]">
            <Wheels className="text-[0.8rem]" />
            {f.term}
          </dt>
          <dd>{f.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
