import React from 'react';
import { prisma } from '@/lib/prisma';
import { Vote, CheckCircle2, ShieldCheck, Clock, FileText } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminGovernancePage() {
  const proposals = await prisma.governanceProposal.findMany({
    include: {
      proposer: true,
      approvals: {
        include: { officer: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Association Governance & Executive Decisions
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Bylaw amendments, budget allocations, and recorded officer voting tallies.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {proposals.map((prop) => (
          <div key={prop.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                {prop.category}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-500/20 text-emerald-400">
                {prop.status}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">{prop.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">{prop.description}</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase">
                Recorded Officer Votes ({prop.approvals.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prop.approvals.map((app) => (
                  <div key={app.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{app.officer.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400">{app.decision}</span>
                    </div>
                    {app.comment && <p className="text-slate-400 italic">"{app.comment}"</p>}
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {formatUtahDate(app.decidedAt, 'short')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
