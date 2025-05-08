import { Button, DataList, Flex, Grid, Heading, Skeleton } from '@radix-ui/themes'

export default function Loading() {
  return (
    <Grid gap="7">
      <Flex justify="between" align="center">
        <Heading size="3" weight="medium">
          Resume
        </Heading>
        <Skeleton>
          <Button variant="soft">Edit resume</Button>
        </Skeleton>
      </Flex>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>About</DataList.Label>
          <DataList.Value>
            <Skeleton>
              This is a placeholder for the resume about section. It would typically contain
              information about the person's background, interests, and career goals.
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Experience</DataList.Label>
          <DataList.Value>
            <Skeleton>
              This is a placeholder for the experience section. It would typically contain
              information about previous jobs, roles, responsibilities, and achievements.
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Skills</DataList.Label>
          <DataList.Value>
            <Skeleton>
              Frontend Development, Backend Development, Database Management, UI/UX Design, Project
              Management, Team Leadership, Problem Solving
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Education</DataList.Label>
          <DataList.Value>
            <Skeleton>
              Master of Science in Computer Science, Bachelor of Science in Information Technology
            </Skeleton>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Last Updated</DataList.Label>
          <DataList.Value>
            <Skeleton>April 24, 2025</Skeleton>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Grid>
  )
}
