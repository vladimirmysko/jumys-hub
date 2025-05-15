import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { type JWTPayload, SignJWT, jwtVerify } from 'jose';

import { env } from '@/lib/env';

const KEY = new TextEncoder().encode(env.JWT_SECRET_KEY);

export const SESSION_COOKIE_NAME = 'session';
export const SIGN_IN_PATH = '/sign-in';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const JWT_EXPIRATION_TIME = '7d';
const JWT_ALGORITHM = 'HS256';

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(KEY);
}

export async function decrypt(session: string | undefined = '') {
  if (!session) {
    return null;
  }
  try {
    const { payload } = await jwtVerify<JWTPayload>(session, KEY, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session: ', error);
    return null;
  }
}

export async function createSession(payload: JWTPayload) {
  const expires = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: session,
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie.value);

  return session;
}

export async function verifySession() {
  const session = await getSession();

  if (!session) {
    redirect(SIGN_IN_PATH);
  }

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect(SIGN_IN_PATH);
}
