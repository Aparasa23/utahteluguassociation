import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Trophy, Activity, ShieldCheck, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { LiveScoreboard } from '@/components/sports/LiveScoreboard';

export const revalidate = 0;

export const metadata = {
  title: 'Community Arena & Sports Leagues — Utah Telugu Association',
  description: 'Utah Wasatch Cricket Cup, volleyball championships, pickleball tournaments, and community athletic leagues.',
};

export default async function SportsOverviewPage() {
  const tournaments = await prisma.tournament.findMany({
    include: {
      sport: true,
      teams: true,
      divisions: true,
      rounds: {
        include: {
          matches: {
            include: {
              team1: true,
              team2: true,
            },
          },
        },
      },
    },
    orderBy: { startDate: 'desc' },
  });

  const featuredTournament = tournaments[0];

  // Flatten matches for live scoreboard
  const matches =
    featuredTournament?.rounds.flatMap((r) =>
      r.matches.map((m) => ({
        id: m.id,
        roundName: r.roundName,
        matchNumber: m.matchNumber,
        courtOrPitch: m.courtOrPitch,
        scheduledTime: m.scheduledTime ? m.scheduledTime.toISOString() : null,
        status: m.status,
        team1Name: m.team1?.teamName || 'TBD',
        team2Name: m.team2?.teamName || 'TBD',
        scoreTeam1: m.scoreTeam1,
        scoreTeam2: m.scoreTeam2,
        winnerTeamName: null,
        umpireName: m.umpireName,
        notes: m.notes,
      }))
    ) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-bold tracking-wide uppercase">
          <span>Community Sports Arena • Utah Telugu Association</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Utah Telugu Sports & Tournaments
        </h1>
        <p className="text-base sm:text-lg text-[#ffcb75] font-telugu font-semibold">
          ఉటా తెలుగు క్రీడా పోటీలు & క్రీడాకారుల సమాఖ్య
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Participate in premier cricket cups, volleyball tournaments, pickleball matches, and youth sports across the Salt Lake and Utah Valleys.
        </p>
      </div>

      {/* Live Match Scoreboard */}
      {matches.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[#09222c]/95 shadow-2xl space-y-4">
          <LiveScoreboard
            tournamentTitle={featuredTournament.title}
            sportName={featuredTournament.sport.label}
            matches={matches}
          />
        </div>
      )}

      {/* Tournaments Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#f4bb59]/20 pb-3">
          <h2 className="text-xl font-bold text-white font-display">Active & Upcoming Tournaments</h2>
          <span className="text-xs font-semibold text-[var(--accent-gold)]">{tournaments.length} Championships</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl flex flex-col justify-between hover:border-[#f4bb59]/50 hover:shadow-2xl transition-all space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f4bb59]/15 text-[var(--accent-gold)] border border-[var(--border-card)] uppercase font-mono">
                    {t.sport.label}
                  </span>
                  <span className="text-xs text-[#a5c2cb] font-mono font-medium">
                    {t.teams.length} Registered Teams
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-[var(--accent-gold)] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-[#a5c2cb] line-clamp-2 mt-1 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                    <span className="font-medium">{t.venueName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-[#ffcb75] shrink-0" />
                    <span className="font-medium">Format: {t.format.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f4bb59]/15 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">{t.status.replace(/_/g, ' ')}</span>
                <Link
                  href={`/sports/tournaments/${t.slug}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <span>View Bracket & Teams</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#071a20]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
