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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <span>Heritage & Legacy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Association History & Milestones
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto font-normal">
          Over two decades of Telugu cultural pride, community service, and family fellowship across the Wasatch Front.
        </p>
      </div>

      {/* Chronological Timeline */}
      <div className="relative border-l-2 border-[var(--border-card)] pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-10">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[32px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-2 border-[#f4bb59] flex items-center justify-center shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#f4bb59]" />
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl group-hover:border-[#f4bb59]/50 transition-all space-y-2">
              <span className="text-xs font-mono font-bold text-[var(--accent-gold)] px-2 py-0.5 rounded bg-[#f4bb59]/15 border border-[var(--border-card)] inline-block">
                {item.year}
              </span>
              <h3 className="text-lg font-bold text-white font-display pt-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#a5c2cb] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl glass-panel bg-[#09222c]/95 border border-[var(--border-card)] text-center space-y-4 shadow-2xl">
        <h3 className="text-xl font-bold text-white font-display">Be Part of the Next Chapter</h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          Join hundreds of Telugu families who call Utah home. Enroll today and preserve heritage for generations to come.
        </p>
        <Link
          href="/membership/join"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] font-extrabold text-xs shadow-xl transition-all"
        >
          <span>Enroll Your Family in UTA</span>
          <ArrowRight className="w-4 h-4 text-[#071a20]" />
        </Link>
      </div>
    </div>
  );
}
