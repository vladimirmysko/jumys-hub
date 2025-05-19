import { notFound } from 'next/navigation';
import NextLink from 'next/link';

import { ArrowTopRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Badge, DataList, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes';

import { ApplyForVacancyForm } from '@/components/vacancies/apply-for-vacancy-form';
import { DeleteVacancyAlert } from '@/components/vacancies/delete-vacancy-alert';
import { GetVacancyMatchReviewForm } from '@/components/vacancies/get-vacancy-match-review-form';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { JOB_TYPE_LABELS } from '@/lib/constants';

interface VacancyPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    backUrl?: string;
  }>;
}

export default async function VacancyPage({ params, searchParams }: VacancyPageProps) {
  const session = await verifySession();

  const [{ id }, { backUrl }] = await Promise.all([params, searchParams]);

  // Determine if user is an employer and if they own this vacancy
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
    include: {
      employer: true,
    },
  });
  const isEmployer = user?.role === 'EMPLOYER';

  // Get potential employerId before vacancy query
  const employerId = user?.employer?.id;

  const [vacancy, student, application, review] = await Promise.all([
    prisma.vacancy.findFirst({
      where: {
        id,
      },
      include: {
        employer: true,
        category: true,
      },
    }),
    prisma.student.findFirst({
      where: {
        userId: session.sub,
      },
    }),
    prisma.application.findFirst({
      where: {
        vacancyId: id,
        student: {
          userId: session.sub,
        },
      },
    }),
    prisma.vacancyMatchingReview.findFirst({
      where: {
        vacancyId: id,
        student: {
          userId: session.sub,
        },
      },
    }),
  ]);

  if (!vacancy) {
    notFound();
  }
  // Check if the current employer is the owner of this vacancy
  const isOwner = isEmployer && employerId === vacancy.employerId;

  // Get all applications for this vacancy if the current user is the owner
  const applications = isOwner
    ? await prisma.application.findMany({
        where: {
          vacancyId: id,
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    : [];

  // Students need to have a profile to apply
  const canApply = !isEmployer && student && !application;

  return (
    <Flex direction='column' gap='7' py='7'>
      <Link
        size='2'
        color='gray'
        weight='medium'
        underline='hover'
        highContrast
        asChild
        style={{ alignSelf: 'start' }}
      >
        <NextLink href={backUrl ? backUrl : '/vacancies'}>
          <Flex direction='row' align='center' gap='1'>
            <ChevronLeftIcon />
            Вернуться назад
          </Flex>
        </NextLink>
      </Link>
      <Flex
        direction='row'
        align={{ initial: 'start', md: 'baseline' }}
        wrap='wrap-reverse'
        gap={{ initial: '2', md: '4' }}
      >
        <Heading>{vacancy.title}</Heading>
        {application && (
          <Link size='2' color='green' weight='medium' underline='hover' asChild>
            <NextLink href={`/applications/${application.id}`}>
              <Flex direction='row' align='center' gap='1'>
                Заявка отправлена
                <ArrowTopRightIcon />
              </Flex>
            </NextLink>
          </Link>
        )}
      </Flex>
      <DataList.Root orientation={{ initial: 'vertical', md: 'horizontal' }}>
        <DataList.Item>
          <DataList.Label>Работодатель</DataList.Label>
          <DataList.Value>{vacancy.employer.companyName}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Описание</DataList.Label>
          <DataList.Value>{vacancy.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Категория</DataList.Label>
          <DataList.Value>{vacancy.category.name}</DataList.Value>
        </DataList.Item>
        {vacancy.location && (
          <DataList.Item>
            <DataList.Label>Локация</DataList.Label>
            <DataList.Value>{vacancy.location}</DataList.Value>
          </DataList.Item>
        )}
        {vacancy.salary && (
          <DataList.Item>
            <DataList.Label>Зарплата</DataList.Label>
            <DataList.Value>{vacancy.salary}</DataList.Value>
          </DataList.Item>
        )}
        {vacancy.jobType && (
          <DataList.Item>
            <DataList.Label>Тип</DataList.Label>
            <DataList.Value>{JOB_TYPE_LABELS[vacancy.jobType]}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Дата публикации</DataList.Label>
          <DataList.Value>
            {vacancy.createdAt.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
          </DataList.Value>
        </DataList.Item>
        {!isEmployer && student && (
          <DataList.Item>
            <DataList.Label>Комментарии от ИИ</DataList.Label>
            <DataList.Value>
              {review ? (
                review.comment
              ) : (
                <GetVacancyMatchReviewForm vacancyId={vacancy.id} studentId={student.id} />
              )}
            </DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>{' '}
      {canApply && <ApplyForVacancyForm vacancyId={vacancy.id} studentId={student.id} />}{' '}
      {/* Show applications list for vacancy owner */}{' '}
      {isOwner && (
        <Flex direction='column' gap='3'>
          <Heading size='4'>
            Отклики на вакансию {applications.length > 0 ? `(${applications.length})` : ''}
          </Heading>

          {applications.length > 0 ? (
            <Grid columns='1' asChild>
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
                    <li
                      style={{
                        borderBottom:
                          index === applications.length - 1 ? 'none' : '1px solid var(--gray-4)',
                        width: '100%',
                      }}
                    >
                      <Flex
                        direction='row'
                        justify='between'
                        align='start'
                        style={{ width: '100%' }}
                      >
                        <Flex direction='column' gap='2'>
                          <Text size='2' weight='medium' highContrast>
                            {application.student.user.firstName} {application.student.user.lastName}
                          </Text>
                          <Badge color='gray' variant='soft'>
                            {application.status}
                          </Badge>
                          {application.coverLetter && (
                            <Text size='2'>
                              {application.coverLetter.length > 150
                                ? application.coverLetter.substring(0, 150) + '...'
                                : application.coverLetter}
                            </Text>
                          )}
                          <Text size='1' color='gray'>
                            {application.createdAt.toLocaleDateString('ru-RU', {
                              dateStyle: 'long',
                            })}
                          </Text>
                        </Flex>
                        <Link asChild>
                          <NextLink href={`/applications/${application.id}`}>
                            <Flex align='center' gap='1'>
                              <Text size='2'>Просмотреть</Text>
                              <ArrowTopRightIcon />
                            </Flex>
                          </NextLink>
                        </Link>
                      </Flex>
                    </li>
                  </Flex>
                ))}
              </ul>
            </Grid>
          ) : (
            <Text size='2' color='gray'>
              На данную вакансию еще не поступило откликов.
            </Text>
          )}
        </Flex>
      )}
      {/* Show delete button for vacancy owner */}
      {isOwner && <DeleteVacancyAlert vacancyId={vacancy.id} style={{ alignSelf: 'flex-start' }} />}
    </Flex>
  );
}
