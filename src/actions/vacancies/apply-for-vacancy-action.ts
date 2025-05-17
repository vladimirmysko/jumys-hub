'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const applyForVacancyFormSchema = z.object({
  vacancyId: z.string(),
  studentId: z.string(),
  coverLetter: z.string().optional(),
});

const SUCCESS_REDIRECT_URL = '/applications';

export async function applyForVacancyAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = applyForVacancyFormSchema.parse(Object.fromEntries(formData));

    const vacancy = await prisma.vacancy.findUnique({
      where: { id: data.vacancyId },
    });

    if (!vacancy) {
      return {
        defaultValues,
        success: false,
        error: 'Вакансия не найдена',
      };
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_vacancyId: {
          studentId: data.studentId,
          vacancyId: data.vacancyId,
        },
      },
    });

    if (existingApplication) {
      return {
        defaultValues,
        success: false,
        error: 'Вы уже подали заявку на эту вакансию',
      };
    }

    await prisma.application.create({
      data: {
        studentId: data.studentId,
        vacancyId: data.vacancyId,
        coverLetter: data.coverLetter,
        status: 'PENDING',
      },
    });
  } catch (error) {
    console.error('Error applying for vacancy:', error);

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
