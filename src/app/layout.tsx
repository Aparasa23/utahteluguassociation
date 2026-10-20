import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import CursorSpotlight from '@/components/layout/CursorSpotlight';

export const metadata: Metadata = {
  title: 'Utah Telugu Association (UTA) — Digital Universe',
  description:
    'Rooted in Culture. Connected in Utah. Official community platform of the Utah Telugu Association featuring immersive 3D cultural destinations, family membership, event ticketing, sports tournaments, and community operations.',
  keywords: [
    'Utah Telugu Association',
    'UTA',
    'Telugu in Utah',
    'Salt Lake City Telugu',
    'Sankranthi 2027 Utah',
    'Ugadi Utah',
    'Utah Telugu Cricket',
  ],
  authors: [{ name: 'Utah Telugu Association Executive Committee' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#040714',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#040714] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
        {/* Active Theory Style Film Grain Noise Overlay */}
        <div className="film-grain-overlay" aria-hidden="true" />

        {/* Lusion Style Multi-Layered Cosmic Aurora Ambient Background */}
        <div className="lusion-ambient-background bg-muggulu-geometry" aria-hidden="true">
          <div className="aurora-orb-1" />
          <div className="aurora-orb-2" />
          <div className="aurora-orb-3" />
        </div>

        {/* Interactive Luminescent Cursor Light Aura */}
        <CursorSpotlight />

        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
