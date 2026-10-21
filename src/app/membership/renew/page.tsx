'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Search, CheckCircle2, AlertCircle, ArrowRight, Calendar } from 'lucide-react';
import { formatCurrency, formatUtahDate } from '@/lib/utils';

export default function RenewMembershipPage() {
  const [identifier, setIdentifier] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [memberRecord, setMemberRecord] = useState<any>(null);
  const [searchError, setSearchError] = useState('');
  const [renewalSuccess, setRenewalSuccess] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSearching(true);
    setSearchError('');
    setMemberRecord(null);
    setRenewalSuccess(false);

    try {
      const res = await fetch('/api/membership/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenOrNumber: identifier.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.membershipNumber) {
        throw new Error(data.message || 'Membership profile not found.');
      }
      setMemberRecord(data);
    } catch (err: any) {
      setSearchError(err.message || 'Unable to locate membership.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRenew = () => {
    setSearchError('Renewal is not currently available online. No payment has been taken and no membership dates have changed.');
    setRenewalSuccess(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600/10 text-amber-900 border border-amber-600/20 text-xs font-bold uppercase tracking-wider">
          <span>Annual Association Renewal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1c140e] font-display tracking-tight">
          Renew Your UTA Membership
        </h1>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-lg mx-auto font-normal">
          Enter your UTA Membership ID (e.g. UTA-2026-F0892) or primary registered email to extend your benefits through 2027–2028.
        </p>
      </div>

      {/* Lookup Form */}
      <form onSubmit={handleLookup} className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-md space-y-4">
        <label className="block text-xs font-bold text-[#1c140e]">
          Enter Membership ID or Primary Email
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. UTA-2026-F0892 or member@utahtelugu.org"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 placeholder:text-[#8c7664]"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl btn-magnetic text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>{isSearching ? 'Searching...' : 'Find Profile'}</span>
          </button>
        </div>
      </form>

      {searchError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-600/30 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{searchError}</span>
        </div>
      )}

      {/* Profile & Renewal Terms */}
      {memberRecord && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-900/20 bg-white/95 shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-amber-900/15 pb-4">
            <div>
              <span className="text-xs text-[#6e5949] uppercase font-bold">Primary Member</span>
              <h3 className="text-xl font-bold text-[#1c140e] font-display">{memberRecord.primaryName}</h3>
              <p className="text-xs text-amber-800 font-mono font-bold mt-0.5">{memberRecord.membershipNumber}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6e5949] uppercase font-bold">Current Status</span>
              <p className="text-sm font-bold text-emerald-700">{memberRecord.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
              <span className="text-[#6e5949]">Current Plan:</span>
              <p className="font-bold text-[#1c140e] text-sm">{memberRecord.planName}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
              <span className="text-[#6e5949]">Current Expiry:</span>
              <p className="font-bold text-[#1c140e] text-sm">
                {memberRecord.endDate ? formatUtahDate(memberRecord.endDate, 'short') : 'Jan 1, 2027'}
              </p>
            </div>
          </div>

          {renewalSuccess ? (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-600/40 text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1c140e]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Renewal Successfully Confirmed!</span>
              </div>
              <p className="text-xs text-[#5a483a]">
                Your annual membership has been extended for another 12 months. Your digital membership pass remains active with updated validity dates.
              </p>
              <Link
                href="/dashboard/membership-card"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline pt-2"
              >
                <span>View Digital Pass in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-amber-900/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6e5949] block">Annual Renewal Dues:</span>
                <span className="text-2xl font-black text-amber-900 font-display">$50.00</span>
              </div>

              <button
                onClick={handleRenew}
                className="px-6 py-2.5 rounded-xl btn-magnetic text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Confirm Renewal (2027–2028)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
