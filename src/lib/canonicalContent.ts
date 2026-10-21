// ============================================================================
// Utah Telugu Association (UTA) — Canonical Single Source of Truth
// All public pages, registration engines, member dashboards, and admin views
// MUST consume data from this canonical registry.
// ============================================================================

export interface CanonicalVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  capacity: number;
  mapUrl: string;
}

export interface CanonicalTicketTier {
  id: string;
  name: string;
  description: string;
  priceMember: number; // in USD
  priceGuest: number;  // in USD
  capacityLimit?: number;
}

export interface CanonicalEvent {
  id: string;
  slug: string;
  title: string;
  teluguTitle: string;
  category: 'CULTURAL' | 'SPORTS' | 'COMMUNITY' | 'YOUTH';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  venueId: string;
  venueName: string;
  venueAddress: string;
  startDateTime: string; // ISO 8601 string
  endDateTime: string;   // ISO 8601 string
  displayDate: string;
  displayTime: string;
  timezone: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  coverImageUrl: string;
  isPublished: boolean;
  isFeatured: boolean;
  totalCapacity: number;
  pricingSummary: string;
  rulesText?: string;
  ticketTiers: CanonicalTicketTier[];
  highlights: string[];
}

export interface CanonicalMembershipPlan {
  id: string;
  code: 'FAMILY_ANNUAL' | 'INDIVIDUAL_ANNUAL' | 'LIFE_MEMBERSHIP' | 'STUDENT_ANNUAL';
  name: string;
  teluguName: string;
  price: number;
  durationMonths: number;
  maxFamilyMembers: number;
  description: string;
  benefitsSummary: string;
  benefits: string[];
  isPublic: boolean;
  badge?: string;
}

export interface CanonicalLeadershipMember {
  id: string;
  name: string;
  role: string;
  teluguRole: string;
  term: string;
  email: string;
  bio: string;
  avatarUrl?: string;
}

// ----------------------------------------------------------------------------
// 1. CANONICAL VENUES
// ----------------------------------------------------------------------------
export const CANONICAL_VENUES: Record<string, CanonicalVenue> = {
  herriman_high: {
    id: 'venue-herriman-high',
    name: 'Herriman High School Auditorium & Hall',
    address: '11901 S 6000 W',
    city: 'Herriman',
    state: 'UT',
    zipCode: '84096',
    capacity: 1200,
    mapUrl: 'https://maps.google.com/?q=11901+S+6000+W+Herriman+UT',
  },
  ganesha_temple: {
    id: 'venue-ganesha-temple',
    name: 'Sri Ganesha Hindu Temple Cultural Hall',
    address: '11422 S Redwood Rd',
    city: 'South Jordan',
    state: 'UT',
    zipCode: '84095',
    capacity: 450,
    mapUrl: 'https://maps.google.com/?q=11422+S+Redwood+Rd+South+Jordan+UT',
  },
  salt_lake_tennis: {
    id: 'venue-salt-lake-tennis',
    name: 'Salt Lake Tennis & Health Club',
    address: '2471 S 1700 E',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: '84106',
    capacity: 350,
    mapUrl: 'https://maps.google.com/?q=2471+S+1700+E+Salt+Lake+City+UT',
  },
  mountain_sports: {
    id: 'venue-mountain-sports',
    name: 'Mountain Sports Center',
    address: '9400 S 1300 E',
    city: 'Sandy',
    state: 'UT',
    zipCode: '84094',
    capacity: 500,
    mapUrl: 'https://maps.google.com/?q=9400+S+1300+E+Sandy+UT',
  },
  jordan_river: {
    id: 'venue-jordan-river',
    name: 'Jordan River Parkway Sports Complex',
    address: '10800 S River Front Pkwy',
    city: 'South Jordan',
    state: 'UT',
    zipCode: '84095',
    capacity: 600,
    mapUrl: 'https://maps.google.com/?q=10800+S+River+Front+Pkwy+South+Jordan+UT',
  },
  south_jordan_center: {
    id: 'venue-south-jordan-center',
    name: 'South Jordan Community Center Auditorium',
    address: '10778 S Redwood Rd',
    city: 'South Jordan',
    state: 'UT',
    zipCode: '84095',
    capacity: 750,
    mapUrl: 'https://maps.google.com/?q=10778+S+Redwood+Rd+South+Jordan+UT',
  },
};

// ----------------------------------------------------------------------------
// 2. CANONICAL EVENTS
// ----------------------------------------------------------------------------
export const CANONICAL_EVENTS: CanonicalEvent[] = [
  {
    id: 'evt-sankranthi-main-2027',
    slug: 'sankranthi-sambaralu-2027',
    title: 'UTA Grand Sankranthi Celebrations & Festive Feast 2027',
    teluguTitle: 'సంక్రాంతి సంబరాలు & విందు 2027',
    category: 'CULTURAL',
    categoryLabel: 'Signature Cultural Celebration',
    description:
      'Join the Utah Telugu Association for our flagship celebration of harvest, heritage, and community! Featuring traditional Bhogi Pallu ceremonies for young children, authentic festival lunch and banquet dinner feasts, live classical Kuchipudi, Carnatic recitals, and four hours of high-energy community cultural performances.',
    shortDescription:
      'Flagship harvest celebration featuring traditional feasts, Bhogi Pallu ceremony, and live cultural stage performances.',
    venueId: CANONICAL_VENUES.herriman_high.id,
    venueName: CANONICAL_VENUES.herriman_high.name,
    venueAddress: `${CANONICAL_VENUES.herriman_high.address}, ${CANONICAL_VENUES.herriman_high.city}, UT`,
    startDateTime: '2027-01-23T10:00:00-07:00',
    endDateTime: '2027-01-23T22:00:00-07:00',
    displayDate: 'Saturday, January 23, 2027',
    displayTime: '10:00 AM – 10:00 PM MDT',
    timezone: 'America/Denver',
    registrationOpenDate: '2026-10-01T00:00:00-07:00',
    registrationCloseDate: '2027-01-22T23:59:59-07:00',
    coverImageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: true,
    totalCapacity: 1200,
    pricingSummary: '100% Free VIP Admission for Active Members • $9.99 General Admission for Guests',
    highlights: [
      'Authentic festival lunch and banquet dinner feast included with pass',
      'Traditional Bhogi Pallu blessing ceremony for children under 5',
      'Over 20 live classical, folk, and cinematic dance medleys by local youth',
      'VIP front-row seating for Patron Life Members',
    ],
    ticketTiers: [
      {
        id: 'tt-sankranthi-member',
        name: 'Active Member Family Pass',
        description: 'Complimentary full-day pass for active member household (up to 6 members).',
        priceMember: 0,
        priceGuest: 0,
      },
      {
        id: 'tt-sankranthi-guest',
        name: 'Guest General Admission',
        description: 'Single adult ticket including cultural stage access and festival feast.',
        priceMember: 0,
        priceGuest: 9.99,
      },
      {
        id: 'tt-sankranthi-family-guest',
        name: 'Guest Family Pass (Up to 4)',
        description: 'Complete household admission with dinner buffet for non-member families.',
        priceMember: 0,
        priceGuest: 34.99,
      },
    ],
  },
  {
    id: 'evt-rangoli-2027',
    slug: 'sankranthi-2027-rangoli',
    title: 'Traditional Rangoli Competition (Muggula Poti) 2027',
    teluguTitle: 'ముగ్గుల పోటీలు 2027',
    category: 'CULTURAL',
    categoryLabel: 'Artistic Heritage Contest',
    description:
      'Express festive artistic creativity in our annual Sankranthi Muggulu competition. Participants craft intricate traditional Chukkala Muggulu, freehand floral patterns, and color themes using non-toxic natural colors and rice flour.',
    shortDescription:
      'Annual Sankranthi Muggulu contest celebrating traditional Telugu floor art and festive creativity.',
    venueId: CANONICAL_VENUES.ganesha_temple.id,
    venueName: CANONICAL_VENUES.ganesha_temple.name,
    venueAddress: `${CANONICAL_VENUES.ganesha_temple.address}, ${CANONICAL_VENUES.ganesha_temple.city}, UT`,
    startDateTime: '2027-01-15T16:00:00-07:00',
    endDateTime: '2027-01-15T20:00:00-07:00',
    displayDate: 'Friday, January 15, 2027',
    displayTime: '4:00 PM – 8:00 PM MDT',
    timezone: 'America/Denver',
    registrationOpenDate: '2026-10-01T00:00:00-07:00',
    registrationCloseDate: '2027-01-14T23:59:59-07:00',
    coverImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: true,
    totalCapacity: 60,
    pricingSummary: '100% Free Entry for Active Members • $10 Solo / $15 Team for Guests',
    rulesText:
      'Space allocation: 6ft x 6ft marked area per entry. Maximum 2 hours execution time. All dry colors and rice flour must be non-toxic. Pre-stenciled prints are strictly prohibited.',
    highlights: [
      'Cash prizes and championship trophies for Top 3 rankings',
      'Judged on traditional Telugu theme, symmetry, neatness, and color harmony',
      'Complimentary hot tea and Prasadam provided to all participants',
    ],
    ticketTiers: [
      {
        id: 'tt-rangoli-member',
        name: 'Member Rangoli Entry',
        description: 'Free entry for UTA verified active members (Solo or Duo).',
        priceMember: 0,
        priceGuest: 10,
      },
      {
        id: 'tt-rangoli-team',
        name: 'Team Rangoli Entry (2 Artists)',
        description: 'Dual artist team slot with assigned 6x6 floor space.',
        priceMember: 0,
        priceGuest: 15,
      },
    ],
  },
  {
    id: 'evt-pickleball-2027',
    slug: 'sankranthi-2027-pickleball',
    title: 'Desi Pickleball League (DPL) Wasatch Championship 2027',
    teluguTitle: 'పికిల్‌బాల్ లీగ్ ఛాంపియన్‌షిప్ 2027',
    category: 'SPORTS',
    categoryLabel: 'Championship Athletic Tournament',
    description:
      'High-energy community doubles pickleball tournament at Salt Lake Tennis & Health Club. Featuring Men’s Open, Women’s Doubles, and Mixed Doubles divisions with certified referees and computerized scoring.',
    shortDescription:
      'Competitive community doubles tournament across Men’s, Women’s, and Mixed divisions.',
    venueId: CANONICAL_VENUES.salt_lake_tennis.id,
    venueName: CANONICAL_VENUES.salt_lake_tennis.name,
    venueAddress: `${CANONICAL_VENUES.salt_lake_tennis.address}, ${CANONICAL_VENUES.salt_lake_tennis.city}, UT`,
    startDateTime: '2027-01-16T08:00:00-07:00',
    endDateTime: '2027-01-16T18:00:00-07:00',
    displayDate: 'Saturday, January 16, 2027',
    displayTime: '8:00 AM – 6:00 PM MDT',
    timezone: 'America/Denver',
    registrationOpenDate: '2026-10-01T00:00:00-07:00',
    registrationCloseDate: '2027-01-14T23:59:59-07:00',
    coverImageUrl: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: true,
    totalCapacity: 32,
    pricingSummary: '50% Member Discount ($20 Team) • $40 Doubles Team for Non-Members',
    rulesText:
      'USA Pickleball official rules apply. Pool round-robin matches to 11 (win by 2). Elimination playoffs to 15 (win by 2). Franklin X-40 tournament balls provided.',
    highlights: [
      'Indoor heated courts with professional tournament surfacing',
      'Men’s, Women’s, and Mixed competitive brackets',
      'Hydration station and post-match light refreshments included',
    ],
    ticketTiers: [
      {
        id: 'tt-dpl-team',
        name: 'Doubles Team Entry (2 Players)',
        description: 'Complete registration for a two-player team.',
        priceMember: 20,
        priceGuest: 40,
      },
      {
        id: 'tt-dpl-single',
        name: 'Single Player / Free Agent',
        description: 'Single registrant paired with an available partner by tournament directors.',
        priceMember: 10,
        priceGuest: 20,
      },
    ],
  },
  {
    id: 'evt-volleyball-2027',
    slug: 'sankranthi-2027-volleyball',
    title: 'Walkers Indoor Volleyball Championship 2027',
    teluguTitle: 'వాకర్స్ ఇండోర్ వాలీబాల్ ఛాంపియన్‌షిప్ 2027',
    category: 'SPORTS',
    categoryLabel: 'Championship Athletic Tournament',
    description:
      'The premier winter indoor 6v6 volleyball tournament uniting athletic talent across Utah Valley and Salt Lake County. Group-stage matches leading into elimination knockout brackets.',
    shortDescription:
      'Premier indoor 6v6 volleyball showdown uniting Wasatch Front Telugu community teams.',
    venueId: CANONICAL_VENUES.mountain_sports.id,
    venueName: CANONICAL_VENUES.mountain_sports.name,
    venueAddress: `${CANONICAL_VENUES.mountain_sports.address}, ${CANONICAL_VENUES.mountain_sports.city}, UT`,
    startDateTime: '2027-01-17T08:00:00-07:00',
    endDateTime: '2027-01-17T20:00:00-07:00',
    displayDate: 'Sunday, January 17, 2027',
    displayTime: '8:00 AM – 8:00 PM MDT',
    timezone: 'America/Denver',
    registrationOpenDate: '2026-10-01T00:00:00-07:00',
    registrationCloseDate: '2027-01-15T23:59:59-07:00',
    coverImageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: true,
    totalCapacity: 16,
    pricingSummary: '100% Fee Waiver for Member Captains ($0) • $60 Full Team Entry for Guests',
    rulesText:
      'USA Volleyball rules apply. Standard net height. 6 players on court at all times. Roster cap of 9 players per team. Certified regional officials.',
    highlights: [
      'Championship trophy and medals for Winner & Runner-up squads',
      'Electronic scoreboard display and match replay clips',
      'Lunch boxes and electrolyte refreshments for all rostered players',
    ],
    ticketTiers: [
      {
        id: 'tt-vb-team',
        name: 'Full Team Entry (6-9 Players)',
        description: 'Complete roster entry for registered team.',
        priceMember: 0,
        priceGuest: 60,
      },
      {
        id: 'tt-vb-free-agent',
        name: 'Individual Free Agent Pass',
        description: 'Placed onto a community team roster.',
        priceMember: 0,
        priceGuest: 10,
      },
    ],
  },
  {
    id: 'evt-ugadi-2027',
    slug: 'ugadi-vedukalu-2027',
    title: 'UTA Ugadi Vedukalu & Vedic Panchanga Sravanam 2027',
    teluguTitle: 'ఉగాది వేడుకలు & పంచాంగ శ్రవణం 2027',
    category: 'CULTURAL',
    categoryLabel: 'Telugu New Year Celebration',
    description:
      'Welcome Sri Parabhava Nama Samvatsaram with authentic traditional Ugadi Pachadi, Vedic astrological predictions by learned scholars, Kavi Sammelanam (Telugu literary poetry), and an auspicious festive lunch.',
    shortDescription:
      'Celebrate Telugu New Year with authentic Ugadi Pachadi, Vedic Panchanga Sravanam, and poetry recitation.',
    venueId: CANONICAL_VENUES.south_jordan_center.id,
    venueName: CANONICAL_VENUES.south_jordan_center.name,
    venueAddress: `${CANONICAL_VENUES.south_jordan_center.address}, ${CANONICAL_VENUES.south_jordan_center.city}, UT`,
    startDateTime: '2027-04-03T10:30:00-06:00',
    endDateTime: '2027-04-03T16:00:00-06:00',
    displayDate: 'Saturday, April 3, 2027',
    displayTime: '10:30 AM – 4:00 PM MDT',
    timezone: 'America/Denver',
    registrationOpenDate: '2027-02-01T00:00:00-07:00',
    registrationCloseDate: '2027-04-02T23:59:59-06:00',
    coverImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
    isFeatured: true,
    totalCapacity: 600,
    pricingSummary: 'Free for Active Members • $15 Non-Member Adult (Buffet Lunch Included)',
    highlights: [
      'Panchanga Sravanam by Vedic Astrologer Pt. Narasimha Sharma',
      'Freshly prepared authentic Shadruchula Ugadi Pachadi for all attendees',
      'Kavi Sammelanam & children’s Telugu recitation contest',
    ],
    ticketTiers: [
      {
        id: 'tt-ugadi-member',
        name: 'Member Family Admission',
        description: 'Full admission and festive lunch for registered household.',
        priceMember: 0,
        priceGuest: 0,
      },
      {
        id: 'tt-ugadi-guest',
        name: 'Guest Ticket with Lunch',
        description: 'Single guest pass including complete festive banquet.',
        priceMember: 0,
        priceGuest: 15,
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 3. CANONICAL MEMBERSHIP PLANS
// ----------------------------------------------------------------------------
export const CANONICAL_MEMBERSHIP_PLANS: CanonicalMembershipPlan[] = [
  {
    id: 'plan-family-annual',
    code: 'FAMILY_ANNUAL',
    name: 'Family Annual Membership',
    teluguName: 'వార్షిక కుటుంబ సభ్యత్వం',
    price: 50.0,
    durationMonths: 12,
    maxFamilyMembers: 6,
    badge: 'MOST POPULAR',
    description:
      'Covers primary member, spouse, and up to 4 dependent children residing in the household. Valid for 12 continuous months with comprehensive festival feasting and sports privileges.',
    benefitsSummary:
      'Complimentary festival admissions, digital QR family pass, tournament discounts, and voting rights.',
    benefits: [
      'Free admission & festival feasts for all 6 household members at Sankranthi & Ugadi',
      '20% registration discount on all UTA sports leagues & tournaments',
      'Digital cryptographically signed QR Membership Pass for mobile wallet check-in',
      'Voting rights in Annual General Body (AGM) executive elections',
      'Priority enrollment for Utah Telugu Badi language & cultural heritage youth academy',
    ],
    isPublic: true,
  },
  {
    id: 'plan-individual-annual',
    code: 'INDIVIDUAL_ANNUAL',
    name: 'Individual Membership',
    teluguName: 'వ్యక్తిగత సభ్యత్వం',
    price: 25.0,
    durationMonths: 12,
    maxFamilyMembers: 1,
    description:
      'Designed for single working professionals, independent adults, and community enthusiasts seeking cultural connection across Utah.',
    benefitsSummary:
      'Free admission to signature cultural festivals, digital pass, and association voting rights.',
    benefits: [
      'Complimentary ticket & festive meals for all major UTA celebrations',
      'Full voting eligibility in annual constitutional governance',
      'Access to professional and community networking forums',
      'Digital cryptographic membership card for rapid check-in',
    ],
    isPublic: true,
  },
  {
    id: 'plan-life-patron',
    code: 'LIFE_MEMBERSHIP',
    name: 'Patron Life Membership',
    teluguName: 'పోషక జీవితకాల సభ్యత్వం',
    price: 500.0,
    durationMonths: 600, // 50 years
    maxFamilyMembers: 6,
    badge: 'PRESTIGE PATRON',
    description:
      'Lifetime association membership for your immediate family. Bestows permanent association patron recognition, front-row VIP reserved seating, and zero recurring renewal fees.',
    benefitsSummary:
      'Permanent membership, lifetime free festival passes, VIP front-row seating, and wall plaque recognition.',
    benefits: [
      'Lifetime free admission to every UTA event—never pay annual renewal dues again',
      'VIP front-row reserved stage seating for your family at all festivals',
      'Permanent recognition on the Utah Telugu Association Digital Wall of Patrons',
      'Exclusive invitation to Trustee Council and executive advisory summits',
      'Complimentary championship entry for family sports teams',
    ],
    isPublic: true,
  },
  {
    id: 'plan-student-senior',
    code: 'STUDENT_ANNUAL',
    name: 'Student / Senior Membership',
    teluguName: 'విద్యార్థి / సీనియర్ సభ్యత్వం',
    price: 15.0,
    durationMonths: 12,
    maxFamilyMembers: 1,
    description:
      'Subsidized membership rate for university students (U of U, BYU, USU, UVU, SLCC) and senior citizens (65+) living along the Wasatch Front.',
    benefitsSummary:
      'All individual member privileges at a subsidized rate with verified student or senior status.',
    benefits: [
      'Full free entrance to signature cultural festivals and dinners',
      'Access to student career mentorship and university community network',
      'Digital pass for instant mobile verification',
    ],
    isPublic: true,
  },
];

// ----------------------------------------------------------------------------
// 4. CANONICAL ORGANIZATION DETAILS
// ----------------------------------------------------------------------------
export const CANONICAL_ORG = {
  name: 'Utah Telugu Association',
  acronym: 'UTA',
  legalStatus: '501(c)(3) Non-Profit Public Charity',
  foundedYear: 2001,
  tagline: 'Rooted in Culture • Connected in Utah',
  teluguTagline: 'సంస్కృతిలో మూలాలు • ఉటాలో బంధాలు',
  email: 'contact@utahtelugu.org',
  supportEmail: 'support@utahtelugu.org',
  treasurerEmail: 'treasurer@utahtelugu.org',
  presidentEmail: 'president@utahtelugu.org',
  mailingAddress: 'P.O. Box 95822, South Jordan, UT 84095',
  timezone: 'America/Denver',
  socialLinks: {
    facebook: 'https://facebook.com/utahtelugu',
    instagram: 'https://instagram.com/utahtelugu',
    youtube: 'https://youtube.com/@utahtelugu',
  },
};
