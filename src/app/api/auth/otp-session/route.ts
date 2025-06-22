import { NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';

export async function POST(req: Request) {
  const { email } = await req.json();

  // Create a JWT token for the session
  const token = await encode({
    token: { email },
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  // Set the session cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set('next-auth.session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  return res;
} 