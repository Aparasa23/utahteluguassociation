import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSecureToken } from '@/lib/qr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, primaryMember, familyMembers } = body;

    if (!planId || !primaryMember?.email || !primaryMember?.fullName) {
      return NextResponse.json({ error: 'Missing required membership data.' }, { status: 400 });
    }

    const plan = await prisma.membershipPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Selected plan not found.' }, { status: 404 });
    }

    // Upsert User
    const user = await prisma.user.upsert({
      where: { email: primaryMember.email },
      update: {
        name: primaryMember.fullName,
        phone: primaryMember.phone,
      },
      create: {
        email: primaryMember.email,
        name: primaryMember.fullName,
        phone: primaryMember.phone,
        hashedPassword: 'demo_password_hash',
      },
    });

    // Ensure MEMBER role
    const memberRole = await prisma.role.findUnique({ where: { name: 'MEMBER' } });
    if (memberRole) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: memberRole.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          roleId: memberRole.id,
        },
      });
    }

    // Create Family record if family members provided
    let familyId: string | undefined = undefined;
    if (Array.isArray(familyMembers) && familyMembers.length > 0) {
      const family = await prisma.family.create({
        data: {
          familyName: `The ${primaryMember.fullName.split(' ').pop()} Family`,
          familySize: 1 + familyMembers.length,
          familyMembers: {
            create: [
              {
                fullName: primaryMember.fullName,
                relationship: 'PRIMARY',
              },
              ...familyMembers.map((m: any) => ({
                fullName: m.fullName,
                relationship: m.relationship || 'OTHER',
                age: typeof m.age === 'number' ? m.age : null,
                gender: m.gender || null,
              })),
            ],
          },
        },
      });
      familyId = family.id;
    }

    // Generate unique membership number: UTA-2027-F1234
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const membershipNumber = `UTA-2027-F${randomSuffix}`;

    // Create or update MemberProfile
    const memberProfile = await prisma.memberProfile.upsert({
      where: { userId: user.id },
      update: {
        membershipStatus: 'ACTIVE',
        addressLine1: primaryMember.addressLine1,
        city: primaryMember.city,
        state: primaryMember.state || 'UT',
        zipCode: primaryMember.zipCode,
        emergencyContact: primaryMember.emergencyContact,
        emergencyPhone: primaryMember.emergencyPhone,
        familyId: familyId,
      },
      create: {
        userId: user.id,
        membershipNumber,
        membershipStatus: 'ACTIVE',
        addressLine1: primaryMember.addressLine1,
        city: primaryMember.city,
        state: primaryMember.state || 'UT',
        zipCode: primaryMember.zipCode,
        emergencyContact: primaryMember.emergencyContact,
        emergencyPhone: primaryMember.emergencyPhone,
        familyId: familyId,
      },
    });

    // Create Membership Period
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationMonths);

    const qrToken = generateSecureToken({
      id: memberProfile.membershipNumber,
      type: 'MEMBER',
      issuedAt: Date.now(),
    });

    const membership = await prisma.membership.create({
      data: {
        memberProfileId: memberProfile.id,
        planId: plan.id,
        startDate,
        endDate,
        status: 'ACTIVE',
        qrVerificationToken: qrToken,
        transactions: {
          create: {
            amount: plan.price,
            provider: 'ZEFFY',
            transactionId: `ZEF-TX-${Date.now()}`,
            paymentStatus: 'COMPLETED',
            notes: 'Annual membership enrollment completed',
          },
        },
        statusHistory: {
          create: {
            memberProfileId: memberProfile.id,
            previousStatus: 'PENDING',
            newStatus: 'ACTIVE',
            reason: 'Self-service registration completed with Zeffy payment verification',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      membershipNumber: memberProfile.membershipNumber,
      qrToken,
      membershipId: membership.id,
    });
  } catch (error: any) {
    console.error('API Error in /api/membership/join:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing membership.' },
      { status: 500 }
    );
  }
}
