import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { DataList, Flex, Heading, Link, Skeleton } from '@radix-ui/themes';

export default function Loading() {
  return (
    <Flex direction='column' gap='7' py='7'>
      <Skeleton>
        <Link
          size='2'
          color='gray'
          weight='medium'
          underline='hover'
          highContrast
          asChild
          style={{ alignSelf: 'start' }}
        >
          <NextLink href='/candidates'>
            <Flex direction='row' align='center' gap='1'>
              <ChevronLeftIcon />
              Вернуться назад
            </Flex>
          </NextLink>
        </Link>
      </Skeleton>{' '}
      <Flex direction='row' align='baseline' gap='4'>
        <Skeleton>
          <Heading>Имя и Фамилия кандидата</Heading>
        </Skeleton>
      </Flex>{' '}
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Электронная почта</DataList.Label>
          <DataList.Value>
            <Skeleton>email@example.com</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Аккаунт создан</DataList.Label>
          <DataList.Value>
            <Skeleton>15 мая 2025 г.</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Учебное заведение</DataList.Label>
          <DataList.Value>
            <Skeleton>Назарбаев Университет</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Специальность</DataList.Label>
          <DataList.Value>
            <Skeleton>Компьютерные науки</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Год окончания</DataList.Label>
          <DataList.Value>
            <Skeleton>2025</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Опыт работы</DataList.Label>
          <DataList.Value>
            <Skeleton>Опыт работы кандидата</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Навыки</DataList.Label>
          <DataList.Value>
            <Skeleton>JavaScript, React, Node.js, TypeScript, SQL, Git, HTML, CSS</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Образование</DataList.Label>
          <DataList.Value>
            <Skeleton>Образование кандидата</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>О себе</DataList.Label>
          <DataList.Value>
            <Skeleton>Информация о кандидате</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>
            <Skeleton>Категория</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Flex>
  );
}
