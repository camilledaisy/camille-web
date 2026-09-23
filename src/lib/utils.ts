import { getCollection, type CollectionEntry } from 'astro:content';

/** 2026.09.14 — the little mono timestamp format used everywhere */
export function stamp(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/** "September 14, 2026" */
export function longDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** "sept" style short month */
export function monthShort(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toLowerCase();
}

export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

/** published writing, newest first */
export async function getWriting() {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** published projects, newest first */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type Book = CollectionEntry<'books'>;

/**
 * Collections loaded from a YAML list come back sorted by id. This puts them
 * back in the order you wrote them in the file.
 */
export function inFileOrder<T extends { id: string }>(entries: T[], raw: string) {
  const order = [...raw.matchAll(/^- id:\s*["']?([^"'\n]+?)["']?\s*$/gm)].map((m) => m[1]);
  return [...entries].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

export async function getBooks() {
  const raw = (await import('../data/books.yaml?raw')).default;
  return inFileOrder(await getCollection('books'), raw);
}

/** small, stable pseudo-random number from a string — used for "imperfect" rotations */
export function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** a rotation between -max and +max degrees, stable per string */
export function tilt(str: string, max = 2.5) {
  return +((hash(str) * 2 - 1) * max).toFixed(2);
}

const coverPalette = ['#c8391e', '#27406b', '#5d7a3a', '#d98b3a', '#8fb3c4', '#d77fa1', '#e0c35a', '#1f1d1a', '#7a8c7e', '#9a7b3f'];

export function bookColor(book: Book) {
  return book.data.color ?? coverPalette[Math.floor(hash(book.id) * coverPalette.length)];
}

/** pick readable text for a given background hex */
export function inkFor(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return '#1d1b18';
  const [r, g, b] = m.map((x) => parseInt(x, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.3 ? '#1d1b18' : '#f7f2e8';
}

/** [######----] 62% */
export function asciiBar(pct = 0, width = 16) {
  const filled = Math.round((pct / 100) * width);
  return `[${'#'.repeat(filled)}${'·'.repeat(width - filled)}]`;
}

export function stars(n = 0) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}
