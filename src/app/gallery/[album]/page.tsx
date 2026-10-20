import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function AlbumDetailPage({ params }: { params: { album: string } }) {
  const photos = [
    {
      title: 'Traditional Muggulu & Rangoli Art',
      url: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=800&q=80',
      caption: 'Handmade rice powder and colored sand mandalas by community contestants.',
    },
    {
      title: 'Youth Classical Kuchipudi Dance',
      url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      caption: 'Natya Tarangini students performing the invocation dance.',
    },
    {
      title: 'Authentic Festive Feast (Bhojanam)',
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      caption: 'Traditional South Indian festival meal served on banana leaves.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#705544] hover:text-[#1c140e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Gallery Albums</span>
        </Link>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
          Album Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1c140e] font-display capitalize mt-2">
          {params.album.replace(/-/g, ' ')}
        </h1>
        <p className="text-xs text-[#705544]">Captured live during Utah Telugu Association community events.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((p, idx) => (
          <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-amber-900/15 bg-white/95 shadow-sm group space-y-2">
            <div className="h-60 overflow-hidden bg-amber-50">
              <img src={p.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#1c140e] text-sm">{p.title}</h3>
              <p className="text-xs text-[#5a483a] mt-1">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
