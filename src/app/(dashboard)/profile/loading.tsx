import { DataList, Flex, Heading, Link, Skeleton } from '@radix-ui/themes';

import { Button } from '@/components/ui/button';

export default function Loading() {
  return (
    <Flex direction='column' gap='7' py='7'>
      <Flex direction='row' align='baseline' justify='between' gap='4'>
        <Heading>Профиль</Heading>
        <Skeleton>
          <Link size='2' color='gray' weight='medium' underline='hover' highContrast>
            Редактировать
          </Link>
        </Skeleton>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Имя</DataList.Label>
          <DataList.Value>
            <Skeleton>Имя пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Фамилия</DataList.Label>
          <DataList.Value>
            <Skeleton>Фамилия пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Электронная почта</DataList.Label>
          <DataList.Value>
            <Skeleton>Электронная почта пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Роль</DataList.Label>
          <DataList.Value>
            <Skeleton>Роль пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Аккаунт создан</DataList.Label>
          <DataList.Value>
            <Skeleton>Дата создания аккаунта</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Университет</DataList.Label>
          <DataList.Value>
            <Skeleton>Университет пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Специальность</DataList.Label>
          <DataList.Value>
            <Skeleton>Специальность пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Год окончания</DataList.Label>
          <DataList.Value>
            <Skeleton>Год окончания пользователя</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Flex>
        <Skeleton>
          <Button>Выйти из аккаунта</Button>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
