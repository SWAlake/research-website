import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const material = z.object({ label: z.string(), url: z.string() });
const papers = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }), schema: z.object({
  title: z.string(), authors: z.array(z.string()).default([]), year: z.number().int().optional(),
  type: z.enum(['Research brief', 'Working paper', 'Poster companion paper', 'Conference paper', 'Preprint — not peer reviewed', 'Peer-reviewed journal article', 'Other scholarly output']),
  status: z.enum(['In Preparation', 'Submitted', 'Accepted', 'Published']),
  summary: z.string().optional(), pdf: z.string().optional(), approvedDownload: z.boolean().default(false),
  doi: z.url().optional(), externalUrl: z.url().optional(), materials: z.array(material).default([]), relatedJournal: z.array(z.string()).default([]), draft: z.boolean().default(false)
}).superRefine((data, ctx) => {
  if (data.pdf && (!data.approvedDownload || data.status === 'In Preparation')) ctx.addIssue({ code: 'custom', message: 'PDF downloads need approval and cannot accompany an in-preparation manuscript.' });
}) });
const journal = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }), schema: z.object({
  title: z.string(), date: z.coerce.date(), summary: z.string(), tags: z.array(z.string()).default([]), draft: z.boolean().default(true),
  image: z.object({ src: z.string(), alt: z.string() }).optional(), materials: z.array(material).default([]), relatedPapers: z.array(z.string()).default([]), relatedJournal: z.array(z.string()).default([])
}) });
export const collections = { papers, journal };
