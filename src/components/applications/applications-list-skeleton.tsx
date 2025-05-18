import { Badge, Flex, Grid, Skeleton, Text } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

export function ApplicationsListSkeleton(props: Omit<GridProps, 'asChild' | 'children'>) {
  const placeholders = Array.from({ length: 3 }, (_, i) => i); // Show 3 placeholders

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
              {/* Vacancy Title placeholder */}
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

              {/* Status placeholder */}
              <Skeleton>
                <Badge color='gray' variant='soft'>
                  Status Placeholder
                </Badge>
              </Skeleton>

              {/* Date placeholder */}
              <Skeleton>
                <Text size='1' color='gray'>
                  May 18, 2025
                </Text>
              </Skeleton>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  );
}
