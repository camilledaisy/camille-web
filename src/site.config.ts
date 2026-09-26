/**
 * ✿ the little control panel for the whole site ✿
 *
 * Most of the "about you" text lives here. Edit freely — everything is plain
 * text. Links inside strings are not supported here on purpose; keep it simple.
 */

export const site = {
  name: 'Daisy',
  // shown in the browser tab after each page title
  title: 'Daisy — a personal corner of the internet',
  description:
    'Daisy’s digital garden: things made, things read, things half-thought.',
  // shows up in the masthead. bump it whenever you feel like the site has had a new era
  volume: 'vol. 01',
  established: '2026',
  // a place you're writing from — purely decorative
  location: 'somewhere with good light',
  // used for the little clock in the header. find yours at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timezone: 'America/New_York',
  email: 'daisyko7@outlook.com',
};

/** The paragraph on the homepage, right under your name. */
export const intro = [
  'Hi, I’m Daisy. I design things for screens, read too many books at once, and keep a running list of small beautiful things I notice.',
  'This is my corner of the internet — part notebook, part scrapbook, part archive of things I’ve made. Nothing here is finished. That’s kind of the point.',
];

/**
 * The "Currently" box on the homepage.
 * `label` is the left column, `value` is the right. Add or remove rows freely.
 */
export const currently = {
  updated: '2026-09-26',
  items: [
    { label: 'making', value: 'an AAC app' },
    { label: 'listening to', value: 'Sun Bleached Flies by Ethel Cain' },
    { label: 'learning', value: 'UX research' },
    { label: 'drinking', value: 'pistachio jasmine coconut from Molly Tea' },
  ],
};

/** Main navigation. `alt` is the text that appears when you hover. */
export const nav = [
  { href: '/', label: 'Home', alt: 'front door' },
  { href: '/projects', label: 'Projects', alt: 'things i made' },
  { href: '/writing', label: 'Writing', alt: 'thoughts, mostly' },
  { href: '/reading', label: 'Reading', alt: 'the shelf' },
  { href: '/about', label: 'About', alt: 'hi, it’s me' },
];

/** Elsewhere on the internet — shows up in the footer and on the about page. */
export const elsewhere = [
  { label: 'email', href: 'mailto:daisyko7@outlook.com' },
  { label: 'letterboxd', href: 'https://letterboxd.com/camnism/' },
];
