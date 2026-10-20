const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding UTA Digital Universe database...');

  // Clean existing data
  await prisma.checkIn.deleteMany();
  await prisma.eventTicket.deleteMany();
  await prisma.registrationAttendee.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.eventTicketType.deleteMany();
  await prisma.eventOrganizer.deleteMany();
  await prisma.performanceSchedule?.deleteMany?.().catch(() => {});
  await prisma.performer.deleteMany();
  await prisma.performance.deleteMany();
  await prisma.tournamentMatch.deleteMany();
  await prisma.tournamentStanding.deleteMany();
  await prisma.tournamentRound.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournamentDivision.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.sport.deleteMany();
  await prisma.sponsorship.deleteMany();
  await prisma.sponsor.deleteMany();
  await prisma.sponsorTier.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.financialEntry.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.volunteerAssignment.deleteMany();
  await prisma.volunteerShift.deleteMany();
  await prisma.volunteer.deleteMany();
  await prisma.governanceApproval.deleteMany();
  await prisma.governanceProposal.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.membershipStatusHistory.deleteMany();
  await prisma.membershipTransaction.deleteMany();
  await prisma.membershipBenefit.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.familyMember.deleteMany();
  await prisma.memberProfile.deleteMany();
  await prisma.family.deleteMany();
  await prisma.eventWaitlist.deleteMany();
  await prisma.event.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.userIdentity.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();

  // 1. ROLES
  const rolesData = [
    { name: 'SUPER_ADMIN', label: 'Super Administrator', description: 'Full system control & root permissions' },
    { name: 'PRESIDENT', label: 'UTA President', description: 'Executive oversight, approvals, and governance' },
    { name: 'SECRETARY', label: 'General Secretary', description: 'Communications, minutes, and administrative records' },
    { name: 'TREASURER', label: 'Treasurer', description: 'Financial management, budget reconciliation, and reporting' },
    { name: 'EC_MEMBER', label: 'Executive Committee Member', description: 'Event and operational leadership' },
    { name: 'BOARD_MEMBER', label: 'Board of Trustee', description: 'Trustee oversight and constitutional matters' },
    { name: 'EVENT_ORGANIZER', label: 'Event Organizer', description: 'Ticketing, stage management, and event check-in' },
    { name: 'TOURNAMENT_DIRECTOR', label: 'Tournament Director', description: 'Sports schedules, brackets, and score approvals' },
    { name: 'VOLUNTEER_COORDINATOR', label: 'Volunteer Coordinator', description: 'Volunteer shifts, assignments, and tracking' },
    { name: 'SPONSOR_MANAGER', label: 'Sponsor Manager', description: 'Sponsor onboarding, tiers, and agreements' },
    { name: 'CHECKIN_STAFF', label: 'Check-in Staff', description: 'On-site ticket scanning and attendee lookup' },
    { name: 'MEMBER', label: 'Active Member', description: 'Utah Telugu Association family member' },
    { name: 'GUEST', label: 'Guest / Non-Member', description: 'Public visitor or community attendee' },
  ];

  const roles = {};
  for (const r of rolesData) {
    roles[r.name] = await prisma.role.create({ data: r });
  }

  // 2. USERS
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@utahtelugu.org',
      name: 'Rao Parasa',
      phone: '(801) 555-0199',
      hashedPassword: 'password123',
      emailVerified: new Date(),
    },
  });
  await prisma.userRole.create({ data: { userId: adminUser.id, roleId: roles['SUPER_ADMIN'].id } });
  await prisma.userRole.create({ data: { userId: adminUser.id, roleId: roles['PRESIDENT'].id } });

  const treasurerUser = await prisma.user.create({
    data: {
      email: 'treasurer@utahtelugu.org',
      name: 'Suresh Varma',
      phone: '(801) 555-0144',
      hashedPassword: 'password123',
      emailVerified: new Date(),
    },
  });
  await prisma.userRole.create({ data: { userId: treasurerUser.id, roleId: roles['TREASURER'].id } });

  const sportsDirector = await prisma.user.create({
    data: {
      email: 'sports@utahtelugu.org',
      name: 'Kalyan Chakravarthy',
      phone: '(801) 555-0177',
      hashedPassword: 'password123',
      emailVerified: new Date(),
    },
  });
  await prisma.userRole.create({ data: { userId: sportsDirector.id, roleId: roles['TOURNAMENT_DIRECTOR'].id } });

  const memberUser = await prisma.user.create({
    data: {
      email: 'member@utahtelugu.org',
      name: 'Venkat & Priya Rao',
      phone: '(801) 555-0123',
      hashedPassword: 'password123',
      emailVerified: new Date(),
    },
  });
  await prisma.userRole.create({ data: { userId: memberUser.id, roleId: roles['MEMBER'].id } });

  // 3. MEMBERSHIP PLANS
  const familyPlan = await prisma.membershipPlan.create({
    data: {
      code: 'FAMILY_ANNUAL',
      name: 'Family Annual Membership',
      description: 'Covers primary member, spouse, and up to 4 eligible children residing in Utah.',
      price: 50.0,
      durationMonths: 12,
      maxFamilyMembers: 6,
      benefitsSummary: 'Free entry to Sankranthi & Ugadi celebrations, youth sports discount, voting rights.',
      benefits: {
        create: [
          { title: 'Free Admission to Signature Festivals', description: 'Complimentary festival entry for all 6 registered family members' },
          { title: 'Sports Tournament Team Discount', description: '20% off all UTA tournament entries' },
          { title: 'Annual General Body Voting Rights', description: 'Vote in Executive Committee elections' },
          { title: 'Exclusive Telugu Badi Language Class Access', description: 'Priority registration for weekend Telugu classes' },
        ],
      },
    },
  });

  const individualPlan = await prisma.membershipPlan.create({
    data: {
      code: 'INDIVIDUAL_ANNUAL',
      name: 'Individual Annual Membership',
      description: 'Designed for individual working professionals and independent adults.',
      price: 25.0,
      durationMonths: 12,
      maxFamilyMembers: 1,
      benefitsSummary: 'Free entry to major cultural events and association voting eligibility.',
      benefits: {
        create: [
          { title: 'Festival Free Entry', description: 'Free entrance to annual cultural festivals' },
          { title: 'Voting Eligibility', description: 'Full active member privileges' },
        ],
      },
    },
  });

  const lifePlan = await prisma.membershipPlan.create({
    data: {
      code: 'LIFE_MEMBERSHIP',
      name: 'Patron Life Membership',
      description: 'Lifetime association membership for your immediate family with premier recognition.',
      price: 500.0,
      durationMonths: 600, // 50 years
      maxFamilyMembers: 6,
      benefitsSummary: 'Lifetime free admission, priority VIP seating, and permanent UTA Patron Recognition.',
      benefits: {
        create: [
          { title: 'Lifetime Free Festival Passes', description: 'Never pay annual renewal fees' },
          { title: 'VIP Reserved Seating', description: 'Front-row festival seating at all UTA stage events' },
          { title: 'Patron Directory Plaque', description: 'Permanent recognition on the UTA Digital Universe wall' },
        ],
      },
    },
  });

  const studentPlan = await prisma.membershipPlan.create({
    data: {
      code: 'STUDENT_ANNUAL',
      name: 'Student / Senior Membership',
      description: 'Subsidized rate for university students at Utah universities (U of U, BYU, USU, UVU) and seniors (65+).',
      price: 15.0,
      durationMonths: 12,
      maxFamilyMembers: 1,
      benefitsSummary: 'All standard member benefits with verified student/senior status.',
      benefits: {
        create: [
          { title: 'Discounted Access', description: 'Free admission to student cultural workshops' },
        ],
      },
    },
  });

  // 4. FAMILY & ACTIVE MEMBERSHIP
  const demoFamily = await prisma.family.create({
    data: {
      familyName: 'The Rao Family',
      familySize: 4,
      familyMembers: {
        create: [
          { fullName: 'Venkat Rao', relationship: 'PRIMARY', age: 39, gender: 'Male' },
          { fullName: 'Priya Rao', relationship: 'SPOUSE', age: 36, gender: 'Female' },
          { fullName: 'Ananya Rao', relationship: 'CHILD', age: 10, gender: 'Female' },
          { fullName: 'Siddharth Rao', relationship: 'CHILD', age: 7, gender: 'Male' },
        ],
      },
    },
  });

  const memberProfile = await prisma.memberProfile.create({
    data: {
      userId: memberUser.id,
      familyId: demoFamily.id,
      membershipNumber: 'UTA-2026-F0892',
      membershipStatus: 'ACTIVE',
      addressLine1: '11422 S Grandville Ave',
      city: 'South Jordan',
      state: 'UT',
      zipCode: '84095',
      emergencyContact: 'Ravi Kumar',
      emergencyPhone: '(801) 555-8822',
      notes: 'Active volunteer in cultural stage decor committee.',
    },
  });

  const activeMembership = await prisma.membership.create({
    data: {
      memberProfileId: memberProfile.id,
      planId: familyPlan.id,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2027-01-01'),
      status: 'ACTIVE',
      qrVerificationToken: 'UTA-VERIFY-7890-ABCD-9988',
      transactions: {
        create: {
          amount: 50.0,
          currency: 'USD',
          provider: 'ZEFFY',
          transactionId: 'ZEF-TX-202601-8891',
          paymentStatus: 'COMPLETED',
          notes: 'Online Zeffy payment verified.',
        },
      },
      statusHistory: {
        create: {
          memberProfileId: memberProfile.id,
          previousStatus: 'PENDING',
          newStatus: 'ACTIVE',
          reason: 'Online annual family payment verified via Zeffy integration',
        },
      },
    },
  });

  // 5. VENUES
  const southJordanVenue = await prisma.venue.create({
    data: {
      name: 'South Jordan Community Center Auditorium',
      address: '10778 S Redwood Rd',
      city: 'South Jordan',
      state: 'UT',
      zipCode: '84095',
      capacity: 850,
      mapUrl: 'https://maps.google.com/?q=10778+S+Redwood+Rd+South+Jordan+UT',
    },
  });

  const jordanRiverGround = await prisma.venue.create({
    data: {
      name: 'Jordan River Parkway Sports Complex',
      address: '10800 S River Front Pkwy',
      city: 'South Jordan',
      state: 'UT',
      zipCode: '84095',
      capacity: 400,
    },
  });

  const slcArtsCenter = await prisma.venue.create({
    data: {
      name: 'Mid-Valley Performing Arts Center',
      address: '2525 Taylorsville Blvd',
      city: 'Taylorsville',
      state: 'UT',
      zipCode: '84129',
      capacity: 1200,
    },
  });

  // 6. EVENT CATEGORIES
  const catCultural = await prisma.eventCategory.create({
    data: { name: 'CULTURAL', label: 'Cultural Festivals', description: 'Traditional Telugu festivals & theatrical arts' },
  });
  const catSports = await prisma.eventCategory.create({
    data: { name: 'SPORTS', label: 'Sports Tournaments', description: 'Cricket, Volleyball, Pickleball, Tennikoit championships' },
  });
  const catCommunity = await prisma.eventCategory.create({
    data: { name: 'COMMUNITY', label: 'Community Gatherings', description: 'Picnics, language classes, youth camps & workshops' },
  });

  // 7. EVENTS
  const sankranthiEvent = await prisma.event.create({
    data: {
      slug: 'sankranthi-sambaralu-2027',
      title: 'UTA Grand Sankranthi Sambaralu 2027',
      description: 'Join Utah Telugu Association for our flagship celebration of harvest and heritage! Experience vibrant Kite flying (Gaalipatam), colorful Rangoli (Muggulu) competitions, traditional Bhogi Pallu ceremonies for kids, authentic festival feast (Bhojanam), and 4 hours of spellbinding classical and folk dance performances by our local talent.',
      categoryId: catCultural.id,
      venueId: slcArtsCenter.id,
      creatorUserId: adminUser.id,
      coverImageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
      startDateTime: new Date('2027-01-16T10:00:00-07:00'),
      endDateTime: new Date('2027-01-16T21:00:00-07:00'),
      timezone: 'America/Denver',
      registrationOpenDate: new Date('2026-10-01T00:00:00-07:00'),
      registrationCloseDate: new Date('2027-01-15T23:59:59-07:00'),
      totalCapacity: 950,
      isPublished: true,
      isFeatured: true,
      membersOnly: false,
      refundPolicy: 'Cancellations before Jan 10, 2027 are eligible for full refund minus processing fee.',
      zeffyCampaignUrl: 'https://www.zeffy.com/ticketing/uta-sankranthi-2027',
      organizers: {
        create: [
          { name: 'Rao Parasa', roleTitle: 'President & Event Chair', email: 'president@utahtelugu.org' },
          { name: 'Radha Krishna', roleTitle: 'Cultural Program Lead', email: 'cultural@utahtelugu.org' },
        ],
      },
      ticketTypes: {
        create: [
          {
            name: 'UTA Member Admission',
            description: 'Free entry including lunch & dinner for active UTA members.',
            price: 0.0,
            totalAvailable: 600,
            remainingQuantity: 412,
            isMembersOnly: true,
            isFamilyBundle: false,
            maxTicketsPerOrder: 6,
          },
          {
            name: 'Non-Member Adult (13+)',
            description: 'Admission including festival banquet for non-members.',
            price: 25.0,
            totalAvailable: 200,
            remainingQuantity: 148,
            isMembersOnly: false,
            isFamilyBundle: false,
            maxTicketsPerOrder: 4,
          },
          {
            name: 'Non-Member Child (5-12)',
            description: 'Admission and kids food token. Under 5 free.',
            price: 15.0,
            totalAvailable: 150,
            remainingQuantity: 110,
            isMembersOnly: false,
            isFamilyBundle: false,
            maxTicketsPerOrder: 4,
          },
        ],
      },
    },
  });

  const cricketEvent = await prisma.event.create({
    data: {
      slug: 'uta-premier-cricket-championship-2027',
      title: 'UTA Premier Cricket Cup 2027 (Leather & Tennis Ball)',
      description: 'The annual hallmark cricket tournament of Utah! Featuring 12 top teams across Utah Valley and Salt Lake County competing across 3 weekends on professional turf and matting wickets.',
      categoryId: catSports.id,
      venueId: jordanRiverGround.id,
      creatorUserId: sportsDirector.id,
      coverImageUrl: 'https://images.unsplash.com/photo-1531415074868-036b10f087b4?auto=format&fit=crop&w=1200&q=80',
      startDateTime: new Date('2027-04-10T08:00:00-06:00'),
      endDateTime: new Date('2027-04-25T18:00:00-06:00'),
      timezone: 'America/Denver',
      registrationOpenDate: new Date('2026-10-01T00:00:00-07:00'),
      registrationCloseDate: new Date('2027-04-01T23:59:59-06:00'),
      totalCapacity: 300,
      isPublished: true,
      isFeatured: true,
      membersOnly: false,
      organizers: {
        create: [
          { name: 'Kalyan Chakravarthy', roleTitle: 'Sports Committee Chair', email: 'sports@utahtelugu.org' },
        ],
      },
      ticketTypes: {
        create: [
          {
            name: 'Spectator Admission (Free)',
            description: 'Cheer for your favorite team, complimentary chai and snacks.',
            price: 0.0,
            totalAvailable: 300,
            remainingQuantity: 240,
            isMembersOnly: false,
            isFamilyBundle: false,
            maxTicketsPerOrder: 5,
          },
        ],
      },
    },
  });

  const ugadiEvent = await prisma.event.create({
    data: {
      slug: 'ugadi-vasantotsavam-2027',
      title: 'Ugadi Vasantotsavam 2027 (Telugu New Year)',
      description: 'Celebrate Plavanga Nama Samvatsara Ugadi with sacred Panchanga Sravanam, traditional Ugadi Pachadi distribution, Kavi Sammelanam (poetry recitals), and grand youth music concert.',
      categoryId: catCultural.id,
      venueId: southJordanVenue.id,
      creatorUserId: adminUser.id,
      startDateTime: new Date('2027-04-03T16:00:00-06:00'),
      endDateTime: new Date('2027-04-03T21:30:00-06:00'),
      timezone: 'America/Denver',
      registrationOpenDate: new Date('2027-02-01T00:00:00-07:00'),
      registrationCloseDate: new Date('2027-04-02T23:59:59-06:00'),
      totalCapacity: 600,
      isPublished: true,
      isFeatured: false,
      membersOnly: false,
      ticketTypes: {
        create: [
          {
            name: 'UTA Member Pass',
            description: 'Free entry with active membership verification',
            price: 0.0,
            totalAvailable: 400,
            remainingQuantity: 360,
            isMembersOnly: true,
          },
          {
            name: 'Guest Pass',
            description: 'Includes Ugadi dinner feast & program access',
            price: 20.0,
            totalAvailable: 200,
            remainingQuantity: 185,
            isMembersOnly: false,
          },
        ],
      },
    },
  });

  // 8. SAMPLE REGISTRATION & TICKETS WITH QR
  const memberTicketType = await prisma.eventTicketType.findFirst({
    where: { eventId: sankranthiEvent.id, isMembersOnly: true },
  });

  const demoRegistration = await prisma.eventRegistration.create({
    data: {
      registrationNumber: 'REG-2027-SKR-1004',
      eventId: sankranthiEvent.id,
      userId: memberUser.id,
      contactName: 'Venkat Rao',
      contactEmail: 'member@utahtelugu.org',
      contactPhone: '(801) 555-0123',
      totalAmount: 0.0,
      paymentStatus: 'FREE',
      paymentProvider: 'MEMBER_BENEFIT',
      status: 'CONFIRMED',
      attendees: {
        create: [
          { fullName: 'Venkat Rao', attendeeType: 'MEMBER', age: 39 },
          { fullName: 'Priya Rao', attendeeType: 'MEMBER', age: 36 },
          { fullName: 'Ananya Rao', attendeeType: 'CHILD', age: 10 },
          { fullName: 'Siddharth Rao', attendeeType: 'CHILD', age: 7 },
        ],
      },
    },
  });

  const ticket1 = await prisma.eventTicket.create({
    data: {
      ticketNumber: 'TKT-SKR-2027-0101',
      ticketTypeId: memberTicketType.id,
      registrationId: demoRegistration.id,
      attendeeName: 'Venkat Rao',
      qrToken: 'UTA-TKT-SECURE-VENKAT-2027-9941',
      isCheckedIn: false,
    },
  });

  const ticket2 = await prisma.eventTicket.create({
    data: {
      ticketNumber: 'TKT-SKR-2027-0102',
      ticketTypeId: memberTicketType.id,
      registrationId: demoRegistration.id,
      attendeeName: 'Priya Rao',
      qrToken: 'UTA-TKT-SECURE-PRIYA-2027-9942',
      isCheckedIn: false,
    },
  });

  // 9. SPORTS ENGINE & TOURNAMENTS
  const sportCricket = await prisma.sport.create({
    data: {
      name: 'CRICKET',
      label: 'Cricket',
      scoringType: 'CRICKET_OVERS',
      iconName: 'Activity',
    },
  });

  const sportVolleyball = await prisma.sport.create({
    data: {
      name: 'VOLLEYBALL',
      label: 'Volleyball',
      scoringType: 'SETS_POINTS',
      iconName: 'Shield',
    },
  });

  const sportPickleball = await prisma.sport.create({
    data: {
      name: 'PICKLEBALL',
      label: 'Pickleball',
      scoringType: 'GAMES_POINTS',
      iconName: 'Trophy',
    },
  });

  const cricketTournament = await prisma.tournament.create({
    data: {
      sportId: sportCricket.id,
      slug: 'uta-cricket-trophy-2027',
      title: 'UTA Wasatch Cricket Cup 2027',
      description: 'Premier T10 leather ball championship between Utah Telugu community clubs.',
      format: 'GROUP_STAGE_PLAYOFFS',
      status: 'ONGOING',
      startDate: new Date('2027-04-10'),
      endDate: new Date('2027-04-25'),
      venueName: 'Jordan River Parkway Sports Complex',
      rulesText: '10 overs per side. Max 2 overs per bowler. Powerplay 3 overs. ICC T20 rules apply.',
    },
  });

  const openDivision = await prisma.tournamentDivision.create({
    data: {
      tournamentId: cricketTournament.id,
      name: "Men's Open Division",
      maxTeams: 8,
      teamFee: 150.0,
    },
  });

  const team1 = await prisma.team.create({
    data: {
      tournamentId: cricketTournament.id,
      divisionId: openDivision.id,
      teamName: 'Wasatch Warriors CC',
      captainName: 'Vikram Reddy',
      captainEmail: 'vikram.reddy@gmail.com',
      captainPhone: '(801) 555-7111',
      seedNumber: 1,
      members: {
        create: [
          { fullName: 'Vikram Reddy', isCaptain: true, jerseyNum: 7 },
          { fullName: 'Kalyan Varma', isCaptain: false, jerseyNum: 18 },
          { fullName: 'Ramesh Babu', isCaptain: false, jerseyNum: 45 },
          { fullName: 'Aditya Ch', isCaptain: false, jerseyNum: 99 },
        ],
      },
    },
  });

  const team2 = await prisma.team.create({
    data: {
      tournamentId: cricketTournament.id,
      divisionId: openDivision.id,
      teamName: 'Salt Lake Strikers',
      captainName: 'Anil Kumar',
      captainEmail: 'anil.k@gmail.com',
      captainPhone: '(801) 555-7222',
      seedNumber: 2,
      members: {
        create: [
          { fullName: 'Anil Kumar', isCaptain: true, jerseyNum: 10 },
          { fullName: 'Deepak Rao', isCaptain: false, jerseyNum: 12 },
          { fullName: 'Sandeep V', isCaptain: false, jerseyNum: 24 },
          { fullName: 'Srikanth M', isCaptain: false, jerseyNum: 33 },
        ],
      },
    },
  });

  const round1 = await prisma.tournamentRound.create({
    data: {
      tournamentId: cricketTournament.id,
      divisionId: openDivision.id,
      roundNumber: 1,
      roundName: 'Semi-Finals',
    },
  });

  await prisma.tournamentMatch.create({
    data: {
      roundId: round1.id,
      matchNumber: 1,
      team1Id: team1.id,
      team2Id: team2.id,
      scheduledTime: new Date('2027-04-18T10:00:00-06:00'),
      courtOrPitch: 'Pitch 1 (North Ground)',
      status: 'LIVE',
      scoreTeam1: '118/4 (10.0 ov)',
      scoreTeam2: '94/6 (8.2 ov)',
      umpireName: 'Prasad N (ACUI Certified)',
      notes: 'Salt Lake Strikers need 25 runs from 10 balls.',
    },
  });

  await prisma.tournamentStanding.create({
    data: { tournamentId: cricketTournament.id, teamId: team1.id, played: 3, won: 3, lost: 0, points: 6, netRunRate: 1.84 },
  });
  await prisma.tournamentStanding.create({
    data: { tournamentId: cricketTournament.id, teamId: team2.id, played: 3, won: 2, lost: 1, points: 4, netRunRate: 0.62 },
  });

  // 10. CULTURAL PERFORMANCES
  const dancePerf = await prisma.performance.create({
    data: {
      eventId: sankranthiEvent.id,
      title: 'Vande Mataram & Telugu Talliki Vandanam (Kuchipudi Medley)',
      category: 'CLASSICAL_DANCE',
      performanceType: 'GROUP',
      coordinatorName: 'Swathi Bharadwaj (Natya Tarangini Academy)',
      coordinatorEmail: 'swathi.dance@gmail.com',
      coordinatorPhone: '(801) 555-9333',
      durationMinutes: 7,
      status: 'APPROVED',
      stageOrder: 3,
      scheduledTime: '17:30 - 17:37',
      description: 'Traditional invocation dance honoring Goddess Telugu Thalli followed by patriotic choreography.',
      participants: {
        create: [
          { fullName: 'Ananya Rao', ageGroup: 'KIDS' },
          { fullName: 'Sahiti K', ageGroup: 'KIDS' },
          { fullName: 'Tanvi Reddy', ageGroup: 'TEENS' },
          { fullName: 'Meghana V', ageGroup: 'TEENS' },
        ],
      },
    },
  });

  // 11. SPONSORS & TIERS
  const tierTitle = await prisma.sponsorTier.create({
    data: { code: 'TITLE', name: 'Grand Title Partner', minAmount: 5000.0, rank: 1, perks: 'Main stage banner, 10 min presentation, logo on all badges & 3D gallery prominence.' },
  });
  const tierPlatinum = await prisma.sponsorTier.create({
    data: { code: 'PLATINUM', name: 'Platinum Partner', minAmount: 2500.0, rank: 2, perks: 'Stage banner, booth space, dedicated social shoutout, 3D gallery display.' },
  });
  const tierGold = await prisma.sponsorTier.create({
    data: { code: 'GOLD', name: 'Gold Partner', minAmount: 1000.0, rank: 3, perks: 'Flyer inserts, lobby booth table, digital directory recognition.' },
  });

  const sponsor1 = await prisma.sponsor.create({
    data: {
      tierId: tierTitle.id,
      name: 'Intermountain Health Tech Systems',
      contactPerson: 'Srinivas Murthy',
      email: 'partners@imhealthtech.com',
      phone: '(801) 555-4000',
      websiteUrl: 'https://www.intermountainhealthcare.org',
      logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80',
      sponsorshipPeriod: '2026-2027',
      sponsorships: {
        create: {
          eventId: sankranthiEvent.id,
          agreedAmount: 5000.0,
          paidAmount: 5000.0,
          paymentStatus: 'PAID',
        },
      },
    },
  });

  const sponsor2 = await prisma.sponsor.create({
    data: {
      tierId: tierPlatinum.id,
      name: 'Wasatch Desi Bazaar & Sweets',
      contactPerson: 'Kishore Goud',
      email: 'contact@wasatchbazaar.com',
      phone: '(801) 555-4022',
      websiteUrl: 'https://wasatchdesibazaar.com',
      logoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
      sponsorshipPeriod: '2026-2027',
      sponsorships: {
        create: {
          eventId: sankranthiEvent.id,
          agreedAmount: 2500.0,
          paidAmount: 2500.0,
          paymentStatus: 'PAID',
        },
      },
    },
  });

  // 12. BUDGET & FINANCIAL MANAGEMENT
  const budget2027 = await prisma.budget.create({
    data: {
      fiscalYear: '2026-2027',
      category: 'CULTURAL_EVENTS',
      allocated: 35000.0,
      spent: 12450.0,
      entries: {
        create: [
          {
            entryType: 'REVENUE',
            category: 'SPONSORSHIP',
            amount: 7500.0,
            description: 'Sankranthi 2027 Title & Platinum Sponsorship collections',
            paymentRef: 'ZEF-SPON-2026-01',
            reconciled: true,
          },
          {
            entryType: 'REVENUE',
            category: 'MEMBERSHIP',
            amount: 14250.0,
            description: '285 Family & Individual annual membership dues',
            paymentRef: 'ZEF-MEM-2026-Q1',
            reconciled: true,
          },
          {
            entryType: 'EXPENSE',
            category: 'VENUE_RENTAL',
            amount: 4500.0,
            description: 'Mid-Valley Performing Arts Center deposit & theater rental',
            paymentRef: 'CHK-1092',
            reconciled: true,
          },
          {
            entryType: 'EXPENSE',
            category: 'CATERING',
            amount: 6200.0,
            description: 'Authentic South Indian festival buffet (900 pax deposit)',
            paymentRef: 'CHK-1098',
            reconciled: true,
          },
        ],
      },
    },
  });

  // 13. VOLUNTEERING
  const volShift = await prisma.volunteerShift.create({
    data: {
      eventId: sankranthiEvent.id,
      shiftName: 'Welcome & QR Ticket Check-In (Shift A)',
      startTime: new Date('2027-01-16T09:30:00-07:00'),
      endTime: new Date('2027-01-16T13:30:00-07:00'),
      capacity: 8,
    },
  });

  const vol1 = await prisma.volunteer.create({
    data: {
      userId: memberUser.id,
      fullName: 'Venkat Rao',
      email: 'member@utahtelugu.org',
      phone: '(801) 555-0123',
      interests: 'Check-in, Stage assistance, Photography',
      hoursLogged: 16.5,
      assignments: {
        create: {
          shiftId: volShift.id,
          status: 'CONFIRMED',
          checkedIn: false,
        },
      },
    },
  });

  // 14. GOVERNANCE
  await prisma.governanceProposal.create({
    data: {
      title: 'Establishment of UTA Youth STEM & Telugu Heritage Scholarship',
      description: 'Allocate $2,500 from the 2026-2027 operating surplus to award two annual $1,250 collegiate scholarships for high school graduating seniors of UTA member families displaying cultural service and academic excellence.',
      proposerId: adminUser.id,
      category: 'BUDGET',
      status: 'APPROVED',
      votingDeadline: new Date('2026-12-31'),
      approvals: {
        create: [
          { officerId: adminUser.id, decision: 'APPROVE', comment: 'Strong initiative to inspire the next generation of leaders.' },
          { officerId: treasurerUser.id, decision: 'APPROVE', comment: 'Fundable from existing cultural endowment reserves without deficit.' },
        ],
      },
    },
  });

  // 15. ANNOUNCEMENTS & MEDIA
  await prisma.announcement.create({
    data: {
      title: 'Sankranthi 2027 Cultural Performance Submissions Now Open!',
      content: 'Calling all dance academies, singing groups, and solo performers! Submit your audio and choreography registrations before December 15, 2026.',
      isUrgent: true,
      isPublished: true,
    },
  });

  await prisma.mediaAsset.create({
    data: {
      title: 'Sankranthi Colorful Muggulu Rangoli Competition',
      category: 'FESTIVAL',
      albumSlug: 'sankranthi-memories',
      url: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=800&q=80',
      caption: 'Exquisite hand-drawn rice flour rangoli by Utah Telugu women community members.',
      isFeatured: true,
    },
  });

  console.log('✅ Seeding complete! Database populated with production-grade data.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
