import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, Heart, Users, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Community Initiatives & Telugu Badi — Utah Telugu Association',
  description: 'Weekend Telugu language classes, youth debate clubs, senior fellowship, and family welfare in Utah.',
};

export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600/10 text-amber-900 border border-amber-600/20 text-xs font-bold uppercase tracking-wider">
          <span>Community Initiatives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1c140e] font-display tracking-tight">
          Telugu Badi & Youth Education
        </h1>
        <p className="text-base sm:text-lg text-rose-800 font-telugu font-semibold">
          తెలుగు భాషా బోధన • యువజన వికాసం • సమాజ సంక్షేమం
        </p>
        <p className="text-xs sm:text-sm text-[#5a483a] max-w-xl mx-auto font-normal">
          Passing our rich 2,500-year-old classical mother tongue to the next generation of American Telugu children growing up in Utah.
        </p>
      </div>

      {/* Program Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/15 text-amber-900 flex items-center justify-center border border-amber-600/25">
            <BookOpen className="w-6 h-6 text-amber-800" />
          </div>
          <h2 className="text-xl font-bold text-[#1c140e] font-display">UTA Telugu Badi (మనబడి)</h2>
          <p className="text-xs sm:text-sm text-[#5a483a] leading-relaxed">
            Our structured weekend language school operating in Salt Lake and Utah counties teaches reading, writing, and conversational fluency. Curriculum includes Telugu alphabets (Achulu, Hallulu, Guninthalu), moral verses (Sumathi Sathakam, Vemana Padyalu), and conversational practice.
          </p>
          <div className="pt-2 text-xs text-amber-800 font-bold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>Locations: South Jordan, Draper, Lehi</span>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-900/15 bg-white/95 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-600/15 text-sky-900 flex items-center justify-center border border-sky-600/25">
            <GraduationCap className="w-6 h-6 text-sky-800" />
          </div>
          <h2 className="text-xl font-bold text-[#1c140e] font-display">Youth Leadership & STEM</h2>
          <p className="text-xs sm:text-sm text-[#5a483a] leading-relaxed">
            Empowering high school and collegiate youth through hackathons, public speaking forums, leadership retreats, and annual collegiate scholarship grants. Students earn certified US Presidential Volunteer Service Award (PVSA) community hours.
          </p>
          <div className="pt-2 text-xs text-sky-800 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-700" />
            <span>Annual $2,500 Merit Scholarship Endowment</span>
          </div>
        </div>
      </div>

      {/* Senior & Family Fellowship */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-amber-50/60 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-[#1c140e] font-display">Senior Citizen Fellowship & Family Support</h2>
        <p className="text-xs sm:text-sm text-[#5a483a] leading-relaxed">
          Visiting parents and elderly seniors in Utah enjoy monthly tea gatherings, devotional bhajan sessions, yoga workshops, and community assistance navigating local healthcare and transportation.
        </p>
      </div>
    </div>
  );
}
