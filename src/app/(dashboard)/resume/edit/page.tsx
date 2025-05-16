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

  return (
    <Flex direction='column' align='start' gap='7' py='7'>
      <Link size='2' color='gray' weight='medium' underline='hover' highContrast asChild>
        <NextLink href='/resume'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться в резюме
          </Flex>
        </NextLink>
      </Link>

      <Heading>Редактировать резюме</Heading>

      <EditResumeForm maxWidth='24rem' width='100%' resume={resume} />
    </Flex>
  );
}
