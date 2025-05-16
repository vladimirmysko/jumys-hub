'use client';

import { Button, Flex, Grid, Skeleton, Text, TextArea } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

export function ResumeFormSkeleton(props: Omit<GridProps, 'children'>) {
  return (
    <Grid columns='1' gap='7' {...props}>
      <Grid columns='1' gap='5'>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Опыт работы</Text>
          </Skeleton>
          <Skeleton>
            <TextArea rows={4} />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Навыки</Text>
          </Skeleton>
          <Skeleton>
            <TextArea rows={4} />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Образование</Text>
          </Skeleton>
          <Skeleton>
            <TextArea rows={4} />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>О себе</Text>
          </Skeleton>
          <Skeleton>
            <TextArea rows={4} />
          </Skeleton>
        </Grid>
      </Grid>

      <Flex direction='row' justify='end'>
        <Skeleton>
          <Button size='3'>Сохранить</Button>
        </Skeleton>
      </Flex>
    </Grid>
  );
}
