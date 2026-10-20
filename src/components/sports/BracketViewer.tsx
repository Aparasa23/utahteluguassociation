'use client';

import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';

interface BracketMatch {
  id: string;
  matchNumber: number;
  team1: { name: string; score?: string; isWinner?: boolean };
  team2: { name: string; score?: string; isWinner?: boolean };
  status: string;
}

interface BracketRound {
  roundName: string;
  roundNumber: number;
  matches: BracketMatch[];
}

interface BracketViewerProps {
  tournamentTitle: string;
  rounds: BracketRound[];
}

export function BracketViewer({ tournamentTitle, rounds }: BracketViewerProps) {
  return (
    <div className="w-full overflow-x-auto p-4 sm:p-6 bg-slate-950/70 rounded-2xl border border-white/10 shadow-xl scrollbar-thin">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-bold text-white font-display">
          Championship Playoff Bracket — {tournamentTitle}
        </h3>
      </div>

      <div className="flex items-start gap-8 min-w-[700px] justify-between">
        {rounds.map((round, rIdx) => (
          <div key={rIdx} className="flex-1 space-y-4">
            <div className="text-center pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {round.roundName}
              </span>
            </div>

            <div className="flex flex-col justify-around gap-6 h-full pt-4">
              {round.matches.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-white/10 bg-slate-900/90 p-3 shadow-lg hover:border-amber-400/40 transition-colors space-y-1.5"
                >
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>Match #{m.matchNumber}</span>
                    <span className="text-emerald-400">{m.status}</span>
                  </div>

                  {/* Team 1 */}
                  <div
                    className={`flex items-center justify-between p-1.5 rounded ${
                      m.team1.isWinner ? 'bg-amber-500/10 text-amber-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-xs truncate max-w-[140px]">{m.team1.name}</span>
                    <span className="text-xs font-mono">{m.team1.score || '—'}</span>
                  </div>

                  {/* Team 2 */}
                  <div
                    className={`flex items-center justify-between p-1.5 rounded ${
                      m.team2.isWinner ? 'bg-amber-500/10 text-amber-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-xs truncate max-w-[140px]">{m.team2.name}</span>
                    <span className="text-xs font-mono">{m.team2.score || '—'}</span>
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
