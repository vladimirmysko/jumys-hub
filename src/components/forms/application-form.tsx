'use client'

import { useTransition } from 'react'

import { applyForVacancyAction } from '@/actions/vacancy/apply-for-vacancy-action'

import { Button, Flex, Grid, Text, TextArea } from '@radix-ui/themes'

interface ApplicationFormProps {
  vacancyId: string
}

export function ApplicationForm({ vacancyId }: ApplicationFormProps) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const coverLetter = (formData.get('coverLetter') as string) || undefined

    startTransition(async () => {
      const actionResult = await applyForVacancyAction({ vacancyId, coverLetter })

      console.log('Action result:', actionResult)

      if (!actionResult?.data?.success) {
        alert(actionResult?.data?.error || 'An unexpected error occurred')
      }
    })
  }

  return (
    <Grid columns="1" gap="5" asChild>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="vacancyId" value={vacancyId} />

        <Grid columns="1" gap="2">
          <Text as="label" htmlFor="coverLetter" size="2" color="gray" weight="medium" highContrast>
            Cover letter{' '}
            <Text as="span" color="gray" weight="regular">
              (optional)
            </Text>
          </Text>
          <TextArea id="coverLetter" name="coverLetter" rows={4} />
        </Grid>

        <Flex>
          <Button size="2" type="submit" loading={isPending}>
            Apply Now
          </Button>
        </Flex>
      </form>
    </Grid>
  )
}
