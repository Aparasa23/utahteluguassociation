import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use & Association Bylaws — Utah Telugu Association',
  description: 'Terms of service, membership rights, event code of conduct, and refund policies of Utah Telugu Association.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-xs sm:text-sm text-[#4a382c] leading-relaxed">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
          Association Bylaws & Terms
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1c140e] font-display">
          Terms of Use & Membership Rules
        </h1>
        <p className="text-xs text-[#705544]">Utah Telugu Association (UTA) • 501(c)(3) Non-Profit</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-900/15 bg-white/95 shadow-sm space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#1c140e] font-display">1. Membership Eligibility & Verification</h2>
          <p>
            Membership in the Utah Telugu Association is open to all individuals and families residing in the state of Utah who appreciate Telugu language, culture, and community service. Family memberships cover primary member, spouse, and eligible dependent children. All membership cards and QR verification codes are non-transferable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#1c140e] font-display">2. Event Admission & Ticketing Policies</h2>
          <p>
            Event registration guarantees entry up to the fire marshal room capacity of the reserved facility. Registered attendees must present their digital QR pass at check-in. Duplicate scans of previously checked-in passes will be flagged by our gate system.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#1c140e] font-display">3. Community Code of Conduct</h2>
          <p>
            UTA community gatherings celebrate inclusivity, cultural pride, and respect. Harassment, disruptive conduct, or unauthorized commercial solicitation during association events will result in revocation of admission and review by the Executive Committee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#1c140e] font-display">4. Refund & Cancellation Terms</h2>
          <p>
            Paid event tickets are refundable up to 7 days prior to event start date unless specified otherwise in specific tournament or stage contracts. Annual membership dues are non-refundable charitable contributions.
          </p>
        </section>
      </div>
    </div>
  );
}
