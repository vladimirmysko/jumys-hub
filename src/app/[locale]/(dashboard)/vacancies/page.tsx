import { Suspense } from 'react'
import NextLink from 'next/link'

import { prisma } from '@/lib/prisma'

import { Button, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import type { SearchParams } from 'nuqs/server'

import { VacanciesFilters } from '@/components/vacancies/filters'
import { VacanciesList, VacanciesListSkeleton } from '@/components/vacancies/list'
import { loadSearchParams } from '@/components/vacancies/search-params'

interface VacanciesPageProps {
  searchParams: Promise<SearchParams>
}

export default async function VacanciesPage({ searchParams }: VacanciesPageProps) {
  const { page, perPage, category } = await loadSearchParams(searchParams)

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const where = category ? { categoryId: category } : {}

  const totalVacancies = await prisma.vacancy.count({ where })
  const totalPages = Math.ceil(totalVacancies / perPage)

  return (
    <Grid columns="1" gap="7" pb="8">
      <Flex justify="between" align="center">
        <Heading size="3" weight="medium">
          Vacancies
        </Heading>

        <VacanciesFilters categories={categories} />
      </Flex>

      <Suspense key={category} fallback={<VacanciesListSkeleton />}>
        <VacanciesList searchParams={searchParams} />
      </Suspense>

      {totalPages > 1 && (
        <Flex justify="center" align="center" gap="2" mt="4">
          <Button size="1" variant="soft" disabled={page <= 1} asChild>
            <NextLink
              href={`/vacancies?${new URLSearchParams({
                page: (page - 1).toString(),
                perPage: perPage.toString(),
                ...(category ? { category } : {}),
              }).toString()}`}
              aria-label="Previous page"
            >
              <ChevronLeftIcon />
            </NextLink>
          </Button>

          <Flex align="center" gap="1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  size="1"
                  variant={pageNum === page ? 'solid' : 'soft'}
                  asChild
                >
                  <NextLink
                    href={`/vacancies?${new URLSearchParams({
                      page: pageNum.toString(),
                      perPage: perPage.toString(),
                      ...(category ? { category } : {}),
                    }).toString()}`}
                  >
                    {pageNum}
                  </NextLink>
                </Button>
              )
            })}
          </Flex>

          <Button size="1" variant="soft" disabled={page >= totalPages} asChild>
            <NextLink
              href={`/vacancies?${new URLSearchParams({
                page: (page + 1).toString(),
                perPage: perPage.toString(),
                ...(category ? { category } : {}),
              }).toString()}`}
              aria-label="Next page"
            >
              <ChevronRightIcon />
            </NextLink>
          </Button>
        </Flex>
      )}
    </Grid>
  )
}
