'use client';

import { useTransition } from 'react';

import { Select } from '@radix-ui/themes';

import { parseAsStringEnum, useQueryState } from 'nuqs';

export function SelectOrderBy(props: Select.RootProps) {
  const [isPending, startTransition] = useTransition();

  const [orderBy, setOrderBy] = useQueryState(
    'orderBy',
    parseAsStringEnum(['desc', 'asc'])
      .withDefault('desc')
      .withOptions({ clearOnDefault: true, shallow: false }),
  );

  return (
    <Select.Root
      defaultValue={orderBy}
      disabled={isPending}
      onValueChange={(value) =>
        startTransition(() => {
          setOrderBy(value as 'asc' | 'desc');
        })
      }
      size={{ initial: '3', md: '2' }}
      aria-label='Сортировка по дате'
      {...props}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Item value='desc'>По дате (по убыванию)</Select.Item>
        <Select.Item value='asc'>По дате (по возрастанию)</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
