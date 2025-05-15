'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { Role } from '@/generated/prisma';

const editProfileFormSchema = z.object({
  id: z.string().uuid('Некорректный id'),
  username: z.string().max(50, 'Не может превышать 50 символов'),
  email: z.string().email('Некорректный email').max(255, 'Не может превышать 255 символов'),
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

export async function editProfileAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = editProfileFormSchema.parse(Object.fromEntries(formData));

    const existingUser = await prisma.user.findUnique({
      where: {
        username: data.username,
        NOT: {
          id: data.id,
        },
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

    const commonUserData = {
      username: data.username,
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    if (data.role === 'STUDENT') {
      await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          ...commonUserData,
          student: {
            update: {
              university: data.university,
              major: data.major,
              graduationYear: data.graduationYear ? parseInt(data.graduationYear, 10) : undefined,
            },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          ...commonUserData,
          employer: {
            update: {
              companyName: data.companyName || '',
              industry: data.industry,
              website: data.website,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error('Error while editing profile:', error);

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
