import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeartHandshake, Clock, Award, Users } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminVolunteersPage() {
  const [volunteers, shifts] = await Promise.all([
    prisma.volunteer.findMany({
      include: { assignments: true },
      orderBy: { hoursLogged: 'desc' },
    }),
    prisma.volunteerShift.findMany({
      include: {
        event: true,
        assignments: { include: { volunteer: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Volunteer Coordination & Service Tracking
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {volunteers.length} registered volunteers • Shift schedules & certified service hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {volunteers.map((vol) => (
          <div key={vol.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">{vol.fullName}</h3>
              <span className="font-mono text-xs font-bold text-purple-400">
                {vol.hoursLogged} Hours
              </span>
            </div>
            <p className="text-xs text-slate-400">{vol.email} • {vol.phone || 'No phone'}</p>
            {vol.interests && (
              <p className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-lg">
                Interests: {vol.interests}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
