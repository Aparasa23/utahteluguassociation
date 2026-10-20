import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Weekend 2027 — Sports, Culture & Celebration | UTA',
  description:
    'Experience the official Sankranthi 2027 weekend hosted by Utah Telugu Association in collaboration with DPL and Walkers.',
};

export default function SankranthiWeekendPage() {
  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey="all" />
    </main>
  );
}
