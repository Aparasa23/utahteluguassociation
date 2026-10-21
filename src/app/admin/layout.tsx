import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';

export const revalidate = 0;

const ADMIN_ROLES = [
  'SUPER_ADMIN',
  'PRESIDENT',
  'SECRETARY',
  'TREASURER',
  'EC_MEMBER',
  'BOARD_MEMBER',
  'EVENT_ORGANIZER',
  'TOURNAMENT_DIRECTOR',
  'VOLUNTEER_COORDINATOR',
  'SPONSOR_MANAGER',
  'CHECKIN_STAFF',
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Enforce verified authentication
  if (!session) {
    redirect('/login?returnUrl=/admin');
  }

  // Enforce administrative role verification
  const userRoles = session.user.roles || [];
  const hasAdminRole = userRoles.some((r) => ADMIN_ROLES.includes(r));

  if (!hasAdminRole) {
    redirect('/account?error=insufficient_permissions');
  }

  const primaryRole = userRoles[0] || 'ADMIN';

  return (
    <div className="min-h-[90vh] bg-[#fcf9f2]/70 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Header */}
        <header className="h-14 border-b border-rose-900/10 px-4 sm:px-8 flex items-center justify-between glass-panel bg-white/95 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-rose-600 text-white font-mono tracking-wider shadow-xs">
              {primaryRole}
            </span>
            <span className="text-xs font-bold text-[#1c140e]">
              {session.user.name}
            </span>
            <span className="text-xs text-[#8c7664] hidden sm:inline">•</span>
            <span className="text-xs text-[#705544] hidden sm:inline font-mono">
              {session.user.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 hidden sm:flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Member Portal</span>
            </Link>

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
