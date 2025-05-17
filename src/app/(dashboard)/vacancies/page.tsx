import { Suspense } from 'react';

import { Flex, Heading } from '@radix-ui/themes';

import { Search } from '@/components/search';
import { SelectCategory } from '@/components/vacancies/select-category';
import { SelectOrderBy } from '@/components/vacancies/select-order-by';
import { VacanciesList } from '@/components/vacancies/vacancies-list';
import { VacanciesListSkeleton } from '@/components/vacancies/vacancies-list-skeleton';
import { loadSearchParams } from '@/components/vacancies/search-params';

import { prisma } from '@/lib/prisma';

import type { SearchParams } from 'nuqs';

interface VacanciesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function VacanciesPage({ searchParams }: VacanciesPageProps) {
  const { category } = await loadSearchParams(searchParams);

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Вакансии</Heading>

      <Flex
        direction={{ initial: 'column', md: 'row' }}
        align={{ initial: 'stretch', md: 'center' }}
        gap='4'
      >
        <Search placeholder='Поиск вакансий' aria-label='Поиск вакансий' />
        <SelectCategory categories={categories} />
        <SelectOrderBy />
      </Flex>

      <Suspense key={category} fallback={<VacanciesListSkeleton />}>
        <VacanciesList searchParams={searchParams} />
      </Suspense>
    </Flex>
  );
}
