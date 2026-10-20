'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('MEMBERSHIP');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Reach Out to UTA
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Contact Association Officers
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Have questions about membership, festival tickets, cultural performances, or sponsorship? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">General Inquiries</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Salt Lake City & South Jordan, UT, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@utahtelugu.org" className="hover:underline">
                  contact@utahtelugu.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:president@utahtelugu.org" className="hover:underline">
                  president@utahtelugu.org
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-2 leading-relaxed">
            <h4 className="font-bold text-white">Office Response Window</h4>
            <p>
              The Executive Committee is volunteer-operated. We respond to emails and inquiries within 24–48 hours Mountain Time.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Message Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, {name}. Your inquiry has been routed to the appropriate association committee lead.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Venkat Rao"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Committee</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                >
                  <option value="MEMBERSHIP">Membership & Family Passes</option>
                  <option value="EVENTS">Event Ticketing & Festival Inquiries</option>
                  <option value="PERFORMANCES">Cultural Stage & Dance Submissions</option>
                  <option value="SPORTS">Sports Tournaments & Leagues</option>
                  <option value="SPONSORSHIP">Corporate Sponsorship & Partnerships</option>
                  <option value="TELUGU_BADI">Telugu Badi Language School</option>
                  <option value="OTHER">General Feedback & Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can the Utah Telugu Association support you?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
