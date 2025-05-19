import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Badge, DataList, Flex, Heading, Link } from '@radix-ui/themes';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { DeleteApplicationAlert } from '@/components/applications/delete-application-alert';
import { UpdateApplicationStatus } from '@/components/applications/update-application-status';

interface ApplicationPageProps {
  params: {
    id: string;
  };
}

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const session = await verifySession();

  // Get user role and employer information
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
    include: {
      employer: true,
    },
  });

  const isEmployer = user?.role === 'EMPLOYER';
  const employerId = user?.employer?.id;

  // Query for application based on role
  const application = await prisma.application.findFirst({
    where: {
      id: params.id,
      vacancy: {
        employerId: isEmployer ? employerId : undefined,
      },
    },
    include: {
      student: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      vacancy: {
        include: {
          employer: true,
          category: true,
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  // Determine the back URL based on role
  const backUrl = isEmployer ? `/vacancies/${application.vacancy.id}` : '/applications';

  // Determine the back button text based on role
  const backText = isEmployer ? 'Вернуться к вакансии' : 'Все отклики';

  return (
    <Flex direction='column' align='start' gap='7' py='7'>
      <Link
        size='2'
        color='gray'
        weight='medium'
        underline='hover'
        highContrast
        asChild
        style={{ alignSelf: 'start' }}
      >
        <NextLink href={backUrl}>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            {backText}
          </Flex>
        </NextLink>
      </Link>

      <Flex
        direction='row'
        align='baseline'
        justify='between'
        gap='4'
        style={{ alignSelf: 'stretch' }}
      >
        <Heading>{application.vacancy.title}</Heading>
        <Badge color='gray' variant='soft'>
          {application.status}
        </Badge>
      </Flex>

      <DataList.Root orientation={{ initial: 'vertical', md: 'horizontal' }}>
        {isEmployer && (
          <DataList.Item>
            <DataList.Label>Соискатель</DataList.Label>
            <DataList.Value>
              {application.student.user.firstName} {application.student.user.lastName}
            </DataList.Value>
          </DataList.Item>
        )}
        {isEmployer && (
          <DataList.Item>
            <DataList.Label>Email соискателя</DataList.Label>
            <DataList.Value>{application.student.user.email}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Работодатель</DataList.Label>
          <DataList.Value>{application.vacancy.employer.companyName}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Описание вакансии</DataList.Label>
          <DataList.Value>{application.vacancy.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>{application.vacancy.category.name}</DataList.Value>
        </DataList.Item>
        {application.coverLetter && (
          <DataList.Item>
            <DataList.Label>Сопроводительное письмо</DataList.Label>
            <DataList.Value>{application.coverLetter}</DataList.Value>
          </DataList.Item>
        )}
        {application.vacancy.location && (
          <DataList.Item>
            <DataList.Label>Локация</DataList.Label>
            <DataList.Value>{application.vacancy.location}</DataList.Value>
          </DataList.Item>
        )}
        {application.vacancy.salary && (
          <DataList.Item>
            <DataList.Label>Зарплата</DataList.Label>
            <DataList.Value>{application.vacancy.salary}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Дата отклика</DataList.Label>
          <DataList.Value>
            {application.createdAt.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
          </DataList.Value>
        </DataList.Item>{' '}
      </DataList.Root>

      {/* Employer can update the application status */}
      {isEmployer && (
        <UpdateApplicationStatus
          applicationId={application.id}
          currentStatus={application.status as 'PENDING' | 'ACCEPTED' | 'REJECTED'}
        />
      )}

      {/* Only students can delete their applications */}
      {!isEmployer && <DeleteApplicationAlert applicationId={application.id} />}
    </Flex>
  );
}
