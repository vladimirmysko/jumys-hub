'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function registerAction(_prevState: unknown, formData: FormData) {
  const registerFormSchema = z.object({
    username: z.string(),
    email: z.optional(z.string()),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.optional(z.string()),
    password: z.string(),
  });

  try {
    // Validate form data
    const data = registerFormSchema.parse(Object.fromEntries(formData));

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      return {
        errors: {
          username: 'Username already exists',
        },
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
    });

    // Create session for the new user
    await createSession({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      };
    }

    console.error('Registration error:', error);

    return {
      errors: {
        server: 'An unexpected error occurred',
      },
    };
  }
  // Redirect to home page after successful registration
  redirect('/');
}
