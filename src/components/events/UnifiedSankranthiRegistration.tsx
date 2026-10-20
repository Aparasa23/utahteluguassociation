'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowDown,
  Eye,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  ReferenceRegistrationModal,
  FESTIVAL_EVENTS,
} from './cinematic/ReferenceRegistrationModal';

// Dynamically import Three.js Celestial Canvas to guarantee pure client mounting
const ReferenceCelestialCanvas = dynamic(
  () =>
    import('./cinematic/ReferenceCelestialCanvas').then(
      (mod) => mod.ReferenceCelestialCanvas
    ),
  { ssr: false }
);

interface UnifiedSankranthiRegistrationProps {
  initialEventKey?: 'all' | 'rangoli' | 'pickleball' | 'volleyball' | 'grand_festival';
}

export function UnifiedSankranthiRegistration({
  initialEventKey = 'all',
}: UnifiedSankranthiRegistrationProps) {
  // Modal Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventKey, setSelectedEventKey] = useState<string>('rangoli');
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [hoveredEventKey, setHoveredEventKey] = useState<string | null>(null);

  // If page was loaded with a specific event key, open that event modal automatically
  useEffect(() => {
    if (initialEventKey && initialEventKey !== 'all' && FESTIVAL_EVENTS[initialEventKey]) {
      setSelectedEventKey(initialEventKey);
      setIsModalOpen(true);
    }
  }, [initialEventKey]);

  const handleOpenEvent = (eventKey: string) => {
    setSelectedEventKey(eventKey);
    setIsModalOpen(true);
  };

  return (
    <div
      className="relative min-h-screen text-[#fff5dc] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-primary)] overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 1. THREE.JS CELESTIAL STAGE (Concentric Golden Toruses + 850 Embers + 4 Floating Crystals) */}
      <ReferenceCelestialCanvas hoveredEventKey={hoveredEventKey} />

      {/* 2. FESTIVAL BREADCRUMB & CONTEXT SUB-BAR */}
      <div className="relative z-20 border-b border-[var(--accent-gold)]/20 bg-[#061820]/80 backdrop-blur-md px-4 sm:px-8 lg:px-16 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb linking back to main site pages */}
          <div className="flex items-center gap-2 text-white/70">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1 font-medium">
              <span>UTA Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/events" className="hover:text-[var(--accent-gold)] transition-colors font-medium">
              Events
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
              <span>Sankranthi 2027 Registration Hub</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-gold)]/15 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] font-mono">
                Official
              </span>
            </span>
          </div>

          {/* Quick Actions & Navigation anchors */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowFlyerModal(true)}
              className="text-xs text-white bg-white/5 border border-white/20 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] rounded-full px-3.5 py-1.5 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Official Flyer</span>
            </button>
            <a
              href="#registrations"
              className="text-xs text-[var(--bg-primary)] bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-light)] hover:brightness-110 rounded-full px-4 py-1.5 transition-all font-bold shadow-md shadow-[var(--accent-gold)]/15 flex items-center gap-1"
            >
              <span>Explore 4 Tracks ↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <main className="relative z-10">
        <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-20 relative">
          <div className="tracking-[0.28em] text-[var(--accent-gold-light)] text-xs font-bold uppercase mb-4 animate-fadeIn">
            Utah Telugu Association presents
          </div>

          <h1
            className="font-extrabold text-5xl sm:text-7xl lg:text-[110px] leading-[0.98] my-4 font-serif text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(110deg, #fff6d9, #ffc35e 60%, #fff3cd)',
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: '0 18px 90px rgba(231, 160, 74, 0.25)',
            }}
          >
            Sankranthi
            <br />
            Celebrations
          </h1>

          <p className="text-base sm:text-xl font-telugu text-[var(--accent-gold-light)] font-bold mt-2">
            సంక్రాంతి సంబరాలు 2027 • క్రీడలు • రంగోలి • సాంస్కృతిక మహోత్సవం
          </p>

          <p className="max-w-[660px] text-base sm:text-lg text-[#f6e5cb] font-light leading-relaxed mt-4">
            A weekend of sports, culture & celebration. Three competitions and one grand festival feast. An unforgettable community experience for all Telugu families in Utah.
          </p>

          {/* Action Button & Flyer Link */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#registrations"
              className="border border-[#f4c377] text-[#1a170f] bg-[var(--accent-gold)] hover:bg-[#e5a747] rounded-full px-7 py-3.5 font-bold text-sm transition-transform hover:scale-105 shadow-[0_0_30px_rgba(244,187,89,0.35)] flex items-center gap-2"
            >
              <span>Explore & Register</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setShowFlyerModal(true)}
              className="border border-white/30 hover:border-[var(--accent-gold)] text-white hover:text-[var(--accent-gold)] rounded-full px-6 py-3.5 font-medium text-sm transition-colors flex items-center gap-2 bg-white/5 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Official Event Flyer</span>
            </button>
          </div>

          <div className="mt-16 text-xs tracking-[0.16em] text-[#e9cda5] font-mono animate-bounce">
            SCROLL TO DISCOVER ↓
          </div>
        </section>

        {/* 4. EVENT PORTAL SECTION (The 4 Experience Cards) */}
        <section
          id="registrations"
          className="min-h-screen flex flex-col items-center justify-center px-6 py-20 scroll-mt-10"
        >
          <div className="tracking-[0.28em] text-[var(--accent-gold-light)] text-xs font-bold uppercase">
            January 15–17 & 23, 2027 · Salt Lake County & Herriman, Utah
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white my-3 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Choose Your Experience
          </h2>

          <p className="text-[#e7d5b8] text-center max-w-[650px] leading-relaxed text-sm sm:text-base">
            Four events, one registration destination. Select an event below to open its dedicated registration form, verify member benefits, and generate your official pass.
          </p>

          {/* The 4 3D-Tilting Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1280px] mt-12 [perspective:1200px]">
            {/* Card 1: Rangoli (Red Accent) */}
            <div
              onClick={() => handleOpenEvent('rangoli')}
              onMouseEnter={() => setHoveredEventKey('rangoli')}
              onMouseLeave={() => setHoveredEventKey(null)}
              className="group relative min-h-[410px] rounded-[25px] border border-[#f7d39a]/40 p-7 flex flex-col justify-between cursor-pointer text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)] hover:border-[var(--accent-gold)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]"
              style={{
                background: 'linear-gradient(150deg, rgba(33, 76, 72, 0.91), rgba(9, 34, 44, 0.91))',
              }}
            >
              {/* Radial Accent Flare */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, #e34e5b, transparent 68%)',
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="text-xs font-mono tracking-[0.17em] text-[#f7d4a0]">
                  01 / FRIDAY · JAN 15
                </div>
                <div className="text-7xl text-center py-2 transition-transform duration-500 group-hover:scale-115 group-hover:-rotate-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                  🎨
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold font-serif text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Rangoli
                    <br />
                    Competition
                  </h3>
                  <div className="text-xs font-telugu text-[var(--accent-gold-light)] font-bold">ముగ్గుల పోటీలు</div>
                  <p className="text-xs text-[#e2e2d8] leading-relaxed mt-2">
                    Celebrate creativity, color and tradition at Sri Ganesha Hindu Temple Hall.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#34d399] font-bold">FREE for Members</span>
                <span className="font-bold text-[var(--accent-gold-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Register now ↗
                </span>
              </div>
            </div>

            {/* Card 2: Pickleball (Green Accent) */}
            <div
              onClick={() => handleOpenEvent('pickleball')}
              onMouseEnter={() => setHoveredEventKey('pickleball')}
              onMouseLeave={() => setHoveredEventKey(null)}
              className="group relative min-h-[410px] rounded-[25px] border border-[#f7d39a]/40 p-7 flex flex-col justify-between cursor-pointer text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)] hover:border-[var(--accent-gold)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]"
              style={{
                background: 'linear-gradient(150deg, rgba(33, 76, 72, 0.91), rgba(9, 34, 44, 0.91))',
              }}
            >
              {/* Radial Accent Flare */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, #56b87a, transparent 68%)',
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="text-xs font-mono tracking-[0.17em] text-[#f7d4a0]">
                  02 / SATURDAY · JAN 16
                </div>
                <div className="text-7xl text-center py-2 transition-transform duration-500 group-hover:scale-115 group-hover:-rotate-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                  🏓
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold font-serif text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    DPL Pickleball
                    <br />
                    League
                  </h3>
                  <div className="text-xs font-telugu text-[var(--accent-gold-light)] font-bold">పికిల్‌బాల్ లీగ్</div>
                  <p className="text-xs text-[#e2e2d8] leading-relaxed mt-2">
                    Find your partner and take on the league at Salt Lake Tennis & Health Club.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#34d399] font-bold">50% Member Discount</span>
                <span className="font-bold text-[var(--accent-gold-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Register now ↗
                </span>
              </div>
            </div>

            {/* Card 3: Volleyball (Blue Accent) */}
            <div
              onClick={() => handleOpenEvent('volleyball')}
              onMouseEnter={() => setHoveredEventKey('volleyball')}
              onMouseLeave={() => setHoveredEventKey(null)}
              className="group relative min-h-[410px] rounded-[25px] border border-[#f7d39a]/40 p-7 flex flex-col justify-between cursor-pointer text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)] hover:border-[var(--accent-gold)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]"
              style={{
                background: 'linear-gradient(150deg, rgba(33, 76, 72, 0.91), rgba(9, 34, 44, 0.91))',
              }}
            >
              {/* Radial Accent Flare */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, #3a96ee, transparent 68%)',
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="text-xs font-mono tracking-[0.17em] text-[#f7d4a0]">
                  03 / SUNDAY · JAN 17
                </div>
                <div className="text-7xl text-center py-2 transition-transform duration-500 group-hover:scale-115 group-hover:-rotate-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                  🏐
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold font-serif text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Walkers Volleyball
                    <br />
                    League
                  </h3>
                  <div className="text-xs font-telugu text-[var(--accent-gold-light)] font-bold">వాలీబాల్ ఛాంపియన్‌షిప్</div>
                  <p className="text-xs text-[#e2e2d8] leading-relaxed mt-2">
                    Bring your team and play for the community title at Mountain Sports Center.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#34d399] font-bold">Captain Fee Waived</span>
                <span className="font-bold text-[var(--accent-gold-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Register now ↗
                </span>
              </div>
            </div>

            {/* Card 4: Grand Festival & Feast (Gold Accent) */}
            <div
              onClick={() => handleOpenEvent('grand_festival')}
              onMouseEnter={() => setHoveredEventKey('grand_festival')}
              onMouseLeave={() => setHoveredEventKey(null)}
              className="group relative min-h-[410px] rounded-[25px] border border-[#f7d39a]/40 p-7 flex flex-col justify-between cursor-pointer text-left overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)] hover:border-[var(--accent-gold)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.7)]"
              style={{
                background: 'linear-gradient(150deg, rgba(33, 76, 72, 0.91), rgba(9, 34, 44, 0.91))',
              }}
            >
              {/* Radial Accent Flare */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, var(--accent-gold), transparent 68%)',
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="text-xs font-mono tracking-[0.17em] text-[#f7d4a0]">
                  04 / SATURDAY · JAN 23
                </div>
                <div className="text-7xl text-center py-2 transition-transform duration-500 group-hover:scale-115 group-hover:-rotate-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                  🌾
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold font-serif text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Grand Cultural
                    <br />
                    Celebrations & Feast
                  </h3>
                  <div className="text-xs font-telugu text-[var(--accent-gold-light)] font-bold">సంక్రాంతి సంబరాలు & విందు</div>
                  <p className="text-xs text-[#e2e2d8] leading-relaxed mt-2">
                    Traditional Andhra Bhojanam, cultural stage, kids activities & awards at Herriman High.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#34d399] font-bold">100% Free VIP Pass</span>
                <span className="font-bold text-[var(--accent-gold-light)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Register now ↗
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CULTURAL FEATURE */}
        <section className="px-6 py-20 text-center bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
          <div className="tracking-[0.28em] text-[var(--accent-gold-light)] text-xs font-bold uppercase mb-2">
            And the celebration continues
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold font-serif text-white mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sankranthi Cultural Celebrations 2027
          </h2>
          <p className="text-[#e6d6be] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Saturday, January 23, 2027 · Cultural performances, festive feast & community festivities.
          </p>
          <p className="text-xs text-[var(--accent-gold-light)] mt-2 font-telugu font-bold">
            Organized and hosted by Utah Telugu Association in collaboration with DPL & Walkers
          </p>

          {/* Seamless site exploration links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-[var(--accent-gold)] text-xs font-semibold text-white/90 hover:text-[var(--accent-gold)] transition-all bg-white/5"
            >
              ← Return to UTA Home
            </Link>
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-[var(--accent-gold)] text-xs font-semibold text-white/90 hover:text-[var(--accent-gold)] transition-all bg-white/5"
            >
              All Association Events
            </Link>
            <Link
              href="/membership/join"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-light)] text-[var(--bg-primary)] text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-[var(--accent-gold)]/20"
            >
              Enroll / Verify Family Pass
            </Link>
          </div>
        </section>
      </main>

      {/* 6. REGISTRATION DIALOG MODAL (Reference-Styled) */}
      <ReferenceRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedEventKey={selectedEventKey}
        onSelectEventKey={setSelectedEventKey}
      />

      {/* 7. OFFICIAL FLYER ZOOM MODAL */}
      {showFlyerModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowFlyerModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-[92vh] w-full rounded-2xl overflow-hidden border border-[var(--accent-gold)]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFlyerModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/images/events/sankranthi-2027-flyer.jpg"
              alt="Official Sankranthi 2027 Flyer"
              className="w-full h-auto object-contain max-h-[85vh] mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
