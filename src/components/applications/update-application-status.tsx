'use client';

import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateApplicationStatus(status: 'PENDING' | 'ACCEPTED' | 'REJECTED') {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateApplicationStatusAction({
        applicationId,
        status,
      });

      if (!result.success) {
        setError(result.error || 'Не удалось обновить статус');
      }
    } catch (error) {
      setError('Произошла ошибка при обновлении статуса');
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading || currentStatus === 'ACCEPTED'}
          onClick={() => updateApplicationStatus('ACCEPTED')}
        >
          {isLoading && currentStatus !== 'ACCEPTED' ? <ReloadIcon /> : <CheckIcon />}
          Принять
        </Button>

        <Button
          color='red'
          variant={currentStatus === 'REJECTED' ? 'solid' : 'outline'}
          disabled={isLoading || currentStatus === 'REJECTED'}
          onClick={() => updateApplicationStatus('REJECTED')}
        >
          {isLoading && currentStatus !== 'REJECTED' ? <ReloadIcon /> : <Cross2Icon />}
          Отклонить
        </Button>

        <Button
          color='gray'
          variant={currentStatus === 'PENDING' ? 'solid' : 'outline'}
          disabled={isLoading || currentStatus === 'PENDING'}
          onClick={() => updateApplicationStatus('PENDING')}
        >
          {isLoading && currentStatus !== 'PENDING' ? <ReloadIcon /> : null}
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
