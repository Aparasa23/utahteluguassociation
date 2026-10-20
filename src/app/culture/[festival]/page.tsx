import React from 'react';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { FESTIVAL_BLOGS, getFestivalBlogBySlug } from '@/lib/festivalBlogs';
import FestivalDetailReader from '@/components/culture/FestivalDetailReader';

const SLUG_ALIASES: Record<string, string> = {
  sankranthi: 'makara-sankranthi',
  diwali: 'deepavali-naraka-chaturdasi',
  deepavali: 'deepavali-naraka-chaturdasi',
  'sri-rama-navami': 'sri-rama-navami',
  ugadi: 'ugadi',
  bathukamma: 'bathukamma',
};

interface PageProps {
  params: {
    festival: string;
  };
}

export async function generateStaticParams() {
  const legacySlugs = ['sankranthi', 'ugadi', 'bathukamma', 'diwali', 'sri-rama-navami'];
  const blogSlugs = FESTIVAL_BLOGS.map((f) => f.slug);
  const combined = Array.from(new Set([...legacySlugs, ...blogSlugs]));
  return combined.map((s) => ({ festival: s }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const normalizedSlug = SLUG_ALIASES[params.festival.toLowerCase()] || params.festival.toLowerCase();
  const festival = getFestivalBlogBySlug(normalizedSlug);

  if (!festival) {
    return { title: 'Festival Not Found — Utah Telugu Association' };
  }

  return {
    title: `${festival.title} | ${festival.teluguTitle} — Utah Telugu Association`,
    description: festival.subtitle,
  };
}

export default function FestivalPage({ params }: PageProps) {
  const normalizedSlug = SLUG_ALIASES[params.festival.toLowerCase()] || params.festival.toLowerCase();
  const festival = getFestivalBlogBySlug(normalizedSlug);

  if (!festival) {
    notFound();
  }

  return <FestivalDetailReader festival={festival} />;
}
