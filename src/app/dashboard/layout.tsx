import React from 'react';
import { MemberSidebar } from '@/components/layout/MemberSidebar';
import { ShieldCheck, User } from 'lucide-react';

export default function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[85vh] bg-[#060a17] flex">
      <MemberSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Member Bar */}
        <header className="h-14 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between glass-panel bg-[#0b132b]/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Account:</span>
            <span className="text-xs font-bold text-white">Venkat & Priya Rao</span>
            <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              UTA-2026-F0892
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">ACTIVE FAMILY PASS</span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
