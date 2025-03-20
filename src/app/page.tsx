import { Flex } from '@radix-ui/themes';
import { LoginForm } from '@/components/forms/login-form';
import { Logo } from '@/components/logo';

export default function HomePage() {
  return (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Flex
        direction="row"
        align="center"
        px={{ initial: '4', sm: '5' }}
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="4rem"
      >
        <Logo />
      </Flex>

      <LoginForm />
    </Flex>
  );
}
