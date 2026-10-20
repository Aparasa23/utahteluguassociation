import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, ShieldCheck } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Announcements</span>
        </Link>
      </div>

      <div className="space-y-4 border-b border-white/10 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Official Press Release
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display capitalize">
          {params.slug.replace(/-/g, ' ')}
        </h1>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{formatUtahDate(new Date(), 'long')}</span>
          <span>•</span>
          <span>Utah Telugu Association Executive Office</span>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          The Utah Telugu Association (UTA) is pleased to announce this official update to our member families, cultural partners, and community sponsors across the Wasatch Front.
        </p>
        <p>
          As our non-profit association continues to expand across Salt Lake, Utah, Davis, and Summit counties, our commitment remains steadfast: preserving classical and folk Telugu traditions, fostering youth education, and delivering world-class cultural celebrations.
        </p>
        <p>
          All inquiries regarding this announcement should be directed to the General Secretary at <strong className="text-amber-400">secretary@utahtelugu.org</strong>.
        </p>
      </div>
    </div>
  );
}
