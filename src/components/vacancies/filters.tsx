'use client'

import { useTransition } from 'react'

import { Select } from '@radix-ui/themes'

import { parseAsString, useQueryState } from 'nuqs'
import type { Category } from '@/generated/prisma'

interface VacanciesFiltersProps extends Select.RootProps {
  categories: Category[]
}

export function VacanciesFilters({ categories, ...props }: VacanciesFiltersProps) {
  const [isPending, startTransition] = useTransition()

  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('').withOptions({ shallow: false }),
  )

  return (
    <Select.Root
      defaultValue={category}
      disabled={isPending}
      onValueChange={value =>
        startTransition(() => {
          setCategory(value)
        })
      }
      aria-label="Filter by Category"
      {...props}
    >
      <Select.Trigger placeholder="Filter by Category" />
      <Select.Content>
        {categories.map(category => (
          <Select.Item key={category.id} value={category.id}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
