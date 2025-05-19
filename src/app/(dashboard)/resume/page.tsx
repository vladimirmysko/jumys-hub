import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { DataList, Flex, Heading, Link } from '@radix-ui/themes';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { DeleteResumeAlert } from '@/components/resume/delete-resume-alert';

export default async function ResumePage() {
  const session = await verifySession();

  const resume = await prisma.resume.findFirst({
    where: {
      student: {
        userId: session.sub,
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <Flex direction='column' align='start' gap='7' py='7'>
      <Flex
        direction='row'
        align='baseline'
        justify='between'
        gap='4'
        style={{ alignSelf: 'stretch' }}
      >
        <Heading>Резюме</Heading>
        <Link size='2' color='gray' weight='medium' underline='hover' highContrast asChild>
          <NextLink href='/resume/edit'>Редактировать</NextLink>
        </Link>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Опыт работы</DataList.Label>
          <DataList.Value>{resume.experience}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Навыки</DataList.Label>
          <DataList.Value>{resume.skills}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Образование</DataList.Label>
          <DataList.Value>{resume.education}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>О себе</DataList.Label>
          <DataList.Value>{resume.about}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>{resume.category.name}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <DeleteResumeAlert resumeId={resume.id} />
    </Flex>
  );
}
