# Red Clay & Lost Pines

An illustrated, scroll-driven web app telling the story of the Republican Party in
**Bastrop County, Texas** — from the county's vote for John C. Frémont in 1856, through
Reconstruction at Cedar Creek and the ninety-four-year Democratic run that followed, to
Nixon's 1972 turn, Bush country, and a modern county party organizing one of the
fastest-growing counties in Texas.

## Live site

Served with GitHub Pages from the `main` branch, root directory.

To enable: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)`**.

## What's here

```
index.html            the whole story, as semantic HTML (readable with JS off)
assets/css/style.css  design system: Lost Pines palette, dark + light themes
assets/js/main.js     scroll progress, reveals, ember canvas, counters, data tiles
.nojekyll             tells Pages to serve the files as-is
```

No build step, no dependencies, no external requests — open `index.html` directly or
serve the folder with any static server:

```bash
python3 -m http.server 8000
```

## Design notes

- **Palette** — loblolly pine greens and the red clay of the Colorado River bottom,
  with a gold accent. Dark by default; a light "parchment" theme is one click away and
  remembered in `localStorage`.
- **Motion** — the hero embers, parallax ridges, tile cascades, counters, and reveal
  animations all respect `prefers-reduced-motion` and pause when off-screen or hidden.
- **Accessibility** — skip link, visible focus rings, real headings and landmarks,
  decorative canvas and data tiles hidden from assistive tech, text content readable
  without JavaScript.

## About the history

Every factual claim on the page is footnoted in the **Sources & Notes** section, which
links to the Handbook of Texas, Texas Highways, Ballotpedia, KVUE, USAFacts, KXAN, the
FEC, and the county party's own site. Where a fact was unavailable it was left out rather
than estimated — the vote-share charts show only the two elections with verified county
totals (2020 and 2024).

This is an independent history project. It is not published by, affiliated with, or
endorsed by the Bastrop County Republican Party or any candidate or committee.
