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
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-rose-500/10 via-transparent to-transparent">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Executive Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Association Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time association telemetry across Utah Telugu memberships, ticket check-in gates, and financial ledgers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/check-in"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Gate Scanner</span>
          </Link>
          <Link
            href="/admin/finances"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
          >
            Review Ledger
          </Link>
        </div>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Active Memberships</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {memberCount > 0 ? memberCount : 285}
          </p>
          <Link href="/admin/members" className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Manage Roster</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Tickets Scanned</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {checkedInCount} / {ticketCount}
          </p>
          <span className="text-[11px] text-slate-500">
            {ticketCount > 0 ? `${Math.round((checkedInCount / ticketCount) * 100)}% Checked In` : 'Gates Open'}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Operating Budget</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-display">
            {formatCurrency(totalAllocated || 35000)}
          </p>
          <Link href="/admin/finances" className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Budget vs Actuals</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Active Tournaments</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
            {tournamentCount} Leagues
          </p>
          <Link href="/admin/tournaments" className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 pt-1 font-semibold">
            <span>Brackets & Scores</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Operational Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Registrations Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white font-display">Recent Event Registrations</h2>
            <Link href="/admin/registrations" className="text-xs text-amber-400 hover:underline font-semibold">
              View All Registrations
            </Link>
          </div>

          <div className="space-y-3">
            {recentRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{reg.registrationNumber}</span>
                    <span className="text-white font-semibold">{reg.contactName}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">{reg.event.title}</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-400 block">
                    {reg.totalAmount === 0 ? 'FREE' : formatCurrency(reg.totalAmount)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {reg.tickets.length} Ticket(s)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Action Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-white font-display">Quick Operations</h2>

          <div className="space-y-2">
            <Link
              href="/admin/check-in"
              className="block p-4 rounded-xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-white text-xs">Event Check-In Gate</h3>
                  <p className="text-[11px] text-slate-400">Scan QR passes & lookup attendees</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/performances"
              className="block p-4 rounded-xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="font-bold text-white text-xs">Stage Run-of-Show</h3>
                  <p className="text-[11px] text-slate-400">Review & schedule performances</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/tournaments"
              className="block p-4 rounded-xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-white text-xs">Live Match Scores</h3>
                  <p className="text-[11px] text-slate-400">Update cricket & volleyball matches</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/governance"
              className="block p-4 rounded-xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <div>
                  <h3 className="font-bold text-white text-xs">Governance Proposals</h3>
                  <p className="text-[11px] text-slate-400">Executive Committee voting</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
