import { redirect } from 'next/navigation'
import NextLink from 'next/link'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/session'
import { Button, DataList, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { format } from 'date-fns'

export default async function ResumePage() {
  const session = await verifySession()

  if (!session.user) {
    redirect('/sign-in')
  }

  const user = session.user

  if (user.role !== 'STUDENT') {
    return (
      <Flex direction="column" gap="4">
        <Heading weight="medium">Resume</Heading>
        <Text>Only student accounts can have resumes.</Text>
      </Flex>
    )
  }

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: { resume: true },
  })

  if (!student) {
    return (
      <Flex direction="column" gap="4">
        <Heading weight="medium">Resume</Heading>
        <Text>Student profile not found.</Text>
      </Flex>
    )
  }

  const resume = student.resume

  if (!resume) {
    return (
      <Flex direction="column" align="start" gap="4">
        <Heading weight="medium" size="3">
          Resume
        </Heading>
        <Text size="2" color="gray">
          You haven't created a resume yet.
        </Text>
        <Button asChild>
          <NextLink href="/resume/create">Create resume</NextLink>
        </Button>
      </Flex>
    )
  }

  return (
    <Grid gap="7">
      <Flex justify="between" align="center">
        <Heading size="3" weight="medium">
          Resume
        </Heading>
        <Button asChild variant="soft">
          <NextLink href="/resume/edit">Edit resume</NextLink>
        </Button>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>About</DataList.Label>
          <DataList.Value>{resume.about}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Experience</DataList.Label>
          <DataList.Value>{resume.experience}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Skills</DataList.Label>
          <DataList.Value>{resume.skills}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Education</DataList.Label>
          <DataList.Value>{resume.education}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Last Updated</DataList.Label>
          <DataList.Value>{format(resume.updatedAt, 'PPP')}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Grid>
  )
}
