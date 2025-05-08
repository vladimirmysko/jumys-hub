import { redirect } from 'next/navigation'
import NextLink from 'next/link'

import { JOB_TYPE_LABELS } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/session'

import { DataList, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes'
import { CheckCircledIcon, CheckIcon, ChevronLeftIcon } from '@radix-ui/react-icons'

import { format } from 'date-fns'

import { ApplicationForm } from '@/components/forms/application-form'

export default async function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await verifySession()

  if (!session.user) {
    redirect('/sign-in')
  }

  const vacancy = await prisma.vacancy.findUnique({
    where: { id },
    include: {
      employer: true,
      category: true,
    },
  })

  if (!vacancy) {
    return <Text>Vacancy not found.</Text>
  }

  let hasApplied = false
  if (session.user.role === 'STUDENT') {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    })

    if (student) {
      const existingApplication = await prisma.application.findUnique({
        where: {
          studentId_vacancyId: {
            studentId: student.id,
            vacancyId: id,
          },
        },
      })
      hasApplied = !!existingApplication
    }
  }

  return (
    <Grid columns="1" gap="8">
      <Link size="2" weight="medium" underline="hover" highContrast asChild>
        <NextLink href="/vacancies">
          <Flex gap="1" align="center">
            <ChevronLeftIcon />
            Back to Vacancies
          </Flex>
        </NextLink>
      </Link>

      <Heading weight="medium" size="3">
        {vacancy.title}
      </Heading>

      {hasApplied && (
        <Text size="2" color="green" asChild>
          <Flex gap="1" align="center">
            <CheckIcon />
            You have already applied for this vacancy
          </Flex>
        </Text>
      )}

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Company</DataList.Label>
          <DataList.Value>{vacancy.employer.companyName}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Category</DataList.Label>
          <DataList.Value>{vacancy.category.name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Description</DataList.Label>
          <DataList.Value>{vacancy.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Location</DataList.Label>
          <DataList.Value>{vacancy.location}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Salary</DataList.Label>
          <DataList.Value>{vacancy.salary ? `${vacancy.salary}` : 'Not specified'}</DataList.Value>
        </DataList.Item>
        {vacancy.jobType && (
          <DataList.Item>
            <DataList.Label>Type</DataList.Label>
            <DataList.Value>{JOB_TYPE_LABELS[vacancy.jobType]}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Posted</DataList.Label>
          <DataList.Value>{format(vacancy.createdAt, 'PPP')}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {session.user.role === 'STUDENT' && !hasApplied && (
        <Grid columns="1" gap="5">
          <ApplicationForm vacancyId={id} />
        </Grid>
      )}
    </Grid>
  )
}
