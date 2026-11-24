// next/image loader. Serves the files scripts/variants.mjs writes to public/v/<width>/ instead of
// Vercel's image optimizer. Widths match next.config.ts; the widest request gets the master.
const MASTER = 2000;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (width >= MASTER || !/^\/(photos|clips)\/.+\.jpg$/.test(src)) return src;
  return `/v/${width}${src}`;
}
