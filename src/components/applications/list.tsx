import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

import { Flex, Grid, Text } from '@radix-ui/themes'

import type { GridProps } from '@radix-ui/themes'

import { ApplicationItem } from '@/components/applications/item'

export async function ApplicationsList(props: GridProps) {
  const session = await getSession()
  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const userId = session.user.id

  const applications = await prisma.application.findMany({
    where: {
      student: {
        userId: userId,
      },
    },
    include: {
      vacancy: {
        select: {
          id: true,
          title: true,
          employer: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (applications.length === 0) {
    return <Text>You have not applied for any vacancies yet.</Text>
  }

  return (
    <Grid columns="1" asChild {...props}>
      <ul>
        {applications.map((application, index) => (
          <ApplicationItem
            key={application.id}
            application={application}
            isLast={index === applications.length - 1}
            isFirst={index === 0}
          />
        ))}
      </ul>
    </Grid>
  )
}

export function ApplicationsListSkeleton() {
  return (
    <Grid columns="1" asChild>
      <ul>
        {[...Array(3)].map((_, index) => (
          <Flex
            key={index}
            direction="column"
            gap="3"
            pt={index === 0 ? '0' : '5'}
            pb={index === 3 - 1 ? '0' : '5'}
            asChild
          >
            <li
              style={{
                borderBottom: index === 3 - 1 ? 'none' : '1px solid var(--gray-4)',
              }}
            >
              <Flex justify="between" align="center">
                <div
                  style={{
                    width: '60%',
                    height: '20px',
                    backgroundColor: 'var(--gray-a3)',
                    borderRadius: 'var(--radius-2)',
                  }}
                />
                <div
                  style={{
                    width: '80px',
                    height: '20px',
                    backgroundColor: 'var(--gray-a3)',
                    borderRadius: 'var(--radius-2)',
                  }}
                />
              </Flex>
              <div
                style={{
                  width: '40%',
                  height: '18px',
                  backgroundColor: 'var(--gray-a3)',
                  borderRadius: 'var(--radius-2)',
                  marginTop: '12px',
                }}
              />
              <div
                style={{
                  width: '30%',
                  height: '14px',
                  backgroundColor: 'var(--gray-a3)',
                  borderRadius: 'var(--radius-2)',
                  marginTop: '12px',
                }}
              />
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  )
}
