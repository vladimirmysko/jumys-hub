import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { Flex, Heading, Link } from '@radix-ui/themes';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { EditProfileForm } from '@/components/profile/edit-profile-form';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export default async function EditProfilePage() {
  const session = await verifySession();
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
    include: {
      student: true,
      employer: true,
    },
  });

  if (!user) {
    notFound();
  }

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

      <EditProfileForm maxWidth='24rem' width='100%' user={user} />
    </Flex>
  );
}
