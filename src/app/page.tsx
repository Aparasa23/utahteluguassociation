import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { UniverseCanvas } from '@/components/universe3d/UniverseCanvas';
import {
  Sparkles,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Clock,
  Award,
} from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0; // Dynamic server component

export default async function HomePage() {
  // Fetch real database records
  const [events, sponsors, memberCount, tournamentCount] = await Promise.all([
    prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDateTime: 'asc' },
      take: 3,
      include: {
        venue: true,
        category: true,
        ticketTypes: true,
      },
    }),
    prisma.sponsor.findMany({
      where: { isActive: true },
      include: { tier: true },
      take: 4,
    }),
    prisma.memberProfile.count({
      where: { membershipStatus: 'ACTIVE' },
    }),
    prisma.tournament.count(),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION: 3D LIVING TELUGU UNIVERSE */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Visual Brand Title Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>UTAH TELUGU ASSOCIATION OFFICIAL PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
            Rooted in Culture.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400">
              Connected in Utah.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200/90 font-medium">
            సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు — స్వాగతం సుస్వాగతం
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Welcome to the UTA Digital Universe. Immerse in our spatial 3D cultural destinations or manage your family membership, event ticketing, and sports tournaments through our accessible portal.
          </p>
        </div>

        {/* The 3D Universe Spatial Canvas */}
        <UniverseCanvas />

        {/* Quick Association Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="glass-panel p-4 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
              {memberCount > 0 ? `${memberCount}+` : '280+'}
            </span>
            <span className="text-xs text-slate-300">Active Telugu Families</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
              {events.length}+
            </span>
            <span className="text-xs text-slate-300">Annual Festivals & Events</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-sky-400 font-display">
              {tournamentCount > 0 ? tournamentCount : '4'}
            </span>
            <span className="text-xs text-slate-300">Sports Championships</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
              25+
            </span>
            <span className="text-xs text-slate-300">Years of Utah Heritage</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED UPCOMING EVENTS & FESTIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Community Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Featured Festivals & Championships
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Admission is complimentary for active UTA member families. Non-member passes available.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all group"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <img
                  src={
                    evt.coverImageUrl ||
                    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                  {evt.category.label}
                </span>
                {evt.membersOnly && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500/80 backdrop-blur-md text-white">
                    Members Only
                  </span>
                )}
              </div>

              {/* Event Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{formatUtahDate(evt.startDateTime, 'long')}</span>
                  </div>
                  {evt.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.venue.name}, {evt.venue.city}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">Admission</span>
                    <span className="text-xs font-bold text-emerald-400">
                      Free for Members
                    </span>
                  </div>
                  <Link
                    href={`/events/${evt.slug}`}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1"
                  >
                    <span>Details & Tickets</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MEMBERSHIP VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-400/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                Family Association Enrollment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Empower Your Family’s Heritage in the Beehive State.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Annual membership admits your primary member, spouse, and eligible children to all major Utah Telugu Association flagship festivals, supports weekend Telugu language classes for kids, and provides voting rights in executive governance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Festival Feast & Program Pass</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital Cryptographic QR Passes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Discounts on Cricket & Volleyball Leagues</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>General Body Meeting Voting Eligibility</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/membership/join"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join / Enroll Family ($50 / Year)</span>
                </Link>
                <Link
                  href="/membership/plans"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors"
                >
                  View All Membership Tiers
                </Link>
              </div>
            </div>

            {/* Visual Preview of Digital Member Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-amber-400/40 bg-gradient-to-br from-[#0c1638] to-[#070b1a] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                      UTA
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">UTAH TELUGU PASS</span>
                      <span className="text-[10px] text-amber-400 font-mono">UTA-2026-F0892</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-slate-400">Primary Holder</span>
                  <p className="font-bold text-white text-sm">Venkat & Priya Rao</p>
                  <p className="text-xs text-amber-300 font-medium">Family Annual Membership (4 Members)</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Valid Thru: Jan 1, 2027</span>
                  <span className="text-amber-400 font-semibold">Salt Lake City, UT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPONSOR RECOGNITION MARQUEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Community Patrons
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
            Proudly Supported by Our Corporate & Community Sponsors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Empowering Utah Telugu cultural heritage, youth scholarships, and athletic tournaments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {sponsors.map((sp) => (
            <div
              key={sp.id}
              className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 mb-3">
                  {sp.tier.name}
                </span>
                <h3 className="font-bold text-white text-sm">{sp.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{sp.contactPerson}</p>
              </div>

              {sp.websiteUrl && (
                <a
                  href={sp.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Visit Partner Website</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/become-a-sponsor"
            className="text-xs font-semibold text-slate-400 hover:text-amber-400 underline"
          >
            Explore Sponsorship Tiers & Partner with UTA →
          </Link>
        </div>
      </section>
    </div>
  );
}
