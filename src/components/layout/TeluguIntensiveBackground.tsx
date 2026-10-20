'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Palette, Check, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export interface BackgroundPreset {
  id: string;
  name: string;
  telugu: string;
  rating: number; // Score out of 100
  badge: string;
  description: string;
}

export const TELUGU_BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'chandanam-padmam',
    name: 'Chandanam Silk & Ashta-Dala Padmam',
    telugu: 'చందనం & అష్టదళ పద్మ ముగ్గు',
    rating: 98,
    badge: '🏆 #1 HIGHEST RATED (DEFAULT)',
    description: 'Sacred 8-petaled rice flour lotus Rangoli on sandalwood silk ivory with floating rose & turmeric embers.',
  },
  {
    id: 'kakatiya-thoranam',
    name: 'Kakatiya Keerthi Thoranam & Koh-i-Noor',
    telugu: 'కాకతీయ తోరణం & వజ్రపు వెలుగులు',
    rating: 95,
    badge: 'RUNNER UP (95/100)',
    description: 'Iconic Warangal victory archway contours with prismatic diamond facet refractions in antique gold.',
  },
  {
    id: 'krishna-godavari',
    name: 'Krishna-Godavari Sacred River Delta',
    telugu: 'కృష్ణా-గోదావరి జీవనదుల ప్రవాహం',
    rating: 94,
    badge: 'EXCELLENT (94/100)',
    description: 'Sinuous alluvial river delta contours with mica flecks celebrating the agricultural lifeblood of Telugu lands.',
  },
  {
    id: 'kuchipudi-tarangam',
    name: 'Kuchipudi Tarangam & Natya Shastra Rhythms',
    telugu: 'కూచిపూడి తరంగం & ఘంటానాదం',
    rating: 93,
    badge: 'ELEGANT (93/100)',
    description: 'Fluid mathematical brass plate harmonics and temple ghungroo bell reverberations oscillating with cursor motion.',
  },
  {
    id: 'swarna-gopuram',
    name: 'Swarna Gopuram & Dravidian Temple Steps',
    telugu: 'స్వర్ణ గోపురం & ఆలయ శిల్పకళ',
    rating: 92,
    badge: 'MAJESTIC (92/100)',
    description: 'Architectural Dravidian vimana step contours and sacred kalasam silhouettes with floating golden diya embers.',
  },
  {
    id: 'sankranthi-surya',
    name: 'Makara Sankranthi Surya Prabha & Gaalipatam',
    telugu: 'సూర్యప్రభ & గాలిపటాల నభస్సు',
    rating: 92,
    badge: 'FESTIVE (92/100)',
    description: '12-ray Uttarayana dawn sunburst spreading warm luminescence with geometric kite flight paths.',
  },
  {
    id: 'pochampally-ikkat',
    name: 'Pochampally Ikkat Diamond Weave',
    telugu: 'పోచంపల్లి ఇక్కత్ జాళీ',
    rating: 91,
    badge: 'HERITAGE (91/100)',
    description: 'Mathematical diamond lattices and ikat chevron gradients in translucent gold and madder crimson threads.',
  },
  {
    id: 'bathukamma-floral',
    name: 'Bathukamma Concentric Wildflower Waves',
    telugu: 'బతుకమ్మ పూల తరంగాలు',
    rating: 91,
    badge: 'BOTANICAL (91/100)',
    description: 'Rhythmic expanding petal ripples of Tangedu yellow, Gunugu silver, and saffron marigold.',
  },
  {
    id: 'telugu-akshara',
    name: 'Telugu Akshara Lipi Constellations',
    telugu: 'తెలుగు అక్షరమాల & నక్షత్ర మండలం',
    rating: 90,
    badge: 'LYRICAL (90/100)',
    description: 'The circular flowing curves of Telugu vowels and consonants connected like golden celestial star charts.',
  },
  {
    id: 'lepakshi-kalamkari',
    name: 'Lepakshi Kalamkari Tapestry & Hamsa',
    telugu: 'లేపాక్షి కలంకారి & హంసల కుడ్యచిత్రం',
    rating: 88,
    badge: 'FRESCO (88/100)',
    description: 'Sinuous botanical vines, royal sacred swans (hamsa), and blooming lotus buds in soft terracotta ochre.',
  },
];

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
  hue: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
}

export default function TeluguIntensiveBackground() {
  const pathname = usePathname();

  // Yield on Sankranthi 2027 registration hub to preserve reference celestial atmosphere
  if (pathname?.startsWith('/events/sankranthi-2027')) {
    return null;
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePresetId, setActivePresetId] = useState<string>('chandanam-padmam');
  const [panelOpen, setPanelOpen] = useState(false);

  // Load user preference if stored, otherwise default to #1 winner
  useEffect(() => {
    try {
      const saved = localStorage.getItem('uta_bg_preset');
      if (saved && TELUGU_BACKGROUND_PRESETS.some((p) => p.id === saved)) {
        setActivePresetId(saved);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const handleSelectPreset = (id: string) => {
    setActivePresetId(id);
    try {
      localStorage.setItem('uta_bg_preset', id);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating particles pool
    const particles: Particle[] = [];
    const particleCount = 40;

    const createParticle = (initialY?: number): Particle => {
      const isCrimson = Math.random() < 0.35;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 30,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        hue: isCrimson ? 346 : Math.floor(Math.random() * 10 + 38), // Kumkuma Rose or Pasupu Gold
        alpha: Math.random() * 0.45 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    // ========================================================
    // 10 DISTINCT TELUGU HERITAGE PROCEDURAL DRAWING ENGINES
    // ========================================================

    // PRESET 1: Chandanam Silk & Ashta-Dala Padmam (WINNER - 98/100)
    const drawChandanamPadmam = (normX: number, normY: number) => {
      const cx = width * 0.5 + normX * 18;
      const cy = height * 0.45 + normY * 18;
      const radius = Math.min(width, height) * 0.36;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.0006);

      // Concentric Brahma Mudi / Kalachakra Rings
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(190, 18, 60, 0.14)';
      ctx.lineWidth = 0.9;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 8-Petal Sacred Lotus (అష్టదళ పద్మ ముగ్గు)
      const petals = 8;
      for (let p = 0; p < petals; p++) {
        const petalAngle = (p * Math.PI * 2) / petals;
        ctx.save();
        ctx.rotate(petalAngle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.35, radius * 0.45, 0, radius * 0.85);
        ctx.quadraticCurveTo(-radius * 0.35, radius * 0.45, 0, 0);
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.18)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, radius * 0.95, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    };

    // PRESET 2: Swarna Gopuram & Dravidian Temple Steps (92/100)
    const drawSwarnaGopuram = (normX: number, normY: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.15)';
      ctx.lineWidth = 1;
      const tiers = 7;
      const baseW = Math.min(width, 700);
      const startY = height * 0.75 + normY * 15;

      for (let i = 0; i < tiers; i++) {
        const stepW = baseW * (1 - i * 0.11);
        const y = startY - i * 48;
        ctx.strokeRect((width - stepW) / 2 + normX * 10, y, stepW, 40);

        // Step Pillar Verticals
        const cols = 6;
        for (let c = 1; c < cols; c++) {
          const colX = (width - stepW) / 2 + (stepW / cols) * c + normX * 10;
          ctx.beginPath();
          ctx.moveTo(colX, y);
          ctx.lineTo(colX, y + 40);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // PRESET 3: Lepakshi Kalamkari Tapestry (88/100)
    const drawLepakshiKalamkari = (normX: number, normY: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.13)';
      ctx.lineWidth = 1.2;
      const count = 4;
      for (let i = 0; i < count; i++) {
        const offsetX = (width / count) * i;
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.bezierCurveTo(
          offsetX + 80 + normX * 20,
          height * 0.3,
          offsetX - 80 + normX * 20,
          height * 0.7,
          offsetX + 40,
          height
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    // PRESET 4: Bathukamma Wildflower Waves (91/100)
    const drawBathukammaWaves = (normX: number, normY: number) => {
      ctx.save();
      const cx = width * 0.5 + normX * 15;
      const cy = height * 0.5 + normY * 15;
      const rings = 6;
      for (let r = 1; r <= rings; r++) {
        const radius = r * 55 + Math.sin(time * 0.002 + r) * 12;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(217, 119, 6, 0.16)' : 'rgba(190, 18, 60, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    // PRESET 5: Pochampally Ikkat Diamond Weave (91/100)
    const drawPochampallyIkkat = (normX: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.1)';
      ctx.lineWidth = 0.9;
      const step = 64;
      const cols = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * step + (r % 2 === 0 ? 0 : step / 2) + normX * 5;
          const y = r * step;
          ctx.beginPath();
          ctx.moveTo(x, y - step / 2);
          ctx.lineTo(x + step / 2, y);
          ctx.lineTo(x, y + step / 2);
          ctx.lineTo(x - step / 2, y);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // PRESET 6: Makara Sankranthi Surya Prabha & Gaalipatam (92/100)
    const drawSankranthiSurya = (normX: number, normY: number) => {
      ctx.save();
      const cx = width * 0.5 + normX * 20;
      const cy = height * 0.35 + normY * 20;
      const rays = 12;
      for (let i = 0; i < rays; i++) {
        const angle = (i * Math.PI * 2) / rays + time * 0.0003;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * width * 0.7, cy + Math.sin(angle) * width * 0.7);
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    // PRESET 7: Kuchipudi Tarangam & Natya Shastra Rhythms (93/100)
    const drawKuchipudiTarangam = (normX: number, normY: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.12)';
      ctx.lineWidth = 1.1;
      const waves = 5;
      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        const baseOffset = height * 0.3 + w * 70 + normY * 10;
        for (let x = 0; x <= width; x += 15) {
          const y = baseOffset + Math.sin(x * 0.006 + time * 0.0015 + w) * 28 + Math.cos(x * 0.003) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    // PRESET 8: Telugu Akshara Lipi Constellations (90/100)
    const drawTeluguAkshara = (normX: number, normY: number) => {
      ctx.save();
      ctx.font = '28px "Noto Sans Telugu", sans-serif';
      ctx.fillStyle = 'rgba(180, 83, 9, 0.12)';
      const glyphs = ['అ', 'ఆ', 'క', 'ఖ', 'గ', 'చ', 'జ', 'త', 'ద', 'న', 'శ్రీ', 'ఓం'];
      const count = 12;
      for (let i = 0; i < count; i++) {
        const x = (width / 4) * (i % 4) + 60 + Math.sin(time * 0.001 + i) * 20 + normX * 10;
        const y = Math.floor(i / 4) * (height / 3) + 100 + Math.cos(time * 0.001 + i) * 20 + normY * 10;
        ctx.fillText(glyphs[i % glyphs.length], x, y);
      }
      ctx.restore();
    };

    // PRESET 9: Krishna-Godavari Sacred River Confluence (94/100)
    const drawKrishnaGodavari = (normX: number, normY: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.12)';
      ctx.lineWidth = 1.2;
      const paths = 4;
      for (let p = 0; p < paths; p++) {
        ctx.beginPath();
        ctx.moveTo(0, height * 0.2 + p * 80 + normY * 15);
        ctx.bezierCurveTo(
          width * 0.35 + normX * 25,
          height * 0.1 + p * 90,
          width * 0.65 - normX * 25,
          height * 0.8 + p * 50,
          width,
          height * 0.6 + p * 60
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    // PRESET 10: Kakatiya Keerthi Thoranam & Koh-i-Noor (95/100)
    const drawKakatiyaThoranam = (normX: number, normY: number) => {
      ctx.save();
      const cx = width * 0.5 + normX * 12;
      const cy = height * 0.48 + normY * 12;
      const archW = Math.min(width * 0.6, 520);
      const archH = archW * 0.75;

      ctx.strokeStyle = 'rgba(180, 83, 9, 0.16)';
      ctx.lineWidth = 1.2;

      // Outer & Inner Warangal Arch Curves
      ctx.beginPath();
      ctx.arc(cx, cy + 60, archW / 2, Math.PI, 0, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy + 60, archW / 2 - 35, Math.PI, 0, false);
      ctx.stroke();

      // Flanking Pillars
      ctx.strokeRect(cx - archW / 2 - 25, cy + 60, 25, archH * 0.6);
      ctx.strokeRect(cx + archW / 2, cy + 60, 25, archH * 0.6);

      // Central Diamond Glint (Koh-i-Noor facet)
      ctx.beginPath();
      ctx.moveTo(cx, cy - archW / 2 + 15);
      ctx.lineTo(cx + 18, cy - archW / 2 + 35);
      ctx.lineTo(cx, cy - archW / 2 + 55);
      ctx.lineTo(cx - 18, cy - archW / 2 + 35);
      ctx.closePath();
      ctx.fillStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // ========================================================
    // MAIN ANIMATION LOOP
    // ========================================================
    const render = () => {
      time++;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const normMouseX = (mouseX / width - 0.5) * 2;
      const normMouseY = (mouseY / height - 0.5) * 2;

      // 1. Fully Transparent Clear - lets the active theme's background color shine through seamlessly!
      ctx.clearRect(0, 0, width, height);

      // 2. Render Active Telugu Heritage Preset
      switch (activePresetId) {
        case 'chandanam-padmam':
          drawChandanamPadmam(normMouseX, normMouseY);
          break;
        case 'kakatiya-thoranam':
          drawKakatiyaThoranam(normMouseX, normMouseY);
          break;
        case 'krishna-godavari':
          drawKrishnaGodavari(normMouseX, normMouseY);
          break;
        case 'kuchipudi-tarangam':
          drawKuchipudiTarangam(normMouseX, normMouseY);
          break;
        case 'swarna-gopuram':
          drawSwarnaGopuram(normMouseX, normMouseY);
          break;
        case 'sankranthi-surya':
          drawSankranthiSurya(normMouseX, normMouseY);
          break;
        case 'pochampally-ikkat':
          drawPochampallyIkkat(normMouseX);
          break;
        case 'bathukamma-floral':
          drawBathukammaWaves(normMouseX, normMouseY);
          break;
        case 'telugu-akshara':
          drawTeluguAkshara(normMouseX, normMouseY);
          break;
        case 'lepakshi-kalamkari':
          drawLepakshiKalamkari(normMouseX, normMouseY);
          break;
        default:
          drawChandanamPadmam(normMouseX, normMouseY);
      }

      // 3. Floating Auspicious Golden Embers & Sacred Sparks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.life * 0.03) * 0.35;
        p.rotation += p.rotationSpeed;
        p.life++;

        // Interactive mouse gentle breeze
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 1) {
          const force = (1 - dist / 120) * 0.7;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        const progress = p.life / p.maxLife;
        const currentAlpha =
          progress < 0.2
            ? (progress / 0.2) * p.alpha
            : (1 - progress) * p.alpha;

        if (currentAlpha > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${currentAlpha * 0.85})`;
          ctx.fill();
          ctx.restore();
        }

        if (p.y < -20 || p.life >= p.maxLife) {
          particles[i] = createParticle();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activePresetId]);

  const activePreset = TELUGU_BACKGROUND_PRESETS.find((p) => p.id === activePresetId) || TELUGU_BACKGROUND_PRESETS[0];

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 block"
        aria-hidden="true"
      />

      {/* Floating Heritage Background Switcher Tool */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto">
        {!panelOpen ? (
          <button
            onClick={() => setPanelOpen(true)}
            title="Explore 10 Telugu Cultural Backgrounds (Rated & Evaluated)"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel bg-[#071a20]/90 border border-[#f4bb59]/40 shadow-xl text-xs font-bold text-[#fff5dc] hover:border-[#f4bb59] transition-all group"
          >
            <Palette className="w-4 h-4 text-[#f4bb59] group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline">Theme: {activePreset.name.split('&')[0]}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#f4bb59]/15 text-[#f4bb59] text-[10px] font-mono font-bold">
              {activePreset.rating}/100
            </span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-3xl glass-panel bg-[#071a20]/95 backdrop-blur-2xl border border-[#f4bb59]/30 shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-3 text-[#fff5dc]">
            <div className="flex items-center justify-between border-b border-[#f4bb59]/20 pb-2.5">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#f4bb59]" />
                <span className="font-bold text-xs text-white">
                  10 Telugu Cultural Backgrounds
                </span>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#e7d5b8] leading-tight">
              Evaluated on Authenticity, Contrast & 60fps Physics. Tap any preset to preview live:
            </p>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {TELUGU_BACKGROUND_PRESETS.map((p) => {
                const isSelected = p.id === activePresetId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'border-[#f4bb59] bg-[#f4bb59]/20 shadow-sm'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#f4bb59]/30'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#f4bb59] shrink-0" />}
                      </div>
                      <p className="text-[11px] font-telugu text-[#ffcb75] font-semibold">{p.telugu}</p>
                      <p className="text-[10px] text-[#e7d5b8]/70 line-clamp-1">{p.description}</p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f4bb59]/15 text-[#f4bb59] border border-[#f4bb59]/30">
                        {p.rating}/100
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#f4bb59]/20 flex items-center justify-between text-[11px] text-[#e7d5b8]">
              <span>Active: {activePreset.name.split('&')[0]}</span>
              <button
                onClick={() => handleSelectPreset('chandanam-padmam')}
                className="text-[#f4bb59] font-bold hover:underline"
              >
                Reset to Default #1
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
