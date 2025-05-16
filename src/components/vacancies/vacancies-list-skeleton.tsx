import { Badge, Flex, Grid, Skeleton, Text } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

export function VacanciesListSkeleton(props: Omit<GridProps, 'asChild' | 'children'>) {
  const placeholders = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Grid columns='1' asChild {...props}>
      <ul>
        {placeholders.map((_, index) => (
          <Flex
            key={index}
            direction='column'
            align='start'
            gap='3'
            pt={index === 0 ? '0' : '5'}
            pb={index === placeholders.length - 1 ? '0' : '5'}
            asChild
          >
            <li
              style={{
                borderBottom:
                  index === placeholders.length - 1 ? 'none' : '1px solid var(--gray-4)',
              }}
            >
              {/* Title placeholder */}
              <Skeleton>
                <Text size='2' weight='medium' highContrast>
                  Vacancy Title Placeholder
                </Text>
              </Skeleton>

              {/* Company name placeholder */}
              <Skeleton>
                <Text size='2' color='gray'>
                  Company Name Placeholder
                </Text>
              </Skeleton>

              {/* Description placeholder */}
              <Skeleton>
                <Text size='2'>
                  This is a placeholder for the vacancy description. It would typically contain
                  information about the job responsibilities and requirements.
                </Text>
              </Skeleton>

              {/* Badge placeholders */}
              <Flex gap='3' wrap='wrap' align='center'>
                <Skeleton>
                  <Badge color='orange' variant='soft'>
                    Category
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color='tomato' variant='soft'>
                    Location
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color='green' variant='soft'>
                    Salary
                  </Badge>
                </Skeleton>

                <Skeleton>
                  <Badge color='blue' variant='soft'>
                    Job Type
                  </Badge>
                </Skeleton>
              </Flex>

              {/* Date placeholder */}
              <Skeleton>
                <Text size='1' color='gray'>
                  April 24, 2025
                </Text>
              </Skeleton>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  );
}
