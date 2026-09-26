/**
 * ✿ COMMUNIMATE — all the words on the case-study page live here ✿
 *
 * The page itself is src/pages/projects/communimate.astro, but you should
 * rarely need to open it. Update this file as the project moves along.
 *
 * Tips:
 *  - Text goes between quotes. If your text contains a ' (apostrophe), use a
 *    curly one (’) or wrap the text in "double quotes" instead.
 *  - Every list item ends with a comma.
 *  - Dates are written YYYY-MM-DD.
 *  - Leave a list empty ([]) and the page shows a tidy "in progress" placeholder.
 */

/* ── status ─────────────────────────────────────────────────────────────── */

export const status = {
  // shown in the badge near the top of the page
  label: 'Ongoing',
  detail: 'Research in progress',
  // bump this whenever you update the page
  lastUpdated: '2026-09-26',
  // should match the stage marked 'current' in `process` below
  phase: 'Secondary research / problem exploration',
};

/* ── hero ───────────────────────────────────────────────────────────────── */

export const hero = {
  title: 'Communimate',
  tags: ['AAC', 'Accessibility', 'UX Research', 'Product Design'],
  context: 'Independent Project · 2026 — Ongoing',
  description:
    'Exploring how AAC tools can support communication while creating an experience that feels accessible, approachable, and designed with children in mind.',
  // When you have a mockup: put the file in public/img/communimate/ and fill
  // these in, e.g. src: '/img/communimate/hero.png'. Until then a placeholder shows.
  image: {
    src: '',
    alt: '', // describe what the image shows, e.g. "Early sketch of a symbol grid on a tablet"
    caption: '',
  },
};

/* ── 01 overview ────────────────────────────────────────────────────────── */

export const overview = [
  'Communimate is an ongoing, independent UX research and product design project. I’m exploring how augmentative and alternative communication (AAC) tools could offer a more approachable, accessible, and child-friendly experience for children with complex communication needs.',
  'The idea started when I noticed that many AAC interfaces I came across can feel visually dated, overwhelming, clinical, or expensive. That was an impression, not a conclusion — so before designing anything, I want to understand whether and where that’s true, and what an AAC experience would need in order to stay fully functional and accessible while also feeling inviting to use.',
  'This is not a finished product. Right now it’s mostly reading, note-taking, and learning to ask better questions.',
];

export const projectInfo = [
  { label: 'Role', value: 'UX Researcher / Product Designer' },
  { label: 'Team', value: 'Independent project' },
  { label: 'Timeline', value: '2026 — Ongoing' },
  { label: 'Focus', value: 'AAC, accessibility, communication, child-centered design' },
  { label: 'Phase', value: 'Secondary research / problem exploration' },
];

/* ── 02 the problem space ───────────────────────────────────────────────── */

export const problemSpace = {
  paragraphs: [
    'AAC supports people with complex communication needs — people who may experience difficulties with speech and/or language communication.',
    'The project is exploring a potential tension. AAC tools need to prioritize communication effectiveness and accessibility above everything else. But the experience of actually interacting with these tools may also shape how someone uses them.',
    'I’m not assuming existing AAC tools are poorly designed or inaccessible. These are questions I’m investigating, not answers I’ve reached.',
  ],
  // the two sides of the tension (shown side by side)
  mustPrioritize: ['Communication effectiveness', 'Accessibility'],
  mayAlsoMatter: ['Usability', 'Visual design', 'Affordability', 'Customization', 'Child-friendliness'],
};

/* ── 03 initial question ────────────────────────────────────────────────── */

export const initialQuestion =
  'How might AAC experiences better support children with complex communication needs while remaining accessible, approachable, and enjoyable to use?';

/* ── 04 what I know so far (secondary research) ─────────────────────────── */

// One entry per source. Copy a whole { … } block to add another.
// `notes` are paraphrased from the source — keep them close to what it actually says.
export const sources = [
  {
    id: 'beukelman-light',
    type: 'book', // book | paper | report | article | website | video
    authors: 'David R. Beukelman & Janice C. Light',
    title: 'Augmentative & Alternative Communication: Supporting Children and Adults with Complex Communication Needs',
    edition: 'Fifth Edition',
    year: '2020',
    publisher: 'Paul H. Brookes Publishing',
    link: '', // optional URL
    status: 'reading', // reading | read | to read
    notes: [
      'Approximately 97 million people worldwide have complex communication needs.',
      'AAC is an area of research, clinical practice, and educational practice focused on supporting people with significant communication disabilities.',
      'AAC can address communication involving both spoken and written modes.',
      'People with complex communication needs may experience restrictions in communication, participation, education, medical care, employment, family life, and community involvement.',
      'AAC has the potential to improve communication effectiveness and participation.',
    ],
  },
];

/* ── 05 research goals ──────────────────────────────────────────────────── */

export const goals = [
  'Better understand AAC and complex communication needs.',
  'Understand the experiences of children who use AAC.',
  'Explore the needs of parents, caregivers, educators, and speech-language professionals.',
  'Investigate usability and accessibility considerations in existing AAC tools.',
  'Understand what makes communication interfaces approachable for children without sacrificing functionality.',
  'Identify opportunities for improvement before designing a solution.',
];

/* ── 06 who I'm designing for ───────────────────────────────────────────── */

export const audiences = {
  primary: 'Children with complex communication needs who use or may benefit from AAC.',
  secondary: [
    'Parents and caregivers',
    'Speech-language pathologists',
    'Educators',
    'Other people involved in supporting the child’s communication',
  ],
};

/* ── 07 research process ────────────────────────────────────────────────── */

// state: 'done' | 'current' | 'next' | 'planned'
// As you move forward: mark the finished stage 'done', the new one 'current',
// the one after it 'next' — and update `status.phase` at the top.
export const process: { name: string; state: 'done' | 'current' | 'next' | 'planned' }[] = [
  { name: 'Secondary Research', state: 'current' },
  { name: 'Competitive / Comparative Analysis', state: 'next' },
  { name: 'User Research', state: 'planned' },
  { name: 'Synthesis', state: 'planned' },
  { name: 'Ideation', state: 'planned' },
  { name: 'Prototype', state: 'planned' },
  { name: 'Usability Testing', state: 'planned' },
  { name: 'Iteration', state: 'planned' },
];

/* ── 08 current research questions ──────────────────────────────────────── */

export const researchQuestions = [
  'What are the most important communication needs AAC tools must support?',
  'How do children interact with existing AAC interfaces?',
  'What usability barriers appear in existing AAC products?',
  'What role does customization play in AAC?',
  'How should visual design balance simplicity, engagement, and communication efficiency?',
  'What needs do caregivers, educators, and clinicians have when supporting AAC users?',
  'How important are affordability and access when choosing an AAC solution?',
];

/* ── 09 competitive research ────────────────────────────────────────────── */

// Empty for now → the page shows "Competitive analysis in progress." and a
// blank template card. To add a product, copy this block into the list:
//
//   {
//     product: 'Name of the app',
//     platform: 'iPad, Android…',
//     targetUsers: '',
//     approach: 'e.g. symbol-based grid, text-to-speech keyboard',
//     strengths: '',
//     concerns: '',
//     accessibility: '',
//     pricing: '',
//     notes: '',
//   },
export const competitors: {
  product: string;
  platform?: string;
  targetUsers?: string;
  approach?: string;
  strengths?: string;
  concerns?: string;
  accessibility?: string;
  pricing?: string;
  notes?: string;
}[] = [];

/* ── 10 research library ────────────────────────────────────────────────── */

// The "desk". Sources from section 04 appear here automatically.
// Add extra bits (quotes, screenshots, notes, links) below.
// kind: 'note' | 'quote' | 'link' | 'screenshot'
export const libraryExtras: {
  kind: 'note' | 'quote' | 'link' | 'screenshot';
  text: string;
  source?: string;
  href?: string;
  src?: string; // for screenshots, e.g. '/img/communimate/screenshot-1.png'
  alt?: string; // for screenshots: describe what's in the image
}[] = [];

// Empty slots on the desk, so it's clear more is coming. Remove as you fill them.
export const librarySlots = ['research paper', 'report / white paper', 'app screenshots', 'field notes'];

/* ── 11 design exploration ──────────────────────────────────────────────── */

// Leave `items` empty until you start designing. Each item:
//   { src: '/img/communimate/sketch-1.jpg', alt: 'describe it', caption: 'first sketch', kind: 'sketch' }
export const designExploration = {
  headline: 'Not designing yet.',
  subline: 'I want the research to shape the interface rather than designing a solution first.',
  items: [] as { src: string; alt: string; caption?: string; kind?: string }[],
  // placeholder frames shown while `items` is empty
  placeholders: ['sketches', 'wireframes', 'interface explorations', 'prototype'],
};

/* ── 12 what I'm learning ───────────────────────────────────────────────── */

export const learning = [
  'Communimate is as much a research project as it is a design project. I’m using it to practice approaching a problem without immediately jumping to a solution — learning about the people, context, constraints, and existing tools first.',
  'It’s also teaching me to be careful with what I claim. Right now I have questions, a few notes from reading, and a lot of curiosity. That feels like the right place to start.',
];

/* ── 13 what's next ─────────────────────────────────────────────────────── */

// state: 'done' | 'doing' | 'todo' — tick things off as you go
export const nextSteps: { text: string; state: 'done' | 'doing' | 'todo' }[] = [
  { text: 'Continue secondary research', state: 'doing' },
  { text: 'Study existing AAC products', state: 'todo' },
  { text: 'Develop research questions', state: 'todo' },
  { text: 'Determine an ethical and realistic user research approach', state: 'todo' },
  { text: 'Conduct interviews/observations if appropriate', state: 'todo' },
  { text: 'Synthesize findings', state: 'todo' },
  { text: 'Define design requirements', state: 'todo' },
  { text: 'Begin interface exploration', state: 'todo' },
];

/* ── changelog (bottom of the page) ─────────────────────────────────────── */

// newest first — a line or two each time you update the page
export const changelog = [{ date: '2026-09-26', text: 'Started this page. Secondary research underway.' }];
