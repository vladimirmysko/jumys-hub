import { notFound } from 'next/navigation';

import { Container, Flex } from '@radix-ui/themes';

import { Logo } from '@/components/logo';
import { NavigationLink } from '@/components/navigation-link';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
  });

  if (!user) {
    notFound();
  }

  const studentLinks = [
    { label: 'Резюме', href: '/resume' },
    { label: 'Отклики', href: '/applications' },
  ];
  const employerLinks = [{ label: 'Соискатели', href: '/candidates' }];
  const commonLinks = [
    { label: 'Вакансии', href: '/vacancies' },
    { label: 'Профиль', href: '/profile' },
  ];

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

            <Flex direction='row' align='baseline' gap='5'>
              {user.role === 'STUDENT' &&
                studentLinks.map((link) => (
                  <NavigationLink key={link.href} href={link.href}>
                    {link.label}
                  </NavigationLink>
                ))}
              {user.role === 'EMPLOYER' &&
                employerLinks.map((link) => (
                  <NavigationLink key={link.href} href={link.href}>
                    {link.label}
                  </NavigationLink>
                ))}
              {commonLinks.map((link) => (
                <NavigationLink key={link.href} href={link.href}>
                  {link.label}
                </NavigationLink>
              ))}
            </Flex>
          </Flex>
          {children}
        </Flex>
      </Container>
    </Flex>
  );
}
