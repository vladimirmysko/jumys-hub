import NextLink from 'next/link'

import {
  Button,
  DataList,
  Flex,
  Grid,
  Heading,
  Link,
  Skeleton,
  Text,
  TextArea,
} from '@radix-ui/themes'

import { ChevronLeftIcon } from '@radix-ui/react-icons'

export default function Loading() {
  return (
    <Grid columns="1" gap="8">
      <Link size="2" weight="medium" underline="hover" highContrast asChild>
        <NextLink href="/vacancies">
          <Flex gap="1" align="center">
            <ChevronLeftIcon />
            Back to Vacancies
          </Flex>
        </NextLink>
      </Link>

      <Heading weight="medium" size="5">
        <Skeleton>Vacancy Title</Skeleton>
      </Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Company</DataList.Label>
          <DataList.Value>
            <Skeleton>Company Name</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Category</DataList.Label>
          <DataList.Value>
            <Skeleton>Category Name</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Description</DataList.Label>
          <DataList.Value>
            <Skeleton>
              This is a placeholder for the vacancy description. It would typically contain
              information about job responsibilities, requirements, and other relevant details about
              the position.
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Location</DataList.Label>
          <DataList.Value>
            <Skeleton>Location</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Salary</DataList.Label>
          <DataList.Value>
            <Skeleton>Salary Range</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Type</DataList.Label>
          <DataList.Value>
            <Skeleton>Job Type</Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Posted</DataList.Label>
          <DataList.Value>
            <Skeleton>April, 2025</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Grid columns="1" gap="5">
        <Grid columns="1" gap="2">
          <Text as="label" htmlFor="coverLetter" size="2" color="gray" weight="medium" highContrast>
            Cover letter{' '}
            <Text as="span" color="gray" weight="regular">
              (optional)
            </Text>
          </Text>
          <TextArea id="coverLetter" name="coverLetter" rows={4} disabled />
        </Grid>

        <Flex>
          <Button size="2" disabled>
            Apply Now
          </Button>
        </Flex>
      </Grid>
    </Grid>
  )
}
