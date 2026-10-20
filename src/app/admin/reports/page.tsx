import React from 'react';
import ReportsOverviewPage from '@/app/reports/page';

export const metadata = {
  title: 'Executive Financial Reports — Admin Portal',
};

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Financial Analytics & Statement Export
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Audited statements, revenue by source, and CSV statement generator.
        </p>
      </div>

      <ReportsOverviewPage />
    </div>
  );
}
