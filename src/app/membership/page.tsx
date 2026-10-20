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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 text-[var(--text-primary)]">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4bb59]/15 border border-[var(--border-card)] text-[#ffd18a] text-xs font-bold tracking-wide uppercase">
          <span>Association Membership Center • 501(c)(3)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          Utah Telugu Family Membership
        </h1>
        <p className="text-base sm:text-lg text-[#ffcb75] font-telugu font-semibold">
          మీ కుటుంబ సభ్యత్వాన్ని నమోదు చేసుకోండి — ప్రత్యేక ప్రయోజనాలు పొందండి
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          UTA membership brings your family free festival admissions, youth cultural participation, verified digital membership QR cards, and active voting rights.
        </p>
      </div>

      {/* Action Shortcut Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/membership/join"
          className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] hover:border-[#f4bb59] bg-[#09222c]/90 shadow-xl transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#f4bb59]/20 text-[var(--accent-gold)] group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-serif">Join UTA / New Family</h3>
              <p className="text-[11px] text-[var(--text-secondary)]/80">Immediate digital pass</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#ffd18a] flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform">
            <span>Enroll Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/membership/renew"
          className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] hover:border-[#34d399] bg-[#09222c]/90 shadow-xl transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-[#34d399] group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5 text-[#34d399]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-serif">Renew Membership</h3>
              <p className="text-[11px] text-[var(--text-secondary)]/80">Keep benefits active</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#34d399] flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform">
            <span>Renew Dues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/membership/verify"
          className="glass-panel p-5 rounded-2xl border border-[var(--border-card)] hover:border-[#38bdf8] bg-[#09222c]/90 shadow-xl transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-sky-600/20 text-[#38bdf8] group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5 text-[#38bdf8]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-serif">Verify Member Pass</h3>
              <p className="text-[11px] text-[var(--text-secondary)]/80">Instant validity scan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#38bdf8] flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform">
            <span>Lookup Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Membership Plans Comparison Cards */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-black text-white font-serif text-center">
          Configurable Membership Tiers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => {
            const isFamily = p.code === 'FAMILY_ANNUAL';

            return (
              <div
                key={p.id}
                className={`glass-panel rounded-2xl p-6 border flex flex-col justify-between transition-all hover:-translate-y-1 bg-gradient-to-b from-[#09222c] to-[#071a20] shadow-xl ${
                  isFamily
                    ? 'border-[#f4bb59] ring-2 ring-[#f4bb59]/30 shadow-2xl'
                    : 'border-[#f4bb59]/20 hover:border-[#f4bb59]/60'
                }`}
              >
                <div className="space-y-4">
                  {isFamily && (
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] text-[#071a20] font-bold shadow-sm">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-lg font-serif">{p.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{p.description}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-3xl font-black text-gradient-gold font-display">
                      {formatCurrency(p.price)}
                    </span>
                    <span className="text-xs text-[#d8c8b4]">
                      {p.code === 'LIFE_MEMBERSHIP' ? ' / one-time' : ' / year'}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-[#ffd18a] px-2 py-0.5 rounded bg-[#f4bb59]/15 border border-[var(--border-card)]">
                    Covers up to {p.maxFamilyMembers} family {p.maxFamilyMembers > 1 ? 'members' : 'member'}
                  </span>

                  {/* Benefits */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    {p.benefits.map((b) => (
                      <div key={b.id} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0 mt-0.5" />
                        <span className="font-medium">{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/membership/join?plan=${p.code}`}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                      isFamily
                        ? 'bg-gradient-to-r from-[#f4bb59] to-[#ffd18a] hover:brightness-110 text-[#071a20]'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-[#f4bb59]'
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
