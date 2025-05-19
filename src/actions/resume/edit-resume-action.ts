'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const editResumeFormSchema = z.object({
  id: z.string(),
  experience: z.string(),
  skills: z.string(),
  education: z.string(),
  about: z.string(),
  categoryId: z.string(),
});

const SUCCESS_REDIRECT_URL = '/resume';

export async function editResumeAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = editResumeFormSchema.parse(Object.fromEntries(formData));

    const resume = await prisma.resume.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!resume) {
      return {
        defaultValues,
        success: false,
        errors: {
          form: 'Резюме не найдено',
        },
      };
    }

    await prisma.resume.update({
      where: {
        id: data.id,
      },
      data: {
        experience: data.experience,
        skills: data.skills,
        education: data.education,
        about: data.about,
        categoryId: data.categoryId,
      },
    });
  } catch (error) {
    console.error('Error editing resume:', error);

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
