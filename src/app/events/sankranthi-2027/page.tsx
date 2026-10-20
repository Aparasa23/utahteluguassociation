import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Celebrations 2027 — Official Festival Hub | Utah Telugu Association',
  description:
    'Join the Utah Telugu Association for Sankranthi Celebrations 2027. 4 days of traditional Rangoli, DPL Pickleball League, Walkers Volleyball League, and the Grand Cultural Feast.',
};

export default function Sankranthi2027HubPage() {
  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey="all" />
    </main>
  );
}
