import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simple in‑memory rate limiter: ip → { attempts, firstAttempt }
const rateLimitMap = new Map<string, { attempts: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    (req as any).socket?.remoteAddress ||
    'unknown';

  // ---------- Rate limiting ----------
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (record) {
    if (now - record.firstAttempt > WINDOW_MS) {
      // reset window
      rateLimitMap.set(ip, { attempts: 0, firstAttempt: now });
    } else if (record.attempts >= MAX_ATTEMPTS) {
      console.warn(`[LOGIN] Rate limit exceeded – IP: ${ip} at ${new Date()}`);
      return NextResponse.json(
        { message: 'Too many attempts – try again later' },
        { status: 429 },
      );
    }
  } else {
    rateLimitMap.set(ip, { attempts: 0, firstAttempt: now });
  }

  // ---------- Parse body ----------
  let payload: { email: string; password: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
  const { email, password } = payload;

  // ---------- CSRF validation ----------
  const csrfHeader = req.headers.get('x-csrf-token') ?? '';
  const csrfCookie = req.headers
    .get('cookie')
    ?.match(/csrf_token=([^;]+)/)?.[1];
  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    console.warn(`[LOGIN] CSRF failure – IP: ${ip}`);
    return NextResponse.json({ message: 'Invalid CSRF token' }, { status: 403 });
  }

  // ---------- Credential verification ----------
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';
  const ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH ?? '';
  const emailMatches = email === ADMIN_EMAIL;
  const passwordMatches = emailMatches && (await bcrypt.compare(password, ADMIN_HASH));

  if (!passwordMatches) {
    const rec = rateLimitMap.get(ip);
    if (rec) rec.attempts += 1;
    console.warn(`[LOGIN] Failed attempt – IP: ${ip} at ${new Date()}`);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // ---------- Successful login ----------
  const token = jwt.sign({ sub: email, role: 'admin' }, process.env.JWT_SECRET ?? '', {
    expiresIn: '8h',
  });

  const response = NextResponse.json({ message: 'OK' });
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 60 * 60, // 8 hours in seconds
  });

  // Remove CSRF token after login (optional)
  response.cookies.delete('csrf_token');

  console.info(`[LOGIN] Successful admin login – IP: ${ip} at ${new Date()}`);
  rateLimitMap.delete(ip); // reset attempts on success

  return response;
}
