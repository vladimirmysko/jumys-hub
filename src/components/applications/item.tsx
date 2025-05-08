'use client'

import { useTransition } from 'react'
import NextLink from 'next/link'

import { deleteApplicationAction } from '@/actions/application/delete-application-action'

import { Badge, Button, Flex, Link, Text, Tooltip } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

import { format } from 'date-fns'

type ApplicationItemProps = {
  application: any
  isLast: boolean
  isFirst: boolean
}

export function ApplicationItem({ application, isLast, isFirst }: ApplicationItemProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this application?')) {
      startTransition(async () => {
        const result = await deleteApplicationAction({
          applicationId: application.id,
        })

        console.log(result)

        if (result?.data?.error) {
          alert(result?.data?.error || 'Failed to delete application')
        }
      })
    }
  }

  return (
    <Flex direction="column" gap="3" pt={isFirst ? '0' : '5'} pb={isLast ? '0' : '5'} asChild>
      <li
        style={{
          borderBottom: isLast ? 'none' : '1px solid var(--gray-4)',
        }}
      >
        <Flex justify="between" align="center">
          <Link size="2" weight="medium" underline="hover" highContrast asChild>
            <NextLink href={`/vacancies/${application.vacancy.id}`}>
              {application.vacancy.title}
            </NextLink>
          </Link>
          <Flex gap="2" align="center">
            <Badge color="gray">{application.status}</Badge>
            <Tooltip content="Delete application">
              <Button
                size="1"
                variant="ghost"
                color="red"
                onClick={handleDelete}
                disabled={isPending}
              >
                <TrashIcon />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Text size="2" color="gray">
          {application.vacancy.employer.companyName}
        </Text>
        <Text size="1" color="gray">
          Applied on: {format(application.createdAt, 'PPP')}
        </Text>
      </li>
    </Flex>
  )
}
