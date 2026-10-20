'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight, Search, Users } from 'lucide-react';
import { KineticTabs } from '@/components/ui/KineticTabs';
import { formatUtahDate } from '@/lib/utils';

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImageUrl?: string | null;
  startDateTime: string | Date;
  endDateTime?: string | Date | null;
  isFeatured?: boolean;
  category: {
    id: string;
    name: string;
    label: string;
  };
  venue?: {
    id: string;
    name: string;
    city: string;
    state: string;
  } | null;
  ticketTypes?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

interface EventsDirectoryClientProps {
  events: EventItem[];
}

export function EventsDirectoryClient({ events }: EventsDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories from events
  const categories = useMemo(() => {
    const list = [
      { id: 'ALL', label: 'All Celebrations', telugu: 'అన్ని వేడుకలు' },
      { id: 'SANKRANTHI', label: 'Sankranthi Sambaralu', telugu: 'సంక్రాంతి సంబరాలు' },
      { id: 'BATHUKAMMA', label: 'Bathukamma & Dasara', telugu: 'బతుకమ్మ & దసరా' },
      { id: 'UGADI', label: 'Ugadi & Heritage', telugu: 'ఉగాది వేడుకలు' },
      { id: 'SPORTS', label: 'Sports Leagues', telugu: 'క్రీడా పోటీలు' },
      { id: 'YOUTH', label: 'Youth & Badi', telugu: 'తెలుగు బడి & యువత' },
    ];
    return list;
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Category match
      let matchesCat = true;
      if (selectedCategory !== 'ALL') {
        const catName = evt.category.name.toUpperCase();
        const catLabel = evt.category.label.toUpperCase();
        const titleUpper = evt.title.toUpperCase();
        if (selectedCategory === 'SANKRANTHI') {
          matchesCat = catName.includes('SANKRANTHI') || catLabel.includes('SANKRANTHI') || titleUpper.includes('SANKRANTHI');
        } else if (selectedCategory === 'BATHUKAMMA') {
          matchesCat = catName.includes('BATHUKAMMA') || catLabel.includes('BATHUKAMMA') || titleUpper.includes('BATHUKAMMA') || titleUpper.includes('DASARA');
        } else if (selectedCategory === 'UGADI') {
          matchesCat = catName.includes('UGADI') || catLabel.includes('UGADI') || titleUpper.includes('UGADI');
        } else if (selectedCategory === 'SPORTS') {
          matchesCat = catName.includes('SPORT') || catLabel.includes('SPORT') || titleUpper.includes('CRICKET') || titleUpper.includes('VOLLEY');
        } else if (selectedCategory === 'YOUTH') {
          matchesCat = catName.includes('BADI') || catName.includes('YOUTH') || titleUpper.includes('BADI') || titleUpper.includes('PICNIC');
        }
      }

      // Search match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          evt.title.toLowerCase().includes(q) ||
          evt.description.toLowerCase().includes(q) ||
          (evt.venue?.name.toLowerCase().includes(q) ?? false) ||
          (evt.venue?.city.toLowerCase().includes(q) ?? false);
      }

      return matchesCat && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Dynamic Tabs */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f4bb59]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, venue, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09222c]/90 border border-[#f4bb59]/30 text-[#fff5dc] placeholder-[#e7d5b8]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f4bb59]/40 shadow-sm"
          />
        </div>

        {/* State-of-the-Art Kinetic Tabs */}
        <KineticTabs
          tabs={categories.map((cat) => ({
            id: cat.id,
            label: cat.label,
            telugu: cat.telugu,
            badge:
              cat.id === 'ALL'
                ? events.length
                : events.filter((e) => {
                    const c = e.category.name.toUpperCase();
                    const l = e.category.label.toUpperCase();
                    const t = e.title.toUpperCase();
                    if (cat.id === 'SANKRANTHI') return c.includes('SANKRANTHI') || l.includes('SANKRANTHI') || t.includes('SANKRANTHI');
                    if (cat.id === 'BATHUKAMMA') return c.includes('BATHUKAMMA') || l.includes('BATHUKAMMA') || t.includes('BATHUKAMMA') || t.includes('DASARA');
                    if (cat.id === 'UGADI') return c.includes('UGADI') || l.includes('UGADI') || t.includes('UGADI');
                    if (cat.id === 'SPORTS') return c.includes('SPORT') || l.includes('SPORT') || t.includes('CRICKET');
                    if (cat.id === 'YOUTH') return c.includes('BADI') || c.includes('YOUTH') || t.includes('BADI');
                    return false;
                  }).length,
          }))}
          activeId={selectedCategory}
          onChange={(newId) => setSelectedCategory(newId)}
          size="md"
          variant="amber"
        />
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 rounded-3xl glass-panel bg-[#09222c]/90 border border-[#f4bb59]/25 shadow-md space-y-3 text-[#fff5dc]">
          <Calendar className="w-12 h-12 text-[#f4bb59]/50 mx-auto" />
          <h3 className="text-lg font-bold text-white">No events found</h3>
          <p className="text-xs text-[#e7d5b8]">Try choosing another category or clearing your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-2xl border border-[#f4bb59]/25 bg-gradient-to-b from-[#09222c] to-[#071a20] shadow-xl overflow-hidden flex flex-col justify-between hover:border-[#f4bb59] hover:shadow-[0_20px_50px_rgba(244,187,89,0.15)] transition-all duration-300 group"
            >
              {/* Event Media */}
              <div className="relative h-52 w-full bg-[#041216] overflow-hidden">
                <img
                  src={
                    evt.coverImageUrl ||
                    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a20] via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#071a20]/90 backdrop-blur-md text-[#ffd18a] border border-[#f4bb59]/30">
                  {evt.category.label}
                </span>
                {evt.isFeatured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] text-[#071a20] font-bold shadow-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Event Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f4bb59] transition-colors font-serif">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#e7d5b8] line-clamp-3 mt-2 leading-relaxed font-normal">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-[#d8c8b4]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#f4bb59] shrink-0" />
                    <span className="font-medium text-[#fff5dc]">{formatUtahDate(new Date(evt.startDateTime), 'long')}</span>
                  </div>
                  {evt.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#e34e5b] shrink-0" />
                      <span className="truncate font-medium">{evt.venue.name}, {evt.venue.city}</span>
                    </div>
                  )}
                  {evt.ticketTypes && evt.ticketTypes.length > 0 && (
                    <div className="flex items-center gap-2 text-[#34d399] font-semibold">
                      <Ticket className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {evt.ticketTypes[0].price === 0
                          ? 'Free Member RSVP'
                          : `From $${evt.ticketTypes[0].price.toFixed(0)}`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/events/${evt.slug}`}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] hover:brightness-110 text-[#071a20] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 group-hover:gap-2.5"
                  >
                    <span>View Details & Register</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
