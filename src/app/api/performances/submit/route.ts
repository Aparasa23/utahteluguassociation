import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      eventId,
      title,
      category,
      performanceType,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
      durationMinutes,
      description,
      audioFileUrl,
      participants,
    } = body;

    if (!eventId || !title || !coordinatorName || !coordinatorEmail) {
      return NextResponse.json({ error: 'Missing required performance fields.' }, { status: 400 });
    }

    const duration = parseInt(durationMinutes) || 5;
    if (duration > 10) {
      return NextResponse.json({ error: 'Maximum stage duration limit is 10 minutes.' }, { status: 400 });
    }

    const performance = await prisma.performance.create({
      data: {
        eventId,
        title,
        category: category || 'CLASSICAL_DANCE',
        performanceType: performanceType || 'GROUP',
        coordinatorName,
        coordinatorEmail,
        coordinatorPhone: coordinatorPhone || '',
        durationMinutes: duration,
        description: description || '',
        audioFileUrl: audioFileUrl || null,
        status: 'PENDING',
        participants: {
          create: Array.isArray(participants)
            ? participants.map((p: any) => ({
                fullName: p.fullName || 'Performer',
                ageGroup: p.ageGroup || 'KIDS',
              }))
            : [],
        },
      },
    });

    return NextResponse.json({
      success: true,
      performanceId: performance.id,
      title: performance.title,
      status: performance.status,
      message: 'Performance registration received! The UTA Cultural Committee will review your submission.',
    });
  } catch (error: any) {
    console.error('Error submitting performance:', error);
    return NextResponse.json({ error: 'Internal server error submitting performance.' }, { status: 500 });
  }
}
