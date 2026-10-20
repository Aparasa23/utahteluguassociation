import React from 'react';
import { prisma } from '@/lib/prisma';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const media = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Media & Visual Asset Manager
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Photographic archives, video embeds, and album assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-2">
            <div className="h-36 overflow-hidden bg-slate-900">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <span className="text-[9px] font-bold uppercase text-amber-400">{item.albumSlug}</span>
              <h4 className="font-bold text-white text-xs truncate mt-0.5">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
