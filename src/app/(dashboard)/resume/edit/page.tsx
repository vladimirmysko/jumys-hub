import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { Flex, Heading, Link } from '@radix-ui/themes';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { EditResumeForm } from '@/components/resume/edit-resume-form';

import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export default async function EditResumePage() {
  const session = await verifySession();
  const resume = await prisma.resume.findFirst({
    where: {
      student: {
        userId: session.sub,
      },
    },
  });

  if (!resume) {
    notFound();
  }

  // Fetch categories
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
        style={{ alignSelf: 'start' }}
      >
        <NextLink href='/resume'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться в резюме
          </Flex>
        </NextLink>
      </Link>

      <Heading>Редактировать резюме</Heading>

      <EditResumeForm resume={resume} categories={categories} />
    </Flex>
  );
}
