'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const deleteApplicationFormSchema = z.object({
  id: z.string(),
});

export async function deleteApplicationAction(_prevState: unknown, formData: FormData) {
  try {
    const data = deleteApplicationFormSchema.parse(Object.fromEntries(formData));

    const application = await prisma.application.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!application) {
      return {
        success: false,
        errors: {
          form: 'Отклик не найден',
        },
      };
    }

    await prisma.application.delete({
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    console.error('Error deleting application:', error);

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

  redirect('/applications');
}
