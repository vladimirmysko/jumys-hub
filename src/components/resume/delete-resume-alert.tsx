'use client';

import { useActionState, useState } from 'react';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

import { deleteResumeAction } from '@/actions/resume/delete-resume-action';

interface DeleteResumeAlertProps extends AlertDialog.RootProps {
  resumeId: string;
}

export function DeleteResumeAlert({ resumeId, ...props }: DeleteResumeAlertProps) {
  const [, formAction, isPending] = useActionState(deleteResumeAction, {
    success: false,
    errors: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
      <AlertDialog.Trigger>
        <Button color='red' variant='soft'>
          Удалить резюме
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth='28rem'>
        <AlertDialog.Title>Удалить резюме</AlertDialog.Title>
        <AlertDialog.Description size='2' color='gray'>
          Вы уверены, что хотите удалить резюме? Это действие нельзя будет отменить.
        </AlertDialog.Description>

        <Flex gap='3' mt='4' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Отменить
            </Button>
          </AlertDialog.Cancel>
          <form action={formAction}>
            <input type='hidden' name='id' value={resumeId} />
            <Button type='submit' loading={isPending} variant='solid' color='red'>
              Удалить
            </Button>
          </form>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
