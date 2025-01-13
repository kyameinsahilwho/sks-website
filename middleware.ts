import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page without redirection loop
    if (request.nextUrl.pathname === '/admin/login') {
      if (adminToken) {
        // If token exists, redirect to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // No token or invalid token, allow access to login page
      return NextResponse.next();
    }

    // For other admin routes, check if token exists
    if (!adminToken) {
      // No token, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};