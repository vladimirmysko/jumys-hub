import { Flex } from '@radix-ui/themes';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      px="4"
      py="6"
      minHeight="100svh"
    >
      <RegisterForm />
    </Flex>
  );
}
