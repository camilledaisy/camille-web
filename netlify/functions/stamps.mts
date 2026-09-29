/**
 * The guestbook stamps: GET lists them, POST adds one.
 *
 * Runs as a Netlify Function and keeps its data in Netlify Blobs, so there is
 * nothing to set up — it works as soon as the site is deployed on Netlify.
 * Visitors can only leave a stamp (a shape + a position), never text, so
 * there's nothing to moderate.
 */
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

/**
 * Which "page" of the guestbook is showing. To wipe the card clean and start
 * fresh, change this to any new name (e.g. 'page-3') and publish — visitors
 * will see an empty card. Old stamps aren't shown anymore (they just sit
 * unused in Netlify's storage).
 */
const GUESTBOOK_PAGE = 'page-2';

/** how many different stamp shapes exist (must match the site's stamp picker) */
const SHAPES = 6;
/** the card only shows the newest stamps so it doesn't get too crowded */
const MAX_SHOWN = 240;

export interface Stamp {
  x: number; // 0–1, across the card
  y: number; // 0–1, down the card
  s: number; // which shape
  r: number; // rotation, degrees
  t: number; // when (ms since epoch)
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const inRange = (n: unknown, lo: number, hi: number): n is number =>
  typeof n === 'number' && Number.isFinite(n) && n >= lo && n <= hi;

export function parseStamp(body: unknown, now = Date.now(), rand = Math.random): Stamp | null {
  if (!body || typeof body !== 'object') return null;
  const { x, y, s } = body as Record<string, unknown>;
  if (!inRange(x, 0, 1) || !inRange(y, 0, 1) || !inRange(s, 0, SHAPES - 1) || !Number.isInteger(s)) return null;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return { x: round(x), y: round(y), s, r: Math.round(rand() * 50 - 25), t: now };
}

/*
 * Each stamp is saved as its own tiny entry, with everything about it packed
 * into the entry's name. Stamps never overwrite each other (no lost stamps when
 * two people stamp at once), and the whole card can be read with a single list.
 */
export function toKey(st: Stamp, rand = Math.random) {
  const id = Math.floor(rand() * 1e6).toString().padStart(6, '0');
  return [st.t, id, Math.round(st.x * 1000), Math.round(st.y * 1000), st.s, st.r + 25].join('_');
}
export function fromKey(key: string): Stamp | null {
  const m = key.match(/^(\d{1,15})_\d{6}_(\d{1,4})_(\d{1,4})_(\d)_(\d{1,2})$/);
  if (!m) return null;
  const [t, x, y, s, r] = [m[1], m[2], m[3], m[4], m[5]].map(Number);
  return { t, x: x / 1000, y: y / 1000, s, r: r - 25 };
}

export default async (req: Request, _context: Context) => {
  const store = getStore({ name: `guestbook-${GUESTBOOK_PAGE}`, consistency: 'strong' });

  if (req.method === 'GET') {
    const { blobs } = await store.list();
    const stamps = blobs
      .map((b) => fromKey(b.key))
      .filter((st): st is Stamp => st !== null)
      .sort((a, b) => a.t - b.t);
    return json({ stamps: stamps.slice(-MAX_SHOWN), total: stamps.length });
  }

  if (req.method === 'POST') {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'bad request' }, 400);
    }
    const stamp = parseStamp(body);
    if (!stamp) return json({ error: 'bad stamp' }, 400);
    await store.set(toKey(stamp), '');
    return json({ stamp }, 201);
  }

  return json({ error: 'method not allowed' }, 405);
};

export const config: Config = {
  path: '/api/stamps',
  method: ['GET', 'POST'],
  // a gentle limit per visitor so nobody can flood the card
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
