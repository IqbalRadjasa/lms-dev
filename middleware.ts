import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname.startsWith('/login');
  const isProtected = pathname.startsWith('/dashboard');

  // No token
  if (!token) {
    if (isProtected) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // Validate token with backend
  const res = await fetch(`${API_URL}/auth/validate`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  const isValid = res.ok;

  // Logged in → block login page
  if (isLoginPage && isValid) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Invalid token → kick to login
  if (!isValid && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};
