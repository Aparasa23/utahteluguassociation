import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users, Plus, UserCheck, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function FamilyRosterPage() {
  const family = await prisma.family.findFirst({
    where: { familyName: 'The Rao Family' },
    include: { familyMembers: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c140e] font-display">
            Covered Family Roster
          </h1>
          <p className="text-xs text-[#705544] mt-0.5">
            Immediate household family members covered under your UTA Family Membership.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
          Capacity: {family?.familyMembers.length || 4} of 6 Members
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {family?.familyMembers.map((member) => (
          <div
            key={member.id}
            className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1c140e] text-sm">{member.fullName}</h3>
                <span className="text-xs text-[#5a483a]">
                  {member.relationship} {member.age ? `• Age ${member.age}` : ''}
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase">
              Eligible
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-900/10 text-xs text-[#5a483a] leading-relaxed">
        Family members registered here receive automatic complimentary admission to UTA Sankranthi, Ugadi, and picnic events when you reserve tickets online.
      </div>
    </div>
  );
}
