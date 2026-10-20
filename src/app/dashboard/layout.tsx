import React from 'react';
import { MemberSidebar } from '@/components/layout/MemberSidebar';
import { ShieldCheck, User } from 'lucide-react';

export default function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[85vh] flex bg-[#fcf9f2]/70">
      <MemberSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Member Bar */}
        <header className="h-14 border-b border-amber-900/10 px-4 sm:px-8 flex items-center justify-between glass-panel bg-white/90 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#705544]">Account:</span>
            <span className="text-xs font-bold text-[#1c140e]">Venkat & Priya Rao</span>
            <span className="text-[10px] font-mono text-amber-800 px-2 py-0.5 rounded bg-amber-100/80 border border-amber-300">
              UTA-2026-F0892
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
              ACTIVE FAMILY PASS
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
