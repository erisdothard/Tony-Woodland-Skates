import { photo, photoSeries, type Photo, type PhotoKey } from './photos';
import { tony } from './site';

type Entry = { series: readonly string[]; cover: string; keys?: readonly string[] };

/** Every photo in one of Tony's books, in order: shoot by shoot, each shoot's lead frame first.
    An entry with `keys` lists its photos by hand instead of pulling a whole series. */
export function bookPhotos(book: keyof typeof tony.books): Photo[] {
  return (tony.books[book] as readonly Entry[]).flatMap((b) => {
    const cover = photo(b.cover as PhotoKey);
    const all = b.keys ? b.keys.map((k) => photo(k as PhotoKey)) : b.series.flatMap((s) => photoSeries(s));
    return [cover, ...all.filter((p) => p.key !== cover.key)];
  });
}
