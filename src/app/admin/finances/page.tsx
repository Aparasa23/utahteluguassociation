import React from 'react';
import { prisma } from '@/lib/prisma';
import { DollarSign, Download, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminFinancesPage() {
  const [budgets, entries] = await Promise.all([
    prisma.budget.findMany({ include: { entries: true } }),
    prisma.financialEntry.findMany({
      orderBy: { transactedAt: 'desc' },
      include: { budget: true },
    }),
  ]);

  const totalRevenue = entries
    .filter((e) => e.entryType === 'REVENUE')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.entryType === 'EXPENSE')
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Treasury & Financial Operations
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            501(c)(3) operational balance, revenue collections, and reconciliation log.
          </p>
        </div>

        <a
          href="/api/finances/export"
          download="UTA_Treasury_Export.csv"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Ledger CSV</span>
        </a>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Revenue Collected</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(totalRevenue)}
          </p>
          <span className="text-[10px] text-slate-500">Memberships, Sponsors & Tickets</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Program Expenses</span>
          <p className="text-2xl font-extrabold text-rose-400 font-display">
            {formatCurrency(totalExpense)}
          </p>
          <span className="text-[10px] text-slate-500">Venues, Sound, Catering & Trophies</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Operating Surplus</span>
          <p className="text-2xl font-extrabold text-amber-400 font-display">
            {formatCurrency(totalRevenue - totalExpense)}
          </p>
          <span className="text-[10px] text-slate-500">Available Reserves</span>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl space-y-2 p-5">
        <h2 className="text-base font-bold text-white font-display mb-3">Reconciliation Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {formatUtahDate(e.transactedAt, 'short')}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        e.entryType === 'REVENUE'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {e.entryType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-semibold">{e.category}</td>
                  <td className="py-3 px-3 text-white max-w-xs truncate">{e.description}</td>
                  <td className="py-3 px-3 font-mono text-amber-400">{e.paymentRef || '—'}</td>
                  <td className="py-3 px-3 font-bold text-white">
                    {e.entryType === 'EXPENSE' ? `-${formatCurrency(e.amount)}` : `+${formatCurrency(e.amount)}`}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {e.reconciled ? 'RECONCILED' : 'PENDING'}
                    </span>
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
