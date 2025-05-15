'use server';

import { redirect } from 'next/navigation';

import { compare } from 'bcryptjs';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

const signInFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const SUCCESS_REDIRECT_URL = '/profile';

export async function signInAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = signInFormSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (!user) {
      return {
        defaultValues,
        success: false,
        errors: {
          username: 'Пользователь не найден',
        },
      };
    }

    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
      return {
        defaultValues,
        success: false,
        errors: {
          username: 'Пользователь не найден',
        },
      };
    }

    await createSession({ sub: user.id });
  } catch (error) {
    console.error('Error during sign-in:', error);

    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ]),
        ),
      };
    }

    if (error instanceof Error) {
      return {
        defaultValues,
        success: false,
        errors: {
          form: error.message,
        },
      };
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    };
  }

  redirect(SUCCESS_REDIRECT_URL);
}
