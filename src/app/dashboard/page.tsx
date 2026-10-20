import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DigitalPassCard } from '@/components/membership/DigitalPassCard';
import {
  Ticket,
  Calendar,
  Users,
  CreditCard,
  QrCode,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function DashboardOverviewPage() {
  const memberProfile = await prisma.memberProfile.findFirst({
    where: { membershipNumber: 'UTA-2026-F0892' },
    include: {
      user: true,
      family: {
        include: { familyMembers: true },
      },
      memberships: {
        include: { plan: true },
        take: 1,
      },
    },
  }).catch(() => null);

  const latestMembership = memberProfile?.memberships[0];

  // Fetch registered tickets for this demo user
  const tickets = await prisma.eventTicket.findMany({
    where: {
      registration: {
        contactEmail: 'member@utahtelugu.org',
      },
    },
    include: {
      ticketType: true,
      registration: {
        include: { event: true },
      },
    },
  }).catch(() => []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-amber-100/70 via-amber-50/40 to-white/90 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            Welcome to Your Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1c140e] font-display">
            Namaskaram, {memberProfile?.user.name || 'Venkat & Priya Rao'}!
          </h1>
          <p className="text-xs sm:text-sm text-[#5a483a]">
            Family Annual Membership is <strong className="text-emerald-800 font-bold">Active</strong> through January 1, 2027.
          </p>
        </div>

        <Link
          href="/dashboard/membership-card"
          className="btn-magnetic px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <QrCode className="w-4 h-4" />
          <span>Show Gate QR Pass</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544]">Registered Family</span>
          <p className="text-2xl font-bold text-[#1c140e] font-display">
            {memberProfile?.family?.familyMembers.length || 4} Members
          </p>
          <Link href="/dashboard/family" className="text-[11px] text-amber-800 font-semibold hover:underline block pt-1">
            Manage Roster →
          </Link>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544]">Active Event Tickets</span>
          <p className="text-2xl font-bold text-emerald-800 font-display">
            {tickets.length} Issued
          </p>
          <Link href="/dashboard/tickets" className="text-[11px] text-emerald-800 font-semibold hover:underline block pt-1">
            View QR Codes →
          </Link>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544]">Logged Service</span>
          <p className="text-2xl font-bold text-purple-800 font-display">16.5 Hours</p>
          <Link href="/dashboard/volunteering" className="text-[11px] text-purple-800 font-semibold hover:underline block pt-1">
            Volunteer Shifts →
          </Link>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-1">
          <span className="text-xs text-[#705544]">Membership ID</span>
          <p className="text-sm font-bold text-amber-900 font-mono pt-1">
            {memberProfile?.membershipNumber || 'UTA-2026-F0892'}
          </p>
          <span className="text-[10px] text-[#8c7664] block">Non-Profit 501(c)(3)</span>
        </div>
      </div>

      {/* Main Grid: Digital Pass & Upcoming Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pass Preview */}
        <div className="lg:col-span-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1c140e]">
            Digital Membership Pass
          </h2>
          <DigitalPassCard
            membershipNumber={memberProfile?.membershipNumber || 'UTA-2026-F0892'}
            memberName={memberProfile?.user.name || 'Venkat & Priya Rao'}
            familyName={memberProfile?.family?.familyName || 'The Rao Family'}
            planName={latestMembership?.plan.name || 'Family Annual Membership'}
            expiryDate="Jan 1, 2027"
            status={memberProfile?.membershipStatus || 'ACTIVE'}
            qrToken={latestMembership?.qrVerificationToken || 'UTA-VERIFY-7890-ABCD-9988'}
            familyMembers={memberProfile?.family?.familyMembers.map((m) => ({
              fullName: m.fullName,
              relationship: m.relationship,
              age: m.age || undefined,
            }))}
          />
        </div>

        {/* Right: Upcoming Festival Tickets */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1c140e]">
              Upcoming Event Passes
            </h2>
            <Link href="/dashboard/tickets" className="text-xs text-amber-800 hover:underline font-semibold">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="glass-panel p-4 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm flex items-center justify-between gap-4 hover:border-amber-500/50 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    {t.ticketType.name}
                  </span>
                  <h4 className="font-bold text-[#1c140e] text-sm">{t.registration.event.title}</h4>
                  <p className="text-xs text-[#5a483a]">Attendee: {t.attendeeName}</p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-[#1c140e] block">
                    {t.ticketNumber}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    {t.isCheckedIn ? 'CHECKED IN' : 'READY TO SCAN'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
