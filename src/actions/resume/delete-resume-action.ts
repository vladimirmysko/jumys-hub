'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const deleteResumeFormSchema = z.object({
  id: z.string(),
});

export async function deleteResumeAction(_prevState: unknown, formData: FormData) {
  try {
    const data = deleteResumeFormSchema.parse(Object.fromEntries(formData));

    const resume = await prisma.resume.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!resume) {
      return {
        success: false,
        errors: {
          form: 'Резюме не найдено',
        },
      };
    }

    await prisma.resume.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/resume');
  } catch (error) {
    console.error('Error deleting resume:', error);

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
}
