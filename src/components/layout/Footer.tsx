'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const isDarkTheme = true;

  return (
    <footer
      className={`w-full border-t text-sm relative z-10 transition-colors ${
        isDarkTheme
          ? 'bg-[var(--bg-secondary)] border-[var(--border-card)] text-[var(--text-secondary)]'
          : 'bg-[#f7efe1] border-amber-900/15 text-[#574436]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl p-1 border flex items-center justify-center shadow-sm ${
                  isDarkTheme
                    ? 'bg-[var(--bg-card)] border-[var(--border-card)]'
                    : 'bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-amber-100/40 border-amber-900/15'
                }`}
              >
                <img
                  src="/images/uta_logo.png"
                  alt="Utah Telugu Association Official Logo"
                  className="w-10 h-10 object-contain"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <span
                  className={`font-bold text-base tracking-tight font-display ${
                    isDarkTheme ? 'text-white' : 'text-[#1c140e]'
                  }`}
                >
                  Utah Telugu Association
                </span>
                <p
                  className={`text-xs font-telugu font-semibold ${
                    isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-[#b45309]'
                  }`}
                >
                  ఉటా తెలుగు సంఘం
                </p>
              </div>
            </div>
            <p
              className={`text-xs leading-relaxed max-w-sm ${
                isDarkTheme ? 'text-[var(--text-secondary)]/90' : 'text-[#574436]'
              }`}
            >
              Rooted in Culture. Connected in Utah. A non-profit 501(c)(3) cultural association dedicated to preserving, promoting, and celebrating Telugu heritage, language, arts, and community welfare throughout the state of Utah.
            </p>
            <div
              className={`pt-2 space-y-1.5 text-xs ${
                isDarkTheme ? 'text-[var(--text-secondary)]/80' : 'text-[#574436]'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className={`w-3.5 h-3.5 ${isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-amber-700'}`} />
                <span>Salt Lake City, Utah, USA (Mountain Time)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-3.5 h-3.5 ${isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-amber-700'}`} />
                <span>contact@utahtelugu.org</span>
              </div>
            </div>
          </div>

          {/* Column 2: Cultural Heritage & Blogs */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkTheme ? 'text-white' : 'text-[#1c140e]'
              }`}
            >
              Cultural Lore &amp; Blogs
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/culture" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>All Festival Blogs</Link></li>
              <li><Link href="/culture/sankranthi" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Sankranthi Lore &amp; Traditions</Link></li>
              <li><Link href="/culture/ugadi" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Ugadi &amp; Telugu New Year</Link></li>
              <li><Link href="/culture/bathukamma" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Bathukamma Floral Festival</Link></li>
              <li><Link href="/gallery" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Photo &amp; Video Memories</Link></li>
            </ul>
          </div>

          {/* Column 3: Participant Stage & Collaboration */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkTheme ? 'text-white' : 'text-[#1c140e]'
              }`}
            >
              Stage &amp; Collaboration
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/schedule" className={`font-semibold transition-colors flex items-center gap-1 ${isDarkTheme ? 'text-[var(--accent-gold)] hover:underline' : 'text-amber-800 hover:text-amber-950'}`}><span>✦ Stage Run-of-Show &amp; Calls</span></Link></li>
              <li><Link href="/performances" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Register Dance / Performance</Link></li>
              <li><Link href="/performances" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Audio Track Upload &amp; Audit</Link></li>
              <li><Link href="/schedule" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>SMS Green Room Notifications</Link></li>
              <li><Link href="/dashboard" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Performer &amp; Member Passes</Link></li>
            </ul>
          </div>

          {/* Column 4: Community & Contact */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkTheme ? 'text-white' : 'text-[#1c140e]'
              }`}
            >
              Community Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/contact" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Contact Stage Coordinators</Link></li>
              <li><Link href="/dashboard" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Member Dashboard</Link></li>
              <li><Link href="/privacy" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Terms of Participation</Link></li>
              <li><Link href="/accessibility" className={`transition-colors ${isDarkTheme ? 'hover:text-[var(--accent-gold)]' : 'hover:text-amber-800'}`}>Accessibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
            isDarkTheme
              ? 'border-white/10 text-white/50'
              : 'border-amber-900/10 text-[#786454]'
          }`}
        >
          <p>© {new Date().getFullYear()} Utah Telugu Association (UTA). All rights reserved. 501(c)(3) Non-Profit Organization.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className={isDarkTheme ? 'hover:text-white' : 'hover:text-[#1c140e]'}>Privacy Policy</Link>
            <Link href="/terms" className={isDarkTheme ? 'hover:text-white' : 'hover:text-[#1c140e]'}>Terms of Use</Link>
            <Link href="/accessibility" className={isDarkTheme ? 'hover:text-white' : 'hover:text-[#1c140e]'}>Accessibility (WCAG 2.2)</Link>
            <span className={isDarkTheme ? 'text-white/20' : 'text-amber-900/30'}>|</span>
            <span
              className={`font-telugu font-semibold ${
                isDarkTheme ? 'text-[var(--accent-gold)]' : 'text-amber-800'
              }`}
            >
              కలిసి ఉందాం • తెలుగు సంస్కృతిని కాపాడుకుందాం
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
