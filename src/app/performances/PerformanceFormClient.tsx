'use client';

import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Music } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  slug: string;
}

export function PerformanceFormClient({ events }: { events: EventItem[] }) {
  const [eventId, setEventId] = useState(events[0]?.id || '');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CLASSICAL_DANCE');
  const [performanceType, setPerformanceType] = useState('GROUP');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [coordinatorPhone, setCoordinatorPhone] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(6);
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [description, setDescription] = useState('');

  const [participants, setParticipants] = useState<Array<{ fullName: string; ageGroup: string }>>([
    { fullName: '', ageGroup: 'KIDS' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const addParticipant = () => {
    setParticipants([...participants, { fullName: '', ageGroup: 'KIDS' }]);
  };

  const removeParticipant = (idx: number) => {
    setParticipants(participants.filter((_, i) => i !== idx));
  };

  const updateParticipant = (idx: number, field: string, val: string) => {
    const updated = [...participants];
    updated[idx] = { ...updated[idx], [field]: val };
    setParticipants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    if (!title || !coordinatorName || !coordinatorEmail) {
      setStatusMessage('Please fill in required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/performances/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          title,
          category,
          performanceType,
          coordinatorName,
          coordinatorEmail,
          coordinatorPhone,
          durationMinutes,
          audioFileUrl,
          description,
          participants: participants.filter((p) => p.fullName.trim() !== ''),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');

      setIsSuccess(true);
      setStatusMessage(data.message || 'Performance submitted successfully!');
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setIsSuccess(false);
      setStatusMessage(err.message || 'Error submitting performance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Select Festival Event *</label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Performance Title / Song *</label>
          <input
            type="text"
            required
            placeholder="e.g. Kuchipudi Thillana Medley"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          >
            <option value="CLASSICAL_DANCE">Classical Kuchipudi / Bharatanatyam</option>
            <option value="FOLK_DANCE">Telugu Folk (Janapada Geethalu)</option>
            <option value="SINGING">Vocal Singing (Classical / Semi-Classical)</option>
            <option value="DRAMA">Theatrical Skit / Drama (Natakam)</option>
            <option value="INSTRUMENTAL">Instrumental (Veena, Mridangam, Flute)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Duration (Minutes, max 10) *</label>
          <input
            type="number"
            min={1}
            max={10}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 5)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Coordinator Name *</label>
          <input
            type="text"
            required
            placeholder="Dance Guru / Group Lead"
            value={coordinatorName}
            onChange={(e) => setCoordinatorName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Coordinator Email *</label>
          <input
            type="email"
            required
            placeholder="coordinator@gmail.com"
            value={coordinatorEmail}
            onChange={(e) => setCoordinatorEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold mb-1">Audio Track Drive/Cloud URL (Optional)</label>
          <input
            type="url"
            placeholder="https://drive.google.com/... (Shareable MP3/WAV)"
            value={audioFileUrl}
            onChange={(e) => setAudioFileUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
          />
        </div>
      </div>

      {/* Participants Roster */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white uppercase text-xs">Performers Roster</span>
          <button
            type="button"
            onClick={addParticipant}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Performer</span>
          </button>
        </div>

        <div className="space-y-2">
          {participants.map((p, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Performer Name"
                value={p.fullName}
                onChange={(e) => updateParticipant(idx, 'fullName', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white"
              />
              <select
                value={p.ageGroup}
                onChange={(e) => updateParticipant(idx, 'ageGroup', e.target.value)}
                className="w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white"
              >
                <option value="KIDS">Kids (Under 12)</option>
                <option value="TEENS">Teens (13–18)</option>
                <option value="ADULTS">Adults (18+)</option>
              </select>
              <button
                type="button"
                onClick={() => removeParticipant(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
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
        className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting Application...' : 'Submit Performance for Review'}
      </button>
    </form>
  );
}
