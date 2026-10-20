'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2, ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [cause, setCause] = useState('SCHOLARSHIP');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>501(c)(3) TAX-DEDUCTIBLE DONATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          Support the Utah Telugu Community
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto font-normal">
          Your charitable gifts fund youth Telugu language classes, collegiate scholarships, cultural stage productions, and emergency community aid across Utah.
        </p>
      </div>

      {isSubmitted ? (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Thank You for Your Generosity!</h2>
          <p className="text-xs sm:text-sm text-[#a5c2cb] max-w-md mx-auto">
            Your pledge of <strong className="text-[var(--accent-gold)] font-bold">{formatCurrency(amount)}</strong> has been recorded for the Utah Telugu Association. A tax-deductible receipt has been dispatched to <strong className="text-white">{donorEmail}</strong>.
          </p>
          <div className="pt-2">
            <a
              href="https://www.zeffy.com/donation/uta-community-fund"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
            >
              <span>Complete Payment via Zeffy (100% Free Platform)</span>
              <ExternalLink className="w-4 h-4 text-[#071a20]" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-2xl space-y-6">
          {/* Causes */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              1. Direct Your Contribution
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'SCHOLARSHIP', label: 'Youth STEM & Telugu Scholarship Fund', desc: 'Merit grants for graduating high school seniors' },
                { id: 'CULTURAL_HALL', label: 'Cultural Heritage Hall Endowment', desc: 'Long-term community building & auditorium initiative' },
                { id: 'ANNADANAM', label: 'Festival Feast (Annadanam) Sponsorship', desc: 'Sponsoring meals for Sankranthi & Ugadi attendees' },
                { id: 'GENERAL', label: 'General Association Operations', desc: 'Used wherever the community need is greatest' },
              ].map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCause(c.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    cause === c.id
                      ? 'border-[#f4bb59] bg-[#f4bb59]/20 text-white shadow-md'
                      : 'border-[#f4bb59]/20 bg-[var(--bg-primary)]/80 text-[#a5c2cb] hover:border-[#f4bb59]/50'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">{c.label}</span>
                  <span className="text-[11px] text-[#a5c2cb] block mt-0.5">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Presets */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              2. Select Gift Amount (USD)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectPreset(val)}
                  className={`py-2 rounded-xl font-bold text-xs border transition-all ${
                    amount === val && !customAmount
                      ? 'bg-[#f4bb59] text-[#071a20] border-[#f4bb59] shadow-md font-extrabold'
                      : 'bg-[var(--bg-primary)] text-white border-[#f4bb59]/20 hover:border-[#f4bb59]/50 hover:bg-[#0c2b36]'
                  }`}
                >
                  ${val}
                </button>
              ))}
              <div className="col-span-3 sm:col-span-1">
                <input
                  type="number"
                  min={5}
                  placeholder="Custom"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full py-2 px-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs text-center focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              3. Donor & Tax Receipt Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkat Rao"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white mb-1">Email (for 501c3 tax receipt) *</label>
                <input
                  type="email"
                  required
                  placeholder="donor@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#a5c2cb] pt-1">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-card)] text-[var(--accent-gold)] focus:ring-[#f4bb59]"
              />
              <span>Keep my donation anonymous in annual public donor rolls</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#f4bb59]/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#a5c2cb] block">Total Donation:</span>
              <span className="text-2xl font-black text-[var(--accent-gold)] font-display">{formatCurrency(amount)}</span>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all"
            >
              <Heart className="w-4 h-4 text-[#071a20]" />
              <span>Donate {formatCurrency(amount)} Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
