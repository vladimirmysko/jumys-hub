'use client'

import { useState, useTransition } from 'react'

import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  Heading,
  Link,
  SegmentedControl,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import type { FlexProps } from '@radix-ui/themes'

import { registerUserAction } from '@/actions/auth/register-user-action'
import type { RegisterUserActionInput } from '@/actions/auth/register-user-action'

import { Logo } from '@/components/logo'

import { useScopedI18n } from '@/locales/client'

export function RegisterForm(props: Omit<FlexProps, 'asChild' | 'children'>) {
  const t = useScopedI18n('register')
  const [isPending, startTransition] = useTransition()

  const [role, setRole] = useState<'STUDENT' | 'EMPLOYER'>('STUDENT')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    startTransition(async () => {
      try {
        const actionResult = await registerUserAction({
          ...(data as RegisterUserActionInput),
          role,
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
    <Flex
      direction="column"
      align="stretch"
      gap="6"
      maxWidth="28rem"
      width="100%"
      asChild
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <Logo />

        <Flex direction="column" align="stretch" gap="2">
          <Heading weight="medium">{t('title')}</Heading>
          <Text size="2" color="gray">
            {t('description')}{' '}
            <Link
              href="/sign-in"
              size="2"
              color="gray"
              weight="medium"
              underline="hover"
              highContrast
            >
              {t('sign_in')}
            </Link>
          </Text>
        </Flex>

        <SegmentedControl.Root
          value={role}
          size="3"
          onValueChange={value => setRole(value as 'STUDENT' | 'EMPLOYER')}
        >
          <SegmentedControl.Item value="STUDENT">{t('student')}</SegmentedControl.Item>
          <SegmentedControl.Item value="EMPLOYER">{t('employer')}</SegmentedControl.Item>
        </SegmentedControl.Root>

        <Separator size="4" />

        <Flex direction="column" gap="5">
          <Heading size="4" as="h2" weight="medium">
            {t('account_information')}
          </Heading>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="username">
              {t('username')}
            </Text>
            <TextField.Root name="username" id="username" placeholder="john.doe" required size="3">
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="email">
              {t('email')}
            </Text>
            <TextField.Root
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              type="email"
              required
              size="3"
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="password">
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
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="confirmPassword">
              {t('confirm_password')}
            </Text>
            <TextField.Root
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              size="3"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </Flex>

        <Separator size="4" />

        <Flex direction="column" gap="5">
          <Heading size="4" as="h2" weight="medium">
            {t('personal_information')}
          </Heading>

          <Flex gap="3" style={{ width: '100%' }}>
            <Flex direction="column" align="stretch" gap="2" flexGrow="1">
              <Text as="label" size="2" weight="medium" htmlFor="firstName">
                {t('first_name')}
              </Text>
              <TextField.Root name="firstName" id="firstName" placeholder="John" size="3" />
            </Flex>
            <Flex direction="column" align="stretch" gap="2" flexGrow="1">
              <Text as="label" size="2" weight="medium" htmlFor="lastName">
                {t('last_name')}
              </Text>
              <TextField.Root name="lastName" id="lastName" placeholder="Doe" size="3" />
            </Flex>
          </Flex>

          {role === 'STUDENT' && (
            <>
              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="university">
                  {t('university')}
                </Text>
                <TextField.Root
                  name="university"
                  id="university"
                  placeholder="University of XYZ"
                  size="3"
                />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="major">
                  {t('major')}
                </Text>
                <TextField.Root name="major" id="major" placeholder="Computer Science" size="3" />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="graduationYear">
                  {t('graduation_year')}
                </Text>
                <TextField.Root
                  name="graduationYear"
                  id="graduationYear"
                  type="number"
                  placeholder="2025"
                  size="3"
                />
              </Flex>
            </>
          )}

          {role === 'EMPLOYER' && (
            <>
              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="companyName">
                  {t('company_name')}
                </Text>
                <TextField.Root
                  name="companyName"
                  id="companyName"
                  placeholder="ABC Corp"
                  required={role === 'EMPLOYER'}
                  size="3"
                />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="industry">
                  {t('industry')}
                </Text>
                <TextField.Root name="industry" id="industry" placeholder="Technology" size="3" />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="website">
                  {t('website')}
                </Text>
                <TextField.Root
                  name="website"
                  id="website"
                  type="url"
                  placeholder="https://www.abccorp.com"
                  size="3"
                />
              </Flex>
            </>
          )}
        </Flex>

        <Separator size="4" />

        <Button type="submit" size="3" loading={isPending} highContrast>
          {t('register')}
        </Button>
      </form>
    </Flex>
  )
}
