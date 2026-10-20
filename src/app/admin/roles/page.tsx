import React from 'react';
import { prisma } from '@/lib/prisma';
import { ShieldCheck, Users, Lock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminRolesPage() {
  const [roles, users] = await Promise.all([
    prisma.role.findMany({
      include: {
        userRoles: {
          include: { user: true },
        },
      },
    }),
    prisma.user.findMany({
      include: {
        userRoles: { include: { role: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Role-Based Access Control (RBAC)
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Explicit permissions and committee authorizations across 13 system roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div key={r.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-rose-400">{r.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                {r.userRoles.length} Assigned
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">{r.label}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>

            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Active Assignees</span>
              <div className="space-y-1">
                {r.userRoles.map((ur) => (
                  <div key={ur.id} className="text-xs text-slate-300 truncate">
                    • {ur.user.name} ({ur.user.email})
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
