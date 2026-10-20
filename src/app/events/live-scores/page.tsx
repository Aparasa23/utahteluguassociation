'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Activity,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  Bell,
  Users,
  ChevronRight,
  Radio,
} from 'lucide-react';

interface MatchData {
  id: string;
  eventName: string;
  category: 'PICKLEBALL' | 'VOLLEYBALL' | 'CHESS' | 'RANGOLI';
  round: string;
  court: string;
  team1: { name: string; score: number; sets: number; isServing?: boolean };
  team2: { name: string; score: number; sets: number; isServing?: boolean };
  status: 'LIVE' | 'UPCOMING' | 'FINAL';
  scheduledTime: string;
  winner?: string;
  summaryNote?: string;
}

const INITIAL_MATCHES: MatchData[] = [
  {
    id: 'm1',
    eventName: 'Sankranthi 2027 DPL Pickleball Tournament',
    category: 'PICKLEBALL',
    round: 'Men’s Doubles — Semifinal 1',
    court: 'Court 1 (Wasatch Arena)',
    team1: { name: 'Vikram & Rajesh (SLC Spinners)', score: 9, sets: 1, isServing: true },
    team2: { name: 'Karthik & Manoj (Draper Aces)', score: 7, sets: 0, isServing: false },
    status: 'LIVE',
    scheduledTime: 'Now Playing',
    summaryNote: 'Game 2 in progress • DPL Sanctioned Bracket',
  },
  {
    id: 'm2',
    eventName: 'Sankranthi 2027 Walkers Volleyball Championship',
    category: 'VOLLEYBALL',
    round: 'Quarterfinal 2',
    court: 'Volleyball Court A (South Court)',
    team1: { name: 'Wasatch Warriors', score: 21, sets: 1, isServing: false },
    team2: { name: 'Deccan Smashers', score: 19, sets: 1, isServing: true },
    status: 'LIVE',
    scheduledTime: 'Now Playing',
    summaryNote: 'Deciding 3rd set • Crowd favorite matchup',
  },
  {
    id: 'm3',
    eventName: 'Sankranthi 2027 Ashta-Chamma & Chess Arena',
    category: 'CHESS',
    round: 'Youth Masters — Round 4',
    court: 'Heritage Pavilion Table 3',
    team1: { name: 'Ananya Rao (Age 12)', score: 1, sets: 1 },
    team2: { name: 'Siddharth Varma (Age 14)', score: 0, sets: 0 },
    status: 'FINAL',
    scheduledTime: 'Completed at 2:15 PM',
    winner: 'Ananya Rao (SLC)',
    summaryNote: 'Checkmate on Move 34 • Advanced to Gold Finals',
  },
  {
    id: 'm4',
    eventName: 'Sankranthi 2027 Traditional Rangoli Contest',
    category: 'RANGOLI',
    round: 'Women’s Open Category — Jury Evaluation',
    court: 'Main Atrium Rangoli Grid 1-12',
    team1: { name: 'Swathi & Deepthi (Sandy)', score: 94, sets: 0 },
    team2: { name: 'Lakshmi & Haritha (Herriman)', score: 91, sets: 0 },
    status: 'FINAL',
    winner: 'Swathi & Deepthi (Sandy)',
    scheduledTime: 'Completed at 1:45 PM',
    summaryNote: 'Theme: Uttarayana Surya Prabha • Eco-friendly herbal powders',
  },
  {
    id: 'm5',
    eventName: 'Sankranthi 2027 DPL Pickleball Tournament',
    category: 'PICKLEBALL',
    round: 'Mixed Doubles — Semifinal 2',
    court: 'Court 2 (North Court)',
    team1: { name: 'Priya & Ramesh (Orem)', score: 0, sets: 0 },
    team2: { name: 'Kavitha & Arvind (Sandy)', score: 0, sets: 0 },
    status: 'UPCOMING',
    scheduledTime: 'Starting in 15 mins (3:30 PM)',
    summaryNote: 'Teams currently warming up on Court 2',
  },
];

export default function EventLiveScoresPage() {
  const [matches, setMatches] = useState<MatchData[]>(INITIAL_MATCHES);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'LIVE' | 'PICKLEBALL' | 'VOLLEYBALL'>('ALL');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsSuccess, setSmsSuccess] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatchForScorekeeper, setSelectedMatchForScorekeeper] = useState<string | null>(null);

  // Simulated live score refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate live point increment
      setMatches((prev) =>
        prev.map((m) => {
          if (m.status === 'LIVE' && m.id === 'm1') {
            const newScore = m.team1.score < 11 ? m.team1.score + 1 : m.team1.score;
            return {
              ...m,
              team1: { ...m.team1, score: newScore },
            };
          }
          return m;
        })
      );
      setIsRefreshing(false);
    }, 600);
  };

  const handleSubscribeSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsPhone.trim().length >= 10) {
      setSmsSuccess(true);
      setTimeout(() => setSmsSuccess(false), 5000);
    }
  };

  // Scorekeeper 1-tap increment
  const handlePointIncrement = (matchId: string, teamNum: 1 | 2) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          if (teamNum === 1) {
            return { ...m, team1: { ...m.team1, score: m.team1.score + 1 } };
          } else {
            return { ...m, team2: { ...m.team2, score: m.team2.score + 1 } };
          }
        }
        return m;
      })
    );
  };

  const filteredMatches = matches.filter((m) => {
    if (activeFilter === 'LIVE') return m.status === 'LIVE';
    if (activeFilter === 'PICKLEBALL') return m.category === 'PICKLEBALL';
    if (activeFilter === 'VOLLEYBALL') return m.category === 'VOLLEYBALL';
    return true;
  });

  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[var(--text-primary)]">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>UTA Live Match Center • Real-Time Arena</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
              Event Scores &amp; Live Tournament Brackets
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              Live scorecards, court assignments, and bracket advancements for Utah Telugu Association festival competitions. Real-time broadcast for attendees, family supporters, and team captains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-secondary)] text-[var(--accent-gold)] font-bold text-xs flex items-center gap-2 hover:bg-[var(--accent-gold)]/10 transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing Arena...' : 'Refresh Scores'}</span>
            </button>

            <Link
              href="/events/sankranthi-2027/register"
              className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 transition-all shadow-lg"
            >
              <Trophy className="w-4 h-4" />
              <span>Sankranthi 2027 Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-card)] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Arena Matches' },
            { id: 'LIVE', label: `Live Now (${liveCount})`, isLive: true },
            { id: 'PICKLEBALL', label: 'DPL Pickleball' },
            { id: 'VOLLEYBALL', label: 'Walkers Volleyball' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                activeFilter === tab.id
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] border-[var(--accent-gold)] shadow-md font-black'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-card)] hover:text-white'
              }`}
            >
              {tab.isLive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-[var(--text-muted)] flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>WebSocket Live Feed Active • Server-Sent Events Online</span>
        </div>
      </div>

      {/* Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMatches.map((m) => {
          const isLive = m.status === 'LIVE';
          const isFinal = m.status === 'FINAL';

          return (
            <div
              key={m.id}
              className={`glass-panel-interactive rounded-2xl p-5 border flex flex-col justify-between shadow-xl transition-all ${
                isLive
                  ? 'border-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/30'
                  : 'border-[var(--border-card)]'
              }`}
            >
              {/* Card Header: Tournament & Court */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-card)] pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-gold)] block">
                      {m.eventName}
                    </span>
                    <h3 className="font-serif font-black text-sm text-white mt-0.5">
                      {m.round}
                    </h3>
                  </div>

                  <div>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        <Radio className="w-3 h-3 animate-ping" />
                        LIVE
                      </span>
                    )}
                    {isFinal && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono bg-white/10 text-slate-300 border border-white/20">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        FINAL
                      </span>
                    )}
                    {m.status === 'UPCOMING' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono bg-amber-500/10 text-[var(--accent-gold)] border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        SCHEDULED
                      </span>
                    )}
                  </div>
                </div>

                {/* Court & Time metadata */}
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1 font-semibold text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    {m.court}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {m.scheduledTime}
                  </span>
                </div>

                {/* Scoreboard Display */}
                <div className="bg-[var(--bg-secondary)]/90 rounded-2xl p-3.5 border border-[var(--border-card)] space-y-2.5 shadow-inner">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {m.team1.isServing && (
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-ping" title="Serving" />
                      )}
                      <span className={`text-xs font-bold ${m.winner === m.team1.name ? 'text-[var(--accent-gold)] font-black' : 'text-white'}`}>
                        {m.team1.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      {m.team1.sets > 0 && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300" title="Sets Won">
                          Sets: {m.team1.sets}
                        </span>
                      )}
                      <span className="text-xl font-black text-white bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                        {m.team1.score}
                      </span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {m.team2.isServing && (
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-ping" title="Serving" />
                      )}
                      <span className={`text-xs font-bold ${m.winner === m.team2.name ? 'text-[var(--accent-gold)] font-black' : 'text-white'}`}>
                        {m.team2.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      {m.team2.sets > 0 && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300" title="Sets Won">
                          Sets: {m.team2.sets}
                        </span>
                      )}
                      <span className="text-xl font-black text-white bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                        {m.team2.score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Winner Callout or Note */}
                {m.winner && (
                  <div className="p-2.5 rounded-xl bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center gap-2 text-xs text-[var(--accent-gold)] font-bold">
                    <Trophy className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                    <span>Winner: <strong>{m.winner}</strong> advances to next bracket!</span>
                  </div>
                )}

                {m.summaryNote && (
                  <p className="text-[11px] text-[var(--text-muted)] italic">
                    {m.summaryNote}
                  </p>
                )}
              </div>

              {/* Bottom Quick Action: 1-Tap Volunteer Referee Scorekeeper */}
              {isLive && (
                <div className="pt-3 mt-3 border-t border-[var(--border-card)] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    Official Scorer Desk:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePointIncrement(m.id, 1)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors"
                      title="Tap to add point to Team 1"
                    >
                      +1 {m.team1.name.split(' ')[0]}
                    </button>
                    <button
                      onClick={() => handlePointIncrement(m.id, 2)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors"
                      title="Tap to add point to Team 2"
                    >
                      +1 {m.team2.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Automated SMS Alerts & Captain Match Dispatcher */}
      <div className="rounded-3xl p-6 sm:p-8 border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider font-mono">
            <Bell className="w-4 h-4" />
            <span>Autonomous Tournament Alert System</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-white">
            Get Instant Court Call &amp; Score Alerts by Text (SMS)
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Team captains, players, and family members: receive an automated text 15 minutes before your court match begins, plus instant set and final score updates.
          </p>
        </div>

        <form onSubmit={handleSubscribeSMS} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
          <input
            type="tel"
            required
            placeholder="Your Phone (e.g. 801-555-0199)"
            value={smsPhone}
            onChange={(e) => setSmsPhone(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-black/40 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-gold)]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md whitespace-nowrap"
          >
            {smsSuccess ? 'Subscribed!' : 'Notify My Phone'}
          </button>
        </form>
      </div>

      {smsSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Success! Your phone has been subscribed to live court call notifications and score alerts for this event.</span>
        </div>
      )}
    </div>
  );
}
