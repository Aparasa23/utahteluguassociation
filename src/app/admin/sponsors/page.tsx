import React from 'react';
import { prisma } from '@/lib/prisma';
import { Award, ExternalLink, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminSponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({
    include: {
      tier: true,
      sponsorships: { include: { event: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Sponsors & Partnership Management
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Active corporate and community partner agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((sp) => (
          <div key={sp.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                {sp.tier.name}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">
                {sp.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-base">{sp.name}</h3>
              <p className="text-xs text-slate-400">Contact: {sp.contactPerson} ({sp.email})</p>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Associated Sponsorships</span>
              {sp.sponsorships.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs text-slate-300">
                  <span>{s.event?.title || 'General Festival Partner'}</span>
                  <span className="font-bold text-emerald-400">{formatCurrency(s.agreedAmount)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
