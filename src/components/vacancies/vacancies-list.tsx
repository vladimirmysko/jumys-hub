import NextLink from 'next/link';
import { Badge, Flex, Grid, Link, Text } from '@radix-ui/themes';

import { loadSearchParams, vacanciesSearchParams } from '@/components/vacancies/search-params';
import { Pagination } from '@/components/ui/pagination';

import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { JOB_TYPE_LABELS } from '@/lib/constants';
import { generateEmbedding, getResumeTextForEmbedding } from '@/lib/ai/embeddings';
import { cosineSimilarity } from '@/lib/ai/similarity';

import type { GridProps } from '@radix-ui/themes';
import type { SearchParams as NuqsSearchParams } from 'nuqs';
import type { Prisma } from '@/generated/prisma';
import type { Vacancy, User, Employer, Category, Application } from '@/generated/prisma';

interface VacanciesListProps {
  searchParams: Promise<NuqsSearchParams>;
  employerOnly?: boolean;
}

type VacancyWithDetails = Vacancy & {
  similarity?: number;
  employer: Employer & { user: Pick<User, 'firstName' | 'lastName'> };
  category: Category;
  applications: Application[];
};

export async function VacanciesList({
  searchParams: searchParamsPromise,
  employerOnly = false,
  ...props
}: VacanciesListProps & Omit<GridProps, 'asChild' | 'children'>) {
  const session = await verifySession();
  const loadedSearchParams = await loadSearchParams(searchParamsPromise);
  let { page, perPage, category, search, orderBy } = loadedSearchParams;

  const userWithDetails = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      role: true,
      employer: { select: { id: true } },
      student: {
        include: {
          resume: {
            select: { experience: true, skills: true, education: true, about: true },
          },
        },
      },
    },
  });

  const isCurrentUserEmployer = userWithDetails?.role === 'EMPLOYER';
  const currentEmployerId = userWithDetails?.employer?.id;
  const isCurrentUserStudent = userWithDetails?.role === 'STUDENT';
  const studentResume = userWithDetails?.student?.resume;

  let whereCondition: Prisma.VacancyWhereInput = {
    isActive: true,
    ...(category !== 'all' ? { categoryId: category } : {}),
    ...(employerOnly && isCurrentUserEmployer && currentEmployerId
      ? { employerId: currentEmployerId }
      : {}),
  };

  if (!(orderBy === 'relevance' && isCurrentUserStudent && studentResume) && search) {
    whereCondition.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ];
  }

  const includeClause: Prisma.VacancyInclude = {
    applications: { where: { student: { userId: session.sub } } },
    employer: { include: { user: { select: { firstName: true, lastName: true } } } },
    category: true,
  };

  let finalVacancies: VacancyWithDetails[] = [];
  let totalVacanciesCount = 0;

  let performRelevanceSort = orderBy === 'relevance' && isCurrentUserStudent && studentResume;

  if (performRelevanceSort) {
    const resumeText = getResumeTextForEmbedding(studentResume!);
    const resumeEmbedding = await generateEmbedding(resumeText);

    if (resumeEmbedding) {
      const allMatchingVacancies = await prisma.vacancy.findMany({
        where: {
          ...whereCondition,
          embedding: { isEmpty: false }, // Ensure embedding exists on vacancy
        },
        include: includeClause,
      });

      const vacanciesWithSimilarity = allMatchingVacancies
        .map((vac) => {
          const typedVac = vac as unknown as VacancyWithDetails;
          if (typedVac.embedding && (typedVac.embedding as number[]).length > 0) {
            const similarity = cosineSimilarity(resumeEmbedding, typedVac.embedding as number[]);
            return { ...typedVac, similarity };
          }
          return { ...typedVac, similarity: -1 };
        })
        .sort((a, b) => (b.similarity ?? -1) - (a.similarity ?? -1));

      totalVacanciesCount = vacanciesWithSimilarity.length;
      finalVacancies = vacanciesWithSimilarity.slice((page - 1) * perPage, page * perPage);
    } else {
      performRelevanceSort = false;
      orderBy = vacanciesSearchParams.orderBy.defaultValue; // Fallback to default
    }
  }

  if (!performRelevanceSort) {
    let prismaOrderBy: Prisma.VacancyOrderByWithRelationInput;
    switch (orderBy) {
      case 'asc':
        prismaOrderBy = { createdAt: 'asc' };
        break;
      case 'relevance': // Fallback from failed relevance sort
      case 'desc':
      default:
        prismaOrderBy = { createdAt: 'desc' };
        break;
    }

    totalVacanciesCount = await prisma.vacancy.count({ where: whereCondition });
    const dbVacancies = await prisma.vacancy.findMany({
      where: whereCondition,
      include: includeClause,
      orderBy: prismaOrderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    });
    finalVacancies = dbVacancies as unknown as VacancyWithDetails[];
  }

  const totalPages = Math.ceil(totalVacanciesCount / perPage);

  const currentUrlParams = new URLSearchParams();
  currentUrlParams.set('page', page.toString());
  currentUrlParams.set('perPage', perPage.toString());
  currentUrlParams.set('category', category);
  if (search) {
    currentUrlParams.set('search', search);
  }
  currentUrlParams.set('orderBy', orderBy);
  const backUrl = `/vacancies?${currentUrlParams.toString()}`;

  if (finalVacancies.length === 0) {
    return (
      <Flex direction='column' align='center' gap='3' py='9'>
        <Text size='4' weight='medium'>
          {employerOnly && isCurrentUserEmployer
            ? 'У вас пока нет опубликованных вакансий'
            : 'Вакансии не найдены'}
        </Text>
      </Flex>
    );
  }

  return (
    <Grid columns='1' gap='7' {...props}>
      <Grid columns='1' asChild>
        <ul>
          {finalVacancies.map((vacancy, index) => (
            <Flex
              key={vacancy.id}
              direction='column'
              align='start'
              gap='3'
              pt={index === 0 ? '0' : '5'}
              pb={index === finalVacancies.length - 1 ? '0' : '5'}
              asChild
            >
              <li
                style={{
                  borderBottom:
                    index === finalVacancies.length - 1 ? 'none' : '1px solid var(--gray-4)',
                }}
              >
                <Flex direction='row' gap='3' align='baseline'>
                  <Link size='2' underline='hover' weight='medium' highContrast asChild>
                    <NextLink
                      href={`/vacancies/${vacancy.id}?backUrl=${encodeURIComponent(backUrl)}`}
                    >
                      {vacancy.title}
                    </NextLink>
                  </Link>
                  {vacancy.applications.length > 0 && <Badge color='green'>Заявка подана</Badge>}
                </Flex>

                <Text size='2' color='gray'>
                  {vacancy.employer.companyName}
                </Text>

                <Text size='2'>{vacancy.description}</Text>

                <Flex gap='3' wrap='wrap' align='center'>
                  <Badge color='orange' variant='soft'>
                    {vacancy.category.name}
                  </Badge>
                  {vacancy.location && (
                    <Badge color='tomato' variant='soft'>
                      {vacancy.location}
                    </Badge>
                  )}
                  {vacancy.salary && (
                    <Badge color='gold' variant='soft'>
                      {vacancy.salary}
                    </Badge>
                  )}
                  {vacancy.jobType && (
                    <Badge color='blue' variant='soft'>
                      {JOB_TYPE_LABELS[vacancy.jobType]}
                    </Badge>
                  )}
                </Flex>

                <Text size='1' color='gray'>
                  {new Date(vacancy.createdAt).toLocaleDateString('ru-RU', { dateStyle: 'long' })}
                </Text>
              </li>
            </Flex>
          ))}
        </ul>
      </Grid>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </Grid>
  );
}
