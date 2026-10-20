import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeartHandshake, Clock, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { formatUtahDate } from '@/lib/utils';
import { VolunteerFormClient } from './VolunteerFormClient';

export const revalidate = 0;

export const metadata = {
  title: 'Volunteer Coordination & Service — Utah Telugu Association',
  description: 'Join Utah Telugu Association volunteer teams. Certified Presidential Volunteer Service Award (PVSA) community hours for youth.',
};

export default async function VolunteerPage() {
  const shifts = await prisma.volunteerShift.findMany({
    include: {
      event: { select: { title: true, slug: true } },
      assignments: true,
    },
    orderBy: { startTime: 'asc' },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>COMMUNITY SERVICE & LEADERSHIP HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Volunteer with Utah Telugu Association
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-purple-200">
          సేవయే సమాజ హితం — తోటి తెలుగు కుటుంబాలకు అండగా నిలుద్దాం
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Every grand festival, cricket league, and cultural banquet is made possible by selfless community volunteers. High school youth earn certified PVSA service hours.
        </p>
      </div>

      {/* Volunteer Benefits / Youth Recognition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-sm">Certified Youth Service Hours</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            UTA is a certifying organization for the US Presidential Volunteer Service Award (PVSA). Official certificates granted for college applications.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-sm">Executive Mentorship</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Work alongside experienced Utah Telugu engineers, healthcare executives, and entrepreneurs on committee planning teams.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-sm">VIP Festival Passes</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Volunteers receive commemorative Utah Telugu volunteer apparel, complimentary festival meals, and annual appreciation certificates.
          </p>
        </div>
      </div>

      {/* Upcoming Shifts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-bold text-white font-display">Active Volunteer Shifts</h2>
          <span className="text-xs text-slate-400">{shifts.length} Open Opportunities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shifts.map((shift) => (
            <div key={shift.id} className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                  {shift.event.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {shift.assignments.length} / {shift.capacity} spots filled
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{shift.shiftName}</h3>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{formatUtahDate(shift.startTime, 'long')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {formatUtahDate(shift.startTime, 'time')} – {formatUtahDate(shift.endTime, 'time')} MDT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/30 space-y-6">
        <h2 className="text-xl font-bold text-white font-display">
          Volunteer Registration Form
        </h2>
        <VolunteerFormClient shifts={shifts} />
      </div>
    </div>
  );
}
