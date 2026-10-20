import React from 'react';
import { prisma } from '@/lib/prisma';
import { Music, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPerformancesPage() {
  const performances = await prisma.performance.findMany({
    include: {
      event: true,
      participants: true,
    },
    orderBy: { stageOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Stage Run-of-Show & Talent Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review submissions, schedule stage cues, and track backstage check-in status.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {performances.map((perf, idx) => (
          <div
            key={perf.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-sm shrink-0">
                #{perf.stageOrder || idx + 1}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    {perf.event.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {perf.category.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{perf.title}</h3>
                <p className="text-xs text-slate-400">
                  Coordinator: <strong className="text-slate-200">{perf.coordinatorName}</strong> ({perf.coordinatorEmail}) • {perf.participants.length} Performers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  {perf.scheduledTime || `${perf.durationMinutes} mins`}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-300 font-bold">
                  {perf.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
