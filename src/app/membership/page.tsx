import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Users, QrCode, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function MembershipOverviewPage() {
  const plans = await prisma.membershipPlan.findMany({
    where: { isActive: true },
    include: { benefits: true },
    orderBy: { price: 'asc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Association Membership Center
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Utah Telugu Family Membership
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          మీ కుటుంబ సభ్యత్వాన్ని నమోదు చేసుకోండి — ప్రత్యేక ప్రయోజనాలు పొందండి
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          UTA membership brings your family free festival admissions, youth cultural participation, verified digital membership QR cards, and active voting rights.
        </p>
      </div>

      {/* Action Shortcut Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/membership/join"
          className="glass-panel p-5 rounded-2xl border border-amber-400/30 hover:border-amber-400 bg-amber-500/5 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Join UTA / New Family</h3>
              <p className="text-[11px] text-slate-400">Immediate digital pass</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-2">
            <span>Enroll Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/membership/renew"
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Renew Membership</h3>
              <p className="text-[11px] text-slate-400">Keep benefits active</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-2">
            <span>Renew Dues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/membership/verify"
          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-sky-400/40 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Verify Member Pass</h3>
              <p className="text-[11px] text-slate-400">Instant validity scan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-sky-400 flex items-center gap-1 mt-2">
            <span>Lookup Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Membership Plans Comparison Cards */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-white font-display text-center">
          Configurable Membership Tiers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => {
            const isFamily = p.code === 'FAMILY_ANNUAL';

            return (
              <div
                key={p.id}
                className={`glass-panel rounded-2xl p-6 border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                  isFamily
                    ? 'border-amber-400/60 bg-amber-500/5 shadow-xl shadow-amber-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-4">
                  {isFamily && (
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-lg">{p.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-3xl font-extrabold text-white font-display">
                      {formatCurrency(p.price)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {p.code === 'LIFE_MEMBERSHIP' ? ' / one-time' : ' / year'}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-semibold text-amber-300 px-2 py-0.5 rounded bg-black/40">
                    Covers up to {p.maxFamilyMembers} family {p.maxFamilyMembers > 1 ? 'members' : 'member'}
                  </span>

                  {/* Benefits */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    {p.benefits.map((b) => (
                      <div key={b.id} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/membership/join?plan=${p.code}`}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isFamily
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    <span>Choose Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
