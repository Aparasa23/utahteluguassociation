import React from 'react';
import { prisma } from '@/lib/prisma';
import { FileText, Edit3, Eye } from 'lucide-react';

export const revalidate = 0;

export default async function AdminContentPage() {
  const events = await prisma.event.findMany({ select: { id: true, title: true, isPublished: true, slug: true } });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Editorial & Content Publishing
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage publication states, drafts, and festival page descriptions.
        </p>
      </div>

      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono">/events/{e.slug}</span>
              <h3 className="text-sm font-bold text-white">{e.title}</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-500/20 text-emerald-300">
              {e.isPublished ? 'Published Live' : 'Draft'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
