import React from 'react';
import { Mail, Phone, ShieldCheck, Award } from 'lucide-react';

export const metadata = {
  title: 'Executive Leadership — Utah Telugu Association',
  description: 'Meet the Executive Committee and Board of Trustees serving the Utah Telugu Association.',
};

export default function LeadershipPage() {
  const executiveCommittee = [
    {
      name: 'Rao Parasa',
      title: 'President',
      teluguTitle: 'అధ్యక్షులు',
      term: '2026–2028',
      email: 'president@utahtelugu.org',
      bio: 'Serving the Utah community for over 15 years with a passion for Telugu cultural preservation, youth initiatives, and non-profit governance.',
    },
    {
      name: 'Radha Krishna Varma',
      title: 'Vice President & Cultural Chair',
      teluguTitle: 'ఉపాధ్యక్షులు',
      term: '2026–2028',
      email: 'vp@utahtelugu.org',
      bio: 'Leading annual festival productions, stage coordination, and classical dance academy collaborations across Utah.',
    },
    {
      name: 'Lakshmi Narayan',
      title: 'General Secretary',
      teluguTitle: 'ప్రధాన కార్యదర్శి',
      term: '2026–2028',
      email: 'secretary@utahtelugu.org',
      bio: 'Overseeing official communications, member relations, association documentation, and venue management.',
    },
    {
      name: 'Suresh Varma',
      title: 'Treasurer',
      teluguTitle: 'కోశాధికారి',
      term: '2026–2028',
      email: 'treasurer@utahtelugu.org',
      bio: 'Certified CPA overseeing association finances, budget allocations, Zeffy payment reconciliation, and annual reports.',
    },
    {
      name: 'Kalyan Chakravarthy',
      title: 'Sports Committee Chair',
      teluguTitle: 'క్రీడా విభాగ అధ్యక్షులు',
      term: '2026–2028',
      email: 'sports@utahtelugu.org',
      bio: 'Organizer of Utah Wasatch Cricket Cup, volleyball tournaments, and youth athletics development.',
    },
    {
      name: 'Swathi Bharadwaj',
      title: 'Youth & Education Lead',
      teluguTitle: 'యువజన & విద్యా విభాగం',
      term: '2026–2028',
      email: 'youth@utahtelugu.org',
      bio: 'Directing weekend Telugu Badi language classes, youth debate clubs, and community volunteer hours.',
    },
  ];

  const boardOfTrustees = [
    { name: 'Dr. Srinivas Murthy', role: 'Chairman, Board of Trustees', years: 'Salt Lake City, UT' },
    { name: 'Prasad Nallapati', role: 'Trustee & Past President', years: 'Draper, UT' },
    { name: 'Smt. Sailaja Reddy', role: 'Trustee & Cultural Advisor', years: 'South Jordan, UT' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4bb59]/10 text-[#f4bb59] border border-[#f4bb59]/30 text-xs font-bold uppercase tracking-wider">
          <span>Governance & Service</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Executive Committee & Leadership
        </h1>
        <p className="text-xs sm:text-sm text-[#e7d5b8] max-w-xl mx-auto font-normal">
          Dedicated volunteers elected by UTA active member families to govern, organize cultural programs, and steward association operations.
        </p>
      </div>

      {/* Executive Committee Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[#f4bb59]/20 pb-3">
          <ShieldCheck className="w-5 h-5 text-[#f4bb59]" />
          <h2 className="text-xl font-bold text-white font-display">Executive Committee (2026–2028)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executiveCommittee.map((officer, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl hover:border-[#f4bb59]/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f4bb59]/15 text-[#f4bb59] font-bold uppercase border border-[#f4bb59]/30">
                    {officer.term}
                  </span>
                  <span className="text-xs text-[#ffcb75] font-telugu font-semibold">{officer.teluguTitle}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">{officer.name}</h3>
                <p className="text-xs font-bold text-[#f4bb59]">{officer.title}</p>
                <p className="text-xs text-[#a5c2cb] leading-relaxed pt-1">{officer.bio}</p>
              </div>

              <div className="pt-3 border-t border-[#f4bb59]/15 flex items-center gap-2 text-xs text-[#e7d5b8]">
                <Mail className="w-3.5 h-3.5 text-[#f4bb59]" />
                <a href={`mailto:${officer.email}`} className="text-[#f4bb59] hover:underline truncate font-semibold">
                  {officer.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board of Trustees */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 border-b border-[#f4bb59]/20 pb-3">
          <Award className="w-5 h-5 text-[#f4bb59]" />
          <h2 className="text-xl font-bold text-white font-display">Board of Trustees</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boardOfTrustees.map((t, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-[#f4bb59]/25 bg-[#09222c]/90 shadow-xl space-y-1">
              <h3 className="font-bold text-white text-base font-display">{t.name}</h3>
              <p className="text-xs text-[#f4bb59] font-bold">{t.role}</p>
              <p className="text-[11px] text-[#a5c2cb] mt-1">{t.years}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
