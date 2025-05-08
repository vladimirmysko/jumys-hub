/**
 * Human-readable labels for JobType enum values
 */
export const JOB_TYPE_LABELS = {
  FULL_TIME: 'Full time',
  PART_TIME: 'Part time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
  REMOTE: 'Remote',
} as const

/**
 * Type for JobType labels
 */
export type JobTypeLabel = (typeof JOB_TYPE_LABELS)[keyof typeof JOB_TYPE_LABELS]
