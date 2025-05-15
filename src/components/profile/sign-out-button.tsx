'use client';

import { useActionState } from 'react';

import { Button, Flex } from '@radix-ui/themes';
import type { FlexProps, ButtonProps } from '@radix-ui/themes';

import { signOutAction } from '@/actions/profile/sign-out-action';

interface SignOutButtonProps extends ButtonProps {
  containerProps?: Omit<FlexProps, 'asChild' | 'children'>;
}

export function SignOutButton({ containerProps, ...props }: SignOutButtonProps) {
  const [, formAction, isPending] = useActionState(signOutAction, null);

  return (
    <Flex asChild {...containerProps}>
      <form action={formAction}>
        <Button loading={isPending} color='red' variant='soft' {...props} />
      </form>
    </Flex>
  );
}
