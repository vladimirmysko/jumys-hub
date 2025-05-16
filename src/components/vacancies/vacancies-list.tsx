import NextLink from 'next/link';

import { Badge, Flex, Grid, Link, Text } from '@radix-ui/themes';

import { loadSearchParams } from '@/components/vacancies/search-params';
import { Pagination } from '@/components/ui/pagination';

import { prisma } from '@/lib/prisma';
import { JOB_TYPE_LABELS } from '@/lib/constants';

import type { GridProps } from '@radix-ui/themes';
import type { SearchParams } from 'nuqs';

interface VacanciesListProps {
  searchParams: Promise<SearchParams>;
}

export async function VacanciesList({
  searchParams,
  ...props
}: VacanciesListProps & Omit<GridProps, 'asChild' | 'children'>) {
  const { page, perPage, category, search, orderBy } = await loadSearchParams(searchParams);

  const where = {
    ...(category !== 'all' ? { categoryId: category } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { location: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const totalVacancies = await prisma.vacancy.count({ where });
  const totalPages = Math.ceil(totalVacancies / perPage);

  const vacancies = await prisma.vacancy.findMany({
    where,
    include: {
      employer: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: orderBy,
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  return (
    <Grid columns='1' gap='7' {...props}>
      <Grid columns='1' asChild>
        <ul>
          {vacancies.map((vacancy, index) => (
            <Flex
              key={vacancy.id}
              direction='column'
              align='start'
              gap='3'
              pt={index === 0 ? '0' : '5'}
              pb={index === vacancies.length - 1 ? '0' : '5'}
              asChild
            >
              <li
                style={{
                  borderBottom: index === vacancies.length - 1 ? 'none' : '1px solid var(--gray-4)',
                }}
              >
                <Link size='2' underline='hover' weight='medium' highContrast asChild>
                  <NextLink href={`/vacancies/${vacancy.id}`}>{vacancy.title}</NextLink>
                </Link>

                <Text size='2' color='gray'>
                  {vacancy.employer.companyName}
                </Text>

                <Text size='2'>{vacancy.description}</Text>

                <Flex gap='3' wrap='wrap' align='center'>
                  <Badge color='orange' variant='soft'>
                    {vacancy.category.name}
                  </Badge>
                  {vacancy.location && (
                    <Badge color='tomato' variant='soft'>
                      {vacancy.location}
                    </Badge>
                  )}
                  {vacancy.salary && (
                    <Badge color='green' variant='soft'>
                      {vacancy.salary}
                    </Badge>
                  )}
                  {vacancy.jobType && (
                    <Badge color='blue' variant='soft'>
                      {JOB_TYPE_LABELS[vacancy.jobType]}
                    </Badge>
                  )}
                </Flex>

                <Text size='1' color='gray'>
                  {vacancy.createdAt.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
                </Text>
              </li>
            </Flex>
          ))}
        </ul>
      </Grid>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </Grid>
  );
}
