import React from 'react';
import { prisma } from '@/lib/prisma';
import { Receipt, CheckCircle2, Download, CreditCard } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function MemberPaymentsPage() {
  const transactions = await prisma.membershipTransaction.findMany({
    where: {
      membership: {
        memberProfile: {
          user: { email: 'member@utahtelugu.org' },
        },
      },
    },
    include: {
      membership: {
        include: { plan: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Payment Receipts & Invoices
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit logs and official non-profit receipts for your records.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {tx.transactionId || 'ZEF-TX-202601'}
                </span>
                <h4 className="text-sm font-bold text-white">{tx.membership.plan.name}</h4>
                <p className="text-xs text-slate-400">
                  Paid via {tx.provider} • {formatUtahDate(tx.createdAt, 'short')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-base font-extrabold text-white block">
                  {formatCurrency(tx.amount)}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                  {tx.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
