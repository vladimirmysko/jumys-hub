'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const createVacancyFormSchema = z.object({
  employerId: z.string(),
  title: z.string().min(10, 'Заголовок должен содержать как минимум 10 символов'),
  categoryId: z.string(),
  description: z.string().min(30, 'Описание должно содержать как минимум 30 символов'),
  location: z.string().optional(),
  salary: z.string().optional(),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT', 'REMOTE']),
});

const SUCCESS_REDIRECT_URL = '/vacancies';

export async function createVacancyAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = createVacancyFormSchema.parse(Object.fromEntries(formData));

    const employer = await prisma.employer.findUnique({
      where: {
        id: data.employerId,
      },
    });

    if (!employer) {
      return {
        defaultValues,
        success: false,
        errors: {
          form: 'Работодатель не найден',
        },
      };
    }

    const category = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      return {
        defaultValues,
        success: false,
        errors: {
          form: 'Категория не найдена',
        },
      };
    }

    await prisma.vacancy.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location || null,
        salary: data.salary || null,
        jobType: data.jobType,
        isActive: true,
        employerId: data.employerId,
        categoryId: data.categoryId,
      },
    });

    revalidatePath('/vacancies');
  } catch (error) {
    console.error('Error creating vacancy:', error);

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
