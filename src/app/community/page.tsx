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
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Community Initiatives
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Telugu Badi & Youth Education
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          తెలుగు భాషా బోధన • యువజన వికాసం • సమాజ సంక్షేమం
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Passing our rich 2,500-year-old classical mother tongue to the next generation of American Telugu children growing up in Utah.
        </p>
      </div>

      {/* Program Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-400/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">UTA Telugu Badi (మనబడి)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our structured weekend language school operating in Salt Lake and Utah counties teaches reading, writing, and conversational fluency. Curriculum includes Telugu alphabets (Achulu, Hallulu, Guninthalu), moral verses (Sumathi Sathakam, Vemana Padyalu), and conversational practice.
          </p>
          <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Locations: South Jordan, Draper, Lehi</span>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-400/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">Youth Leadership & STEM</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Empowering high school and collegiate youth through hackathons, public speaking forums, leadership retreats, and annual collegiate scholarship grants. Students earn certified US Presidential Volunteer Service Award (PVSA) community hours.
          </p>
          <div className="pt-2 text-xs text-sky-400 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Annual $2,500 Merit Scholarship Endowment</span>
          </div>
        </div>
      </div>

      {/* Senior & Family Fellowship */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Senior Citizen Fellowship & Family Support</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Visiting parents and elderly seniors in Utah enjoy monthly tea gatherings, devotional bhajan sessions, yoga workshops, and community assistance navigating local healthcare and transportation.
        </p>
      </div>
    </div>
  );
}
