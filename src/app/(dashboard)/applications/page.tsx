import { Flex, Heading } from '@radix-ui/themes';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export default async function ApplicationsPage() {
  const session = await verifySession();

  const applications = await prisma.application.findMany({
    where: {
      studentId: session.sub,
    },
    include: {
      vacancy: {
        include: {
          employer: true,
        },
      },
    },
  });

  return (
    <Flex direction='column' gap='7' py='7'>
      <Heading>Заявки на вакансии</Heading>
    </Flex>
  );
}
