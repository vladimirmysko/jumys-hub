'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const createResumeFormSchema = z.object({
  userId: z.string(),
  experience: z.string(),
  skills: z.string(),
  education: z.string(),
  about: z.string(),
});

const SUCCESS_REDIRECT_URL = '/resume';

export async function createResumeAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = createResumeFormSchema.parse(Object.fromEntries(formData));

    const resume = await prisma.resume.findFirst({
      where: {
        student: {
          userId: data.userId,
        },
      },
    });
    if (resume) {
      return {
        defaultValues,
        success: false,
        errors: {
          form: 'Резюме уже существует',
        },
      };
    }

    await prisma.resume.create({
      data: {
        experience: data.experience,
        skills: data.skills,
        education: data.education,
        about: data.about,
        student: {
          connect: {
            userId: data.userId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error creating resume:', error);

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
