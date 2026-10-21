import { NextResponse } from 'next/server';
import { SESSION_COOKIE_OPTIONS } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Signed out successfully.' });
  res.cookies.delete(SESSION_COOKIE_OPTIONS.name);
  return res;
}

export async function GET() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  res.cookies.delete(SESSION_COOKIE_OPTIONS.name);
  return res;
}
