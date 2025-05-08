import { redirect } from 'next/navigation'
import NextLink from 'next/link'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/session'
import { Flex, Grid, Heading, Link, Text } from '@radix-ui/themes'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { ResumeForm } from '@/components/forms/resume-form'

export default async function ResumeEditPage() {
  const session = await verifySession()

  if (!session.user) {
    redirect('/sign-in')
  }

  const user = session.user

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: { resume: true },
  })

  if (!student?.resume) {
    redirect('/resume')
  }

  return (
    <Grid gap="7">
      <Link size="2" weight="medium" underline="hover" highContrast asChild>
        <NextLink href="/resume">
          <Flex gap="1" align="center">
            <ChevronLeftIcon />
            Back to resume
          </Flex>
        </NextLink>
      </Link>

      <Flex direction="column" align="stretch" gap="2">
        <Heading size="3" weight="medium">
          Edit resume
        </Heading>
        <Text size="2" color="gray">
          Update your resume information below
        </Text>
      </Flex>

      <ResumeForm initialData={student.resume} isEdit={true} />
    </Grid>
  )
}
