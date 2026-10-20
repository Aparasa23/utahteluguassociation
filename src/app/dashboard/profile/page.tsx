import React from 'react';
import { prisma } from '@/lib/prisma';
import { User, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const revalidate = 0;

export default async function MemberProfilePage() {
  const profile = await prisma.memberProfile.findFirst({
    where: { membershipNumber: 'UTA-2026-F0892' },
    include: { user: true },
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-amber-900/10 pb-4">
        <h1 className="text-2xl font-bold text-[#1c140e] font-display">
          Primary Member Profile
        </h1>
        <p className="text-xs text-[#705544] mt-0.5">
          Your official Utah address and emergency contact on file with UTA.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-amber-900/10 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 font-bold flex items-center justify-center text-xl font-display">
            {profile?.user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1c140e]">{profile?.user.name}</h2>
            <p className="text-xs text-amber-800 font-mono">{profile?.membershipNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5a483a]">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Email Address</span>
            <p className="font-bold text-[#1c140e]">{profile?.user.email}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Mobile Phone</span>
            <p className="font-bold text-[#1c140e]">{profile?.user.phone || '(801) 555-0123'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1 sm:col-span-2">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Utah Residential Address</span>
            <p className="font-bold text-[#1c140e]">
              {profile?.addressLine1}, {profile?.city}, {profile?.state} {profile?.zipCode}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Emergency Contact</span>
            <p className="font-bold text-[#1c140e]">{profile?.emergencyContact || 'Ravi Kumar'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/10 space-y-1">
            <span className="text-[#8c7664] uppercase text-[10px] font-semibold">Emergency Phone</span>
            <p className="font-bold text-[#1c140e]">{profile?.emergencyPhone || '(801) 555-8822'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
