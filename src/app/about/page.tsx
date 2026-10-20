import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, MapPin, Users, Award, Calendar } from 'lucide-react';

export const metadata = {
  title: 'About UTA — Utah Telugu Association',
  description: 'History, mission, constitutional governance, and community values of Utah Telugu Association.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Our Foundation & Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          About Utah Telugu Association
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          ఉటా తెలుగు సంఘం — సంస్కృతి, సేవ, సమాజం
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The Utah Telugu Association (UTA) is an official 501(c)(3) non-profit organization dedicated to fostering cultural harmony, celebrating classical and folk Telugu traditions, teaching the Telugu mother tongue to youth through our weekend Telugu Badi language schools, and supporting community integration across the Wasatch Front.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To build an inclusive, progressive, and deeply rooted community platform where every Telugu individual and family in Utah finds cultural connection, professional fellowship, youth leadership mentorship, and mutual civic support.
          </p>
        </div>
      </div>

      {/* Association Pillars */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white font-display text-center">
          Pillars of Utah Telugu Association
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Cultural Celebrations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flagship community festivals including Sankranthi Sambaralu, Ugadi Vasantotsavam, Bathukamma, and Diwali.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Youth & Telugu Education</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Weekend Telugu Badi language programs, cultural workshops, STEM scholarships, and dance performance academies.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Sports & Wellness</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utah Premier Cricket leagues, volleyball cups, pickleball tournaments, 5K fitness runs, and family summer picnics.
            </p>
          </div>
        </div>
      </div>

      {/* Non-Profit & Governance Transparency */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">501(c)(3) Non-Profit Transparency</h3>
          <p className="text-xs text-slate-400 mt-1">
            All donations and sponsorships are tax-deductible under US federal tax laws. View our annual budgets and bylaws.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/reports"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Annual Reports
          </Link>
          <Link
            href="/leadership"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
          >
            Executive Leadership
          </Link>
        </div>
      </div>
    </div>
  );
}
