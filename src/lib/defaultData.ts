// Utah Telugu Association (UTA) Default In-Memory Resilient Data Store
// Automatically synchronized with src/lib/canonicalContent.ts as the authoritative source.

import {
  CANONICAL_EVENTS,
  CANONICAL_MEMBERSHIP_PLANS,
  CANONICAL_VENUES,
} from './canonicalContent';

export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-cultural',
    name: 'CULTURAL',
    label: 'Cultural Festivals',
    description: 'Traditional Telugu festivals & theatrical arts',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'cat-sports',
    name: 'SPORTS',
    label: 'Sports Tournaments',
    description: 'Cricket, Volleyball, Pickleball, Tennikoit championships',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'cat-community',
    name: 'COMMUNITY',
    label: 'Community Gatherings',
    description: 'Picnics, language classes, youth camps & workshops',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

export const DEFAULT_VENUES = Object.values(CANONICAL_VENUES).map((v) => ({
  ...v,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}));

export const DEFAULT_SPORTS = [
  {
    id: 'sport-cricket',
    name: 'CRICKET',
    label: 'Cricket',
    scoringType: 'RUNS_WICKETS_OVERS',
    iconName: 'Activity',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'sport-volleyball',
    name: 'VOLLEYBALL',
    label: 'Volleyball',
    scoringType: 'SETS_POINTS',
    iconName: 'Shield',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'sport-pickleball',
    name: 'PICKLEBALL',
    label: 'Pickleball',
    scoringType: 'GAMES_POINTS',
    iconName: 'Trophy',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

export const DEFAULT_TOURNAMENTS = [
  {
    id: 'tourn-wasatch-cricket-2027',
    slug: 'uta-cricket-trophy-2027',
    sportId: 'sport-cricket',
    title: 'UTA Wasatch Cricket Cup 2027',
    description:
      'Premier T10 leather ball championship between Utah Telugu community clubs across Salt Lake & Utah Valley.',
    format: 'GROUP_STAGE_PLAYOFFS',
    status: 'ONGOING',
    startDate: new Date('2027-04-10T09:00:00-06:00'),
    endDate: new Date('2027-04-25T18:00:00-06:00'),
    venueName: CANONICAL_VENUES.jordan_river.name,
    rulesText:
      '10 overs per side. Max 2 overs per bowler. Powerplay 3 overs. ICC T20 standard rules apply.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    sport: DEFAULT_SPORTS[0],
    divisions: [
      {
        id: 'div-open',
        name: "Men's Open Division",
        maxTeams: 8,
        teamFee: 150.0,
      },
    ],
    teams: [
      {
        id: 'team-warriors',
        tournamentId: 'tourn-wasatch-cricket-2027',
        teamName: 'Wasatch Warriors CC',
        captainName: 'Vikram Reddy',
        captainEmail: 'vikram.reddy@gmail.com',
        captainPhone: '(801) 555-7111',
        seedNumber: 1,
        members: [
          { id: 'm1', fullName: 'Vikram Reddy', isCaptain: true, jerseyNum: 7 },
          { id: 'm2', fullName: 'Kalyan Varma', isCaptain: false, jerseyNum: 18 },
          { id: 'm3', fullName: 'Ramesh Babu', isCaptain: false, jerseyNum: 45 },
          { id: 'm4', fullName: 'Aditya Ch', isCaptain: false, jerseyNum: 99 },
        ],
      },
      {
        id: 'team-strikers',
        tournamentId: 'tourn-wasatch-cricket-2027',
        teamName: 'Salt Lake Strikers',
        captainName: 'Anil Kumar',
        captainEmail: 'anil.k@gmail.com',
        captainPhone: '(801) 555-7222',
        seedNumber: 2,
        members: [
          { id: 'm5', fullName: 'Anil Kumar', isCaptain: true, jerseyNum: 10 },
          { id: 'm6', fullName: 'Deepak Rao', isCaptain: false, jerseyNum: 12 },
          { id: 'm7', fullName: 'Sandeep V', isCaptain: false, jerseyNum: 24 },
          { id: 'm8', fullName: 'Srikanth M', isCaptain: false, jerseyNum: 33 },
        ],
      },
    ],
    rounds: [
      {
        id: 'round-semi',
        roundNumber: 1,
        roundName: 'Semi-Finals',
        matches: [
          {
            id: 'match-1',
            matchNumber: 1,
            courtOrPitch: 'Pitch 1 (North Ground)',
            scheduledTime: new Date('2027-04-18T10:00:00-06:00'),
            status: 'LIVE',
            team1Id: 'team-warriors',
            team2Id: 'team-strikers',
            team1: { id: 'team-warriors', teamName: 'Wasatch Warriors CC' },
            team2: { id: 'team-strikers', teamName: 'Salt Lake Strikers' },
            scoreTeam1: '118/4 (10.0 ov)',
            scoreTeam2: '94/6 (8.2 ov)',
            winnerTeamId: null,
            umpireName: 'Prasad N (ACUI Certified)',
            notes: 'Salt Lake Strikers need 25 runs from 10 balls.',
          },
        ],
      },
    ],
    standings: [
      {
        id: 'std-1',
        teamId: 'team-warriors',
        team: { id: 'team-warriors', teamName: 'Wasatch Warriors CC' },
        played: 3,
        won: 3,
        lost: 0,
        points: 6,
        netRunRate: 1.84,
      },
      {
        id: 'std-2',
        teamId: 'team-strikers',
        team: { id: 'team-strikers', teamName: 'Salt Lake Strikers' },
        played: 3,
        won: 2,
        lost: 1,
        points: 4,
        netRunRate: 0.62,
      },
    ],
  },
  {
    id: 'tourn-volleyball-2027',
    slug: 'uta-volleyball-smash-2027',
    sportId: 'sport-volleyball',
    title: 'Walkers Indoor Volleyball Championship 2027',
    description: 'Annual indoor 6v6 volleyball championship with high-octane community matches.',
    format: 'SINGLE_ELIMINATION',
    status: 'UPCOMING',
    startDate: new Date('2027-01-17T08:00:00-07:00'),
    endDate: new Date('2027-01-17T20:00:00-07:00'),
    venueName: CANONICAL_VENUES.mountain_sports.name,
    rulesText: 'Standard USA Volleyball rules. Best of 3 sets to 25. Deciding 3rd set to 15.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    sport: DEFAULT_SPORTS[1],
    divisions: [],
    teams: [],
    rounds: [],
    standings: [],
  },
  {
    id: 'tourn-pickleball-2027',
    slug: 'uta-pickleball-open-2027',
    sportId: 'sport-pickleball',
    title: 'Desi Pickleball League (DPL) Wasatch Championship 2027',
    description: 'Men, Women, and Mixed Doubles community pickleball showdown at Salt Lake Tennis & Health Club.',
    format: 'ROUND_ROBIN',
    status: 'UPCOMING',
    startDate: new Date('2027-01-16T08:00:00-07:00'),
    endDate: new Date('2027-01-16T18:00:00-07:00'),
    venueName: CANONICAL_VENUES.salt_lake_tennis.name,
    rulesText: 'USA Pickleball guidelines. Pool games to 11 win by 2.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    sport: DEFAULT_SPORTS[2],
    divisions: [],
    teams: [],
    rounds: [],
    standings: [],
  },
];

export const DEFAULT_EVENTS = CANONICAL_EVENTS.map((e) => {
  const cat =
    e.category === 'CULTURAL'
      ? DEFAULT_CATEGORIES[0]
      : e.category === 'SPORTS'
      ? DEFAULT_CATEGORIES[1]
      : DEFAULT_CATEGORIES[2];

  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    coverImageUrl: e.coverImageUrl,
    startDateTime: new Date(e.startDateTime),
    endDateTime: new Date(e.endDateTime),
    timezone: e.timezone,
    registrationOpenDate: new Date(e.registrationOpenDate),
    registrationCloseDate: new Date(e.registrationCloseDate),
    totalCapacity: e.totalCapacity,
    isPublished: e.isPublished,
    isFeatured: e.isFeatured,
    membersOnly: false,
    refundPolicy: 'Cancellations eligible for refund up to 72 hours prior to festival opening.',
    zeffyCampaignUrl: `https://www.zeffy.com/ticketing/${e.slug}`,
    categoryId: cat.id,
    venueId: e.venueId,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    category: cat,
    venue: {
      id: e.venueId,
      name: e.venueName,
      address: e.venueAddress.split(',')[0],
      city: 'Salt Lake County',
      state: 'UT',
    },
    ticketTypes: e.ticketTiers.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.priceGuest,
      capacity: t.capacityLimit || 300,
    })),
  };
});

export const DEFAULT_MEMBERSHIP_PLANS = CANONICAL_MEMBERSHIP_PLANS.map((p) => ({
  id: p.id,
  code: p.code,
  name: p.name,
  description: p.description,
  price: p.price,
  durationMonths: p.durationMonths,
  maxFamilyMembers: p.maxFamilyMembers,
  isActive: true,
  isPublic: p.isPublic,
  benefitsSummary: p.benefitsSummary,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  benefits: p.benefits.map((b, idx) => ({
    id: `b-${p.id}-${idx}`,
    planId: p.id,
    title: b,
    description: null,
  })),
}));

export const DEFAULT_SPONSORS = [
  {
    id: 'sp-1',
    name: 'Bawarchi Biryanis Salt Lake',
    tierName: 'PLATINUM',
    logoUrl: '/images/sponsors/bawarchi.png',
    websiteUrl: 'https://bawarchislc.com',
    contributionAmount: 2500,
    isActive: true,
    tier: { id: 'tier-plat', name: 'Platinum Grand Sponsor', badgeColor: '#f4bb59' },
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'sp-2',
    name: 'Saffron Valley Indian Restaurants',
    tierName: 'GOLD',
    logoUrl: '/images/sponsors/saffron.png',
    websiteUrl: 'https://saffronvalley.com',
    contributionAmount: 1500,
    isActive: true,
    tier: { id: 'tier-gold', name: 'Gold Partner', badgeColor: '#e5c07b' },
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'sp-3',
    name: 'Desi Bites Groceries & Eatery',
    tierName: 'SILVER',
    logoUrl: '/images/sponsors/desibites.png',
    websiteUrl: 'https://desibites.com',
    contributionAmount: 750,
    isActive: true,
    tier: { id: 'tier-silver', name: 'Silver Associate', badgeColor: '#98c379' },
    createdAt: new Date('2026-01-01'),
  },
];

export const DEFAULT_BUDGETS = [
  { id: 'b-1', category: 'CULTURAL_EVENTS', allocated: 25000, spent: 18450, fiscalYear: '2026-2027' },
  { id: 'b-2', category: 'SPORTS_LEAGUES', allocated: 8000, spent: 4200, fiscalYear: '2026-2027' },
  { id: 'b-3', category: 'COMMUNITY_OUTREACH', allocated: 5000, spent: 3100, fiscalYear: '2026-2027' },
];

export const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Sankranthi 2027 Rangoli & Cultural Registrations Are Now Live!',
    slug: 'sankranthi-2027-registrations-open',
    content:
      'Calling all Utah Telugu artists, dancers, and families! Stage performance submissions and Rangoli contest spots are filling up fast.',
    priority: 'HIGH',
    isPublished: true,
    publishedAt: new Date('2026-10-01'),
    createdAt: new Date('2026-10-01'),
  },
  {
    id: 'ann-2',
    title: 'Utah Wasatch Cricket Cup 2027 Team Captains Meeting',
    slug: 'cricket-cup-2027-captains-meet',
    content:
      'Team managers and captains will meet virtually on April 1st to finalize pool brackets and match timings.',
    priority: 'NORMAL',
    isPublished: true,
    publishedAt: new Date('2026-10-15'),
    createdAt: new Date('2026-10-15'),
  },
];

export const DEFAULT_VOLUNTEERS = [
  {
    id: 'vol-1',
    fullName: 'Ravi Teja Varma',
    email: 'ravi.varma@gmail.com',
    phone: '(801) 555-4411',
    skills: 'Stage Lighting, Audio Engineering',
    status: 'ACTIVE',
    hoursLogged: 24,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'vol-2',
    fullName: 'Sravani Parasa',
    email: 'sravani.parasa@gmail.com',
    phone: '(801) 555-4422',
    skills: 'Food Catering Coordination, Guest Check-In',
    status: 'ACTIVE',
    hoursLogged: 36,
    createdAt: new Date('2026-01-01'),
  },
];

export const DEFAULT_DONATIONS = [
  {
    id: 'don-1',
    donorName: 'Anonymous Patron',
    amount: 500,
    fundCategory: 'TEMPLE_CULTURAL_FUND',
    paymentMethod: 'ZEFFY',
    createdAt: new Date('2026-10-05'),
  },
  {
    id: 'don-2',
    donorName: 'Kalyan Chakravarthy',
    amount: 250,
    fundCategory: 'YOUTH_SPORTS_INITIATIVE',
    paymentMethod: 'ZEFFY',
    createdAt: new Date('2026-10-10'),
  },
];

export const DEFAULT_MEDIA = [
  {
    id: 'med-1',
    title: 'Sankranthi 2026 Stage Highlights',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    type: 'IMAGE',
    category: 'SANKRANTHI',
    createdAt: new Date('2026-01-20'),
  },
];

export const DEFAULT_GOVERNANCE = [
  {
    id: 'gov-1',
    title: 'Establishment of Wasatch Telugu Youth Athletic Endowment',
    proposer: 'Executive Board',
    status: 'APPROVED',
    votesFor: 42,
    votesAgainst: 1,
    createdAt: new Date('2026-08-15'),
  },
];
