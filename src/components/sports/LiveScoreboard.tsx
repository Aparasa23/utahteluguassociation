'use client';

import React, { useState } from 'react';
import { Trophy, Activity, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { KineticTabs } from '@/components/ui/KineticTabs';

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
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f4bb59]/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#f4bb59]/15 border border-[#f4bb59]/30">
            <Activity className="w-4 h-4 text-[#f4bb59] animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Match Center & Live Scores
            </h3>
            <p className="text-xs text-[#a5c2cb]">Real-time tournament score updates</p>
          </div>
        </div>

        <KineticTabs<'LIVE' | 'ALL'>
          tabs={[
            {
              id: 'LIVE',
              label: 'Live Matches',
              badge: matches.filter((m) => m.status === 'LIVE').length,
              icon: <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />,
            },
            {
              id: 'ALL',
              label: 'All Matches',
              badge: matches.length,
            },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
          size="sm"
          variant="amber"
        />
      </div>

      {/* Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMatches.length === 0 ? (
          <div className="col-span-full py-12 text-center rounded-2xl glass-panel bg-[#09222c]/90 border border-[#f4bb59]/25 shadow-xl">
            <Trophy className="w-10 h-10 text-[#f4bb59]/50 mx-auto mb-2" />
            <p className="text-sm font-bold text-white font-display">No matches in this category right now</p>
            <p className="text-xs text-[#a5c2cb]">Switch to 'All Matches' to view upcoming schedule</p>
          </div>
        ) : (
          filteredMatches.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl glass-panel bg-[#09222c]/90 border border-[#f4bb59]/25 shadow-xl hover:border-[#f4bb59]/50 transition-all space-y-4 relative overflow-hidden"
            >
              {m.status === 'LIVE' && (
                <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-emerald-600 text-white font-extrabold text-[10px] tracking-widest uppercase flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>LIVE IN PLAY</span>
                </div>
              )}

              {/* Match Header */}
              <div className="flex items-center justify-between text-xs text-[#a5c2cb] border-b border-[#f4bb59]/15 pb-2">
                <span className="font-bold text-[#f4bb59]">{m.roundName} • Match #{m.matchNumber}</span>
                {m.courtOrPitch && (
                  <div className="flex items-center gap-1 font-medium text-[#e7d5b8]">
                    <MapPin className="w-3.5 h-3.5 text-[#f4bb59]" />
                    <span>{m.courtOrPitch}</span>
                  </div>
                )}
              </div>

              {/* Teams & Scores */}
              <div className="space-y-3">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#071a20] text-[#f4bb59] border border-[#f4bb59]/30 flex items-center justify-center font-black text-xs shadow-inner">
                      {m.team1Name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-white text-sm">{m.team1Name}</span>
                  </div>
                  <span className="font-mono text-sm font-black text-[#f4bb59]">
                    {m.scoreTeam1 || '—'}
                  </span>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#071a20] text-[#ffcb75] border border-[#ffcb75]/30 flex items-center justify-center font-black text-xs shadow-inner">
                      {m.team2Name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-white text-sm">{m.team2Name}</span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-[#a5c2cb]">
                    {m.scoreTeam2 || 'Yet to bat / play'}
                  </span>
                </div>
              </div>

              {/* Live Notes / Commentary */}
              {m.notes && (
                <div className="p-2.5 rounded-lg bg-[#071a20]/90 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                  {m.notes}
                </div>
              )}

              {/* Footer / Umpire */}
              <div className="pt-2 border-t border-[#f4bb59]/15 flex items-center justify-between text-[11px] text-[#a5c2cb]">
                <span>Official: {m.umpireName || 'UTA Sports Committee'}</span>
                <span className="font-bold text-[#f4bb59]">{sportName}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
