import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[90vh] bg-[#fcf9f2]/70 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Header */}
        <header className="h-14 border-b border-rose-900/10 px-4 sm:px-8 flex items-center justify-between glass-panel bg-white/90 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-600 text-white font-mono tracking-wider shadow-xs">
              SUPER ADMIN
            </span>
            <span className="text-xs font-bold text-[#1c140e]">Rao Parasa (UTA President)</span>
            <span className="text-xs text-[#8c7664] hidden sm:inline">•</span>
            <span className="text-xs text-[#705544] hidden sm:inline">Role: Executive Officer</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
              OPERATIONAL SYSTEM ONLINE
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
