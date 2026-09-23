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

### Books

In `src/data/books.yaml`, every book has a `shelf`: `reading`, `finished`, or `want`. Add `favorite: true` to put it on the Favorites shelf. Finished a book? Change its shelf to `finished` and add `finished: 2026-10-01` (and a `rating` if you like). The comment at the top of the file lists every option.

### The “Currently” box

In `src/site.config.ts`, edit `currently.items` and bump `currently.updated`.

---

## Hidden things

A few easter eggs live in `src/scripts/site.ts`: the Konami code (↑↑↓↓←→←→BA), typing “garden”, clicking the big name on the homepage, a dot in the footer, the tab title when you leave, and a note in the console. The secret page is `src/pages/secret.astro`.

## Deploying

It’s a fully static site. Netlify, Vercel, Cloudflare Pages and GitHub Pages all work: the build command is `npm run build` and the output folder is `dist`. Once you have a domain, set `site` in `astro.config.mjs` so the RSS feed has correct links.
