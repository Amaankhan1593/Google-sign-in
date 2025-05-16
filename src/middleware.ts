import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
const { pathname } = req.nextUrl;
if (pathname === '/confirm' && req.cookies.get('signupInitiated')?.value !== 'true') {
    return NextResponse.redirect(new URL('/signup', req.url));
  }
  if (pathname.startsWith('/welcome') && !req.cookies.get('accessToken')?.value) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/confirm', '/welcome/:path*'] };
