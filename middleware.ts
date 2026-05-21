import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes: login page and auth APIs
  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/api/admin/login') ||
    pathname.startsWith('/api/admin/logout')
  ) {
    // For the login page generate a CSRF token if not already set
    if (pathname === '/admin/login') {
      const existing = request.cookies.get('csrf_token');
      if (!existing) {
        const token = crypto.randomUUID();
        const response = NextResponse.next();
        response.cookies.set('csrf_token', token, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/admin/login',
          secure: process.env.NODE_ENV === 'production',
        });
        return response;
      }
    }
    return NextResponse.next();
  }

  // Protect every other /admin/* route
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      jwt.verify(session, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
