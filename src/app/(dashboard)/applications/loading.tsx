import { Flex, Heading } from '@radix-ui/themes';

import { ApplicationsListSkeleton } from '@/components/applications/applications-list-skeleton';

export default function Loading() {
  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Отклики на вакансии</Heading>
      <ApplicationsListSkeleton />
    </Flex>
  );
}
