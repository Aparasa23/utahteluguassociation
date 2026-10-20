import React from 'react';
import { prisma } from '@/lib/prisma';
import { Music, Sparkles, Clock, CheckCircle2, AlertCircle, Users } from 'lucide-react';
import { PerformanceFormClient } from './PerformanceFormClient';

export const revalidate = 0;

export const metadata = {
  title: 'Cultural Stage Performance Registration — Utah Telugu Association',
  description: 'Register dance, vocal singing, and musical performances for UTA Sankranthi and Ugadi celebrations.',
};

export default async function PerformancesPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { startDateTime: 'asc' },
    select: { id: true, title: true, slug: true },
  });

  const approvedPerformances = await prisma.performance.findMany({
    where: { status: 'APPROVED' },
    include: {
      event: { select: { title: true } },
      participants: true,
    },
    orderBy: { stageOrder: 'asc' },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Music className="w-3.5 h-3.5" />
          <span>STAGE RUN-OF-SHOW & TALENT REGISTRY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Cultural Stage Performances
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          నృత్య, సంగీత ప్రదర్శనల నమోదు వేదిక
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Share your artistry on the UTA cultural stage. All dance academies, vocal artists, and community troupes can submit performance registrations below.
        </p>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Clock className="w-4 h-4" />
            <span>Duration Limits</span>
          </div>
          <p className="text-xs text-slate-300">
            Solo performances: max 4 minutes. Group choreography (4+ participants): max 7 minutes. Medleys: max 9 minutes.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
            <Music className="w-4 h-4" />
            <span>Audio Tracks</span>
          </div>
          <p className="text-xs text-slate-300">
            High-bitrate MP3/WAV tracks must be submitted at least 10 days before event date for soundboard testing.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase">
            <Users className="w-4 h-4" />
            <span>Backstage Check-In</span>
          </div>
          <p className="text-xs text-slate-300">
            Performers must report to the Green Room 45 minutes prior to their scheduled run-of-show stage cue.
          </p>
        </div>
      </div>

      {/* Interactive Submission Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-400/30 space-y-6">
        <h2 className="text-xl font-bold text-white font-display">
          Submit Performance Application
        </h2>
        <PerformanceFormClient events={events} />
      </div>

      {/* Published Official Stage Run-of-Show */}
      {approvedPerformances.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white font-display">
              Official Stage Schedule & Run-of-Show
            </h3>
            <span className="text-xs text-amber-400 font-mono">Approved Lineup</span>
          </div>

          <div className="space-y-3">
            {approvedPerformances.map((perf, idx) => (
              <div
                key={perf.id}
                className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0">
                    #{perf.stageOrder || idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{perf.title}</h4>
                    <p className="text-xs text-slate-400">
                      {perf.category.replace('_', ' ')} • Coordinator: {perf.coordinatorName} ({perf.participants.length} performers)
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 text-xs">
                  <span className="text-amber-400 font-mono font-semibold block">
                    {perf.scheduledTime || `${perf.durationMinutes} mins`}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">Stage Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
