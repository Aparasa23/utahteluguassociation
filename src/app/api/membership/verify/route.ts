import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { tokenOrNumber } = body;

    if (!tokenOrNumber || typeof tokenOrNumber !== 'string') {
      return NextResponse.json(
        { error: 'Please enter a valid cryptographic QR verification token or membership ID.' },
        { status: 400 }
      );
    }

    const trimmed = tokenOrNumber.trim();

    // SEC-003: Strict input validation - must be at least 6 characters and cannot be generic numbers or wildcards
    if (trimmed.length < 6 || /^\d{1,5}$/.test(trimmed)) {
      return NextResponse.json(
        { error: 'Invalid identifier format. Please provide a complete Membership ID or QR pass token.' },
        { status: 400 }
      );
    }

    // Check optional authenticated session
    const session = await getSession();
    const isStaffOrAdmin =
      session &&
      (hasPermission(session.user.roles, 'members', 'read') ||
        hasPermission(session.user.roles, 'check_in', 'checkin'));

    // Exact match only against verified token or membershipNumber
    // ELIMINATED: phone substring matching and public raw email scanning
    const profile = await prisma.memberProfile.findFirst({
      where: {
        OR: [
          { membershipNumber: { equals: trimmed } },
          { memberships: { some: { qrVerificationToken: { equals: trimmed } } } },
        ],
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
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
        message: 'No matching Utah Telugu Association membership found for the provided token.',
      });
    }

    const latestMembership = profile.memberships[0];
    const isExpired = latestMembership
      ? new Date(latestMembership.endDate) < new Date()
      : true;
    const isActive = profile.membershipStatus === 'ACTIVE' && !isExpired;

    // Check if the authenticated user is looking at their own profile
    const isSelf = session?.user?.id === profile.user.id;

    // Safe public response: mask full names, never expose child/family lists to unauthenticated public
    if (!isStaffOrAdmin && !isSelf) {
      // Abbreviate name: "Venkat Rao" -> "V. R***"
      const nameParts = (profile.user.name || '').split(' ');
      const maskedName =
        nameParts.length > 1
          ? `${nameParts[0][0]}. ${nameParts[nameParts.length - 1][0]}***`
          : `${(profile.user.name || '')[0]}***`;

      return NextResponse.json({
        isValid: isActive,
        status: isActive ? 'ACTIVE' : isExpired ? 'EXPIRED' : profile.membershipStatus,
        planName: latestMembership?.plan?.name || 'Annual Membership',
        membershipNumber: profile.membershipNumber,
        memberInitials: maskedName,
        expirationDate: latestMembership?.endDate,
        requiresStaffAuthForRoster: true,
      });
    }

    // Authorized staff or self-verification response
    return NextResponse.json({
      isValid: isActive,
      status: isActive ? 'ACTIVE' : isExpired ? 'EXPIRED' : profile.membershipStatus,
      membershipNumber: profile.membershipNumber,
      primaryName: profile.user.name,
      email: profile.user.email,
      planName: latestMembership?.plan?.name || 'Standard Membership',
      endDate: latestMembership?.endDate,
      familyMembers: profile.family?.familyMembers || [],
    });
  } catch (error: any) {
    console.error('Error in membership verification:', error);
    return NextResponse.json(
      { error: 'Internal server error verifying token.' },
      { status: 500 }
    );
  }
}
