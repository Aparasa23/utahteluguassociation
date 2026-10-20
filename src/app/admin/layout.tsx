import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[90vh] bg-[#040713] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Header */}
        <header className="h-14 border-b border-rose-500/20 px-4 sm:px-8 flex items-center justify-between glass-panel bg-[#0b0716]/80">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500 text-white font-mono tracking-wider">
              SUPER ADMIN
            </span>
            <span className="text-xs font-bold text-white">Rao Parasa (UTA President)</span>
            <span className="text-xs text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline">Role: Executive Officer</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">OPERATIONAL SYSTEM ONLINE</span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
