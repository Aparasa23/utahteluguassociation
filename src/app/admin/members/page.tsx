import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Users, Search, Download, ShieldCheck, Mail, Phone } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = searchParams.q || '';
  const statusFilter = searchParams.status || '';

  const members = await prisma.memberProfile.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { membershipNumber: { contains: query } },
                { user: { name: { contains: query } } },
                { user: { email: { contains: query } } },
              ],
            }
          : {},
        statusFilter ? { membershipStatus: statusFilter } : {},
      ],
    },
    include: {
      user: true,
      family: { include: { familyMembers: true } },
      memberships: {
        include: { plan: true },
        take: 1,
        orderBy: { endDate: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Association Member Directory
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Total active registered families: {members.length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/membership/join"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
          >
            + Enroll New Member
          </Link>
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Primary Contact</th>
                <th className="py-3 px-4">Family Unit</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Valid Thru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.map((m) => {
                const latest = m.memberships[0];

                return (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {m.membershipNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{m.user.name}</div>
                      <div className="text-[11px] text-slate-400">{m.user.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {m.family ? (
                        <span>
                          {m.family.familyName} ({m.family.familyMembers.length} pax)
                        </span>
                      ) : (
                        <span className="text-slate-500">Individual</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">
                      {latest?.plan.name || 'Standard'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          m.membershipStatus === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {m.membershipStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {latest?.endDate ? formatUtahDate(latest.endDate, 'short') : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
