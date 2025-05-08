'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { createSession } from '@/lib/session'

import { hash } from 'bcryptjs'
import { z } from 'zod'

const registerUserActionSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.enum(['STUDENT', 'EMPLOYER']),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    university: z.string().optional(),
    major: z.string().optional(),
    graduationYear: z.string().optional(),
    companyName: z.string().optional(),
    industry: z.string().optional(),
    website: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  })

export type RegisterUserActionInput = z.infer<typeof registerUserActionSchema>

export const registerUserAction = actionClient
  .schema(registerUserActionSchema)
  .action(async ({ parsedInput }) => {
    const {
      username,
      email,
      password,
      role,
      firstName,
      lastName,
      university,
      major,
      graduationYear,
      companyName,
      industry,
      website,
    } = parsedInput

    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return {
        success: false,
        error: 'User with this username already exists',
      }
    }

    const hashedPassword = await hash(password, 10)

    let user

    try {
      if (role === 'STUDENT') {
        user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            student: {
              create: {
                university: university || undefined,
                major: major || undefined,
                graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
              },
            },
          },
        })
      } else {
        user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            employer: {
              create: {
                companyName: companyName || '',
                industry: industry || undefined,
                website: website || undefined,
              },
            },
          },
        })
      }
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: 'Error creating user' }
    }

    const { password: _, ...userForSession } = user

    await createSession({ user: userForSession })

    if (user.role === 'STUDENT') {
      redirect('/vacancies')
    }

    redirect('/resumes')
  })
