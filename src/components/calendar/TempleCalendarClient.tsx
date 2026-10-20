'use client';

import React, { useState } from 'react';
import {
  TEMPLE_CALENDAR_EVENTS,
  UTAH_TEMPLES,
  TELUGU_MONTHS,
  PanchangamDay,
} from '@/lib/panchangam';
import {
  Sun,
  Moon,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Flame,
  ChevronRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { KineticTabs } from '@/components/ui/KineticTabs';

export function TempleCalendarClient() {
  const [activeTab, setActiveTab] = useState<'TODAY' | 'EVENTS' | 'TEMPLES' | 'MUHURTHAM'>('TODAY');
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-20');

  const selectedDay =
    TEMPLE_CALENDAR_EVENTS.find((d) => d.date === selectedDateStr) ||
    TEMPLE_CALENDAR_EVENTS[0];

  const tabs = [
    { id: 'TODAY', label: "Today's Panchangam", telugu: 'నేటి పంచాంగం' },
    { id: 'EVENTS', label: 'Festivals & Vratams', telugu: 'రాబోవు పండుగలు' },
    { id: 'TEMPLES', label: 'Utah Temples', telugu: 'ఉటా దేవాలయాలు' },
    { id: 'MUHURTHAM', label: 'Auspicious Muhurthams', telugu: 'శుభ ముహూర్తాలు' },
  ] as const;

  const handleDownloadIcs = (event: PanchangamDay) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Utah Telugu Association//Temple Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.festival || event.tithi}
DESCRIPTION:Utah Telugu Association Temple Calendar event for ${event.tithiTelugu}. Timing: ${event.sunrise} to ${event.sunset} MDT.
DTSTART:${event.date.replace(/-/g, '')}T180000Z
DTEND:${event.date.replace(/-/g, '')}T200000Z
LOCATION:${event.templeEvent?.templeName || 'Salt Lake City, Utah'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.date}-${event.vratamType || 'panchangam'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      {/* ======================================================== */}
      {/* 1. STATE-OF-THE-ART ACTIVE THEORY / LUSION DYNAMIC TABS   */}
      {/* ======================================================== */}
      <div className="flex justify-center">
        <KineticTabs<'TODAY' | 'EVENTS' | 'TEMPLES' | 'MUHURTHAM'>
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            telugu: tab.telugu,
          }))}
          activeId={activeTab}
          onChange={(newTab) => setActiveTab(newTab)}
          size="lg"
          variant="amber"
        />
      </div>

      {/* ======================================================== */}
      {/* 2. TAB 1: TODAY'S PANCHANGAM (UTAH MOUNTAIN TIME)        */}
      {/* ======================================================== */}
      {activeTab === 'TODAY' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Quick Date Switcher Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-[#786454] uppercase tracking-wider shrink-0 mr-1">
              Select Date:
            </span>
            {TEMPLE_CALENDAR_EVENTS.map((item) => (
              <button
                key={item.date}
                onClick={() => setSelectedDateStr(item.date)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  selectedDateStr === item.date
                    ? 'bg-[#f4bb59] text-[#071a20] border-[#f4bb59] shadow-md font-extrabold'
                    : 'bg-[#09222c]/80 text-[#e7d5b8] border-[#f4bb59]/20 hover:bg-[#0d2e3b] hover:text-[#f4bb59]'
                }`}
              >
                <span>{new Date(item.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="ml-1 text-[10px] opacity-80">({item.dayOfWeek.slice(0, 3)})</span>
              </button>
            ))}
          </div>

          {/* Primary Panchangam Hero Card */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#f4bb59]/30 bg-gradient-to-br from-[#09222c]/95 via-[#071a20]/90 to-[#041216]/95 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f4bb59]/20 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4bb59]/10 text-[#f4bb59] border border-[#f4bb59]/30 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sun className="w-3.5 h-3.5 text-[#f4bb59]" />
                  <span>Vedic Calendar • Salt Lake Valley, Utah (MDT)</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                  {selectedDay.teluguDay}
                </h2>
                <p className="text-base sm:text-lg font-telugu text-[#ffcb75] font-bold mt-1">
                  {selectedDay.tithiTelugu} • {selectedDay.nakshatraTelugu}
                </p>
                <p className="text-xs text-[#a5c2cb] mt-0.5">
                  Standard Solar Date: {new Date(selectedDay.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <button
                onClick={() => handleDownloadIcs(selectedDay)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-bold text-xs flex items-center gap-1.5 transition-all hover:brightness-110 shrink-0 shadow-lg"
              >
                <Download className="w-4 h-4 text-[#071a20]" />
                <span>Add to Phone Calendar</span>
              </button>
            </div>

            {/* The 5 Pillars of Panchangam Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 shadow-inner text-center">
                <span className="text-[10px] font-bold uppercase text-[#a5c2cb] block">Tithi (తిథి)</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">{selectedDay.tithi.split('/')[0]}</span>
                <span className="text-xs text-[#f4bb59] font-telugu font-semibold">{selectedDay.tithiTelugu}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 shadow-inner text-center">
                <span className="text-[10px] font-bold uppercase text-[#a5c2cb] block">Vara (వారం)</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">{selectedDay.dayOfWeek}</span>
                <span className="text-xs text-[#ffcb75] font-telugu font-semibold">{selectedDay.teluguDay.split('(')[0]}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 shadow-inner text-center">
                <span className="text-[10px] font-bold uppercase text-[#a5c2cb] block">Nakshatra (నక్షత్రం)</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">{selectedDay.nakshatra.split('(')[0]}</span>
                <span className="text-xs text-[#ffcb75] font-telugu font-semibold">{selectedDay.nakshatraTelugu}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 shadow-inner text-center">
                <span className="text-[10px] font-bold uppercase text-[#a5c2cb] block">Yoga (యోగం)</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">{selectedDay.yoga}</span>
                <span className="text-xs text-[#a5c2cb] font-semibold">{selectedDay.paksha} Paksham</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 shadow-inner text-center col-span-2 md:col-span-1">
                <span className="text-[10px] font-bold uppercase text-[#a5c2cb] block">Karana (కరణం)</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-1">{selectedDay.karana}</span>
                <span className="text-xs text-emerald-400 font-semibold">Shubha Karana</span>
              </div>
            </div>

            {/* Auspicious & Inauspicious Timings Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Auspicious (శుభ సమయాలు) */}
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-sm text-emerald-200">
                    Auspicious Timings (శుభ సమయాలు)
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-[#e7d5b8]">
                  <div className="flex justify-between py-1 border-b border-emerald-500/20">
                    <span className="font-medium text-[#a5c2cb]">Abhijit Muhurtham (అభిజిత్):</span>
                    <strong className="text-emerald-300">{selectedDay.abhijitMuhurtham}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-500/20">
                    <span className="font-medium text-[#a5c2cb]">Sunrise (సూర్యోదయం):</span>
                    <strong className="text-white">{selectedDay.sunrise}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-[#a5c2cb]">Sunset (సూర్యాస్తమయం):</span>
                    <strong className="text-white">{selectedDay.sunset}</strong>
                  </div>
                </div>
              </div>

              {/* Inauspicious (వర్జ్య సమయాలు) */}
              <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <h4 className="font-bold text-sm text-rose-200">
                    Inauspicious Timings (వర్జ్య సమయాలు)
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-[#e7d5b8]">
                  <div className="flex justify-between py-1 border-b border-rose-500/20">
                    <span className="font-medium text-[#a5c2cb]">Rahu Kalam (రాహుకాలం):</span>
                    <strong className="text-rose-300">{selectedDay.rahuKalam}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rose-500/20">
                    <span className="font-medium text-[#a5c2cb]">Yamagandam (యమగండం):</span>
                    <strong className="text-white">{selectedDay.yamagandam}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-[#a5c2cb]">Durmuhurtham (దుర్ముహూర్తం):</span>
                    <strong className="text-white">{selectedDay.durmuhurtham}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Utah Temple Event of the Day */}
            {selectedDay.templeEvent && (
              <div className="p-5 rounded-2xl bg-[#0c2b36] border border-[#f4bb59]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#071a20] bg-[#f4bb59] px-2.5 py-0.5 rounded-full font-bold">
                    Local Utah Temple Service
                  </span>
                  <h4 className="font-bold text-white text-base">
                    {selectedDay.templeEvent.eventTitle}
                  </h4>
                  <p className="text-xs text-[#a5c2cb] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f4bb59]" />
                    <span>{selectedDay.templeEvent.templeName} ({selectedDay.templeEvent.city})</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#f4bb59]" />
                    <span>{selectedDay.templeEvent.timing}</span>
                  </p>
                </div>
                <a
                  href="https://utahganeshatemple.org"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-bold text-xs flex items-center gap-1 shrink-0 shadow hover:brightness-110 transition-all"
                >
                  <span>Temple Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TAB 2: UPCOMING FESTIVALS & VRATAMS LIST              */}
      {/* ======================================================== */}
      {activeTab === 'EVENTS' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="border-b border-[#f4bb59]/20 pb-3">
            <h3 className="text-xl font-bold text-white font-display">
              Vedic Festivals & Vratams (Utah Mountain Time)
            </h3>
            <p className="text-xs text-[#a5c2cb]">
              Calculated specifically for the Salt Lake Valley horizon so fasting and pooja timings are authentic to Utah.
            </p>
          </div>

          <div className="space-y-3">
            {TEMPLE_CALENDAR_EVENTS.map((event) => (
              <div
                key={event.date}
                className="glass-panel p-5 rounded-2xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#f4bb59]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#071a20] border border-[#f4bb59]/30 flex flex-col items-center justify-center shrink-0 text-center shadow-inner">
                    <span className="text-[10px] font-bold uppercase text-[#f4bb59]">
                      {new Date(event.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg font-black text-white font-display">
                      {new Date(event.date + 'T12:00:00').getDate()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f4bb59]/15 text-[#f4bb59] font-bold border border-[#f4bb59]/30 uppercase">
                        {event.vratamType || 'FESTIVAL'}
                      </span>
                      <span className="text-xs text-[#a5c2cb]">
                        {event.dayOfWeek} • Sunrise {event.sunrise}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">
                      {event.festival || event.tithi}
                    </h4>
                    <p className="text-xs text-[#ffcb75] font-telugu font-semibold">
                      {event.festivalTelugu || event.tithiTelugu}
                    </p>
                    {event.templeEvent && (
                      <p className="text-xs text-[#e7d5b8] flex items-center gap-1 pt-1">
                        <MapPin className="w-3 h-3 text-[#f4bb59]" />
                        <span>{event.templeEvent.templeName}: {event.templeEvent.eventTitle} ({event.templeEvent.timing})</span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadIcs(event)}
                  className="px-4 py-2 rounded-xl bg-[#0c2b36] hover:bg-[#0f3745] text-[#f4bb59] border border-[#f4bb59]/30 font-bold text-xs flex items-center gap-1.5 transition-colors self-end md:self-center shadow"
                >
                  <Download className="w-3.5 h-3.5 text-[#f4bb59]" />
                  <span>Sync to Calendar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TAB 3: UTAH TEMPLES DIRECTORY & SERVICES             */}
      {/* ======================================================== */}
      {activeTab === 'TEMPLES' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="border-b border-[#f4bb59]/20 pb-3">
            <h3 className="text-xl font-bold text-white font-display">
              Partner Temples in Utah
            </h3>
            <p className="text-xs text-[#a5c2cb]">
              The Utah Telugu Association collaborates with local Hindu temples across the Wasatch Front for festival celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UTAH_TEMPLES.map((temple, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-white text-lg font-display">
                        {temple.name}
                      </h4>
                      <p className="text-xs text-[#ffcb75] font-telugu font-semibold">
                        {temple.teluguName}
                      </p>
                    </div>
                    <span className="p-2.5 rounded-2xl bg-[#f4bb59]/10 text-[#f4bb59] border border-[#f4bb59]/25">
                      <Flame className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#e7d5b8]">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f4bb59] shrink-0" />
                      <span>{temple.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#f4bb59] shrink-0" />
                      <span>Deities: {temple.deity}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#f4bb59]/15 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f4bb59] block">
                      Regular Weekly Programs:
                    </span>
                    <ul className="space-y-1 text-xs text-[#a5c2cb]">
                      {temple.events.map((ev, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="text-[#e7d5b8]">{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f4bb59]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#f4bb59]">{temple.phone}</span>
                  <a
                    href={temple.website}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-bold text-xs flex items-center gap-1 hover:brightness-110 transition-all shadow"
                  >
                    <span>Visit Temple Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TAB 4: AUSPICIOUS MUHURTHAM CALCULATOR                */}
      {/* ======================================================== */}
      {activeTab === 'MUHURTHAM' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Auspicious Muhurtham Finder (శుభ ముహూర్త నిర్ణయం)
            </h3>
            <p className="text-xs text-[#a5c2cb]">
              Guidelines for auspicious ceremonies across Utah based on traditional Telugu Panchangam:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#f4bb59] block">Vivaha (వివాహం)</span>
              <h5 className="font-bold text-white text-sm">Wedding Muhurthams</h5>
              <p className="text-xs text-[#a5c2cb] leading-relaxed">
                Auspicious in Magha, Phalguna, Vaishakha and Jyeshta months. Consult Utah temple priests for kundali matching.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#f4bb59] block">Griha Pravesham (గృహ ప్రవేశం)</span>
              <h5 className="font-bold text-white text-sm">Housewarming</h5>
              <p className="text-xs text-[#a5c2cb] leading-relaxed">
                Shukla Paksha Dvitiya, Tritiya, Panchami, Saptami, Dashami, and Trayodashi during Uttarayana.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#f4bb59] block">Vahana Khareedu (వాహన కొనుగోలు)</span>
              <h5 className="font-bold text-white text-sm">New Vehicle Pooja</h5>
              <p className="text-xs text-[#a5c2cb] leading-relaxed">
                Perform Vahana Pooja on auspicious Thursdays or Sundays in Pushya or Magha nakshatras, avoiding Rahu Kalam.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#071a20]/90 border border-[#f4bb59]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#f4bb59] block">Namakaranam (నామకరణం)</span>
              <h5 className="font-bold text-white text-sm">Baby Naming Ceremony</h5>
              <p className="text-xs text-[#a5c2cb] leading-relaxed">
                Conducted on the 11th, 16th, or 21st day after childbirth during favorable Chandra balam.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c2b36] border border-[#f4bb59]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm">Need a Certified Telugu Vedic Priest in Utah?</h4>
              <p className="text-xs text-[#a5c2cb] mt-0.5">
                The Utah Telugu Association connects member families with qualified Vedic scholars for home rituals and temple poojas.
              </p>
            </div>
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-bold text-xs shadow whitespace-nowrap hover:brightness-110 transition-all"
            >
              Contact Priest Coordinator
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
