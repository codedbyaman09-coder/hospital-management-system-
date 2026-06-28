import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Define paths that require authentication
const protectedPaths = ['/admin', '/patient', '/doctor', '/staff'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // 1. If user is logged in and tries to access login or register page,
  // redirect them away (to admin or their dashboard) so they can't go back to login.
  if (token && (pathname === '/login' || pathname === '/register')) {
    // We default to /admin here to ensure they never see the login page if logged in.
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 2. If user is trying to access a protected dashboard but has no token,
  // redirect them to the login page.
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
