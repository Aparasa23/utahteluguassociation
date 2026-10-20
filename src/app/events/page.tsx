import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export const metadata = {
  title: 'Community Events & Festivals — Utah Telugu Association',
  description: 'Upcoming Utah Telugu Association cultural celebrations, sports leagues, youth camps, and community picnics.',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Association Calendar
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Events & Cultural Festivals
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          రాబోయే తెలుగు వేడుకలు & క్రీడా పోటీలు
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore upcoming cultural celebrations in Utah. All active UTA member families receive complimentary admissions.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all group"
          >
            {/* Event Media */}
            <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
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
              {evt.isFeatured && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                  Featured
                </span>
              )}
            </div>

            {/* Event Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-slate-300">
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

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Member Price</span>
                  <span className="text-xs font-bold text-emerald-400">FREE Admission</span>
                </div>
                <Link
                  href={`/events/${evt.slug}`}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Get Tickets</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
