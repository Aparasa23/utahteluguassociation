import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function MemberPlanDetailsPage() {
  const memberProfile = await prisma.memberProfile.findFirst({
    where: { membershipNumber: 'UTA-2026-F0892' },
    include: {
      memberships: {
        include: {
          plan: {
            include: { benefits: true },
          },
        },
        take: 1,
      },
    },
  });

  const activeMembership = memberProfile?.memberships[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Membership Plan & Standing
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Details of your active Utah Telugu Association enrollment and benefits.
          </p>
        </div>

        <Link
          href="/membership/renew"
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Renew for 2027–2028</span>
        </Link>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs text-slate-400 uppercase">Enrolled Plan</span>
            <h2 className="text-xl font-bold text-white font-display">
              {activeMembership?.plan.name || 'Family Annual Membership'}
            </h2>
            <p className="text-xs text-amber-400 font-mono mt-0.5">
              {memberProfile?.membershipNumber}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase">Annual Fee</span>
            <p className="text-2xl font-extrabold text-white">
              {formatCurrency(activeMembership?.plan.price || 50)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Start Date</span>
            <p className="font-bold text-white">
              {activeMembership?.startDate ? formatUtahDate(activeMembership.startDate, 'short') : 'Jan 1, 2026'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Renewal Due Date</span>
            <p className="font-bold text-amber-400">
              {activeMembership?.endDate ? formatUtahDate(activeMembership.endDate, 'short') : 'Jan 1, 2027'}
            </p>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-white text-sm">Included Plan Privileges</h3>
          <div className="space-y-2">
            {activeMembership?.plan.benefits.map((b) => (
              <div key={b.id} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{b.title}:</strong> {b.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
