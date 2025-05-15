import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { DataList, Flex, Heading, Link } from '@radix-ui/themes';

import { SignOutButton } from '@/components/profile/sign-out-button';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { ROLE_MAPPING } from '@/lib/constants';

export default async function ProfilePage() {
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
    <Flex direction='column' gap='7' py='7'>
      <Flex direction='row' align='baseline' justify='between' gap='4'>
        <Heading>Профиль</Heading>
        <Link size='2' color='gray' weight='medium' underline='hover' highContrast asChild>
          <NextLink href='/profile/edit'>Редактировать</NextLink>
        </Link>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Имя</DataList.Label>
          <DataList.Value>{user.firstName || '-'}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Фамилия</DataList.Label>
          <DataList.Value>{user.lastName || '-'}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Электронная почта</DataList.Label>
          <DataList.Value>{user.email}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Роль</DataList.Label>
          <DataList.Value>{ROLE_MAPPING[user.role]}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Аккаунт создан</DataList.Label>
          <DataList.Value>
            {user.createdAt.toLocaleDateString('ru-RU', {
              dateStyle: 'long',
            })}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {user.role === 'STUDENT' && user.student && (
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Университет</DataList.Label>
            <DataList.Value>{user.student.university || '-'}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Специальность</DataList.Label>
            <DataList.Value>{user.student.major || '-'}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Год окончания</DataList.Label>
            <DataList.Value>{user.student.graduationYear || '-'}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}

      {user.role === 'EMPLOYER' && user.employer && (
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Компания</DataList.Label>
            <DataList.Value>{user.employer.companyName}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Индустрия</DataList.Label>
            <DataList.Value>{user.employer.industry || '-'}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Сайт</DataList.Label>
            <DataList.Value>{user.employer.website || '-'}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}

      <SignOutButton>Выйти из аккаунта</SignOutButton>
    </Flex>
  );
}
