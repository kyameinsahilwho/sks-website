import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token');

  // Extract the path
  const path = request.nextUrl.pathname;

  // Handle login page specially
  if (path === '/admin/login') {
    // If we have a valid token, redirect to dashboard
    if (adminToken) {
      try {
        verify(adminToken.value, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Invalid token - let them access login page
        return NextResponse.next();
      }
    }
    // No token - let them access login page
    return NextResponse.next();
  }

  // Protect all other /admin/* routes
  if (path.startsWith('/admin')) {
    try {
      if (!adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      verify(adminToken.value, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // All other routes proceed normally
  return NextResponse.next();
}