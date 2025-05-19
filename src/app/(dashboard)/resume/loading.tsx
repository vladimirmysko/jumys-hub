import { DataList, Flex, Heading, Link, Skeleton } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';

export default function Loading() {
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
        <Skeleton>
          <Link size='2' color='gray' weight='medium' underline='hover' highContrast>
            Редактировать
          </Link>
        </Skeleton>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Опыт работы</DataList.Label>
          <DataList.Value>
            <Skeleton>Опыт работы пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Навыки</DataList.Label>
          <DataList.Value>
            <Skeleton>Навыки пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Образование</DataList.Label>
          <DataList.Value>
            <Skeleton>Образование пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>О себе</DataList.Label>
          <DataList.Value>
            <Skeleton>Информация о пользователе</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>
            <Skeleton>Информация о категории</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Flex>
        <Skeleton>
          <Button>Удалить резюме</Button>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
