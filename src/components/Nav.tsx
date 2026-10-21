'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/content/site';
import { Wordmark } from './Wordmark';

type Item = { href: string; label: string };

function NavLink({ item, active }: { item: Item; active: boolean }) {
  const external = item.href.startsWith('mailto:') || item.href.startsWith('http');
  const cls = `relative py-2 text-small font-semibold [font-variation-settings:'wdth'_112] after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:bg-pants after:transition-transform after:duration-150 after:ease-[var(--ease-ui)] ${
    active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
  }`;
  return external ? (
    <a href={item.href} className={cls}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={cls} aria-current={active ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}

export function Nav() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the phone menu whenever the route changes.
  useEffect(() => {
    menu.current?.close();
  }, [path]);

  const all: Item[] = [...nav.left, ...nav.right];

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-4 py-2 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-150 ${
          solid || path !== '/' ? 'border-b border-ink bg-concrete' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[var(--container-content)] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-8">
          <nav aria-label="Primary" className="hidden gap-8 md:flex">
            {nav.left.map((i) => (
              <NavLink key={i.href} item={i} active={path === i.href || path.startsWith(`${i.href}/`)} />
            ))}
          </nav>
          <Link href="/" aria-label="TONY Skate Club, home" className="col-start-2">
            <span className="hidden md:block"><Wordmark size="md" /></span>
            <span className="md:hidden"><Wordmark size="sm" /></span>
          </Link>
          <nav aria-label="Secondary" className="hidden justify-end gap-8 md:flex">
            {nav.right.map((i) => (
              <NavLink key={i.href} item={i} active={path === i.href || path.startsWith(`${i.href}/`)} />
            ))}
          </nav>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            className="col-start-3 justify-self-end py-2 text-small font-semibold [font-variation-settings:'wdth'_112] md:hidden"
            aria-haspopup="dialog"
          >
            Menu
          </button>
        </div>
      </header>

      <dialog
        ref={menu}
        aria-label="Menu"
        className="on-pants m-0 h-dvh max-h-none w-screen max-w-none bg-pants p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-4 pb-8">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
            <Link href="/" aria-label="TONY Skate Club, home" className="col-start-2" onClick={() => menu.current?.close()}>
              <Wordmark size="sm" />
            </Link>
            <button
              type="button"
              onClick={() => menu.current?.close()}
              className="col-start-3 justify-self-end py-2 text-small font-semibold [font-variation-settings:'wdth'_112]"
            >
              Close
            </button>
          </div>
          <nav aria-label="Menu" className="mt-10 flex flex-col gap-2">
            <Link href="/" className="type-display" onClick={() => menu.current?.close()}>
              Home
            </Link>
            {all.map((i) =>
              i.href.startsWith('mailto:') ? (
                <a key={i.href} href={i.href} className="type-display">
                  {i.label}
                </a>
              ) : (
                <Link key={i.href} href={i.href} className="type-display" onClick={() => menu.current?.close()}>
                  {i.label}
                </Link>
              ),
            )}
          </nav>
          <p className="mt-auto text-small">
            <a href={site.instagram.url} className="link">
              Instagram {site.instagram.handle}
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
