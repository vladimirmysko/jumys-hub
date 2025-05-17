import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { DataList, Flex, Heading, Link, Skeleton } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';

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
          <NextLink href='/vacancies'>
            <Flex direction='row' align='center' gap='1'>
              <ChevronLeftIcon />
              Вернуться назад
            </Flex>
          </NextLink>
        </Link>
      </Skeleton>

      <Flex direction='row' align='baseline' gap='4'>
        <Skeleton>
          <Heading>Заголовок вакансии</Heading>
        </Skeleton>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Работодатель</DataList.Label>
          <DataList.Value>
            <Skeleton>Имя работодателя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Описание</DataList.Label>
          <DataList.Value>
            <Skeleton>
              Описание вакансии. Это может быть длинный текст, описывающий должностные обязанности и
              требования.
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>
            <Skeleton>Категория вакансии</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Местоположение</DataList.Label>
          <DataList.Value>
            <Skeleton>Местоположение вакансии</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Зарплата</DataList.Label>
          <DataList.Value>
            <Skeleton>Зарплата</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Тип занятости</DataList.Label>
          <DataList.Value>
            <Skeleton>Тип занятости</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Дата публикации</DataList.Label>
          <DataList.Value>
            <Skeleton>Дата публикации</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Skeleton>
        <Button>Откликнуться на вакансию</Button>
      </Skeleton>
    </Flex>
  );
}
