import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Megaphone, Calendar, ArrowRight, Bell } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export const metadata = {
  title: 'News & Announcements — Utah Telugu Association',
  description: 'Official association updates, festival preparations, election notifications, and executive committee press releases.',
};

export default async function NewsPage() {
  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  const newsArticles = [
    {
      slug: 'sankranthi-2027-preparations-underway',
      title: 'Grand Preparations Begin for Sankranthi Sambaralu 2027 at Mid-Valley Performing Arts',
      date: '2026-10-15',
      summary: 'Executive committee confirms auditorium booking, announces cultural stage submission guidelines, and welcomes new corporate title sponsors.',
      author: 'UTA Executive Committee',
    },
    {
      slug: 'youth-scholarship-program-announced',
      title: 'Utah Telugu Association Launches 2027 Youth STEM & Heritage Collegiate Scholarships',
      date: '2026-09-28',
      summary: 'Two $1,250 merit awards will be granted to graduating high school seniors of active member families demonstrating community service.',
      author: 'Board of Trustees',
    },
    {
      slug: 'cricket-cup-records-broken',
      title: 'Record 12 Teams Register for Wasatch Premier Cricket Cup 2027',
      date: '2026-09-10',
      summary: 'Expanded tournament format now includes leather-ball and youth tennis-ball divisions across three weekends at Jordan River Complex.',
      author: 'Sports Committee',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Communications & Dispatches
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          News & Association Updates
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          తాజా వార్తలు & కార్యనిర్వాహక ప్రకటనలు
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Stay informed on upcoming festival registrations, executive committee decisions, and community spotlights.
        </p>
      </div>

      {/* Urgent Announcements Banner */}
      {announcements.length > 0 && (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-2xl glass-panel-gold border border-amber-400/40 flex items-start gap-3.5"
            >
              <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Official Notice</span>
                <h3 className="font-bold text-white text-base">{a.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{a.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Articles Feed */}
      <div className="space-y-6 pt-4">
        <h2 className="text-xl font-bold text-white font-display">Recent Dispatches</h2>
        <div className="space-y-4">
          {newsArticles.map((article) => (
            <div
              key={article.slug}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-amber-400/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{formatUtahDate(article.date, 'short')}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                  <Link href={`/news/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{article.summary}</p>
              </div>

              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors shrink-0"
              >
                <span>Read Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
