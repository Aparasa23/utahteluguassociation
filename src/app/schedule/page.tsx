'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Music,
  CheckCircle2,
  AlertCircle,
  Bell,
  Smartphone,
  ChevronRight,
  Sparkles,
  Users,
  Search,
  Filter,
  FileText,
  Volume2,
  Calendar,
} from 'lucide-react';

interface StageScheduleItem {
  id: string;
  slotNumber: number;
  stageTime: string;
  callTime: string;
  category: string;
  title: string;
  troupeName: string;
  choreographer?: string;
  performerCount: number;
  durationMinutes: string;
  trackStatus: 'VERIFIED' | 'NEEDS_TRIMMING' | 'PENDING_UPLOAD';
  emceeNotes: string;
  status: 'UPCOMING' | 'ON_DECK' | 'COMPLETED';
}

const INITIAL_SCHEDULE: StageScheduleItem[] = [
  {
    id: 's1',
    slotNumber: 1,
    stageTime: '4:15 PM',
    callTime: '3:45 PM',
    category: 'Vedic Invocation & Classical',
    title: 'Ganesha Pancharatnam & Kuchipudi Tarangam',
    troupeName: 'Natya Tarangini Academy',
    choreographer: 'Guru Smt. Shanthi Rao',
    performerCount: 8,
    durationMinutes: '4:45',
    trackStatus: 'VERIFIED',
    emceeNotes: 'Traditional brass plate dance honoring Lord Ganesha and Goddess Saraswati.',
    status: 'COMPLETED',
  },
  {
    id: 's2',
    slotNumber: 2,
    stageTime: '4:35 PM',
    callTime: '4:05 PM',
    category: 'Telugu Folk Dance',
    title: 'Sankranthi Sandadi & Gobbi Patalu',
    troupeName: 'Wasatch Telugu Kalalu',
    choreographer: 'Anitha & Rekha',
    performerCount: 12,
    durationMinutes: '4:55',
    trackStatus: 'VERIFIED',
    emceeNotes: 'Authentic harvest celebration folk dance depicting rural Andhra and Telangana traditions.',
    status: 'ON_DECK',
  },
  {
    id: 's3',
    slotNumber: 3,
    stageTime: '4:55 PM',
    callTime: '4:25 PM',
    category: 'Youth Cinematic Fusion',
    title: 'Tollywood Beats Medley 2026',
    troupeName: 'Salt Lake Desi Rhythms',
    choreographer: 'Karthik & Sneha',
    performerCount: 10,
    durationMinutes: '4:50',
    trackStatus: 'VERIFIED',
    emceeNotes: 'High-energy celebration medley featuring recent festive hits.',
    status: 'UPCOMING',
  },
  {
    id: 's4',
    slotNumber: 4,
    stageTime: '5:15 PM',
    callTime: '4:45 PM',
    category: 'Carnatic Vocal Ensemble',
    title: 'Annamacharya Sankeerthana',
    troupeName: 'Saptaswara Youth Choir',
    choreographer: 'Smt. Lakshmi Sitaram',
    performerCount: 6,
    durationMinutes: '4:30',
    trackStatus: 'VERIFIED',
    emceeNotes: 'Devotional classical ensemble celebrating Lord Venkateswara.',
    status: 'UPCOMING',
  },
  {
    id: 's5',
    slotNumber: 5,
    stageTime: '5:35 PM',
    callTime: '5:05 PM',
    category: 'Cultural Drama & Skit',
    title: 'Maa Palletooru — The Nostalgic Harvest',
    troupeName: 'Utah Telugu Nataka Mandali',
    choreographer: 'Srinivas Murthy',
    performerCount: 7,
    durationMinutes: '4:58',
    trackStatus: 'VERIFIED',
    emceeNotes: 'Heartwarming theatrical sketch contrasting village Sankranthi with diaspora life.',
    status: 'UPCOMING',
  },
  {
    id: 's6',
    slotNumber: 6,
    stageTime: '5:55 PM',
    callTime: '5:25 PM',
    category: 'Kids Folk Celebration',
    title: 'Bommala Koluvu & Haridasu Geethalu',
    troupeName: 'Little Stars Telugu Badi',
    choreographer: 'Pravallika Reddy',
    performerCount: 14,
    durationMinutes: '4:40',
    trackStatus: 'VERIFIED',
    emceeNotes: 'Youngest performers showcasing Haridasu blessings and traditional toys display.',
    status: 'UPCOMING',
  },
];

export default function ParticipantSchedulePage() {
  const [schedule] = useState<StageScheduleItem[]>(INITIAL_SCHEDULE);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [smsPhone, setSmsPhone] = useState('');
  const [smsTroupe, setSmsTroupe] = useState(INITIAL_SCHEDULE[1].troupeName);
  const [smsSubscribed, setSmsSubscribed] = useState(false);

  const filteredItems = schedule.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.troupeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || item.category.includes(filterCategory);
    return matchesSearch && matchesCat;
  });

  const handleSmsSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsPhone) return;
    setSmsSubscribed(true);
    setTimeout(() => {
      setSmsSubscribed(false);
      setSmsPhone('');
    }, 6000);
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>REAL-TIME STAGE RUN-OF-SHOW &amp; CALL TIMES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Participant Schedule &amp; Collaboration Hub
        </h1>
        <p className="text-base sm:text-lg text-[var(--accent-gold)] font-telugu font-semibold">
          వేదిక కార్యక్రమాల కాలపట్టిక &amp; ప్రదర్శకుల సమన్వయం
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
          Live stage schedule, green room call notifications, audio track verification status, and emcee notes for all registered Telugu cultural performances.
        </p>
      </div>

      {/* Automated Collaboration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Track Duration Rules */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl space-y-2.5">
          <div className="flex items-center gap-2 text-[var(--accent-gold)] font-bold text-xs uppercase tracking-wide">
            <Volume2 className="w-4 h-4 text-[var(--accent-gold)]" />
            <span>Audio &amp; Duration Guardrail</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Strict <strong className="text-white">5:00 minute maximum</strong> per group. Our automated proofreader checks file length upon submission to guarantee smooth stage transitions.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Tracks Audited
            </span>
          </div>
        </div>

        {/* Card 2: Green Room Call Time */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>T-30 Min Green Room Protocol</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Troupe leaders must report to the Green Room backstage exactly <strong className="text-white">30 minutes before</strong> their scheduled performance for audio cue and mic checks.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg">
              <Users className="w-3.5 h-3.5" />
              Stage Managers Active
            </span>
          </div>
        </div>

        {/* Card 3: New Submissions */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Need to Register or Edit?</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
              Submit your troupe roster, upload MP3 tracks, or view automated proofreading feedback.
            </p>
          </div>
          <Link
            href="/performances"
            className="w-full py-2 px-3 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md"
          >
            <span>Submit / Manage Performance</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* SMS Call-Time Subscription Box */}
      <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Automated Stage SMS Calls &amp; Countdown Alerts
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Choreographers, parents, and performers can get instant SMS alerts when their group is called to Green Room or on deck.
            </p>
          </div>
          {smsSubscribed && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed! You will receive Green Room alerts.</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSmsSubscribe} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
              Select Your Performance Troupe
            </label>
            <select
              value={smsTroupe}
              onChange={(e) => setSmsTroupe(e.target.value)}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
            >
              {schedule.map((s) => (
                <option key={s.id} value={s.troupeName}>
                  Slot #{s.slotNumber}: {s.troupeName} ({s.stageTime})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
              Cell Phone Number (SMS Alerts)
            </label>
            <input
              type="tel"
              placeholder="(801) 555-0199"
              value={smsPhone}
              onChange={(e) => setSmsPhone(e.target.value)}
              required
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)] placeholder-white/30"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Enable Automated SMS Calls</span>
            </button>
          </div>
        </form>
      </div>

      {/* Schedule Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by troupe, song, or choreographer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-card)] rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-gold)]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Classical', 'Folk', 'Cinematic', 'Vocal', 'Drama'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                filterCategory === cat
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] border-[var(--accent-gold)] shadow'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-card)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Live Timeline List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`glass-panel p-5 sm:p-6 rounded-2xl border transition-all ${
              item.status === 'ON_DECK'
                ? 'border-emerald-500/60 bg-emerald-950/20 shadow-emerald-900/20 shadow-xl ring-1 ring-emerald-500/40'
                : 'border-[var(--border-card)] bg-[var(--bg-card)] shadow-lg'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Column: Slot & Timing */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 border ${
                    item.status === 'ON_DECK'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                      : item.status === 'COMPLETED'
                      ? 'bg-white/5 text-white/40 border-white/10'
                      : 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border-[var(--accent-gold)]/40'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter">SLOT</span>
                  <span className="text-base font-black leading-none">#{item.slotNumber}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[var(--accent-gold)]">
                      {item.stageTime} (Stage)
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs font-mono text-amber-300 font-semibold">
                      Green Room Call: {item.callTime}
                    </span>
                    {item.status === 'ON_DECK' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider animate-bounce">
                        ON DECK NOW
                      </span>
                    )}
                    {item.status === 'COMPLETED' && (
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                        CONCLUDED
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[var(--accent-gold)] font-medium">
                    Presented by <strong className="text-white">{item.troupeName}</strong>
                    {item.choreographer && (
                      <span className="text-[var(--text-secondary)]"> • Guru/Choreographer: {item.choreographer}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Right Column: Validation Status & Emcee Info */}
              <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    <Users className="w-3 h-3 text-[var(--accent-gold)]" />
                    <span>{item.performerCount} Performers</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-[var(--accent-gold)]" />
                    <span>{item.durationMinutes} min</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Track OK</span>
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-[var(--text-secondary)] max-w-sm truncate hidden sm:block">
                    Emcee Cue: "{item.emceeNotes}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
