import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Celebrations 2027 — Unified Registration | Utah Telugu Association',
  description:
    'Register for the official Utah Telugu Association Sankranthi Celebrations 2027 weekend. Rangoli Competition, DPL Pickleball League, Walkers Volleyball League, and Grand Sankranthi Maha Utsavam.',
};

export default function SankranthiRegisterPage({
  searchParams,
}: {
  searchParams?: { event?: string };
}) {
  const eventKey = (searchParams?.event as any) || 'all';

  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey={eventKey} />
    </main>
  );
}
