'use client';

import React, { useState } from 'react';
import { QrCode, Search, CheckCircle2, XCircle, Users, Calendar, ShieldCheck } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export default function VerifyMembershipPage() {
  const [tokenOrNumber, setTokenOrNumber] = useState('UTA-2026-F0892');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenOrNumber.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const res = await fetch('/api/membership/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenOrNumber: tokenOrNumber.trim() }),
      });
      const data = await res.json();
      setVerificationResult(data);
    } catch {
      setVerificationResult({
        isValid: false,
        message: 'Network error communicating with verification registry.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>OFFICIAL DIGITAL PASS REGISTRY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Verify UTA Membership Pass
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Scan the QR code on any UTA membership card or enter the Member ID below to confirm active association standing.
        </p>
      </div>

      {/* Verification Search Bar */}
      <form onSubmit={handleVerify} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
        <label className="block text-xs font-semibold text-slate-300">
          Membership Number or Cryptographic Token
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={tokenOrNumber}
            onChange={(e) => setTokenOrNumber(e.target.value)}
            placeholder="e.g. UTA-2026-F0892 or token"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{isVerifying ? 'Checking...' : 'Verify Now'}</span>
          </button>
        </div>
      </form>

      {/* Result Display */}
      {verificationResult && (
        <div
          className={`p-6 sm:p-8 rounded-2xl border space-y-5 animate-in zoom-in-95 ${
            verificationResult.isValid
              ? 'glass-panel-gold border-amber-400/50 bg-[#0c1638]'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
          }`}
        >
          {verificationResult.isValid ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Verified Active Member
                    </h3>
                    <p className="text-xs text-amber-400 font-mono">
                      {verificationResult.membershipNumber}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase">
                  ACTIVE STANDING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px]">Primary Member</span>
                  <p className="font-bold text-white text-sm">{verificationResult.primaryName}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px]">Tier</span>
                  <p className="font-bold text-amber-400 text-sm">{verificationResult.planName}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 space-y-1 sm:col-span-2">
                  <span className="text-slate-400 uppercase text-[10px]">Expiration Date</span>
                  <p className="font-bold text-white text-sm">
                    {verificationResult.endDate
                      ? formatUtahDate(verificationResult.endDate, 'short')
                      : 'Valid'}
                  </p>
                </div>
              </div>

              {verificationResult.familyMembers?.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-300 uppercase">
                    Covered Family Members ({verificationResult.familyMembers.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {verificationResult.familyMembers.map((fm: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-white">{fm.fullName}</span>
                        <span className="text-[10px] text-amber-400 font-semibold uppercase">
                          {fm.relationship}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-start gap-4">
              <XCircle className="w-8 h-8 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white">Membership Not Verified</h3>
                <p className="text-xs text-rose-300 mt-1">
                  {verificationResult.message ||
                    'The entered membership ID or token could not be verified in the Utah Telugu Association registry.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
