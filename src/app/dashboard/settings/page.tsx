'use client';

import React, { useState } from 'react';
import { Settings, Shield, Bell, Globe, Check } from 'lucide-react';

export default function MemberSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">Account Preferences</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your notification preferences and cultural communications.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm">Notification Channels</h3>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 cursor-pointer">
            <span className="text-xs text-slate-300">Email announcements and event ticket receipts</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 cursor-pointer">
            <span className="text-xs text-slate-300">Urgent SMS notifications (venue changes, parking alerts)</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500"
            />
          </label>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-white text-sm">Preferred Association Language</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
          >
            <option value="EN">English (Standard)</option>
            <option value="TE">తెలుగు (Telugu)</option>
            <option value="BILINGUAL">Bilingual English & Telugu</option>
          </select>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Preferences saved successfully.</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
