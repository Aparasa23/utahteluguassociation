import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Calendar, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function MemberRegistrationsPage() {
  const registrations = await prisma.eventRegistration.findMany({
    where: { contactEmail: 'member@utahtelugu.org' },
    include: {
      event: true,
      attendees: true,
      tickets: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c140e] font-display">
            Event Registrations History
          </h1>
          <p className="text-xs text-[#705544] mt-0.5">
            Confirmed and historical event bookings under your membership account.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {reg.registrationNumber}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 uppercase">
                  {reg.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1c140e]">{reg.event.title}</h3>
              <p className="text-xs text-[#5a483a]">
                {reg.attendees.length} Attendee(s): {reg.attendees.map((a) => a.fullName).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-800 block">
                  {reg.totalAmount === 0 ? 'FREE (Member)' : formatCurrency(reg.totalAmount)}
                </span>
                <span className="text-[10px] text-[#8c7664]">
                  {formatUtahDate(reg.createdAt, 'short')}
                </span>
              </div>

              <Link
                href="/dashboard/tickets"
                className="btn-magnetic px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs"
              >
                View Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
