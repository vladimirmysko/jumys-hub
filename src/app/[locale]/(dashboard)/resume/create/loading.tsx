import { Button, Flex, Grid, Heading, Separator, Skeleton, Text } from '@radix-ui/themes'

export default function Loading() {
  return (
    <Grid gap="7">
      <Heading size="3" weight="medium">
        Create resume
      </Heading>

      <Flex direction="column" align="stretch" gap="6">
        <Flex direction="column" align="stretch" gap="5">
          {/* About Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text size="2" weight="medium">
              About
            </Text>
            <Skeleton style={{ height: '120px', width: '100%' }} />
            <Text size="1" color="gray">
              Write a short introduction about yourself (min. 10 characters)
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Experience Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text size="2" weight="medium">
              Experience
            </Text>
            <Skeleton style={{ height: '150px', width: '100%' }} />
            <Text size="1" color="gray">
              List your previous work experience, including roles, companies, and key achievements
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Skills Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text size="2" weight="medium">
              Skills
            </Text>
            <Skeleton style={{ height: '100px', width: '100%' }} />
            <Text size="1" color="gray">
              Include technical skills, tools, languages, and soft skills
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Education Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text size="2" weight="medium">
              Education
            </Text>
            <Skeleton style={{ height: '100px', width: '100%' }} />
            <Text size="1" color="gray">
              Include your degrees, institutions, graduation years, and relevant coursework
            </Text>
          </Flex>
        </Flex>

        <Separator size="4" />

        <Flex>
          <Skeleton>
            <Button size="2" highContrast>
              Save Resume
            </Button>
          </Skeleton>
        </Flex>
      </Flex>
    </Grid>
  )
}
