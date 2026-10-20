'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Music,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  FileText,
  Volume2,
} from 'lucide-react';
import Link from 'next/link';

export function HomeAudioValidatorClient() {
  const [songTitle, setSongTitle] = useState('Annamayya Keerthana Fusion');
  const [leadName, setLeadName] = useState('Smt. Gayathri Rao');
  const [groupName, setGroupName] = useState('Wasatch Kuchipudi Troupe');
  const [durationMinutes, setDurationMinutes] = useState('4');
  const [durationSeconds, setDurationSeconds] = useState('45');
  const [bioNotes, setBioNotes] = useState('Classical Kuchipudi Tarangam performance on brass plate depicting Lord Krishna.');
  const [performerCount, setPerformerCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [proofreadResult, setProofreadResult] = useState<any>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const totalSeconds = parseInt(durationMinutes || '0', 10) * 60 + parseInt(durationSeconds || '0', 10);

    const submissionPayload = {
      submission: {
        id: 'live-test-' + Date.now(),
        leadName,
        leadEmail: 'troupe@example.com',
        leadPhone: '+18015551234',
        groupName,
        category: 'CLASSICAL_KUCHIPUDI',
        songTitle,
        performerCount,
        performerNames: ['Performer 1', 'Performer 2', 'Performer 3'],
        ageGroup: 'TEENS_11_17',
        bioNotes,
        audioTrack: {
          fileName: 'track.mp3',
          durationSeconds: totalSeconds,
          fileSizeBytes: 4500000,
          mimeType: 'audio/mp3',
        },
      },
    };

    try {
      const res = await fetch('/api/automation/proofread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });
      const data = await res.json();
      if (data.success) {
        setProofreadResult(data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 border border-[var(--border-card)] bg-[var(--bg-secondary)] shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-card)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--accent-gold)]/15 border border-[var(--border-card)] text-[var(--accent-gold)] shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                Automated Participant Audio &amp; Track Validation Engine
              </h2>
              <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                AUTOMATION ACTIVE
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Audits stage track duration (<strong className="text-white">Strict 5:00 min limit</strong>), checks song duplicates, and proofreads emcee bios in real time.
            </p>
          </div>
        </div>

        <Link
          href="/performances"
          className="text-xs font-bold text-[var(--accent-gold)] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Full Stage Registration Page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Column */}
        <form onSubmit={handleValidate} className="lg:col-span-7 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                Troupe / Academy Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                Song / Keerthana Title
              </label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                Track Minutes
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                Track Seconds
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={durationSeconds}
                onChange={(e) => setDurationSeconds(e.target.value)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                Performer Count
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={performerCount}
                onChange={(e) => setPerformerCount(parseInt(e.target.value, 10) || 1)}
                required
                className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[var(--accent-gold)] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
              Stage Introduction Bio (Emcee Cue)
            </label>
            <textarea
              rows={2}
              value={bioNotes}
              onChange={(e) => setBioNotes(e.target.value)}
              placeholder="Provide 2-3 sentences about your group's classical training or choreography..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border-card)] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-gold)] placeholder-white/30"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent-gold)] hover:brightness-110 text-[var(--bg-primary)] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing Track &amp; Bio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test Audio Duration &amp; Proofread Bio</span>
              </>
            )}
          </button>
        </form>

        {/* Results Column */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Automated Stage Readiness
              </span>
              {proofreadResult ? (
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                    proofreadResult.isValid
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  Score: {proofreadResult.score}/100
                </span>
              ) : (
                <span className="text-[11px] text-[var(--text-muted)] font-mono">Ready to Audit</span>
              )}
            </div>

            {proofreadResult ? (
              <div className="space-y-2.5 text-xs">
                {proofreadResult.isValid ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Track &amp; Bio Approved for Stage!</strong>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">
                        Duration is under 5:00 minutes and emcee intro bio is verified.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Action Needed from Performer</strong>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5 mt-1 text-rose-200">
                        {proofreadResult.errors.map((err: string, i: number) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {proofreadResult.warnings?.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] space-y-1">
                    <strong className="block font-bold">Emcee Note:</strong>
                    {proofreadResult.warnings.map((w: string, i: number) => (
                      <p key={i}>• {w}</p>
                    ))}
                  </div>
                )}

                {proofreadResult.automatedEmailTemplate && (
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/70 space-y-1 font-mono">
                    <span className="text-[var(--accent-gold)] font-bold block">
                      Auto-Dispatched Email Draft:
                    </span>
                    <p className="truncate">Subject: {proofreadResult.automatedEmailTemplate.subject}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[var(--text-secondary)] space-y-2">
                <Music className="w-8 h-8 text-[var(--accent-gold)] mx-auto opacity-70" />
                <p>Click "Test Audio Duration &amp; Proofread Bio" to simulate the real-time stage manager audit.</p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Tests tracks above 5:00 min, detects duplicate registrations, and prepares automated feedback.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-muted)]">Stage Run-of-Show Rule #1</span>
            <span className="text-[var(--accent-gold)] font-bold">Strict 5:00 min cap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
