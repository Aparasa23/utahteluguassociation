import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Image as ImageIcon, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export const metadata = {
  title: 'Community Gallery & Visual Archive — Utah Telugu Association',
  description: 'Living photo and video archive celebrating two decades of Utah Telugu festivals, stage performances, picnics, and sports championships.',
};

export default async function GalleryPage() {
  const media = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const albums = [
    {
      slug: 'sankranthi-memories',
      title: 'Grand Sankranthi Sambaralu',
      count: '48 Photos',
      cover: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
      description: 'Kite flying competitions, Muggulu rangoli awards, kids Bhogi Pallu, and classical Kuchipudi dances.',
    },
    {
      slug: 'cricket-trophy-2026',
      title: 'Wasatch Cricket Cup Highlights',
      count: '32 Photos',
      cover: 'https://images.unsplash.com/photo-1531415074868-036b10f087b4?auto=format&fit=crop&w=600&q=80',
      description: 'Thrilling tournament finishes, championship trophy celebrations, and player MVP awards.',
    },
    {
      slug: 'ugadi-celebrations',
      title: 'Ugadi Vasantotsavam & Telugu Badi',
      count: '24 Photos',
      cover: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=600&q=80',
      description: 'Panchanga Sravanam, Telugu poetry recitals, and student graduation ceremonies.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
          Visual Memories & Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Community Gallery Archive
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-rose-200">
          స్మృతి మంజరి — ఉటా తెలుగు కుటుంబాల మధుర క్షణాలు
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore photographic archives spanning over two decades of Telugu cultural celebrations and fellowship across Utah.
        </p>
      </div>

      {/* Featured Albums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.slug}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all group"
          >
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                {album.count}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  {album.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {album.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/gallery/${album.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>View Full Album</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Individual Photo Highlights Grid */}
      {media.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-white font-display">Recent Media Captures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 group">
                <img src={item.url} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-amber-400">{item.category}</span>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  {item.caption && <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{item.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
