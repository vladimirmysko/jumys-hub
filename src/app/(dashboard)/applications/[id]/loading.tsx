import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Badge, DataList, Flex, Heading, Link, Skeleton } from '@radix-ui/themes';

export default function ApplicationLoading() {
  return (
    <Flex direction='column' align='start' gap='7' py='7'>
      <Link
        size='2'
        color='gray'
        weight='medium'
        underline='hover'
        highContrast
        style={{ alignSelf: 'start' }}
      >
        <Flex direction='row' align='center' gap='1'>
          <ChevronLeftIcon />
          Все отклики
        </Flex>
      </Link>

      <Flex
        direction='row'
        align='baseline'
        justify='between'
        gap='4'
        style={{ alignSelf: 'stretch' }}
      >
        <Skeleton>
          <Heading>Application Title Placeholder</Heading>
        </Skeleton>
        <Skeleton>
          <Badge color='gray' variant='soft'>
            STATUS
          </Badge>
        </Skeleton>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Работодатель</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Employer Name Placeholder</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Описание вакансии</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>
              Vacancy Description Placeholder Vacancy Description Placeholder Vacancy Description
              Placeholder
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Категория</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Category Name Placeholder</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Сопроводительное письмо</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>
              Cover Letter Placeholder Cover Letter Placeholder Cover Letter Placeholder
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Локация</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Location Placeholder</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Зарплата</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Salary Placeholder</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            <Skeleton>Дата отклика</Skeleton>
          </DataList.Label>
          <DataList.Value>
            <Skeleton>Application Date Placeholder</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Skeleton>
        <div style={{ width: '120px', height: '32px' }} />
      </Skeleton>
    </Flex>
  );
}
