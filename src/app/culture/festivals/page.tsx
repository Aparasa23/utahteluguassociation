import React from 'react';
import type { Metadata } from 'next';
import FestivalsCatalogClient from '@/components/culture/FestivalsCatalogClient';

export const metadata: Metadata = {
  title: 'Telugu Festivals & Ancient Traditions Encyclopedia — Utah Telugu Association',
  description: 'Comprehensive scholarly chronicles of 23 Telugu festivals: Sankranthi, Ugadi, Bathukamma, Bonalu, and forgotten endangered traditions like Eruvaka Punnami, Atla Tadde, Poli Swargam, and Kotappakonda Prabhalu with historical citations and olden days celebration rites.',
  keywords: [
    'Telugu festivals',
    'Eruvaka Punnami',
    'Atla Tadde',
    'Poli Swargam',
    'Kotappakonda Prabhalu',
    'Sirimanotsavam',
    'Peddula Panduga',
    'Sankranthi olden days',
    'Bathukamma history',
    'Telugu forgotten festivals',
    'Utah Telugu Association',
    'Telugu culture blog'
  ],
  openGraph: {
    title: 'Telugu Festivals & Ancient Traditions — Scholarly Heritage Archive',
    description: 'Explore how Telugu festivals were celebrated in olden days, why rare traditions faded, historical citations from Srinatha & Puranas, and traditional recipes.',
    images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function FestivalsPage() {
  return <FestivalsCatalogClient />;
}
