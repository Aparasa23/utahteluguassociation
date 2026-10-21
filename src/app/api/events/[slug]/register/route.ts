import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSecureToken } from '@/lib/qr';
import { PaymentGateway } from '@/lib/zeffy';

export async function POST(
  req: Request,
  {
 params }: { params: { slug: string } }
) {
  // Never issue passes or mark paid admission confirmed without validated,
  // durable payment, membership eligibility and transactional capacity checks.
  if (process.env.EVENT_REGISTRATION_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'Online registration is not open yet. Please check the official event information for updates.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const { slug } = params;
    const body = await req.json();
    const { contactName, contactEmail, contactPhone, tickets, memberNumber } = body;

    if (!contactName || !contactEmail || !Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json({ error: 'Incomplete registration request.' }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { slug },
      include: { ticketTypes: true },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }

    // Verify registration open window
    const now = new Date();
    if (now < new Date(event.registrationOpenDate) || now > new Date(event.registrationCloseDate)) {
      return NextResponse.json({ error: 'Registration is currently closed for this event.' }, { status: 400 });
    }

    // Verify member eligibility if member tickets requested
    let isVerifiedMember = false;
    if (memberNumber) {
      const member = await prisma.memberProfile.findFirst({
        where: {
          membershipNumber: memberNumber.trim(),
          membershipStatus: 'ACTIVE',
        },
      });
      if (member) isVerifiedMember = true;
    }

    // Calculate total amount and check remaining quantity per ticket type
    let totalAmount = 0;
    const ticketsToCreate: Array<{
      ticketTypeId: string;
      attendeeName: string;
      price: number;
    }> = [];

    for (const item of tickets) {
      const type = event.ticketTypes.find((t) => t.id === item.ticketTypeId);
      if (!type) {
        return NextResponse.json({ error: `Invalid ticket type: ${item.ticketTypeId}` }, { status: 400 });
      }

      if (type.isMembersOnly && !isVerifiedMember) {
        return NextResponse.json({
          error: `Ticket '${type.name}' requires an active UTA membership. Please verify your membership ID or select non-member admission.`,
        }, { status: 403 });
      }

      const qty = parseInt(item.quantity) || 0;
      if (qty <= 0) continue;

      if (type.remainingQuantity < qty) {
        return NextResponse.json({
          error: `Insufficient capacity. Only ${type.remainingQuantity} tickets remain for ${type.name}.`,
        }, { status: 409 });
      }

      totalAmount += type.price * qty;

      for (let i = 0; i < qty; i++) {
        ticketsToCreate.push({
          ticketTypeId: type.id,
          attendeeName: item.attendeeNames?.[i] || `${contactName} (Guest ${i + 1})`,
          price: type.price,
        });
      }
    }

    if (ticketsToCreate.length === 0) {
      return NextResponse.json({ error: 'No tickets selected.' }, { status: 400 });
    }

    // Transactional registration and ticket creation
    const randomRegNum = `REG-2027-${Math.floor(100000 + Math.random() * 900000)}`;

    const registration = await prisma.$transaction(async (tx) => {
      // Create Event Registration
      const reg = await tx.eventRegistration.create({
        data: {
          registrationNumber: randomRegNum,
          eventId: event.id,
          contactName,
          contactEmail,
          contactPhone,
          totalAmount,
          paymentStatus: totalAmount === 0 ? 'FREE' : 'PENDING',
          paymentProvider: totalAmount === 0 ? 'MEMBER_BENEFIT' : 'ZEFFY',
          status: 'CONFIRMED',
          attendees: {
            create: ticketsToCreate.map((t) => ({
              fullName: t.attendeeName,
              attendeeType: t.price === 0 ? 'MEMBER' : 'GUEST',
            })),
          },
        },
      });

      // Create individual tickets with QR tokens
      for (let i = 0; i < ticketsToCreate.length; i++) {
        const t = ticketsToCreate[i];
        const ticketNum = `TKT-${event.slug.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${i + 1}`;
        const qrToken = generateSecureToken({
          id: ticketNum,
          type: 'TICKET',
          issuedAt: Date.now(),
        });

        await tx.eventTicket.create({
          data: {
            ticketNumber: ticketNum,
            ticketTypeId: t.ticketTypeId,
            registrationId: reg.id,
            attendeeName: t.attendeeName,
            qrToken,
          },
        });

        // Decrement remaining capacity safely
        await tx.eventTicketType.update({
          where: { id: t.ticketTypeId },
          data: {
            remainingQuantity: {
              decrement: 1,
            },
          },
        });
      }

      return reg;
    });

    // If payment required, create Zeffy session
    let paymentDetails = null;
    if (totalAmount > 0) {
      paymentDetails = PaymentGateway.createCheckoutSession({
        registrationId: registration.id,
        referenceType: 'EVENT_TICKET',
        amount: totalAmount,
        contactEmail,
        contactName,
        campaignSlug: event.slug,
      });
    }

    return NextResponse.json({
      success: true,
      registrationNumber: registration.registrationNumber,
      registrationId: registration.id,
      totalAmount,
      ticketCount: ticketsToCreate.length,
      paymentDetails,
    });
  } catch (error: any) {
    console.error('Error creating event registration:', error);
    return NextResponse.json(
      { error: error.message || 'Internal error creating registration.' },
      { status: 500 }
    );
  }
}
