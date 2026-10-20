import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FESTIVAL_BLOGS, getFestivalBlogBySlug } from '@/lib/festivalBlogs';
import FestivalDetailReader from '@/components/culture/FestivalDetailReader';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return FESTIVAL_BLOGS.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const festival = getFestivalBlogBySlug(params.slug);
  if (!festival) {
    return {
      title: 'Festival Not Found — Utah Telugu Association',
    };
  }

  return {
    title: `${festival.title} | ${festival.teluguTitle} — Utah Telugu Association`,
    description: `${festival.subtitle} Historical lore, olden days celebration rites, scholarly citations, and geographic origin.`,
    keywords: [
      festival.title,
      festival.teluguTitle,
      festival.geographicRegion.primary,
      ...festival.geographicRegion.specificDistricts,
      festival.historicalEra,
      'Telugu festival history',
      'Olden days celebration',
      'Forgotten Telugu festivals',
      'Utah Telugu Association'
    ],
    openGraph: {
      title: `${festival.title} — Ancient Telugu Traditions`,
      description: festival.subtitle,
      images: [festival.coverImageUrl],
    },
  };
}

export default function FestivalSlugPage({ params }: PageProps) {
  const festival = getFestivalBlogBySlug(params.slug);

  if (!festival) {
    notFound();
  }

  return <FestivalDetailReader festival={festival} />;
}
