import React from 'react';
import { UnifiedSankranthiRegistration } from '@/components/events/UnifiedSankranthiRegistration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sankranthi Rangoli Competition 2027 (Muggulu) | Utah Telugu Association',
  description:
    'Register for the official Utah Telugu Association Rangoli Competition on Friday, January 15, 2027. Traditional Chukkala Muggulu, freehand colors, and Gobbemma specials.',
};

export default function RangoliPage() {
  return (
    <main>
      <UnifiedSankranthiRegistration initialEventKey="rangoli" />
    </main>
  );
}
