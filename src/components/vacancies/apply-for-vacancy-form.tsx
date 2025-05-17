'use client';

import { useActionState } from 'react';

import { Button, Flex, Grid, Text, TextArea } from '@radix-ui/themes';
import type { FlexProps } from '@radix-ui/themes';

import { applyForVacancyAction } from '@/actions/vacancies/apply-for-vacancy-action';

interface ApplyForVacancyFormProps extends Omit<FlexProps, 'asChild' | 'children'> {
  vacancyId: string;
  studentId: string;
}

export function ApplyForVacancyForm({ vacancyId, studentId, ...props }: ApplyForVacancyFormProps) {
  const [state, formAction, isPending] = useActionState(applyForVacancyAction, {
    defaultValues: {
      coverLetter: '',
    },
    success: false,
    errors: null,
  });

  return (
    <Flex direction='column' align='stretch' gap='5' asChild {...props}>
      <form action={formAction}>
        <Grid columns='1' gap='2'>
          <Text as='label' htmlFor='coverLetter' size='2' color='gray' weight='medium' highContrast>
            Сопроводительное письмо
          </Text>
          <TextArea
            id='coverLetter'
            name='coverLetter'
            placeholder='Расскажите о своем опыте работы и почему вы хотите работать у нас.'
            disabled={isPending}
            defaultValue={state.defaultValues.coverLetter}
            aria-invalid={!!state.errors?.coverLetter}
            aria-errormessage='error-coverLetter'
            autoFocus
            rows={4}
            size={{ initial: '3', md: '2' }}
          />
          {state.errors?.coverLetter && (
            <Text id='error-coverLetter' size='1' color='red'>
              {state.errors.coverLetter}
            </Text>
          )}
        </Grid>

        <input type='hidden' name='vacancyId' value={vacancyId} />
        <input type='hidden' name='studentId' value={studentId} />

        <Button
          type='submit'
          loading={isPending}
          size='3'
          highContrast
          style={{ alignSelf: 'flex-end' }}
        >
          Подать заявку
        </Button>
      </form>
    </Flex>
  );
}
