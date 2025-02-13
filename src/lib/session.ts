import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

interface Payload extends JWTPayload {
  username: string;
}

const KEY = new TextEncoder().encode(
  process.env.JWT_KEY || '5984e33f75d58948cb3d83ac7f528632'
);
const LOGIN_URL = '/login';
const DURATION = 8 * 60 * 60 * 1000;

const responseCookie = {
  name: 'session',
  options: { httpOnly: true },
  duration: DURATION,
};

export async function encrypt(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(KEY);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify<Payload>(session, KEY, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error(error);
    return null;
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
