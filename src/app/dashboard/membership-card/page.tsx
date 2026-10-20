import React from 'react';
import { prisma } from '@/lib/prisma';
import { DigitalPassCard } from '@/components/membership/DigitalPassCard';
import { ArrowLeft, Printer, Share2, ShieldCheck, Download } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export const metadata = {
  title: 'Digital Membership Card — Member Portal',
  description: 'Instant QR code verification card for Utah Telugu Association members.',
};

export default async function MemberPassPage() {
  const memberProfile = await prisma.memberProfile.findFirst({
    where: { membershipNumber: 'UTA-2026-F0892' },
    include: {
      user: true,
      family: { include: { familyMembers: true } },
      memberships: { include: { plan: true }, take: 1 },
    },
  });

  const latest = memberProfile?.memberships[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Gate Verified Pass</span>
        </span>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white font-display">
          Your Digital Membership Pass
        </h1>
        <p className="text-xs text-slate-400">
          Present this dynamic card at check-in tables for all UTA festival events.
        </p>
      </div>

      <DigitalPassCard
        membershipNumber={memberProfile?.membershipNumber || 'UTA-2026-F0892'}
        memberName={memberProfile?.user.name || 'Venkat & Priya Rao'}
        familyName={memberProfile?.family?.familyName || 'The Rao Family'}
        planName={latest?.plan.name || 'Family Annual Membership'}
        expiryDate="Jan 1, 2027"
        status={memberProfile?.membershipStatus || 'ACTIVE'}
        qrToken={latest?.qrVerificationToken || 'UTA-VERIFY-7890-ABCD-9988'}
        familyMembers={memberProfile?.family?.familyMembers.map((m) => ({
          fullName: m.fullName,
          relationship: m.relationship,
          age: m.age || undefined,
        }))}
      />

      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-white">Need Offline Access?</p>
        <p>
          Save this screen to your mobile wallet or bookmark this URL. The verification QR code works offline during on-site venue scanning.
        </p>
      </div>
    </div>
  );
}
