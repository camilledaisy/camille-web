/**
 * Content collections — the "database" for the site.
 *
 *   writing   → one Markdown file per post in   src/content/writing/
 *   projects  → one Markdown file per project in src/content/projects/
 *   books     → one list in                      src/data/books.yaml
 *   scrapbook → one list in                      src/data/scrapbook.yaml
 *
 * The schemas below describe which fields each entry can have. If you forget
 * a required field, `npm run dev` will tell you exactly which file is wrong.
 */
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // add new categories here if you want more shelves for your thoughts
    category: z.enum(['essay', 'personal', 'book thoughts', 'culture', 'random']),
    description: z.string().optional(),
    // a tiny handwritten note that shows next to the post in lists
    note: z.string().optional(),
    // set to true to hide a post while you're still working on it
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['ux', 'app', 'experiment', 'research', 'writing', 'creative']),
    summary: z.string(),
    // path to an image in /public, e.g. "/img/print-01.svg"
    image: z.string().optional(),
    status: z.enum(['finished', 'ongoing', 'abandoned', 'dormant']).default('finished'),
    role: z.string().optional(),
    tools: z.array(z.string()).default([]),
    link: z.url().optional(),
    // featured projects show up on the homepage
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  loader: file('src/data/books.yaml'),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    // reading = now · finished = recently finished · read = a while ago · want = to-read pile
    shelf: z.enum(['reading', 'finished', 'read', 'want']),
    favorite: z.boolean().default(false),
    progress: z.number().min(0).max(100).optional(),
    finished: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    note: z.string().optional(),
    // cover color — any CSS color. leave empty and one is picked for you
    color: z.string().optional(),
    // link to your writing about the book, e.g. "/writing/on-rereading"
    thoughts: z.string().optional(),
  }),
});

const scrapbook = defineCollection({
  loader: file('src/data/scrapbook.yaml'),
  schema: z.object({
    kind: z.enum(['image', 'quote', 'link', 'note', 'swatch', 'ticket']),
    text: z.string().optional(),
    caption: z.string().optional(),
    src: z.string().optional(),
    href: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const collections = { writing, projects, books, scrapbook };
