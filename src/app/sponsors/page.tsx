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
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Sponsor Gallery & Recognition
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Corporate & Community Partners
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-telugu text-amber-200">
          మా శ్రేయోభిలాషులు & సహాయ సహకారాలు అందించిన సంస్థలు
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          We express our heartfelt gratitude to the local businesses, healthcare providers, and technology firms supporting the Utah Telugu Association.
        </p>
      </div>

      {/* Tiers & Sponsors */}
      <div className="space-y-10">
        {tiers.map((tier) => (
          <div key={tier.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-display">{tier.name}</h2>
                  <span className="text-xs text-amber-400 font-semibold">
                    Starting at {formatCurrency(tier.minAmount)}
                  </span>
                </div>
              </div>
            </div>

            {tier.sponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tier.sponsors.map((sp) => (
                  <div
                    key={sp.id}
                    className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-colors space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-amber-300 font-mono">
                          {sp.sponsorshipPeriod}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{sp.name}</h3>
                      <p className="text-xs text-slate-400">Representative: {sp.contactPerson}</p>
                    </div>

                    {sp.websiteUrl && (
                      <div className="pt-3 border-t border-white/5">
                        <a
                          href={sp.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
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
              <p className="text-xs text-slate-500 italic">Opportunities available for {tier.name}.</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl glass-panel-gold border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white font-display">
            Partner with Utah’s Largest Telugu Organization
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Showcase your brand to over 2,500 Utah Telugu professionals, physicians, engineers, and families at our signature 2027 festivals.
          </p>
        </div>

        <Link
          href="/become-a-sponsor"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 whitespace-nowrap flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Become a Sponsor</span>
        </Link>
      </div>
    </div>
  );
}
