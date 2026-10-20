import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Trophy, ArrowLeft, MapPin, Calendar, ShieldCheck, Users } from 'lucide-react';
import { BracketViewer } from '@/components/sports/BracketViewer';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tournament = await prisma.tournament.findUnique({
    where: { slug: params.slug },
  });
  if (!tournament) return { title: 'Tournament Not Found' };
  return {
    title: `${tournament.title} — UTA Sports`,
    description: tournament.description,
  };
}

export default async function TournamentDetailPage({ params }: { params: { slug: string } }) {
  const tournament = await prisma.tournament.findUnique({
    where: { slug: params.slug },
    include: {
      sport: true,
      divisions: true,
      teams: {
        include: {
          members: true,
        },
      },
      standings: {
        include: {
          team: true,
        },
        orderBy: { points: 'desc' },
      },
      rounds: {
        include: {
          matches: {
            include: {
              team1: true,
              team2: true,
            },
          },
        },
        orderBy: { roundNumber: 'asc' },
      },
    },
  });

  if (!tournament) notFound();

  // Transform rounds for BracketViewer
  const bracketRounds = tournament.rounds.map((r) => ({
    roundName: r.roundName,
    roundNumber: r.roundNumber,
    matches: r.matches.map((m) => ({
      id: m.id,
      matchNumber: m.matchNumber,
      team1: {
        name: m.team1?.teamName || 'TBD',
        score: m.scoreTeam1 || undefined,
        isWinner: m.winnerTeamId === m.team1Id,
      },
      team2: {
        name: m.team2?.teamName || 'TBD',
        score: m.scoreTeam2 || undefined,
        isWinner: m.winnerTeamId === m.team2Id,
      },
      status: m.status,
    })),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div>
        <Link
          href="/sports"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6e5949] hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tournaments</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-900 border border-emerald-600/20 uppercase tracking-wider">
            {tournament.sport.label} Championship
          </span>
          <span className="text-xs font-mono font-bold text-amber-900">
            Status: {tournament.status.replace(/_/g, ' ')}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1c140e] font-display tracking-tight">
          {tournament.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-2xl leading-relaxed font-normal">
          {tournament.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-amber-900/15 text-xs text-[#5a483a]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>{tournament.venueName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{formatUtahDate(tournament.startDate, 'short')} – {formatUtahDate(tournament.endDate, 'short')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-700" />
            <span>Format: {tournament.format.replace(/_/g, ' ')}</span>
          </div>
        </div>
      </div>

      {/* Bracket Viewer */}
      {bracketRounds.length > 0 && (
        <BracketViewer tournamentTitle={tournament.title} rounds={bracketRounds} />
      )}

      {/* Standings & Leaderboard Table */}
      {tournament.standings.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-4">
          <h2 className="text-lg font-bold text-[#1c140e] font-display flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-700" />
            <span>Championship Points Table & Standings</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-amber-900/15 text-[#6e5949] font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Rank / Team</th>
                  <th className="py-2.5 px-3">Played</th>
                  <th className="py-2.5 px-3">Won</th>
                  <th className="py-2.5 px-3">Lost</th>
                  <th className="py-2.5 px-3">Points</th>
                  {tournament.sport.name === 'CRICKET' && <th className="py-2.5 px-3">Net Run Rate</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/10">
                {tournament.standings.map((st, idx) => (
                  <tr key={st.id} className="hover:bg-amber-50/50">
                    <td className="py-3 px-3 font-bold text-[#1c140e] flex items-center gap-2">
                      <span className="w-5 text-amber-900 font-mono font-bold">#{idx + 1}</span>
                      <span>{st.team.teamName}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#5a483a]">{st.played}</td>
                    <td className="py-3 px-3 font-mono text-emerald-800 font-bold">{st.won}</td>
                    <td className="py-3 px-3 font-mono text-rose-800 font-bold">{st.lost}</td>
                    <td className="py-3 px-3 font-mono font-black text-amber-900">{st.points}</td>
                    {tournament.sport.name === 'CRICKET' && (
                      <td className="py-3 px-3 font-mono text-[#5a483a]">
                        {st.netRunRate ? `+${st.netRunRate.toFixed(2)}` : '0.00'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Registered Teams Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#1c140e] font-display">Registered Teams ({tournament.teams.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournament.teams.map((team) => (
            <div key={team.id} className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1c140e] text-base">{team.teamName}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-600/10 text-amber-900 font-mono font-bold border border-amber-600/20">
                  Seed #{team.seedNumber || '—'}
                </span>
              </div>
              <p className="text-xs text-[#5a483a]">
                Captain: <strong className="text-[#1c140e] font-bold">{team.captainName}</strong>
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {team.members.map((m) => (
                  <span key={m.id} className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-[#5a483a] border border-amber-900/10">
                    {m.fullName} {m.isCaptain ? '(C)' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Rules */}
      {tournament.rulesText && (
        <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-900/15 space-y-2 text-xs text-[#5a483a] shadow-sm">
          <h3 className="font-bold text-[#1c140e] uppercase tracking-wider text-[11px]">Official Tournament Rules</h3>
          <p className="leading-relaxed">{tournament.rulesText}</p>
        </div>
      )}
    </div>
  );
}
