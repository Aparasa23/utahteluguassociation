import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

export const revalidate = 0;

export default async function AdminFamiliesPage() {
  const families = await prisma.family.findMany({
    include: {
      familyMembers: true,
      members: { include: { user: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Registered Family Units
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {families.length} registered household family units.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {families.map((fam) => (
          <div key={fam.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{fam.familyName}</h3>
              <span className="text-xs text-amber-400 font-mono">
                {fam.familyMembers.length} Members
              </span>
            </div>
            <div className="space-y-1 pt-1">
              {fam.familyMembers.map((m) => (
                <div key={m.id} className="text-xs text-slate-300 flex items-center justify-between bg-white/5 p-2 rounded-lg">
                  <span>{m.fullName}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{m.relationship}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
