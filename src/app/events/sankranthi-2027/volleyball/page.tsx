import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Indoor Volleyball League 2027 (in collaboration with Walkers) | UTA',
  description:
    'Register your team or join as a free agent for the UTA Indoor Volleyball League in collaboration with Walkers on Sunday, January 17, 2027.',
};

export default function VolleyballPage() {
  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey="volleyball" />
    </main>
  );
}
