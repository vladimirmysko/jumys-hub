import NextLink from 'next/link'
import { Container, Flex, Grid, Link } from '@radix-ui/themes'
import { Logo } from '@/components/logo'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const links = [
    { href: '/vacancies', label: 'Vacancies' },
    { href: '/applications', label: 'Applications' },
    { href: '/resume', label: 'Resume' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <Flex minHeight="100svh" direction="column" px="4">
      <Container size="3">
        <Grid columns="1" gap="7">
          <Flex direction="row" align="center" justify="between" height="4rem">
            <Logo />

            <Flex direction="row" align="center" gap="7">
              {links.map(link => (
                <Link
                  key={link.href}
                  size="2"
                  underline="hover"
                  weight="medium"
                  highContrast
                  asChild
                >
                  <NextLink href={link.href}>{link.label}</NextLink>
                </Link>
              ))}
            </Flex>
          </Flex>
          {children}
        </Grid>
      </Container>
    </Flex>
  )
}
