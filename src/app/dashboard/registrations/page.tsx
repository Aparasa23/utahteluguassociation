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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Event Registrations History
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Confirmed and historical event bookings under your membership account.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {reg.registrationNumber}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                  {reg.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{reg.event.title}</h3>
              <p className="text-xs text-slate-400">
                {reg.attendees.length} Attendee(s): {reg.attendees.map((a) => a.fullName).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">
                  {reg.totalAmount === 0 ? 'FREE (Member)' : formatCurrency(reg.totalAmount)}
                </span>
                <span className="text-[10px] text-slate-500">
                  {formatUtahDate(reg.createdAt, 'short')}
                </span>
              </div>

              <Link
                href="/dashboard/tickets"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
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
