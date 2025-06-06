import { Flex } from '@radix-ui/themes';

import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return (
    <Flex direction='column' align='center' justify='center' px='4' py='8' minHeight='100vh'>
      <SignInForm maxWidth='24rem' width='100%' />
    </Flex>
  );
}
