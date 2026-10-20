import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Calendar, MapPin, Users, Ticket, ArrowLeft, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, formatUtahDate } from '@/lib/utils';
import { EventRegistrationClientWrapper } from './EventRegistrationClientWrapper';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} — Utah Telugu Association`,
    description: event.description.substring(0, 160),
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      venue: true,
      organizers: true,
      ticketTypes: true,
    },
  });

  if (!event) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Hero Event Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={
              event.coverImageUrl ||
              'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'
            }
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
              {event.category.label}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Event Details & Ticketing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Description, Schedule & Organizers */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white font-display">About This Celebration</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Logistics Summary */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Event Timing & Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] block">Start Time</span>
                <span className="font-bold text-white">{formatUtahDate(event.startDateTime, 'long')}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] block">End Time</span>
                <span className="font-bold text-white">{formatUtahDate(event.endDateTime, 'time')}</span>
              </div>
            </div>

            {event.venue && (
              <div className="p-4 rounded-xl bg-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{event.venue.name}</span>
                </div>
                <p className="text-slate-400">{event.venue.address}, {event.venue.city}, {event.venue.state} {event.venue.zipCode}</p>
                {event.venue.mapUrl && (
                  <a
                    href={event.venue.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:underline pt-1 text-xs"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Event Organizers */}
          {event.organizers.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Event Coordinators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.organizers.map((org) => (
                  <div key={org.id} className="p-3 rounded-xl bg-white/5 text-xs space-y-0.5">
                    <p className="font-bold text-white">{org.name}</p>
                    <p className="text-amber-400">{org.roleTitle}</p>
                    {org.email && <p className="text-slate-400">{org.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Ticketing & Registration Box */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-400/30 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Admission Passes
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-0.5">
                Reserve Your Tickets
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Active UTA member families enjoy 100% complimentary admission.
              </p>
            </div>

            {/* Ticket Tier Breakdown */}
            <div className="space-y-3">
              {event.ticketTypes.map((type) => (
                <div key={type.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{type.name}</span>
                    <span className="text-[11px] text-slate-400">
                      {type.remainingQuantity} remaining
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-amber-400">
                    {type.price === 0 ? 'FREE (Member)' : formatCurrency(type.price)}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Registration Trigger Button */}
            <EventRegistrationClientWrapper
              eventSlug={event.slug}
              eventTitle={event.title}
              ticketTypes={event.ticketTypes}
            />

            <div className="pt-2 text-[11px] text-slate-400 text-center leading-relaxed">
              Admission includes traditional festival feast, stage seating, and kids activities. Non-transferable.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
