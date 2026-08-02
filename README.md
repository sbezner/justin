# Red Clay & Lost Pines

An illustrated history of the Republican Party in **Bastrop County, Texas** — told as
three parties that shared one name: the freedmen's party at Cedar Creek in the 1870s and
1880s, a landslide-year visitor in 1972 and 1984, and the governing majority the county
has had since 2000.

## Live site

Served by GitHub Pages from `main`, root directory.

To enable: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)`**.

## What's here

```
index.html                    the whole history, as semantic HTML
assets/css/style.css          design tokens, both themes, all components
assets/js/main.js             progressive enhancement only — nothing here is required
.nojekyll                     serve the tree verbatim
.claude/agents/               the two specialist agents this was researched and designed by
.claude/research/             the historian's brief and the authoritative content spec
.claude/design/               the design direction and the original prototype
```

No build step, no dependencies, no external requests. Open `index.html` directly, or:

```bash
python3 -m http.server 8000
```

## On the history

**The previous version of this page was wrong about its own central claim.** It said
Bastrop County voted for John C. Frémont in 1856, following the Handbook of Texas entry
for the county. Frémont was not on the ballot in Texas and received no votes in the
state — the 1856 race here was Buchanan against Fillmore. The claim is gone, and the
page now carries an explicit correction where it used to be.

What replaced it is better history anyway: on February 23, 1861 the county voted against
secession, 352 to 335 — one of roughly 18 of the 122 counties reporting to reject it —
and then armed Confederate companies regardless.

Principles the page holds to:

- **Every claim is sourced**, and the sources are listed with what each one supports.
- **Numbers are quoted, not computed.** Where something is our arithmetic — a margin, a
  percentage change — it is labeled *derived*.
- **Gaps are shown as gaps.** County presidential returns for 1980, 2008, 2012 and 2016
  could not be verified and are rendered as missing rather than estimated. Widely
  syndicated tables that appear to give Bastrop County results for those years in fact
  reproduce **Texas statewide** figures; they were found, checked, and rejected.
- **Hedges survive.** Where a source says "virtually every" or "a plurality", so does the
  page.
- **The label is not the party.** The Republican Party of 1856, of 1872 and of 2024 are
  different coalitions sharing a name. The page says so, up front.

The county's Republican electorate of 1869–1890 was overwhelmingly Black, and it did not
drift away — it was destroyed, first by violence at Cedar Creek and then by the poll tax
and the white primary. The page tells that, because a history that leaves it out is a
worse history.

## Design and accessibility

- **Interface colour is brass.** Clay red and slate blue are reserved exclusively for
  party data, so red on this page always means a vote share and never a button.
- **Colour is never the only encoding.** Republican and Democratic marks differ in
  luminance *and* in texture, so the charts survive greyscale, print, and colour-blindness.
- **Charts are honest.** They show their residual instead of dropping it, label derived
  figures, mark unverified years as gaps, and carry their source inline.
- **It works without JavaScript.** The document renders complete — charts are authored as
  ruled tables in the markup and *upgraded* by script. If a script throws, the page
  reverts to that baseline.
- **Motion fully degrades** under `prefers-reduced-motion`.

Verified in both themes: no-JS renders the full document with all six data tables; no
horizontal overflow from 320px to 2560px; zero console errors; zero external requests.

## Provenance

Researched and designed by two specialist agents defined in `.claude/agents/` — a Texas
political historian specializing in Bastrop County, and a UX designer with a background in
political and civic properties. Their working documents are in `.claude/research/` and
`.claude/design/`, including the corrections that overturned the original page.

---

This is an independent history project. It is not published by, affiliated with, or
endorsed by the Bastrop County Republican Party, or by any candidate or committee.
