import { Suspense } from 'react';
import NextLink from 'next/link';

import { Flex, Heading } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Search } from '@/components/search';
import { SelectCategory } from '@/components/select-category';
import { SelectOrderBy } from '@/components/vacancies/select-order-by';
import { VacanciesList } from '@/components/vacancies/vacancies-list';
import { VacanciesListSkeleton } from '@/components/vacancies/vacancies-list-skeleton';
import { loadSearchParams } from '@/components/vacancies/search-params';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

import type { SearchParams } from 'nuqs';

interface VacanciesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function VacanciesPage({ searchParams }: VacanciesPageProps) {
  const session = await verifySession();
  const { category } = await loadSearchParams(searchParams);

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // Determine if user is an employer
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
    select: {
      role: true,
    },
  });

  const isEmployer = user?.role === 'EMPLOYER';

  return (
    <Flex direction='column' gap='7' py='7'>
      <Flex direction='row' align='center' justify='between'>
        <Heading>Вакансии</Heading>
        {isEmployer && (
          <Button asChild size='2' variant='solid' highContrast>
            <NextLink href='/vacancies/create'>
              <PlusIcon width='16' height='16' />
              Создать вакансию
            </NextLink>
          </Button>
        )}
      </Flex>

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
        <VacanciesList
          searchParams={searchParams}
          employerOnly={isEmployer} // Show only employer's vacancies if they are an employer
        />
      </Suspense>
    </Flex>
  );
}
