import React from 'react';
import { ShieldCheck, Lock, Eye, Users } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Child Safeguards — Utah Telugu Association',
  description: 'Data protection policies, family privacy, child photography safeguards, and 501(c)(3) privacy compliance.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Trust & Compliance
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026 • Utah Telugu Association</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">1. Our Commitment to Family Privacy</h2>
          <p>
            The Utah Telugu Association (UTA) respects the privacy of our member families, donors, performers, and website visitors. We operate on principles of data minimization: we collect only information necessary to provide membership benefits, issue cryptographically signed admission tickets, and administer community programs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">2. Protection of Children & Family Information</h2>
          <p>
            UTA takes extraordinary care regarding minor children participating in cultural dances, Telugu Badi classes, and youth sports. We never sell, rent, or publicly disclose children’s birthdates, school records, or private contact details. Photographs and video highlights taken during public cultural festivals are published in association archives only in accordance with community guidelines; families may request immediate removal of any photograph by contacting privacy@utahtelugu.org.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">3. Payment & Financial Data Security</h2>
          <p>
            UTA does NOT store, process, or transmit raw credit card numbers or banking passwords on association servers. All payment transactions for membership dues, donations, and event tickets are routed directly through PCI-DSS Level 1 compliant gateways (including Zeffy and Stripe).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">4. Digital QR Codes & Verification</h2>
          <p>
            QR codes embedded on UTA Digital Membership Passes and Event Admission Tickets encode opaque, signed cryptographic tokens rather than unencrypted personal identification data, protecting members from unauthorized snooping during on-site gate check-ins.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-display">5. Data Retention & Right to Erasure</h2>
          <p>
            Members may request an export of their association records or request account deletion at any time by writing to the General Secretary at secretary@utahtelugu.org.
          </p>
        </section>
      </div>
    </div>
  );
}
