'use client';

import { useActionState } from 'react';

import { Button, Flex, Grid, Select, Text, TextArea, TextField } from '@radix-ui/themes';
import type { FlexProps } from '@radix-ui/themes';

import { createVacancyAction } from '@/actions/vacancies/create-vacancy-action';
import { JOB_TYPE_LABELS } from '@/lib/constants';

interface CreateVacancyFormProps extends Omit<FlexProps, 'asChild' | 'children'> {
  employerId: string;
  categories: {
    id: string;
    name: string;
  }[];
}

export function CreateVacancyForm({ employerId, categories, ...props }: CreateVacancyFormProps) {
  const [state, formAction, isPending] = useActionState(createVacancyAction, {
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      jobType: 'FULL_TIME',
    },
    success: false,
    errors: null,
  });

  return (
    <Flex direction='column' align='stretch' gap='5' asChild {...props}>
      <form action={formAction}>
        <Grid columns='1' gap='5'>
          {state.errors?.form && (
            <Text id='error-form' size='2' color='red'>
              {state.errors.form}
            </Text>
          )}

          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='title' size='2' color='gray' weight='medium' highContrast>
              Заголовок вакансии*
            </Text>
            <TextField.Root
              id='title'
              name='title'
              placeholder='Введите заголовок вакансии'
              disabled={isPending}
              defaultValue={state.defaultValues.title}
              aria-invalid={!!state.errors?.title}
              aria-errormessage='error-title'
              size={{ initial: '3', md: '2' }}
            />
            {state.errors?.title && (
              <Text id='error-title' size='1' color='red'>
                {state.errors.title}
              </Text>
            )}
          </Grid>

          <Grid columns='1' gap='2'>
            <Text
              as='label'
              htmlFor='categoryId'
              size='2'
              color='gray'
              weight='medium'
              highContrast
            >
              Категория*
            </Text>
            <Select.Root
              name='categoryId'
              defaultValue={state.defaultValues.categoryId || categories[0]?.id}
              disabled={isPending}
              aria-invalid={!!state.errors?.categoryId}
              size={{ initial: '3', md: '2' }}
            >
              <Select.Trigger />
              <Select.Content>
                {categories.map((category) => (
                  <Select.Item key={category.id} value={category.id}>
                    {category.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            {state.errors?.categoryId && (
              <Text id='error-categoryId' size='1' color='red'>
                {state.errors.categoryId}
              </Text>
            )}
          </Grid>

          <Grid columns='1' gap='2'>
            <Text
              as='label'
              htmlFor='description'
              size='2'
              color='gray'
              weight='medium'
              highContrast
            >
              Описание вакансии*
            </Text>
            <TextArea
              id='description'
              name='description'
              placeholder='Подробное описание обязанностей и требований для позиции'
              disabled={isPending}
              defaultValue={state.defaultValues.description}
              aria-invalid={!!state.errors?.description}
              aria-errormessage='error-description'
              rows={5}
              size={{ initial: '3', md: '2' }}
            />
            {state.errors?.description && (
              <Text id='error-description' size='1' color='red'>
                {state.errors.description}
              </Text>
            )}
          </Grid>

          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='location' size='2' color='gray' weight='medium' highContrast>
              Местоположение
            </Text>
            <TextField.Root
              id='location'
              name='location'
              placeholder='Например: Алматы или Удаленно'
              disabled={isPending}
              defaultValue={state.defaultValues.location}
              aria-invalid={!!state.errors?.location}
              aria-errormessage='error-location'
              size={{ initial: '3', md: '2' }}
            />
            {state.errors?.location && (
              <Text id='error-location' size='1' color='red'>
                {state.errors.location}
              </Text>
            )}
          </Grid>

          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='salary' size='2' color='gray' weight='medium' highContrast>
              Зарплата
            </Text>
            <TextField.Root
              id='salary'
              name='salary'
              placeholder='Например: 500 000 - 700 000 KZT'
              disabled={isPending}
              defaultValue={state.defaultValues.salary}
              aria-invalid={!!state.errors?.salary}
              aria-errormessage='error-salary'
              size={{ initial: '3', md: '2' }}
            />
            {state.errors?.salary && (
              <Text id='error-salary' size='1' color='red'>
                {state.errors.salary}
              </Text>
            )}
          </Grid>

          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='jobType' size='2' color='gray' weight='medium' highContrast>
              Тип занятости*
            </Text>
            <Select.Root
              name='jobType'
              defaultValue={state.defaultValues.jobType || 'FULL_TIME'}
              disabled={isPending}
              aria-invalid={!!state.errors?.jobType}
              size={{ initial: '3', md: '2' }}
            >
              <Select.Trigger />
              <Select.Content>
                {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
                  <Select.Item key={value} value={value}>
                    {label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            {state.errors?.jobType && (
              <Text id='error-jobType' size='1' color='red'>
                {state.errors.jobType}
              </Text>
            )}
          </Grid>

          <input type='hidden' name='employerId' value={employerId} />

          <Button
            type='submit'
            loading={isPending}
            size='3'
            highContrast
            style={{ alignSelf: 'flex-end' }}
          >
            Опубликовать вакансию
          </Button>
        </Grid>
      </form>
    </Flex>
  );
}
