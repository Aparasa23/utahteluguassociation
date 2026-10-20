'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Music,
  Users,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';

const REGISTRATION_ITEMS = [
  {
    id: 'sankranthi-2027',
    title: 'Sankranthi 2027 Festival Passes & Tournaments',
    teluguTitle: 'సంక్రాంతి సంబరాలు 2027 నమోదు',
    badge: 'FLAGSHIP CELEBRATION',
    badgeColor: 'bg-[var(--accent-gold)] text-[var(--bg-primary)]',
    description:
      'Unified registration suite for the main cultural festival, traditional Rangoli (Muggulu) contest, Desi Pickleball League doubles, and Walkers Volleyball championship.',
    deadline: 'January 10, 2027',
    dates: 'January 15 – 23, 2027',
    pricing: 'Free for Active Members • General Admission Available',
    href: '/events/sankranthi-2027/register',
    icon: Sparkles,
    highlights: [
      'Main Cultural Event & Grand Traditional Dinner',
      'Traditional Rangoli (Muggulu) Competition',
      'DPL Pickleball Tournament (Doubles)',
      'Walkers Volleyball Championship',
    ],
  },
  {
    id: 'stage-performances',
    title: 'Cultural Stage Performance & Talent Registration',
    teluguTitle: 'సాంస్కృతిక ప్రదర్శనల నమోదు',
    badge: 'STAGE SLOTS ACTIVE',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    description:
      'Submit stage performances for classical Kuchipudi, folk dance, Carnatic vocal music, and cinematic medleys. Includes automated audio track duration audit (< 5:00 min cap) and emcee bio proofreading.',
    deadline: 'January 8, 2027 (Strict Audio Deadline)',
    dates: 'January 23, 2027',
    pricing: 'Free for Community Troupes & Academies',
    href: '/performances',
    icon: Music,
    highlights: [
      'Strict 5:00 minute maximum audio duration',
      'Automated MP3/WAV file format & length check',
      'T-30 min Green Room backstage calls',
      'Emcee cue sheet with phonetic name pronunciations',
    ],
  },
  {
    id: 'membership-join',
    title: 'UTA Annual Family Membership Enrollment',
    teluguTitle: 'ఉటా కుటుంబ సభ్యత్వ నమోదు',
    badge: '2027 ENROLLMENT OPEN',
    badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    description:
      'Enroll your family for the 2027 calendar year ($50/Year). Includes complimentary festival entry passes, digital wallet QR card, Telugu Badi tuition discounts, and general body voting rights.',
    deadline: 'Open Year-Round (Renew Before Jan 15 for Free Passes)',
    dates: 'Valid Full Year 2027',
    pricing: '$50.00 / Year (Entire Family)',
    href: '/membership/join',
    icon: Users,
    highlights: [
      'Complimentary passes to Sankranthi & Ugadi celebrations',
      'Instant Apple Wallet & Google Wallet digital ID pass',
      'Telugu Badi youth language school tuition fee waiver',
      'Tax-deductible non-profit community contribution receipt',
    ],
  },
  {
    id: 'volunteer-signup',
    title: 'Community Volunteer & Stage Crew Network',
    teluguTitle: 'స్వచ్ఛంద సేవకుల నమోదు',
    badge: 'ALL WELCOME',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
    description:
      'Join the 100% volunteer-run Utah Telugu Association team. Volunteer for guest check-in, traditional feast coordination, stage management, audio engineering, and youth certified community service hours.',
    deadline: 'Rolling Signups',
    dates: 'Flexible Shifts',
    pricing: 'Free • Volunteer T-Shirt & Meal Included',
    href: '/volunteer',
    icon: HeartHandshake,
    highlights: [
      'President’s Volunteer Service Award (PVSA) eligible hours',
      'Youth high school graduation community service certification',
      'Backstage artist coordination & emcee support',
      'Exclusive volunteer appreciation banquet recognition',
    ],
  },
];

export default function RegistrationsHubPage() {
  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>OFFICIAL UTA REGISTRATIONS &amp; PASSES HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Registration Forms &amp; Passes
        </h1>
        <p className="text-base sm:text-lg text-[var(--accent-gold)] font-telugu font-semibold">
          నమోదు ఫారాలు &amp; ప్రవేశ పాస్‌లు
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
          One centralized portal for all Utah Telugu Association registrations. Register for upcoming festival passes, cultural stage performances, family memberships, and volunteer shifts.
        </p>
      </div>

      {/* Grid of Registration Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REGISTRATION_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl flex flex-col justify-between space-y-6 hover:border-[var(--accent-gold)]/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Badge & Icon Row */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] flex items-center justify-center shrink-0 border border-[var(--border-card)] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Lore */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug group-hover:text-[var(--accent-gold)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--accent-gold-light)] font-telugu font-semibold mt-1">
                    {item.teluguTitle}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {/* Key Details: Dates & Pricing */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Event Timing</span>
                    <span className="text-white font-semibold">{item.dates}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px] uppercase font-bold">Cost / Fees</span>
                    <span className="text-[var(--accent-gold)] font-bold">{item.pricing}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                    Form Includes:
                  </span>
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href={item.href}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg group-hover:shadow-amber-500/20"
                >
                  <span>Open Registration Form</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Already Registered / Pass Lookup Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Already Registered? Access Your Digital QR Pass
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Registered attendees, performers, and members can view their barcode passes, update participant names, or check audio track audit status anytime in the member portal.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>My Registrations &amp; Passes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
