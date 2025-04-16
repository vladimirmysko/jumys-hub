'use client';

import { useState } from 'react';
import {
  SegmentedControl,
  Button,
  Flex,
  Heading,
  Link,
  Select,
  Separator,
  Text,
  TextField,
  type FlexProps,
} from '@radix-ui/themes';
import {
  PersonIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons';
import { Logo } from '@/components/logo';

export function RegisterForm(props: Omit<FlexProps, 'asChild' | 'children'>) {
  const [role, setRole] = useState<'STUDENT' | 'EMPLOYER'>('STUDENT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // For now, just logging the data - this will be replaced with an API call
      console.log('Form submitted with data:', { ...data, role });
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      // event.currentTarget.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Heading>Register</Heading>
          <Text size="2" color="gray">
            Already have an account?{' '}
            <Link
              href="#"
              size="2"
              color="gray"
              weight="medium"
              underline="hover"
              highContrast
            >
              Sign in
            </Link>
          </Text>
        </Flex>

        <SegmentedControl.Root
          value={role}
          size="3"
          onValueChange={(value) => setRole(value as 'STUDENT' | 'EMPLOYER')}
        >
          <SegmentedControl.Item value="STUDENT">Student</SegmentedControl.Item>
          <SegmentedControl.Item value="EMPLOYER">
            Employer
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <Separator size="4" />

        <Flex direction="column" gap="5">
          <Heading size="4" as="h2">
            Account Information
          </Heading>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="username">
              Username
            </Text>
            <TextField.Root
              name="username"
              id="username"
              placeholder="john.doe"
              required
              size="3"
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="email">
              Email
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
              Password
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
              Confirm Password
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
          <Heading size="4" as="h2">
            Personal Information
          </Heading>

          <Flex gap="3" style={{ width: '100%' }}>
            <Flex direction="column" align="stretch" gap="2" flexGrow="1">
              <Text as="label" size="2" weight="medium" htmlFor="firstName">
                First name
              </Text>
              <TextField.Root
                name="firstName"
                id="firstName"
                placeholder="John"
                size="3"
              />
            </Flex>
            <Flex direction="column" align="stretch" gap="2" flexGrow="1">
              <Text as="label" size="2" weight="medium" htmlFor="lastName">
                Last name
              </Text>
              <TextField.Root
                name="lastName"
                id="lastName"
                placeholder="Doe"
                size="3"
              />
            </Flex>
          </Flex>

          {role === 'STUDENT' && (
            <>
              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="university">
                  University
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
                  Major
                </Text>
                <TextField.Root
                  name="major"
                  id="major"
                  placeholder="Computer Science"
                  size="3"
                />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  htmlFor="graduationYear"
                >
                  Graduation year
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
                  Company name
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
                  Industry
                </Text>
                <TextField.Root
                  name="industry"
                  id="industry"
                  placeholder="Technology"
                  size="3"
                />
              </Flex>

              <Flex direction="column" align="stretch" gap="2">
                <Text as="label" size="2" weight="medium" htmlFor="website">
                  Website
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

        <Button type="submit" size="3" loading={isSubmitting} highContrast>
          Register
        </Button>
      </form>
    </Flex>
  );
}
