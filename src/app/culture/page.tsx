import React from 'react';
import type { Metadata } from 'next';
import FestivalsCatalogClient from '@/components/culture/FestivalsCatalogClient';

export const metadata: Metadata = {
  title: 'Telugu Cultural Blogs & Heritage Chronicles — Utah Telugu Association',
  description:
    'Curated cultural blogs celebrating Telugu festivals, ancient agricultural rites, culinary symbolism, and literary traditions of Andhra and Telangana.',
  keywords: [
    'Telugu culture blogs',
    'Sankranthi history',
    'Ugadi traditions',
    'Bathukamma rituals',
    'Telugu festival blog',
    'Utah Telugu Association culture',
  ],
};

export default function CulturePage() {
  return <FestivalsCatalogClient />;
}
