'use client';

import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';

interface ShiftItem {
  id: string;
  shiftName: string;
  event: { title: string };
}

export function VolunteerFormClient({ shifts }: { shifts: ShiftItem[] }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedShiftId, setSelectedShiftId] = useState(shifts[0]?.id || '');
  const [interests, setInterests] = useState<string[]>([
    'Welcome & QR Check-In',
    'Food Banquet Service',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableInterests = [
    'Welcome & QR Check-In',
    'Food Banquet Service',
    'Stage Coordination & Audio/Visual',
    'Youth Games & Activities',
    'Sports Tournament Scorekeeping',
    'Hall Setup & Teardown',
    'Photography & Social Media',
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!fullName || !email) {
      setStatusMessage('Please enter your full name and email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/volunteers/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          shiftId: selectedShiftId || undefined,
          interests,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit volunteer signup.');

      setIsSuccess(true);
      setStatusMessage(data.message || 'Thank you for volunteering with UTA!');
    } catch (err: any) {
      setIsSuccess(false);
      setStatusMessage(err.message || 'Error occurred while saving your signup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Full Legal Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Venkat Rao"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="volunteer@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Mobile Phone (for SMS notifications)</label>
          <input
            type="tel"
            placeholder="(801) 555-0123"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        {shifts.length > 0 && (
          <div>
            <label className="block font-semibold mb-1">Select Specific Shift (Optional)</label>
            <select
              value={selectedShiftId}
              onChange={(e) => setSelectedShiftId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
            >
              <option value="">General Volunteer Pool (Contact me for any event)</option>
              {shifts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shiftName} ({s.event.title})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Interest Checkboxes */}
      <div className="space-y-2">
        <label className="block font-semibold">Service Interests & Skills</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableInterests.map((interest) => {
            const isChecked = interests.includes(interest);
            return (
              <label
                key={interest}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                  isChecked ? 'border-purple-400 bg-purple-400/10 text-white' : 'border-white/5 bg-white/5 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleInterest(interest)}
                  className="rounded border-slate-700 text-purple-500"
                />
                <span>{interest}</span>
              </label>
            );
          })}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 ${
            isSuccess
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          {isSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{statusMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold shadow-md disabled:opacity-50 flex items-center gap-2"
      >
        <HeartHandshake className="w-4 h-4" />
        <span>{isSubmitting ? 'Registering...' : 'Sign Up to Volunteer'}</span>
      </button>
    </form>
  );
}
