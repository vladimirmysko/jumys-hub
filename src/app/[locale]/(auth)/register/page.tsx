import { Flex } from '@radix-ui/themes';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100svh"
      px="4"
      py="8"
    >
      <RegisterForm />
    </Flex>
  );
}
