'use client';

import { useActionState } from 'react';

import {
  Grid,
  Flex,
  Heading,
  Text,
  Link,
  TextField,
  Button,
  type GridProps,
} from '@radix-ui/themes';
import {
  PersonIcon,
  LockClosedIcon,
  EnvelopeClosedIcon,
  MobileIcon,
} from '@radix-ui/react-icons';

import { registerAction } from '@/actions/auth/register-action';

export function RegisterForm(props: Omit<GridProps, 'asChild' | 'children'>) {
  const [state, formAction, pending] = useActionState(registerAction, null);

  console.log(state);

  return (
    <Grid columns="1" gap="7" maxWidth="28rem" width="100%" asChild {...props}>
      <form action={formAction}>
        <Flex direction="column" align="stretch" gap="2">
          <Heading>Create an account</Heading>
          <Text size="2" color="gray">
            Already have an account?{' '}
            <Link href="#" weight="medium" underline="hover">
              Sign in
            </Link>
          </Text>
        </Flex>

        <Flex direction="column" align="stretch" gap="5">
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="username" size="2" weight="medium">
              Username
            </Text>
            <TextField.Root
              id="username"
              name="username"
              placeholder="john.doe"
              disabled={pending}
              pattern="^[a-z0-9_.]+$"
              title="Username can only contain lowercase letters, numbers, underscores and dots"
              required
              size="3"
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
            {state?.errors?.username && (
              <Text size="2" weight="medium" color="red">
                {state.errors.username}
              </Text>
            )}
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="email" size="2" weight="medium">
              Email{' '}
              <Text as="span" color="gray" weight="regular">
                (optional)
              </Text>
            </Text>
            <TextField.Root
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              disabled={pending}
              size="3"
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Grid columns="2" gap="3">
            <Flex direction="column" align="stretch" gap="2">
              <Text as="label" htmlFor="firstName" size="2" weight="medium">
                First name
              </Text>
              <TextField.Root
                id="firstName"
                name="firstName"
                placeholder="John"
                disabled={pending}
                required
                size="3"
              />
            </Flex>
            <Flex direction="column" align="stretch" gap="2">
              <Text as="label" htmlFor="lastName" size="2" weight="medium">
                Last name
              </Text>
              <TextField.Root
                id="lastName"
                name="lastName"
                placeholder="Doe"
                disabled={pending}
                required
                size="3"
              />
            </Flex>
          </Grid>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="phoneNumber" size="2" weight="medium">
              Phone number{' '}
              <Text as="span" color="gray" weight="regular">
                (optional)
              </Text>
            </Text>
            <TextField.Root
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+1 (555) 123-4567"
              disabled={pending}
              pattern="^\+?[1-9]\d{1,14}$"
              title="Phone number must be a valid international phone number"
              size="3"
            >
              <TextField.Slot>
                <MobileIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="password" size="2" weight="medium">
              Password
            </Text>
            <TextField.Root
              id="password"
              name="password"
              type="password"
              placeholder="********"
              disabled={pending}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
              title="Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
              required
              size="3"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </Flex>

        <Button type="submit" size="3" loading={pending} highContrast>
          Register
        </Button>
      </form>
    </Grid>
  );
}
