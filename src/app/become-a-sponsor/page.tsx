'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Sparkles, Send, ExternalLink } from 'lucide-react';

export default function BecomeSponsorPage() {
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState('PLATINUM');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>CORPORATE & COMMUNITY PARTNERSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Become a UTA Sponsor
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Elevate your corporate brand visibility while empowering Telugu language education, youth athletics, and cultural arts across Utah.
        </p>
      </div>

      {isSubmitted ? (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Inquiry Received!</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Thank you, {contactPerson}. A member of the UTA Sponsorship & Finance Committee will reach out to <strong className="text-amber-400">{email}</strong> within 24 hours with partnership agreements and stage branding kits.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          {/* Tier Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              1. Choose Desired Sponsorship Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'TITLE', label: 'Title Partner', amount: '$5,000+' },
                { id: 'PLATINUM', label: 'Platinum', amount: '$2,500' },
                { id: 'GOLD', label: 'Gold Partner', amount: '$1,000' },
                { id: 'SILVER', label: 'Silver Partner', amount: '$500' },
              ].map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                    selectedTier === tier.id
                      ? 'border-amber-400 bg-amber-400/10 text-white shadow-md'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-xs block">{tier.label}</span>
                  <span className="text-xs font-extrabold text-amber-400 mt-1 block">
                    {tier.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              2. Business & Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Wasatch Tech Solutions"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Contact Representative Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Srinivas Murthy"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(801) 555-0199"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Custom Notes / Goals</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your target audience, event preferences, or specific booth requirements."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Sponsorship Inquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
