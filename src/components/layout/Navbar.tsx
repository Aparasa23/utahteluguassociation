'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Users,
  Trophy,
  Activity,
  Sparkles,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Globe,
  Instagram,
  Sun,
  Flame,
  Clock,
  MapPin,
  ExternalLink,
  BookOpen,
  Award,
  ChevronRight,
  Home,
  Palette,
  FileText,
  Music,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const isDarkTheme = true;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTelugu, setIsTelugu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close mobile drawer and dropdowns automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open on small screens
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Telugu translations dictionary (Organized content pillars)
  const t = {
    brand: isTelugu ? 'ఉటా తెలుగు సంఘం' : 'UTAH TELUGU ASSOCIATION',
    subBrand: isTelugu ? 'సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు' : 'Rooted in Culture • Connected in Utah',
    culture: isTelugu ? 'సంస్కృతి & దేవాలయాలు' : 'Culture & Heritage',
    registrations: isTelugu ? 'నమోదు ఫారాలు' : 'Registrations',
    events: isTelugu ? 'కార్యక్రమాలు & స్కోర్లు' : 'Events & Scores',
    community: isTelugu ? 'కమ్యూనిటీ' : 'Community',
    gallery: isTelugu ? 'చిత్రమాలిక' : 'Gallery',
    membership: isTelugu ? 'సభ్యత్వ పాస్' : 'Member Passes',
    dashboard: isTelugu ? 'ఖాతా' : 'Dashboard',
    registerNow: isTelugu ? 'నమోదు చేసుకోండి' : 'Register / Passes',
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-card)] shadow-2xl'
          : 'bg-[#fffdf9] shadow-[0_4px_25px_rgba(180,83,9,0.06)]'
      }`}
    >
      {/* ======================================================== */}
      {/* 1. TOP AUSPICIOUS HERITAGE RIBBON (RESPONSIVE HEIGHT)    */}
      {/* ======================================================== */}
      <div
        className={`w-full border-b px-3 sm:px-6 lg:px-8 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium transition-colors ${
          isDarkTheme
            ? 'bg-[var(--bg-secondary)] border-b border-[var(--border-card)] text-[var(--accent-gold)]'
            : 'bg-[#f6eee2] border-amber-900/10 text-[#5a483a]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 overflow-hidden">
          {/* Left: Organization Heritage Info */}
          <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span
              className={`font-bold font-telugu shrink-0 ${
                isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-amber-950'
              }`}
            >
              {isTelugu ? 'ఉటా తెలుగు సంఘం' : 'UTA'}
            </span>
            <span className={isDarkTheme ? 'text-white/20 shrink-0' : 'text-amber-900/30 shrink-0'}>•</span>
            <span className={`truncate ${isDarkTheme ? 'text-white/70' : 'text-[#786454]'}`}>
              Participant Collaboration &amp; Cultural Heritage Portal
            </span>
          </div>

          {/* Right: Stage Schedule Alert & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs">
            {/* Stage Schedule Alert */}
            <Link
              href="/schedule"
              className="hidden md:flex items-center gap-1.5 font-bold transition-colors whitespace-nowrap text-[11px] text-[var(--accent-gold)] hover:text-[var(--accent-gold-light)]"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[var(--accent-gold)] animate-pulse" />
              <span>Participant Stage Collaboration &amp; Audio Validation Hub Active</span>
            </Link>

            <span className={isDarkTheme ? 'hidden md:inline text-white/20' : 'hidden md:inline text-amber-900/20'}>|</span>

            {/* Language Switcher */}
            <button
              onClick={() => setIsTelugu(!isTelugu)}
              aria-label="Toggle language between English and Telugu"
              className={`px-1.5 sm:px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold text-[10px] sm:text-xs transition-colors whitespace-nowrap border ${
                isDarkTheme
                  ? 'bg-[var(--accent-gold)]/15 hover:bg-[var(--accent-gold)]/25 text-[var(--accent-gold)] border-[var(--accent-gold)]/30'
                  : 'bg-amber-600/10 hover:bg-amber-600/20 text-amber-900 border-amber-600/25'
              }`}
            >
              <Globe className={`w-3 h-3 shrink-0 ${isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-amber-800'}`} />
              <span>{isTelugu ? 'English' : 'తెలుగు'}</span>
            </button>

            <span className="text-white/20">|</span>

            {/* 10 Themes & Vote Switcher Trigger */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('uta_open_theme_switcher'));
                }
              }}
              aria-label="Open 10 Themes and Voting Palette"
              className="px-2 py-0.5 rounded-lg flex items-center gap-1.5 font-bold text-[10px] sm:text-xs transition-all whitespace-nowrap border bg-[var(--accent-gold)]/15 hover:bg-[var(--accent-gold)]/30 text-[var(--accent-gold)] border-[var(--accent-gold)]/35 shadow-sm hover:scale-105"
            >
              <Palette className="w-3 h-3 text-[var(--accent-gold)] shrink-0" />
              <span>🎨 10 Themes &amp; Vote</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN NAV CONTAINER (RESPONSIVELY SIZED: 64px TO 80px) */}
      {/* ======================================================== */}
      <div
        className={`w-full backdrop-blur-xl border-b transition-colors ${
          isDarkTheme
            ? 'bg-[var(--bg-primary)]/85 backdrop-blur-xl border-b border-[var(--border-card)]'
            : 'bg-[#fffdf9]/98 border-amber-900/15'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-2 sm:gap-4">
            
            {/* BRAND LOGO & STATELY TYPOGRAPHY (FLUID SIZING & ZERO OVERFLOW) */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0 select-none">
              <div
                className={`relative w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl border shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-0.5 sm:p-1 shrink-0 ${
                  isDarkTheme
                    ? 'bg-[var(--bg-card)] border-[var(--border-card)]'
                    : 'bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-amber-100/40 border-amber-900/15'
                }`}
              >
                <img
                  src="/images/uta_logo.png"
                  alt="Utah Telugu Association Official Logo"
                  className="w-full h-full object-contain shrink-0 drop-shadow-sm"
                  width={48}
                  height={51}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs sm:text-sm md:text-base lg:text-lg font-black font-display tracking-tight transition-colors flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                    isDarkTheme
                      ? 'text-white group-hover:text-[var(--accent-gold)]'
                      : 'text-[#1c140e] group-hover:text-amber-800'
                  }`}
                >
                  <span>{t.brand}</span>
                  <span
                    className={`text-[8px] sm:text-[9px] lg:text-[10px] font-bold px-1 sm:px-1.5 py-0.2 rounded-full font-mono tracking-wider uppercase shrink-0 border ${
                      isDarkTheme
                        ? 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border-[var(--accent-gold)]/40'
                        : 'bg-amber-600/10 text-amber-900 border-amber-600/20'
                    }`}
                  >
                    UTAH
                  </span>
                </span>
                <p
                  className={`text-[10px] sm:text-[11px] font-medium font-telugu leading-tight whitespace-nowrap truncate hidden sm:block ${
                    isDarkTheme ? 'text-[var(--accent-gold)]/80' : 'text-[#6e5949]'
                  }`}
                >
                  {t.subBrand}
                </p>
              </div>
            </Link>

            {/* SYSTEMATICALLY ORGANIZED DESKTOP NAVIGATION TABS */}
            <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold shrink-0 text-white/85">
              {/* 1. CULTURE & HERITAGE DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('culture')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/culture') || pathname === '/temple-calendar' || pathname === '/community' || pathname === '/history'
                      ? 'text-[var(--accent-gold)] bg-[var(--accent-gold)]/20 font-bold border border-[var(--accent-gold)]/30'
                      : 'hover:text-[var(--accent-gold)] hover:bg-white/10'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>{t.culture}</span>
                  <ChevronDown className="w-3 h-3 text-[var(--accent-gold)]/70" />
                </button>

                {activeDropdown === 'culture' && (
                  <div className="absolute top-full left-0 w-72 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50 glass-panel bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-card)]">
                    <Link
                      href="/culture"
                      className="block px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Telugu Cultural Blogs</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">23+ Scholarly festival accounts</span>
                      </div>
                    </Link>

                    <Link
                      href="/temple-calendar"
                      className="block px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl flex items-center gap-2"
                    >
                      <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Temple Calendar &amp; Panchangam</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Utah Mountain Time daily tithi &amp; temples</span>
                      </div>
                    </Link>

                    <Link
                      href="/community"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <div>
                        <span className="block">Telugu Badi Language School</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Youth language &amp; culture classes</span>
                      </div>
                    </Link>

                    <Link
                      href="/history"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-rose-400" />
                      <div>
                        <span className="block">UTA History &amp; 25-Year Heritage</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Pioneering Telugu families in Utah</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. REGISTRATION FORMS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('registrations')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/registrations') || pathname.startsWith('/events/sankranthi-2027/register') || pathname === '/performances'
                      ? 'text-[var(--accent-gold)] bg-[var(--accent-gold)]/20 font-bold border border-[var(--accent-gold)]/30'
                      : 'hover:text-[var(--accent-gold)] hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>{t.registrations}</span>
                  <ChevronDown className="w-3 h-3 text-[var(--accent-gold)]/70" />
                </button>

                {activeDropdown === 'registrations' && (
                  <div className="absolute top-full left-0 w-80 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50 glass-panel bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-card)]">
                    <Link
                      href="/events/sankranthi-2027/register"
                      className="block px-3 py-2.5 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 rounded-xl border border-amber-400 shadow-sm flex items-center justify-between mb-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-950" />
                        <span>Sankranthi 2027 Passes &amp; Contests</span>
                      </div>
                      <span className="text-[9px] bg-slate-900 text-amber-300 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                        FLAGSHIP
                      </span>
                    </Link>

                    <Link
                      href="/performances"
                      className="block px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl flex items-center gap-2"
                    >
                      <Music className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Stage Performance Registration</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Dance, singing &amp; audio track audit</span>
                      </div>
                    </Link>

                    <Link
                      href="/membership/join"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <span className="block">Annual Family Membership</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">$50/Year family enrollment &amp; pass</span>
                      </div>
                    </Link>

                    <Link
                      href="/volunteer"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
                      <div>
                        <span className="block">Community Volunteer Signup</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Event shifts &amp; youth service hours</span>
                      </div>
                    </Link>

                    <div className="border-t border-white/10 mt-1 pt-1">
                      <Link
                        href="/registrations"
                        className="block px-3 py-1.5 text-[11px] font-bold text-[var(--accent-gold)] hover:underline flex items-center justify-between"
                      >
                        <span>View All Registration Forms Hub</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. EVENTS & LIVE SCORES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('events')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/events') || pathname.startsWith('/schedule')
                      ? 'text-[var(--accent-gold)] bg-[var(--accent-gold)]/20 font-bold border border-[var(--accent-gold)]/30'
                      : 'hover:text-[var(--accent-gold)] hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>{t.events}</span>
                  <ChevronDown className="w-3 h-3 text-[var(--accent-gold)]/70" />
                </button>

                {activeDropdown === 'events' && (
                  <div className="absolute top-full left-0 w-72 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50 glass-panel bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-card)]">
                    <Link
                      href="/events/sankranthi-2027"
                      className="block px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Sankranthi 2027 Weekend</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Jan 15–23, 2027 full festival guide</span>
                      </div>
                    </Link>

                    <Link
                      href="/events/live-scores"
                      className="block px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/10 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <div>
                          <span className="block text-emerald-300">Live Match Scores &amp; Wins</span>
                          <span className="text-[10px] text-emerald-200/70 font-normal">Pickleball, Volleyball &amp; Rangoli</span>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                        LIVE
                      </span>
                    </Link>

                    <Link
                      href="/schedule"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Stage Run-of-Show &amp; Calls</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Timeline &amp; T-30m Green Room alerts</span>
                      </div>
                    </Link>

                    <Link
                      href="/events"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>All Association Events</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. ABOUT & COMMUNITY DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('community')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/about') || pathname.startsWith('/gallery') || pathname === '/leadership' || pathname === '/contact' || pathname === '/sponsors'
                      ? 'text-[var(--accent-gold)] bg-[var(--accent-gold)]/20 font-bold border border-[var(--accent-gold)]/30'
                      : 'hover:text-[var(--accent-gold)] hover:bg-white/10'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>{t.community}</span>
                  <ChevronDown className="w-3 h-3 text-[var(--accent-gold)]/70" />
                </button>

                {activeDropdown === 'community' && (
                  <div className="absolute top-full left-0 w-72 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 z-50 glass-panel bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-card)]">
                    <Link
                      href="/about"
                      className="block px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">About UTA &amp; Mission</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">501(c)(3) Foundation &amp; Telugu heritage</span>
                      </div>
                    </Link>

                    <Link
                      href="/leadership"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <div>
                        <span className="block">Executive Committee</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Board trustees &amp; organizers</span>
                      </div>
                    </Link>

                    <Link
                      href="/gallery"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <div>
                        <span className="block">Photo &amp; Video Gallery</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Festival memories &amp; performances</span>
                      </div>
                    </Link>

                    <Link
                      href="/sponsors"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <span className="block">Community Patrons &amp; Partners</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Local business sponsors &amp; supporters</span>
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-xs font-semibold rounded-xl text-white/90 hover:text-[var(--accent-gold)] hover:bg-white/10 flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <span className="block">Contact Coordinators</span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-normal">Utah Telugu Association team</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* RIGHT UTILITIES: REGISTRATION PASSES CTA & MEMBER PASS */}
            <div className="hidden xl:flex items-center gap-2.5 shrink-0">
              <Link
                href="/registrations"
                className="px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md shrink-0 whitespace-nowrap bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-white border border-amber-400/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>{t.registerNow}</span>
              </Link>

              <Link
                href="/dashboard"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm whitespace-nowrap border ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border-[var(--accent-gold)]/40'
                    : 'text-white/80 hover:text-white hover:bg-white/10 border-white/15'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{t.membership}</span>
              </Link>
            </div>

            {/* MOBILE & TABLET ACTION BAR (< XL BREAKPOINT) */}
            <div className="flex xl:hidden items-center gap-2 shrink-0">
              <Link
                href="/registrations"
                className="px-2.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-bold transition-colors bg-gradient-to-r from-amber-500 to-amber-600 text-white"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Register</span>
              </Link>

              <Link
                href="/temple-calendar"
                className="px-2.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-bold transition-colors border border-[var(--border-card)] text-white/90 bg-white/5"
              >
                <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>Calendar</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 border text-white hover:bg-white/10 border-white/20"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[var(--accent-gold)]" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MOBILE RESPONSIVE DRAWER                              */}
        {/* ======================================================== */}
        {mobileMenuOpen && (
          <div
            className="xl:hidden w-full border-t backdrop-blur-2xl max-h-[calc(100vh-90px)] overflow-y-auto px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 shadow-2xl bg-[var(--bg-primary)]/98 border-[var(--accent-gold)]/25 text-white"
          >
            {/* Featured Registration Banner in Mobile Menu */}
            <Link
              href="/registrations"
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[var(--bg-primary)] via-[#102d36] to-[var(--bg-primary)] text-white flex items-center justify-between shadow-lg shadow-black/40 border border-[var(--accent-gold)]/40 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] shrink-0 border border-[var(--accent-gold)]/30">
                  <FileText className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black tracking-wide uppercase text-white font-serif">
                      All Registration Forms &amp; Passes
                    </h4>
                    <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                      OPEN
                    </span>
                  </div>
                  <p className="text-[11px] text-[#e6d6be] font-medium">
                    Sankranthi Passes, Stage Performances, Membership &amp; Volunteer
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--accent-gold)] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Quick 4-Column Action Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/registrations"
                className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-2.5 shadow-sm"
              >
                <div className="p-2 rounded-xl bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] shrink-0">
                  <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Registrations</h4>
                  <p className="text-[10px] text-[var(--accent-gold)] font-medium">All Forms &amp; Passes</p>
                </div>
              </Link>

              <Link
                href="/temple-calendar"
                className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-2.5 shadow-sm"
              >
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <Sun className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Temple Calendar</h4>
                  <p className="text-[10px] text-amber-300 font-medium">Vedic Panchangam</p>
                </div>
              </Link>

              <Link
                href="/culture"
                className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-2.5 shadow-sm"
              >
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                  <BookOpen className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Cultural Blogs</h4>
                  <p className="text-[10px] text-purple-300 font-medium">23+ Telugu Lore</p>
                </div>
              </Link>

              <Link
                href="/events/live-scores"
                className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center gap-2.5 shadow-sm"
              >
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
                  <Activity className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Live Scores</h4>
                  <p className="text-[10px] text-emerald-300 font-medium">Tournament Board</p>
                </div>
              </Link>
            </div>

            {/* Categorized Navigation Links */}
            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] px-3 block">
                Association Sections
              </span>

              <Link
                href="/registrations"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[var(--accent-gold)] hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Registration Forms &amp; Passes Hub</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/temple-calendar"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Temple Calendar &amp; Panchangam</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/culture"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Telugu Cultural Blogs &amp; Heritage</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/events/live-scores"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-300 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Live Match Scores &amp; Event Wins</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/schedule"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Stage Performance Schedule &amp; SMS Calls</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/gallery"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Photo &amp; Video Memories</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/events"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Upcoming Festivals &amp; Events</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/membership"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Family Membership Plans</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>About UTA &amp; 501(c)(3) Mission</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/leadership"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Executive Committee &amp; Leadership</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/sponsors"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Community Patrons &amp; Sponsors</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Contact Coordinators</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-white/10 pt-3 space-y-2">
              <Link
                href="/registrations"
                className="w-full py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Open Registration Forms</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
