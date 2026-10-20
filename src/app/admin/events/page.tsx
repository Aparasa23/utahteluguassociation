import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Calendar, Plus, MapPin, Ticket, ArrowRight, Eye } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    include: {
      venue: true,
      category: true,
      ticketTypes: true,
      registrations: true,
    },
    orderBy: { startDateTime: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Event Management & Capacity
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dates, venues, capacity limits, and ticket tiers.
          </p>
        </div>

        <Link
          href="/events"
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
        >
          View Public Listings
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((evt) => {
          const totalTickets = evt.ticketTypes.reduce((acc, t) => acc + t.totalAvailable, 0);
          const remainingTickets = evt.ticketTypes.reduce((acc, t) => acc + t.remainingQuantity, 0);
          const soldTickets = totalTickets - remainingTickets;

          return (
            <div
              key={evt.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    {evt.category.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatUtahDate(evt.startDateTime, 'long')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{evt.title}</h3>
                {evt.venue && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.venue.name}, {evt.venue.city}</span>
                  </p>
                )}
              </div>

              {/* Capacity stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="text-[10px] uppercase text-slate-400 block">Sold / Claimed</span>
                  <span className="text-base font-bold text-emerald-400">
                    {soldTickets} / {totalTickets}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] uppercase text-slate-400 block">Orders</span>
                  <span className="text-base font-bold text-white">
                    {evt.registrations.length}
                  </span>
                </div>

                <Link
                  href={`/events/${evt.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
