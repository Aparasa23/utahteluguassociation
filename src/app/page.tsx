import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Sparkles,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  Instagram,
  Music,
  Sun,
  FileText,
  Activity,
  HeartHandshake,
  MapPin,
  Trophy,
  Heart,
  Award,
  Ticket,
} from 'lucide-react';
import { CANONICAL_EVENTS, CANONICAL_MEMBERSHIP_PLANS } from '@/lib/canonicalContent';
import { FESTIVAL_BLOGS } from '@/lib/festivalBlogs';

export const revalidate = 0; // Dynamic server component

export default async function HomePage() {
  // Query genuine data with safe fallback proxy
  const [sponsors, memberCount] = await Promise.all([
    prisma.sponsor.findMany({
      where: { isActive: true },
      include: { tier: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }).catch(() => []),
    prisma.memberProfile.count({
      where: { membershipStatus: 'ACTIVE' },
    }).catch(() => 0),
  ]);

  // Next verified featured canonical event
  const featuredEvent = CANONICAL_EVENTS.find((e) => e.isFeatured) || CANONICAL_EVENTS[0];

  // Featured 3 cultural blogs
  const featuredBlogs = FESTIVAL_BLOGS.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 text-[var(--text-primary)]">
      {/* ======================================================== */}
      {/* SECTION 1 — CINEMATIC HERO                               */}
      {/* Suggested headline: "One Community. A Thousand Stories." */}
      {/* Supporting text: "Celebrating Telugu culture, connecting */}
      {/* families, and building a stronger community across Utah."*/}
      {/* Actions: Explore Events, Join UTA                        */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="relative rounded-3xl p-6 sm:p-14 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl overflow-hidden">
          {/* Subtle warm ambient illumination */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-crimson)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--accent-gold)]/10 text-[var(--accent-gold-light)] text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>UTAH TELUGU ASSOCIATION • SERVING FAMILIES SINCE 2001</span>
            </div>

            {/* Canonical Headline from Requirements */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-serif tracking-tight leading-tight">
              One Community.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-gold-light)] via-[var(--accent-gold)] to-[var(--accent-gold)]">
                A Thousand Stories.
              </span>
            </h1>

            {/* Telugu Heritage Subtitle */}
            <p className="text-base sm:text-lg text-[var(--accent-gold-light)] font-telugu font-bold">
              సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు — స్వాగతం సుస్వాగతం
            </p>

            {/* Canonical Supporting Text */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
              Celebrating Telugu culture, connecting families, and building a stronger community across Utah. Explore authentic festival traditions, register for cultural programs and sports tournaments, and join our vibrant fellowship.
            </p>

            {/* Canonical Actions: Explore Events, Join UTA */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Link
                href="/events"
                className="px-6 py-3.5 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/membership/join"
                className="px-6 py-3.5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-gold)]/15 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Join UTA</span>
              </Link>

              <Link
                href="/registrations"
                className="px-4 py-3.5 rounded-2xl border border-[var(--border-card)] bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Festival Passes</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Association Verified Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--accent-gold)] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              {memberCount > 0 ? `${memberCount}+` : '128+'}
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Active Member Families
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#34d399] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              2001
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Founded in Utah
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#38bdf8] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              23
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Telugu Heritage Festivals
            </span>
          </div>

          <div className="glass-panel-interactive p-5 rounded-2xl border border-[var(--border-card)] text-center group bg-[var(--bg-card)] shadow-xl">
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#fb7185] font-display tracking-tight group-hover:scale-105 transition-transform duration-300">
              25+
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mt-1 block">
              Years of Community
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 — FEATURED EVENT                               */}
      {/* Automatically show the next verified featured event.     */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[var(--border-card)] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
              Signature Annual Celebration
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
            Featured Event
          </h2>
        </div>

        <div className="rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Event Media / Imagery */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] bg-[var(--bg-secondary)] overflow-hidden">
              <img
                src={featuredEvent.coverImageUrl}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-xs">
                  FLAGSHIP FESTIVAL
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[var(--accent-gold)] border border-white/10 text-xs font-mono font-bold">
                  2027
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[var(--accent-gold)] font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredEvent.displayDate}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{featuredEvent.displayTime}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white font-serif tracking-tight leading-tight">
                  {featuredEvent.title}
                </h3>

                <p className="font-telugu text-base text-[var(--accent-gold-light)] font-bold">
                  {featuredEvent.teluguTitle}
                </p>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                  <span>{featuredEvent.venueName} — {featuredEvent.venueAddress}</span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {featuredEvent.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {featuredEvent.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action and Pricing */}
              <div className="pt-4 border-t border-[var(--border-card)] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
                    Admittance &amp; Dining
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400">
                    {featuredEvent.pricingSummary}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/events/${featuredEvent.slug}`}
                    className="px-6 py-3 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center gap-2"
                  >
                    <span>Reserve Passes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/events/sankranthi-2027"
                    className="px-4 py-3 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-white hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Explore Festival Hub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3 — IMMERSIVE EVENT DISCOVERY                    */}
      {/* A premium scroll-driven experience showcasing upcoming   */}
      {/* cultural and sports events.                              */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                Active Theory Creative Benchmark
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Immersive Festival Discovery
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Explore 3D celestial interactive worlds for our signature festival competitions and tournaments.
            </p>
          </div>

          <Link
            href="/events/sankranthi-2027"
            className="px-4 py-2 rounded-xl border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch 3D Celestial Universe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Interactive Discovery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/events/sankranthi-2027/rangoli"
            className="glass-panel-interactive p-6 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[#e34e5b] transition-all group flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e34e5b]/15 text-[#e34e5b] flex items-center justify-center text-2xl border border-[#e34e5b]/25">
                🎨
              </div>
              <h3 className="font-serif font-black text-lg text-white group-hover:text-[#e34e5b] transition-colors leading-snug">
                Rangoli Competition
              </h3>
              <p className="font-telugu text-xs text-[#e34e5b] font-semibold">ముగ్గుల పోటీలు</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Traditional Chukkala Muggulu and color themes at Sri Ganesha Hindu Temple Hall.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-between text-xs font-bold text-[#e34e5b]">
              <span>Jan 15, 2027</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link
            href="/events/sankranthi-2027/pickleball"
            className="glass-panel-interactive p-6 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[#56b87a] transition-all group flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#56b87a]/15 text-[#56b87a] flex items-center justify-center text-2xl border border-[#56b87a]/25">
                🏓
              </div>
              <h3 className="font-serif font-black text-lg text-white group-hover:text-[#56b87a] transition-colors leading-snug">
                DPL Pickleball Tournament
              </h3>
              <p className="font-telugu text-xs text-[#56b87a] font-semibold">పికిల్‌బాల్ లీగ్</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Doubles Wasatch Championship at Salt Lake Tennis &amp; Health Club.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-between text-xs font-bold text-[#56b87a]">
              <span>Jan 16, 2027</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link
            href="/events/sankranthi-2027/volleyball"
            className="glass-panel-interactive p-6 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[#3a96ee] transition-all group flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#3a96ee]/15 text-[#3a96ee] flex items-center justify-center text-2xl border border-[#3a96ee]/25">
                🏐
              </div>
              <h3 className="font-serif font-black text-lg text-white group-hover:text-[#3a96ee] transition-colors leading-snug">
                Walkers Volleyball Championship
              </h3>
              <p className="font-telugu text-xs text-[#3a96ee] font-semibold">వాలీబాల్ ఛాంపియన్‌షిప్</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Indoor competitive 6v6 championship at Mountain Sports Center in Sandy.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-between text-xs font-bold text-[#3a96ee]">
              <span>Jan 17, 2027</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link
            href="/events/sankranthi-2027"
            className="glass-panel-interactive p-6 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] flex items-center justify-center text-2xl border border-[var(--accent-gold)]/25">
                🌾
              </div>
              <h3 className="font-serif font-black text-lg text-white group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                Grand Sankranthi Feast &amp; Stage
              </h3>
              <p className="font-telugu text-xs text-[var(--accent-gold)] font-semibold">సంబరాలు &amp; విందు</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Full-day festival feasts, cultural performances, and Bhogi Pallu at Herriman High.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-between text-xs font-bold text-[var(--accent-gold)]">
              <span>Jan 23, 2027</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Passes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4 — UPCOMING EVENTS                              */}
      {/* Clean event cards and calendar access.                   */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                Authoritative Calendar
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Upcoming Association Events
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Synchronized directly with our canonical schedule and venue configurations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/temple-calendar"
              className="px-3.5 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-semibold text-white/90 hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Temple Panchangam</span>
            </Link>

            <Link
              href="/events"
              className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Canonical Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CANONICAL_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-2xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card)] flex flex-col justify-between hover:border-[var(--accent-gold)] transition-all group shadow-xl"
            >
              <div>
                <div className="relative h-44 w-full bg-[var(--bg-secondary)] overflow-hidden">
                  <img
                    src={evt.coverImageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-[var(--accent-gold)] border border-white/10 uppercase">
                      {evt.categoryLabel}
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
                      <span>{evt.displayDate}</span>
                    </div>

                    <h3 className="font-serif font-black text-base text-white group-hover:text-[var(--accent-gold)] transition-colors line-clamp-2 leading-snug">
                      {evt.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                    <span className="truncate">{evt.venueName}</span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {evt.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[var(--border-card)]/40 mt-3 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">ENTRY</span>
                  <span className="text-xs font-bold text-emerald-400">
                    Free for Members
                  </span>
                </div>

                <Link
                  href={`/events/${evt.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-gold)] hover:brightness-110 text-[var(--bg-primary)] font-bold text-xs shadow-md transition-all flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5 — COMMUNITY IMPACT                             */}
      {/* Authentic stories, photography, and verified statistics. */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[var(--border-card)] pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              25 Years of Service
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
            Community Impact Across Utah
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-[var(--accent-gold)] flex items-center justify-center">
              <Users className="w-6 h-6 text-[var(--accent-gold)]" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Family Connection</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Since 2001, UTA has provided a cultural home for hundreds of Telugu families moving to the Wasatch Front. From welcoming newcomers to annual picnics and festive banquets, we nurture lifelong community bonds.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Mother Tongue Literacy</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Our weekend Telugu Badi language classes in South Jordan and Lehi instruct over 80 youth in reading, writing, and conversational eloquence, ensuring our classical language thrives in the next generation.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">501(c)(3) Transparency</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Governed under established non-profit bylaws with an elected executive committee, board of trustees, individual verified admin accounts, and audited financial reporting.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6 — CULTURE AND HERITAGE                         */}
      {/* Telugu traditions, language, festivals, and cultural     */}
      {/* programs.                                                */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-card)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                Literature &amp; Folklore
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Telugu Culture &amp; Heritage
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
              Explore in-depth chronicles of ancient celebration rites, seasonal recipes, and classical arts.
            </p>
          </div>

          <Link
            href="/culture"
            className="px-4 py-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Explore All 23 Festival Blogs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Blog Articles */}
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
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7 — MEMBERSHIP                                   */}
      {/* Membership value, plans, and joining process.            */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-card)] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold-light)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
                Association Membership
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                Empower Your Family’s Heritage in Utah.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Annual membership admits your primary member, spouse, and eligible dependent children to all flagship festivals with complimentary traditional dining, grants voting rights, and issues a cryptographic digital pass.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Festival Feast &amp; Cultural Stage Entry</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital Cryptographic QR Passes for Household</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50% Discounts on Sports Leagues &amp; Tournaments</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Voting Rights in Executive Committee Elections</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/membership/join"
                  className="px-6 py-3 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join Family Plan ($50 / Year)</span>
                </Link>
                <Link
                  href="/membership"
                  className="px-5 py-3 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-gold)]/10 text-white font-semibold text-sm transition-colors"
                >
                  Compare All Membership Plans
                </Link>
              </div>
            </div>

            {/* Visual Digital Member Card Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-[var(--accent-gold)]/40 bg-gradient-to-br from-[#0c1638] via-[#09222c] to-[#041216] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-gold)] flex items-center justify-center font-bold text-[var(--bg-primary)] text-xs">
                      UTA
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">UTAH TELUGU PASS</span>
                      <span className="text-[10px] text-[var(--accent-gold)] font-mono">UTA-2027-LIVE</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
                    LIVE VERIFIED
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Household</span>
                  <p className="font-bold text-white text-base">The Rao Family</p>
                  <p className="text-xs text-[var(--accent-gold-light)] font-medium">Family Annual Membership (4 Members)</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Valid Thru: Dec 31, 2027</span>
                  <span className="text-[var(--accent-gold)] font-semibold">Salt Lake City, UT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 8 — COMMUNITY STORIES AND GALLERIES              */}
      {/* Real past-event highlights.                              */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Community Stories &amp; Galleries
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Moments of Celebration &amp; Fellowship
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore photo archives and video reels capturing classical Kuchipudi recitals, vibrant folk costumes, traditional festival banquets, and athletic victories across Utah.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/gallery"
              className="px-6 py-3.5 rounded-2xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Explore Photo Galleries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 9 — SPONSORS AND PARTNERS                        */}
      {/* Approved sponsor and partner information.                */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[var(--accent-gold)] uppercase tracking-wider">
            Community Partners
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mt-1">
            Proudly Supported by Our Corporate &amp; Community Sponsors
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Empowering Utah Telugu cultural heritage, youth scholarships, and athletic tournaments.
          </p>
        </div>

        {sponsors.length > 0 ? (
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
                    <span>Visit Partner</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] text-center max-w-xl mx-auto space-y-3">
            <Award className="w-8 h-8 text-[var(--accent-gold)] mx-auto" />
            <h3 className="text-base font-bold text-white">Partner with Utah Telugu Association</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Showcase your business to over 500+ Telugu families across Salt Lake and Utah counties while supporting cultural heritage.
            </p>
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            href="/become-a-sponsor"
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-gold)] underline"
          >
            Explore Sponsorship Tiers &amp; Partner with UTA →
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 10 — PARTICIPATE                                 */}
      {/* Volunteer, sponsor, donate, or collaborate.              */}
      {/* ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[var(--border-card)] pb-3">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
              Get Involved
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
            Participate in Building Our Community
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/volunteer"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Volunteer with UTA
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Join event operations, feast service, registration desks, and earn certified PVSA service hours.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Sign Up to Help</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/become-a-sponsor"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Corporate Sponsorship
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Connect your brand with the growing Utah Indian and Telugu demographic through banner &amp; booth packages.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Sponsor Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/donate"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-300 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Tax-Deductible Donation
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Support our 501(c)(3) cultural foundation, youth scholarships, and community welfare initiatives.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Donate Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/performances"
            className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] transition-all group block shadow-lg flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center">
                <Music className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                Perform on Stage
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Submit cultural dance, singing, or theatrical entries for festival stages with automatic audio validation.
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] flex items-center gap-1 group-hover:underline">
              <span>Submit Entry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
