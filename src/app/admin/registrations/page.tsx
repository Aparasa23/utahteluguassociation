import React from 'react';
import { prisma } from '@/lib/prisma';
import { Layers, Search, CheckCircle2, Ticket } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.eventRegistration.findMany({
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
            Event Registrations & Orders
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Total bookings across all festivals: {registrations.length}
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Contact Buyer</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Attendees</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registrations.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {r.registrationNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">{r.contactName}</span>
                    <span className="text-[11px] text-slate-400">{r.contactEmail}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">{r.event.title}</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {r.attendees.length} ticket(s)
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {r.totalAmount === 0 ? 'FREE' : formatCurrency(r.totalAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {r.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {formatUtahDate(r.createdAt, 'short')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
