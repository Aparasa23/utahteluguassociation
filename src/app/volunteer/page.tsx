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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border border-[var(--border-card)] text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>COMMUNITY SERVICE & LEADERSHIP HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Volunteer with Utah Telugu Association
        </h1>
        <p className="text-base sm:text-lg text-[#ffcb75] font-telugu font-semibold">
          సేవయే సమాజ హితం — తోటి తెలుగు కుటుంబాలకు అండగా నిలుద్దాం
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto font-normal">
          Every grand festival, cricket league, and cultural banquet is made possible by selfless community volunteers. High school youth earn certified PVSA service hours.
        </p>
      </div>

      {/* Volunteer Benefits / Youth Recognition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold border border-purple-500/30">
            <Award className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="font-bold text-white text-sm font-display">Certified Youth Service Hours</h3>
          <p className="text-xs text-[#a5c2cb] leading-relaxed font-normal">
            UTA is a certifying organization for the US Presidential Volunteer Service Award (PVSA). Official certificates granted for college applications.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#f4bb59]/20 text-[var(--accent-gold)] flex items-center justify-center font-bold border border-[var(--border-card)]">
            <HeartHandshake className="w-4 h-4 text-[var(--accent-gold)]" />
          </div>
          <h3 className="font-bold text-white text-sm font-display">Executive Mentorship</h3>
          <p className="text-xs text-[#a5c2cb] leading-relaxed font-normal">
            Work alongside experienced Utah Telugu engineers, healthcare executives, and entrepreneurs on committee planning teams.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          </div>
          <h3 className="font-bold text-white text-sm font-display">VIP Festival Passes</h3>
          <p className="text-xs text-[#a5c2cb] leading-relaxed font-normal">
            Volunteers receive commemorative Utah Telugu volunteer apparel, complimentary festival meals, and annual appreciation certificates.
          </p>
        </div>
      </div>

      {/* Upcoming Shifts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#f4bb59]/20 pb-3">
          <h2 className="text-xl font-bold text-white font-display">Active Volunteer Shifts</h2>
          <span className="text-xs font-semibold text-[var(--accent-gold)]">{shifts.length} Open Opportunities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shifts.map((shift) => (
            <div key={shift.id} className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#071a20] bg-[#f4bb59] px-2 py-0.5 rounded font-bold">
                  {shift.event.title}
                </span>
                <span className="text-xs text-[#a5c2cb] font-mono font-medium">
                  {shift.assignments.length} / {shift.capacity} spots filled
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-display">{shift.shiftName}</h3>

              <div className="space-y-1 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span className="font-medium">{formatUtahDate(shift.startTime, 'long')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ffcb75]" />
                  <span className="font-medium">
                    {formatUtahDate(shift.startTime, 'time')} – {formatUtahDate(shift.endTime, 'time')} MDT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-card)] bg-[#09222c]/95 shadow-2xl space-y-6">
        <h2 className="text-xl font-bold text-white font-display">
          Volunteer Registration Form
        </h2>
        <VolunteerFormClient shifts={shifts} />
      </div>
    </div>
  );
}
