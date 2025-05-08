import { Button, Flex, Grid, Heading, Skeleton } from '@radix-ui/themes'

import { VacanciesListSkeleton } from '@/components/vacancies/list'

export default function Loading() {
  return (
    <Grid columns="1" gap="7" pb="8">
      <Flex justify="between" align="center">
        <Heading size="5" weight="medium">
          Vacancies
        </Heading>

        <Skeleton>
          <Button size="2">Categories</Button>
        </Skeleton>
      </Flex>

      <VacanciesListSkeleton />
    </Grid>
  )
}
