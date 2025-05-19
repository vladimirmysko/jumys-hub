'use server';

import { z } from 'zod';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const updateApplicationStatusSchema = z.object({
  applicationId: z.string(),
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
});

export async function updateApplicationStatusAction(data: {
  applicationId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}) {
  try {
    const session = await verifySession();

    // Validate the input data
    const validation = updateApplicationStatusSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        error: 'Неверные параметры',
      };
    }

    // Get the user and check if they are an employer
    const user = await prisma.user.findUnique({
      where: {
        id: session.sub,
      },
      include: {
        employer: true,
      },
    });

    if (!user || user.role !== 'EMPLOYER' || !user.employer) {
      return {
        success: false,
        error: 'Доступно только для работодателей',
      };
    }

    // Get the application and check if this employer owns the vacancy
    const application = await prisma.application.findUnique({
      where: {
        id: data.applicationId,
      },
      include: {
        vacancy: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: 'Заявка не найдена',
      };
    }

    // Check if this employer owns the vacancy
    if (application.vacancy.employerId !== user.employer.id) {
      return {
        success: false,
        error: 'У вас нет прав на изменение статуса этой заявки',
      };
    }

    // Update the application status
    await prisma.application.update({
      where: {
        id: data.applicationId,
      },
      data: {
        status: data.status,
      },
    });

    revalidatePath(`/applications/${data.applicationId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating application status:', error);
    return {
      success: false,
      error: 'Не удалось обновить статус заявки',
    };
  }
}
