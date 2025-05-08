'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'
import { createSession } from '@/lib/session'

import { compare } from 'bcryptjs'
import { z } from 'zod'

const signInActionSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type SignInActionInput = z.infer<typeof signInActionSchema>

export const signInAction = actionClient
  .schema(signInActionSchema)
  .action(async ({ parsedInput }) => {
    const { username, password } = parsedInput

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return { success: false, error: 'Invalid username or password' }
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid username or password' }
    }

    const { password: _p, ...userForSession } = user

    await createSession({ user: userForSession })

    if (user.role === 'STUDENT') {
      redirect('/vacancies')
    }
    redirect('/resumes')
  })
