import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import type { User } from '@/generated/prisma';

interface Payload extends JWTPayload {
  user?: User;
}

const KEY = new TextEncoder().encode(
  process.env.JWT_KEY || '2860d34c54add71682eda43397d76d92'
);
const LOGIN_URL = '/login';
const DURATION = 7 * 24 * 60 * 60 * 1000;

const responseCookie = {
  name: 'session',
  options: { httpOnly: true },
  duration: DURATION,
};

export async function encrypt(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(KEY);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<Payload>(session, KEY, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(payload: Payload) {
  const expires = new Date(Date.now() + responseCookie.duration);
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set({
    name: responseCookie.name,
    value: session,
    expires,
    ...responseCookie.options,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(responseCookie.name);

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie.value);

  return session;
}

export async function verifySession() {
  const session = await getSession();

  if (!session) {
    redirect(LOGIN_URL);
  }

  return { ...session };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(responseCookie.name);
  redirect(LOGIN_URL);
}
