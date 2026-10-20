import React from 'react';
import { TempleCalendarClient } from '@/components/calendar/TempleCalendarClient';
import { Sparkles, Sun, Compass } from 'lucide-react';

export const metadata = {
  title: 'Utah Telugu Temple Calendar & Vedic Panchangam — Utah Telugu Association',
  description: 'Authentic Telugu Vedic Panchangam calculated for Salt Lake Valley Mountain Time (MDT/MST). Daily Tithi, Nakshatram, Rahu Kalam, and Utah Hindu Temple events.',
};

export default function TempleCalendarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-[#fff5dc]">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4bb59]/15 text-[#ffd18a] border border-[#f4bb59]/30 text-xs font-bold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5 text-[#f4bb59]" />
          <span>Vedic Panchangam & Utah Temple Timings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          Temple Calendar & Panchangam
        </h1>
        <p className="text-sm sm:text-base text-[#ffcb75] font-telugu font-bold">
          ఉటా తెలుగు ఆలయ క్యాలెండర్ & నిత్య పంచాంగం
        </p>
        <p className="text-xs sm:text-sm text-[#e7d5b8] max-w-xl mx-auto font-medium leading-relaxed">
          Daily Tithi, Nakshatram, Rahu Kalam, and festival schedules computed specifically for the Utah Mountain Time horizon (Salt Lake City, Draper, South Jordan, Lehi).
        </p>
      </div>

      {/* Interactive Tabs & Calendar Client */}
      <TempleCalendarClient />
    </div>
  );
}
