'use client';

import React, { useState } from 'react';
import { Ticket, Sparkles } from 'lucide-react';
import { EventRegistrationModal } from '@/components/events/EventRegistrationModal';

import Link from 'next/link';

interface Props {
  eventSlug: string;
  eventTitle: string;
  ticketTypes: any[];
}

export function EventRegistrationClientWrapper({
  eventSlug,
  eventTitle,
  ticketTypes,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  if (eventSlug.includes('sankranthi')) {
    return (
      <Link
        href="/events/sankranthi-2027/register"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
      >
        <Sparkles className="w-4 h-4 text-black" />
        <span>Register / Get Official Passes Now</span>
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
      >
        <Ticket className="w-4 h-4" />
        <span>Register / Get Tickets Now</span>
      </button>

      <EventRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventSlug={eventSlug}
        eventTitle={eventTitle}
        ticketTypes={ticketTypes}
      />
    </>
  );
}
