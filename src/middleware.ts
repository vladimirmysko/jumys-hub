import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME, SIGN_IN_PATH, decrypt } from '@/lib/session';

const SUCCESS_REDIRECT_PATH = '/profile';

const protectedRoutes = ['/profile', '/resume', '/vacancies'];
const publicRoutes = ['/sign-in', '/register', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL(SIGN_IN_PATH, req.nextUrl));
  }

  if (isPublicRoute && session?.sub && !req.nextUrl.pathname.startsWith(SUCCESS_REDIRECT_PATH)) {
    return NextResponse.redirect(new URL(SUCCESS_REDIRECT_PATH, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
