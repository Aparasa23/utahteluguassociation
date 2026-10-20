'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Flame,
  QrCode,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Download,
  AlertCircle,
  Plus,
  Minus,
  Check,
  Palette,
  Heart,
  ChevronDown,
  RefreshCw,
  UserCheck,
  HeartHandshake,
  ExternalLink,
  Eye,
  X,
} from 'lucide-react';

interface CinematicFormOverlayProps {
  currentScene: number;
  onJumpToScene: (scene: number) => void;
  selectedPortal: 'member' | 'guest' | 'volunteer' | null;
  onSelectPortal: (portal: 'member' | 'guest' | 'volunteer') => void;
  // Contact
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  // Membership
  memberInput: string;
  setMemberInput: (v: string) => void;
  isVerifying: boolean;
  isVerifiedMember: boolean;
  memberData: any;
  verifyError: string;
  onVerifyMembership: (override?: string) => void;
  // Volunteer
  volunteerRole: string;
  setVolunteerRole: (v: string) => void;
  volunteerAvailability: string;
  setVolunteerAvailability: (v: string) => void;
  // Attendees
  adultCount: number;
  setAdultCount: (v: number) => void;
  childCount: number;
  setChildCount: (v: number) => void;
  attendeeNames: string;
  setAttendeeNames: (v: string) => void;
  // Events
  selectedEvents: string[];
  toggleEvent: (k: string) => void;
  // Rangoli
  rangoliTheme: string;
  setRangoliTheme: (v: string) => void;
  rangoliFormat: string;
  setRangoliFormat: (v: string) => void;
  rangoliAgeBracket: string;
  setRangoliAgeBracket: (v: string) => void;
  rangoliColorKit: boolean;
  setRangoliColorKit: (v: boolean) => void;
  rangoliTeamMembers: string;
  setRangoliTeamMembers: (v: string) => void;
  // Pickleball
  pickleballEntry: string;
  setPickleballEntry: (v: string) => void;
  pickleballDivision: string;
  setPickleballDivision: (v: string) => void;
  pickleballSkill: string;
  setPickleballSkill: (v: string) => void;
  pickleballPartnerName: string;
  setPickleballPartnerName: (v: string) => void;
  pickleballPartnerEmail: string;
  setPickleballPartnerEmail: (v: string) => void;
  pickleballEmergencyPhone: string;
  setPickleballEmergencyPhone: (v: string) => void;
  // Volleyball
  volleyballEntry: string;
  setVolleyballEntry: (v: string) => void;
  volleyballTeamName: string;
  setVolleyballTeamName: (v: string) => void;
  volleyballDivision: string;
  setVolleyballDivision: (v: string) => void;
  volleyballCaptainPhone: string;
  setVolleyballCaptainPhone: (v: string) => void;
  volleyballRoster: string;
  setVolleyballRoster: (v: string) => void;
  // Grand Festival
  festivalDinnerCount: number;
  setFestivalDinnerCount: (v: number) => void;
  festivalIsPerformer: boolean;
  setFestivalIsPerformer: (v: boolean) => void;
  // Summary & Actions
  pricing: { subtotal: number; memberDiscount: number; total: number };
  isSubmitting: boolean;
  submissionSuccess: boolean;
  registrationResult: any;
  onSubmit: (e: React.FormEvent) => void;
  onDownloadCalendar: () => void;
  viewMode?: 'stepped' | 'continuous';
}

export function CinematicFormOverlay({
  currentScene,
  onJumpToScene,
  selectedPortal,
  onSelectPortal,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  city,
  setCity,
  memberInput,
  setMemberInput,
  isVerifying,
  isVerifiedMember,
  memberData,
  verifyError,
  onVerifyMembership,
  volunteerRole,
  setVolunteerRole,
  volunteerAvailability,
  setVolunteerAvailability,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  attendeeNames,
  setAttendeeNames,
  selectedEvents,
  toggleEvent,
  rangoliTheme,
  setRangoliTheme,
  rangoliFormat,
  setRangoliFormat,
  rangoliAgeBracket,
  setRangoliAgeBracket,
  rangoliColorKit,
  setRangoliColorKit,
  rangoliTeamMembers,
  setRangoliTeamMembers,
  pickleballEntry,
  setPickleballEntry,
  pickleballDivision,
  setPickleballDivision,
  pickleballSkill,
  setPickleballSkill,
  pickleballPartnerName,
  setPickleballPartnerName,
  pickleballPartnerEmail,
  setPickleballPartnerEmail,
  pickleballEmergencyPhone,
  setPickleballEmergencyPhone,
  volleyballEntry,
  setVolleyballEntry,
  volleyballTeamName,
  setVolleyballTeamName,
  volleyballDivision,
  setVolleyballDivision,
  volleyballCaptainPhone,
  setVolleyballCaptainPhone,
  volleyballRoster,
  setVolleyballRoster,
  festivalDinnerCount,
  setFestivalDinnerCount,
  festivalIsPerformer,
  setFestivalIsPerformer,
  pricing,
  isSubmitting,
  submissionSuccess,
  registrationResult,
  onSubmit,
  onDownloadCalendar,
  viewMode = 'stepped',
}: CinematicFormOverlayProps) {
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  // If confirmed, jump to Stage 6
  const activeStage = submissionSuccess ? 6 : currentScene;

  return (
    <div className="relative z-20 pointer-events-auto max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Flyer Zoom Modal */}
      {showFlyerModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowFlyerModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] w-full rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFlyerModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/images/events/sankranthi-2027-flyer.jpg"
              alt="Official Sankranthi 2027 Flyer"
              className="w-full h-auto object-contain max-h-[85vh] mx-auto"
            />
          </div>
        </div>
      )}

      {/* Hero Header Ribbon */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>UTAH TELUGU ASSOCIATION • SANKRANTHI CELEBRATIONS 2027</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
          A Weekend of Sports, Culture & Celebration!
        </h1>
        <p className="text-sm sm:text-base font-telugu text-rose-400 font-bold">
          సంక్రాంతి సంబరాలు 2027 • జనవరి 15–17 & 23, 2027
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400 pt-1">
          <span>Jan 15–17 & Jan 23, 2027</span>
          <span>•</span>
          <span>Salt Lake County & Herriman, Utah</span>
          <span>•</span>
          <button
            type="button"
            onClick={() => setShowFlyerModal(true)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 transition-all"
          >
            <div className="w-5 h-7 relative rounded overflow-hidden border border-amber-500/50">
              <img
                src="/images/events/sankranthi-2027-flyer.jpg"
                alt="Flyer thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold">View Official Event Flyer</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          STAGE 1: REGISTRATION CATEGORY PORTAL
          ========================================================================= */}
      {(viewMode === 'continuous' || activeStage === 1) && (
        <section
          id="stage-1"
          className="mb-12 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-6 animate-fadeIn"
        >
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STAGE 01 // CATEGORY SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white uppercase">
              Choose Your Registration Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select who is registering. Active UTA Members receive 100% Free Festival Passes and waived sports fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {/* 1. Member Portal */}
            <div
              onClick={() => onSelectPortal('member')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative bg-black/60 flex flex-col justify-between group ${
                selectedPortal === 'member'
                  ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.35)] scale-[1.02]'
                  : 'border-white/10 hover:border-amber-400/50 hover:bg-black/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase bg-amber-400 text-black">
                    RECOMMENDED
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300">
                    UTA Member Family
                  </h3>
                  <div className="text-xs font-telugu text-amber-300 font-bold">ఉటా సభ్యులు</div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  For active UTA Member families. Enjoy <strong>100% Free VIP Passes</strong>, Free Rangoli Entry, and 50% Sports Tournament Discounts.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">★ 100% Free VIP Passes</span>
                <span className={`font-bold flex items-center gap-1 ${selectedPortal === 'member' ? 'text-amber-400' : 'text-zinc-400'}`}>
                  {selectedPortal === 'member' ? 'Selected ✓' : 'Select'}
                </span>
              </div>
            </div>

            {/* 2. Guest Portal */}
            <div
              onClick={() => onSelectPortal('guest')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative bg-black/60 flex flex-col justify-between group ${
                selectedPortal === 'guest'
                  ? 'border-rose-400 bg-rose-950/20 shadow-[0_0_30px_rgba(244,63,94,0.35)] scale-[1.02]'
                  : 'border-white/10 hover:border-rose-400/50 hover:bg-black/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                    <UserCheck className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-zinc-800 text-zinc-300">
                    COMMUNITY
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-rose-300">
                    Community Guest
                  </h3>
                  <div className="text-xs font-telugu text-rose-300 font-bold">అతిథులు</div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  For visiting Telugu families and friends. General admission festival passes, tournament player entries, and authentic banquet feast tickets.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">From $9.99 / pass</span>
                <span className={`font-bold flex items-center gap-1 ${selectedPortal === 'guest' ? 'text-rose-400' : 'text-zinc-400'}`}>
                  {selectedPortal === 'guest' ? 'Selected ✓' : 'Select'}
                </span>
              </div>
            </div>

            {/* 3. Volunteer Portal */}
            <div
              onClick={() => onSelectPortal('volunteer')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative bg-black/60 flex flex-col justify-between group ${
                selectedPortal === 'volunteer'
                  ? 'border-sky-400 bg-sky-950/20 shadow-[0_0_30px_rgba(14,165,233,0.35)] scale-[1.02]'
                  : 'border-white/10 hover:border-sky-400/50 hover:bg-black/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                    <HeartHandshake className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-sky-950 text-sky-400 border border-sky-500/30">
                    VOLUNTEER
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-sky-300">
                    Festival Volunteer
                  </h3>
                  <div className="text-xs font-telugu text-sky-300 font-bold">స్వచ్ఛంద సేవకులు</div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Join our volunteer committees: Sports Coordination, Cultural Stage, Traditional Food Service, or Welcome Desk. Includes volunteer badge and meal token.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-sky-400 font-bold">★ Volunteer Pass Included</span>
                <span className={`font-bold flex items-center gap-1 ${selectedPortal === 'volunteer' ? 'text-sky-400' : 'text-zinc-400'}`}>
                  {selectedPortal === 'volunteer' ? 'Selected ✓' : 'Select'}
                </span>
              </div>
            </div>
          </div>

          {/* Advance to Stage 2 Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onJumpToScene(2)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>Continue to Stage 02: Attendee Info</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STAGE 2: ATTENDEE IDENTITY & MEMBERSHIP VERIFICATION
          ========================================================================= */}
      {(viewMode === 'continuous' || activeStage === 2) && (
        <section
          id="stage-2"
          className="mb-12 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-6 animate-fadeIn"
        >
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STAGE 02 // ATTENDEE & MEMBERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white uppercase">
              Personal Information & Verification
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Enter your contact details. Verify your UTA Member ID to automatically apply 100% free passes and fee waivers.
            </p>
          </div>

          <div className="space-y-6">
            {/* Primary Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold">
                  Primary Contact Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Venkat Rao"
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 focus:border-amber-400 text-white font-medium text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. member@utahtelugu.org"
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 focus:border-amber-400 text-white font-medium text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(801) 555-0123"
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 focus:border-amber-400 text-white font-medium text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold">
                  City / Utah County
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="South Jordan, UT"
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 focus:border-amber-400 text-white font-medium text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Membership Verification Monolith */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                    UTA Membership Verification Engine
                  </span>
                </div>
                {isVerifiedMember && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-emerald-500 text-black tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    VERIFIED ACTIVE MEMBER ✓
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Enter your UTA Member ID (e.g. <code>UTA-2026-F0892</code>), or your registered email or phone to apply member waivers across all 4 weekend events.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  placeholder="e.g. UTA-2026-F0892 or registered email/phone"
                  className="flex-1 px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 focus:border-amber-400 text-white font-mono text-sm focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={() => onVerifyMembership()}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shrink-0"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Verify Benefits</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1-Click Demo Shortcut */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
                <span>Quick Test:</span>
                <button
                  type="button"
                  onClick={() => {
                    setMemberInput('UTA-2026-F0892');
                    onVerifyMembership('UTA-2026-F0892');
                  }}
                  className="underline font-bold text-amber-400 hover:text-amber-300"
                >
                  Click to test active member: UTA-2026-F0892 (Venkat & Priya Rao)
                </button>
              </div>

              {isVerifiedMember && memberData && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Welcome back, {memberData.primaryName}!</span>
                  </div>
                  <div className="text-[11px] text-zinc-300">
                    Plan: <strong>{memberData.planName}</strong> • ID: <code>{memberData.membershipNumber}</code>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    ✓ 100% Free Festival Admission Passes Applied ($0.00).
                    <br />✓ Free Entry to Rangoli & 50% DPL Sports Discounts Active.
                  </div>
                </div>
              )}

              {verifyError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}
            </div>

            {/* Volunteer specific role input */}
            {selectedPortal === 'volunteer' && (
              <div className="p-5 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-2 text-xs font-mono">
                <span className="text-sky-300 font-bold block uppercase">
                  Volunteer Committee Assignment
                </span>
                <select
                  value={volunteerRole}
                  onChange={(e) => setVolunteerRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-zinc-700 text-white"
                >
                  <option value="sports">Sports Coordination (Pickleball & Volleyball)</option>
                  <option value="stage">Cultural Stage & Sound Management</option>
                  <option value="food">Traditional Banquet Food Service (Bhojanam)</option>
                  <option value="welcome">Welcome Desk & Digital Check-in</option>
                </select>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => onJumpToScene(1)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Category</span>
            </button>
            <button
              type="button"
              onClick={() => onJumpToScene(3)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>Continue to Stage 03: Select Events</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STAGE 3: CHOOSE WEEKEND EVENTS (The 4-Day Matrix)
          ========================================================================= */}
      {(viewMode === 'continuous' || activeStage === 3) && (
        <section
          id="stage-3"
          className="mb-12 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-6 animate-fadeIn"
        >
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STAGE 03 // EVENT MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white uppercase">
              Select Your Weekend Events (Jan 15–23, 2027)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Pick the competitions, leagues, and festival feasts you wish to register for. All registered under one unified family pass.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Event 1: Rangoli */}
            <div
              onClick={() => toggleEvent('rangoli')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                selectedEvents.includes('rangoli')
                  ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-amber-400/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    FRIDAY • JAN 15, 2027
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes('rangoli')}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-amber-500 accent-amber-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Rangoli Competition (Muggula Poti)
                  </h3>
                  <div className="text-xs font-telugu text-amber-300 font-bold">ముగ్గుల పోటీలు</div>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>4:00 PM – 8:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sri Ganesha Hindu Temple Hall, South Jordan, UT</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  {isVerifiedMember ? 'FREE for Members' : '$10 - $15 Entry'}
                </span>
                <span className="text-amber-400 font-bold">
                  {selectedEvents.includes('rangoli') ? 'Selected ✓' : '+ Add Event'}
                </span>
              </div>
            </div>

            {/* Event 2: Pickleball */}
            <div
              onClick={() => toggleEvent('pickleball')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                selectedEvents.includes('pickleball')
                  ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-amber-400/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    SATURDAY • JAN 16, 2027
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes('pickleball')}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-amber-500 accent-amber-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    DPL Pickleball Tournament
                  </h3>
                  <div className="text-xs font-telugu text-amber-300 font-bold">పికిల్‌బాల్ లీగ్</div>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Salt Lake Tennis & Health Club, SLC, UT</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  {isVerifiedMember ? '50% Member Discount ($20)' : '$20 - $40 / Team'}
                </span>
                <span className="text-amber-400 font-bold">
                  {selectedEvents.includes('pickleball') ? 'Selected ✓' : '+ Add Event'}
                </span>
              </div>
            </div>

            {/* Event 3: Volleyball */}
            <div
              onClick={() => toggleEvent('volleyball')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                selectedEvents.includes('volleyball')
                  ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-amber-400/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    SUNDAY • JAN 17, 2027
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes('volleyball')}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-amber-500 accent-amber-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Walkers Volleyball Championship
                  </h3>
                  <div className="text-xs font-telugu text-amber-300 font-bold">వాలీబాల్ ఛాంపియన్‌షిప్</div>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>8:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Mountain Sports Center, Sandy, UT</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  {isVerifiedMember ? 'FREE for Member Captains' : '$60 Full Team Entry'}
                </span>
                <span className="text-amber-400 font-bold">
                  {selectedEvents.includes('volleyball') ? 'Selected ✓' : '+ Add Event'}
                </span>
              </div>
            </div>

            {/* Event 4: Grand Festival & Feast */}
            <div
              onClick={() => toggleEvent('grand_festival')}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                selectedEvents.includes('grand_festival')
                  ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-amber-400/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    SATURDAY • JAN 23, 2027
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes('grand_festival')}
                    onChange={() => {}}
                    className="w-5 h-5 rounded text-amber-500 accent-amber-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Grand Sankranthi Celebrations & Feast
                  </h3>
                  <div className="text-xs font-telugu text-amber-300 font-bold">సంక్రాంతి సంబరాలు & విందు</div>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Herriman High School Hall, Herriman, UT</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  {isVerifiedMember ? 'FREE VIP Pass (Members)' : '$9.99 General Pass'}
                </span>
                <span className="text-amber-400 font-bold">
                  {selectedEvents.includes('grand_festival') ? 'Selected ✓' : '+ Add Event'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => onJumpToScene(2)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Identity</span>
            </button>
            <button
              type="button"
              onClick={() => onJumpToScene(4)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>Continue to Stage 04: Event Details</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STAGE 4: EVENT SPECIFICS & TEAM ROSTERS
          ========================================================================= */}
      {(viewMode === 'continuous' || activeStage === 4) && (
        <section
          id="stage-4"
          className="mb-12 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-8 animate-fadeIn"
        >
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STAGE 04 // EVENT SPECIFICS & ROSTERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white uppercase">
              Configure Your Team, Themes & Attendees
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Provide the specific details for the {selectedEvents.length} event(s) you selected.
            </p>
          </div>

          <div className="space-y-6">
            {/* Rangoli Details */}
            {selectedEvents.includes('rangoli') && (
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white font-display text-base">
                    Rangoli Competition Configuration (Jan 15)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Theme Style:</label>
                    <select
                      value={rangoliTheme}
                      onChange={(e) => setRangoliTheme(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="traditional">Traditional Chukkala Muggulu (Dot Pattern)</option>
                      <option value="freehand">Freehand Colorful Rangoli (Vibrant Colors)</option>
                      <option value="gobbemma">Sankranthi Special (Gobbemma & Haridasu)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Entry Format:</label>
                    <select
                      value={rangoliFormat}
                      onChange={(e) => setRangoliFormat(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="team">Team of 2 to 4 ($15 / Free for members)</option>
                      <option value="individual">Solo Participant ($10 / Free for members)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Age Category:</label>
                    <select
                      value={rangoliAgeBracket}
                      onChange={(e) => setRangoliAgeBracket(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="adults">Adults (18+)</option>
                      <option value="teens">Youth & Teens (12–17)</option>
                      <option value="seniors">Seniors (60+)</option>
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col justify-center">
                    <label className="text-zinc-300 font-bold mb-2">Herbal Color Powder Kit:</label>
                    <label className="flex items-center gap-2 cursor-pointer text-amber-300">
                      <input
                        type="checkbox"
                        checked={rangoliColorKit}
                        onChange={(e) => setRangoliColorKit(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500"
                      />
                      <span>Provide authentic color powder kit (Complimentary)</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-zinc-300 font-bold">
                      Team Member Names (if competing as team):
                    </label>
                    <input
                      type="text"
                      value={rangoliTeamMembers}
                      onChange={(e) => setRangoliTeamMembers(e.target.value)}
                      placeholder="e.g. Sravani, Anusha, Swapna"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pickleball Details */}
            {selectedEvents.includes('pickleball') && (
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white font-display text-base">
                    DPL Pickleball Tournament Configuration (Jan 16)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Division:</label>
                    <select
                      value={pickleballDivision}
                      onChange={(e) => setPickleballDivision(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="mixed_doubles">Mixed Doubles</option>
                      <option value="mens_doubles">Men's Doubles</option>
                      <option value="womens_doubles">Women's Doubles</option>
                      <option value="open_singles">Open Singles</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Skill Bracket:</label>
                    <select
                      value={pickleballSkill}
                      onChange={(e) => setPickleballSkill(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="3.0-3.5">Intermediate (3.0 – 3.5 DPL Bracket)</option>
                      <option value="2.5-3.0">Beginner / Recreational (2.5 – 3.0)</option>
                      <option value="4.0+">Advanced / Competitive (4.0+)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Doubles Partner Full Name:</label>
                    <input
                      type="text"
                      value={pickleballPartnerName}
                      onChange={(e) => setPickleballPartnerName(e.target.value)}
                      placeholder="e.g. Suresh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Partner Email Address:</label>
                    <input
                      type="email"
                      value={pickleballPartnerEmail}
                      onChange={(e) => setPickleballPartnerEmail(e.target.value)}
                      placeholder="suresh@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Tournament Emergency Phone:</label>
                    <input
                      type="tel"
                      value={pickleballEmergencyPhone}
                      onChange={(e) => setPickleballEmergencyPhone(e.target.value)}
                      placeholder="(801) 555-9876"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Volleyball Details */}
            {selectedEvents.includes('volleyball') && (
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white font-display text-base">
                    Walkers Volleyball League Configuration (Jan 17)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Official Team Name:</label>
                    <input
                      type="text"
                      value={volleyballTeamName}
                      onChange={(e) => setVolleyballTeamName(e.target.value)}
                      placeholder="e.g. Salt Lake Smashers"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Division:</label>
                    <select
                      value={volleyballDivision}
                      onChange={(e) => setVolleyballDivision(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    >
                      <option value="competitive">Competitive Championship (Gold Tier)</option>
                      <option value="recreational">Recreational Fun League (Silver Tier)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Team Captain Mobile Phone:</label>
                    <input
                      type="tel"
                      value={volleyballCaptainPhone}
                      onChange={(e) => setVolleyballCaptainPhone(e.target.value)}
                      placeholder="(801) 555-8888"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-bold">Team Captain Membership:</label>
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-emerald-400">
                      {isVerifiedMember ? '✓ Captain Member Fee Waived ($0)' : '$60 Full Team Entry Fee'}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-zinc-300 font-bold">
                      Team Squad Roster (6 to 8 Players):
                    </label>
                    <textarea
                      rows={2}
                      value={volleyballRoster}
                      onChange={(e) => setVolleyballRoster(e.target.value)}
                      placeholder="e.g. 1. Venkat (C), 2. Ramesh, 3. Kiran, 4. Ajay, 5. Karthik, 6. Sai"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-sans text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Grand Festival Details */}
            {selectedEvents.includes('grand_festival') && (
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white font-display text-base">
                    Grand Sankranthi Celebrations & Feast Details (Jan 23)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
                  {/* Adult & Child Passes */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Adult Passes (13+)</span>
                      <span className="text-[11px] text-zinc-400">
                        {isVerifiedMember ? 'Included with Member VIP Pass' : '$9.99 General Pass'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-amber-400 font-bold text-sm">{adultCount}</span>
                      <button
                        type="button"
                        onClick={() => setAdultCount(adultCount + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Children (Under 12)</span>
                      <span className="text-[11px] text-emerald-400">Free Admission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-amber-400 font-bold text-sm">{childCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildCount(childCount + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Festival Bhojanam Dinner Count */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Festive Bhojanam Banquet Meals</span>
                      <span className="text-[11px] text-zinc-400">
                        Authentic Andhra & Telangana Feast ($12/plate)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFestivalDinnerCount(Math.max(0, festivalDinnerCount - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-amber-400 font-bold text-sm">{festivalDinnerCount}</span>
                      <button
                        type="button"
                        onClick={() => setFestivalDinnerCount(festivalDinnerCount + 1)}
                        className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stage Performer Status */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="performer-checkbox"
                      checked={festivalIsPerformer}
                      onChange={(e) => setFestivalIsPerformer(e.target.checked)}
                      className="w-5 h-5 rounded text-amber-500 accent-amber-500"
                    />
                    <label htmlFor="performer-checkbox" className="cursor-pointer text-xs text-zinc-300">
                      <span className="font-bold text-white block">Cultural Stage Performer</span>
                      <span>I or my family member is performing in classical dance/singing/skit</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => onJumpToScene(3)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Events</span>
            </button>
            <button
              type="button"
              onClick={() => onJumpToScene(5)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <span>Continue to Stage 05: Review & Confirm</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STAGE 5: REVIEW & CONFIRM PASS
          ========================================================================= */}
      {(viewMode === 'continuous' || activeStage === 5) && !submissionSuccess && (
        <section
          id="stage-5"
          className="mb-12 bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-6 animate-fadeIn"
        >
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STAGE 05 // REVIEW & CONFIRMATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white uppercase">
              Review Your Registration & Passes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Confirm your registration summary. Your official pass and QR token will be generated instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registration Summary Card */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 text-xs font-mono">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">
                Registration Summary
              </span>
              <div className="space-y-2 text-zinc-300">
                <div>
                  <span className="text-zinc-500 block text-[10px]">PRIMARY ATTENDEE</span>
                  <span className="text-white font-bold text-sm">{fullName || '(Name required)'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">EMAIL & PHONE</span>
                  <span>{email || '(Email required)'} • {phone || '(Phone optional)'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">CATEGORY & MEMBERSHIP</span>
                  <span className="capitalize">{selectedPortal}</span> •{' '}
                  {isVerifiedMember ? (
                    <span className="text-emerald-400 font-bold">Verified Member ({memberData?.membershipNumber || memberInput})</span>
                  ) : (
                    <span className="text-zinc-400">Guest Rate</span>
                  )}
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">SELECTED EVENTS</span>
                  <span className="text-white font-bold">{selectedEvents.join(' • ').toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Line-item Pricing Receipt */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-black border border-amber-500/30 space-y-4 text-xs font-mono">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">
                Financial Tally & Member Waivers
              </span>
              <div className="space-y-2 border-b border-white/10 pb-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Gross Event Value</span>
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>
                {pricing.memberDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>UTA Member VIP Waiver</span>
                    <span>-${pricing.memberDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-1 text-sm font-bold">
                <span className="text-white uppercase">Total Amount Due</span>
                <span className="text-xl font-mono font-black text-amber-400">
                  ${pricing.total.toFixed(2)} USD
                </span>
              </div>

              {pricing.total === 0 && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-300">
                  ★ 100% Free VIP Pass courtesy of your Utah Telugu Association Family Membership!
                </div>
              )}
            </div>
          </div>

          {/* Submission Button */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => onJumpToScene(4)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Details</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center gap-2 transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-black" />
                  <span>Minting Official Pass...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <span>Confirm Registration & Generate Pass</span>
                </>
              )}
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STAGE 6: REGISTRATION CONFIRMED PASS (Finale)
          ========================================================================= */}
      {submissionSuccess && (
        <section
          id="stage-6"
          className="mb-12 bg-zinc-950/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-[0_20px_80px_rgba(245,158,11,0.4)] space-y-8 animate-fadeIn text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>REGISTRATION CONFIRMED • PASS ISSUED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase">
            Welcome to Sankranthi 2027!
          </h2>

          <p className="text-sm text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
            Congratulations, <strong>{fullName}</strong>! Your official Utah Telugu Association Sankranthi Celebrations 2027 weekend pass has been confirmed and logged.
          </p>

          {/* Pass Preview Card */}
          <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border-2 border-amber-400/80 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase tracking-wider">
                  UTAH TELUGU ASSOCIATION
                </span>
                <span className="text-sm font-black text-white font-display">
                  SANKRANTHI VIP DIGITAL PASS
                </span>
              </div>
              <span className="w-9 h-9 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center text-xs font-mono">
                UTA
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">ATTENDEE:</span>
                <span className="text-white font-bold">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">REF TOKEN:</span>
                <span className="text-amber-400 font-bold">
                  {registrationResult?.qrMasterToken || registrationResult?.masterRegistrationNumber || registrationResult?.token || 'UTA-2027-SNK-PASS'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">MEMBERSHIP:</span>
                <span className="text-emerald-400">
                  {isVerifiedMember ? 'Active Member Pass' : 'Community Guest'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">EVENTS:</span>
                <span className="text-zinc-300 text-right">{selectedEvents.length} Weekend Events</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-10 h-10 text-amber-400" />
                <span className="text-[9px] font-mono text-zinc-400">
                  Scan at Entrance Check-in
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Status: VALID ✓
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onDownloadCalendar}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Add to Apple / Google Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <span>Print / Save Pass</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
