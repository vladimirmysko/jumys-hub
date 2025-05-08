'use client'

import { useState, useTransition } from 'react'
import { createResumeAction } from '@/actions/resume/create-resume-action'
import { updateResumeAction } from '@/actions/resume/update-resume-action'
import type { CreateResumeActionInput } from '@/actions/resume/create-resume-action'
import type { UpdateResumeActionInput } from '@/actions/resume/update-resume-action'
import { Button, Flex, Separator, Text, TextArea } from '@radix-ui/themes'

export interface ResumeFormProps {
  initialData?: {
    about: string
    experience: string
    skills: string
    education: string
  } | null
  isEdit?: boolean
}

export function ResumeForm({ initialData, isEdit = false }: ResumeFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    startTransition(async () => {
      try {
        const actionResult = isEdit
          ? await updateResumeAction(data as UpdateResumeActionInput)
          : await createResumeAction(data as CreateResumeActionInput)

        if (!actionResult?.data?.success && actionResult?.data?.error) {
          setError(actionResult.data.error)
        }
      } catch (error) {
        console.error(`Error ${isEdit ? 'updating' : 'creating'} resume:`, error)
        setError('An unexpected error occurred')
      }
    })
  }

  return (
    <Flex direction="column" align="stretch" gap="6" asChild>
      <form onSubmit={handleSubmit}>
        {error && (
          <Text color="ruby" size="2">
            {error}
          </Text>
        )}

        <Flex direction="column" align="stretch" gap="5">
          {/* About Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="about">
              About
            </Text>
            <TextArea
              name="about"
              id="about"
              placeholder="Share a brief introduction about yourself, your background, and your career goals..."
              required
              size="2"
              rows={5}
              defaultValue={initialData?.about || ''}
            />
            <Text size="1" color="gray">
              Write a short introduction about yourself (min. 10 characters)
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Experience Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="experience">
              Experience
            </Text>
            <TextArea
              name="experience"
              id="experience"
              placeholder="Describe your work experience, internships, projects, and responsibilities..."
              required
              size="2"
              rows={7}
              defaultValue={initialData?.experience || ''}
            />
            <Text size="1" color="gray">
              List your previous work experience, including roles, companies, and key achievements
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Skills Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="skills">
              Skills
            </Text>
            <TextArea
              name="skills"
              id="skills"
              placeholder="List your technical skills, soft skills, languages, technologies..."
              required
              size="2"
              rows={4}
              defaultValue={initialData?.skills || ''}
            />
            <Text size="1" color="gray">
              Include technical skills, tools, languages, and soft skills
            </Text>
          </Flex>

          <Separator size="4" />

          {/* Education Section */}
          <Flex direction="column" align="stretch" gap="2">
            <Text as="label" size="2" weight="medium" htmlFor="education">
              Education
            </Text>
            <TextArea
              name="education"
              id="education"
              placeholder="List your degrees, institutions, certifications, and academic achievements..."
              required
              size="2"
              rows={4}
              defaultValue={initialData?.education || ''}
            />
            <Text size="1" color="gray">
              Include your degrees, institutions, graduation years, and relevant coursework
            </Text>
          </Flex>
        </Flex>

        <Separator size="4" />

        <Flex>
          <Button type="submit" size="2" loading={isPending} highContrast>
            {isEdit ? 'Update Resume' : 'Save Resume'}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
