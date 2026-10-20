import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import TeluguIntensiveBackground from '@/components/layout/TeluguIntensiveBackground';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';

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
  themeColor: '#071a20',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="sankranthi-sun">
      <body className="min-h-screen flex flex-col font-sans selection:bg-[var(--accent-gold)] selection:text-[var(--bg-primary)] relative">
        {/* Active Theory Style Film Grain Noise Overlay */}
        <div className="film-grain-overlay" aria-hidden="true" />

        {/* Intensive Telugu Heritage Background (Ashta-Dala Padmam Muggulu, Sacred Embers & Sandalwood Silk) */}
        <TeluguIntensiveBackground />

        {/* 10 Theme Switcher & Voting Drawer */}
        <ThemeSwitcher />

        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
