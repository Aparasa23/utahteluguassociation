import React from 'react';
import { Settings, ShieldCheck, Clock, Globe } from 'lucide-react';

export const revalidate = 0;

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Association System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Organization timezone, payment gateways, and security parameters.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">System Constants</h2>

          <div className="p-4 rounded-xl bg-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Standard Timezone</span>
            <p className="font-mono text-sm font-bold text-white">America/Denver (Mountain Time)</p>
            <p className="text-[11px] text-slate-400">Enforced consistently across all festival dates and tournament fixtures.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Zeffy Non-Profit Organization ID</span>
            <p className="font-mono text-sm font-bold text-amber-400">uta-utah-telugu-association</p>
            <p className="text-[11px] text-slate-400">Zero platform fees payment provider integration for non-profits.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Gate Check-In Idempotency Enforcement</span>
            <p className="font-mono text-sm font-bold text-emerald-400">ENABLED (Duplicate-Scan Protection)</p>
            <p className="text-[11px] text-slate-400">Prevents repeated scans from generating duplicate attendance counts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
