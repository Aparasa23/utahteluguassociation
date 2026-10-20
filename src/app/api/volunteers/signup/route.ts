import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, interests, shiftId } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // Upsert volunteer
    const volunteer = await prisma.volunteer.upsert({
      where: { email },
      update: {
        fullName,
        phone,
        interests: Array.isArray(interests) ? interests.join(', ') : interests,
      },
      create: {
        fullName,
        email,
        phone,
        interests: Array.isArray(interests) ? interests.join(', ') : interests,
      },
    });

    // If shiftId provided, create assignment
    if (shiftId) {
      await prisma.volunteerAssignment.create({
        data: {
          shiftId,
          volunteerId: volunteer.id,
          status: 'CONFIRMED',
        },
      });
    }

    return NextResponse.json({
      success: true,
      volunteerId: volunteer.id,
      message: 'Thank you for stepping up to serve! A confirmation has been sent to your email.',
    });
  } catch (error: any) {
    console.error('Error in volunteer signup:', error);
    return NextResponse.json({ error: 'Failed to record volunteer signup.' }, { status: 500 });
  }
}
