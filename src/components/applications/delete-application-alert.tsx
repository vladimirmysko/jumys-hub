'use client';

import { useActionState } from 'react';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

import { deleteApplicationAction } from '@/actions/applications/delete-application-action';

interface DeleteApplicationAlertProps extends AlertDialog.RootProps {
  applicationId: string;
}

export function DeleteApplicationAlert({ applicationId, ...props }: DeleteApplicationAlertProps) {
  const [, formAction, isPending] = useActionState(deleteApplicationAction, {
    success: false,
    errors: null,
  });

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Trigger>
        <Button color='red' variant='soft'>
          Удалить отклик
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth='28rem'>
        <AlertDialog.Title>Удалить отклик</AlertDialog.Title>
        <AlertDialog.Description size='2' color='gray'>
          Вы уверены, что хотите удалить отклик? Это действие нельзя будет отменить.
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Отменить
            </Button>
          </AlertDialog.Cancel>
          <form action={formAction}>
            <input type='hidden' name='id' value={applicationId} />
            <Button type='submit' loading={isPending} variant='solid' color='red'>
              Удалить
            </Button>
          </form>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
