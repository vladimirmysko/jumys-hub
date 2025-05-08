import { Suspense } from 'react'

import { Flex, Heading } from '@radix-ui/themes'

import { ApplicationsList, ApplicationsListSkeleton } from '@/components/applications/list'

export default function ApplicationsPage() {
  return (
    <Flex direction="column" gap="7" pb="8">
      <Heading size="3" weight="medium">
        My Applications
      </Heading>

      <Suspense fallback={<ApplicationsListSkeleton />}>
        <ApplicationsList />
      </Suspense>

      {/* Pagination can be added here later if needed */}
    </Flex>
  )
}
