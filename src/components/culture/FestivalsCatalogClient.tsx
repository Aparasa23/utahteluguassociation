'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Clock, 
  BookOpen, 
  Calendar, 
  Scroll, 
  ArrowRight, 
  Compass, 
  Sun, 
  Flame, 
  Flower2, 
  Leaf, 
  CheckCircle2, 
  ShieldAlert,
  SlidersHorizontal,
  Share2,
  UtensilsCrossed
} from 'lucide-react';
import { FESTIVAL_BLOGS, FestivalBlog } from '@/lib/festivalBlogs';
import { KineticTabs, KineticTabItem } from '@/components/ui/KineticTabs';

type CategoryFilter = 'ALL' | 'FORGOTTEN' | 'FLAGSHIP' | 'AGRICULTURAL' | 'REGIONAL_JATHARA' | 'WOMEN_VRATAM';
type RegionFilter = 'ALL' | 'COASTAL_ANDHRA' | 'TELANGANA' | 'RAYALASEEMA' | 'PALNADU' | 'UTTARANDHRA';

export default function FestivalsCatalogClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'FORGOTTEN_FIRST' | 'READ_TIME' | 'ALPHABETICAL'>('FORGOTTEN_FIRST');

  // Tab definitions with counts
  const categoryTabs: KineticTabItem<CategoryFilter>[] = useMemo(() => [
    {
      id: 'ALL',
      label: 'All Traditions',
      telugu: 'సమగ్ర దర్శనం',
      badge: FESTIVAL_BLOGS.length,
    },
    {
      id: 'FORGOTTEN',
      label: 'Forgotten & Endangered',
      telugu: 'మరుగున పడినవి',
      badge: FESTIVAL_BLOGS.filter((f) => f.isForgottenOrRare).length,
    },
    {
      id: 'FLAGSHIP',
      label: 'Major Flagships',
      telugu: 'ప్రధాన పండుగలు',
      badge: FESTIVAL_BLOGS.filter((f) => !f.isForgottenOrRare && f.category === 'FLAGSHIP').length,
    },
    {
      id: 'AGRICULTURAL',
      label: 'Earth & Harvest',
      telugu: 'వ్యవసాయ పర్వాలు',
      badge: FESTIVAL_BLOGS.filter((f) => f.category === 'AGRICULTURAL' || f.id === 'eruvaka-punnami' || f.id === 'kandi-panduga' || f.id === 'makara-sankranthi').length,
    },
    {
      id: 'REGIONAL_JATHARA',
      label: 'Regional Jatharas',
      telugu: 'ప్రాంతీయ జాతరలు',
      badge: FESTIVAL_BLOGS.filter((f) => f.category === 'REGIONAL_JATHARA').length,
    },
    {
      id: 'WOMEN_VRATAM',
      label: "Women's Vratams",
      telugu: 'స్త్రీల వ్రతాలు',
      badge: FESTIVAL_BLOGS.filter((f) => f.category === 'WOMEN_VRATAM' || f.id === 'atla-tadde' || f.id === 'bathukamma' || f.id === 'varalakshmi-vratam' || f.id === 'nagula-chavithi').length,
    },
  ], []);

  // Filtered and sorted festivals
  const filteredFestivals = useMemo(() => {
    return FESTIVAL_BLOGS.filter((f) => {
      // 1. Category Filter
      if (activeCategory === 'FORGOTTEN' && !f.isForgottenOrRare) return false;
      if (activeCategory === 'FLAGSHIP' && (f.isForgottenOrRare || f.category !== 'FLAGSHIP')) return false;
      if (activeCategory === 'AGRICULTURAL') {
        const isAgri = f.category === 'AGRICULTURAL' || f.id === 'eruvaka-punnami' || f.id === 'kandi-panduga' || f.id === 'makara-sankranthi';
        if (!isAgri) return false;
      }
      if (activeCategory === 'REGIONAL_JATHARA' && f.category !== 'REGIONAL_JATHARA') return false;
      if (activeCategory === 'WOMEN_VRATAM') {
        const isWomen = f.category === 'WOMEN_VRATAM' || f.id === 'atla-tadde' || f.id === 'bathukamma' || f.id === 'varalakshmi-vratam' || f.id === 'nagula-chavithi';
        if (!isWomen) return false;
      }

      // 2. Region Filter
      if (activeRegion === 'COASTAL_ANDHRA') {
        const text = (f.geographicRegion.primary + ' ' + f.geographicRegion.description).toLowerCase();
        if (!text.includes('coastal') && !text.includes('godavari') && !text.includes('krishna') && !text.includes('nellore') && !text.includes('guntur')) return false;
      } else if (activeRegion === 'TELANGANA') {
        const text = (f.geographicRegion.primary + ' ' + f.geographicRegion.description).toLowerCase();
        if (!text.includes('telangana') && !text.includes('hyderabad') && !text.includes('warangal') && !text.includes('adilabad')) return false;
      } else if (activeRegion === 'RAYALASEEMA') {
        const text = (f.geographicRegion.primary + ' ' + f.geographicRegion.description).toLowerCase();
        if (!text.includes('rayalaseema') && !text.includes('kurnool') && !text.includes('anantapur') && !text.includes('kadapa')) return false;
      } else if (activeRegion === 'PALNADU') {
        const text = (f.geographicRegion.primary + ' ' + f.geographicRegion.description).toLowerCase();
        if (!text.includes('palnadu') && !text.includes('guntur')) return false;
      } else if (activeRegion === 'UTTARANDHRA') {
        const text = (f.geographicRegion.primary + ' ' + f.geographicRegion.description).toLowerCase();
        if (!text.includes('uttarandhra') && !text.includes('vizianagaram') && !text.includes('srikakulam') && !text.includes('visakhapatnam')) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          f.title,
          f.teluguTitle,
          f.subtitle,
          f.teluguSubtitle,
          f.significance,
          f.tithiAndMonth,
          f.historicalEra,
          f.geographicRegion.primary,
          f.geographicRegion.description,
          f.geographicRegion.specificDistricts.join(' '),
          ...f.howCelebratedInOldenDays.steps.map((s) => s.title + ' ' + s.description),
          ...f.citations.map((c) => c.source + ' ' + c.authorOrPeriod),
          ...f.culinaryTraditions.map((c) => c.dishName + ' ' + c.teluguName),
        ].join(' ').toLowerCase();

        if (!searchableText.includes(query)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'FORGOTTEN_FIRST') {
        if (a.isForgottenOrRare && !b.isForgottenOrRare) return -1;
        if (!a.isForgottenOrRare && b.isForgottenOrRare) return 1;
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'READ_TIME') {
        return b.readingTimeMinutes - a.readingTimeMinutes;
      }
      return a.title.localeCompare(b.title);
    });
  }, [activeCategory, activeRegion, searchQuery, sortBy]);

  // Featured Spotlight Festival (Eruvaka Punnami or Atla Tadde)
  const spotlightFestival = useMemo(() => {
    return FESTIVAL_BLOGS.find((f) => f.id === 'eruvaka-punnami') || FESTIVAL_BLOGS[0];
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c140e] pb-24 selection:bg-[#be123c]/20">
      {/* 1. REGAL HERO BANNER */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-amber-900/15 bg-gradient-to-b from-[#f4ece1] via-[#faf7f2] to-[#faf7f2]">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400/10 to-rose-400/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-400/10 to-amber-400/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-700/20 text-[#be123c] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Scroll className="w-4 h-4 text-[#be123c]" />
              <span>తెలుగు పర్వదిన విజ్ఞాన సర్వస్వం — Scholarly Cultural Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1c140e] tracking-tight leading-tight">
              Telugu Festivals &amp; Ancient Lore
            </h1>

            <p className="text-xl sm:text-2xl text-[#be123c] font-telugu font-bold leading-relaxed">
              తెలంగాణ &amp; ఆంధ్రుల పండుగల మహావైభవం — పూర్వకాలపు సంబరాలు &amp; మరుగున పడిన సంప్రదాయాలు
            </p>

            <p className="text-sm sm:text-base text-[#4a382c] max-w-2xl mx-auto font-medium leading-relaxed">
              Explore in-depth scholarly chronicles of how our ancestors celebrated festivals across dynasties, 
              ancient ecological first-furrow rites, 4:00 AM feasts, 100-foot bamboo towers, and sacred citations 
              from Srinatha, Palkuriki Somanatha, Thurston, and ancient Puranas.
            </p>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-xl bg-white/80 border border-amber-900/10 shadow-sm text-center">
                <span className="block text-2xl font-black text-[#be123c] font-display">23</span>
                <span className="text-[11px] font-semibold text-[#786454] uppercase tracking-wider">Documented Festivals</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 border border-amber-900/10 shadow-sm text-center">
                <span className="block text-2xl font-black text-amber-700 font-display">9</span>
                <span className="text-[11px] font-semibold text-[#786454] uppercase tracking-wider">Forgotten / Endangered</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 border border-amber-900/10 shadow-sm text-center">
                <span className="block text-2xl font-black text-emerald-700 font-display">40+</span>
                <span className="text-[11px] font-semibold text-[#786454] uppercase tracking-wider">Scholarly Citations</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/80 border border-amber-900/10 shadow-sm text-center">
                <span className="block text-2xl font-black text-indigo-700 font-display">2,000+</span>
                <span className="text-[11px] font-semibold text-[#786454] uppercase tracking-wider">Years of Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPOTLIGHT FEATURED ARTICLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-3xl border border-amber-900/20 bg-gradient-to-br from-[#fffdf9] via-white to-[#fff8ee] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-600/20 text-[#be123c] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#be123c] animate-pulse" />
                  Featured Endangered Tradition • మరుగున పడిన పండుగ
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-900 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {spotlightFestival.geographicRegion.primary}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c140e] font-display hover:text-[#be123c] transition-colors">
                  <Link href={`/culture/festivals/${spotlightFestival.slug}`}>
                    {spotlightFestival.title}
                  </Link>
                </h2>
                <p className="text-lg text-[#be123c] font-telugu font-bold mt-1">
                  {spotlightFestival.teluguTitle}
                </p>
              </div>

              <p className="text-sm text-[#4a382c] leading-relaxed line-clamp-3">
                {spotlightFestival.significance}
              </p>

              {/* Ritual Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {spotlightFestival.howCelebratedInOldenDays.steps.slice(0, 2).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-500/5 border border-amber-900/10 text-xs">
                    <span className="font-bold text-[#1c140e] block mb-0.5">{step.title}</span>
                    <span className="text-[#685344] line-clamp-2">{step.description}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-900/10">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#786454]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    {spotlightFestival.tithiAndMonth}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-700" />
                    {spotlightFestival.readingTimeMinutes} min scholarly read
                  </span>
                </div>

                <Link
                  href={`/culture/festivals/${spotlightFestival.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#be123c] to-[#9f1239] hover:from-[#9f1239] hover:to-[#881337] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Read Full In-Depth Chronicle</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-amber-900/15 group">
                <img
                  src={spotlightFestival.coverImageUrl}
                  alt={spotlightFestival.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                    Historical Era • కాల వ్యవధి
                  </span>
                  <p className="text-xs font-semibold text-white/90">
                    {spotlightFestival.historicalEra}
                  </p>
                  <div className="mt-2 text-[11px] text-amber-200/90 font-telugu line-clamp-1 italic">
                    {spotlightFestival.howCelebratedInOldenDays.songsOrBallads}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CATEGORY TABS & LIVE SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/15 pb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1c140e] font-display">
              Festival Directory &amp; Heritage Index
            </h2>
            <p className="text-xs sm:text-sm text-[#786454]">
              Filter by category, search by Telugu or English name, or view localized regional traditions.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px] sm:min-w-[340px]">
            <Search className="w-4 h-4 text-[#786454] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search festivals, rituals, regions, citations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-amber-900/20 text-xs sm:text-sm text-[#1c140e] placeholder-[#786454]/70 focus:outline-none focus:ring-2 focus:ring-[#be123c]/40 focus:border-[#be123c] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#786454] hover:text-[#1c140e]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Kinetic Navigation Tabs */}
        <div className="overflow-x-auto pb-2 no-scrollbar">
          <KineticTabs<CategoryFilter>
            tabs={categoryTabs}
            activeId={activeCategory}
            onChange={(id) => setActiveCategory(id)}
            variant="crimson"
            size="md"
          />
        </div>

        {/* Region Sub-Filters & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#786454] font-bold mr-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              Region Focus:
            </span>
            {[
              { id: 'ALL', label: 'All Regions' },
              { id: 'COASTAL_ANDHRA', label: 'Coastal Andhra (కోస్తా)' },
              { id: 'TELANGANA', label: 'Telangana (తెలంగాణ)' },
              { id: 'RAYALASEEMA', label: 'Rayalaseema (రాయలసీమ)' },
              { id: 'PALNADU', label: 'Palnadu & Guntur' },
              { id: 'UTTARANDHRA', label: 'Uttarandhra (విజయనగరం)' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg.id as RegionFilter)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeRegion === reg.id
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-white/80 border border-amber-900/10 text-[#4a382c] hover:bg-amber-100/50'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#786454]" />
            <span className="text-[#786454] font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-amber-900/15 rounded-lg px-2.5 py-1 text-xs text-[#1c140e] font-semibold focus:outline-none focus:ring-1 focus:ring-[#be123c]"
            >
              <option value="FORGOTTEN_FIRST">Forgotten / Rare First</option>
              <option value="READ_TIME">Scholarly Depth (Read Time)</option>
              <option value="ALPHABETICAL">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. FESTIVALS CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredFestivals.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-dashed border-amber-900/20 p-8 space-y-3">
            <Search className="w-10 h-10 text-[#786454] mx-auto opacity-40" />
            <h3 className="text-lg font-bold text-[#1c140e]">No festivals match your search criteria</h3>
            <p className="text-xs text-[#786454] max-w-md mx-auto">
              Try adjusting your search terms or resetting the region and category filters to browse all 23 festivals.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setActiveRegion('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-bold hover:bg-amber-800 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFestivals.map((festival) => {
              return (
                <article
                  key={festival.id}
                  className="rounded-2xl border border-amber-900/15 bg-white/95 shadow-md hover:shadow-xl hover:border-amber-700/40 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Image Cover */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-amber-950/10">
                    <img
                      src={festival.coverImageUrl}
                      alt={festival.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating Status Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      {festival.isForgottenOrRare ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Endangered Tradition
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow">
                          <Sparkles className="w-3 h-3" />
                          Major Flagship
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-amber-300" />
                        {festival.readingTimeMinutes} min
                      </span>
                    </div>

                    {/* Bottom overlay with Tithi & Season */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs">
                      <div className="flex items-center gap-2 text-amber-200/90 text-[11px] font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span className="truncate">{festival.tithiAndMonth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Regional Geographic Highlight */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-900/10 w-fit">
                        <MapPin className="w-3 h-3 text-[#be123c] shrink-0" />
                        <span className="truncate max-w-[240px]">{festival.geographicRegion.primary}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#1c140e] group-hover:text-[#be123c] transition-colors leading-snug font-display">
                        <Link href={`/culture/festivals/${festival.slug}`}>
                          {festival.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-[#be123c] font-telugu font-bold line-clamp-1">
                        {festival.teluguTitle}
                      </p>

                      <p className="text-xs text-[#5a483a] leading-relaxed line-clamp-2">
                        {festival.subtitle}
                      </p>
                    </div>

                    {/* Olden Days Ritual Previews */}
                    <div className="space-y-2 pt-2 border-t border-amber-900/10 text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#786454] tracking-wider block">
                        Olden Days Rites (పూర్వకాలపు సంప్రదాయం):
                      </span>
                      <ul className="space-y-1">
                        {festival.howCelebratedInOldenDays.steps.slice(0, 2).map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#4a382c]">
                            <span className="text-amber-700 font-bold">•</span>
                            <span className="line-clamp-1 font-medium">{s.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Citations Preview & Read CTA */}
                    <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-[11px] text-[#786454]">
                        <BookOpen className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span className="truncate max-w-[140px]">
                          {festival.citations[0]?.source || 'Historical Epigraph'}
                        </span>
                      </div>

                      <Link
                        href={`/culture/festivals/${festival.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#be123c] group-hover:text-amber-800 transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. CULTURAL PRESERVATION MISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-3xl border border-amber-900/20 bg-gradient-to-r from-[#451a03] via-[#78350f] to-[#881337] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              UTA Heritage Preservation Project • మన ప్రాచీన సంస్కృతి రక్షణ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Preserving Endangered Telugu Traditions for Future Generations
            </h2>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-light">
              Many profound agricultural and village traditions—such as Eruvaka Punnami, Atla Tadde, Poli Swargam, and Peddula Panduga—are 
              rapidly fading from modern urban life. Utah Telugu Association is committed to documenting, reviving, and passing on this 
              priceless heritage to our children in the diaspora.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/membership"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg transition-all"
              >
                Join UTA &amp; Support Cultural Heritage
              </Link>
              <Link
                href="/temple-calendar"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
              >
                View Utah Vedic Panchangam
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
