'use client';

import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Select,
  Skeleton,
  TextArea,
  TextField,
} from '@radix-ui/themes';

export default function Loading() {
  return (
    <Flex direction='column' align='stretch' gap='7' py='7'>
      <Skeleton>
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
          <NextLink href='/vacancies'>
            <Flex direction='row' align='center' gap='1'>
              <ChevronLeftIcon />
              Вернуться к вакансиям
            </Flex>
          </NextLink>
        </Link>
      </Skeleton>

      <Skeleton>
        <Heading>Создать вакансию</Heading>
      </Skeleton>

      <Flex direction='column' align='stretch' gap='5'>
        <Grid columns='1' gap='5'>
          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Заголовок вакансии*
              </Text>
            </Skeleton>
            <Skeleton>
              <TextField.Root
                placeholder='Введите заголовок вакансии'
                size={{ initial: '3', md: '2' }}
              />
            </Skeleton>
          </Grid>

          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Категория*
              </Text>
            </Skeleton>
            <Skeleton>
              <Select.Root size={{ initial: '3', md: '2' }}>
                <Select.Trigger placeholder='Выберите категорию' />
              </Select.Root>
            </Skeleton>
          </Grid>

          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Описание вакансии*
              </Text>
            </Skeleton>
            <Skeleton>
              <TextArea
                placeholder='Подробное описание обязанностей и требований для позиции'
                rows={5}
                size={{ initial: '3', md: '2' }}
              />
            </Skeleton>
          </Grid>

          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Местоположение
              </Text>
            </Skeleton>
            <Skeleton>
              <TextField.Root
                placeholder='Например: Алматы или Удаленно'
                size={{ initial: '3', md: '2' }}
              />
            </Skeleton>
          </Grid>

          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Зарплата
              </Text>
            </Skeleton>
            <Skeleton>
              <TextField.Root
                placeholder='Например: 500 000 - 700 000 KZT'
                size={{ initial: '3', md: '2' }}
              />
            </Skeleton>
          </Grid>

          <Grid columns='1' gap='2'>
            <Skeleton>
              <Text as='label' size='2' color='gray' weight='medium'>
                Тип занятости*
              </Text>
            </Skeleton>
            <Skeleton>
              <Select.Root size={{ initial: '3', md: '2' }}>
                <Select.Trigger placeholder='Выберите тип занятости' />
              </Select.Root>
            </Skeleton>
          </Grid>
        </Grid>

        <Skeleton>
          <Button size='3' highContrast style={{ alignSelf: 'flex-end' }}>
            Опубликовать вакансию
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

// Helper component for skeleton Text
function Text({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}
