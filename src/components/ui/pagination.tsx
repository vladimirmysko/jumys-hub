'use client';

import { useTransition } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Spinner, Text } from '@radix-ui/themes';

import { parseAsInteger, useQueryState } from 'nuqs';

import type { FlexProps } from '@radix-ui/themes';

interface PaginationProps {
  page: number;
  totalPages: number;
}

export function Pagination({ page, totalPages }: PaginationProps & Omit<FlexProps, 'children'>) {
  const [isPending, startTransition] = useTransition();

  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true, shallow: false }),
  );

  return (
    <Flex direction='row' align='center' justify='between'>
      <IconButton
        variant='soft'
        size={{ initial: '3', md: '2' }}
        disabled={page === 1 || isPending}
        onClick={() =>
          startTransition(() => {
            setPage((prev) => prev - 1);
          })
        }
      >
        {isPending ? <Spinner /> : <ChevronLeftIcon />}
      </IconButton>
      <Text size='2' weight='medium' color='gray' highContrast>
        {page} из {totalPages}
      </Text>
      <IconButton
        variant='soft'
        size={{ initial: '3', md: '2' }}
        disabled={page === totalPages || isPending}
        onClick={() =>
          startTransition(() => {
            setPage((prev) => prev + 1);
          })
        }
      >
        {isPending ? <Spinner /> : <ChevronRightIcon />}
      </IconButton>
    </Flex>
  );
}
