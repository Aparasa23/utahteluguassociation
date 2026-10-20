import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tokenOrTicketNumber, staffName = 'Volunteer Staff' } = body;

    if (!tokenOrTicketNumber) {
      return NextResponse.json({ error: 'Missing ticket token or ticket number.' }, { status: 400 });
    }

    const trimmed = tokenOrTicketNumber.trim();

    // Find ticket by qrToken or ticketNumber
    const ticket = await prisma.eventTicket.findFirst({
      where: {
        OR: [
          { qrToken: trimmed },
          { ticketNumber: trimmed },
        ],
      },
      include: {
        ticketType: true,
        registration: {
          include: {
            event: true,
          },
        },
        checkIns: {
          orderBy: { scannedAt: 'desc' },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({
        success: false,
        status: 'INVALID',
        message: 'Ticket not found in Utah Telugu Association database.',
      }, { status: 404 });
    }

    // Check if already checked in (Idempotency check)
    if (ticket.isCheckedIn) {
      // Record duplicate attempt for audit without adding false attendance
      await prisma.checkIn.create({
        data: {
          ticketId: ticket.id,
          scannedByStaff: staffName,
          isDuplicate: true,
        },
      });

      const firstScan = ticket.checkIns[ticket.checkIns.length - 1] || ticket.checkIns[0];

      return NextResponse.json({
        success: false,
        status: 'DUPLICATE',
        message: `⚠️ ALREADY CHECKED IN! This ticket was previously scanned on ${new Date(
          firstScan?.scannedAt || Date.now()
        ).toLocaleTimeString('en-US', { timeZone: 'America/Denver' })}.`,
        ticketNumber: ticket.ticketNumber,
        attendeeName: ticket.attendeeName,
        eventName: ticket.registration.event.title,
        ticketType: ticket.ticketType.name,
      });
    }

    // First time valid check-in
    await prisma.$transaction([
      prisma.eventTicket.update({
        where: { id: ticket.id },
        data: {
          isCheckedIn: true,
          checkInCount: 1,
        },
      }),
      prisma.checkIn.create({
        data: {
          ticketId: ticket.id,
          scannedByStaff: staffName,
          isDuplicate: false,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      status: 'VERIFIED',
      message: `✅ VALID TICKET — Welcome ${ticket.attendeeName}!`,
      ticketNumber: ticket.ticketNumber,
      attendeeName: ticket.attendeeName,
      eventName: ticket.registration.event.title,
      ticketType: ticket.ticketType.name,
      checkInTime: new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver' }),
    });
  } catch (error: any) {
    console.error('Check-in error:', error);
    return NextResponse.json({ error: 'Server error processing check-in.' }, { status: 500 });
  }
}
