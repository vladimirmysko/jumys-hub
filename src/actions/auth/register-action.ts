'use server';

import { redirect } from 'next/navigation';

import { hash } from 'bcryptjs';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

import { Role, type User } from '@/generated/prisma';

const registerFormSchema = z.object({
  username: z.string().max(50, 'Не может превышать 50 символов'),
  email: z.string().email('Некорректный email').max(255, 'Не может превышать 255 символов'),
  password: z.string(),
  role: z.nativeEnum(Role),
  firstName: z.string().max(50, 'Не может превышать 50 символов').optional(),
  lastName: z.string().max(50, 'Не может превышать 50 символов').optional(),
  university: z.string().max(100, 'Не может превышать 100 символов').optional(),
  major: z.string().max(100, 'Не может превышать 100 символов').optional(),
  graduationYear: z.string().optional(),
  companyName: z.string().max(100, 'Не может превышать 100 символов').optional(),
  industry: z.string().max(100, 'Не может превышать 100 символов').optional(),
  website: z.string().max(255, 'Не может превышать 255 символов').optional(),
});

const SUCCESS_REDIRECT_URL = '/profile';

export async function registerAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = registerFormSchema.parse(Object.fromEntries(formData));

    const existingUser = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existingUser) {
      return {
        defaultValues,
        success: false,
        errors: {
          username: 'Пользователь с таким логином уже существует',
        },
      };
    }

    const hashedPassword = await hash(data.password, 10);

    const commonUserData = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    let user: User | null = null;
    if (data.role === 'STUDENT') {
      user = await prisma.user.create({
        data: {
          ...commonUserData,
          student: {
            create: {
              university: data.university,
              major: data.major,
              graduationYear: data.graduationYear ? parseInt(data.graduationYear, 10) : undefined,
            },
          },
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          ...commonUserData,
          employer: {
            create: {
              companyName: data.companyName || '',
              industry: data.industry,
              website: data.website,
            },
          },
        },
      });
    }

    await createSession({ sub: user.id });
  } catch (error) {
    console.error('Error during registration:', error);

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
