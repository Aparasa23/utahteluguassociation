import React from 'react';
import { prisma } from '@/lib/prisma';
import { FamilyForm } from '@/components/membership/FamilyForm';
import { Sparkles, Users } from 'lucide-react';

export const revalidate = 0;

export const metadata = {
  title: 'Join UTA — Family Membership Enrollment',
  description: 'Enroll your family in the Utah Telugu Association. Fast, paperless registration with instant digital pass issuance.',
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const plans = await prisma.membershipPlan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL UTA ENROLLMENT 2026–2027</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Join the Utah Telugu Association
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Complete the form below to enroll your family. Digital membership passes with tamper-proof QR codes are generated instantly upon confirmation.
        </p>
      </div>

      <FamilyForm plans={plans} selectedPlanCode={searchParams.plan || 'FAMILY_ANNUAL'} />
    </div>
  );
}
