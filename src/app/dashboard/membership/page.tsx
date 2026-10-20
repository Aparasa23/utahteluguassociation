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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c140e] font-display">
            Membership Plan & Standing
          </h1>
          <p className="text-xs text-[#705544] mt-0.5">
            Details of your active Utah Telugu Association enrollment and benefits.
          </p>
        </div>

        <Link
          href="/membership/renew"
          className="btn-magnetic px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Renew for 2027–2028</span>
        </Link>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
          <div>
            <span className="text-xs text-[#705544] uppercase font-semibold">Enrolled Plan</span>
            <h2 className="text-xl font-bold text-[#1c140e] font-display">
              {activeMembership?.plan.name || 'Family Annual Membership'}
            </h2>
            <p className="text-xs text-amber-800 font-mono mt-0.5">
              {memberProfile?.membershipNumber}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#705544] uppercase font-semibold">Annual Fee</span>
            <p className="text-2xl font-extrabold text-[#1c140e]">
              {formatCurrency(activeMembership?.plan.price || 50)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5a483a]">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Start Date</span>
            <p className="font-bold text-[#1c140e]">
              {activeMembership?.startDate ? formatUtahDate(activeMembership.startDate, 'short') : 'Jan 1, 2026'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Renewal Due Date</span>
            <p className="font-bold text-amber-800">
              {activeMembership?.endDate ? formatUtahDate(activeMembership.endDate, 'short') : 'Jan 1, 2027'}
            </p>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-[#1c140e] text-sm">Included Plan Privileges</h3>
          <div className="space-y-2">
            {activeMembership?.plan.benefits.map((b) => (
              <div key={b.id} className="flex items-start gap-2.5 text-xs text-[#5a483a]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1c140e]">{b.title}:</strong> {b.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
