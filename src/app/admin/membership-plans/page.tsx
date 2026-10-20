import React from 'react';
import { prisma } from '@/lib/prisma';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminMembershipPlansPage() {
  const plans = await prisma.membershipPlan.findMany({
    include: { benefits: true, memberships: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Membership Plans & Pricing Rules
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configurable tiers, family size thresholds, and validity terms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">{p.code}</span>
              <span className="text-lg font-bold text-white">{formatCurrency(p.price)}</span>
            </div>
            <h3 className="font-bold text-white text-base">{p.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
            <div className="text-[11px] text-slate-300 space-y-1 pt-2 border-t border-white/5">
              <p>Max Family Members: <strong className="text-white">{p.maxFamilyMembers}</strong></p>
              <p>Duration: <strong className="text-white">{p.durationMonths} months</strong></p>
              <p>Active Enrolled Members: <strong className="text-emerald-400">{p.memberships.length}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
