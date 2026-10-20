import React from 'react';
import MembershipOverviewPage from '../page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Membership Plans & Pricing — Utah Telugu Association',
  description: 'Compare Individual, Family, Patron Life, and Student/Senior UTA membership dues.',
};

export default function PlansPage() {
  return <MembershipOverviewPage />;
}
