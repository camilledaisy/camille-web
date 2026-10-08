---
title: The Emotional Vending Machine
date: 2026-10-08
type: creative
summary: A vending machine for feelings. Pick what you need, press dispense, and collect a tiny object with a message, a joke or a game. Some things you need aren't sold in stores.
image: /img/emotional-vending-machine/cover.jpg
status: finished
role: design + code
tools: [React, TypeScript, Tailwind CSS, Motion, SVG, localStorage]
featured: true
---

An old vending machine on a quiet street at 2 AM, except it sells small comforts instead of snacks.

<div class="vm-embed">
  <iframe src="/play/emotional-vending-machine/" title="The Emotional Vending Machine, an interactive vending machine that dispenses small comforts" loading="lazy"></iframe>
</div>

[Open it full screen →](/play/emotional-vending-machine/)

## How it works

Wake the machine, choose what you need today (a little reassurance, something to laugh at, a reason to look forward to tomorrow, to feel understood, a distraction, or "I don't know, actually") and press DISPENSE. A small object drops into the tray. Click it and it opens into a collectible card.

Everything you collect goes on **my little shelf**. You can rearrange it, favourite the ones you love, and save any card as an image. It is all stored on your own device, so there are no accounts and nothing to sign up for.

## Little details

- Every object is hand-drawn as an SVG, with a name, a message and its own inventory number. Some are dry, some are kind, and some are just strange.
- "Something to laugh at" is entirely photos I love.
- The distraction objects come with tiny games: a maze, a word game, bubble wrap, sliding tiles and a few more. None of them has a timer or a way to lose.
- Choosing "I don't know, actually" hands you a wrapped parcel. Even the machine doesn't know what's inside.
- The machine has a personality. It is awkward, dry, and not a therapist. Sometimes it glitches ("ERROR: TOO MANY FEELINGS") and then recovers.
- The lighting follows the time of day where you are. If you let it, it also checks the weather.
- There are a few hidden things: a maintenance log, a hatch, a cat on the roof, and a birthday on October 12.
- It works with a keyboard and a screen reader, sound is off until you switch it on, and "calm motion" turns the movement down.

<style>
  .vm-embed {
    max-width: 640px;
    margin-inline: auto;
    border: 1px solid var(--rule);
    background: var(--paper-3);
    padding: 8px;
    box-shadow: var(--shadow);
  }
  .vm-embed iframe {
    display: block;
    width: 100%;
    height: min(860px, 88vh);
    border: 0;
  }
</style>
