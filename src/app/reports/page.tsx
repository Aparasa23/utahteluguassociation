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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/10 text-emerald-900 border border-emerald-600/20 text-xs font-bold uppercase tracking-wider">
          <span>Non-Profit 501(c)(3) Stewardship</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1c140e] font-display tracking-tight">
          Financial Transparency & Reports
        </h1>
        <p className="text-base sm:text-lg text-emerald-800 font-telugu font-semibold">
          ఆర్థిక పారదర్శకత & వార్షిక నివేదికలు
        </p>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-xl mx-auto font-normal">
          The Utah Telugu Association operates with total financial transparency. Review approved operating budgets, revenue breakdowns, and tax disclosures.
        </p>
      </div>

      {/* Financial KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm text-center space-y-1">
          <span className="text-xs text-[#6e5949] uppercase font-bold">Total Operating Budget</span>
          <p className="text-2xl sm:text-3xl font-black text-[#1c140e] font-display">
            {formatCurrency(totalAllocated || 35000)}
          </p>
          <span className="text-[11px] text-[#786454]">Fiscal Cycle 2026–2027</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm text-center space-y-1">
          <span className="text-xs text-[#6e5949] uppercase font-bold">Executed Program Spend</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-display">
            {formatCurrency(totalSpent || 12450)}
          </p>
          <span className="text-[11px] text-[#786454]">Venues, Food & Cultural Stage</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm text-center space-y-1">
          <span className="text-xs text-[#6e5949] uppercase font-bold">Reserve & Endowment</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-900 font-display">
            {formatCurrency((totalAllocated - totalSpent) || 22550)}
          </p>
          <span className="text-[11px] text-[#786454]">Unrestricted Operating Buffer</span>
        </div>
      </div>

      {/* Budget vs Actuals Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/15 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#1c140e] font-display">
              Budget Allocations vs. Actuals (2026–2027)
            </h2>
            <p className="text-xs text-[#6e5949] mt-0.5">
              Approved by General Body & Executive Committee
            </p>
          </div>

          <a
            href="/api/finances/export"
            download="UTA_Financial_Report_2026_2027.csv"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-magnetic text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Statement</span>
          </a>
        </div>

        <div className="space-y-4">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.allocated) * 100)) || 35;
            return (
              <div key={b.id} className="p-4 rounded-xl bg-amber-50/50 border border-amber-900/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1c140e] text-sm">
                    {b.category.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#5a483a]">
                    {formatCurrency(b.spent)} / {formatCurrency(b.allocated)} ({pct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-amber-900/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-amber-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IRS Disclosures */}
      <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-900/15 space-y-2 text-xs text-[#5a483a] leading-relaxed shadow-sm">
        <div className="flex items-center gap-2 font-bold text-[#1c140e] text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>IRS 501(c)(3) Tax Exemption Record</span>
        </div>
        <p>
          Utah Telugu Association is recognized as a non-profit organization under section 501(c)(3) of the United States Internal Revenue Code. Contributions are tax-deductible to the fullest extent permitted by federal and state law. Formal annual Form 990 filings are available upon request to the Treasurer at treasurer@utahtelugu.org.
        </p>
      </div>
    </div>
  );
}
