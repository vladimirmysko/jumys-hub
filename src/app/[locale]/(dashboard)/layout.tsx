import { Container, Flex, Grid } from '@radix-ui/themes'

import { Logo } from '@/components/logo'
import { Navigation } from '@/components/navigation'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Flex minHeight="100svh" direction="column" px="4">
      <Container size="3">
        <Grid columns="1" gap="7">
          <Flex direction="row" align="center" justify="between" height="4rem">
            <Logo />
            <Navigation />
          </Flex>
          {children}
        </Grid>
      </Container>
    </Flex>
  )
}
