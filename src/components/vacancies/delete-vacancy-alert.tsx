'use client';

import { useActionState } from 'react';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import { deleteVacancyAction } from '@/actions/vacancies/delete-vacancy-action';

import type { ButtonProps } from '@radix-ui/themes';

interface DeleteVacancyAlertProps extends Omit<ButtonProps, 'children'> {
  vacancyId: string;
}

export function DeleteVacancyAlert({ vacancyId, ...props }: DeleteVacancyAlertProps) {
  const [, formAction, isPending] = useActionState(deleteVacancyAction, {
    success: false,
    errors: null,
  });

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' variant='soft' {...props}>
          <TrashIcon width='16' height='16' />
          Удалить вакансию
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }} asChild>
        <form action={formAction}>
          <AlertDialog.Title>Удалить вакансию</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Вы уверены, что хотите удалить эту вакансию? Это действие не может быть отменено.
          </AlertDialog.Description>

          <input type='hidden' name='id' value={vacancyId} />

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Отмена
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button type='submit' variant='solid' color='red' disabled={isPending}>
                {isPending ? 'Удаление...' : 'Удалить'}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
