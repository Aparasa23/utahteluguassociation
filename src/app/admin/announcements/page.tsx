import React from 'react';
import { prisma } from '@/lib/prisma';
import { Megaphone, Plus, Bell } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Announcements & Dispatches
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Publish public banners and critical member updates.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => (
          <div key={a.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{a.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-300 font-bold">
                {a.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{a.content}</p>
            <span className="text-[10px] text-slate-500 font-mono block">
              Posted: {formatUtahDate(a.createdAt, 'short')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
