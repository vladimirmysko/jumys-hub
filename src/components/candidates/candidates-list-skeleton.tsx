import { Flex, Grid, Skeleton, Text } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

export function CandidatesListSkeleton(props: Omit<GridProps, 'asChild' | 'children'>) {
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
              {/* Name placeholder */}
              <Skeleton>
                <Text size='2' weight='medium' highContrast>
                  Имя Фамилия
                </Text>
              </Skeleton>

              {/* University placeholder */}
              <Skeleton>
                <Text size='2' color='gray'>
                  Университет
                </Text>
              </Skeleton>

              {/* Major placeholder */}
              <Skeleton>
                <Text size='2'>Специальность, 2024 год выпуска</Text>
              </Skeleton>

              {/* Skills placeholder */}
              <Skeleton>
                <Text size='2' color='gray'>
                  JavaScript, React, TypeScript, Node.js, CSS
                </Text>
              </Skeleton>
            </li>
          </Flex>
        ))}
      </ul>
    </Grid>
  );
}
