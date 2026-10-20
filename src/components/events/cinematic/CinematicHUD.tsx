'use client';

import React from 'react';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ChevronRight,
  UserCheck,
  Calendar,
  ClipboardList,
  Check,
  Ticket,
  FileText,
} from 'lucide-react';

interface CinematicHUDProps {
  currentScene: number; // 1 to 6
  onJumpToScene: (scene: number) => void;
  totalPrice: number;
  isVerifiedMember: boolean;
  selectedEventsCount: number;
  viewMode?: 'stepped' | 'continuous';
  onToggleViewMode?: () => void;
}

export function CinematicHUD({
  currentScene,
  onJumpToScene,
  totalPrice,
  isVerifiedMember,
  selectedEventsCount,
  viewMode = 'stepped',
  onToggleViewMode,
}: CinematicHUDProps) {
  const stages = [
    { num: 1, label: 'Category', icon: Compass, desc: 'Member / Guest / Volunteer' },
    { num: 2, label: 'Identity & ID', icon: UserCheck, desc: 'Contact & Verification' },
    { num: 3, label: 'Events', icon: Calendar, desc: '4-Day Weekend Arena' },
    { num: 4, label: 'Event Details', icon: ClipboardList, desc: 'Teams & Rosters' },
    { num: 5, label: 'Review & Pay', icon: Ticket, desc: 'Summary & Confirmation' },
    { num: 6, label: 'Pass', icon: CheckCircle2, desc: 'Confirmed QR Pass' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#0a0806]/95 backdrop-blur-2xl border-b border-amber-500/25 px-4 sm:px-6 lg:px-8 py-3 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Brand & Stage Indicator */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-black font-black flex items-center justify-center text-xs font-mono shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              UTA
            </span>
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <span>Sankranthi 2027</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Stage {currentScene} of 5
                </span>
              </span>
              <span className="text-[10px] text-zinc-400 font-sans block truncate max-w-[200px] sm:max-w-xs">
                {stages.find((s) => s.num === currentScene)?.label || 'Registration Hub'}
              </span>
            </div>
          </div>

          {/* Mobile Tally & Status */}
          <div className="flex md:hidden items-center gap-2 text-right">
            {isVerifiedMember && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                VIP FREE
              </span>
            )}
            <span className="text-xs font-mono font-black text-amber-400">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Center: Interactive Stage Stepper */}
        <nav
          aria-label="Registration stages"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1"
        >
          {stages.slice(0, 5).map((stage) => {
            const isActive = currentScene === stage.num;
            const isCompleted = currentScene > stage.num;
            const Icon = stage.icon;

            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => onJumpToScene(stage.num)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-black font-black shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/60 font-medium'
                    : 'bg-zinc-900/80 text-zinc-400 border border-white/5 hover:border-amber-500/40 hover:text-zinc-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isActive ? 'bg-black text-amber-400' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {stage.num}
                  </span>
                )}
                <span>{stage.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Tally, Member VIP Badge & View Mode Toggle */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {onToggleViewMode && (
            <button
              type="button"
              onClick={onToggleViewMode}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase bg-zinc-900 border border-white/10 hover:border-amber-500/50 text-zinc-300 transition-colors flex items-center gap-1"
              title="Toggle between step-by-step wizard or all-in-one scroll view"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>{viewMode === 'stepped' ? 'Show All Steps' : 'Step-by-Step'}</span>
            </button>
          )}

          {isVerifiedMember && (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VIP PASS (100% WAIVED)</span>
            </div>
          )}

          <div className="text-right pl-2 border-l border-white/10">
            <span className="text-[9px] font-mono uppercase text-zinc-400 block tracking-widest">
              Pass Tally
            </span>
            <span className="text-sm font-mono font-black text-amber-400">
              ${totalPrice.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
