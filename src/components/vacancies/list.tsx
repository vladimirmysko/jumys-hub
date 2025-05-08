import NextLink from 'next/link'

import { JOB_TYPE_LABELS } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

import { Badge, Flex, Grid, Link, Skeleton, Text } from '@radix-ui/themes'

import { format } from 'date-fns'
import type { GridProps } from '@radix-ui/themes'
import type { SearchParams } from 'nuqs'

import { loadSearchParams } from '@/components/vacancies/search-params'

interface VacanciesListProps {
  searchParams: Promise<SearchParams>
}

export async function VacanciesList({ searchParams }: VacanciesListProps & GridProps) {
  const { page, perPage, category } = await loadSearchParams(searchParams)

  const where = category ? { categoryId: category } : {}

  const vacancies = await prisma.vacancy.findMany({
    where,
    include: {
      employer: {
        select: {
          companyName: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (vacancies.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" gap="3" py="8">
        <Text size="3" weight="medium">
          No vacancies found
        </Text>
        <Text size="2" color="gray" align="center">
          {category
            ? 'No vacancies found in this category. Try selecting a different category.'
            : 'No vacancies available at the moment. Please check back later.'}
        </Text>
      </Flex>
    )
  }

  return (
    <Grid columns="1" asChild>
      <ul>
        {vacancies.map((vacancy, index) => (
          <Flex
            key={vacancy.id}
            direction="column"
            align="start"
            gap="3"
            pt={index === 0 ? '0' : '5'}
            pb={index === vacancies.length - 1 ? '0' : '5'}
            asChild
          >
            <li
              style={{
                borderBottom: index === vacancies.length - 1 ? 'none' : '1px solid var(--gray-4)',
              }}
            >
              <Link size="2" underline="hover" weight="medium" highContrast asChild>
                <NextLink href={`/vacancies/${vacancy.id}`}>{vacancy.title}</NextLink>
              </Link>

              <Text size="2" color="gray">
                {vacancy.employer.companyName}
              </Text>

              <Text size="2">{vacancy.description}</Text>

              <Flex gap="3" wrap="wrap" align="center">
                <Badge color="orange" variant="soft">
                  {vacancy.category.name}
                </Badge>
                {vacancy.location && (
                  <Badge color="tomato" variant="soft">
                    {vacancy.location}
                  </Badge>
                )}
                {vacancy.salary && (
                  <Badge color="green" variant="soft">
                    {vacancy.salary}
                  </Badge>
                )}
                {vacancy.jobType && (
                  <Badge color="blue" variant="soft">
                    {JOB_TYPE_LABELS[vacancy.jobType]}
                  </Badge>
                )}
              </Flex>

              <Text size="1" color="gray">
                {format(vacancy.createdAt, 'PPP')}
              </Text>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  )
}

export function VacanciesListSkeleton() {
  const placeholders = Array.from({ length: 5 }, (_, i) => i)

  return (
    <Grid columns="1" asChild>
      <ul>
        {placeholders.map((_, index) => (
          <Flex
            key={index}
            direction="column"
            align="start"
            gap="3"
            pt={index === 0 ? '0' : '5'}
            pb={index === placeholders.length - 1 ? '0' : '5'}
            asChild
          >
            <li
              style={{
                borderBottom:
                  index === placeholders.length - 1 ? 'none' : '1px solid var(--gray-4)',
              }}
            >
              {/* Title placeholder */}
              <Skeleton>
                <Text size="2" weight="medium" highContrast>
                  Vacancy Title Placeholder
                </Text>
              </Skeleton>

              {/* Company name placeholder */}
              <Skeleton>
                <Text size="2" color="gray">
                  Company Name Placeholder
                </Text>
              </Skeleton>

              {/* Description placeholder */}
              <Skeleton>
                <Text size="2">
                  This is a placeholder for the vacancy description. It would typically contain
                  information about the job responsibilities and requirements.
                </Text>
              </Skeleton>

              {/* Badge placeholders */}
              <Flex gap="3" wrap="wrap" align="center">
                <Skeleton>
                  <Badge color="orange" variant="soft">
                    Category
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color="tomato" variant="soft">
                    Location
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color="green" variant="soft">
                    Salary
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color="blue" variant="soft">
                    Job Type
                  </Badge>
                </Skeleton>
              </Flex>

              {/* Date placeholder */}
              <Skeleton>
                <Text size="1" color="gray">
                  April 24, 2025
                </Text>
              </Skeleton>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  )
}
