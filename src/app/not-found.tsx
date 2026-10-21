import Link from 'next/link';
import { Ladder } from '@/components/Ladder';
import { notFound } from '@/content/site';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-[var(--container-content)] flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
      <h1 className="sr-only">Page not found</h1>
      <div className="w-[min(90vw,40rem)] [container-type:inline-size]">
        <Ladder words={notFound.ladder} fit={27} />
      </div>
      <p className="measure mt-10">{notFound.body}</p>
      <Link href="/" className="btn mt-8">
        {notFound.link}
      </Link>
    </section>
  );
}
