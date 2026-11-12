import type { Metadata, Viewport } from 'next';
import { Unbounded } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import './globals.css';

// One family: Unbounded, Tony's brand font. Weight carries the voice (DESIGN.md "Type").
const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s. ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#eef2f5' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={unbounded.variable}>
      <body className="bg-concrete text-ink antialiased">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
