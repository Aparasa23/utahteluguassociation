import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { EventsDirectoryClient } from '@/components/events/EventsDirectoryClient';

export const revalidate = 0;

export const metadata = {
  title: 'Community Events & Festivals — Utah Telugu Association',
  description: 'Upcoming Utah Telugu Association cultural celebrations, sports leagues, youth camps, and community picnics in Salt Lake City and Utah Valleys.',
};

export default async function EventsDirectoryPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    include: {
      category: true,
      venue: true,
      ticketTypes: true,
    },
    orderBy: { startDateTime: 'asc' },
  });

  const serializedEvents = events.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    coverImageUrl: e.coverImageUrl,
    startDateTime: e.startDateTime.toISOString(),
    endDateTime: e.endDateTime ? e.endDateTime.toISOString() : null,
    isFeatured: e.isFeatured,
    category: {
      id: e.category.id,
      name: e.category.name,
      label: e.category.label,
    },
    venue: e.venue
      ? {
          id: e.venue.id,
          name: e.venue.name,
          city: e.venue.city,
          state: e.venue.state,
        }
      : null,
    ticketTypes: e.ticketTypes.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
    })),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-[var(--text-primary)]">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4bb59]/15 border border-[var(--border-card)] text-[#ffd18a] text-xs font-bold tracking-wide uppercase">
          <span>Association Calendar • 501(c)(3)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          Events & Cultural Festivals
        </h1>
        <p className="text-base sm:text-lg font-telugu font-semibold text-[#ffcb75]">
          రాబోయే తెలుగు వేడుకలు & క్రీడా సమాఖ్య పోటీలు
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Explore upcoming cultural celebrations in Utah. All active UTA member families receive complimentary admissions.
        </p>
      </div>

      {/* Sankranthi 2027 Central Spotlight Hero */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-br from-[#071a20] via-[#0b242c] to-[#041216] text-[var(--text-primary)] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4bb59]/15 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JANUARY 15–23, 2027 • 4-DAY CELEBRATION</span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sankranthi Celebrations 2027
            </h2>
            <p className="text-xs sm:text-sm text-[#e6d6be] max-w-2xl leading-relaxed">
              Utah Telugu Association presents the premier festival weekend: Rangoli Competition, DPL Pickleball League, Walkers Volleyball League, and Grand Sankranthi Maha Utsavam. UTA Members receive 100% complimentary VIP admission.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/events/sankranthi-2027/register"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f4bb59] via-[#ffd18a] to-[#f4bb59] hover:brightness-110 text-[#071a20] font-black text-xs sm:text-sm shadow-lg shadow-[#f4bb59]/20 transition-all flex items-center gap-2"
              >
                <span>Register Passes &amp; Tournaments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/events/sankranthi-sambaralu-2027"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
              >
                View Festival Schedule Details
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#f4bb59]/40 group">
              <img
                src="/images/events/sankranthi-2027-flyer.jpg"
                alt="Sankranthi 2027 Official Flyer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Directory with KineticTabs */}
      <EventsDirectoryClient events={serializedEvents} />
    </div>
  );
}
