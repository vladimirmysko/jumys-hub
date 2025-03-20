'use client';

import { useState } from 'react';

import NextLink from 'next/link';
import {
  Flex,
  Heading,
  Text,
  Link,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  type FlexProps,
} from '@radix-ui/themes';
import { CircleUserRound, LockKeyhole, Eye, EyeOff } from 'lucide-react';

export function LoginForm(props: Omit<FlexProps, 'children'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      direction="column"
      align="stretch"
      maxWidth="24rem"
      width="100%"
      gap="6"
      asChild
      {...props}
    >
      <form action="">
        <Flex direction="column" align="stretch" gap="2">
          <Heading>Вход в аккаунт</Heading>
          <Text size="2" color="gray">
            У Вас нет аккаунта?{' '}
            <NextLink href="/register" passHref legacyBehavior>
              <Link size="2" weight="medium">
                Зарегистрироваться
              </Link>
            </NextLink>
          </Text>
        </Flex>

        <Flex direction="column" align="stretch" gap="4">
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="username" size="2" weight="medium">
              Имя пользователя
            </Text>
            <TextField.Root
              name="username"
              id="username"
              placeholder="john.doe"
              required
              size="3"
            >
              <TextField.Slot>
                <CircleUserRound size={16} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" htmlFor="password" size="2" weight="medium">
              Пароль
            </Text>
            <TextField.Root
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              size="3"
            >
              <TextField.Slot>
                <LockKeyhole size={16} />
              </TextField.Slot>
              <TextField.Slot>
                <Tooltip
                  content={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <IconButton
                    type="button"
                    size="2"
                    variant="ghost"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconButton>
                </Tooltip>
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction="row" align="center" gap="2">
            <Checkbox id="remember-me" size="2" highContrast />
            <Text as="label" htmlFor="remember-me" size="2" weight="medium">
              Запомнить меня
            </Text>
          </Flex>
        </Flex>

        <Button type="submit" size="3">
          Войти
        </Button>
      </form>
    </Flex>
  );
}
