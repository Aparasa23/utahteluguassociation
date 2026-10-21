import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSecureToken } from '@/lib/qr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      contactName,
      contactEmail,
      contactPhone,
      contactCity,
      membershipNumber,
      eventsSelected, // array of event keys: ['rangoli', 'pickleball', 'volleyball', 'grand_festival']
      eventDetails,   // object containing form details for each selected event
    } = body;

    if (!contactName || !contactEmail || !Array.isArray(eventsSelected) || eventsSelected.length === 0) {
      return NextResponse.json(
        { error: 'Please provide full contact details and select at least one event.' },
        { status: 400 }
      );
    }

    // 1. Check membership status if provided
    let isVerifiedMember = false;
    let memberProfile: any = null;
    if (membershipNumber) {
      const trimmed = membershipNumber.trim();
      memberProfile = await prisma.memberProfile.findFirst({
        where: {
          OR: [
            { membershipNumber: { equals: trimmed } },
            { memberships: { some: { qrVerificationToken: { equals: trimmed } } } },
            { user: { email: { equals: trimmed.toLowerCase() } } },
          ],
        },
        include: {
          user: true,
          memberships: {
            orderBy: { endDate: 'desc' },
            take: 1,
            include: { plan: true },
          },
        },
      });

      if (memberProfile) {
        const latestMembership = memberProfile.memberships[0];
        const isExpired = latestMembership ? new Date(latestMembership.endDate) < new Date() : true;
        if (memberProfile.membershipStatus === 'ACTIVE' && !isExpired) {
          isVerifiedMember = true;
        }
      }
    }

    // Map keys to slugs
    const slugMap: Record<string, string> = {
      rangoli: 'sankranthi-2027-rangoli',
      pickleball: 'sankranthi-2027-pickleball',
      volleyball: 'sankranthi-2027-volleyball',
      grand_festival: 'sankranthi-sambaralu-2027',
    };

    const registrationMasterNum = `UTA-SK27-${Math.floor(100000 + Math.random() * 900000)}`;
    const qrMasterToken = `UTA-PASS-SK27-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Calculate price breakdown and gather event IDs
    const createdPasses: any[] = [];
    let grandTotal = 0;

    for (const eventKey of eventsSelected) {
      const slug = slugMap[eventKey];
      if (!slug) continue;

      const eventRecord = await prisma.event.findUnique({
        where: { slug },
        include: { ticketTypes: true },
      });

      if (!eventRecord) continue;

      const details = eventDetails?.[eventKey] || {};
      let eventPrice = 0;
      let ticketName = 'General Entry';

      if (eventKey === 'rangoli') {
        if (isVerifiedMember) {
          eventPrice = 0;
          ticketName = 'UTA Member Rangoli Entry (Free)';
        } else {
          eventPrice = details.format === 'team' ? 15 : 10;
          ticketName = details.format === 'team' ? 'Team Rangoli Entry' : 'Solo Rangoli Entry';
        }
      } else if (eventKey === 'pickleball') {
        if (isVerifiedMember) {
          eventPrice = details.entryType === 'team' ? 20 : 10; // 50% member discount
          ticketName = details.entryType === 'team' ? 'UTA Member Doubles Team ($20)' : 'UTA Member Singles ($10)';
        } else {
          eventPrice = details.entryType === 'team' ? 40 : 20;
          ticketName = details.entryType === 'team' ? 'Pickleball Team (2 Players) ($40)' : 'Pickleball Single Player ($20)';
        }
      } else if (eventKey === 'volleyball') {
        if (isVerifiedMember) {
          eventPrice = 0;
          ticketName = 'UTA Member Team Captain Waiver (Free)';
        } else {
          eventPrice = details.entryType === 'free_agent' ? 10 : 60;
          ticketName = details.entryType === 'free_agent' ? 'Free Agent Player Pass ($10)' : 'Full Team Roster Entry ($60)';
        }
      } else if (eventKey === 'grand_festival') {
        if (isVerifiedMember) {
          eventPrice = 0;
          ticketName = 'UTA Member VIP Family Festival Pass (100% Free)';
        } else {
          const qty = details.ticketCount || 1;
          const dinnerQty = details.dinnerCount || 0;
          eventPrice = (qty * 9.99) + (dinnerQty * 12);
          ticketName = `General Festival Pass (${qty}x) + Dinner (${dinnerQty}x)`;
        }
      }

      grandTotal += eventPrice;

      // Create record in EventRegistration
      const regNumber = `REG-${eventKey.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
      
      try {
        const registration = await prisma.eventRegistration.create({
          data: {
            registrationNumber: regNumber,
            eventId: eventRecord.id,
            contactName,
            contactEmail,
            contactPhone,
            totalAmount: eventPrice,
            paymentStatus: eventPrice === 0 ? 'COMPLETED' : 'PENDING',
            status: 'CONFIRMED',
            tickets: {
              create: [
                {
                  ticketNumber: `TKT-${regNumber}-1`,
                  ticketTypeId: eventRecord.ticketTypes[0]?.id || '',
                  attendeeName: contactName,
                  qrToken: generateSecureToken({
                    id: regNumber,
                    type: 'TICKET',
                    issuedAt: Date.now(),
                  }),
                },
              ],
            },
          },
        });

        createdPasses.push({
          eventKey,
          eventTitle: eventRecord.title,
          slug: eventRecord.slug,
          ticketName,
          price: eventPrice,
          registrationNumber: regNumber,
          details,
        });
      } catch (err: any) {
        console.error(`Error saving registration for ${slug}:`, err);
        createdPasses.push({
          eventKey,
          eventTitle: eventRecord.title,
          slug: eventRecord.slug,
          ticketName,
          price: eventPrice,
          registrationNumber: regNumber,
          details,
        });
      }
    }

    return NextResponse.json({
      success: true,
      masterRegistrationNumber: registrationMasterNum,
      qrMasterToken,
      isVerifiedMember,
      memberInfo: memberProfile ? {
        membershipNumber: memberProfile.membershipNumber,
        name: memberProfile.user.name,
        plan: memberProfile.memberships[0]?.plan.name,
      } : null,
      attendee: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        city: contactCity || 'Salt Lake City, UT',
      },
      passes: createdPasses,
      grandTotal,
      currency: 'USD',
      issuedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error processing unified Sankranthi registration:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing registration. Please try again.' },
      { status: 500 }
    );
  }
}
