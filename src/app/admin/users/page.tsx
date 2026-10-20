import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users, Shield, Mail, Phone } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      userRoles: { include: { role: true } },
      memberProfile: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          User Directory & Credentials
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {users.length} registered system users across all roles and member profiles.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Roles</th>
                <th className="py-3 px-4">Membership</th>
                <th className="py-3 px-4">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{u.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {u.userRoles.map((ur) => (
                        <span
                          key={ur.id}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono"
                        >
                          {ur.role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {u.memberProfile ? (
                      <span className="font-mono text-xs text-amber-400">
                        {u.memberProfile.membershipNumber}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">None</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {formatUtahDate(u.createdAt, 'short')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
