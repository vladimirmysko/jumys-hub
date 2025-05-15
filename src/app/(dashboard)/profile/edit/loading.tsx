import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Link } from '@radix-ui/themes';

import { EditProfileFormSkeleton } from '@/components/profile/edit-profile-form-skeleton';

export default function Loading() {
  return (
    <Flex direction='column' align='start' gap='7' py='7'>
      <Link size='2' color='gray' weight='medium' underline='hover' highContrast asChild>
        <NextLink href='/profile'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться в профиль
          </Flex>
        </NextLink>
      </Link>

      <Heading>Редактировать профиль</Heading>

      <EditProfileFormSkeleton maxWidth='24rem' width='100%' />
    </Flex>
  );
}
