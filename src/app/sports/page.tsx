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
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Community Sports Arena
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Utah Telugu Sports & Tournaments
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-emerald-300">
          ఉటా తెలుగు క్రీడా పోటీలు & క్రీడాకారుల సమాఖ్య
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Participate in premier cricket cups, volleyball tournaments, pickleball matches, and youth sports across the Salt Lake and Utah Valleys.
        </p>
      </div>

      {/* Live Match Scoreboard */}
      {matches.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/30 space-y-4">
          <LiveScoreboard
            tournamentTitle={featuredTournament.title}
            sportName={featuredTournament.sport.label}
            matches={matches}
          />
        </div>
      )}

      {/* Tournaments Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-bold text-white font-display">Active & Upcoming Tournaments</h2>
          <span className="text-xs text-slate-400">{tournaments.length} Championships</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-emerald-400/40 transition-colors space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                    {t.sport.label}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {t.teams.length} Registered Teams
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{t.venueName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Format: {t.format.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-semibold">{t.status.replace(/_/g, ' ')}</span>
                <Link
                  href={`/sports/tournaments/${t.slug}`}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md"
                >
                  <span>View Bracket & Teams</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
