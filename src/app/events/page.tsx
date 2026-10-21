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
    where: { isPublished: true, startDateTime: { gte: new Date() } },
    include: {
      category: true,
      venue: true,
      ticketTypes: true,
    },
    orderBy: { startDateTime: 'asc' },
  }).catch(() => []);

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
          Explore upcoming cultural celebrations in Utah. Membership benefits depend on the published rules for each event.
        </p>
      </div>

      <section className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#17303a] to-[#081720] p-8 sm:p-10 text-white">
        <p className="text-xs tracking-widest uppercase font-bold text-amber-300">Upcoming community celebration</p>
        <h2 className="text-3xl sm:text-5xl font-serif mt-4">Sankranthi 2027</h2>
        <p className="max-w-2xl text-slate-200 mt-4 leading-relaxed">Explore Muggu & Rangoli, Pickleball, Volleyball, and our cultural celebration in one place. Exact dates, pricing, and venue details will be published after UTA approval.</p>
        <Link href="/events/sankranthi-2027" className="inline-flex mt-6 gap-2 items-center rounded-full px-6 py-3 bg-amber-300 text-[#13242b] font-bold">Explore the family planner <ArrowRight size={17}/></Link>
        <p className="mt-4 text-sm text-slate-300">Online registration is not yet open.</p>
      </section>

      {/* Interactive Directory with KineticTabs */}
      <EventsDirectoryClient events={serializedEvents} />
    </div>
  );
}
