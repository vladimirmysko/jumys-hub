'use client';

import NextLink from 'next/link';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Badge, Flex, Grid, Link, Text } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

import type { Prisma } from '@/generated/prisma';

interface ApplicationsListProps extends Omit<GridProps, 'asChild' | 'children'> {
  applications: Prisma.ApplicationGetPayload<{
    include: {
      vacancy: {
        include: {
          employer: true;
        };
      };
    };
  }>[];
}

export function ApplicationsList({ applications, ...props }: ApplicationsListProps) {
  if (applications.length === 0) {
    return (
      <Flex direction='column' align='center' gap='3' py='9'>
        <Text size='4' weight='medium'>
          Вы еще не откликались на вакансии
        </Text>
        <Link size='3' weight='medium' asChild>
          <NextLink href='/vacancies'>Найти вакансии</NextLink>
        </Link>
      </Flex>
    );
  }

  return (
    <Grid columns='1' asChild {...props}>
      <ul>
        {applications.map((application, index) => (
          <Flex
            key={application.id}
            direction='column'
            align='start'
            gap='3'
            pt={index === 0 ? '0' : '5'}
            pb={index === applications.length - 1 ? '0' : '5'}
            asChild
          >
            <li>
              <Link size='2' weight='medium' highContrast asChild>
                <NextLink href={`/applications/${application.id}`}>
                  <Flex direction='row' align='center' gap='1'>
                    {application.vacancy.title}
                    <ArrowTopRightIcon />
                  </Flex>
                </NextLink>
              </Link>

              <Text size='2' color='gray'>
                {application.vacancy.employer.companyName}
              </Text>

              <Badge color='gray' variant='soft'>
                {application.status}
              </Badge>

              <Text size='1' color='gray'>
                {application.createdAt.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
              </Text>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  );
}
