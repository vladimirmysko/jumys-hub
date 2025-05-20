'use client';

import { useTransition } from 'react';

import { Select } from '@radix-ui/themes';

import { parseAsStringEnum, useQueryState } from 'nuqs';

interface SelectOrderByProps extends Select.RootProps {
  isStudent: boolean;
}

export function SelectOrderBy({ isStudent, ...props }: SelectOrderByProps) {
  const [isPending, startTransition] = useTransition();

  const [orderBy, setOrderBy] = useQueryState(
    'orderBy',
    parseAsStringEnum(['desc', 'asc', 'relevance'])
      .withDefault('desc')
      .withOptions({ clearOnDefault: true, shallow: false }),
  );

  return (
    <Select.Root
      defaultValue={orderBy}
      disabled={isPending}
      onValueChange={(value) =>
        startTransition(() => {
          setOrderBy(value as 'asc' | 'desc' | 'relevance');
        })
      }
      size={{ initial: '3', md: '2' }}
      aria-label='Сортировка вакансий'
      {...props}
    >
      <Select.Trigger placeholder='Сортировать по...' />
      <Select.Content>
        {isStudent && <Select.Item value='relevance'>По релевантности</Select.Item>}
        <Select.Item value='desc'>По дате (по убыванию)</Select.Item>
        <Select.Item value='asc'>По дате (по возрастанию)</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
