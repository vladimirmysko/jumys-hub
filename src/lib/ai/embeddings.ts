// lib/ai/embeddings.ts
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

import type { Resume } from '@/generated/prisma';

// Choose an embedding model, e.g., text-embedding-3-small
const embeddingModel = openai.embedding('text-embedding-3-small');

export async function generateEmbedding(text: string): Promise<number[] | null> {
  try {
    const { embedding } = await embed({
      model: embeddingModel,
      value: text,
    });
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
}

export function getVacancyTextForEmbedding(vacancy: {
  title: string;
  description?: string | null;
  skills?: string | null;
}): string {
  // Combine relevant fields for a comprehensive embedding
  // Adjust based on your Vacancy model structure and what's most relevant
  return `${vacancy.title} ${vacancy.description || ''} ${vacancy.skills}`.trim();
}

export function getResumeTextForEmbedding(
  resume: Pick<Resume, 'experience' | 'skills' | 'education' | 'about'>,
): string {
  const parts = [resume.experience, resume.skills, resume.education, resume.about];
  return parts.filter(Boolean).join(' ').trim();
}
