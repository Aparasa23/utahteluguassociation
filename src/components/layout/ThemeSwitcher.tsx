'use client';

import React, { useState, useEffect } from 'react';
import {
  Palette,
  Check,
  Sparkles,
  X,
  ThumbsUp,
  Award,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Info,
} from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  teluguName: string;
  tagline: string;
  rank: number;
  score: number;
  badge: string;
  palette: {
    bg: string;
    card: string;
    accent: string;
    secondary: string;
    highlight: string;
  };
  metrics: {
    culturalResonance: number;
    visualLuxury: number;
    contrastReadability: number;
    cinematicImmersion: number;
    versatility: number;
  };
  description: string;
  recommendedFor: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'sankranthi-sun',
    name: 'Sankranthi Sun & Harvest Glow',
    teluguName: 'సంక్రాంతి సూర్యప్రభ & బంగారు పంటలు',
    tagline: 'Deep Obsidian Charcoal with Marigold Sunburst & Turmeric Embers',
    rank: 1,
    score: 9.6,
    badge: '★ #1 RECOMMENDED WINNER',
    palette: {
      bg: '#0e0d0b',
      card: '#231d14',
      accent: '#f59e0b',
      secondary: '#fbbf24',
      highlight: '#f97316',
    },
    metrics: {
      culturalResonance: 9.9,
      visualLuxury: 9.6,
      contrastReadability: 9.5,
      cinematicImmersion: 9.7,
      versatility: 9.4,
    },
    description:
      'Directly echoes the Uttarayana solar transition, golden paddy sheaves, kite festivals, and sacred Bhogi bonfires. Warm, welcoming, and high-contrast.',
    recommendedFor: 'Highest thematic alignment for UTA Sankranthi 2027 festival.',
  },
  {
    id: 'active-theory-cyber',
    name: 'Active Theory OLED Cyber',
    teluguName: 'యాక్టివ్ థియరీ ఓలెడ్ బ్లాక్ & లేజర్ అంబర్',
    tagline: 'Pure Pitch Black (0x000000) with High-Precision Laser Amber Refractions',
    rank: 2,
    score: 9.5,
    badge: '⚡ MOST IMMERSIVE & FUTURISTIC',
    palette: {
      bg: '#000000',
      card: '#141414',
      accent: '#ffaa00',
      secondary: '#ffc233',
      highlight: '#00f0ff',
    },
    metrics: {
      culturalResonance: 9.1,
      visualLuxury: 9.8,
      contrastReadability: 9.9,
      cinematicImmersion: 9.8,
      versatility: 9.1,
    },
    description:
      'Ultra-deep blacks engineered for HDR OLED displays, inspired by Active Theory and Lusion award-winning web aesthetics with piercing gold laser highlights.',
    recommendedFor: 'Maximum WOW factor, fluid 3D refractions, and intense dark mode contrast.',
  },
  {
    id: 'kakatiya-gold',
    name: 'Kakatiya 24K Temple Gold',
    teluguName: 'కాకతీయ స్వర్ణ తోరణం & రాజసం',
    tagline: 'Royal Obsidian Noir with 24-Karat Antique Brass & Keerthi Thoranam Sheen',
    rank: 3,
    score: 9.4,
    badge: '👑 ROYAL HERITAGE NOIR',
    palette: {
      bg: '#070a0e',
      card: '#141a23',
      accent: '#e5b869',
      secondary: '#f3cf8a',
      highlight: '#e05353',
    },
    metrics: {
      culturalResonance: 9.6,
      visualLuxury: 9.5,
      contrastReadability: 9.3,
      cinematicImmersion: 9.4,
      versatility: 9.3,
    },
    description:
      'Evokes the dynastic grandeur of Warangal fortress gate carvings and Koh-i-Noor diamond luster set against midnight charcoal.',
    recommendedFor: 'Traditional luxury, official gala dinners, and stately community presence.',
  },
  {
    id: 'tirumala-emerald',
    name: 'Tirumala Vaikunta Jade',
    teluguName: 'తిరుమల వైకుంఠ మరకతం & పచ్చని లోయలు',
    tagline: 'Sacred Forest Jade & Emerald with Temple Bell Brass and Tulasi Flora',
    rank: 4,
    score: 9.3,
    badge: '🌿 SACRED & SERENE',
    palette: {
      bg: '#03120e',
      card: '#0c2a21',
      accent: '#34d399',
      secondary: '#6ee7b7',
      highlight: '#10b981',
    },
    metrics: {
      culturalResonance: 9.5,
      visualLuxury: 9.3,
      contrastReadability: 9.4,
      cinematicImmersion: 9.3,
      versatility: 9.0,
    },
    description:
      'Inspired by the sacred Seshachalam hills, fresh Tulasi garlands, and the emerald murtis of Telugu spiritual traditions.',
    recommendedFor: 'Spiritual events, temple calendars, yoga/wellness and peaceful reading.',
  },
  {
    id: 'godavari-azure',
    name: 'Godavari Midnight Azure',
    teluguName: 'గోదావరి తరంగాలు & నీలి రాగం',
    tagline: 'Deep River Indigo with Iridescent Seafoam Pearl & Aqua Reflections',
    rank: 5,
    score: 9.2,
    badge: '🌊 MODERN OCEANIC LUXURY',
    palette: {
      bg: '#060e1d',
      card: '#0e1e38',
      accent: '#38bdf8',
      secondary: '#7dd3fc',
      highlight: '#10b981',
    },
    metrics: {
      culturalResonance: 9.1,
      visualLuxury: 9.3,
      contrastReadability: 9.6,
      cinematicImmersion: 9.2,
      versatility: 9.0,
    },
    description:
      'Flows like the mighty Akhanda Godavari at dusk under the moonlight, blending cool cyan illumination with river delta depth.',
    recommendedFor: 'Tech-forward youth appeal, cricket tournament brackets, and live stream pages.',
  },
  {
    id: 'celestial-twilight',
    name: 'Celestial Twilight Amethyst',
    teluguName: 'జ్యోతిష మండలం & తారల వెలుగు',
    tagline: 'Cosmic Royal Violet with Starlight Platinum & Planetary Ring Glow',
    rank: 6,
    score: 9.2,
    badge: '✨ MYSTICAL & CELESTIAL',
    palette: {
      bg: '#090514',
      card: '#1e1034',
      accent: '#a78bfa',
      secondary: '#c4b5fd',
      highlight: '#38bdf8',
    },
    metrics: {
      culturalResonance: 9.0,
      visualLuxury: 9.4,
      contrastReadability: 9.2,
      cinematicImmersion: 9.5,
      versatility: 8.9,
    },
    description:
      'Celebrates Makara Sankranthi as an astronomical constellation transit into the northern celestial hemisphere.',
    recommendedFor: 'Musical galas, evening concerts, youth dance competitions, and cinematic videos.',
  },
  {
    id: 'lepakshi-crimson',
    name: 'Lepakshi Silk Crimson',
    teluguName: 'లేపాక్షి పట్టు కుంకుమ & గులాబీ వెండి',
    tagline: 'Gadwal Silk Brocade Deep Wine with Rose Gold & Vermilion Kunku Accents',
    rank: 7,
    score: 9.1,
    badge: '🌺 FESTIVE SILK BROCADE',
    palette: {
      bg: '#18060d',
      card: '#300e1c',
      accent: '#f7a399',
      secondary: '#ffc2d1',
      highlight: '#e63946',
    },
    metrics: {
      culturalResonance: 9.7,
      visualLuxury: 9.1,
      contrastReadability: 8.9,
      cinematicImmersion: 9.0,
      versatility: 8.8,
    },
    description:
      'Rich woven Gadwal and Dharmavaram wedding sarees in auspicious kumkuma red and shimmering rose gold.',
    recommendedFor: 'Traditional marriages, Ugadi celebrations, classical dance, and family galas.',
  },
  {
    id: 'kalamkari-indigo',
    name: 'Kalamkari Handloom Indigo',
    teluguName: 'కలంకారి సహజ నీలి & మట్టి రంగులు',
    tagline: 'Artisanal Natural Plant Indigo with Madder Terracotta and Hand-Drawn Motifs',
    rank: 8,
    score: 9.0,
    badge: '🧵 ARTISANAL HERITAGE',
    palette: {
      bg: '#0a111a',
      card: '#172434',
      accent: '#d97706',
      secondary: '#f59e0b',
      highlight: '#b91c1c',
    },
    metrics: {
      culturalResonance: 9.5,
      visualLuxury: 8.8,
      contrastReadability: 9.2,
      cinematicImmersion: 8.8,
      versatility: 9.0,
    },
    description:
      'Honors the legendary Machilipatnam and Srikalahasti organic dye traditions of pen-painted organic cottons.',
    recommendedFor: 'Telugu Badi language schools, literature circles, and historical archives.',
  },
  {
    id: 'amaravati-ivory',
    name: 'Amaravati Alabaster & Brass (Light)',
    teluguName: 'అమరావతి శ్వేత శిల్పం & ఇత్తడి కాంతి',
    tagline: 'Sculpted White Marble Sandstone with Antique Warm Brass & Parchment Luxury',
    rank: 9,
    score: 8.9,
    badge: '☀️ LIGHT LUXURY ARCHITECTURE',
    palette: {
      bg: '#f7f3ea',
      card: '#ffffff',
      accent: '#b45309',
      secondary: '#d97706',
      highlight: '#be123c',
    },
    metrics: {
      culturalResonance: 9.2,
      visualLuxury: 9.1,
      contrastReadability: 9.7,
      cinematicImmersion: 8.0,
      versatility: 8.8,
    },
    description:
      'For users who prefer daytime light mode. Inspired by Amaravati Buddhist stupas, polished limestone, and carved wood.',
    recommendedFor: 'Daytime reading, printed handouts, sponsor decks, and high-ambient light environments.',
  },
  {
    id: 'hampi-terracotta',
    name: 'Hampi Sunbaked Terracotta',
    teluguName: 'హంపీ శిలా సౌందర్యం & ఎర్రమట్టి కాంతి',
    tagline: 'Sunbaked Laterite Stone & Terracotta Bronze of the Vijayanagara Capital',
    rank: 10,
    score: 8.8,
    badge: '🏛️ STONE ARCHITECTURE',
    palette: {
      bg: '#120d09',
      card: '#2a1c12',
      accent: '#e08a46',
      secondary: '#fb923c',
      highlight: '#c2410c',
    },
    metrics: {
      culturalResonance: 9.3,
      visualLuxury: 8.6,
      contrastReadability: 9.0,
      cinematicImmersion: 8.8,
      versatility: 8.7,
    },
    description:
      'Captures the boulder-strewn sunsets of Hampi, sunbaked stone pillars, and rugged earthen pottery of the Deccan.',
    recommendedFor: 'Outdoor festivals, athletic challenges, and archaeological retrospectives.',
  },
];

export default function ThemeSwitcher() {
  const [activeThemeId, setActiveThemeId] = useState<string>('sankranthi-sun');
  const [isOpen, setIsOpen] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [hasVotedFor, setHasVotedFor] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize theme from localStorage or default to sankranthi-sun
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('uta_theme_preference');
      const validTheme = THEME_OPTIONS.find((t) => t.id === savedTheme);
      const chosen = validTheme ? validTheme.id : 'sankranthi-sun';
      setActiveThemeId(chosen);
      document.documentElement.setAttribute('data-theme', chosen);

      // Initialize votes
      const savedVotes = localStorage.getItem('uta_theme_votes');
      if (savedVotes) {
        setUserVotes(JSON.parse(savedVotes));
      } else {
        const initialVotes: Record<string, number> = {
          'sankranthi-sun': 142,
          'active-theory-cyber': 128,
          'kakatiya-gold': 115,
          'tirumala-emerald': 94,
          'godavari-azure': 89,
          'celestial-twilight': 85,
          'lepakshi-crimson': 78,
          'kalamkari-indigo': 71,
          'amaravati-ivory': 64,
          'hampi-terracotta': 58,
        };
        setUserVotes(initialVotes);
        localStorage.setItem('uta_theme_votes', JSON.stringify(initialVotes));
      }

      const voted = localStorage.getItem('uta_user_voted_theme');
      if (voted) {
        setHasVotedFor(voted);
      }
    } catch {
      // Fallback
    }

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('uta_open_theme_switcher', handleOpenEvent);
    return () => {
      window.removeEventListener('uta_open_theme_switcher', handleOpenEvent);
    };
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setActiveThemeId(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    try {
      localStorage.setItem('uta_theme_preference', themeId);
    } catch {
      // Ignore storage errors
    }
    const themeObj = THEME_OPTIONS.find((t) => t.id === themeId);
    showToast(`Theme switched to: ${themeObj?.name}`);
  };

  const handleVote = (e: React.MouseEvent, themeId: string) => {
    e.stopPropagation();
    try {
      const updated = { ...userVotes, [themeId]: (userVotes[themeId] || 0) + 1 };
      setUserVotes(updated);
      setHasVotedFor(themeId);
      localStorage.setItem('uta_theme_votes', JSON.stringify(updated));
      localStorage.setItem('uta_user_voted_theme', themeId);
      const themeObj = THEME_OPTIONS.find((t) => t.id === themeId);
      showToast(`Vote recorded for "${themeObj?.name}"! Thank you!`);
    } catch {
      // Ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const activeTheme = THEME_OPTIONS.find((t) => t.id === activeThemeId) || THEME_OPTIONS[0];

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-[9999] bg-black/90 text-white border border-[var(--accent-gold)] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 text-xs font-semibold backdrop-blur-xl">
          <Sparkles className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Theme Button (Bottom Left to not clash with background preset) */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-[var(--border-card)] shadow-2xl text-xs font-bold transition-all group hover:scale-105"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
          title="Explore & Vote on 10 Luxury Themes"
        >
          <div className="flex items-center -space-x-1.5 shrink-0">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/40"
              style={{ backgroundColor: activeTheme.palette.bg }}
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/40"
              style={{ backgroundColor: activeTheme.palette.accent }}
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/40"
              style={{ backgroundColor: activeTheme.palette.highlight }}
            />
          </div>
          <span className="hidden sm:inline font-mono">Theme: {activeTheme.name.split('&')[0]}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30">
            ★ {activeTheme.score}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--accent-gold)] hidden md:inline">
            10 Themes &amp; Vote
          </span>
        </button>
      </div>

      {/* Full Modal Drawer for Comparing and Voting on all 10 Themes */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] rounded-3xl border border-[var(--border-card)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-5 py-4 border-b border-[var(--border-card)] flex items-center justify-between shrink-0"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <Palette className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-black text-lg text-[var(--text-primary)]">
                      10 Cultural Design Themes &amp; Live Voting
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30">
                      Ranked &amp; Scored
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Tap any theme to instantly morph the entire website. Vote for your favorite to set the official identity!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-colors"
                aria-label="Close theme switcher"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = theme.id === activeThemeId;
                  const isVoted = hasVotedFor === theme.id;
                  const voteCount = userVotes[theme.id] || 0;

                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[var(--accent-gold)] shadow-xl ring-2 ring-[var(--accent-gold)]/40'
                          : 'border-[var(--border-card)] hover:border-[var(--accent-gold)]/50'
                      }`}
                      style={{
                        background: isSelected
                          ? 'var(--bg-card)'
                          : 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))',
                      }}
                    >
                      {/* Top Bar: Rank, Badge, Swatches */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center font-mono ${
                                theme.rank <= 3
                                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] shadow-sm'
                                  : 'bg-white/10 text-[var(--text-secondary)]'
                              }`}
                            >
                              #{theme.rank}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-gold)] font-mono">
                              {theme.badge}
                            </span>
                          </div>

                          {/* 4-Color Swatch */}
                          <div className="flex items-center -space-x-1.5 p-1 rounded-full bg-black/40 border border-white/10">
                            <span
                              className="w-4 h-4 rounded-full border border-black/50 shadow-sm"
                              style={{ backgroundColor: theme.palette.bg }}
                              title="Background tone"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/50 shadow-sm"
                              style={{ backgroundColor: theme.palette.card }}
                              title="Card / Surface"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/50 shadow-sm"
                              style={{ backgroundColor: theme.palette.accent }}
                              title="Primary Accent"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/50 shadow-sm"
                              style={{ backgroundColor: theme.palette.highlight }}
                              title="Secondary Highlight"
                            />
                          </div>
                        </div>

                        {/* Title and Telugu */}
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-black text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                              {theme.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 px-2 py-0.5 rounded-full border border-[var(--accent-gold)]/30">
                              ★ {theme.score} / 10
                            </span>
                          </div>
                          <p className="font-telugu text-xs text-[var(--accent-gold-light)] font-medium mt-0.5">
                            {theme.teluguName}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1">
                            {theme.tagline}
                          </p>
                        </div>

                        {/* Score Metrics Bars */}
                        <div className="pt-2 border-t border-[var(--border-card)] grid grid-cols-2 gap-2 text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--text-secondary)]">Cultural Fit:</span>
                            <span className="font-mono font-bold text-[var(--accent-gold)]">
                              {theme.metrics.culturalResonance}/10
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--text-secondary)]">Contrast:</span>
                            <span className="font-mono font-bold text-[var(--accent-emerald)]">
                              {theme.metrics.contrastReadability}/10
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--text-secondary)]">Visual Luxury:</span>
                            <span className="font-mono font-bold text-[var(--accent-gold)]">
                              {theme.metrics.visualLuxury}/10
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[var(--text-secondary)]">Active Theory:</span>
                            <span className="font-mono font-bold text-[var(--accent-gold)]">
                              {theme.metrics.cinematicImmersion}/10
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar: Preview & Vote */}
                      <div className="pt-3 mt-3 border-t border-[var(--border-card)] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 px-2.5 py-1 rounded-lg border border-[var(--accent-emerald)]/30">
                              <Check className="w-3.5 h-3.5" />
                              Active Live Preview
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent-gold)] flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              Click to Preview
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleVote(e, theme.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                            isVoted
                              ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black'
                              : 'bg-white/10 hover:bg-[var(--accent-gold)]/20 text-[var(--text-primary)] border border-white/15'
                          }`}
                          title="Vote for this theme"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-current' : ''}`} />
                          <span>{voteCount} Votes</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-5 py-3 border-t border-[var(--border-card)] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-xs"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Info className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>
                  Current active theme: <strong className="text-[var(--text-primary)]">{activeTheme.name}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectTheme('sankranthi-sun')}
                  className="px-3 py-1.5 rounded-xl border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 font-bold transition-colors"
                >
                  Set Recommended #1 (Sankranthi Sun)
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-[var(--accent-gold)] text-[var(--bg-primary)] font-black hover:brightness-110 transition-all shadow-md"
                >
                  Confirm &amp; Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
