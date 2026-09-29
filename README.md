# ✿ daisy’s corner

A personal website: part digital garden, part scrapbook, part blog. Built with [Astro](https://astro.build), plain CSS and a sprinkle of JavaScript.

```
npm install      # once
npm run dev      # local site at http://localhost:4321 (updates as you edit)
npm run build    # static site in ./dist — upload that folder anywhere
```

---

## How to edit things

Everything you’ll want to change regularly is a text file. You shouldn’t need to touch the page code.

| I want to…                                   | Edit this                                   |
| -------------------------------------------- | ------------------------------------------- |
| change my intro, “Currently” box, nav, links | `src/site.config.ts`                        |
| write a new post                             | add a `.md` file to `src/content/writing/`  |
| add a project                                | add a `.md` file to `src/content/projects/` |
| add / move a book                            | `src/data/books.yaml`                       |
| change the homepage scrapbook                | `src/data/scrapbook.yaml`                   |
| add images                                   | drop them in `public/img/`                  |
| rewrite the About page                       | `src/pages/about.astro` (it’s mostly plain HTML) |
| tweak colors / fonts                         | the top of `src/styles/global.css`          |

### A new post

Create `src/content/writing/my-post-name.md`. The filename becomes the URL (`/writing/my-post-name`).

```md
---
title: The title of the post
date: 2026-10-01
category: essay        # essay | personal | book thoughts | culture | random
description: One sentence that shows up under the title.
note: a tiny handwritten aside   # optional
draft: false                    # true = hidden from the site
---

Write here, in normal Markdown. *Italics*, **bold**, [links](https://example.com),

> quotes become big pull quotes,

## and headings get a little § in front.
```

To add a new category, add it to the list in `src/content.config.ts`.

### A new project

Create `src/content/projects/my-project.md`:

```md
---
title: My Project
date: 2026-10-01
type: ux               # ux | app | experiment | research | writing | creative
summary: One or two sentences.
image: /img/my-project.jpg      # optional, put the file in public/img/
status: finished       # finished | ongoing | dormant | abandoned
role: design + code             # optional
tools: [Figma, SwiftUI]         # optional
link: https://example.com       # optional
featured: true                  # show on the homepage
---

The write-up / case study goes here.
```

### Communimate (the case-study page)

Everything on `/projects/communimate` is written in **`src/data/communimate.ts`**, section by section, with comments explaining each part. You shouldn't need to open the page file.

- **Status & date:** edit `status` at the top (`lastUpdated`, `phase`).
- **Progress:** in `process`, mark stages `'done'`, `'current'`, `'next'` or `'planned'`; tick off `nextSteps` with `'done'`, `'doing'` or `'todo'`.
- **New source:** copy a `{ … }` block in `sources`.
- **Competitive analysis:** copy the commented template into `competitors`.
- **Images:** put files in `public/img/communimate/` and fill in `hero.image`, `designExploration.items` or `libraryExtras` — always with `alt` text describing the image.
- **Page log:** add a line to `changelog` whenever you update.

The case-study building blocks (status chips, timeline, source cards…) live in `src/components/case-study/` and can be reused for future case studies. A project with `customPage: true` in its Markdown file uses its own page in `src/pages/projects/` instead of the standard template.

### The guestbook (homepage scrapbook)

Visitors pick a stamp and click the card to leave it; everyone sees everyone's stamps. The stamps are stored by a small Netlify Function (`netlify/functions/stamps.mts`) using Netlify Blobs — no account or setup needed, it works automatically once the site is deployed on Netlify. (On a local preview the card says it opens once the site is live.)

- Visitors can only leave stamps (a shape and a spot), never text, so there's nothing to moderate.
- Each visitor can leave up to 5 stamps per visit, and the function is rate-limited.
- To clear all stamps and start a fresh card: in `netlify/functions/stamps.mts`, change `GUESTBOOK_PAGE` to a new name (e.g. `'page-3'`) and publish.

### Books

In `src/data/books.yaml`, every book has a `shelf`: `reading` (now), `finished` (recently finished — newest at the top), `read` (a while ago), or `want` (the to-read pile). Add `favorite: true` to put any book on the Favorites shelf. Finished a book? Change its shelf from `reading` to `finished` and move it to the top of that group. Dates (`finished: 2026-10-01`) and a `rating` are optional. The comment at the top of the file lists every option.

### The “Currently” box

In `src/site.config.ts`, edit `currently.items` and bump `currently.updated`.

---

## Hidden things

A few easter eggs live in `src/scripts/site.ts`: the Konami code (↑↑↓↓←→←→BA), typing “garden”, clicking the big name on the homepage, a dot in the footer, the tab title when you leave, and a note in the console. The secret page is `src/pages/secret.astro`.

## Deploying

It’s a fully static site. Netlify, Vercel, Cloudflare Pages and GitHub Pages all work: the build command is `npm run build` and the output folder is `dist`. Once you have a domain, set `site` in `astro.config.mjs` so the RSS feed has correct links.
