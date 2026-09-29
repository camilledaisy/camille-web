---
title: Jar of Lucky Stars
date: 2026-09-28
type: creative
summary: A little watercolour jar full of paper lucky stars. Tap the jar for a star, tap the star to unfold its message, and catch the ones that wander by.
image: /img/lucky-stars/cover.jpg
status: finished
role: design + code
tools: [HTML, CSS, JavaScript, SVG]
---

A jar of paper lucky stars that lives on a screen. Each one is folded around a small, kind message.

<div class="lucky-embed">
  <iframe src="/play/lucky-stars/" title="Jar of Lucky Stars, an interactive jar of paper stars" loading="lazy"></iframe>
</div>

[Open it full screen →](/play/lucky-stars/)

## How it works

Tap the jar and a star drifts out. Tap the star and it unfolds into a strip of paper with a message. Fold it back and it winds up into a star again and drops into the jar, a little paler now that it has been read.

Every so often a star wanders across the screen. Catch it (drag it onto the jar or just tap it) and it joins the others, with a message of its own.

## Little details

- The painting follows the time of day: morning, afternoon, dusk and night. The label in the corner switches between them.
- The jar leans toward your cursor, and the stars inside shift and settle.
- Stars come in different papers (plain, striped, speckled, pearly), and each jar hides one rare golden star.
- The look started from a few pictures I love: a grainy pastel print, a watercolour, and a cross-stitch pattern, which became the stitched arch around the jar.

<style>
  .lucky-embed {
    max-width: 420px;
    margin-inline: auto;
    border: 1px solid var(--rule);
    background: var(--paper-3);
    padding: 8px;
    box-shadow: var(--shadow);
  }
  .lucky-embed iframe {
    display: block;
    width: 100%;
    height: min(760px, 85vh);
    border: 0;
  }
</style>
