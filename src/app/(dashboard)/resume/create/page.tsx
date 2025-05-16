import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Link } from '@radix-ui/themes';

import { CreateResumeForm } from '@/components/resume/create-resume-form';
import { verifySession } from '@/lib/session';

export default async function CreateResumePage() {
  const session = await verifySession();

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
        <NextLink href='/resume'>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться в резюме
          </Flex>
        </NextLink>
      </Link>

      <Heading>Создать резюме</Heading>

      <CreateResumeForm userId={session.sub || ''} />
    </Flex>
  );
}
