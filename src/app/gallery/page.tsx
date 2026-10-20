import React from 'react';
import { GalleryViewerClient } from '@/components/gallery/GalleryViewerClient';
import { Sparkles, Instagram, Camera, HeartHandshake } from 'lucide-react';

export const revalidate = 0;

export const metadata = {
  title: 'Community Gallery & Live Instagram Archive — Utah Telugu Association',
  description: 'Living photo archive celebrating two decades of Utah Telugu festivals, stage performances, picnics, and sports championships.',
};

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-[#fff5dc]">
      {/* Page Title & Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-[#f4bb59]/15 text-[#ffd18a] border border-[#f4bb59]/30 text-xs font-bold uppercase tracking-wider">
          <Instagram className="w-3.5 h-3.5 text-pink-400" />
          <span>Official Instagram Live Gallery • @utahteluguassociation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          UTA Instagram Photo &amp; Video Gallery
        </h1>
        <p className="text-sm sm:text-base text-[#ffcb75] font-telugu font-bold">
          ఉటా అధికారిక ఇన్‌స్టాగ్రామ్ గ్యాలరీ — పండుగలు, రీల్స్ &amp; జ్ఞాపకాలు
        </p>
        <p className="text-xs sm:text-sm text-[#e7d5b8] max-w-2xl mx-auto leading-relaxed font-medium">
          Directly stream photos, video reels, and festival celebrations from our official account <a href="https://www.instagram.com/utahteluguassociation/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#f4bb59] underline hover:text-[#ffd18a]">@utahteluguassociation</a>. Click any photo or reel to watch and explore in high-resolution with captions, comments, and direct links.
        </p>
      </div>

      {/* Real-time Instagram Connection Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-[#f4bb59]/25 bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-[#09222c] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Official Instagram Connected</span>
            <h4 className="font-bold text-white text-sm font-serif">@utahteluguassociation</h4>
            <p className="text-xs text-[#e7d5b8]">All photos from the Instagram account are automatically synchronized below.</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live In-App Gallery Active</span>
        </span>
      </div>

      {/* Interactive State-of-the-Art Dynamic Gallery with Lightbox Viewer */}
      <GalleryViewerClient />
    </div>
  );
}
