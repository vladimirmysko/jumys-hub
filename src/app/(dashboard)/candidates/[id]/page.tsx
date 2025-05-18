import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { DataList, Flex, Heading, Link } from '@radix-ui/themes';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    backUrl?: string;
  }>;
}

export default async function CandidatePage({ params, searchParams }: CandidatePageProps) {
  await verifySession();

  const [{ id }, { backUrl }] = await Promise.all([params, searchParams]);
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      },
      resume: true,
    },
  });

  if (!student) {
    notFound();
  }

  return (
    <Flex direction='column' gap='7' py='7'>
      <Link
        size='2'
        color='gray'
        weight='medium'
        underline='hover'
        highContrast
        asChild
        style={{ alignSelf: 'start' }}
      >
        <NextLink href={backUrl ? backUrl : '/candidates'}>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться назад
          </Flex>
        </NextLink>
      </Link>

      <Heading>
        {student.user.firstName} {student.user.lastName}
      </Heading>

      <DataList.Root orientation={{ initial: 'vertical', md: 'horizontal' }}>
        <DataList.Item>
          <DataList.Label>Электронная почта</DataList.Label>
          <DataList.Value>{student.user.email}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Аккаунт создан</DataList.Label>
          <DataList.Value>
            {student.user.createdAt.toLocaleDateString('ru-RU', {
              dateStyle: 'long',
            })}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <DataList.Root orientation={{ initial: 'vertical', md: 'horizontal' }}>
        <DataList.Item>
          <DataList.Label>Учебное заведение</DataList.Label>
          <DataList.Value>{student.university || '-'}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Специальность</DataList.Label>
          <DataList.Value>{student.major || '-'}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Год окончания</DataList.Label>
          <DataList.Value>{student.graduationYear || '-'}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {student.resume && (
        <DataList.Root orientation={{ initial: 'vertical', md: 'horizontal' }}>
          <DataList.Item>
            <DataList.Label>Опыт работы</DataList.Label>
            <DataList.Value>{student.resume.experience}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Навыки</DataList.Label>
            <DataList.Value>{student.resume.skills}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Образование</DataList.Label>
            <DataList.Value>{student.resume.education}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>О себе</DataList.Label>
            <DataList.Value>{student.resume.about}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}
    </Flex>
  );
}
