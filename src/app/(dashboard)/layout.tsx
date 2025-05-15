import { Container, Flex } from '@radix-ui/themes';

import { Logo } from '@/components/logo';
import { Navigation } from '@/components/navigation';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction='column' align='stretch' minHeight='100vh'>
      <Container size='4'>
        <Flex direction='column' align='stretch' px='4'>
          <Flex
            direction='row'
            justify='between'
            align='center'
            height='3.5rem'
            style={{ borderBottom: '1px solid var(--gray-a4)' }}
          >
            <Logo />
            <Navigation />
          </Flex>
          {children}
        </Flex>
      </Container>
    </Flex>
  );
}
