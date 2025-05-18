'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import type { ButtonProps } from '@radix-ui/themes';

import { deleteVacancyAction } from '@/actions/vacancies/delete-vacancy-action';

interface DeleteVacancyAlertProps extends Omit<ButtonProps, 'children'> {
  vacancyId: string;
}

export function DeleteVacancyAlert({ vacancyId, ...props }: DeleteVacancyAlertProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsPending(true);
    setError(null);

    const formData = new FormData();
    formData.append('id', vacancyId);

    const result = await deleteVacancyAction(null, formData);

    if (result.success) {
      router.push('/vacancies');
      router.refresh();
    } else {
      setError(
        result.errors?.form ||
          'Произошла ошибка при удалении вакансии. Пожалуйста, попробуйте снова.',
      );
    }

    setIsPending(false);
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' variant='soft' {...props}>
          <TrashIcon width='16' height='16' />
          Удалить вакансию
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Удалить вакансию</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Вы уверены, что хотите удалить эту вакансию? Это действие не может быть отменено.
        </AlertDialog.Description>

        {error && (
          <Flex mt='4' mb='2'>
            <div className='text-red-500 text-sm'>{error}</div>
          </Flex>
        )}

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Отмена
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant='solid' color='red' onClick={handleDelete} disabled={isPending}>
              {isPending ? 'Удаление...' : 'Удалить'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
