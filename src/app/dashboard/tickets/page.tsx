import React from 'react';
import { prisma } from '@/lib/prisma';
import { Ticket, Calendar, MapPin, QrCode, CheckCircle2, Clock } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';
import { generateQRCodeDataUrl } from '@/lib/qr';

export const revalidate = 0;

export default async function MemberTicketsPage() {
  const tickets = await prisma.eventTicket.findMany({
    where: {
      registration: {
        contactEmail: 'member@utahtelugu.org',
      },
    },
    include: {
      ticketType: true,
      registration: {
        include: {
          event: {
            include: { venue: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Pre-generate QR data URLs for each ticket
  const ticketsWithQRs = await Promise.all(
    tickets.map(async (t) => {
      const qrPayload = JSON.stringify({
        id: t.ticketNumber,
        token: t.qrToken,
        attendee: t.attendeeName,
        event: t.registration.event.slug,
      });
      const qrUrl = await generateQRCodeDataUrl(qrPayload);
      return { ...t, qrUrl };
    })
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            My Event Admission Passes
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Present these digital tickets at venue entrance tables for barcode/QR scanning.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {tickets.length} Active Tickets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ticketsWithQRs.map((t) => (
          <div
            key={t.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {t.ticketType.name}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    t.isCheckedIn
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {t.isCheckedIn ? 'CHECKED IN' : 'READY TO SCAN'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {t.registration.event.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ticket Holder: <strong className="text-white">{t.attendeeName}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{formatUtahDate(t.registration.event.startDateTime, 'short')}</span>
                  </div>
                  {t.registration.event.venue && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{t.registration.event.venue.city}, UT</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 uppercase block">Ticket #</span>
                    <span className="font-mono text-xs font-bold text-amber-300">
                      {t.ticketNumber}
                    </span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-2xl shadow-lg border border-white/20">
                    <img src={t.qrUrl} alt="Ticket QR" className="w-28 h-28 block" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">Scan at Entrance</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500 text-center font-mono">
              Idempotent Verification Token: {t.qrToken.substring(0, 16)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
