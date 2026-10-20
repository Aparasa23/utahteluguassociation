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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-600/10 text-sky-900 border border-sky-600/20 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
          <span>OFFICIAL DIGITAL PASS REGISTRY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1c140e] font-display tracking-tight">
          Verify UTA Membership Pass
        </h1>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-md mx-auto font-normal">
          Scan the QR code on any UTA membership card or enter the Member ID below to confirm active association standing.
        </p>
      </div>

      {/* Verification Search Bar */}
      <form onSubmit={handleVerify} className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/95 shadow-md space-y-3">
        <label className="block text-xs font-bold text-[#1c140e]">
          Membership Number or Cryptographic Token
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={tokenOrNumber}
            onChange={(e) => setTokenOrNumber(e.target.value)}
            placeholder="e.g. UTA-2026-F0892 or token"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 placeholder:text-[#8c7664]"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="px-5 py-2.5 rounded-xl btn-magnetic text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 shadow-md"
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
              ? 'glass-panel bg-white/95 border-emerald-600/30 shadow-lg'
              : 'bg-rose-50 border-rose-600/40 text-rose-800'
          }`}
        >
          {verificationResult.isValid ? (
            <>
              <div className="flex items-center justify-between border-b border-amber-900/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-800 flex items-center justify-center border border-emerald-600/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1c140e] font-display">
                      Verified Active Member
                    </h3>
                    <p className="text-xs text-amber-800 font-mono font-bold">
                      {verificationResult.membershipNumber}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600/15 text-emerald-900 border border-emerald-600/30 text-xs font-bold uppercase">
                  ACTIVE STANDING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
                  <span className="text-[#6e5949] uppercase text-[10px] font-bold">Primary Member</span>
                  <p className="font-bold text-[#1c140e] text-sm">{verificationResult.primaryName}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
                  <span className="text-[#6e5949] uppercase text-[10px] font-bold">Tier</span>
                  <p className="font-bold text-amber-900 text-sm">{verificationResult.planName}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1 sm:col-span-2">
                  <span className="text-[#6e5949] uppercase text-[10px] font-bold">Expiration Date</span>
                  <p className="font-bold text-[#1c140e] text-sm">
                    {verificationResult.endDate
                      ? formatUtahDate(verificationResult.endDate, 'short')
                      : 'Valid'}
                  </p>
                </div>
              </div>

              {verificationResult.familyMembers?.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#1c140e] uppercase">
                    Covered Family Members ({verificationResult.familyMembers.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {verificationResult.familyMembers.map((fm: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-900/15 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-[#1c140e]">{fm.fullName}</span>
                        <span className="text-[10px] text-amber-800 font-bold uppercase">
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
              <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-rose-950">Membership Not Verified</h3>
                <p className="text-xs text-rose-800 mt-1">
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
