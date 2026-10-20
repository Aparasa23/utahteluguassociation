// Comprehensive End-to-End Workflow Verification Suite for UTA Digital Universe
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const baseUrl = 'http://localhost:3005';

async function runTests() {
  console.log('=====================================================');
  console.log('🚀 STARTING UTA DIGITAL UNIVERSE END-TO-END VALIDATION');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`Testing: ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // 1. Home Page HTTP Status
  await test('Public Home Page (/) Status 200', async () => {
    const res = await fetch(`${baseUrl}/`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes('Utah Telugu Association') && !html.includes('UTA Digital Universe')) {
      throw new Error('Home page missing UTA branding');
    }
  });

  // 2. Events Page
  await test('Public Events Catalog (/events) Status 200', async () => {
    const res = await fetch(`${baseUrl}/events`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes('Sankranthi Sambaralu 2027')) {
      throw new Error('Expected event Sankranthi Sambaralu 2027 to be present');
    }
  });

  // 3. Cultural Pavilion Page & Specific Festival
  await test('Cultural Festival Page (/culture/sankranthi) Status 200', async () => {
    const res = await fetch(`${baseUrl}/culture/sankranthi`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes('సంక్రాంతి సంబరాలు')) {
      throw new Error('Expected Telugu typography for Sankranthi');
    }
  });

  // 4. Sports Tournament Page
  const tournament = await prisma.tournament.findFirst({
    where: { slug: 'uta-cricket-trophy-2027' },
  });
  await test(`Tournament Page (/sports/tournaments/${tournament.slug}) Status 200`, async () => {
    const res = await fetch(`${baseUrl}/sports/tournaments/${tournament.slug}`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes('Salt Lake Strikers') && !html.includes('Wasatch Warriors')) {
      throw new Error('Expected teams to be present in tournament');
    }
  });

  // 5. Membership Join API (Transactional user, family, profile, and membership creation)
  const familyPlan = await prisma.membershipPlan.findFirst({
    where: { code: 'FAMILY_ANNUAL' },
  });
  if (!familyPlan) throw new Error('FAMILY_ANNUAL membership plan not found');

  let generatedMembershipNumber = null;
  let generatedQrToken = null;
  const uniqueEmail = `test.telugu.family.${Date.now()}@utah.example.com`;

  await test('Membership Registration API (/api/membership/join)', async () => {
    const payload = {
      planId: familyPlan.id,
      primaryMember: {
        fullName: 'Ramesh Kalyanam',
        email: uniqueEmail,
        phone: '801-555-8899',
        addressLine1: '1234 Wasatch Blvd',
        city: 'Salt Lake City',
        state: 'UT',
        zipCode: '84101',
        emergencyContact: 'Lakshmi Kalyanam',
        emergencyPhone: '801-555-1234',
      },
      familyMembers: [
        { fullName: 'Lakshmi Kalyanam', relationship: 'Spouse', age: 34, gender: 'FEMALE' },
        { fullName: 'Aditya Kalyanam', relationship: 'Child', age: 10, gender: 'MALE' },
        { fullName: 'Ananya Kalyanam', relationship: 'Child', age: 6, gender: 'FEMALE' },
      ],
    };

    const res = await fetch(`${baseUrl}/api/membership/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    if (!data.success || !data.membershipNumber || !data.qrToken) {
      throw new Error('Missing membershipNumber or qrToken in response');
    }

    generatedMembershipNumber = data.membershipNumber;
    generatedQrToken = data.qrToken;
    console.log(`\n   -> Registered Member ID: ${generatedMembershipNumber}`);
  });

  // 6. Membership Verification API
  await test('Membership Verification API (/api/membership/verify)', async () => {
    const res = await fetch(`${baseUrl}/api/membership/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenOrNumber: generatedMembershipNumber }),
    });

    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.isValid || data.membershipNumber !== generatedMembershipNumber) {
      throw new Error('Verification failed to locate member or invalid status');
    }
    if (data.status !== 'ACTIVE') {
      throw new Error(`Expected ACTIVE status, got ${data.status}`);
    }
  });

  // 7. Event Registration API with Capacity & Member Ticket Allocation
  const sankranthiEvent = await prisma.event.findUnique({
    where: { slug: 'sankranthi-sambaralu-2027' },
    include: { ticketTypes: true },
  });
  if (!sankranthiEvent) throw new Error('Sankranthi event not found');

  const memberTicketType = sankranthiEvent.ticketTypes.find((t) => t.isMembersOnly);
  if (!memberTicketType) throw new Error('Member ticket type not found');

  let issuedTicket = null;
  await test('Event Registration API (/api/events/sankranthi-sambaralu-2027/register)', async () => {
    const res = await fetch(`${baseUrl}/api/events/sankranthi-sambaralu-2027/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactName: 'Ramesh Kalyanam',
        contactEmail: uniqueEmail,
        contactPhone: '801-555-8899',
        memberNumber: generatedMembershipNumber,
        tickets: [
          {
            ticketTypeId: memberTicketType.id,
            quantity: 2,
            attendeeNames: ['Ramesh Kalyanam', 'Lakshmi Kalyanam'],
          },
        ],
      }),
    });

    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Status ${res.status}: ${err}`);
    }

    const data = await res.json();
    if (!data.success || !data.registrationId) {
      throw new Error('Expected registration confirmation');
    }

    // Retrieve generated ticket from DB
    issuedTicket = await prisma.eventTicket.findFirst({
      where: { registrationId: data.registrationId },
    });

    if (!issuedTicket || !issuedTicket.qrToken) {
      throw new Error('Ticket record not generated in DB');
    }

    console.log(`\n   -> Generated Ticket #: ${issuedTicket.ticketNumber} (QR Token: ${issuedTicket.qrToken.substring(0, 16)}...)`);
  });

  // 8. Gate QR Check-in Scan API (First Scan - SUCCESS)
  await test('Gate Check-in Scan API: Initial Scan (/api/checkin/scan)', async () => {
    const res = await fetch(`${baseUrl}/api/checkin/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenOrTicketNumber: issuedTicket.qrToken,
        staffName: 'Gate Scanner Alpha (Volunteer Lead)',
      }),
    });

    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Status ${res.status}: ${err}`);
    }

    const data = await res.json();
    if (!data.success || data.status !== 'VERIFIED') {
      throw new Error(`Expected VERIFIED status, got ${data.status}`);
    }
  });

  // 9. Gate QR Check-in Scan API (Second Scan - DUPLICATE SCAN PREVENTED)
  await test('Gate Check-in Scan API: Idempotency & Duplicate Prevention', async () => {
    const res = await fetch(`${baseUrl}/api/checkin/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenOrTicketNumber: issuedTicket.qrToken,
        staffName: 'Gate Scanner Beta (Gate 2)',
      }),
    });

    const data = await res.json();
    if (data.status !== 'DUPLICATE') {
      throw new Error(`Expected DUPLICATE status, got ${data.status}`);
    }
    if (data.success !== false) {
      throw new Error('Expected success: false on duplicate scan');
    }
  });

  // 10. Stage Cultural Performance Submission API
  await test('Cultural Performance Registration API (/api/performances/submit)', async () => {
    const res = await fetch(`${baseUrl}/api/performances/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: sankranthiEvent.id,
        title: 'Annamacharya Keerthanalu Kuchipudi Tarangam',
        category: 'CLASSICAL_DANCE',
        performanceType: 'GROUP',
        coordinatorName: 'Swathi Parasa',
        coordinatorEmail: 'swathi@dance.example.com',
        coordinatorPhone: '801-555-3344',
        durationMinutes: 7,
        description: 'Traditional Kuchipudi dance highlighting brass plate balance',
        audioFileUrl: 'https://storage.utah.org/audio/kuchipudi-annamacharya.mp3',
        participants: [
          { fullName: 'Meera Rao', ageGroup: 'TEENS' },
          { fullName: 'Ananya Kalyanam', ageGroup: 'KIDS' },
        ],
      }),
    });

    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Status ${res.status}: ${err}`);
    }

    const data = await res.json();
    if (!data.success || !data.performanceId) {
      throw new Error('Missing performanceId');
    }
  });

  // 11. Volunteer Shift Sign-up API
  const shift = await prisma.volunteerShift.findFirst();
  if (!shift) throw new Error('No volunteer shift found');

  await test('Volunteer Sign-up API (/api/volunteers/signup)', async () => {
    const res = await fetch(`${baseUrl}/api/volunteers/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Karthik Rao',
        email: `karthik.volunteer.${Date.now()}@utah.example.com`,
        phone: '801-555-9090',
        interests: ['Food Distribution', 'Event Coordination'],
        shiftId: shift.id,
      }),
    });

    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Status ${res.status}: ${err}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error('Volunteer signup failed');
    }
  });

  // 12. Financial Ledger Streaming CSV Export API
  await test('Financial CSV Export API (/api/finances/export)', async () => {
    const res = await fetch(`${baseUrl}/api/finances/export`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('text/csv')) {
      throw new Error(`Expected text/csv content type, got ${contentType}`);
    }
    const csv = await res.text();
    if (!csv.includes('Entry ID') || !csv.includes('Amount (USD)')) {
      throw new Error('Invalid CSV header structure');
    }
  });

  // 13. Admin Dashboard Pages
  await test('Admin Dashboard Route (/admin) Status 200', async () => {
    const res = await fetch(`${baseUrl}/admin`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const html = await res.text();
    if (!html.includes('Executive Command Center') && !html.includes('Active Members')) {
      throw new Error('Expected admin summary metrics');
    }
  });

  // 14. Member Digital Card Route
  await test('Member Digital Card (/dashboard/membership-card) Status 200', async () => {
    const res = await fetch(`${baseUrl}/dashboard/membership-card`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const html = await res.text();
    if (!html.includes('Digital Membership Pass') && !html.includes('UTA-')) {
      throw new Error('Expected membership pass layout');
    }
  });

  console.log('\n=====================================================');
  console.log(`📊 FINAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=====================================================\n');

  await prisma.$disconnect();

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(async (err) => {
  console.error('Fatal test error:', err);
  await prisma.$disconnect();
  process.exit(1);
});
