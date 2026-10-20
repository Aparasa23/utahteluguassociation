'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, Users, QrCode, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import { generateQRCodeDataUrl } from '@/lib/qr';

interface DigitalPassProps {
  membershipNumber: string;
  memberName: string;
  familyName?: string;
  planName: string;
  expiryDate: string;
  status: string;
  qrToken: string;
  familyMembers?: Array<{ fullName: string; relationship: string; age?: number }>;
}

export function DigitalPassCard({
  membershipNumber,
  memberName,
  familyName = 'The Rao Family',
  planName,
  expiryDate,
  status,
  qrToken,
  familyMembers = [
    { fullName: 'Venkat Rao', relationship: 'PRIMARY' },
    { fullName: 'Priya Rao', relationship: 'SPOUSE' },
    { fullName: 'Ananya Rao', relationship: 'CHILD' },
    { fullName: 'Siddharth Rao', relationship: 'CHILD' },
  ],
}: DigitalPassProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate signed QR data URL
    const verifyPayload = JSON.stringify({
      id: membershipNumber,
      token: qrToken,
      org: 'Utah Telugu Association',
      type: 'MEMBER_PASS',
    });
    generateQRCodeDataUrl(verifyPayload).then(setQrDataUrl).catch(console.error);
  }, [membershipNumber, qrToken]);

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      {/* Action flip toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? 'View Front Pass' : 'View Family Details'}</span>
        </button>
      </div>

      <div
        className={`relative w-full rounded-2xl p-6 transition-all duration-700 shadow-2xl border ${
          status === 'ACTIVE'
            ? 'border-amber-400/40 bg-gradient-to-br from-[#0c1638] via-[#111f4d] to-[#080d22]'
            : 'border-slate-700 bg-slate-900'
        }`}
      >
        {/* Decorative corner motifs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 flex items-center justify-center font-bold text-slate-950 font-display text-sm">
                  UTA
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-display tracking-wide">
                    UTAH TELUGU ASSOCIATION
                  </h4>
                  <p className="text-[11px] text-amber-400 font-telugu">డిజిటల్ సభ్యత్వ కార్డు</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>{status}</span>
              </div>
            </div>

            {/* Middle: Member info + QR */}
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-3 space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Primary Member</span>
                  <p className="text-base font-bold text-white leading-tight">{memberName}</p>
                  <p className="text-xs text-amber-300 font-medium">{familyName}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Membership ID</span>
                  <p className="font-mono text-xs font-semibold text-slate-200">{membershipNumber}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Plan Tier</span>
                  <p className="text-xs font-semibold text-amber-400">{planName}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl shadow-lg border border-white/20">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Member QR Pass" className="w-24 h-24 block" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-200 animate-pulse rounded" />
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">Scan at Check-In</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Valid Thru: <strong className="text-white">{expiryDate}</strong></span>
              </div>
              <Link href="/membership/verify" className="text-amber-400 hover:underline text-[11px] font-semibold">
                Verify Online
              </Link>
            </div>
          </div>
        ) : (
          /* BACK SIDE: Family Roster */
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Covered Family Members</h4>
              <span className="text-xs text-amber-400 font-semibold">{familyMembers.length} Registered</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {familyMembers.map((fm, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-white">{fm.fullName}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold uppercase">
                    {fm.relationship}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed">
              Family passes admit all registered immediate family members to Utah Telugu Association cultural celebrations. Non-transferable.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
