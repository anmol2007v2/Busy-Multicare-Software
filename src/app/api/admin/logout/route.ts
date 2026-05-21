import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  // Delete the JWT cookie
  response.cookies.delete('admin_session', { path: '/' });
  // Optionally delete the CSRF token cookie as well
  response.cookies.delete('csrf_token', { path: '/' });
  return response;
}
