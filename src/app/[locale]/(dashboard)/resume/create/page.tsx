import { Grid, Heading } from '@radix-ui/themes'
import { ResumeForm } from '@/components/forms/resume-form'

export default async function ResumeCreatePage() {
  return (
    <Grid gap="7">
      <Heading size="3" weight="medium">
        Create resume
      </Heading>

      <ResumeForm />
    </Grid>
  )
}
