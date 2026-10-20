import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Pickleball League 2027 (in collaboration with DPL) | UTA',
  description:
    'Join the Utah Telugu Association Pickleball League in collaboration with Desi Pickleball League (DPL) on Saturday, January 16, 2027.',
};

export default function PickleballPage() {
  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey="pickleball" />
    </main>
  );
}
