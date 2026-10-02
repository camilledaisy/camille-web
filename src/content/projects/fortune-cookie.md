---
title: Fortune Cookies
date: 2026-10-02
type: creative
summary: A little paper bag of fortune cookies. Tap the bag to shake one out, crack it open, and read the fortune folded inside. Eight a day.
image: /img/fortune-cookie/cover.jpg
status: finished
role: design + code
tools: [HTML, CSS, JavaScript, Web Audio]
---

A paper bag of fortune cookies that lives on a screen. Something small, just for you.

<div class="fortune-embed">
  <iframe src="/play/fortune-cookie/" title="Fortune Cookies, an interactive bag of fortune cookies" loading="lazy"></iframe>
</div>

[Open it full screen →](/play/fortune-cookie/)

## How it works

Tap the bag and it shakes until a cookie pops out of the top. Tap the cookie and it snaps in two along its fold. The fortune slides out of the crack, still folded, then opens to show its message and its lucky numbers.

There are eight cookies in the bag each day, like the old takeout bags. Once they're gone, the bag is empty until tomorrow.

## Little details

- The bag is a cut-out of a real takeout bag, with my own daisy seal printed where the logo used to be.
- The cookie is a real photo too, split into its front and back halves so it breaks along the actual fold.
- Every fortune comes with its own printed lucky numbers, like the slips you find in real cookies.
- It has sound: the bag rustles, the cookie crunches and the paper slides and flicks open. Everything is made in the browser, and "sound: on" in the corner turns it off.
- "Send this to someone" passes a fortune on to a friend.

<style>
  .fortune-embed {
    max-width: 420px;
    margin-inline: auto;
    border: 1px solid var(--rule);
    background: var(--paper-3);
    padding: 8px;
    box-shadow: var(--shadow);
  }
  .fortune-embed iframe {
    display: block;
    width: 100%;
    height: min(760px, 85vh);
    border: 0;
  }
</style>
