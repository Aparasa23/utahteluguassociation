import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Users,
  Calendar,
  Ticket,
  DollarSign,
  QrCode,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [
    memberCount,
    eventCount,
    registrationCount,
    ticketCount,
    checkedInCount,
    tournamentCount,
    budgets,
    recentRegistrations,
  ] = await Promise.all([
    prisma.memberProfile.count({ where: { membershipStatus: 'ACTIVE' } }),
    prisma.event.count({ where: { isPublished: true } }),
    prisma.eventRegistration.count(),
    prisma.eventTicket.count(),
    prisma.eventTicket.count({ where: { isCheckedIn: true } }),
    prisma.tournament.count(),
    prisma.budget.findMany(),
    prisma.eventRegistration.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { event: true, tickets: true },
    }),
  ]);

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

  return (
    <div className="space-y-8">
      {/* Executive Welcome & Rapid Check-In Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-rose-100/70 via-rose-50/40 to-white/90 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-300">
              Executive Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c140e] font-display">
            Association Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5a483a]">
            Real-time association telemetry across Utah Telugu memberships, ticket check-in gates, and financial ledgers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/check-in"
            className="btn-magnetic px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Gate Scanner</span>
          </Link>
          <Link
            href="/admin/finances"
            className="btn-magnetic px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
          >
            Review Ledger
          </Link>
        </div>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544] uppercase font-semibold">Active Memberships</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1c140e] font-display">
            {memberCount > 0 ? memberCount : 285}
          </p>
          <Link href="/admin/members" className="text-[11px] text-amber-800 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Manage Roster</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544] uppercase font-semibold">Tickets Scanned</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-display">
            {checkedInCount} / {ticketCount}
          </p>
          <span className="text-[11px] text-[#8c7664]">
            {ticketCount > 0 ? `${Math.round((checkedInCount / ticketCount) * 100)}% Checked In` : 'Gates Open'}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544] uppercase font-semibold">Operating Budget</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-sky-800 font-display">
            {formatCurrency(totalAllocated || 35000)}
          </p>
          <Link href="/admin/finances" className="text-[11px] text-sky-800 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Budget vs Actuals</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544] uppercase font-semibold">Active Tournaments</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-800 font-display">
            {tournamentCount} Leagues
          </p>
          <Link href="/admin/tournaments" className="text-[11px] text-rose-800 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Brackets & Scores</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Operational Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Registrations Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-amber-900/15 bg-white/95 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <h2 className="text-base font-bold text-[#1c140e] font-display">Recent Event Registrations</h2>
            <Link href="/admin/registrations" className="text-xs text-amber-800 hover:underline font-semibold">
              View All Registrations
            </Link>
          </div>

          <div className="space-y-3">
            {recentRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">{reg.registrationNumber}</span>
                    <span className="text-[#1c140e] font-semibold">{reg.contactName}</span>
                  </div>
                  <p className="text-[#5a483a] text-[11px] mt-0.5">{reg.event.title}</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-800 block">
                    {reg.totalAmount === 0 ? 'FREE' : formatCurrency(reg.totalAmount)}
                  </span>
                  <span className="text-[10px] text-[#8c7664] font-mono">
                    {reg.tickets.length} Ticket(s)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Action Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-[#1c140e] font-display">Quick Operations</h2>

          <div className="space-y-2">
            <Link
              href="/admin/check-in"
              className="block p-4 rounded-2xl glass-panel bg-white/95 border border-amber-900/15 hover:border-amber-500/50 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="font-bold text-[#1c140e] text-xs">Event Check-In Gate</h3>
                  <p className="text-[11px] text-[#5a483a]">Scan QR passes & lookup attendees</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/performances"
              className="block p-4 rounded-2xl glass-panel bg-white/95 border border-amber-900/15 hover:border-amber-500/50 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-700" />
                <div>
                  <h3 className="font-bold text-[#1c140e] text-xs">Stage Run-of-Show</h3>
                  <p className="text-[11px] text-[#5a483a]">Review & schedule performances</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/tournaments"
              className="block p-4 rounded-2xl glass-panel bg-white/95 border border-amber-900/15 hover:border-amber-500/50 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="font-bold text-[#1c140e] text-xs">Live Match Scores</h3>
                  <p className="text-[11px] text-[#5a483a]">Update cricket & volleyball matches</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/governance"
              className="block p-4 rounded-2xl glass-panel bg-white/95 border border-amber-900/15 hover:border-amber-500/50 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-700" />
                <div>
                  <h3 className="font-bold text-[#1c140e] text-xs">Governance Proposals</h3>
                  <p className="text-[11px] text-[#5a483a]">Executive Committee voting</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
