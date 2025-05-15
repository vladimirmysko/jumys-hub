'use client';

import { useActionState, useState } from 'react';

import NextLink from 'next/link';

import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Flex, Grid, Heading, Link, Radio, Text, TextField } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

import { Logo } from '@/components/logo';

import { registerAction } from '@/actions/auth/register-action';

import type { Role } from '@/generated/prisma';

export function RegisterForm(props: Omit<GridProps, 'asChild' | 'children'>) {
  const [state, formAction, isPending] = useActionState(registerAction, {
    defaultValues: {
      username: '',
      email: '',
      role: 'STUDENT',
      firstName: '',
      lastName: '',
      university: '',
      major: '',
      graduationYear: '',
      companyName: '',
      industry: '',
      website: '',
    },
    success: false,
    errors: null,
  });

  const [role, setRole] = useState<Role | null>(null);

  return (
    <Grid columns='1' gap='8' asChild {...props}>
      <form action={formAction}>
        <Logo />

        <Grid columns='1' gap='2'>
          <Heading>Создать аккаунт</Heading>
          <Text size='2' color='gray'>
            Уже есть аккаунт?{' '}
            <Link weight='medium' underline='hover' asChild>
              <NextLink href='/sign-in'>Войти</NextLink>
            </Link>
            .
          </Text>
        </Grid>

        <Grid columns='1' gap='5'>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='username' size='2' color='gray' weight='medium' highContrast>
              Логин
            </Text>
            <TextField.Root
              id='username'
              name='username'
              placeholder='nurzhan.sadykov'
              disabled={isPending}
              defaultValue={state.defaultValues.username}
              aria-invalid={!!state.errors?.username}
              aria-errormessage='error-username'
              autoFocus
              required
              size='3'
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
            {state.errors?.username && (
              <Text id='error-username' size='1' color='red'>
                {state.errors.username}
              </Text>
            )}
          </Grid>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='email' size='2' color='gray' weight='medium' highContrast>
              Электронная почта
            </Text>
            <TextField.Root
              id='email'
              name='email'
              type='email'
              placeholder='nurzhan.sadykov@email.com'
              disabled={isPending}
              defaultValue={state.defaultValues.email}
              aria-invalid={!!state.errors?.email}
              aria-errormessage='error-email'
              required
              size='3'
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
            {state.errors?.email && (
              <Text id='error-email' size='1' color='red'>
                {state.errors.email}
              </Text>
            )}
          </Grid>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='password' size='2' color='gray' weight='medium' highContrast>
              Пароль
            </Text>
            <TextField.Root
              id='password'
              name='password'
              type='password'
              placeholder='••••••••'
              disabled={isPending}
              required
              size='3'
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Grid>
        </Grid>

        <Grid columns='1' gap='5'>
          <Flex gap='4' align='start'>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='firstName'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Имя
              </Text>
              <TextField.Root
                name='firstName'
                id='firstName'
                placeholder='Nurzhan'
                disabled={isPending}
                defaultValue={state.defaultValues.firstName}
                aria-invalid={!!state.errors?.firstName}
                aria-errormessage='error-firstName'
                size='3'
              />
              {state.errors?.firstName && (
                <Text id='error-firstName' size='1' color='red'>
                  {state.errors.firstName}
                </Text>
              )}
            </Grid>
            <Grid columns='1' align='stretch' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='lastName'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Фамилия
              </Text>
              <TextField.Root
                name='lastName'
                id='lastName'
                placeholder='Sadykov'
                disabled={isPending}
                defaultValue={state.defaultValues.lastName}
                aria-invalid={!!state.errors?.lastName}
                aria-errormessage='error-lastName'
                size='3'
              />
              {state.errors?.lastName && (
                <Text id='error-lastName' size='1' color='red'>
                  {state.errors.lastName}
                </Text>
              )}
            </Grid>
          </Flex>
          <Grid columns='1' gap='2'>
            <Text size='2' color='gray' weight='medium' highContrast>
              Роль
            </Text>
            <Flex direction='row' align='center' gap='4'>
              <Flex gap='2' align='center'>
                <Radio
                  name='role'
                  id='student'
                  value='STUDENT'
                  disabled={isPending}
                  defaultChecked={state.defaultValues.role === 'STUDENT'}
                  required
                  highContrast
                  onValueChange={(value) => setRole(value as Role)}
                />
                <Text as='label' htmlFor='student' size='2' color='gray' highContrast>
                  Студент
                </Text>
              </Flex>
              <Flex gap='2' align='center'>
                <Radio
                  name='role'
                  id='employer'
                  value='EMPLOYER'
                  disabled={isPending}
                  defaultChecked={state.defaultValues.role === 'EMPLOYER'}
                  required
                  highContrast
                  onValueChange={(value) => setRole(value as Role)}
                />
                <Text as='label' htmlFor='employer' size='2' color='gray' highContrast>
                  Работодатель
                </Text>
              </Flex>
            </Flex>
          </Grid>
        </Grid>

        {role === 'STUDENT' && (
          <Grid columns='1' gap='5'>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='university'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Учебное заведение
              </Text>
              <TextField.Root
                name='university'
                id='university'
                placeholder='ЗКАТУ'
                disabled={isPending}
                defaultValue={state.defaultValues.university}
                aria-invalid={!!state.errors?.university}
                aria-errormessage='error-university'
                size='3'
              />
              {state.errors?.university && (
                <Text id='error-university' size='1' color='red'>
                  {state.errors.university}
                </Text>
              )}
            </Grid>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text as='label' htmlFor='major' size='2' color='gray' weight='medium' highContrast>
                Специальность
              </Text>
              <TextField.Root
                name='major'
                id='major'
                placeholder='Программная инженерия'
                disabled={isPending}
                defaultValue={state.defaultValues.major}
                aria-invalid={!!state.errors?.major}
                aria-errormessage='error-major'
                size='3'
              />
              {state.errors?.major && (
                <Text id='error-major' size='1' color='red'>
                  {state.errors.major}
                </Text>
              )}
            </Grid>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='graduationYear'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Год окончания
              </Text>
              <TextField.Root
                name='graduationYear'
                id='graduationYear'
                type='number'
                disabled={isPending}
                defaultValue={state.defaultValues.graduationYear}
                aria-invalid={!!state.errors?.graduationYear}
                aria-errormessage='error-graduationYear'
                placeholder='2025'
                size='3'
              />
              {state.errors?.graduationYear && (
                <Text id='error-graduationYear' size='1' color='red'>
                  {state.errors.graduationYear}
                </Text>
              )}
            </Grid>
          </Grid>
        )}

        {role === 'EMPLOYER' && (
          <Grid columns='1' gap='5'>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='companyName'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Название компании
              </Text>
              <TextField.Root
                name='companyName'
                id='companyName'
                placeholder='ACME'
                disabled={isPending}
                defaultValue={state.defaultValues.companyName}
                aria-invalid={!!state.errors?.companyName}
                aria-errormessage='error-companyName'
                required
                size='3'
              />
              {state.errors?.companyName && (
                <Text id='error-companyName' size='1' color='red'>
                  {state.errors.companyName}
                </Text>
              )}
            </Grid>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text
                as='label'
                htmlFor='industry'
                size='2'
                color='gray'
                weight='medium'
                highContrast
              >
                Отрасль
              </Text>
              <TextField.Root
                name='industry'
                id='industry'
                placeholder='IT'
                disabled={isPending}
                defaultValue={state.defaultValues.industry}
                aria-invalid={!!state.errors?.industry}
                aria-errormessage='error-industry'
                size='3'
              />
              {state.errors?.industry && (
                <Text id='error-industry' size='1' color='red'>
                  {state.errors.industry}
                </Text>
              )}
            </Grid>
            <Grid columns='1' gap='2' flexGrow='1'>
              <Text as='label' htmlFor='website' size='2' color='gray' weight='medium' highContrast>
                Веб-сайт
              </Text>
              <TextField.Root
                name='website'
                id='website'
                type='url'
                placeholder='example.kz'
                disabled={isPending}
                defaultValue={state.defaultValues.website}
                aria-invalid={!!state.errors?.website}
                aria-errormessage='error-website'
                size='3'
              />
              {state.errors?.website && (
                <Text id='error-website' size='1' color='red'>
                  {state.errors.website}
                </Text>
              )}
            </Grid>
          </Grid>
        )}

        <Button type='submit' size='3' loading={isPending} highContrast>
          Создать аккаунт
        </Button>
      </form>
    </Grid>
  );
}
