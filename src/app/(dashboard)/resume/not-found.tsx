import NextLink from 'next/link';

import { FilePlusIcon } from '@radix-ui/react-icons';
import { Flex, Heading, Link } from '@radix-ui/themes';

export default function NotFoundPage() {
  return (
    <Flex direction='column' align='start' gap='7' py='9'>
      <Heading>Резюме не найдено</Heading>
      <Link size='2' color='gray' weight='medium' underline='hover' highContrast asChild>
        <NextLink href='/resume/create'>
          <Flex direction='row' align='center' gap='1'>
            <FilePlusIcon />
            Создать
          </Flex>
        </NextLink>
      </Link>
    </Flex>
  );
}
