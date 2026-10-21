// The stacked word ladder from Eris's mockup. Brand words only (TONY, SKATE, CLUB, LOST).
// Size it by the parent's width: the parent sets `container-type: inline-size`.
export function Ladder({
  words,
  className = '',
  fit = 28,
}: {
  words: readonly string[];
  className?: string;
  /** font-size in cqi; tune so the longest word spans the container. */
  fit?: number;
}) {
  return (
    <span aria-hidden className={`type-brand block text-center ${className}`} style={{ fontSize: `${fit}cqi` }}>
      {words.map((w, i) => (
        <span key={i} className="block whitespace-nowrap">
          {w}
        </span>
      ))}
    </span>
  );
}
