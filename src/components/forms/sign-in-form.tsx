'use client'

import { useTransition } from 'react'

import { Button, Flex, Grid, Heading, Link, Text, TextField } from '@radix-ui/themes'
import type { GridProps } from '@radix-ui/themes'

import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'

import { useScopedI18n } from '@/locales/client'

import { Logo } from '@/components/logo'

import { signInAction } from '@/actions/auth/sign-in-action'
import type { SignInActionInput } from '@/actions/auth/sign-in-action'

export function SignInForm(props: Omit<GridProps, 'asChild' | 'children'>) {
  const t = useScopedI18n('sign_in')

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    startTransition(async () => {
      try {
        const actionResult = await signInAction({
          ...(data as SignInActionInput),
        })

        if (!actionResult?.data?.success) {
          alert(actionResult?.data?.error)
        }
      } catch (error) {
        console.error('Error during registration:', error)
      }
    })
  }

  return (
    <Grid columns="1" gap="7" maxWidth="28rem" width="100%" asChild {...props}>
      <form onSubmit={handleSubmit}>
        <Logo />

        <Flex direction="column" align="stretch" gap="2">
          <Heading>{t('title')}</Heading>
          <Text size="2" color="gray">
            {t('description')}{' '}
            <Link
              href="/register"
              size="2"
              color="gray"
              weight="medium"
              underline="hover"
              highContrast
            >
              {t('register')}
            </Link>
          </Text>
        </Flex>

        <Grid columns="1" gap="5">
          <Grid columns="1" gap="2">
            <Text as="label" htmlFor="username" size="2" weight="medium">
              {t('username')}
            </Text>
            <TextField.Root name="username" id="username" placeholder="john.doe" required size="3">
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Grid>
          <Grid columns="1" gap="2">
            <Text as="label" htmlFor="password" size="2" weight="medium">
              {t('password')}
            </Text>
            <TextField.Root
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              size="3"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Grid>
        </Grid>

        <Button type="submit" size="3" loading={isPending} highContrast>
          {t('sign_in')}
        </Button>
      </form>
    </Grid>
  )
}
