import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sun, Leaf, Flower2, Flame, Sparkles, ArrowLeft, Calendar, Music, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: { festival: string } }) {
  const fest = festivalData[params.festival.toLowerCase()];
  if (!fest) return { title: 'Festival Not Found' };
  return {
    title: `${fest.name} — Cultural Traditions in Utah`,
    description: fest.tagline,
  };
}

const festivalData: Record<
  string,
  {
    name: string;
    telugu: string;
    tagline: string;
    season: string;
    history: string;
    rituals: string[];
    utahActivities: string[];
    bgGradient: string;
  }
> = {
  sankranthi: {
    name: 'Sankranthi Sambaralu',
    telugu: 'సంక్రాంతి సంబరాలు',
    tagline: 'Harvest, Sun Transit, Kites & Sacred Rangoli Patterns',
    season: 'January 14–16 (Bhogi, Makara Sankranthi, Kanuma)',
    history: 'Sankranthi marks the auspicious transit of the Sun (Surya Bhagavan) into the Makara Rashi (Capricorn), signaling the end of winter solstice and harvest abundance.',
    rituals: [
      'Bhogi Mantalu: Morning bonfire with old items signifying spiritual renewal',
      'Muggulu & Gobbemma: Intricate geometric rice flour patterns decorated with turmeric, vermillion, and cow dung spheres',
      'Gaalipatam (Kite Flying): Communities fly vibrant paper kites symbolizing high aspirations',
      'Haridasu & Basavanna: Traditional folk singers and decorated oxen honoring village agricultural heritage',
      'Chakkara Pongali & Ariselu: Authentic sweet harvest delicacies prepared with freshly harvested rice and jaggery',
    ],
    utahActivities: [
      'Grand State Auditorium festival production at Mid-Valley Performing Arts Center',
      'Inter-Family Muggulu (Rangoli) Competition with public voting',
      'Kids traditional Bhogi Pallu blessing ceremony',
      '4-Hour cultural dance and music performances by local Utah dance academies',
      'Authentic Andhra & Telangana festive banquet served to over 1,000 attendees',
    ],
    bgGradient: 'from-amber-500/20 to-amber-700/10',
  },
  ugadi: {
    name: 'Ugadi Vasantotsavam',
    telugu: 'ఉగాది వసంతోత్సవం',
    tagline: 'Telugu New Year — A Tapestry of Six Tastes (Shadruchulu)',
    season: 'Chaitra Shuddha Padyami (March / April)',
    history: 'Ugadi is celebrated as the dawn of creation when Lord Brahma commenced cosmic time. It heralds spring renewal across the Deccan plateau.',
    rituals: [
      'Ugadi Pachadi: Sacred festive preparation blending neem buds (bitter), raw mango (tangy), jaggery (sweet), tamarind (sour), green chilies (spicy), and salt, representing all facets of human life',
      'Panchanga Sravanam: Astrological reading of year predictions for rainfall, commerce, health, and agriculture',
      'Kavi Sammelanam: Traditional assembly of poets reciting original Telugu stanzas (Padyalu)',
      'Mango Leaf Thoranam: Festive green mango leaves strung at entrances for prosperity and purification',
    ],
    utahActivities: [
      'Vedic Panchanga reading by invited scholars at South Jordan Community Center',
      'Youth Telugu speech competition and poetry recitation',
      'Classical Carnatic vocal recitals and Kuchipudi arangetram showcases',
      'Distribution of freshly made Ugadi Pachadi and traditional Bobbatlu sweets',
    ],
    bgGradient: 'from-emerald-500/20 to-emerald-700/10',
  },
  bathukamma: {
    name: 'Bathukamma Floral Celebration',
    telugu: 'బతుకమ్మ పండుగ',
    tagline: 'Telangana Flower Festival — Harmony with Nature & Goddess Gauri',
    season: 'Autumn (Navaratri season)',
    history: 'Bathukamma is Telangana’s iconic socio-cultural festival honoring womanhood and nature’s ecology. Wild medicinal flowers are gathered and arranged in concentric conical heaps.',
    rituals: [
      'Gathering Gunugu, Tangedu, Banthi, and Chamanti wild flowers from Utah mountain meadows',
      'Arranging concentric floral pyramids with Gauramma placed atop',
      'Singing traditional Bathukamma folk ballads holding hands in rhythmic concentric circles',
      'Nimajjanam: Respectfully releasing flower pyramids into water bodies at sunset',
    ],
    utahActivities: [
      'Outdoor floral celebration at Thanksgiving Point or Sugar House Park',
      'Over 200 Utah women participating in traditional silk pattu sarees',
      'Children floral arrangement competition',
      'Folk singing circles and distribution of traditional Saddula Bathukamma dishes',
    ],
    bgGradient: 'from-rose-500/20 to-purple-700/10',
  },
  diwali: {
    name: 'Deepavali Deepotsavam',
    telugu: 'దీపావళి దీపోత్సవం',
    tagline: 'Festival of Lights — Triumph of Righteousness over Darkness',
    season: 'Ashwayuja Amavasya (October / November)',
    history: 'Deepavali celebrates the victory of Lord Krishna and Satyabhama over the demon Narakasura, as well as the return of Lord Sri Rama to Ayodhya.',
    rituals: [
      'Lighting clay Diyas filled with sesame or ghee across every home balcony and walkway',
      'Lakshmi Pooja and prayers for community prosperity',
      'Fireworks, sparklers, and joyful family assemblies',
      'Distribution of home-made Mysore Pak, Kaju Katli, and savory Murukku',
    ],
    utahActivities: [
      'Community Deepavali gala and youth musical concert in Salt Lake City',
      'Designated outdoor sparkler zone for children adhering to Utah fire safety codes',
      'Theatrical musical drama depicting traditional epics',
    ],
    bgGradient: 'from-orange-500/20 to-amber-700/10',
  },
};

export default function FestivalDetailPage({ params }: { params: { festival: string } }) {
  const fest = festivalData[params.festival.toLowerCase()];

  if (!fest) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div>
        <Link
          href="/culture"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cultural Pavilion</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className={`p-8 sm:p-12 rounded-3xl border border-white/10 glass-panel bg-gradient-to-br ${fest.bgGradient} space-y-4 shadow-2xl`}>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
          Seasonal Heritage Tradition
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          {fest.name}
        </h1>
        <p className="text-lg font-telugu text-amber-200">{fest.telugu}</p>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{fest.tagline}</p>
        <div className="pt-2 text-xs font-mono text-slate-400">Timing: {fest.season}</div>
      </div>

      {/* Historical & Cultural Context */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Cultural & Spiritual Significance</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{fest.history}</p>
      </div>

      {/* Traditional Customs & Rituals */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Traditional Customs & Rituals</h2>
        <ul className="space-y-3">
          {fest.rituals.map((r, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How UTA Celebrates in Utah */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-bold text-white font-display">How We Celebrate in Utah</h2>
        <div className="grid grid-cols-1 gap-2.5">
          {fest.utahActivities.map((act, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">Attend Our Upcoming Celebration</h3>
          <p className="text-xs text-slate-400 mt-1">
            Free admission with active UTA family membership. Register online today.
          </p>
        </div>
        <Link
          href="/events"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>View Festival Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
