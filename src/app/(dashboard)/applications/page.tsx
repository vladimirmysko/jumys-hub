import { Flex, Heading } from '@radix-ui/themes';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { ApplicationsList } from '@/components/applications/applications-list';

export default async function ApplicationsPage() {
  const session = await verifySession();

  const applications = await prisma.application.findMany({
    where: {
      student: {
        userId: session.sub,
      },
    },
    include: {
      vacancy: {
        include: {
          employer: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Отклики на вакансии</Heading>
      <ApplicationsList applications={applications} />
    </Flex>
  );
}
