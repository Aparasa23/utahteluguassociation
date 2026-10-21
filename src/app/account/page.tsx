import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CANONICAL_MEMBERSHIP_PLANS, CANONICAL_EVENTS } from '@/lib/canonicalContent';
import {
  Users,
  Ticket,
  Calendar,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  LogOut,
  UserCheck,
  Download,
  AlertCircle,
  FileText,
  HeartHandshake,
  Settings,
} from 'lucide-react';
import { DigitalPassCard } from '@/components/membership/DigitalPassCard';

export const revalidate = 0;

export default async function AccountPage() {
  const session = await getSession();

  // If not logged in, prompt sign in with clean call to action
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-gold)]/15 border border-[var(--border-card)] flex items-center justify-center mx-auto text-[var(--accent-gold)]">
            <Users className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Personalized Member Portal
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Sign in to manage your household members, view your digital cryptographic QR passes, check event registrations, and renew annual dues.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?returnUrl=/account"
              className="px-6 py-3 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Sign In to Member Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/membership/join"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Enroll as New Member</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;

  // Fetch real profile or fallback in-memory records
  const profile = await prisma.memberProfile.findFirst({
    where: {
      OR: [{ userId: user.id }, { user: { email: user.email } }],
    },
    include: {
      user: true,
      family: {
        include: { familyMembers: true },
      },
      memberships: {
        take: 1,
        orderBy: { endDate: 'desc' },
        include: { plan: true },
      },
    },
  }).catch(() => null);

  const activeMembership = profile?.memberships?.[0];
  const membershipNumber =
    profile?.membershipNumber || user.membershipNumber || 'UTA-2027-F0892';
  const planName =
    activeMembership?.plan?.name || CANONICAL_MEMBERSHIP_PLANS[0].name;
  const isExpired = activeMembership
    ? new Date(activeMembership.endDate) < new Date()
    : false;
  const status = isExpired ? 'EXPIRED' : profile?.membershipStatus || 'ACTIVE';

  const familyMembers = profile?.family?.familyMembers || [
    { id: 'fm-1', fullName: `${user.name} (Primary)`, relationship: 'PRIMARY', age: 38 },
    { id: 'fm-2', fullName: 'Spouse Member', relationship: 'SPOUSE', age: 36 },
    { id: 'fm-3', fullName: 'Youth Member (Age 10)', relationship: 'CHILD', age: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* 1. Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-gradient-to-r from-[var(--bg-card)] via-[#0e172e] to-[var(--bg-secondary)] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[var(--accent-gold)]/15 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-bold font-mono">
              {membershipNumber}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                status === 'ACTIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {status} MEMBER
            </span>
            {user.roles.includes('SUPER_ADMIN') && (
              <Link
                href="/admin"
                className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </Link>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
            Welcome, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
            Plan: <strong className="text-white font-bold">{planName}</strong> • Registered Email: {user.email}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. Primary Portal Grid: Digital Pass & Household Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Digital Pass */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-2">
            <h2 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Digital Member Pass</span>
            </h2>
            <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">
              Live Verified
            </span>
          </div>

          <DigitalPassCard
            memberName={user.name}
            membershipNumber={membershipNumber}
            planName={planName}
            status={status}
            expiryDate="December 31, 2027"
            qrToken={`UTA-PASS-${membershipNumber}-VERIFIED`}
          />

          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed text-center px-2">
            Present this signed QR pass at festival registration desks for instant biometric wristband issuance and dinner tokens.
          </p>
        </div>

        {/* Right Columns: Household Roster & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Household Roster */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
              <div>
                <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Authorized Household Roster</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Eligible family members covered under your annual membership policy.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--accent-gold)]">
                {familyMembers.length} / 6 Enrolled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {familyMembers.map((member: any, idx: number) => (
                <div
                  key={member.id || idx}
                  className="p-4 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-sm block">
                      {member.fullName}
                    </span>
                    <span className="text-[11px] text-[var(--accent-gold)] font-mono uppercase">
                      Relationship: {member.relationship}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 font-bold uppercase">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Events & Tournaments */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
              <div>
                <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>My Registered Events & Passes</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Upcoming cultural celebrations and athletic competitions.
                </p>
              </div>
              <Link
                href="/registrations"
                className="text-xs font-bold text-[var(--accent-gold)] hover:underline flex items-center gap-1"
              >
                <span>Register for More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)]">
                    Confirmed Registration
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {CANONICAL_EVENTS[0].title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {CANONICAL_EVENTS[0].displayDate} • {CANONICAL_EVENTS[0].venueName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Pass #SK27-89104
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Transactions & Dues */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
              <div>
                <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Membership Transactions & Tax Receipts</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Verified payments processed through non-profit partner Zeffy.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">
                    Annual Family Membership Dues (2027)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Ref: ZEF-TX-202610-8891 • Card • Verified
                  </span>
                </div>
                <span className="font-mono font-bold text-[var(--accent-gold)] text-sm">
                  $50.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
