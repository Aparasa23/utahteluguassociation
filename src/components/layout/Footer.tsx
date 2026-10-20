import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#050813] border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                UTA
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight font-display">
                  Utah Telugu Association
                </span>
                <p className="text-xs text-amber-400/80 font-telugu">ఉటా తెలుగు సంఘం</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Rooted in Culture. Connected in Utah. A non-profit 501(c)(3) cultural association dedicated to preserving, promoting, and celebrating Telugu heritage, language, arts, and community welfare throughout the state of Utah.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Salt Lake City, Utah, USA (Mountain Time)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>contact@utahtelugu.org</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Association</Link></li>
              <li><Link href="/leadership" className="hover:text-amber-400 transition-colors">Executive Committee</Link></li>
              <li><Link href="/history" className="hover:text-amber-400 transition-colors">UTA History & Milestones</Link></li>
              <li><Link href="/community" className="hover:text-amber-400 transition-colors">Telugu Badi School</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-400 transition-colors">Photo & Video Archive</Link></li>
              <li><Link href="/reports" className="hover:text-amber-400 transition-colors">Annual Financial Reports</Link></li>
            </ul>
          </div>

          {/* Column 3: Membership & Events */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Programs & Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/membership/plans" className="hover:text-amber-400 transition-colors">Family Membership Plans</Link></li>
              <li><Link href="/membership/join" className="hover:text-amber-400 transition-colors">Join / Register Family</Link></li>
              <li><Link href="/membership/verify" className="hover:text-amber-400 transition-colors">Digital ID Verification</Link></li>
              <li><Link href="/events" className="hover:text-amber-400 transition-colors">Upcoming Festivals</Link></li>
              <li><Link href="/sports/tournaments" className="hover:text-amber-400 transition-colors">Cricket & Sports Leagues</Link></li>
              <li><Link href="/performances" className="hover:text-amber-400 transition-colors">Cultural Stage Registration</Link></li>
            </ul>
          </div>

          {/* Column 4: Engage & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Get Involved</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/volunteer" className="hover:text-amber-400 transition-colors">Volunteer Coordination</Link></li>
              <li><Link href="/become-a-sponsor" className="hover:text-amber-400 transition-colors">Sponsorship Tiers</Link></li>
              <li><Link href="/donate" className="hover:text-amber-400 transition-colors">Donate to Community Fund</Link></li>
              <li><Link href="/admin" className="hover:text-rose-400 transition-colors flex items-center gap-1">Officer Admin Portal</Link></li>
              <li><Link href="/accessibility" className="hover:text-amber-400 transition-colors">Accessibility Statement</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Utah Telugu Association (UTA). All rights reserved. 501(c)(3) Non-Profit Organization.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-slate-400">Accessibility (WCAG 2.2)</Link>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400/90 font-telugu">కలిసి ఉందాం • తెలుగు సంస్కృతిని కాపాడుకుందాం</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
