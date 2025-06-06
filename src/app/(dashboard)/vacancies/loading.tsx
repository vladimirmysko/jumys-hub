'use client';

import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Select, Skeleton, TextField } from '@radix-ui/themes';

import { VacanciesListSkeleton } from '@/components/vacancies/vacancies-list-skeleton';

export default function Loading() {
  return (
    <Flex direction='column' gap='7' py='7'>
      <Flex direction='row' align='center' justify='between'>
        <Heading>Вакансии</Heading>
        <Skeleton>
          <Button size='2' variant='solid' highContrast>
            <PlusIcon width='16' height='16' />
            Создать вакансию
          </Button>
        </Skeleton>
      </Flex>

      <Flex
        direction={{ initial: 'column', md: 'row' }}
        align={{ initial: 'stretch', md: 'center' }}
        gap='4'
      >
        <Skeleton>
          <TextField.Root size={{ initial: '3', md: '2' }} placeholder='Поиск вакансий'>
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Skeleton>
        <Skeleton>
          <Select.Root size={{ initial: '3', md: '2' }}>
            <Select.Trigger placeholder='Все категории' />
          </Select.Root>
        </Skeleton>
        <Skeleton>
          <Select.Root size={{ initial: '3', md: '2' }}>
            <Select.Trigger placeholder='По дате (по убыванию)' />
          </Select.Root>
        </Skeleton>
      </Flex>

      <VacanciesListSkeleton />
    </Flex>
  );
}
