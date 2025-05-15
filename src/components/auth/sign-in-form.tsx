'use client';

import { useActionState } from 'react';

import NextLink from 'next/link';

import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button, Grid, Heading, Link, Text, TextField } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

import { Logo } from '@/components/logo';

import { signInAction } from '@/actions/auth/sign-in-action';

export function SignInForm(props: Omit<GridProps, 'asChild' | 'children'>) {
  const [state, formAction, isPending] = useActionState(signInAction, {
    defaultValues: {
      username: '',
    },
    success: false,
    errors: null,
  });

  return (
    <Grid columns='1' gap='7' asChild {...props}>
      <form action={formAction}>
        <Logo />

        <Grid columns='1' gap='2'>
          <Heading>Добро пожаловать</Heading>
          <Text size='2' color='gray'>
            Нет аккаунта?{' '}
            <Link weight='medium' underline='hover' asChild>
              <NextLink href='/register'>Создать</NextLink>
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

        <Button type='submit' size='3' loading={isPending} highContrast>
          Войти
        </Button>
      </form>
    </Grid>
  );
}
