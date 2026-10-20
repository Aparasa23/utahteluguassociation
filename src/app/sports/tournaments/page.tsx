import React from 'react';
import SportsOverviewPage from '../page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Championship Tournaments — Utah Telugu Association',
  description: 'Official sports tournaments, schedules, brackets, and standings for cricket, volleyball, and pickleball.',
};

export default function TournamentsPage() {
  return <SportsOverviewPage />;
}
