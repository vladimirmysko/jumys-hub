'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const deleteVacancyFormSchema = z.object({
  id: z.string(),
});

export async function deleteVacancyAction(_prevState: unknown, formData: FormData) {
  try {
    const data = deleteVacancyFormSchema.parse(Object.fromEntries(formData));

    const vacancy = await prisma.vacancy.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!vacancy) {
      return {
        success: false,
        errors: {
          form: 'Вакансия не найдена',
        },
      };
    }

    // Delete related applications first
    await prisma.application.deleteMany({
      where: {
        vacancyId: data.id,
      },
    });

    // Then delete the vacancy
    await prisma.vacancy.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/vacancies');
  } catch (error) {
    console.error('Error deleting vacancy:', error);

    if (error instanceof z.ZodError) {
      return {
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
        success: false,
        errors: {
          form: error.message,
        },
      };
    }

    return {
      success: false,
      errors: null,
    };
  }

  return { success: true };
}
