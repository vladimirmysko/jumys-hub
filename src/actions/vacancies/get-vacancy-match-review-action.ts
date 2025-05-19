'use server';

import { revalidatePath } from 'next/cache';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const model = openai('o4-mini');

const getVacancyMatchReviewFormSchema = z.object({
  vacancyId: z.string(),
  studentId: z.string(),
});

const reviewSchema = z.object({
  comment: z
    .string()
    .describe('Комментарий к сочетанию вакансии и студента. Максимум 250 символов.'),
});

export async function getVacancyMatchReviewAction(_prevState: unknown, formData: FormData) {
  try {
    const data = getVacancyMatchReviewFormSchema.parse(Object.fromEntries(formData));

    const [vacancy, student] = await Promise.all([
      prisma.vacancy.findFirst({
        where: {
          id: data.vacancyId,
        },
      }),
      prisma.student.findFirst({
        where: {
          id: data.studentId,
        },
        include: {
          resume: true,
        },
      }),
    ]);

    if (!vacancy || !student || !student.resume) {
      return {
        success: false,
        errors: {
          form: 'Вакансия или студент не найдены',
        },
      };
    }

    const review = await prisma.vacancyMatchingReview.findFirst({
      where: {
        vacancyId: data.vacancyId,
        studentId: data.studentId,
      },
    });
    if (review) {
      return {
        success: false,
        errors: {
          form: 'Отзыв уже существует',
        },
      };
    }

    const { object } = await generateObject({
      model,
      system:
        `Вы — ассистент веб‑приложения Jumys Hub по подбору вакансии и студента. ` +
        `Ваша задача — проанализировать резюме и вакансию и выдать комментарии.` +
        `Ваш комментарии будет адресован к студенту. ` +
        `Используйте только русский язык. `,
      schema: reviewSchema,
      messages: [
        {
          role: 'user',
          content:
            `Вакансия: ${vacancy.title} ${vacancy.description}. ` +
            `Резюме: ${student.resume.about}, ${student.resume.experience}, ${student.resume.education}, ${student.resume.skills}. `,
        },
      ],
    });

    await prisma.vacancyMatchingReview.create({
      data: {
        vacancyId: data.vacancyId,
        studentId: data.studentId,
        comment: object.comment,
      },
    });

    revalidatePath(`/vacancies/${data.vacancyId}`);
  } catch (error) {
    console.error('Error getting vacancy match review:', error);

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
