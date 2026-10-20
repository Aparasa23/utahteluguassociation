'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Scroll, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  UtensilsCrossed, 
  AlertCircle, 
  Compass, 
  Eye, 
  Layers, 
  Music,
  ChevronRight,
  ChevronLeft,
  Quote
} from 'lucide-react';
import { FestivalBlog, getRelatedFestivals } from '@/lib/festivalBlogs';

interface FestivalDetailReaderProps {
  festival: FestivalBlog;
}

export default function FestivalDetailReader({ festival }: FestivalDetailReaderProps) {
  // Reading comfort controls
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const relatedFestivals = getRelatedFestivals(festival.slug, 3);

  // Synthesize gentle meditative Tanpura drone using Web Audio API
  const toggleAmbientSound = () => {
    if (isAudioPlaying) {
      if (oscillatorNodesRef.current) {
        oscillatorNodesRef.current.gain.gain.exponentialRampToValueAtTime(0.0001, (audioCtxRef.current?.currentTime || 0) + 1);
        setTimeout(() => {
          oscillatorNodesRef.current?.osc1.stop();
          oscillatorNodesRef.current?.osc2.stop();
          audioCtxRef.current?.close();
          oscillatorNodesRef.current = null;
          audioCtxRef.current = null;
        }, 1000);
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Base C# / D Indian classical root tonic (approx 138.59 Hz and fifth 207.65 Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(138.59, ctx.currentTime); // Sa

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(207.65, ctx.currentTime); // Pa

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2); // Soft ambient volume

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorNodesRef.current = { osc1, osc2, gain };
        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Web Audio error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleCopyCitation = () => {
    const primaryCitation = festival.citations[0];
    const text = primaryCitation
      ? `"${festival.title}." Utah Telugu Association Cultural Archive, ${festival.publishedDate}. Referencing ${primaryCitation.source} by ${primaryCitation.authorOrPeriod}: "${primaryCitation.quoteOrContext}".`
      : `"${festival.title}." Utah Telugu Association Cultural Archive, ${festival.publishedDate}.`;
    
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: festival.title,
          text: `${festival.title} — ${festival.teluguTitle}`,
          url,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    }
  };

  // Dynamic typography classes
  const bodyTextClass = 
    fontSize === 'xlarge' ? 'text-lg sm:text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-base sm:text-lg leading-relaxed' :
    'text-sm sm:text-base leading-relaxed';

  return (
    <article className="min-h-screen bg-[#faf7f2] text-[#1c140e] pb-24 selection:bg-[#be123c]/20">
      {/* 1. STICKY TOP READING CONTROLS UTILITY BAR */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#faf7f2]/95 backdrop-blur-md border-b border-amber-900/15 py-2.5 px-4 sm:px-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/culture/festivals"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#be123c] hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Festival Directory</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Reading Adjustments */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAmbientSound}
              title={isAudioPlaying ? 'Mute Tanpura Drone' : 'Play Meditative Tanpura Drone'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                isAudioPlaying
                  ? 'bg-amber-800 text-white shadow-sm animate-pulse'
                  : 'bg-white border border-amber-900/15 text-[#4a382c] hover:bg-amber-50'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isAudioPlaying ? 'Ambient Sound On' : 'Tanpura Drone'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-amber-900/15 rounded-lg p-0.5 text-xs font-bold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-amber-800 text-white' : 'text-[#786454]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm ${fontSize === 'large' ? 'bg-amber-800 text-white' : 'text-[#786454]'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-base ${fontSize === 'xlarge' ? 'bg-amber-800 text-white' : 'text-[#786454]'}`}
              >
                A++
              </button>
            </div>

            {/* Copy Citation Button */}
            <button
              onClick={handleCopyCitation}
              title="Copy Academic Citation"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-900/15 text-xs font-semibold text-[#4a382c] hover:bg-amber-50 transition-colors"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{copiedCitation ? 'Citation Copied!' : 'Copy Citation'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              title="Share Article"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-900/15 text-xs font-semibold text-[#4a382c] hover:bg-amber-50 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. REGAL HERO SECTION */}
      <header className="relative pt-8 pb-12 sm:pb-16 overflow-hidden border-b border-amber-900/15 bg-gradient-to-b from-[#f5eee4] via-[#faf7f2] to-[#faf7f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-[#786454]">
            <Link href="/" className="hover:text-[#1c140e]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#786454]/60" />
            <Link href="/culture" className="hover:text-[#1c140e]">Culture</Link>
            <ChevronRight className="w-3 h-3 text-[#786454]/60" />
            <Link href="/culture/festivals" className="hover:text-[#1c140e]">Festivals</Link>
            <ChevronRight className="w-3 h-3 text-[#786454]/60" />
            <span className="text-[#be123c] font-bold truncate max-w-[200px]">{festival.title}</span>
          </nav>

          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {festival.isForgottenOrRare ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Forgotten &amp; Endangered Tradition (మరుగున పడిన పండుగ)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Major Flagship Festival (ప్రధాన పండుగ)
              </span>
            )}

            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-900/15 text-amber-900 text-xs font-semibold">
              {festival.categoryLabel}
            </span>

            <span className="px-3 py-1 rounded-full bg-white border border-amber-900/15 text-[#786454] text-xs font-medium">
              Era: {festival.historicalEra}
            </span>
          </div>

          {/* Dual Telugu & English Typography */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black font-display text-[#1c140e] tracking-tight leading-tight">
              {festival.title}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#be123c] font-telugu font-bold leading-relaxed">
              {festival.teluguTitle}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-base sm:text-lg text-[#4a382c] font-medium leading-relaxed">
              {festival.subtitle}
            </p>
            <p className="text-sm sm:text-base text-[#78350f] font-telugu font-semibold italic">
              {festival.teluguSubtitle}
            </p>
          </div>

          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#786454] pt-4 border-t border-amber-900/15">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span className="font-semibold text-[#1c140e]">{festival.tithiAndMonth}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>{festival.readingTimeMinutes} min scholarly reading</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scroll className="w-4 h-4 text-amber-700" />
              <span>{festival.citations.length} Classical Citations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Documented for UTA Cultural Archive</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO IMAGE WITH ANCIENT LYRICS OVERLAY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/20 aspect-[16/9] sm:aspect-[21/9]">
          <img
            src={festival.coverImageUrl}
            alt={festival.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          
          {festival.howCelebratedInOldenDays.songsOrBallads && (
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                Ancient Folk Ballad / Sloka • పవిత్ర జానపద గేయం
              </span>
              <p className="text-sm sm:text-lg font-telugu font-bold text-amber-100 italic drop-shadow-md">
                {festival.howCelebratedInOldenDays.songsOrBallads}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. MAIN SCHOLARLY ARTICLE BODY */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* GEOGRAPHIC SPECIFICITY & REGIONAL CONTEXT CALLOUT (USER REQUIREMENT) */}
        <section className="p-6 sm:p-8 rounded-2xl border border-amber-700/25 bg-gradient-to-br from-[#fefbf6] to-[#fff8ed] shadow-md space-y-4">
          <div className="flex items-center gap-2 text-amber-900">
            <Compass className="w-5 h-5 text-[#be123c]" />
            <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wider">
              Geographic Distribution &amp; Regional Origin (ప్రాంతీయ విస్తరణ &amp; ప్రాముఖ్యత)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-amber-900/10">
              <span className="text-[11px] font-bold text-[#786454] uppercase tracking-wider block mb-1">
                Primary Territory
              </span>
              <p className="text-sm font-bold text-[#1c140e] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#be123c] shrink-0" />
                {festival.geographicRegion.primary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-amber-900/10 md:col-span-2">
              <span className="text-[11px] font-bold text-[#786454] uppercase tracking-wider block mb-1">
                Specific Historical Districts
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {festival.geographicRegion.specificDistricts.map((dist, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-950 font-semibold text-xs border border-amber-900/10">
                    {dist}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#4a382c] leading-relaxed italic bg-white/70 p-4 rounded-xl border border-amber-900/10">
            <strong>Contextual Regional Lore:</strong> {festival.geographicRegion.description}
          </p>
        </section>

        {/* 1. SIGNIFICANCE SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-900/15 pb-2">
            <Scroll className="w-5 h-5 text-[#be123c]" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1c140e]">
              Cosmic &amp; Ecological Significance (పర్వదిన ప్రాశస్త్యం)
            </h2>
          </div>
          <div className={`text-[#382b22] font-serif ${bodyTextClass}`}>
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#be123c] first-letter:mr-3 first-letter:float-left first-letter:font-display leading-relaxed">
              {festival.significance}
            </p>
          </div>
        </section>

        {/* 2. HOW CELEBRATED IN OLDEN DAYS (STEP-BY-STEP BREAKDOWN) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-900/15 pb-2">
            <Clock className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1c140e]">
                How Celebrated in Olden Days (పూర్వకాలంలో ఎలా జరుపుకునేవారు?)
              </h2>
              <span className="text-xs text-[#786454] font-medium">
                Traditional rituals before modern mechanization, electrification, and urban shifts
              </span>
            </div>
          </div>

          <p className={`text-[#4a382c] italic ${bodyTextClass}`}>
            {festival.howCelebratedInOldenDays.overview}
          </p>

          {/* Chronological Steps */}
          <div className="space-y-4">
            {festival.howCelebratedInOldenDays.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-amber-900/15 bg-white shadow-sm space-y-2 hover:border-amber-700/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-700/20">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1c140e] font-display">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#be123c] font-telugu font-semibold">
                      {step.teluguTitle}
                    </p>
                  </div>
                </div>

                <p className={`text-[#4a382c] pl-10 ${bodyTextClass}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Women Customs & Traditional Attire Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {festival.howCelebratedInOldenDays.womenCustoms && (
              <div className="p-5 rounded-2xl bg-[#fff8f0] border border-amber-900/15 space-y-2">
                <span className="text-xs uppercase font-bold text-[#be123c] tracking-wider block">
                  Women’s Customs &amp; Sisterhood (స్త్రీల సంప్రదాయాలు)
                </span>
                <p className={`text-[#4a382c] text-xs sm:text-sm leading-relaxed`}>
                  {festival.howCelebratedInOldenDays.womenCustoms}
                </p>
              </div>
            )}

            {festival.howCelebratedInOldenDays.traditionalAttire && (
              <div className="p-5 rounded-2xl bg-[#fff8f0] border border-amber-900/15 space-y-2">
                <span className="text-xs uppercase font-bold text-amber-800 tracking-wider block">
                  Traditional Handloom Attire (ప్రాచీన వస్త్రధారణ)
                </span>
                <p className={`text-[#4a382c] text-xs sm:text-sm leading-relaxed`}>
                  {festival.howCelebratedInOldenDays.traditionalAttire}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. WHY FORGOTTEN OR ENDANGERED (IF APPLICABLE) */}
        {festival.isForgottenOrRare && festival.whyForgottenOrEndangered && (
          <section className="p-6 sm:p-8 rounded-2xl border border-rose-900/20 bg-gradient-to-br from-rose-50/60 to-amber-50/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold font-display uppercase tracking-wider">
                Why This Festival Faded &amp; Current Status (కనుమరుగవడానికి కారణాలు)
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4a382c] leading-relaxed">
              <strong>Sociological Transition:</strong> How modern shifts sidelined this sacred observance:
            </p>

            <ul className="space-y-2">
              {festival.whyForgottenOrEndangered.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#5a483a]">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-white border border-rose-900/15 text-xs sm:text-sm text-[#1c140e] space-y-1">
              <span className="font-bold text-[#be123c] block">Contemporary Endangered Status:</span>
              <p className="text-[#5a483a]">{festival.whyForgottenOrEndangered.modernStatus}</p>
            </div>
          </section>
        )}

        {/* 4. SCHOLARLY CITATIONS & HISTORICAL REFERENCES */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-900/15 pb-2">
            <BookOpen className="w-5 h-5 text-[#be123c]" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1c140e]">
                Scholarly Citations &amp; Literature (చారిత్రక ఆధారాలు &amp; గ్రంథ ప్రస్తావనలు)
              </h2>
              <span className="text-xs text-[#786454]">
                Authentic academic references from Srinatha, Puranas, Thurston, and British Gazetteers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {festival.citations.map((cite, idx) => (
              <blockquote
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-amber-900/20 bg-white shadow-sm space-y-3 relative overflow-hidden"
              >
                <Quote className="w-8 h-8 text-amber-500/20 absolute -top-1 -right-1 pointer-events-none" />
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#1c140e] font-display">
                    {cite.source}
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                    Author / Era: {cite.authorOrPeriod}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4a382c] italic border-l-2 border-[#be123c] pl-3 py-1">
                  &ldquo;{cite.quoteOrContext}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
        </section>

        {/* 5. TRADITIONAL CULINARY PAIRINGS & ANCIENT PRASADAM */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-900/15 pb-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1c140e]">
                Traditional Culinary Pairings (ప్రాచీన ప్రసాదాలు &amp; వంటకాలు)
              </h2>
              <span className="text-xs text-[#786454]">
                Authentic ancestral recipes with nutritional, metabolic, and spiritual symbolism
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {festival.culinaryTraditions.map((dish, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-amber-900/15 bg-white shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1c140e]">
                      {dish.dishName}
                    </h3>
                    <p className="text-xs text-[#be123c] font-telugu font-bold">
                      {dish.teluguName}
                    </p>
                  </div>
                  <span className="p-2 rounded-xl bg-amber-500/15 text-amber-900">
                    <UtensilsCrossed className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#4a382c]">
                  <span className="font-bold text-[#1c140e] block">Sacred Ingredients:</span>
                  <p>{dish.ingredients}</p>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-900/10 text-xs text-[#78350f]">
                  <span className="font-bold block mb-0.5">Metabolic &amp; Spiritual Symbolism:</span>
                  <p>{dish.symbolism}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. UTA DIASPORA CELEBRATION IN UTAH */}
        <section className="p-6 sm:p-8 rounded-3xl border border-amber-900/20 bg-gradient-to-br from-[#fffdf9] to-[#faf1e4] shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#be123c]" />
            <h2 className="text-lg sm:text-xl font-bold font-display text-[#1c140e]">
              Celebrating Ancient Heritage in the Salt Lake Valley
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4a382c] leading-relaxed">
            Utah Telugu Association brings these timeless traditions alive beneath the majestic Wasatch Mountains. 
            Whether preparing authentic festive prasadam, teaching children the botanical significance of our herbs and flowers, 
            or consulting the Salt Lake City Vedic Panchangam for auspicious muhurthams, our heritage remains vibrant.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/temple-calendar"
              className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Check Salt Lake Panchangam Date
            </Link>
            <Link
              href="/events"
              className="px-4 py-2 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] font-bold text-xs hover:bg-amber-50 transition-colors"
            >
              View Upcoming UTA Events
            </Link>
          </div>
        </section>

        {/* 7. EXPLORE RELATED FESTIVALS */}
        <section className="pt-8 border-t border-amber-900/15 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-[#1c140e]">
                Related Festivals &amp; Traditions (ఇతర పర్వదినాలు)
              </h2>
              <p className="text-xs text-[#786454]">Continue exploring our heritage encyclopedia</p>
            </div>
            <Link
              href="/culture/festivals"
              className="text-xs font-bold text-[#be123c] hover:underline flex items-center gap-1"
            >
              <span>View All 23</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedFestivals.map((rel) => (
              <Link
                key={rel.id}
                href={`/culture/festivals/${rel.slug}`}
                className="p-4 rounded-2xl border border-amber-900/15 bg-white shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-amber-950/10 mb-2">
                    <img
                      src={rel.coverImageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    {rel.categoryLabel}
                  </span>
                  <h3 className="text-sm font-bold text-[#1c140e] group-hover:text-[#be123c] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#be123c] font-telugu font-semibold line-clamp-1">
                    {rel.teluguTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-[11px] text-[#786454] mt-3">
                  <span>{rel.readingTimeMinutes} min read</span>
                  <span className="font-bold text-[#be123c] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </article>
  );
}
