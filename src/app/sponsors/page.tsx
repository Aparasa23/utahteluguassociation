import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Award, ExternalLink, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export const metadata = {
  title: 'Community Sponsors & Corporate Partners — Utah Telugu Association',
  description: 'Recognizing our Title, Platinum, and Gold partners empowering Utah Telugu cultural heritage and community programs.',
};

export default async function SponsorsDirectoryPage() {
  const tiers = await prisma.sponsorTier.findMany({
    include: {
      sponsors: {
        where: { isActive: true },
        include: {
          sponsorships: {
            include: { event: true },
          },
        },
      },
    },
    orderBy: { rank: 'asc' },
  }).catch(() => []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--border-card)] text-[var(--accent-gold)] text-xs font-bold uppercase tracking-wider">
          <span>Sponsor Recognition • 501(c)(3)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Corporate & Community Partners
        </h1>
        <p className="text-base sm:text-lg text-[#ffcb75] font-telugu font-semibold">
          మా శ్రేయోభిలాషులు & సహాయ సహకారాలు అందించిన సంస్థలు
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto font-normal">
          We express our heartfelt gratitude to the local businesses, healthcare providers, and technology firms supporting the Utah Telugu Association.
        </p>
      </div>

      {/* Tiers & Sponsors */}
      <div className="space-y-10">
        {tiers.map((tier) => (
          <div key={tier.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f4bb59]/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f4bb59]/15 text-[var(--accent-gold)] flex items-center justify-center font-bold text-xs border border-[var(--border-card)]">
                  <Award className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-display">{tier.name}</h2>
                  <span className="text-xs text-[var(--accent-gold)] font-semibold font-mono">
                    Starting at {formatCurrency(tier.minAmount)}
                  </span>
                </div>
              </div>
            </div>

            {tier.sponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tier.sponsors.map((sp) => (
                  <div
                    key={sp.id}
                    className="glass-panel p-6 rounded-2xl border border-[var(--border-card)] bg-[#09222c]/90 shadow-xl flex flex-col justify-between hover:border-[#f4bb59]/50 hover:shadow-2xl transition-all space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#f4bb59]/15 text-[var(--accent-gold)] font-mono font-bold border border-[var(--border-card)]">
                          {sp.sponsorshipPeriod}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white font-display">{sp.name}</h3>
                      <p className="text-xs text-[#a5c2cb]">Representative: {sp.contactPerson}</p>
                    </div>

                    {sp.websiteUrl && (
                      <div className="pt-3 border-t border-[#f4bb59]/15">
                        <a
                          href={sp.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-gold)] hover:underline"
                        >
                          <span>Visit Partner Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#a5c2cb] italic">Opportunities available for {tier.name}.</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-[#09222c]/95 border border-[var(--border-card)] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white font-display">
            Partner with Utah’s Largest Telugu Organization
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl font-normal">
            Showcase your brand to over 2,500 Utah Telugu professionals, physicians, engineers, and families at our signature 2027 festivals.
          </p>
        </div>

        <Link
          href="/become-a-sponsor"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f4bb59] to-[#d8972b] hover:brightness-110 text-[#071a20] font-extrabold text-xs shadow-xl whitespace-nowrap flex items-center gap-2 shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#071a20]" />
          <span>Become a Sponsor</span>
        </Link>
      </div>
    </div>
  );
}
