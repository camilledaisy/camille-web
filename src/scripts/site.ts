/**
 * All the little interactive bits. Everything here is optional sugar:
 * the site works fine without JavaScript.
 */

const root = document.documentElement;
const finePointer = matchMedia('(pointer: fine)').matches;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode, etc. — that's fine */
    }
  },
};

/* ---------- toast: a little sticky note that pops up ---------- */
let toastTimer: number | undefined;
function toast(html: string, ms = 4200) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.innerHTML = html;
  document.body.append(el);
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.remove(), ms);
}

document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-toast]');
  if (!t) return;
  e.preventDefault();
  toast(t.dataset.toast!);
});

/* ---------- theme toggle ---------- */
function currentTheme() {
  return root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  const label = () => {
    const dark = currentTheme() === 'dark';
    btn.innerHTML = dark ? '<span aria-hidden="true">☀</span> lights on' : '<span aria-hidden="true">☾</span> lights off';
    btn.setAttribute('aria-pressed', String(dark));
  };
  label();
  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
    label();
  });
});

/* ---------- local clock + a guess at what I'm doing ---------- */
const clock = document.querySelector<HTMLElement>('[data-clock]');
if (clock) {
  const tz = clock.dataset.tz || undefined;
  const doing = (h: number) =>
    h < 6 ? 'probably asleep' : h < 9 ? 'making coffee' : h < 12 ? 'working' : h < 14 ? 'lunch, reading' : h < 18 ? 'making things' : h < 22 ? 'reading, probably' : 'should be asleep';
  const tick = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
    const hour = Number(now.toLocaleString('en-GB', { hour: '2-digit', hour12: false, timeZone: tz }));
    clock.textContent = `${time} here · ${doing(hour)}`;
  };
  tick();
  setInterval(tick, 30_000);
}

/* ---------- visit counter (only in your own browser — no tracking) ---------- */
const visits = document.querySelector<HTMLElement>('[data-visits]');
if (visits) {
  const n = Number(store.get('visits') || 0) + 1;
  store.set('visits', String(n));
  visits.textContent =
    n === 1 ? 'your first visit, welcome' : n < 5 ? `you’ve been here ${n} times` : `visit no. ${n}. hi again, friend`;
}

/* ---------- cursor companion: elements with data-cursor="text" ---------- */
const label = document.querySelector<HTMLElement>('.cursor-label');
const preview = document.querySelector<HTMLElement>('.hover-preview');
const previewImg = preview?.querySelector('img');

if (finePointer && label && preview && previewImg) {
  let x = -100,
    y = -100,
    px = -100,
    py = -100;
  let raf = 0;

  const render = () => {
    // the preview trails behind a little, like it's being dragged on a string
    px += (x - px) * (calm ? 1 : 0.18);
    py += (y - py) * (calm ? 1 : 0.18);
    label.style.transform = `translate3d(${x + 18}px, ${y + 14}px, 0)`;
    preview.style.transform = `translate3d(${px + 24}px, ${py - 120}px, 0)`;
    if (Math.abs(x - px) > 0.5 || Math.abs(y - py) > 0.5) raf = requestAnimationFrame(render);
    else raf = 0;
  };

  addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    },
    { passive: true },
  );

  document.addEventListener('pointerover', (e) => {
    const el = e.target as HTMLElement;
    const c = el.closest<HTMLElement>('[data-cursor]');
    if (c) {
      label.textContent = c.dataset.cursor!;
      label.classList.add('is-on');
    } else label.classList.remove('is-on');

    const p = el.closest<HTMLElement>('[data-preview]');
    if (p) {
      if (previewImg.getAttribute('src') !== p.dataset.preview) previewImg.src = p.dataset.preview!;
      preview.style.rotate = `${(Math.random() * 10 - 5).toFixed(1)}deg`;
      preview.classList.add('is-on');
    } else preview.classList.remove('is-on');
  });
  document.addEventListener('pointerleave', () => {
    label.classList.remove('is-on');
    preview.classList.remove('is-on');
  });
}

/* ---------- filters: [data-filters] buttons toggle [data-filter-item] ---------- */
document.querySelectorAll<HTMLElement>('[data-filters]').forEach((bar) => {
  const scope = document.querySelector<HTMLElement>(bar.dataset.filters!) ?? document.body;
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('button[data-value]')];
  const apply = (value: string) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
    scope.querySelectorAll<HTMLElement>('[data-filter-item]').forEach((item) => {
      item.hidden = value !== 'all' && item.dataset.filterItem !== value;
    });
    // hide year groups that ended up empty
    scope.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((g) => {
      g.hidden = !g.querySelector('[data-filter-item]:not([hidden])');
    });
    const url = new URL(location.href);
    if (value === 'all') url.searchParams.delete('f');
    else url.searchParams.set('f', value);
    history.replaceState(null, '', url);
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.value!)));
  const initial = new URL(location.href).searchParams.get('f');
  if (initial && buttons.some((b) => b.dataset.value === initial)) apply(initial);
});

/* ---------- scrapbook: shuffle the collage ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-shuffle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll<HTMLElement>(btn.dataset.shuffle!).forEach((el) => {
      el.style.setProperty('--rot', `${(Math.random() * 10 - 5).toFixed(1)}deg`);
      el.style.setProperty('--dx', `${Math.round(Math.random() * 30 - 15)}px`);
      el.style.setProperty('--dy', `${Math.round(Math.random() * 30 - 15)}px`);
    });
  });
});

/* ---------- petals: click the big name on the homepage ---------- */
let nameClicks = 0;
document.querySelectorAll<HTMLElement>('[data-petals]').forEach((el) => {
  el.addEventListener('click', (e) => {
    nameClicks++;
    const glyphs = ['✿', '❀', '✽', '*', '❁'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      p.style.left = `${e.clientX}px`;
      p.style.top = `${e.clientY}px`;
      p.style.setProperty('--dx', `${Math.round(Math.random() * 160 - 80)}px`);
      p.style.setProperty('--r', `${Math.round(Math.random() * 360)}deg`);
      p.setAttribute('aria-hidden', 'true');
      document.body.append(p);
      setTimeout(() => p.remove(), 1700);
    }
    if (nameClicks === 7) toast('ok ok, that’s enough flowers. (there’s a secret in the footer, though.)');
  });
});

/* ---------- easter eggs ---------- */
// 1. the konami code → a trip back to 1999
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let k = 0;
// 2. typing the word "garden" anywhere
let typed = '';

addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement;
  if (target.matches('input, textarea, [contenteditable]')) return;

  k = e.key === konami[k] || e.key.toLowerCase() === konami[k] ? k + 1 : e.key === konami[0] ? 1 : 0;
  if (k === konami.length) {
    k = 0;
    const on = root.classList.toggle('y2k');
    toast(on ? '~*~ welcome to 1999 ~*~ (enter the code again to come back)' : 'back to the present. it’s nicer here, probably.');
  }

  if (e.key.length === 1) {
    typed = (typed + e.key.toLowerCase()).slice(-6);
    if (typed === 'garden') toast('you said the magic word. <a href="/secret">come see →</a>', 7000);
  }
});

// 3. a note for people who leave the tab
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? '✿ come back soon' : originalTitle;
});

// 4. hello, fellow inspector of elements
console.log(
  '%c✿ hi! %cyou’re poking around in the console. i respect that.\n  try: the konami code, typing "garden", or clicking my name a lot.',
  'color:#4f6f2a;font-size:20px;font-family:Georgia,serif',
  'color:inherit;font-family:monospace',
);
