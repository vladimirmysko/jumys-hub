'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { verifySession } from '@/lib/session'
import { z } from 'zod'

// Schema for validating resume creation form data
const createResumeSchema = z.object({
  about: z
    .string()
    .min(10, 'About section must be at least 10 characters')
    .max(2000, 'About section must be less than 2000 characters'),
  experience: z
    .string()
    .min(10, 'Experience section must be at least 10 characters')
    .max(2000, 'Experience section must be less than 2000 characters'),
  skills: z
    .string()
    .min(5, 'Skills section must be at least 5 characters')
    .max(1000, 'Skills section must be less than 1000 characters'),
  education: z
    .string()
    .min(5, 'Education section must be at least 5 characters')
    .max(1000, 'Education section must be less than 1000 characters'),
})

export type CreateResumeActionInput = z.infer<typeof createResumeSchema>

export const createResumeAction = actionClient
  .schema(createResumeSchema)
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
        error: 'Only students can create resumes',
      }
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: { resume: true },
    })

    if (!student) {
      return {
        success: false,
        error: 'Student profile not found',
      }
    }

    try {
      if (student.resume) {
        await prisma.resume.update({
          where: { id: student.resume.id },
          data: parsedInput,
        })
      } else {
        await prisma.resume.create({
          data: {
            ...parsedInput,
            studentId: student.id,
          },
        })
      }
    } catch (error) {
      console.error('Error creating/updating resume:', error)
      return {
        success: false,
        error: 'Error creating or updating resume',
      }
    }

    redirect('/resume')
  })
