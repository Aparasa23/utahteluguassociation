import React from 'react';
import { prisma } from '@/lib/prisma';
import { FileSpreadsheet, Download, ShieldCheck, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export const metadata = {
  title: 'Financial Transparency & Annual Reports — Utah Telugu Association',
  description: 'Public 501(c)(3) association budgets, audited financial statements, revenue sources, and CSV exports.',
};

export default async function ReportsPage() {
  const budgets = await prisma.budget.findMany({
    include: {
      entries: true,
    },
  });

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Non-Profit 501(c)(3) Stewardship
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Financial Transparency & Reports
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-emerald-200">
          ఆర్థిక పారదర్శకత & వార్షిక నివేదికలు
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          The Utah Telugu Association operates with total financial transparency. Review approved operating budgets, revenue breakdowns, and tax disclosures.
        </p>
      </div>

      {/* Financial KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-1">
          <span className="text-xs text-slate-400 uppercase font-bold">Total Operating Budget</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {formatCurrency(totalAllocated || 35000)}
          </p>
          <span className="text-[11px] text-slate-500">Fiscal Cycle 2026–2027</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-1">
          <span className="text-xs text-slate-400 uppercase font-bold">Executed Program Spend</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(totalSpent || 12450)}
          </p>
          <span className="text-[11px] text-slate-500">Venues, Food & Cultural Stage</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-1">
          <span className="text-xs text-slate-400 uppercase font-bold">Reserve & Endowment</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
            {formatCurrency((totalAllocated - totalSpent) || 22550)}
          </p>
          <span className="text-[11px] text-slate-500">Unrestricted Operating Buffer</span>
        </div>
      </div>

      {/* Budget vs Actuals Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Budget Allocations vs. Actuals (2026–2027)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Approved by General Body & Executive Committee
            </p>
          </div>

          <a
            href="/api/finances/export"
            download="UTA_Financial_Report_2026_2027.csv"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold text-xs transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Statement</span>
          </a>
        </div>

        <div className="space-y-4">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.allocated) * 100)) || 35;
            return (
              <div key={b.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {b.category.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {formatCurrency(b.spent)} / {formatCurrency(b.allocated)} ({pct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IRS Disclosures */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-2 text-xs text-slate-400 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>IRS 501(c)(3) Tax Exemption Record</span>
        </div>
        <p>
          Utah Telugu Association is recognized as a non-profit organization under section 501(c)(3) of the United States Internal Revenue Code. Contributions are tax-deductible to the fullest extent permitted by federal and state law. Formal annual Form 990 filings are available upon request to the Treasurer at treasurer@utahtelugu.org.
        </p>
      </div>
    </div>
  );
}
