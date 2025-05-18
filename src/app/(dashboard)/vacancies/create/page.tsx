import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Link } from '@radix-ui/themes';

import { CreateVacancyForm } from '@/components/vacancies/create-vacancy-form';
import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export default async function CreateVacancyPage() {
  const session = await verifySession();

  // Verify that the user is an employer
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
    include: {
      employer: true,
    },
  });

  if (!user || user.role !== 'EMPLOYER' || !user.employer) {
    notFound();
  }

  // Get categories for the form
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

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
        <NextLink href='/vacancies'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться к вакансиям
          </Flex>
        </NextLink>
      </Link>

      <Heading>Создать вакансию</Heading>

      <CreateVacancyForm employerId={user.employer.id} categories={categories} />
    </Flex>
  );
}
