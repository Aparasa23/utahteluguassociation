import React from 'react';
import { prisma } from '@/lib/prisma';
import { Heart, DollarSign } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Charitable Donations & Endowment Ledger
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          501(c)(3) tax-deductible donor records and designated cause funds.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Donations Record</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Donor Name</th>
                <th className="py-2.5 px-3">Designated Cause</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {donations.map((d) => (
                <tr key={d.id}>
                  <td className="py-3 px-3 font-bold text-white">{d.isAnonymous ? 'Anonymous Donor' : d.donorName}</td>
                  <td className="py-3 px-3 text-slate-300">{d.cause.replace(/_/g, ' ')}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">{formatCurrency(d.amount)}</td>
                  <td className="py-3 px-3 text-[10px] text-emerald-400 uppercase font-bold">{d.paymentStatus}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{formatUtahDate(d.createdAt, 'short')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
