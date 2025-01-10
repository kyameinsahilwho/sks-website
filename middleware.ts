import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Redirect to dashboard if already logged in and trying to access login page
    if (request.nextUrl.pathname === '/admin/login') {
      try {
        if (adminToken) {
          verify(adminToken.value, JWT_SECRET);
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } catch {
        // Invalid token, continue to login page
        return NextResponse.next();
      }
    }

    try {
      if (!adminToken) throw new Error('No token');
      verify(adminToken.value, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};