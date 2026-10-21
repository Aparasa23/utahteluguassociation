'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('MEMBERSHIP');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(sending)return;
    setSending(true);setError('');
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,subject,message})});
      const data=await response.json();
      if(!response.ok)throw Error(data.error||'Unable to send your inquiry.');
      setSubmitted(true);
    }catch(e){setError(e instanceof Error?e.message:'Unable to send your inquiry.')}
    finally{setSending(false)}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
          <span>Reach Out to UTA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Contact Association Officers
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto font-normal">
          Have questions about membership, festival tickets, cultural performances, or sponsorship? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white font-display">General Inquiries</h3>
            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>Salt Lake City & South Jordan, UT, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <a href="mailto:contact@utahtelugu.org" className="text-[var(--accent-gold)] hover:underline font-semibold">
                  contact@utahtelugu.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <a href="mailto:president@utahtelugu.org" className="text-[var(--accent-gold)] hover:underline font-semibold">
                  president@utahtelugu.org
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-primary)]/90 border border-[#f4bb59]/20 text-xs text-[#a5c2cb] space-y-2 leading-relaxed">
            <h4 className="font-bold text-[var(--accent-gold)]">Office Response Window</h4>
            <p>
              The Executive Committee is volunteer-operated. We respond to emails and inquiries within 24–48 hours Mountain Time.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Message Sent</h3>
              <p className="text-xs text-[#a5c2cb] max-w-md mx-auto">
                Thank you, {name}. Your inquiry has been delivered to the UTA contact inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Venkat Rao"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Topic / Committee</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59]"
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
                <label className="block text-xs font-bold text-white mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can the Utah Telugu Association support you?"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-card)] text-white text-xs focus:outline-none focus:border-[#f4bb59] focus:ring-1 focus:ring-[#f4bb59] placeholder:text-[#6f8a96]"
                />
              </div>

              {error&&<p role="alert" className="rounded-lg bg-red-950/60 border border-red-400/30 text-red-100 px-4 py-3 text-sm">{error}</p>}
              <button
                disabled={sending}
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] text-[#071a20] font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 hover:brightness-110"
              >
                <Send className="w-4 h-4 text-[#071a20]" />
                <span>{sending?'Sending…':'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
