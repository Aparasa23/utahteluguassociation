'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Send } from 'lucide-react';

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>CORPORATE & COMMUNITY PARTNERSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          Become a UTA Sponsor
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto font-normal">
          Elevate your corporate brand visibility while empowering Telugu language education, youth athletics, and cultural arts across Utah.
        </p>
      </div>

      {isSubmitted ? (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Inquiry Received!</h2>
          <p className="text-xs sm:text-sm text-[#a5c2cb] max-w-md mx-auto">
            Thank you, {contactPerson}. A member of the UTA Sponsorship & Finance Committee will reach out to <strong className="text-[var(--accent-gold)]">{email}</strong> within 24 hours with partnership agreements and stage branding kits.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-2xl space-y-6">
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
                      ? 'border-[#f4bb59] bg-[#f4bb59]/20 text-white shadow-md'
                      : 'border-[#f4bb59]/20 bg-[var(--bg-primary)]/80 text-[#a5c2cb] hover:border-[#f4bb59]/50'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">{tier.label}</span>
                  <span className="text-xs font-black text-[var(--accent-gold)] mt-1 block">
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
                <label className="block text-xs font-bold text-white mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Wasatch Tech Solutions"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Contact Representative Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Srinivas Murthy"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(801) 555-0199"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-white mb-1">Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-white mb-1">Custom Notes / Goals</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your target audience, event preferences, or specific booth requirements."
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4 text-[#071a20]" />
            <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Sponsorship Inquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
