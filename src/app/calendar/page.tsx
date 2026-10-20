import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export const metadata = {
  title: 'Community Calendar — Utah Telugu Association',
  description: 'Annual calendar of festivals, cricket tournaments, language classes, and cultural programs.',
};

export default async function CalendarPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    include: { venue: true, category: true },
    orderBy: { startDateTime: 'asc' },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Association Schedule
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          2026–2027 Community Calendar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          All timestamps synchronized to Utah Mountain Time (America/Denver).
        </p>
      </div>

      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-400/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {new Date(evt.startDateTime).toLocaleString('en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-black font-display text-white">
                  {new Date(evt.startDateTime).getDate()}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-amber-300 font-semibold uppercase">
                    {evt.category.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatUtahDate(evt.startDateTime, 'time')} – {formatUtahDate(evt.endDateTime, 'time')} MDT
                  </span>
                </div>
                <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                  <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                </h3>
                {evt.venue && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{evt.venue.name}, {evt.venue.city}</span>
                  </p>
                )}
              </div>
            </div>

            <Link
              href={`/events/${evt.slug}`}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors shrink-0"
            >
              View Event
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
