import { Grid, Heading } from '@radix-ui/themes'

import { VacanciesListSkeleton } from '@/components/vacancies/list'

export default function Loading() {
  return (
    <Grid columns="1" gap="7" pb="8">
      <Heading size="3" weight="medium">
        Vacancies
      </Heading>

      <VacanciesListSkeleton />
    </Grid>
  )
}
