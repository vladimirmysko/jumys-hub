import { Flex } from '@radix-ui/themes'

import { SignInForm } from '@/components/forms/sign-in-form'

export default function SignInPage() {
  return (
    <Flex direction="column" align="center" justify="center" minHeight="100svh" px="4" py="8">
      <SignInForm />
    </Flex>
  )
}
