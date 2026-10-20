'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Menu,
  X,
  Volume2,
  VolumeX,
  Eye,
  ChevronDown,
  Globe,
  Ticket,
} from 'lucide-react';

interface NavbarProps {
  onToggle3D?: () => void;
  is3DMode?: boolean;
}

export function Navbar({ onToggle3D, is3DMode = false }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTelugu, setIsTelugu] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [membershipDropdown, setMembershipDropdown] = useState(false);
  const [cultureDropdown, setCultureDropdown] = useState(false);

  // Telugu translations dictionary for key labels
  const t = {
    brand: isTelugu ? 'యూటా డిజిటల్ యూనివర్స్' : 'UTA DIGITAL UNIVERSE',
    subBrand: isTelugu ? 'ఉటా తెలుగు సంఘం' : 'Utah Telugu Association',
    experience3D: isTelugu ? '3D సాంస్కృతిక ప్రపంచం' : '3D Universe',
    about: isTelugu ? 'మా గురించి' : 'About',
    membership: isTelugu ? 'సభ్యత్వం' : 'Membership',
    events: isTelugu ? 'కార్యక్రమాలు' : 'Events',
    culture: isTelugu ? 'సంస్కృతి' : 'Culture',
    sports: isTelugu ? 'క్రీడలు' : 'Sports',
    sponsors: isTelugu ? 'దాతలు' : 'Sponsors',
    volunteer: isTelugu ? 'స్వచ్ఛంద సేవ' : 'Volunteer',
    dashboard: isTelugu ? 'నా ఖాతా' : 'Dashboard',
    admin: isTelugu ? 'నిర్వాహక విభాగం' : 'Admin',
    joinNow: isTelugu ? 'చేరండి' : 'Join UTA',
  };

  const navLinks = [
    { href: '/about', label: t.about },
    { href: '/events', label: t.events },
    { href: '/culture', label: t.culture },
    { href: '/sports', label: t.sports },
    { href: '/sponsors', label: t.sponsors },
    { href: '/volunteer', label: t.volunteer },
    { href: '/gallery', label: isTelugu ? 'చిత్రమాలిక' : 'Gallery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-[#060a17]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-rose-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center text-amber-400 font-bold font-display text-lg">
                UTA
              </div>
            </div>
            <div>
              <span className="text-lg font-bold font-display tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                {t.brand}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-mono">
                  Utah
                </span>
              </span>
              <p className="text-xs text-slate-400 font-telugu">
                {isTelugu ? 'సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు' : 'Rooted in Culture. Connected in Utah.'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/'
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.experience3D}</span>
            </Link>

            {/* Membership Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMembershipDropdown(true)}
              onMouseLeave={() => setMembershipDropdown(false)}
            >
              <button
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  pathname.startsWith('/membership')
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{t.membership}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {membershipDropdown && (
                <div className="absolute top-full left-0 w-56 rounded-xl glass-panel bg-[#0b132b] shadow-2xl p-2 border border-white/10 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/membership/plans"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg"
                  >
                    Membership Plans & Dues
                  </Link>
                  <Link
                    href="/membership/join"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg"
                  >
                    Enroll Family / Join Now
                  </Link>
                  <Link
                    href="/membership/renew"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg"
                  >
                    Renew Membership
                  </Link>
                  <Link
                    href="/membership/verify"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg"
                  >
                    Verify Member Pass
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Language, Sound, 3D Toggle, Dashboard */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setIsTelugu(!isTelugu)}
              aria-label="Toggle language between English and Telugu"
              className="p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors border border-white/5 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTelugu ? 'తెలుగు' : 'EN'}</span>
            </button>

            {/* Dashboard / Member Link */}
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/dashboard')
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.dashboard}</span>
            </Link>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/admin')
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.admin}</span>
            </Link>

            {/* Join UTA Action Button */}
            <Link
              href="/membership/join"
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.joinNow}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsTelugu(!isTelugu)}
              className="p-2 text-xs font-bold text-amber-400 border border-white/10 rounded-lg"
            >
              {isTelugu ? 'తెలుగు' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel bg-[#060a17]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-amber-400 bg-amber-400/10 font-medium"
          >
            <Compass className="w-4 h-4" />
            <span>{t.experience3D}</span>
          </Link>
          <Link
            href="/membership/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          >
            {t.membership}
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 text-slate-200 text-sm font-semibold"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>{t.dashboard}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-rose-500/10 text-rose-300 text-sm font-semibold border border-rose-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.admin}</span>
            </Link>
            <Link
              href="/membership/join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.joinNow}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
