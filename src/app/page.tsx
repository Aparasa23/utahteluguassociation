import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import {
  Sparkles,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  Volume2,
  Calendar,
  Instagram,
  Music,
  Sun,
  FileText,
  Activity,
  HeartHandshake,
  MapPin,
  Ticket,
} from 'lucide-react';
import { FESTIVAL_BLOGS } from '@/lib/festivalBlogs';
import { HomeAudioValidatorClient } from '@/components/home/HomeAudioValidatorClient';

export const revalidate = 0; // Dynamic server component

export default async function HomePage() {
  // Fetch real database records with graceful fallbacks
  const [events, sponsors, performancesCount, memberCount] = await Promise.all([
    prisma.event.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        venue: true,
        ticketTypes: true,
      },
      orderBy: { startDateTime: 'asc' },
      take: 4,
    }).catch(() => []),
    prisma.sponsor.findMany({
      where: { isActive: true },
      include: { tier: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }).catch(() => []),
    prisma.performance.count({
      where: { status: 'APPROVED' },
    }).catch(() => 16),
    prisma.memberProfile.count({
      where: { membershipStatus: 'ACTIVE' },
    }).catch(() => 280),
  ]);

  // Featured 3 rich heritage cultural blogs from festivalBlogs.ts
  const featuredBlogs = FESTIVAL_BLOGS.slice(0, 3);

  // Helper date formatters
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 text-[var(--text-primary)]">
      {/* ======================================================== */}
      {/* 1. WELCOME HERO: CULTURE, COMMUNITY & CELEBRATIONS       */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="relative rounded-3xl p-6 sm:p-12 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl overflow-hidden">
          {/* Subtle warm ambient illumination */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-crimson)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--accent-gold)]/10 text-[var(--accent-gold-light)] text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>UTAH TELUGU ASSOCIATION • SERVING FAMILIES SINCE 2001</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-serif tracking-tight leading-tight">
              Rooted in Culture.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-gold-light)] via-[var(--accent-gold)] to-[var(--accent-gold)]">
                Connected in Utah.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--accent-gold-light)] font-telugu font-bold">
              సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు — స్వాగతం సుస్వాగతం
            </p>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
              Welcome to the official community platform of the Utah Telugu Association. Explore authentic Telugu festival lore, check the Utah Temple Panchangam, submit event and stage registrations, and track real-time tournament scores.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/registrations"
                className="px-6 py-3.5 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>All Registration Forms</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/events"
                className="px-5 py-3.5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-gold)]/15 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Upcoming Festivals &amp; Events</span>
              </Link>

              <Link
                href="/temple-calendar"
                className="px-4 py-3.5 rounded-2xl border border-[var(--border-card)] bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Temple Calendar &amp; Panchangam</span>
              </Link>

              <Link
                href="/culture"
                className="px-4 py-3.5 rounded-2xl border border-[var(--border-card)] bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Telugu Cultural Blogs</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Association Impact Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--accent-gold)] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              {memberCount > 0 ? `${memberCount}+` : '280+'}
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Active Member Families
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#34d399] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              5:00 min
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Stage Audio Guardrail
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#38bdf8] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              23+
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Scholarly Festival Blogs
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#fb7185] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              25+
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Years of Utah Heritage
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. UPCOMING COMMUNITY FESTIVALS & CELEBRATIONS           */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                Association Calendar • Flagship Events
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Upcoming Utah Telugu Festivals
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Join fellow families across the Wasatch Front for traditional feasts, stage performances, and tournaments.
            </p>
          </div>

          <Link
            href="/events"
            className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View All Association Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-2xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between hover:border-[var(--accent-gold)] transition-all group shadow-xl"
            >
              <div>
                {/* Event Cover Image or Gradient fallback */}
                <div className="relative h-44 w-full bg-[var(--bg-secondary)] overflow-hidden">
                  {evt.coverImageUrl ? (
                    <img
                      src={evt.coverImageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c1638] via-[#070b1a] to-[#041216] flex items-center justify-center p-4">
                      <Sparkles className="w-10 h-10 text-[var(--accent-gold)]/40" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-[var(--accent-gold)] border border-white/10 uppercase">
                      {evt.category.label}
                    </span>
                    {evt.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--accent-gold)] text-[var(--bg-primary)] text-[10px] font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--accent-gold)] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatDate(evt.startDateTime)} • {formatTime(evt.startDateTime)}</span>
                    </div>

                    <h3 className="font-serif font-black text-base text-white group-hover:text-[var(--accent-gold)] transition-colors line-clamp-2 leading-snug">
                      {evt.title}
                    </h3>
                  </div>

                  {evt.venue && (
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                      <span className="truncate">{evt.venue.name}, {evt.venue.city}</span>
                    </div>
                  )}

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[var(--border-card)]/40 mt-3 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">ADMISSION</span>
                  <span className="text-xs font-bold text-emerald-400">
                    Free for Members
                  </span>
                </div>

                <Link
                  href={`/events/${evt.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-gold)] hover:brightness-110 text-[var(--bg-primary)] font-bold text-xs shadow-md transition-all flex items-center gap-1"
                >
                  <span>Details &amp; Passes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. REGISTRATIONS & PASSES HUB (CENTRALIZED SECTION)      */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                Registration Forms &amp; Passes
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Active Community Registrations
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Submit festival passes, stage performances, family memberships, and volunteer signups.
            </p>
          </div>

          <Link
            href="/registrations"
            className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View All Forms Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/events/sankranthi-2027/register"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[var(--accent-gold)] text-[var(--bg-primary)]">
                  FLAGSHIP
                </span>
                <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Sankranthi 2027 Passes
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                General admission, traditional grand feast, and Rangoli/Tournament entry passes.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Register Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/performances"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  STAGE SLOTS
                </span>
                <Music className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Stage Performance Entry
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Classical, folk, and youth dance registrations with automated MP3 audio duration audit.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Submit Performance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/membership/join"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  $50 / YEAR
                </span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Family Annual Membership
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Enroll your household for 2027. Includes complimentary festival passes and digital card.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Join Family Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/volunteer"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  PVSA HOURS
                </span>
                <HeartHandshake className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Volunteer Network Signup
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Support stage management, registration desk, and feast service with certified youth hours.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Volunteer Shifts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. MEMBERSHIP VALUE PROPOSITION & DIGITAL CARD PREVIEW   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card)] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold-light)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
                Family Association Enrollment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                Empower Your Family’s Heritage in the Beehive State.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Annual membership admits your primary member, spouse, and eligible children to all major Utah Telugu Association flagship festivals, supports weekend Telugu language classes for kids, and provides voting rights in executive governance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Festival Feast &amp; Program Pass</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital Cryptographic QR Passes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Discounts on Cricket &amp; Volleyball Leagues</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>General Body Meeting Voting Eligibility</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/membership/join"
                  className="px-6 py-3 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join / Enroll Family ($50 / Year)</span>
                </Link>
                <Link
                  href="/membership"
                  className="px-5 py-3 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-gold)]/10 text-white font-semibold text-sm transition-colors"
                >
                  View All Membership Tiers &amp; Benefits
                </Link>
              </div>
            </div>

            {/* Visual Preview of Digital Member Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-[var(--accent-gold)]/40 bg-gradient-to-br from-[#0c1638] via-[#09222c] to-[#041216] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-gold)] flex items-center justify-center font-bold text-[var(--bg-primary)] text-xs">
                      UTA
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">UTAH TELUGU PASS</span>
                      <span className="text-[10px] text-[var(--accent-gold)] font-mono">UTA-2027-F0892</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-slate-400">Primary Holder</span>
                  <p className="font-bold text-white text-sm">Venkat &amp; Priya Rao</p>
                  <p className="text-xs text-[var(--accent-gold-light)] font-medium">Family Annual Membership (4 Members)</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Valid Thru: Jan 1, 2028</span>
                  <span className="text-[var(--accent-gold)] font-semibold">Salt Lake City, UT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. LIVE EVENT SCORES & WINS TICKER                       */}
      {/* (Scores and wins displayed live as they play each event) */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-card)] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black font-serif text-white">Live Tournament Match Center &amp; Scores</h2>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase animate-pulse">
                    LIVE ARENA
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">Real-time scores, set tallies, and winner advancements for event competitions.</p>
              </div>
            </div>

            <Link
              href="/events/live-scores"
              className="text-xs font-bold text-[var(--accent-gold)] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View Full Live Scoreboard &amp; Brackets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Match Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--accent-gold)] font-bold">DPL PICKLEBALL • SEMIS</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">LIVE</span>
              </div>
              <div className="text-xs font-bold text-white flex justify-between">
                <span>Vikram &amp; Rajesh (SLC)</span>
                <span className="font-mono text-emerald-400">9</span>
              </div>
              <div className="text-xs font-bold text-white flex justify-between">
                <span>Karthik &amp; Manoj (Draper)</span>
                <span className="font-mono text-slate-400">7</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] pt-1 border-t border-white/10">Court 1 • Game 2 in progress</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--accent-gold)] font-bold">WALKERS VOLLEYBALL</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">LIVE</span>
              </div>
              <div className="text-xs font-bold text-white flex justify-between">
                <span>Wasatch Warriors</span>
                <span className="font-mono text-emerald-400">21</span>
              </div>
              <div className="text-xs font-bold text-white flex justify-between">
                <span>Deccan Smashers</span>
                <span className="font-mono text-slate-400">19</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] pt-1 border-t border-white/10">South Court A • 3rd Set Decider</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--accent-gold)] font-bold">TRADITIONAL RANGOLI</span>
                <span className="px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-bold">FINAL</span>
              </div>
              <div className="text-xs font-bold text-[var(--accent-gold)] flex justify-between">
                <span>Swathi &amp; Deepthi (Sandy)</span>
                <span className="font-mono">94 pts ★</span>
              </div>
              <div className="text-xs font-bold text-white/70 flex justify-between">
                <span>Lakshmi &amp; Haritha (Herriman)</span>
                <span className="font-mono">91 pts</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] pt-1 border-t border-white/10">Main Atrium • Winner Announced</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TEMPLE CALENDAR & VEDIC PANCHANGAM SPOTLIGHT          */}
      {/* (Organized in its own section, not on top banner)        */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>UTAH MOUNTAIN TIME VEDIC HORIZON</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white leading-tight">
              Utah Temple Calendar &amp; Vedic Panchangam
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Authentic daily Tithi, Nakshatram, Rahu Kalam, and festival schedules computed specifically for the Wasatch Mountain Time zone (Salt Lake City, South Jordan Sri Ganesha Temple, and Draper).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Sri Ganesha Temple</span>
                <span className="text-white font-semibold">South Jordan, UT</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Radha Krishna Temple</span>
                <span className="text-white font-semibold">Salt Lake City, UT</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Daily Muhurtham</span>
                <span className="text-[var(--accent-gold)] font-bold">Panchangam Engine</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/temple-calendar"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Sun className="w-4 h-4" />
              <span>Explore Temple Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. AUTOMATED PARTICIPANT AUDIO & BIO PROOFREADING        */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeAudioValidatorClient />
      </section>

      {/* ======================================================== */}
      {/* 8. CURATED TELUGU CULTURAL BLOGS                         */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">Heritage &amp; Folklore</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Telugu Cultural Blogs &amp; Chronicles
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Explore in-depth accounts of ancient celebration rites, endangered traditions, seasonal recipes, and Telugu literature.
            </p>
          </div>

          <Link
            href="/culture"
            className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Read All 23 Heritage Blogs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Blogs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/culture/festivals/${blog.slug}`}
              className="glass-panel-interactive rounded-2xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card)] shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--border-card)]">
                    {blog.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Clock className="w-3 h-3" />
                    {blog.readingTimeMinutes} min read
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-black text-base text-white group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="font-telugu text-xs text-[var(--accent-gold-light)] font-medium mt-1">
                    {blog.teluguTitle}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {blog.significance}
                </p>
              </div>

              <div className="p-4 border-t border-[var(--border-card)] flex items-center justify-between text-xs font-semibold text-[var(--accent-gold)] group-hover:underline">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. COMMUNITY MEMORIES & PHOTO GALLERY PREVIEW            */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Photo &amp; Video Memories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Utah Telugu Community Celebrations
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore photo archives and video reels capturing classical Kuchipudi recitals, vibrant folk costumes, traditional feasts, and youth achievements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/gallery"
              className="px-6 py-3.5 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Explore Gallery Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. SPONSOR RECOGNITION MARQUEE (COMMUNITY PATRONS)      */}
      {/* ======================================================== */}
      {sponsors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-[var(--accent-gold)] uppercase tracking-wider">
              Community Patrons
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mt-1">
              Proudly Supported by Our Corporate &amp; Community Sponsors
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Empowering Utah Telugu cultural heritage, youth scholarships, and athletic tournaments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors.map((sp) => (
              <div
                key={sp.id}
                className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between hover:border-[var(--accent-gold)] transition-colors"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-3 border border-[var(--border-card)]">
                    {sp.tier.name}
                  </span>
                  <h3 className="font-bold text-white text-sm">{sp.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{sp.contactPerson}</p>
                </div>

                {sp.websiteUrl && (
                  <a
                    href={sp.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs font-semibold text-[var(--accent-gold)] hover:underline flex items-center gap-1"
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
              className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-gold)] underline"
            >
              Explore Sponsorship Tiers &amp; Partner with UTA →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
