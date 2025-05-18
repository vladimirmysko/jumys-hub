import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Skeleton, TextField } from '@radix-ui/themes';

import { CandidatesListSkeleton } from '@/components/candidates/candidates-list-skeleton';

export default function Loading() {
  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Кандидаты</Heading>

      <Flex
        direction={{ initial: 'column', md: 'row' }}
        align={{ initial: 'stretch', md: 'center' }}
        gap='4'
      >
        <Skeleton>
          <TextField.Root size={{ initial: '3', md: '2' }} placeholder='Поиск кандидатов'>
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Skeleton>
      </Flex>

      <CandidatesListSkeleton />
    </Flex>
  );
}
