import { redirect } from 'next/navigation'

import { Button, DataList, Flex, Grid, Heading } from '@radix-ui/themes'

import { prisma } from '@/lib/prisma'
import { deleteSession, verifySession } from '@/lib/session'

export async function signOut() {
  'use server'
  await deleteSession()
}

export default async function ProfilePage() {
  const session = await verifySession()

  if (!session.user) {
    redirect('/sign-in')
  }

  const user = session.user

  let employer = null
  let student = null

  if (user.role === 'EMPLOYER') {
    employer = await prisma.employer.findUnique({
      where: { userId: user.id },
    })
  } else if (user.role === 'STUDENT') {
    student = await prisma.student.findUnique({
      where: { userId: user.id },
    })
  }

  return (
    <Grid gap="7">
      <Heading size="5" weight="medium">
        Profile
      </Heading>

      <Flex direction="column" gap="5" align="stretch">
        <Heading as="h2" size="2" weight="medium">
          Account information
        </Heading>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Username</DataList.Label>
            <DataList.Value>{user.username}</DataList.Value>
          </DataList.Item>
          {user.firstName && (
            <DataList.Item>
              <DataList.Label>First Name</DataList.Label>
              <DataList.Value>{user.firstName}</DataList.Value>
            </DataList.Item>
          )}
          {user.lastName && (
            <DataList.Item>
              <DataList.Label>Last Name</DataList.Label>
              <DataList.Value>{user.lastName}</DataList.Value>
            </DataList.Item>
          )}
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>{user.email}</DataList.Value>
          </DataList.Item>
          {user.role && (
            <DataList.Item>
              <DataList.Label>Role</DataList.Label>
              <DataList.Value>{user.role === 'STUDENT' ? 'Student' : 'Employer'}</DataList.Value>
            </DataList.Item>
          )}
        </DataList.Root>
      </Flex>

      <Flex direction="column" gap="5" align="stretch">
        <Heading as="h2" size="2" weight="medium">
          Personal information
        </Heading>
        {user.role === 'EMPLOYER' && employer && (
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>Company name</DataList.Label>
              <DataList.Value>{employer.companyName}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Industry</DataList.Label>
              <DataList.Value>{employer.industry}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Website</DataList.Label>
              <DataList.Value>{employer.website}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        )}
        {user.role === 'STUDENT' && student && (
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>University</DataList.Label>
              <DataList.Value>{student.university}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Major</DataList.Label>
              <DataList.Value>{student.major}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Graduation year</DataList.Label>
              <DataList.Value>{student.graduationYear}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        )}
      </Flex>

      <form action={signOut}>
        <Button variant="soft" color="red">
          Sign Out
        </Button>
      </form>
    </Grid>
  )
}
