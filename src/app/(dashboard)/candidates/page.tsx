import { Suspense } from 'react';

import { Flex, Heading } from '@radix-ui/themes';

import { Search } from '@/components/search';
import { CandidatesList } from '@/components/candidates/candidates-list';
import { CandidatesListSkeleton } from '@/components/candidates/candidates-list-skeleton';
import { loadSearchParams } from '@/components/candidates/search-params';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

import type { SearchParams } from 'nuqs';

interface CandidatesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CandidatesPage({ searchParams }: CandidatesPageProps) {
  await verifySession();

  const { search } = await loadSearchParams(searchParams);

  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Кандидаты</Heading>

      <Flex
        direction={{ initial: 'column', md: 'row' }}
        align={{ initial: 'stretch', md: 'center' }}
        gap='4'
      >
        <Search placeholder='Поиск кандидатов' aria-label='Поиск кандидатов' />
      </Flex>

      <Suspense key={search} fallback={<CandidatesListSkeleton />}>
        <CandidatesList searchParams={searchParams} />
      </Suspense>
    </Flex>
  );
}
