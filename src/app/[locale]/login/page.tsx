import { Flex, Heading, Text, TextField, Button } from '@radix-ui/themes';
import { PersonIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Logo } from '@/components/logo';

export default function Page() {
  return (
    <Flex
      height="100vh"
      direction="column"
      justify="center"
      align="center"
      p="4"
    >
      <Flex direction="column" gap="6" maxWidth="24rem" width="100%" asChild>
        <form action="">
          <Flex direction="column" gap="2">
            <Logo />
            <Heading size="6">Вход в аккаунт</Heading>
          </Flex>

          <Flex direction="column" gap="5">
            <Flex direction="column" align="stretch" gap="2">
              <Text as="label" htmlFor="username" size="2" weight="bold">
                Username
              </Text>
              <TextField.Root
                size="3"
                name="username"
                id="username"
                placeholder="Your username"
                required
              >
                <TextField.Slot>
                  <PersonIcon />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
            <Flex direction="column" align="stretch" gap="2">
              <Text as="label" htmlFor="password" size="2" weight="bold">
                Password
              </Text>
              <TextField.Root
                size="3"
                name="password"
                type="password"
                id="password"
                placeholder="Your password"
                required
              >
                <TextField.Slot>
                  <LockClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
          </Flex>

          <Button size="3">Continue</Button>
        </form>
      </Flex>
    </Flex>
  );
}
