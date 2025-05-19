'use client';

import { useActionState } from 'react';

import { Button, Flex } from '@radix-ui/themes';

import { getVacancyMatchReviewAction } from '@/actions/vacancies/get-vacancy-match-review-action';

import type { FlexProps } from '@radix-ui/themes';

interface GetVacancyMatchReviewFormProps extends Omit<FlexProps, 'children' | 'asChild'> {
  vacancyId: string;
  studentId: string;
}

export function GetVacancyMatchReviewForm({
  vacancyId,
  studentId,
  ...props
}: GetVacancyMatchReviewFormProps) {
  const [, formAction, isPending] = useActionState(getVacancyMatchReviewAction, {
    success: false,
    errors: null,
  });

  return (
    <Flex asChild {...props}>
      <form action={formAction}>
        <input type='hidden' name='vacancyId' value={vacancyId} />
        <input type='hidden' name='studentId' value={studentId} />

        <Button
          type='submit'
          loading={isPending}
          variant='ghost'
          size='2'
          style={{ fontWeight: 'var(--font-weight-regular)' }}
        >
          Получить отзыв
        </Button>
      </form>
    </Flex>
  );
}
