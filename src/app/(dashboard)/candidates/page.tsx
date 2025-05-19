import { Suspense } from 'react';

import { Flex, Heading } from '@radix-ui/themes';

import { Search } from '@/components/search';
import { SelectCategory } from '@/components/select-category';
import { CandidatesList } from '@/components/candidates/candidates-list';
import { CandidatesListSkeleton } from '@/components/candidates/candidates-list-skeleton';
import { loadSearchParams } from '@/components/candidates/search-params';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

import type { SearchParams } from 'nuqs';

interface CandidatesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CandidatesPage({ searchParams }: CandidatesPageProps) {
  await verifySession();

  const { category } = await loadSearchParams(searchParams);

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Кандидаты с резюме</Heading>

      <Flex
        direction={{ initial: 'column', md: 'row' }}
        align={{ initial: 'stretch', md: 'center' }}
        gap='4'
      >
        <Search placeholder='Поиск кандидатов с резюме' aria-label='Поиск кандидатов с резюме' />
        <SelectCategory categories={categories} />
      </Flex>

      <Suspense key={category} fallback={<CandidatesListSkeleton />}>
        <CandidatesList searchParams={searchParams} />
      </Suspense>
    </Flex>
  );
}
