'use server';

import { deleteSession } from '@/lib/session';

export async function signOutAction() {
  await deleteSession();
}
