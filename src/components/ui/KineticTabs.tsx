'use client';

import React, { useRef, useState, useEffect, useId } from 'react';

export interface KineticTabItem<T extends string = string> {
  id: T;
  label: string;
  telugu?: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface KineticTabsProps<T extends string = string> {
  tabs: KineticTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'amber' | 'crimson' | 'emerald';
  enableAudioFeedback?: boolean;
  className?: string;
}

export function KineticTabs<T extends string = string>({
  tabs,
  activeId,
  onChange,
  size = 'md',
  variant = 'amber',
  enableAudioFeedback = true,
  className = '',
}: KineticTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [activeRect, setActiveRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [hoverRect, setHoverRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const instanceId = useId();

  // Subtle web audio micro-click (Active Theory / Lusion inspired)
  const playMicroClick = () => {
    if (!enableAudioFeedback || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
      setTimeout(() => ctx.close(), 100);
    } catch {
      // AudioContext could be blocked by browser policy until interaction
    }
  };

  const updateActiveRect = () => {
    const container = containerRef.current;
    const activeEl = tabRefs.current.get(activeId);
    if (!container || !activeEl) {
      setActiveRect(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setActiveRect({
      left: elRect.left - containerRect.left + container.scrollLeft,
      top: elRect.top - containerRect.top,
      width: elRect.width,
      height: elRect.height,
    });
  };

  useEffect(() => {
    updateActiveRect();
    const handleResize = () => updateActiveRect();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId, tabs]);

  const handleMouseEnterTab = (id: string) => {
    setHoveredId(id);
    const container = containerRef.current;
    const el = tabRefs.current.get(id);
    if (!container || !el) {
      setHoverRect(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHoverRect({
      left: elRect.left - containerRect.left + container.scrollLeft,
      top: elRect.top - containerRect.top,
      width: elRect.width,
      height: elRect.height,
    });
  };

  const handleMouseLeaveContainer = () => {
    setHoveredId(null);
    setHoverRect(null);
  };

  const handleSelectTab = (id: T) => {
    if (id !== activeId) {
      playMicroClick();
      onChange(id);
      const el = tabRefs.current.get(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  // Variant gradient themes (Deep Midnight & Gold)
  const activeGradients = {
    amber: 'bg-gradient-to-r from-[#f4bb59] via-[#ffd18a] to-[#f4bb59] shadow-[0_4px_18px_rgba(244,187,89,0.4)]',
    crimson: 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 shadow-[0_4px_18px_rgba(244,63,94,0.4)]',
    emerald: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_4px_18px_rgba(52,211,153,0.4)]',
  };

  const sizeClasses = {
    sm: 'p-1 text-xs gap-1',
    md: 'p-1.5 text-xs sm:text-sm gap-1',
    lg: 'p-2 text-sm sm:text-base gap-1.5',
  };

  const buttonPadding = {
    sm: 'px-3 py-1.5',
    md: 'px-4 sm:px-5 py-2',
    lg: 'px-5 sm:px-7 py-3',
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeaveContainer}
      role="tablist"
      aria-label="Interactive category navigation"
      className={`relative inline-flex items-center rounded-2xl glass-panel bg-[#09222c]/90 border border-[#f4bb59]/30 shadow-2xl overflow-x-auto max-w-full no-scrollbar ${sizeClasses[size]} ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Ghost Hover Pill (Elastic tracking cursor) */}
      {hoverRect && hoveredId && hoveredId !== activeId && (
        <div
          className="absolute z-0 rounded-xl bg-[#f4bb59]/15 border border-[#f4bb59]/30 pointer-events-none transition-all duration-200 ease-out"
          style={{
            transform: `translate3d(${hoverRect.left}px, ${hoverRect.top}px, 0)`,
            width: `${hoverRect.width}px`,
            height: `${hoverRect.height}px`,
          }}
        />
      )}

      {/* Dynamic Active Pill (Kinetic glide spring physics) */}
      {activeRect && (
        <div
          className={`absolute z-0 rounded-xl ${activeGradients[variant]} pointer-events-none transition-all duration-350 cubic-bezier(0.16, 1, 0.3, 1)`}
          style={{
            transform: `translate3d(${activeRect.left}px, ${activeRect.top}px, 0)`,
            width: `${activeRect.width}px`,
            height: `${activeRect.height}px`,
            transitionProperty: 'transform, width, height',
            transitionDuration: '320ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      )}

      {/* Tabs */}
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const tabId = `${instanceId}-tab-${tab.id}`;

        return (
          <button
            key={tab.id}
            id={tabId}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleSelectTab(tab.id)}
            onMouseEnter={() => handleMouseEnterTab(tab.id)}
            className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-xl font-bold transition-colors duration-200 outline-none select-none cursor-pointer ${
              buttonPadding[size]
            } ${
              isActive
                ? 'text-[#071a20]'
                : 'text-[#e7d5b8] hover:text-white'
            }`}
          >
            {tab.icon && (
              <span className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
            )}

            <div className="flex flex-col items-start leading-tight">
              <span>{tab.label}</span>
              {tab.telugu && (
                <span
                  className={`text-[10px] font-telugu font-semibold transition-colors ${
                    isActive ? 'text-[#071a20]/80' : 'text-[#ffcb75]'
                  }`}
                >
                  {tab.telugu}
                </span>
              )}
            </div>

            {tab.badge !== undefined && (
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#071a20]/20 text-[#071a20] border border-[#071a20]/30 shadow-inner'
                    : 'bg-[#f4bb59]/15 text-[#f4bb59] border border-[#f4bb59]/30'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
