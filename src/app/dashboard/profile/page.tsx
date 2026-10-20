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
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Primary Member Profile
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Your official Utah address and emergency contact on file with UTA.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xl font-display">
            {profile?.user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{profile?.user.name}</h2>
            <p className="text-xs text-slate-400 font-mono">{profile?.membershipNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Email Address</span>
            <p className="font-bold text-white">{profile?.user.email}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Mobile Phone</span>
            <p className="font-bold text-white">{profile?.user.phone || '(801) 555-0123'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 space-y-1 sm:col-span-2">
            <span className="text-slate-400 uppercase text-[10px]">Utah Residential Address</span>
            <p className="font-bold text-white">
              {profile?.addressLine1}, {profile?.city}, {profile?.state} {profile?.zipCode}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Emergency Contact</span>
            <p className="font-bold text-white">{profile?.emergencyContact || 'Ravi Kumar'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
            <span className="text-slate-400 uppercase text-[10px]">Emergency Phone</span>
            <p className="font-bold text-white">{profile?.emergencyPhone || '(801) 555-8822'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
