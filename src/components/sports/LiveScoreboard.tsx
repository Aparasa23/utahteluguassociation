'use client';

import React, { useState } from 'react';
import { Trophy, Activity, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface Match {
  id: string;
  roundName: string;
  matchNumber: number;
  courtOrPitch?: string | null;
  scheduledTime?: string | null;
  status: string; // LIVE, SCHEDULED, COMPLETED
  team1Name: string;
  team2Name: string;
  scoreTeam1?: string | null;
  scoreTeam2?: string | null;
  winnerTeamName?: string | null;
  umpireName?: string | null;
  notes?: string | null;
}

interface LiveScoreboardProps {
  tournamentTitle: string;
  sportName: string;
  matches: Match[];
}

export function LiveScoreboard({ tournamentTitle, sportName, matches }: LiveScoreboardProps) {
  const [activeTab, setActiveTab] = useState<'LIVE' | 'ALL'>('LIVE');

  const filteredMatches = activeTab === 'LIVE' ? matches.filter((m) => m.status === 'LIVE') : matches;

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Match Center & Live Scores
          </h3>
        </div>

        <div className="flex gap-1 bg-white/5 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('LIVE')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Matches ({matches.filter((m) => m.status === 'LIVE').length})</span>
          </button>
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'ALL' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Matches ({matches.length})
          </button>
        </div>
      </div>

      {/* Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl glass-panel bg-[#0b132b]/80 border border-white/10 shadow-xl space-y-4 relative overflow-hidden"
          >
            {m.status === 'LIVE' && (
              <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-emerald-500 text-slate-950 font-extrabold text-[10px] tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                <span>LIVE IN PLAY</span>
              </div>
            )}

            {/* Match Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
              <span className="font-semibold text-amber-400">{m.roundName} • Match #{m.matchNumber}</span>
              {m.courtOrPitch && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{m.courtOrPitch}</span>
                </div>
              )}
            </div>

            {/* Teams & Scores */}
            <div className="space-y-3">
              {/* Team 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {m.team1Name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-bold text-white text-sm">{m.team1Name}</span>
                </div>
                <span className="font-mono text-sm font-bold text-amber-400">
                  {m.scoreTeam1 || '—'}
                </span>
              </div>

              {/* Team 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                    {m.team2Name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-bold text-white text-sm">{m.team2Name}</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-300">
                  {m.scoreTeam2 || 'Yet to bat / play'}
                </span>
              </div>
            </div>

            {/* Live Notes / Commentary */}
            {m.notes && (
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-emerald-300/90 font-mono">
                {m.notes}
              </div>
            )}

            {/* Footer / Umpire */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Official: {m.umpireName || 'UTA Sports Committee'}</span>
              <span className="font-medium text-slate-300">{sportName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
