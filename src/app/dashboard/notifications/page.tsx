import React from 'react';
import { prisma } from '@/lib/prisma';
import { Bell, CheckCircle2, Megaphone } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function MemberNotificationsPage() {
  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Announcements & Notifications
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Important updates regarding venue parking, stage rehearsals, and ticket issuance.
        </p>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">{a.title}</h3>
                {a.isUrgent && (
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white">
                    Action Required
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{a.content}</p>
              <span className="text-[10px] text-slate-500 block pt-1">
                {formatUtahDate(a.createdAt, 'short')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
