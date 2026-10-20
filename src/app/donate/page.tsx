'use client';

import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5" />
          <span>501(c)(3) TAX-DEDUCTIBLE DONATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Support the Utah Telugu Community
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Your charitable gifts fund youth Telugu language classes, collegiate scholarships, cultural stage productions, and emergency community aid across Utah.
        </p>
      </div>

      {isSubmitted ? (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Thank You for Your Generosity!</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your pledge of <strong className="text-amber-400">{formatCurrency(amount)}</strong> has been recorded for the Utah Telugu Association. A tax-deductible receipt has been dispatched to <strong className="text-white">{donorEmail}</strong>.
          </p>
          <div className="pt-2">
            <a
              href="https://www.zeffy.com/donation/uta-community-fund"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-md"
            >
              <span>Complete Payment via Zeffy (100% Free Platform)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
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
                      ? 'border-rose-400 bg-rose-400/10 text-white shadow-md'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-xs block text-white">{c.label}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{c.desc}</span>
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
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
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
                  className="w-full py-2 px-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs text-center"
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
                <label className="block text-xs text-slate-400 mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkat Rao"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email (for 501c3 tax receipt) *</label>
                <input
                  type="email"
                  required
                  placeholder="donor@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 pt-1">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-rose-500"
              />
              <span>Keep my donation anonymous in annual public donor rolls</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Donation:</span>
              <span className="text-2xl font-extrabold text-amber-400">{formatCurrency(amount)}</span>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs shadow-xl shadow-rose-500/20 flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>Donate {formatCurrency(amount)} Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
