import React from 'react';
import { Eye, ShieldCheck, CheckCircle2, Globe, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Accessibility Statement (WCAG 2.2 AA) — Utah Telugu Association',
  description: 'Our commitment to digital accessibility, screen-reader support, reduced-motion modes, and bilingual Telugu typography.',
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Inclusivity for All Users
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Accessibility Statement
        </h1>
        <p className="text-xs text-slate-400">Conforming to WCAG 2.2 Level AA Standards</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">Our Accessibility Pledge</h2>
          <p>
            The Utah Telugu Association (UTA) is committed to ensuring that the UTA Digital Universe is accessible to everyone, including individuals with visual, auditory, motor, or cognitive disabilities. We engineer our web application following the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-display">Accessibility Features Built Into UTA Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white text-xs block">Full 2D Accessible Mode</span>
              <p className="text-[11px] text-slate-400">
                The 3D Living Telugu Universe includes a 1-click toggle to a conventional, semantic 2D grid view with full screen-reader and keyboard navigation.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white text-xs block">Visible Focus & Keyboard Operability</span>
              <p className="text-[11px] text-slate-400">
                All buttons, links, modal dialogues, and form fields include high-contrast 2px amber focus outlines for full keyboard-only navigation.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white text-xs block">Reduced-Motion Preferences</span>
              <p className="text-[11px] text-slate-400">
                The platform respects system prefers-reduced-motion settings, disabling particle rotations and spatial camera shifts.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
              <span className="font-bold text-white text-xs block">Bilingual & Telugu Typography</span>
              <p className="text-[11px] text-slate-400">
                Validated UTF-8 Unicode Telugu fonts (Noto Sans Telugu, Gautami) ensure natural diacritic placement and legible glyph rendering.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">Feedback & Assistance</h2>
          <p>
            If you encounter any difficulty navigating or accessing content on this website, please reach out to our accessibility coordinator at <strong className="text-amber-400">accessibility@utahtelugu.org</strong>. We take all feedback seriously and respond promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
