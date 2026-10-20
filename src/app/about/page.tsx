import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, MapPin, Users, Award, Calendar } from 'lucide-react';

export const metadata = {
  title: 'About UTA — Utah Telugu Association',
  description: 'History, mission, constitutional governance, and community values of Utah Telugu Association.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-[var(--text-primary)]">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4bb59]/15 border border-[var(--border-card)] text-[#ffd18a] text-xs font-bold uppercase tracking-wider">
          <span>Our Foundation & Heritage • 501(c)(3)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          About Utah Telugu Association
        </h1>
        <p className="text-base sm:text-lg text-[#ffcb75] font-telugu font-semibold">
          ఉటా తెలుగు సంఘం — సంస్కృతి, సేవ, సమాజం
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#f4bb59]/20 text-[var(--accent-gold)] flex items-center justify-center">
            <Heart className="w-5 h-5 text-[var(--accent-gold)]" />
          </div>
          <h2 className="text-xl font-bold text-white font-serif">Our Mission</h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
            The Utah Telugu Association (UTA) is an official 501(c)(3) non-profit organization dedicated to fostering cultural harmony, celebrating classical and folk Telugu traditions, teaching the Telugu mother tongue to youth through our weekend Telugu Badi language schools, and supporting community integration across the Wasatch Front.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-[#34d399] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#34d399]" />
          </div>
          <h2 className="text-xl font-bold text-white font-serif">Our Vision</h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
            To build an inclusive, progressive, and deeply rooted community platform where every Telugu individual and family in Utah finds cultural connection, professional fellowship, youth leadership mentorship, and mutual civic support.
          </p>
        </div>
      </div>

      {/* Association Pillars */}
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-card)] bg-gradient-to-b from-[#09222c] to-[#071a20] shadow-xl space-y-6">
        <h2 className="text-2xl font-black text-white font-serif text-center">
          Pillars of Utah Telugu Association
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#f4bb59]/15 text-[var(--accent-gold)] flex items-center justify-center mx-auto border border-[var(--border-card)]">
              <Calendar className="w-6 h-6 text-[var(--accent-gold)]" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">Cultural Celebrations</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
              Flagship community festivals including Sankranthi Sambaralu, Ugadi Vasantotsavam, Bathukamma, and Diwali.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-600/15 text-[#38bdf8] flex items-center justify-center mx-auto border border-[#38bdf8]/30">
              <Award className="w-6 h-6 text-[#38bdf8]" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">Youth & Telugu Education</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
              Weekend Telugu Badi language programs, cultural workshops, STEM scholarships, and dance performance academies.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/15 text-[#fb7185] flex items-center justify-center mx-auto border border-[#fb7185]/30">
              <Users className="w-6 h-6 text-[#fb7185]" />
            </div>
            <h3 className="font-bold text-white text-base font-serif">Sports & Wellness</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
              Utah Premier Cricket leagues, volleyball cups, pickleball tournaments, 5K fitness runs, and family summer picnics.
            </p>
          </div>
        </div>
      </div>

      {/* Non-Profit & Governance Transparency */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel bg-[#0e2730] border border-[var(--border-card)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-serif">501(c)(3) Non-Profit Transparency</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1 font-normal">
            All donations and sponsorships are tax-deductible under US federal tax laws. View our annual budgets and bylaws.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/reports"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-[#f4bb59] text-xs font-bold transition-colors"
          >
            Annual Reports
          </Link>
          <Link
            href="/leadership"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] hover:brightness-110 text-[#071a20] text-xs font-bold shadow-md transition-all"
          >
            Executive Leadership
          </Link>
        </div>
      </div>
    </div>
  );
}
