import { prisma } from './prisma';
import { AppRole } from './rbac';

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    roles: AppRole[];
    membershipStatus?: string;
    membershipNumber?: string;
  };
}

// Fallback session helper for server components with cookie or default demo user
export async function getSession(userIdOrEmail?: string): Promise<AuthSession | null> {
  const query = userIdOrEmail
    ? {
        where: userIdOrEmail.includes('@')
          ? { email: userIdOrEmail }
          : { id: userIdOrEmail },
      }
    : {
        where: { email: 'admin@utahtelugu.org' }, // Default seed admin for demonstration
      };

  try {
    const user = await prisma.user.findFirst({
      ...query,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        memberProfile: true,
      },
    });

    if (!user) return null;

    const roles = user.userRoles.map((ur) => ur.role.name as AppRole);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: roles.length > 0 ? roles : ['GUEST'],
        membershipStatus: user.memberProfile?.membershipStatus,
        membershipNumber: user.memberProfile?.membershipNumber,
      },
    };
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}
