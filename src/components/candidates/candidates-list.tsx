import NextLink from 'next/link';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Flex, Grid, Link, Text } from '@radix-ui/themes';

import { loadSearchParams } from '@/components/candidates/search-params';
import { Pagination } from '@/components/ui/pagination';

import { prisma } from '@/lib/prisma';

import type { GridProps } from '@radix-ui/themes';
import type { SearchParams } from 'nuqs';

interface CandidatesListProps {
  searchParams: Promise<SearchParams>;
}

export async function CandidatesList({
  searchParams,
  ...props
}: CandidatesListProps & Omit<GridProps, 'asChild' | 'children'>) {
  const { page, perPage, search } = await loadSearchParams(searchParams);

  const where = {
    ...(search
      ? {
          OR: [
            { user: { firstName: { contains: search, mode: 'insensitive' as const } } },
            { user: { lastName: { contains: search, mode: 'insensitive' as const } } },
            { university: { contains: search, mode: 'insensitive' as const } },
            { major: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const totalStudents = await prisma.student.count({ where });
  const totalPages = Math.ceil(totalStudents / perPage);

  const students = await prisma.student.findMany({
    where,
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      resume: {
        select: {
          skills: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  if (students.length === 0) {
    return (
      <Flex direction='column' align='center' gap='3' py='9'>
        <Text size='4' weight='medium'>
          Кандидаты не найдены
        </Text>
      </Flex>
    );
  }

  const currentSearchParams = new URLSearchParams();
  currentSearchParams.set('page', page.toString());
  currentSearchParams.set('perPage', perPage.toString());
  if (search) {
    currentSearchParams.set('search', search);
  }
  const backUrl = `/candidates?${currentSearchParams.toString()}`;

  return (
    <Grid columns='1' gap='7' {...props}>
      <Grid columns='1' asChild>
        <ul>
          {students.map((student, index) => (
            <Flex
              key={student.id}
              direction='column'
              align='start'
              gap='3'
              pt={index === 0 ? '0' : '5'}
              pb={index === students.length - 1 ? '0' : '5'}
              asChild
            >
              <li
                style={{
                  borderBottom: index === students.length - 1 ? 'none' : '1px solid var(--gray-4)',
                }}
              >
                <Link size='2' underline='hover' weight='medium' highContrast asChild>
                  <NextLink
                    href={`/candidates/${student.id}?backUrl=${encodeURIComponent(backUrl)}`}
                  >
                    <Flex direction='row' align='center' gap='1'>
                      {student.user.firstName} {student.user.lastName}
                      <ArrowTopRightIcon />
                    </Flex>
                  </NextLink>
                </Link>

                <Text size='2' color='gray'>
                  {student.university || 'Учебное заведение не указано'}
                </Text>

                <Text size='2'>
                  {student.major || 'Специальность не указана'}
                  {student.graduationYear ? `, ${student.graduationYear} год выпуска` : ''}
                </Text>

                {student.resume && (
                  <Text size='2' color='gray'>
                    {student.resume.skills}
                  </Text>
                )}
              </li>
            </Flex>
          ))}
        </ul>
      </Grid>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </Grid>
  );
}
