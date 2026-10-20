import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeartHandshake, Award, Clock, Calendar } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';

export const revalidate = 0;

export default async function MemberVolunteeringPage() {
  const volunteer = await prisma.volunteer.findFirst({
    where: { email: 'member@utahtelugu.org' },
    include: {
      assignments: {
        include: {
          shift: {
            include: { event: true },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c140e] font-display">
            Volunteer Service & Hours
          </h1>
          <p className="text-xs text-[#705544] mt-0.5">
            Track your verified community service hours for PVSA awards and corporate matching.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold">
          <Award className="w-4 h-4 text-purple-700" />
          <span>{volunteer?.hoursLogged || 16.5} Hours Logged</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#1c140e]">Upcoming & Completed Shifts</h2>
        {volunteer?.assignments.map((a) => (
          <div
            key={a.id}
            className="glass-panel p-5 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 px-2 py-0.5 rounded bg-amber-100 border border-amber-300">
                {a.shift.event.title}
              </span>
              <h3 className="text-base font-bold text-[#1c140e]">{a.shift.shiftName}</h3>
              <p className="text-xs text-[#5a483a]">
                {formatUtahDate(a.shift.startTime, 'long')}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase">
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
