import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from './prisma';
import { AppRole, hasPermission, AppResource, AppAction } from './rbac';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: AppRole[];
  membershipStatus?: string;
  membershipNumber?: string;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: number;
}

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  roles: AppRole[];
  membershipStatus?: string;
  membershipNumber?: string;
  exp: number;
  iat: number;
}

const SESSION_COOKIE_NAME = 'uta_session';
function getSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET || process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('A strong session secret is required');
  }
  return secret;
}

/**
 * Sign a payload using HMAC-SHA256
 */
export function createSessionToken(
  user: Omit<AuthUser, 'roles'> & { roles: AppRole[] },
  expiresInSeconds: number = 7 * 24 * 60 * 60 // 7 days default
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
    membershipStatus: user.membershipStatus,
    membershipNumber: user.membershipNumber,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and decode an HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadB64, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', getSecret())
      .update(payloadB64)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, 'utf8'),
        Buffer.from(expectedSig, 'utf8')
      )
    ) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Request-bound session getter.
 * Extracts cookie from current request headers, verifies signature and expiration.
 * NEVER returns a default or unverified identity. Returns null if not authenticated.
 */
export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const payload = verifySessionToken(sessionCookie.value);
    if (!payload) {
      return null;
    }

    // Return request-bound verified session
    return {
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        roles: payload.roles || ['MEMBER'],
        membershipStatus: payload.membershipStatus,
        membershipNumber: payload.membershipNumber,
      },
      expiresAt: payload.exp,
    };
  } catch {
    return null;
  }
}

/**
 * Server guard: throws or returns error response if unauthenticated.
 */
export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

/**
 * RBAC guard: verifies user is authenticated and possesses specific permission.
 */
export async function requirePermission(
  resource: AppResource,
  action: AppAction
): Promise<AuthSession> {
  const session = await requireAuth();
  if (!hasPermission(session.user.roles, resource, action)) {
    throw new Error('FORBIDDEN');
  }
  return session;
}

/**
 * Cookie options for setting authenticated sessions
 */
export const SESSION_COOKIE_OPTIONS = {
  name: SESSION_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
};
