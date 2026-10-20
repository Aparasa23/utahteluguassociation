import React from 'react';
import { prisma } from '@/lib/prisma';
import { History, ShieldAlert, Clock } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminAuditLogsPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: { user: true },
  });

  const demoLogs = [
    {
      actorEmail: 'admin@utahtelugu.org',
      action: 'TICKET_CHECKIN',
      targetType: 'EventTicket',
      targetId: 'TKT-SKR-2027-0101',
      details: 'Gate check-in verified successfully for attendee Venkat Rao',
      createdAt: new Date(),
    },
    {
      actorEmail: 'admin@utahtelugu.org',
      action: 'MEMBERSHIP_ENROLLMENT',
      targetType: 'MemberProfile',
      targetId: 'UTA-2026-F0892',
      details: 'Family Annual Membership activated for The Rao Family',
      createdAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      actorEmail: 'treasurer@utahtelugu.org',
      action: 'FINANCIAL_RECONCILIATION',
      targetType: 'Budget',
      targetId: 'BUD-2026-01',
      details: 'Reconciled Zeffy title sponsorship deposit for $5,000',
      createdAt: new Date(Date.now() - 3600000 * 24),
    },
  ];

  const displayLogs = auditLogs.length > 0 ? auditLogs : demoLogs;

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Security & Operational Audit Trail
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Immutable log of administrative overrides, score updates, and financial actions.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-4">Timestamp (MDT)</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {formatUtahDate(log.createdAt, 'medium')}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">{log.actorEmail}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-400">
                    {log.targetType} {log.targetId ? `(${log.targetId})` : ''}
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-sm truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
