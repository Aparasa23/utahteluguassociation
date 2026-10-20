'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Flower2,
  Leaf,
  Sun,
  Trophy,
  Users,
  Image as ImageIcon,
  Award,
  HeartHandshake,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Compass,
  LayoutGrid,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { SoundController } from './SoundController';

const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[580px] flex flex-col items-center justify-center bg-[#040714] text-slate-400 gap-3">
      <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">Initializing 3D Universe...</span>
    </div>
  ),
});

export type DestinationId = 'PAVILION' | 'ARENA' | 'MEMBERSHIP' | 'GALLERY' | 'SPONSORS' | 'VOLUNTEER';
export type FestivalTheme = 'SANKRANTHI' | 'UGADI' | 'BATHUKAMMA' | 'DIWALI';

interface DestinationMeta {
  id: DestinationId;
  title: string;
  subtitle: string;
  telugu: string;
  description: string;
  route: string;
  accentColor: string;
  icon: React.ReactNode;
}

export function UniverseCanvas() {
  const [activeDestination, setActiveDestination] = useState<DestinationId>('PAVILION');
  const [seasonalTheme, setSeasonalTheme] = useState<FestivalTheme>('SANKRANTHI');
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [isRotating, setIsRotating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const destinations: DestinationMeta[] = [
    {
      id: 'PAVILION',
      title: 'Cultural Pavilion',
      subtitle: 'Living Heritage & Seasonal Festivals',
      telugu: 'సాంస్కృతిక వేదిక',
      description: 'Explore Sankranthi kites, Ugadi spring traditions, Bathukamma floral towers, and Diwali lights celebrating Telugu classical dance, music, and food.',
      route: '/culture',
      accentColor: '#f59e0b',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'ARENA',
      title: 'Community Arena',
      subtitle: 'Sports Leagues & Championships',
      telugu: 'క్రీడా ప్రాంగణం',
      description: 'Follow the Utah Wasatch Cricket Cup, volleyball tournaments, pickleball brackets, and youth athletic leagues.',
      route: '/sports',
      accentColor: '#10b981',
      icon: <Trophy className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'MEMBERSHIP',
      title: 'Membership Center',
      subtitle: 'Family Enrollment & Digital Passes',
      telugu: 'సభ్యత్వ కేంద్రం',
      description: 'Enroll your family in UTA, renew annual dues, access verified digital membership QR cards, and unlock festival benefits.',
      route: '/membership/plans',
      accentColor: '#38bdf8',
      icon: <Users className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'GALLERY',
      title: 'Community Gallery',
      subtitle: 'Living Archives & Milestones',
      telugu: 'స్మృతి మంజరి',
      description: 'Interactive visual archives spanning 20+ years of Utah Telugu community festivals, picnics, stage performances, and youth achievements.',
      route: '/gallery',
      accentColor: '#e11d48',
      icon: <ImageIcon className="w-5 h-5 text-rose-400" />,
    },
    {
      id: 'SPONSORS',
      title: 'Sponsor Gallery',
      subtitle: 'Patron & Corporate Honors',
      telugu: 'పోషకుల శ్రేణి',
      description: 'Recognizing our Title, Platinum, and Gold community partners empowering Utah Telugu cultural programs.',
      route: '/sponsors',
      accentColor: '#fbbf24',
      icon: <Award className="w-5 h-5 text-amber-300" />,
    },
    {
      id: 'VOLUNTEER',
      title: 'Volunteer & Leadership Hub',
      subtitle: 'Service & Association Governance',
      telugu: 'సేవా నేతృత్వం',
      description: 'Join volunteer shifts for upcoming festivals, review Executive Committee updates, and participate in community service.',
      route: '/volunteer',
      accentColor: '#a855f7',
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />,
    },
  ];

  const currentDest = destinations.find((d) => d.id === activeDestination) || destinations[0];

  // Animated WebGL Canvas with physical particle system, rangoli mandalas, kites, and seasonal lighting
  useEffect(() => {
    if (viewMode !== '3D') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 560;
    };
    resize();
    window.addEventListener('resize', resize);

    // Dynamic particle pool for seasonal ambience
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      rotation: number;
      spinSpeed: number;
    }> = [];

    const getThemeColors = () => {
      if (seasonalTheme === 'SANKRANTHI') return ['#f59e0b', '#e11d48', '#38bdf8', '#10b981', '#ffffff'];
      if (seasonalTheme === 'UGADI') return ['#10b981', '#84cc16', '#fbbf24', '#065f46'];
      if (seasonalTheme === 'BATHUKAMMA') return ['#f43f5e', '#ec4899', '#facc15', '#a855f7', '#ffffff'];
      return ['#f59e0b', '#f97316', '#fbbf24', '#e11d48']; // DIWALI
    };

    const colors = getThemeColors();
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1.5,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2 - 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Deep Celestial Space / Atmospheric Background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, canvas.width * 0.7);
      bgGrad.addColorStop(0, '#0c1638');
      bgGrad.addColorStop(0.5, '#070d22');
      bgGrad.addColorStop(1, '#040713');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Sacred Rangoli Mandala Rings (Center Platform)
      ctx.save();
      ctx.translate(centerX, centerY);
      if (isRotating) angle += 0.003;
      ctx.rotate(angle);

      // Outer golden glow ring
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      // Middle ring with petal spokes
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // Sacred Telugu floral mandala petals
      for (let i = 0; i < 12; i++) {
        const petalAngle = (i * Math.PI) / 6;
        const px = Math.cos(petalAngle) * 90;
        const py = Math.sin(petalAngle) * 90;

        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(225, 29, 72, 0.15)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();

      // 3. Seasonal Accent Objects
      if (seasonalTheme === 'SANKRANTHI') {
        // Draw colorful flying diamond kites with tails
        const kitePositions = [
          { x: centerX - 220, y: centerY - 120, color: '#f59e0b', size: 36, tilt: -0.3 },
          { x: centerX + 210, y: centerY - 140, color: '#e11d48', size: 32, tilt: 0.25 },
          { x: centerX + 180, y: centerY + 100, color: '#38bdf8', size: 28, tilt: -0.15 },
        ];

        kitePositions.forEach((k) => {
          ctx.save();
          ctx.translate(k.x, k.y);
          ctx.rotate(k.tilt + Math.sin(angle * 3) * 0.1);

          // Diamond kite body
          ctx.beginPath();
          ctx.moveTo(0, -k.size);
          ctx.lineTo(k.size * 0.7, 0);
          ctx.lineTo(0, k.size);
          ctx.lineTo(-k.size * 0.7, 0);
          ctx.closePath();
          ctx.fillStyle = k.color;
          ctx.shadowColor = k.color;
          ctx.shadowBlur = 12;
          ctx.fill();

          // Cross spine
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -k.size);
          ctx.lineTo(0, k.size);
          ctx.moveTo(-k.size * 0.7, 0);
          ctx.lineTo(k.size * 0.7, 0);
          ctx.stroke();

          // Kite string/tail
          ctx.beginPath();
          ctx.moveTo(0, k.size);
          ctx.quadraticCurveTo(15, k.size + 25, 0, k.size + 50);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        });
      } else if (seasonalTheme === 'DIWALI') {
        // Deepam lamps glowing warmly around the perimeter
        const lampCount = 8;
        for (let i = 0; i < lampCount; i++) {
          const lAngle = (i * Math.PI * 2) / lampCount + angle * 0.5;
          const lx = centerX + Math.cos(lAngle) * 190;
          const ly = centerY + Math.sin(lAngle) * 190;

          ctx.save();
          ctx.translate(lx, ly);
          // Clay base
          ctx.beginPath();
          ctx.arc(0, 4, 9, 0, Math.PI);
          ctx.fillStyle = '#92400e';
          ctx.fill();

          // Golden Flame
          ctx.beginPath();
          ctx.ellipse(0, -2, 4, 8, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 16;
          ctx.fill();
          ctx.restore();
        }
      }

      // 4. Update & Render Ambient Cultural Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spinSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Central Monument Node Beacon for Active Destination
      ctx.save();
      ctx.translate(centerX, centerY);
      const beaconGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 60);
      beaconGrad.addColorStop(0, currentDest.accentColor);
      beaconGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.15)');
      beaconGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beaconGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing center emblem
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#060a17';
      ctx.strokeStyle = currentDest.accentColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = currentDest.accentColor;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [viewMode, seasonalTheme, activeDestination, isRotating, currentDest]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 bg-[#020409]/60 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Universe Title & 2D/3D Mode Switch */}
        <div className="flex items-center gap-2">
          <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white tracking-wide">LIVING UNIVERSE</span>
            <span className="text-slate-400 text-[11px]">|</span>
            <span className="text-amber-400 font-telugu text-[11px]">ఉటా తెలుగు లోకం</span>
          </div>

          <div className="flex items-center bg-slate-900/80 p-0.5 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('3D')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 ${
                viewMode === '3D' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Spatial</span>
            </button>
            <button
              onClick={() => setViewMode('2D')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 ${
                viewMode === '2D' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>2D Accessible</span>
            </button>
          </div>
        </div>

        {/* Right: Seasonal Theme Switcher & Ambient Heritage Audio */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setSeasonalTheme('SANKRANTHI')}
              title="Sankranthi Harvest Theme (Kites & Rangoli)"
              className={`px-2.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                seasonalTheme === 'SANKRANTHI' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Sankranthi</span>
            </button>
            <button
              onClick={() => setSeasonalTheme('UGADI')}
              title="Ugadi Telugu New Year Theme (Mango leaves)"
              className={`px-2.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                seasonalTheme === 'UGADI' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Ugadi</span>
            </button>
            <button
              onClick={() => setSeasonalTheme('BATHUKAMMA')}
              title="Bathukamma Floral Theme"
              className={`px-2.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                seasonalTheme === 'BATHUKAMMA' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flower2 className="w-3 h-3 text-rose-400" />
              <span>Bathukamma</span>
            </button>
            <button
              onClick={() => setSeasonalTheme('DIWALI')}
              title="Diwali Lights & Deepam Theme"
              className={`px-2.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                seasonalTheme === 'DIWALI' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-orange-400" />
              <span>Diwali</span>
            </button>
          </div>

          <SoundController />

          {viewMode === '3D' && (
            <button
              onClick={() => setIsRotating(!isRotating)}
              title={isRotating ? 'Pause rotation' : 'Resume rotation'}
              className="p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-white/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Experience Area: 3D Canvas OR 2D Fallback */}
      {viewMode === '3D' ? (
        <div className="relative w-full h-[580px] sm:h-[640px]">
          <ThreeScene
            activeDestination={activeDestination}
            onSelectDestination={setActiveDestination}
            seasonalTheme={seasonalTheme}
            isRotating={isRotating}
          />

          {/* Floating Spatial Inspection Card for Selected Destination */}
          <div className="absolute bottom-20 left-4 right-4 sm:left-6 sm:max-w-md z-20 pointer-events-auto">
            <div className="glass-panel p-5 rounded-2xl border border-white/15 bg-[#060a17]/85 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      borderColor: `${currentDest.accentColor}40`,
                      backgroundColor: `${currentDest.accentColor}15`,
                    }}
                  >
                    {currentDest.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      {currentDest.title}
                      <span className="text-xs font-normal text-amber-400/80 font-telugu">
                        {currentDest.telugu}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">{currentDest.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {currentDest.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Active Season: <strong className="text-amber-400">{seasonalTheme}</strong>
                </span>
                <Link
                  href={currentDest.route}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all"
                >
                  <span>Enter Destination</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2D Accessible Destination Grid Fallback */
        <div className="p-8 sm:p-12 min-h-[580px] flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Accessible 2D Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Explore the Utah Telugu Universe
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All six official community destinations accessible with full screen-reader and keyboard navigation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={`glass-panel p-5 rounded-xl border transition-all hover:border-amber-400/40 hover:-translate-y-1 ${
                  activeDestination === dest.id ? 'border-amber-400/60 bg-amber-400/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/5">{dest.icon}</div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{dest.title}</h3>
                    <p className="text-[11px] text-amber-400 font-telugu">{dest.telugu}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{dest.description}</p>
                <Link
                  href={dest.route}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Explore route</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Destination Selector Ribbon at the bottom */}
      <div className="bg-[#050813] border-t border-white/10 p-3 sm:p-4">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveDestination(dest.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeDestination === dest.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-md shadow-amber-500/10'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="scale-75">{dest.icon}</span>
              <span>{dest.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
