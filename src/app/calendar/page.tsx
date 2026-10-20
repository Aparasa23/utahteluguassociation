import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, Sun, Sparkles } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';
import { getTodayPanchangam } from '@/lib/panchangam';

export const revalidate = 0;

export const metadata = {
  title: 'Community & Temple Calendar — Utah Telugu Association',
  description: 'Annual calendar of festivals, cricket tournaments, language classes, cultural programs, and Vedic Panchangam.',
};

export default async function CalendarPage() {
  const [events, todayPanchangam] = await Promise.all([
    prisma.event.findMany({
      where: { isPublished: true },
      include: { venue: true, category: true },
      orderBy: { startDateTime: 'asc' },
    }),
    Promise.resolve(getTodayPanchangam()),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Association Schedule & Panchangam
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1c140e] font-display">
          2026–2027 Community & Temple Calendar
        </h1>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-lg mx-auto font-medium">
          Synchronized to Utah Mountain Time (America/Denver). Includes both flagship association festivals and Vedic temple events.
        </p>
      </div>

      {/* Temple Panchangam Spotlight Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-600/30 bg-gradient-to-r from-amber-100/70 via-amber-50/80 to-rose-50/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-600/15 text-amber-900 border border-amber-600/25">
            <Sun className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-amber-900 tracking-wider">Today's Vedic Panchangam</span>
            <h3 className="font-bold text-[#1c140e] text-base">
              {todayPanchangam.tithiTelugu} • {todayPanchangam.teluguDay.split('(')[0]}
            </h3>
            <p className="text-xs text-[#5a483a]">
              Sunrise: {todayPanchangam.sunrise} • Abhijit Muhurtham: {todayPanchangam.abhijitMuhurtham}
            </p>
          </div>
        </div>

        <Link
          href="/temple-calendar"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs btn-magnetic flex items-center gap-1.5 shadow whitespace-nowrap"
        >
          <span>View Full Temple Calendar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Upcoming Events List */}
      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-600/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600/10 text-amber-900 border border-amber-600/25 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {new Date(evt.startDateTime).toLocaleString('en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-black font-display text-[#1c140e]">
                  {new Date(evt.startDateTime).getDate()}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-600/10 text-amber-900 font-bold border border-amber-600/20 uppercase">
                    {evt.category.label}
                  </span>
                  <span className="text-xs text-[#786454]">
                    {formatUtahDate(evt.startDateTime, 'time')} – {formatUtahDate(evt.endDateTime, 'time')} MDT
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1c140e] hover:text-amber-800 transition-colors">
                  {evt.title}
                </h3>
                {evt.venue && (
                  <p className="text-xs text-[#5a483a] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-800" />
                    <span>{evt.venue.name}, {evt.venue.city}</span>
                  </p>
                )}
              </div>
            </div>

            <Link
              href={`/events/${evt.slug}`}
              className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-900/15 font-bold text-xs flex items-center gap-1.5 transition-colors self-end sm:self-center"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
