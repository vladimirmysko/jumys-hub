import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Link } from '@radix-ui/themes';

import { ResumeFormSkeleton } from '@/components/resume/resume-form-skeleton';

export default function Loading() {
  return (
    <Flex direction='column' align='stretch' gap='7' py='7'>
      <Link
        size='2'
        color='gray'
        weight='medium'
        underline='hover'
        highContrast
        asChild
        style={{
          alignSelf: 'flex-start',
        }}
      >
        <NextLink href='/resume'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться в резюме
          </Flex>
        </NextLink>
      </Link>

      <Heading>Создать резюме</Heading>

      <ResumeFormSkeleton />
    </Flex>
  );
}
