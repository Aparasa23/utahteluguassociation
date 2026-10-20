'use client';

import React, { useState } from 'react';
import { Megaphone, Send, Users, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminCommunicationsPage() {
  const [segment, setSegment] = useState('ALL_ACTIVE_MEMBERS');
  const [subject, setSubject] = useState('Sankranthi Sambaralu 2027 Admission Instructions');
  const [message, setMessage] = useState('Dear Utah Telugu Family,\n\nWe look forward to seeing you at the Mid-Valley Performing Arts Center this Saturday. Please have your digital QR passes ready on your mobile phones for express gate check-in.');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-amber-900/10 pb-4">
        <h1 className="text-2xl font-bold text-[#1c140e] font-display">
          Communications & Notification Center
        </h1>
        <p className="text-xs text-[#705544] mt-0.5">
          Audience segmentation, email dispatches, and WhatsApp broadcast templates.
        </p>
      </div>

      <form onSubmit={handleSend} className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-900/15 bg-white/95 shadow-md space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#1c140e] mb-1.5 uppercase tracking-wider">
            Audience Segment *
          </label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-xs focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-medium"
          >
            <option value="ALL_ACTIVE_MEMBERS">All Active UTA Members (285 Families)</option>
            <option value="SANKRANTHI_ATTENDEES">Sankranthi 2027 Registered Attendees (412 Pax)</option>
            <option value="CRICKET_CAPTAINS">Cricket Tournament Captains & Teams (8 Teams)</option>
            <option value="VOLUNTEERS">Active Festival Volunteer Shifts (24 Volunteers)</option>
            <option value="SPONSORS">Corporate & Community Sponsors (12 Partners)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1c140e] mb-1.5 uppercase tracking-wider">
            Subject Line *
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-xs focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1c140e] mb-1.5 uppercase tracking-wider">
            Dispatch Body *
          </label>
          <textarea
            rows={6}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-amber-900/20 text-[#1c140e] text-xs font-mono focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {sent && (
          <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Broadcast dispatched successfully to target audience segment.</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-magnetic px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>Dispatch Broadcast to Segment</span>
        </button>
      </form>
    </div>
  );
}
