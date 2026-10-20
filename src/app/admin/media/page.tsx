import React from 'react';
import { prisma } from '@/lib/prisma';
import { Image as ImageIcon, Instagram, RefreshCw, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const [media, instagramPosts] = await Promise.all([
    prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.instagramPost.findMany({ orderBy: { timestamp: 'desc' } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/15 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c140e] font-display">
            Media & Visual Asset Manager
          </h1>
          <p className="text-xs text-[#5a483a] mt-0.5">
            Photographic archives, live Instagram feeds, and festival album assets.
          </p>
        </div>
      </div>

      {/* Instagram Live Feed Status Card */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-900/15 bg-white/90 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white">
              <Instagram className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-[#1c140e] text-base">
                Instagram Automated Sync Engine
              </h3>
              <p className="text-xs text-[#5a483a]">
                Connected to <strong className="text-amber-800">@utahteluguassociation</strong>
              </p>
            </div>
          </div>
          <p className="text-xs text-[#5a483a] max-w-xl leading-relaxed">
            New posts published to <a href="https://www.instagram.com/utahteluguassociation/" target="_blank" rel="noreferrer" className="text-amber-800 underline font-semibold">https://www.instagram.com/utahteluguassociation/</a> are automatically synchronized into the public gallery.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#5a483a] pt-1">
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Webhook Active
            </span>
            <span>•</span>
            <span>{instagramPosts.length} Synced Posts in Database</span>
          </div>
        </div>

        <form action="/api/instagram/sync" method="POST">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs btn-magnetic flex items-center gap-2 shadow-md whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sync Instagram Now</span>
          </button>
        </form>
      </div>

      {/* Synced Instagram Posts Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#1c140e] font-display flex items-center gap-2">
          <Instagram className="w-4 h-4 text-pink-600" />
          <span>Synchronized Instagram Media ({instagramPosts.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="glass-panel rounded-2xl overflow-hidden border border-amber-900/15 bg-white/90 shadow-sm space-y-2 group">
              <div className="h-40 overflow-hidden bg-amber-50 relative">
                <img src={post.mediaUrl} alt={post.caption || 'Instagram Post'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-sm">
                  {post.likeCount} Likes
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-[#33251c] line-clamp-2 leading-tight">
                  {post.caption}
                </p>
                <div className="pt-2 mt-2 border-t border-amber-900/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#786454]">
                    {new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-800 hover:underline flex items-center gap-0.5 font-semibold"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
