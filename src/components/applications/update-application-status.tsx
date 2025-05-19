'use client';

import { useState, useTransition } from 'react';

import { CheckIcon, Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

import { updateApplicationStatusAction } from '@/actions/applications/update-application-status-action';

interface UpdateApplicationStatusProps {
  applicationId: string;
  currentStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export function UpdateApplicationStatus({
  applicationId,
  currentStatus,
}: UpdateApplicationStatusProps) {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);

  async function updateApplicationStatus(status: 'PENDING' | 'ACCEPTED' | 'REJECTED') {
    setError(null);

    startTransition(async () => {
      const result = await updateApplicationStatusAction({
        applicationId,
        status,
      });

      if (!result.success) {
        setError(result.error || 'Не удалось обновить статус');
      }
    });
  }

  return (
    <Flex direction='column' gap='2'>
      <Text size='2' weight='medium'>
        Изменить статус заявки
      </Text>

      <Flex gap='2' wrap='wrap'>
        <Button
          color='green'
          variant={currentStatus === 'ACCEPTED' ? 'solid' : 'outline'}
          disabled={currentStatus === 'ACCEPTED'}
          loading={isPending}
          onClick={() => updateApplicationStatus('ACCEPTED')}
        >
          <CheckIcon />
          Принять
        </Button>

        <Button
          color='red'
          variant={currentStatus === 'REJECTED' ? 'solid' : 'outline'}
          disabled={currentStatus === 'REJECTED'}
          loading={isPending}
          onClick={() => updateApplicationStatus('REJECTED')}
        >
          <Cross2Icon />
          Отклонить
        </Button>

        <Button
          color='gray'
          variant={currentStatus === 'PENDING' ? 'solid' : 'outline'}
          disabled={currentStatus === 'PENDING'}
          loading={isPending}
          onClick={() => updateApplicationStatus('PENDING')}
        >
          <ReloadIcon />
          На рассмотрении
        </Button>
      </Flex>

      {error && (
        <Text color='red' size='1'>
          {error}
        </Text>
      )}
    </Flex>
  );
}
