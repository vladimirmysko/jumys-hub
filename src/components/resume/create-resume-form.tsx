'use client';

import { useActionState } from 'react';

import { Button, Flex, Grid, Text, TextArea, Select } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

import { createResumeAction } from '@/actions/resume/create-resume-action';
import type { Category } from '@/generated/prisma';

interface CreateResumeFormProps extends Omit<GridProps, 'asChild' | 'children'> {
  userId: string;
  categories: Category[];
}

export function CreateResumeForm({ userId, categories, ...props }: CreateResumeFormProps) {
  const [state, formAction, isPending] = useActionState(createResumeAction, {
    defaultValues: {
      experience: '',
      skills: '',
      education: '',
      about: '',
      categoryId: '',
    },
    success: false,
    errors: null,
  });

  return (
    <Grid columns='1' gap='7' asChild {...props}>
      <form action={formAction}>
        <Grid columns='1' gap='5'>
          <Grid columns='1' gap='2'>
            <Text
              as='label'
              htmlFor='experience'
              size='2'
              color='gray'
              weight='medium'
              highContrast
            >
              Опыт работы
            </Text>
            <TextArea
              id='experience'
              name='experience'
              placeholder='Опишите свой опыт работы, стажировки, проекты и обязанности...'
              disabled={isPending}
              defaultValue={state.defaultValues.experience}
              aria-invalid={!!state.errors?.experience}
              aria-errormessage='error-experience'
              autoFocus
              required
              rows={4}
              size='3'
            />
            {state.errors?.experience && (
              <Text id='error-experience' size='1' color='red'>
                {state.errors.experience}
              </Text>
            )}
          </Grid>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='skills' size='2' color='gray' weight='medium' highContrast>
              Навыки
            </Text>
            <TextArea
              id='skills'
              name='skills'
              placeholder='Перечислите свои технические навыки, навыки межличностного общения, языки, технологии...'
              disabled={isPending}
              defaultValue={state.defaultValues.skills}
              aria-invalid={!!state.errors?.skills}
              aria-errormessage='error-skills'
              required
              rows={4}
              size='3'
            />
            {state.errors?.skills && (
              <Text id='error-skills' size='1' color='red'>
                {state.errors.skills}
              </Text>
            )}
          </Grid>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='education' size='2' color='gray' weight='medium' highContrast>
              Образование
            </Text>
            <TextArea
              id='education'
              name='education'
              placeholder='Перечислите свои степени, учебные заведения, сертификаты и академические достижения...'
              disabled={isPending}
              defaultValue={state.defaultValues.education}
              aria-invalid={!!state.errors?.education}
              aria-errormessage='error-education'
              required
              rows={4}
              size='3'
            />
            {state.errors?.education && (
              <Text id='error-education' size='1' color='red'>
                {state.errors.education}
              </Text>
            )}
          </Grid>
          <Grid columns='1' gap='2'>
            <Text as='label' htmlFor='about' size='2' color='gray' weight='medium' highContrast>
              О себе
            </Text>
            <TextArea
              id='about'
              name='about'
              placeholder='Расскажите кратко о себе, своем опыте и карьерных целях...'
              disabled={isPending}
              defaultValue={state.defaultValues.about}
              aria-invalid={!!state.errors?.about}
              aria-errormessage='error-about'
              required
              rows={4}
              size='3'
            />
            {state.errors?.about && (
              <Text id='error-about' size='1' color='red'>
                {state.errors.about}
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
              Категория
            </Text>
            <Select.Root
              name='categoryId'
              defaultValue={state.defaultValues.categoryId}
              disabled={isPending}
              required
              aria-invalid={!!state.errors?.categoryId}
              aria-errormessage='error-categoryId'
              size='3'
            >
              <Select.Trigger placeholder='Выберите категорию' />
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
        </Grid>

        <input type='hidden' name='userId' value={userId} />

        <Flex direction='row' justify='end'>
          <Button type='submit' loading={isPending} size='3' highContrast>
            Создать резюме
          </Button>
        </Flex>
      </form>
    </Grid>
  );
}
