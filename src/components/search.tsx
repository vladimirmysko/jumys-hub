'use client';

import { useRef, useTransition } from 'react';

import { parseAsString, useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Spinner, TextField } from '@radix-ui/themes';

const DEBOUNCE_MS = 500;

export function Search({ disabled, name = 'search', ...props }: TextField.RootProps) {
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useQueryState(
    name,
    parseAsString
      .withDefault('')
      .withOptions({ clearOnDefault: true, shallow: false, startTransition }),
  );

  const debounced = useDebouncedCallback((value) => {
    setQuery(value || '');
  }, DEBOUNCE_MS);

  const submitSearch = () => {
    const value = inputRef.current?.value || '';
    setQuery(value);
    debounced.cancel();
  };

  return (
    <TextField.Root
      ref={inputRef}
      name={name}
      type='search'
      defaultValue={query}
      disabled={isPending || disabled}
      size={{ initial: '3', md: '2' }}
      onChange={(e) => debounced(e.target.value || '')}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitSearch();
        }
      }}
      {...props}
    >
      <TextField.Slot>{isPending ? <Spinner /> : <MagnifyingGlassIcon />}</TextField.Slot>
    </TextField.Root>
  );
}
