'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface EventConfig {
  key: string;
  name: string;
  telugu: string;
  date: string;
  time: string;
  venue: string;
  icon: string;
  accent: string;
  basePriceMember: string;
  basePriceGuest: string;
}

interface ReferenceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEventKey: string;
  onSelectEventKey: (key: string) => void;
}

export const FESTIVAL_EVENTS: Record<string, EventConfig> = {
  rangoli: {
    key: 'rangoli',
    name: 'Rangoli Competition (Muggula Poti)',
    telugu: 'ముగ్గుల పోటీలు',
    date: 'Friday, January 15, 2027',
    time: '4:00 PM – 8:00 PM',
    venue: 'Sri Ganesha Hindu Temple Hall, South Jordan, UT',
    icon: '🎨',
    accent: '#e34e5b',
    basePriceMember: 'FREE (100% Waived)',
    basePriceGuest: '$10 Solo / $15 Team',
  },
  pickleball: {
    key: 'pickleball',
    name: 'DPL Pickleball Tournament',
    telugu: 'పికిల్‌బాల్ లీగ్',
    date: 'Saturday, January 16, 2027',
    time: '8:00 AM – 6:00 PM',
    venue: 'Salt Lake Tennis & Health Club, Salt Lake City, UT',
    icon: '🏓',
    accent: '#56b87a',
    basePriceMember: '50% Member Discount ($20 Team)',
    basePriceGuest: '$20 Singles / $40 Doubles Team',
  },
  volleyball: {
    key: 'volleyball',
    name: 'Walkers Indoor Volleyball Championship',
    telugu: 'వాలీబాల్ ఛాంపియన్‌షిప్',
    date: 'Sunday, January 17, 2027',
    time: '8:00 AM – 8:00 PM',
    venue: 'Mountain Sports Center, Sandy, UT',
    icon: '🏐',
    accent: '#3a96ee',
    basePriceMember: 'FREE for Member Captains ($0)',
    basePriceGuest: '$60 Full Team Entry',
  },
  grand_festival: {
    key: 'grand_festival',
    name: 'Grand Sankranthi Celebrations & Festive Feast',
    telugu: 'సంక్రాంతి సంబరాలు & విందు',
    date: 'Saturday, January 23, 2027',
    time: '10:00 AM – 10:00 PM',
    venue: 'Herriman High School Auditorium & Hall, Herriman, UT',
    icon: '🌾',
    accent: 'var(--accent-gold)',
    basePriceMember: '100% Free VIP Family Pass',
    basePriceGuest: '$9.99 General Admission',
  },
};

export function ReferenceRegistrationModal({
  isOpen,
  onClose,
  selectedEventKey,
  onSelectEventKey,
}: ReferenceRegistrationModalProps) {
  const [step, setStep] = useState<number>(0); // 0: Identity, 1: Details, 2: Review, 3: Confirmed

  // Form State: Identity
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Salt Lake City, UT');

  // Form State: Membership
  const [membershipType, setMembershipType] = useState<string>('active_member');
  const [memberInput, setMemberInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerifiedMember, setIsVerifiedMember] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<any>(null);
  const [verifyError, setVerifyError] = useState<string>('');

  // Form State: Event Details
  const [rangoliTheme, setRangoliTheme] = useState<string>('traditional');
  const [rangoliFormat, setRangoliFormat] = useState<string>('team');
  const [rangoliAgeBracket, setRangoliAgeBracket] = useState<string>('adults');
  const [rangoliColorKit, setRangoliColorKit] = useState<boolean>(true);
  const [rangoliTeamMembers, setRangoliTeamMembers] = useState<string>('');

  const [pickleballDivision, setPickleballDivision] = useState<string>('mixed_doubles');
  const [pickleballSkill, setPickleballSkill] = useState<string>('3.0-3.5');
  const [pickleballPartnerName, setPickleballPartnerName] = useState<string>('');
  const [pickleballPartnerEmail, setPickleballPartnerEmail] = useState<string>('');
  const [pickleballEmergencyPhone, setPickleballEmergencyPhone] = useState<string>('');

  const [volleyballTeamName, setVolleyballTeamName] = useState<string>('');
  const [volleyballDivision, setVolleyballDivision] = useState<string>('competitive');
  const [volleyballCaptainPhone, setVolleyballCaptainPhone] = useState<string>('');
  const [volleyballRoster, setVolleyballRoster] = useState<string>('');

  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(1);
  const [dinnerCount, setDinnerCount] = useState<number>(2);
  const [isPerformer, setIsPerformer] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sync with selected event
  const currentEvent = FESTIVAL_EVENTS[selectedEventKey] || FESTIVAL_EVENTS.rangoli;

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Membership Verification Handler
  const handleVerifyMembership = async (overrideToken?: string) => {
    const token = overrideToken || memberInput;
    if (!token.trim()) {
      setVerifyError('Please enter Member ID, Email, or Phone.');
      return;
    }

    setIsVerifying(true);
    setVerifyError('');

    try {
      const res = await fetch('/api/membership/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenOrNumber: token }),
      });
      const data = await res.json();
      if (res.ok && data.isValid) {
        setIsVerifiedMember(true);
        setMemberData(data);
        if (!fullName && data.primaryName) setFullName(data.primaryName);
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } else {
        setIsVerifiedMember(false);
        setVerifyError(data.message || 'No active membership found. You can register at guest rate.');
      }
    } catch (err) {
      setVerifyError('Verification connection error.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Pricing Calculation
  const calculatePricing = () => {
    let subtotal = 0;
    let discount = 0;

    if (selectedEventKey === 'rangoli') {
      const base = rangoliFormat === 'team' ? 15 : 10;
      subtotal += base;
      if (isVerifiedMember) discount += base;
    } else if (selectedEventKey === 'pickleball') {
      const base = 40;
      subtotal += base;
      if (isVerifiedMember) discount += 20;
    } else if (selectedEventKey === 'volleyball') {
      const base = 60;
      subtotal += base;
      if (isVerifiedMember) discount += 60;
    } else if (selectedEventKey === 'grand_festival') {
      const tickets = adultCount * 9.99;
      const dinners = dinnerCount * 12;
      subtotal += tickets + dinners;
      if (isVerifiedMember) discount += tickets;
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  };

  const pricing = calculatePricing();

  // Validate Step Navigation
  const handleNext = () => {
    setErrorMessage('');
    if (step === 0) {
      if (!fullName.trim() || !email.trim()) {
        setErrorMessage('Please provide your Full Name and Email.');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step === 0) {
      onClose();
    } else {
      setStep(step - 1);
    }
  };

  // Submission to Live Database
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        contactName: fullName,
        contactEmail: email,
        contactPhone: phone,
        contactCity: city,
        membershipNumber: isVerifiedMember ? memberData?.membershipNumber || memberInput : null,
        eventsSelected: [selectedEventKey],
        eventDetails: {
          [selectedEventKey]: {
            rangoliTheme,
            rangoliFormat,
            rangoliAgeBracket,
            rangoliColorKit,
            rangoliTeamMembers,
            pickleballDivision,
            pickleballSkill,
            pickleballPartnerName,
            pickleballPartnerEmail,
            pickleballEmergencyPhone,
            volleyballTeamName,
            volleyballDivision,
            volleyballCaptainPhone,
            volleyballRoster,
            adultCount,
            childCount,
            dinnerCount,
            isPerformer,
            notes,
          },
        },
      };

      const res = await fetch('/api/events/sankranthi-2027/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrationResult(data);
        setStep(3);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['var(--accent-gold)', '#e34e5b', '#56b87a', '#fff3d9'],
        });
      } else {
        setErrorMessage(data.error || 'Registration failed. Please check inputs.');
      }
    } catch (err) {
      setErrorMessage('Network error submitting registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCalendarFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Utah Telugu Association//Sankranthi 2027//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${selectedEventKey}-2027@utahtelugu.org
DTSTART:20270115T160000Z
DTEND:20270124T040000Z
SUMMARY:UTA Sankranthi 2027: ${currentEvent.name}
DESCRIPTION:Utah Telugu Association Sankranthi Celebrations 2027\\nEvent: ${currentEvent.name}\\nTime: ${currentEvent.time}\\nVenue: ${currentEvent.venue}
LOCATION:${currentEvent.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UTA-Sankranthi-${selectedEventKey}-2027.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030e14]/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[660px] max-h-[92vh] overflow-y-auto rounded-[26px] p-6 sm:p-9 text-[#fff5dc] shadow-[0_40px_120px_rgba(0,0,0,0.85)] border border-[#e4bb75]/65 my-auto animate-rise"
        style={{
          background: 'linear-gradient(150deg, #17343a, #0b1d29)',
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent-gold-light)]">
              UTA · Sankranthi 2027
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1 leading-tight flex items-center gap-2">
              <span>{currentEvent.icon}</span>
              <span>{currentEvent.name}</span>
            </h2>
            <p className="text-xs text-[#d9cbb2] mt-1">
              {currentEvent.date} · {currentEvent.time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 flex items-center justify-center text-xl transition-colors shrink-0"
            aria-label="Close registration"
          >
            ×
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 3 && (
          <div className="flex gap-2 my-5">
            <span
              className={`h-1 flex-1 rounded-full transition-all ${
                step >= 0 ? 'bg-[var(--accent-gold)] shadow-[0_0_10px_rgba(244,187,89,0.5)]' : 'bg-white/20'
              }`}
            />
            <span
              className={`h-1 flex-1 rounded-full transition-all ${
                step >= 1 ? 'bg-[var(--accent-gold)] shadow-[0_0_10px_rgba(244,187,89,0.5)]' : 'bg-white/20'
              }`}
            />
            <span
              className={`h-1 flex-1 rounded-full transition-all ${
                step >= 2 ? 'bg-[var(--accent-gold)] shadow-[0_0_10px_rgba(244,187,89,0.5)]' : 'bg-white/20'
              }`}
            />
          </div>
        )}

        {/* =========================================================================
            STEP 0: ATTENDEE INFO & MEMBERSHIP VERIFICATION
            ========================================================================= */}
        {step === 0 && (
          <div className="space-y-4 pt-1 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#ffdfae]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Venkat Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 focus:border-[var(--accent-gold)] text-white text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#ffdfae]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. member@utahtelugu.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 focus:border-[var(--accent-gold)] text-white text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#ffdfae]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(801) 555-0123"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 focus:border-[var(--accent-gold)] text-white text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#ffdfae]">UTA Membership Status *</label>
                <select
                  value={membershipType}
                  onChange={(e) => setMembershipType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 focus:border-[var(--accent-gold)] text-white text-sm focus:outline-none"
                >
                  <option value="active_member">Active UTA Member (Family / Individual)</option>
                  <option value="guest">Non-Member / Community Guest</option>
                  <option value="volunteer">Festival Volunteer</option>
                </select>
              </div>
            </div>

            {/* Membership Verification Monolith */}
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-[var(--accent-gold)]/40 space-y-3 mt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffdfae]">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Verify Membership for Free / Discounted Pass</span>
                </div>
                {isVerifiedMember && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10b981] text-black">
                    VERIFIED ACTIVE ✓
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  placeholder="Enter Member ID, Email, or Phone"
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/30 text-xs text-white focus:outline-none focus:border-[var(--accent-gold)]"
                />
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={() => handleVerifyMembership()}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-gold)] hover:bg-[#e5a747] text-[#13232b] font-bold text-xs transition-colors shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isVerifying ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Verify</span>
                </button>
              </div>

              {/* 1-Click Test Demo */}
              <div className="text-[11px] text-zinc-300">
                <span>Quick Test: </span>
                <button
                  type="button"
                  onClick={() => {
                    setMemberInput('UTA-2026-F0892');
                    handleVerifyMembership('UTA-2026-F0892');
                  }}
                  className="underline text-[var(--accent-gold-light)] font-bold hover:text-white"
                >
                  Load UTA-2026-F0892 (Venkat & Priya Rao)
                </button>
              </div>

              {isVerifiedMember && memberData && (
                <div className="p-2.5 rounded-xl bg-[#10b981]/20 border border-[#10b981]/40 text-xs text-[#d1fae5] space-y-0.5">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>Welcome, {memberData.primaryName}!</span>
                  </div>
                  <div className="text-[11px] text-zinc-300">
                    Plan: <strong>{memberData.planName}</strong> · 100% Free Festival Passes & Waivers Applied.
                  </div>
                </div>
              )}

              {verifyError && (
                <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 1: EVENT SPECIFIC DETAILS
            ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4 pt-1 animate-fadeIn">
            {/* Rangoli Details */}
            {selectedEventKey === 'rangoli' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Participation Format *</label>
                  <select
                    value={rangoliFormat}
                    onChange={(e) => setRangoliFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="team">Team of 2 to 4 (Free for members / $15)</option>
                    <option value="individual">Solo Participant (Free for members / $10)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Muggu Competition Theme *</label>
                  <select
                    value={rangoliTheme}
                    onChange={(e) => setRangoliTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="traditional">Traditional Chukkala Muggulu (Dots)</option>
                    <option value="freehand">Freehand Colorful Rangoli Powder</option>
                    <option value="gobbemma">Sankranthi Special (Gobbemma & Haridasu)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Age Bracket *</label>
                  <select
                    value={rangoliAgeBracket}
                    onChange={(e) => setRangoliAgeBracket(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="adults">Adults (18+)</option>
                    <option value="teens">Youth & Teens (12–17)</option>
                    <option value="seniors">Seniors (60+)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--accent-gold-light)] font-bold">
                    <input
                      type="checkbox"
                      checked={rangoliColorKit}
                      onChange={(e) => setRangoliColorKit(e.target.checked)}
                      className="w-4 h-4 rounded text-[var(--accent-gold)] accent-[var(--accent-gold)]"
                    />
                    <span>Provide authentic herbal color powder kit (Free)</span>
                  </label>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Team Member Names (Optional)</label>
                  <input
                    type="text"
                    value={rangoliTeamMembers}
                    onChange={(e) => setRangoliTeamMembers(e.target.value)}
                    placeholder="e.g. Sravani, Anusha, Swapna"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>
              </div>
            )}

            {/* Pickleball Details */}
            {selectedEventKey === 'pickleball' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Tournament Division *</label>
                  <select
                    value={pickleballDivision}
                    onChange={(e) => setPickleballDivision(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="mixed_doubles">Mixed Doubles</option>
                    <option value="mens_doubles">Men's Doubles</option>
                    <option value="womens_doubles">Women's Doubles</option>
                    <option value="open_singles">Open Singles</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Skill Level (DPL Bracket) *</label>
                  <select
                    value={pickleballSkill}
                    onChange={(e) => setPickleballSkill(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="3.0-3.5">Intermediate (3.0 – 3.5)</option>
                    <option value="2.5-3.0">Beginner / Recreational (2.5 – 3.0)</option>
                    <option value="4.0+">Advanced / Competitive (4.0+)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Partner Full Name (Doubles)</label>
                  <input
                    type="text"
                    value={pickleballPartnerName}
                    onChange={(e) => setPickleballPartnerName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Partner Email Address</label>
                  <input
                    type="email"
                    value={pickleballPartnerEmail}
                    onChange={(e) => setPickleballPartnerEmail(e.target.value)}
                    placeholder="suresh@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Tournament Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={pickleballEmergencyPhone}
                    onChange={(e) => setPickleballEmergencyPhone(e.target.value)}
                    placeholder="(801) 555-9876"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>
              </div>
            )}

            {/* Volleyball Details */}
            {selectedEventKey === 'volleyball' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Team Name *</label>
                  <input
                    type="text"
                    value={volleyballTeamName}
                    onChange={(e) => setVolleyballTeamName(e.target.value)}
                    placeholder="e.g. Salt Lake Smashers"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Tournament Division *</label>
                  <select
                    value={volleyballDivision}
                    onChange={(e) => setVolleyballDivision(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#132b34] border border-white/30 text-white text-sm"
                  >
                    <option value="competitive">Competitive Championship (A-League)</option>
                    <option value="recreational">Recreational Fun League (B-League)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Captain Mobile Phone *</label>
                  <input
                    type="tel"
                    value={volleyballCaptainPhone}
                    onChange={(e) => setVolleyballCaptainPhone(e.target.value)}
                    placeholder="(801) 555-8888"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Captain Membership Waiver</label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/30 text-xs text-[#34d399] font-bold">
                    {isVerifiedMember ? '✓ Captain Member Fee Waived ($0)' : '$60 Full Team Entry'}
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Team Roster (6 to 8 Players)</label>
                  <textarea
                    rows={2}
                    value={volleyballRoster}
                    onChange={(e) => setVolleyballRoster(e.target.value)}
                    placeholder="e.g. 1. Venkat (C), 2. Ramesh, 3. Kiran, 4. Ajay, 5. Karthik, 6. Sai"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/30 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Grand Festival Details */}
            {selectedEventKey === 'grand_festival' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Adult Passes (13+) *</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-[var(--accent-gold)]">{adultCount}</span>
                    <button
                      type="button"
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      +
                    </button>
                    <span className="text-xs text-zinc-300 ml-2">
                      {isVerifiedMember ? 'Included in VIP Pass' : '$9.99 each'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Children (Under 12)</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-[var(--accent-gold)]">{childCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildCount(childCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      +
                    </button>
                    <span className="text-xs text-[#34d399] ml-2 font-bold">Free Admission</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ffdfae]">Festive Bhojanam Banquet Meals ($12/plate)</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDinnerCount(Math.max(0, dinnerCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-[var(--accent-gold)]">{dinnerCount}</span>
                    <button
                      type="button"
                      onClick={() => setDinnerCount(dinnerCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold"
                    >
                      +
                    </button>
                    <span className="text-xs text-zinc-300 ml-2">
                      Traditional Andhra & Telangana Festival Feast
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--accent-gold-light)] font-bold">
                    <input
                      type="checkbox"
                      checked={isPerformer}
                      onChange={(e) => setIsPerformer(e.target.checked)}
                      className="w-4 h-4 rounded text-[var(--accent-gold)] accent-[var(--accent-gold)]"
                    />
                    <span>Registered Cultural Stage Performer (Dance / Music / Skit)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Additional notes */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-xs font-bold text-[#ffdfae]">Additional Notes or Dietary Needs (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special accommodations, seating preferences, etc."
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/30 text-white text-xs focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: REVIEW & CONFIRM
            ========================================================================= */}
        {step === 2 && (
          <div className="space-y-4 pt-1 animate-fadeIn text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/20 space-y-2">
              <div className="text-sm font-bold font-serif text-[var(--accent-gold)] border-b border-white/10 pb-1.5">
                Registration Summary
              </div>
              <div className="grid grid-cols-2 gap-2 text-zinc-300">
                <div>
                  <span className="text-zinc-400 block text-[10px]">EVENT</span>
                  <strong className="text-white">{currentEvent.name}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">PRIMARY ATTENDEE</span>
                  <strong className="text-white">{fullName}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">CONTACT</span>
                  <span>{email} · {phone}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">MEMBERSHIP</span>
                  {isVerifiedMember ? (
                    <span className="text-[#34d399] font-bold">Verified Member ({memberData?.membershipNumber || memberInput})</span>
                  ) : (
                    <span>Community Guest Rate</span>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--accent-gold)]/40 space-y-2">
              <div className="flex justify-between text-zinc-300">
                <span>Standard Event Value:</span>
                <span>${pricing.subtotal.toFixed(2)}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between text-[#34d399] font-bold">
                  <span>UTA Member VIP Benefit Waiver:</span>
                  <span>-${pricing.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-white/15 text-sm font-bold text-white">
                <span className="uppercase tracking-wider">Total Due:</span>
                <span className="text-lg text-[var(--accent-gold)] font-mono">
                  ${pricing.total.toFixed(2)} USD
                </span>
              </div>
              {pricing.total === 0 && (
                <div className="text-[11px] text-[#34d399]">
                  ★ 100% Free VIP Pass courtesy of your Utah Telugu Association Family Membership!
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: REGISTRATION CONFIRMED PASS
            ========================================================================= */}
        {step === 3 && (
          <div className="space-y-5 pt-2 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#10b981]/20 border-2 border-[#10b981] text-[#34d399] flex items-center justify-center text-2xl mx-auto shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              ✓
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-gold-light)]">
                REGISTRATION CONFIRMED
              </div>
              <h3 className="text-2xl font-bold font-serif text-white mt-1">
                Pass Issued for {fullName}
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Your entry for <strong>{currentEvent.name}</strong> has been logged in the official Utah Telugu Association system.
              </p>
            </div>

            {/* Pass Preview Card */}
            <div className="max-w-sm mx-auto p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--accent-gold)]/60 text-left space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                  UTA SANKRANTHI 2027 PASS
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#10b981] text-black">
                  VALID ✓
                </span>
              </div>

              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-400">EVENT:</span>
                  <span className="text-white font-bold">{currentEvent.key.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">REF NUMBER:</span>
                  <span className="text-[var(--accent-gold)] font-bold">
                    {registrationResult?.masterRegistrationNumber || 'UTA-SK27-CONFIRMED'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">QR TOKEN:</span>
                  <span className="text-[var(--accent-gold-light)]">
                    {registrationResult?.qrMasterToken || 'UTA-PASS-SK27-LIVE'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-8 h-8 text-[var(--accent-gold)]" />
                  <span className="text-[9px] text-zinc-400">Entrance Check-in QR</span>
                </div>
                <span className="text-[10px] text-[#34d399] font-bold">
                  {isVerifiedMember ? 'VIP Member Pass' : 'General Attendee'}
                </span>
              </div>
            </div>

            {/* Calendar & Print Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={downloadCalendarFile}
                className="px-5 py-2.5 rounded-full bg-[var(--accent-gold)] hover:bg-[#e5a747] text-[#13232b] font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs transition-colors"
              >
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={step === 3 ? onClose : handleBack}
            className="px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 text-white font-bold text-xs transition-colors"
          >
            {step === 0 ? '← Events' : step === 3 ? '← Close' : '← Back'}
          </button>

          {step < 3 && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="flex-1 max-w-xs px-6 py-2.5 rounded-full bg-[var(--accent-gold)] hover:bg-[#e5a747] text-[#13232b] font-bold text-xs transition-all shadow-[0_0_20px_rgba(244,187,89,0.35)] flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Issuing Pass...</span>
                </>
              ) : (
                <span>{step === 2 ? 'Complete & Issue Pass →' : 'Continue →'}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
