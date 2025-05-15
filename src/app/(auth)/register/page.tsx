import { Flex } from '@radix-ui/themes';

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <Flex direction='column' align='center' justify='center' px='4' py='8' minHeight='100vh'>
      <RegisterForm maxWidth='24rem' width='100%' />
    </Flex>
  );
}
