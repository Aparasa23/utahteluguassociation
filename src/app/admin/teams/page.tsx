import React from 'react';
import { prisma } from '@/lib/prisma';
import { Trophy, Users } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTeamsPage() {
  const teams = await prisma.team.findMany({
    include: {
      tournament: true,
      division: true,
      members: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Sports Teams & Player Rosters
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {teams.length} registered teams across all tournament divisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((t) => (
          <div key={t.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                  {t.tournament.title}
                </span>
                <h3 className="font-bold text-white text-base mt-0.5">{t.teamName}</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-500/10 text-emerald-400">
                {t.status}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Captain: <strong className="text-white">{t.captainName}</strong> ({t.captainEmail})
            </p>

            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Roster ({t.members.length} players)</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {t.members.map((m) => (
                  <span key={m.id} className="text-[11px] px-2 py-0.5 rounded bg-black/40 text-slate-300">
                    {m.fullName} {m.isCaptain ? '(C)' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
