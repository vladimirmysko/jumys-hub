import { Button, DataList, Flex, Grid, Heading, Skeleton } from '@radix-ui/themes'

export default function Loading() {
  return (
    <Grid gap="7">
      <Heading size="3" weight="medium">
        Profile
      </Heading>

      <Flex direction="column" gap="5" align="stretch">
        <Heading as="h2" size="2" weight="medium">
          Account information
        </Heading>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Username</DataList.Label>
            <DataList.Value>
              <Skeleton>username123</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>First Name</DataList.Label>
            <DataList.Value>
              <Skeleton>John</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Last Name</DataList.Label>
            <DataList.Value>
              <Skeleton>Doe</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>
              <Skeleton>john.doe@example.com</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Role</DataList.Label>
            <DataList.Value>
              <Skeleton>Student</Skeleton>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>

      <Flex direction="column" gap="5" align="stretch">
        <Heading as="h2" size="2" weight="medium">
          Personal information
        </Heading>
        <DataList.Root>
          {/* Including both student and employer fields as skeletons */}
          <DataList.Item>
            <DataList.Label>University</DataList.Label>
            <DataList.Value>
              <Skeleton>University of Example</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Major</DataList.Label>
            <DataList.Value>
              <Skeleton>Computer Science</Skeleton>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Graduation Year</DataList.Label>
            <DataList.Value>
              <Skeleton>2026</Skeleton>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>

      <Flex direction="column" align="start">
        <Button variant="soft" color="red" disabled>
          Sign Out
        </Button>
      </Flex>
    </Grid>
  )
}
