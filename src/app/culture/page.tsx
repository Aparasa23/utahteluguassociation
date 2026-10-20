import React from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Flower2, Leaf, Flame, Music, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cultural Heritage & Festivals — Utah Telugu Association',
  description: 'Celebrating Sankranthi, Ugadi, Sri Rama Navami, Bathukamma, Diwali, and classical Kuchipudi arts in Utah.',
};

export default function CultureOverviewPage() {
  const festivals = [
    {
      slug: 'sankranthi',
      name: 'Sankranthi Sambaralu',
      telugu: 'సంక్రాంతి సంబరాలు',
      season: 'Winter (January)',
      icon: Sun,
      color: 'from-amber-500 to-amber-700',
      description: 'The premier harvest festival of Telugu people. Celebrating Bhogi bonfire, Makara Sankranthi colorful kites (Gaalipatam), exquisite Rangoli (Muggulu) competitions, and authentic traditional festival feasts.',
    },
    {
      slug: 'ugadi',
      name: 'Ugadi Vasantotsavam',
      telugu: 'ఉగాది వసంతోత్సవం',
      season: 'Spring (March/April)',
      icon: Leaf,
      color: 'from-emerald-500 to-emerald-700',
      description: 'Telugu New Year celebration. Featuring the preparation and tasting of sacred Ugadi Pachadi (incorporating six tastes symbolizing life experiences), Vedic Panchanga Sravanam, and poetry recitals.',
    },
    {
      slug: 'bathukamma',
      name: 'Bathukamma Floral Celebration',
      telugu: 'బతుకమ్మ పండుగ',
      season: 'Autumn (September/October)',
      icon: Flower2,
      color: 'from-rose-500 to-purple-700',
      description: 'Vibrant flower festival of Telangana. Women and families arrange wild seasonal flowers in concentric conical layers, sing folk melodies praising Goddess Gauri, and celebrate nature’s bounty.',
    },
    {
      slug: 'diwali',
      name: 'Deepavali Deepotsavam',
      telugu: 'దీపావళి దీపోత్సవం',
      season: 'Autumn (October/November)',
      icon: Flame,
      color: 'from-orange-500 to-amber-600',
      description: 'Festival of Lights. Lighting of clay lamps (Diyas), sparklers for children, cultural theatrical skits, and community sweet exchanges across the Salt Lake Valley.',
    },
    {
      slug: 'sri-rama-navami',
      name: 'Sri Rama Navami',
      telugu: 'శ్రీరామ నవమి కళ్యాణోత్సవం',
      season: 'Spring (April)',
      icon: Sparkles,
      color: 'from-yellow-500 to-amber-600',
      description: 'Celebration of Sita Rama Kalyanam with traditional devotional singing, distribution of refreshing Panakam and Vadapappu, and classical Carnatic recitals.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Cultural Pavilion
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Telugu Heritage & Traditions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          తెలుగు సంస్కృతి, సంప్రదాయాలు & కళా వైభవం
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore our seasonal festivals, classical Kuchipudi dance academies, music workshops, and stage performance opportunities.
        </p>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((fest) => {
          const Icon = fest.icon;

          return (
            <div
              key={fest.slug}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${fest.color} text-slate-950 font-bold shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-white/5">
                    {fest.season}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {fest.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-telugu">{fest.telugu}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{fest.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <Link
                  href={`/culture/${fest.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Explore Traditions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural Stage CTA Banner */}
      <div className="p-8 rounded-3xl glass-panel-gold border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Local Talent Showcase
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Perform at the Next UTA Cultural Stage
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Solo singers, dance schools, classical instrumentalists, and drama troupes can register stage performances and upload audio tracks online.
          </p>
        </div>

        <Link
          href="/performances"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 whitespace-nowrap flex items-center gap-2"
        >
          <Music className="w-4 h-4" />
          <span>Submit Performance</span>
        </Link>
      </div>
    </div>
  );
}
