import React from 'react';
import Link from 'next/link';
import { Calendar, History, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'History & Milestones — Utah Telugu Association',
  description: 'Chronicle of the Telugu community in Utah from early pioneering families to modern association milestones.',
};

export default function HistoryPage() {
  const timeline = [
    {
      year: 'Early 2000s',
      title: 'Pioneering Gatherings in Salt Lake Valley',
      description: 'A handful of Telugu engineering and healthcare families in Salt Lake City began gathering in community parks and living rooms to celebrate Sankranthi and Ugadi, preserving Telugu festive traditions away from home.',
    },
    {
      year: '2010',
      title: 'Formal Incorporation & 501(c)(3) Status',
      description: 'As the Telugu population in Utah expanded across Draper, South Jordan, Sandy, and Lehi, community elders formally drafted the association bylaws, establishing the Utah Telugu Association as a registered non-profit.',
    },
    {
      year: '2015',
      title: 'Establishment of UTA Telugu Badi',
      description: 'Launched weekend Telugu mother-tongue language and culture classes for second-generation American Telugu kids, curriculum-aligned to SiliconAndhra ManaBadi standards.',
    },
    {
      year: '2018',
      title: 'Inauguration of Wasatch Premier Cricket Cup',
      description: 'Recognizing community athletic passion, UTA launched the annual Wasatch Premier Cricket Cup at Jordan River, drawing teams from across Utah Valley, Salt Lake County, and neighboring states.',
    },
    {
      year: '2023',
      title: 'Mid-Valley Arts Center Flagship Celebrations',
      description: 'Annual Sankranthi Sambaralu attendance surpassed 1,000 attendees, moving to the premier Mid-Valley Performing Arts Center with 4-hour classical dance choreography productions.',
    },
    {
      year: '2027',
      title: 'Launch of UTA Digital Universe',
      description: 'Pioneering the next frontier: an Awwwards-caliber 3D cultural interactive world combined with full digital membership passes, paperless QR check-in, tournament engines, and association transparency.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Heritage & Legacy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Association History & Milestones
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Over two decades of Telugu cultural pride, community service, and family fellowship across the Wasatch Front.
        </p>
      </div>

      {/* Chronological Timeline */}
      <div className="relative border-l border-amber-400/30 pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-10">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#060a17] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 group-hover:border-amber-400/40 transition-colors space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                {item.year}
              </span>
              <h3 className="text-lg font-bold text-white pt-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl glass-panel-gold border border-amber-400/30 text-center space-y-4">
        <h3 className="text-xl font-bold text-white font-display">Be Part of the Next Chapter</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Join hundreds of Telugu families who call Utah home. Enroll today and preserve heritage for generations to come.
        </p>
        <Link
          href="/membership/join"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
        >
          <span>Enroll Your Family in UTA</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
