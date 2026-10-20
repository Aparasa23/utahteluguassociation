import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Trophy, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTournamentsPage() {
  const tournaments = await prisma.tournament.findMany({
    include: {
      sport: true,
      teams: true,
      rounds: {
        include: {
          matches: {
            include: { team1: true, team2: true },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Sports Tournaments & Scoring Engine
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Administer cricket brackets, volleyball games, court assignments, and live score approvals.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {tournaments.map((t) => (
          <div key={t.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  {t.sport.label}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{t.title}</h2>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                {t.status}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase text-slate-400">Rounds & Active Matches</h3>
              {t.rounds.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-white/5 space-y-2">
                  <span className="text-xs font-bold text-white">{r.roundName}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {r.matches.map((m) => (
                      <div
                        key={m.id}
                        className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white">
                            {m.team1?.teamName || 'TBD'} vs {m.team2?.teamName || 'TBD'}
                          </span>
                          <p className="text-[11px] text-amber-400 font-mono mt-0.5">
                            {m.scoreTeam1 || '—'} / {m.scoreTeam2 || '—'}
                          </p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
