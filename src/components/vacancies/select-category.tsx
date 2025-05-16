'use client';

import { useTransition } from 'react';

import { Select } from '@radix-ui/themes';

import { parseAsString, useQueryState } from 'nuqs';

import type { Category } from '@/generated/prisma';

interface SelectCategoryProps extends Select.RootProps {
  categories: Category[];
}

export function SelectCategory({ categories, ...props }: SelectCategoryProps) {
  const [isPending, startTransition] = useTransition();

  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all').withOptions({ clearOnDefault: true, shallow: false }),
  );

  return (
    <Select.Root
      defaultValue={category}
      disabled={isPending}
      onValueChange={(value) =>
        startTransition(() => {
          setCategory(value);
        })
      }
      size={{ initial: '3', md: '2' }}
      aria-label='Фильтр по категории'
      {...props}
    >
      <Select.Trigger placeholder='Выберите категорию' />
      <Select.Content>
        <Select.Item value='all'>Все категории</Select.Item>
        {categories.map((category) => (
          <Select.Item key={category.id} value={category.id}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
