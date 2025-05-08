'use server'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { verifySession } from '@/lib/session'

import { z } from 'zod'

const applyForVacancySchema = z.object({
  vacancyId: z.string().uuid('Invalid vacancy ID'),
  coverLetter: z.string().max(2000, 'Cover letter must be less than 2000 characters').optional(),
})

export type ApplyForVacancyActionInput = z.infer<typeof applyForVacancySchema>

export const applyForVacancyAction = actionClient
  .schema(applyForVacancySchema)
  .action(async ({ parsedInput }) => {
    const session = await verifySession()

    if (!session.user) {
      return {
        success: false,
        error: 'User not authenticated',
      }
    }

    if (session.user.role !== 'STUDENT') {
      return {
        success: false,
        error: 'Only students can apply for vacancies',
      }
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    })

    if (!student) {
      return {
        success: false,
        error: 'Student profile not found',
      }
    }

    try {
      const vacancy = await prisma.vacancy.findUnique({
        where: { id: parsedInput.vacancyId },
      })

      if (!vacancy) {
        return {
          success: false,
          error: 'Vacancy not found',
        }
      }

      // Check if the student has already applied for this vacancy
      const existingApplication = await prisma.application.findUnique({
        where: {
          studentId_vacancyId: {
            studentId: student.id,
            vacancyId: parsedInput.vacancyId,
          },
        },
      })

      if (existingApplication) {
        return {
          success: false,
          error: 'You have already applied for this vacancy',
        }
      }

      await prisma.application.create({
        data: {
          studentId: student.id,
          vacancyId: parsedInput.vacancyId,
          coverLetter: parsedInput.coverLetter,
          status: 'PENDING',
        },
      })
    } catch (error) {
      console.error('Error applying for vacancy:', error)
      return {
        success: false,
        error: 'Error submitting application',
      }
    }

    redirect('/applications')
  })
