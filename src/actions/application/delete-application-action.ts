'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { verifySession } from '@/lib/session'

import { z } from 'zod'

const deleteApplicationSchema = z.object({
  applicationId: z.string(),
})

export type DeleteApplicationActionInput = z.infer<typeof deleteApplicationSchema>

export const deleteApplicationAction = actionClient
  .schema(deleteApplicationSchema)
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
        error: 'Only students can delete applications',
      }
    }

    const { applicationId } = parsedInput

    // Get the student associated with the current user
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    })

    if (!student) {
      return {
        success: false,
        error: 'Student profile not found',
      }
    }

    // Verify that the application belongs to the student
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    })

    if (!application) {
      return {
        success: false,
        error: 'Application not found',
      }
    }

    if (application.studentId !== student.id) {
      return {
        success: false,
        error: 'You do not have permission to delete this application',
      }
    }

    try {
      await prisma.application.delete({
        where: { id: applicationId },
      })
    } catch (error) {
      console.error('Error deleting application:', error)
      return {
        success: false,
        error: 'Error deleting application',
      }
    }

    revalidatePath('/applications')
  })
