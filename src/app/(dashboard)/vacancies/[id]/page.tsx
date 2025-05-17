import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { DataList, Flex, Heading, Link } from '@radix-ui/themes';

import { prisma } from '@/lib/prisma';
import { JOB_TYPE_LABELS } from '@/lib/constants';

interface VacancyPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    backUrl?: string;
  }>;
}

export default async function VacancyPage({ params, searchParams }: VacancyPageProps) {
  const [{ id }, { backUrl }] = await Promise.all([params, searchParams]);

  const vacancy = await prisma.vacancy.findFirst({
    where: {
      id,
    },
    include: {
      employer: true,
      category: true,
    },
  });

  if (!vacancy) {
    notFound();
  }

  console.log(backUrl);

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
        <NextLink href={backUrl ? backUrl : '/vacancies'}>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться назад
          </Flex>
        </NextLink>
      </Link>

      <Heading>{vacancy.title}</Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Работодатель</DataList.Label>
          <DataList.Value>{vacancy.employer.companyName}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Описание</DataList.Label>
          <DataList.Value>{vacancy.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>{vacancy.category.name}</DataList.Value>
        </DataList.Item>
        {vacancy.location && (
          <DataList.Item>
            <DataList.Label>Локация</DataList.Label>
            <DataList.Value>{vacancy.location}</DataList.Value>
          </DataList.Item>
        )}
        {vacancy.salary && (
          <DataList.Item>
            <DataList.Label>Зарплата</DataList.Label>
            <DataList.Value>{vacancy.salary}</DataList.Value>
          </DataList.Item>
        )}
        {vacancy.jobType && (
          <DataList.Item>
            <DataList.Label>Тип</DataList.Label>
            <DataList.Value>{JOB_TYPE_LABELS[vacancy.jobType]}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Дата публикации</DataList.Label>
          <DataList.Value>
            {vacancy.createdAt.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Flex>
  );
}
