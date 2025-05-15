'use client';

import { Grid, Skeleton, TextField, Text, Flex, Button } from '@radix-ui/themes';
import type { GridProps } from '@radix-ui/themes';

export function EditProfileFormSkeleton(props: Omit<GridProps, 'children'>) {
  return (
    <Grid columns='1' gap='7' {...props}>
      <Grid columns='1' gap='5'>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
      </Grid>

      <Flex gap='4' align='start'>
        <Grid columns='1' gap='2' flexGrow='1'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2' flexGrow='1'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
      </Flex>

      <Grid columns='1' gap='5'>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
        <Grid columns='1' gap='2'>
          <Skeleton>
            <Text size='2'>Текст</Text>
          </Skeleton>
          <Skeleton>
            <TextField.Root size='3' />
          </Skeleton>
        </Grid>
      </Grid>

      <Skeleton>
        <Button size='3'>Сохранить изменения</Button>
      </Skeleton>
    </Grid>
  );
}
