import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { tokenOrNumber } = await req.json();

    if (!tokenOrNumber || typeof tokenOrNumber !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid token or membership ID.' }, { status: 400 });
    }

    const trimmed = tokenOrNumber.trim();

    // Check by membershipNumber first, then by qrVerificationToken
    let profile = await prisma.memberProfile.findFirst({
      where: {
        OR: [
          { membershipNumber: trimmed },
          { memberships: { some: { qrVerificationToken: trimmed } } },
        ],
      },
      include: {
        user: { select: { name: true, email: true } },
        family: {
          include: {
            familyMembers: { select: { fullName: true, relationship: true } },
          },
        },
        memberships: {
          orderBy: { endDate: 'desc' },
          take: 1,
          include: { plan: true },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({
        isValid: false,
        message: 'No matching Utah Telugu Association membership found.',
      });
    }

    const latestMembership = profile.memberships[0];
    const isExpired = latestMembership ? new Date(latestMembership.endDate) < new Date() : true;
    const isActive = profile.membershipStatus === 'ACTIVE' && !isExpired;

    return NextResponse.json({
      isValid: isActive,
      membershipNumber: profile.membershipNumber,
      primaryName: profile.user.name,
      planName: latestMembership?.plan.name || 'Standard',
      status: isActive ? 'ACTIVE' : isExpired ? 'EXPIRED' : profile.membershipStatus,
      endDate: latestMembership?.endDate,
      familyMembers: profile.family?.familyMembers || [],
    });
  } catch (error: any) {
    console.error('Error verifying membership:', error);
    return NextResponse.json({ error: 'Internal server error verifying token.' }, { status: 500 });
  }
}
