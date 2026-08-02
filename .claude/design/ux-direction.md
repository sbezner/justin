# Red Clay & Lost Pines — UX Direction

**Audit + design system for the Bastrop County Republicans history project**
Static HTML/CSS/JS. No build step, no dependencies, no network requests.

---

# PART ONE — AUDIT

Captured with headless Chromium at 1440×900, 768×1024 and 390×844, in both themes, plus a
JavaScript-disabled pass. Contrast measured numerically (WCAG 2.x relative luminance), not
eyeballed. Scripts and images are in the scratchpad.

## What is working — keep all of this

1. **The writing and the source discipline.** Ten numbered sources, each annotated with exactly
   which claim it supports, plus two explicit notes — one on how Greeley 1872 is counted, one
   disclaiming affiliation. That is better provenance than most professional civic sites ship.
   The whole visual system below is built to *display* this asset rather than bury it in a
   footer.
2. **Semantic HTML.** The heading outline runs clean: one `h1`, `h2` per chapter, `h3` per
   sub-item, no skips, no divs pretending to be headings. `<dl>` for the fact list, `<ol>` for
   sources, `<blockquote>` for the pullquote, `<aside>` for the sidebar. A skip link exists and
   works. This is a genuinely good document. Almost none of the redesign requires touching the
   content model.
3. **Performance posture.** Three requests total. No images, no fonts, no third-party anything.
   Zero measured CLS at load. This is the correct architecture and the redesign must not spend it.
4. **The two-theme decision, and the parchment idea specifically.** A light "parchment" mode is
   right for an archive. The implementation via a single `data-theme` attribute with
   `localStorage` persistence and a `prefers-color-scheme` fallback is correct and stays.
5. **Restraint in the type.** A serif for display and sans for interface is the right register,
   and it is already there. There are no clip-art flags, no stock crowds, no busy patriotic
   wallpaper. The page does not look like a campaign, which is most of the battle.
6. **The dark palette is genuinely good on contrast.** Every dark-theme text pairing passes AA
   with room: body 10.54:1, captions 6.61:1, links 5.34:1. The problems below are in the light
   theme and in the data colors, not in the dark text.
7. **`prefers-reduced-motion` is honored in the places that matter most** — the canvas never
   starts, the parallax never binds, the reveals resolve immediately. The gaps are narrow and
   listed below, but the intent is already implemented.
8. **The timeline component (Chapter Three)** is the one section that already does what the
   whole page should do: it has a spine, a rhythm, and a reason for its layout. It becomes an
   archetype in the new system rather than being replaced.

## Problems, ranked most damaging first

### 1 — With JavaScript disabled, the page is completely blank

**Diagnosis.** `[data-reveal] { opacity: 0 }` is the default state in CSS; only JS adds `.in`.
Every chapter head, every paragraph, every card, every source carries `data-reveal`. The
JS-disabled screenshot is 10,699px of empty background, a nav bar and a footer. Additionally
`#streakGrid` and `#precinctGrid` are empty `<div>`s that JS fills — with JS off, both
visualizations do not merely lose animation, they do not exist.

**Why it matters here.** This violates the project's own stated constraint. It also means any
JS error, any content blocker, any corporate proxy that strips scripts, and any text-extraction
crawler sees nothing. For a history project whose value is durability, having the entire
document contingent on a 268-line script is the wrong bet.

**Fix.** Invert the default. JS's first statement sets `document.documentElement.className += ' js'`.
CSS scopes the hidden state: `html.js [data-reveal] { opacity: 0; transform: translateY(12px) }`.
Both grids are authored in HTML as real `<table>` elements; JS *upgrades* them to SVG rather than
creating them. See §Charts.

### 2 — The one visualization that carries the story's central claim is unreadable in greyscale, unreadable to a screen reader, and unlabeled on touch

**Diagnosis.** The Long Century streak grid is the emotional core: 94 years, 25 elections, one
break. Three separate failures compound:
- `--blue-500 #3b6fb0` and `--clay-500 #c2410c` have a measured contrast ratio to each other of
  **1.01:1** — identical relative luminance. In greyscale, printed, screenshotted in monochrome,
  or viewed with any red-green color deficiency, the single Republican tile *vanishes into the
  field*. The claim is invisible precisely to the users who need redundancy.
- The container is `aria-hidden="true"` with no textual equivalent beyond the prose.
- Year labels live in `.tile:hover::after` — unavailable on touch, unavailable to keyboard.
- It is laid out as a 5×5 block of 90px rounded squares, which reads as a color-swatch palette,
  not as a run of time. Twenty-five years in a square grid has no direction; a run needs an axis.

**Fix.** New data color pair with a mandated ≥1.8:1 luminance separation (achieved: 2.11:1 dark,
2.02:1 light), plus redundant non-color encoding (fill vs. hatch), plus a linear year axis, plus
a real `<table>` underneath. See §Charts / RunStrip.

### 3 — Chapter Five, the narrative pivot, has no CSS at all

**Diagnosis.** `.bigstat`, `.bigstat-year`, `.chapter-turn` and `.chapter-long` appear in
`index.html` and appear **nowhere** in `style.css`. Verified by grep. So "The Turn" — 1972, the
first Republican to carry the county in ninety-four years, the hinge the entire narrative turns
on — renders as: the literal string "1972" at 17px body sans, followed by a paragraph running the
full 1140px container at roughly **130 characters per line**, roughly double the 62ch cap the
`.prose` rule enforces in every other chapter. It is the least designed moment on the page and it
should be the most.

**Fix.** "The Turn" becomes its own archetype — a single-fact viewport. See §Composition, Ch.5.

### 4 — The place is wrong

**Diagnosis.** The one place-specific graphic on the page is a three-layer zigzag ridge
silhouette. In light theme it renders unmistakably as pastel mint **mountains**. Bastrop County
has no mountains. It is blackland prairie and post-oak savannah on a bend of the Colorado River,
with a 70-square-mile disjunct stand of loblolly pine sitting a hundred miles west of the pine
belt it belongs to. The site is *named* for that stand and does nothing with it. A history
project whose only landscape asset is geographically false has spent credibility for decoration.

Compounding: the ember canvas. Ambient orange sparks drifting over a hero is tonally wrong on its
own terms for a history in this register, and it becomes actively bad once the 2011 Bastrop County
Complex Fire chapter lands — a fire that destroyed roughly 1,600 homes and killed two people. Fire
must not be ambient decoration on this site.

**Fix.** Replace the ridge with a **pine colonnade on a flat horizon**, plus the river bend. See
§Place.

### 5 — Light theme fails WCAG AA in four measured places, including the focus ring

Measured on the current tokens:

| Pairing | Measured | Required | Result |
|---|---|---|---|
| `--text-dim #6b7d72` on `--bg #f6f2e9` | **3.91:1** | 4.5 | FAIL |
| `--text-dim #6b7d72` on `--bg-alt #efe9dc` | **3.62:1** | 4.5 | FAIL |
| `--accent-2 #a97a17` (this is `a:hover`) on bg | **3.43:1** | 4.5 | FAIL |
| `.ballot .pt-u #916612` on card | **4.41:1** | 4.5 | FAIL |
| focus ring `--gold-400 #d9a441` on light bg | **2.01:1** | 3.0 | FAIL |

`--text-dim` is not a minor token — it sets every caption, every stat label, every
`chapter-dates`, every `deflist dt`, every source annotation, and the entire footer. And a link
that becomes *less* readable on hover is a straightforward defect. The focus ring at 2.01:1 means
keyboard users in light theme effectively lose the focus indicator. Political audiences skew older;
this is the median user, not an edge case.

### 6 — Below 1000px there is no navigation whatsoever

**Diagnosis.** `@media (max-width: 1000px) { .chapternav { display: none } }`. On phone and tablet
the header contains a wordmark and a theme toggle. The document is **14,160px tall at 390px wide —
16.8 viewports** — with no table of contents, no chapter list, no jump targets, and no indication
of length. Mobile is where most of this traffic will arrive.

### 7 — "By the Numbers" reads as a dashboard because it is structured as one

**Diagnosis.** Three unequal-height cards with ragged bottoms (`align-items: start` and no
equalization), then four gradient-text stat tiles in a row. Specifics:
- The bar tracks compute to roughly **125px wide**. Representing 56.0% versus 42.2% across 125px
  is a 17px difference. The chart is honest and illegible at the same time.
- 56.0 + 42.2 = 98.2. The missing 1.8% has no home in the component, so the design silently
  implies a two-party race.
- 22 precinct squares in a 6-column grid produce three full rows and a stub of four. It reads
  broken rather than composed.
- Gradient-filled numerals (`#f19256 → #ecc478` clipped to text) are the strongest "crypto
  dashboard" signal on the page, and they are attached to census figures.
- The section is titled "Chapter Seven," which is exactly the tell: a dashboard was given a
  chapter number to make it belong. It doesn't.

### 8 — Eight chapters, one layout

**Diagnosis.** The template is: mono eyebrow at 0.3em tracking → serif `h2` → mono date line →
optional lede → `grid-2` at `1.25fr / .95fr` → rounded card in the right column. Chapters 1, 2, 4
and 6 are structurally identical; 3 and 5 vary and 5 only because it is unstyled. Alternating
`.chapter-alt` background bands are the sole differentiator between adjacent sections, and a
2-value alternation across 170 years communicates nothing about era or movement.

Compounding: the right column is frequently empty. Chapter 2's pullquote is capped at 26ch and
left-aligned, leaving roughly 55% of a 1440px viewport blank; Chapter 1's lede at 34ch does the
same. The page reads as under-filled rather than generously spaced, because the emptiness is
ragged rather than composed.

### 9 — Register drift: the interface is dressed as a product, not an archive

Accumulated tells, each small, collectively decisive in the two seconds a visitor spends deciding
whether to trust the page:
- 16–20px border radii on every card, plus `0 18px 50px -18px rgba(0,0,0,.75)` drop shadows, plus
  `translateY(-4px)` on card hover. Cards that lift on hover are affordances for *clickable
  things*. None of these are clickable.
- `ui-monospace` at `letter-spacing: .34em` for every eyebrow and every date. Wide-tracked mono is
  a developer-tool signal.
- Gradient-filled display type in the hero and the stats.
- A pill-shaped gradient CTA with a colored glow shadow.
- An infinitely looping scroll-cue animation in the periphery.
- 999px border radii on nav items.

None of these is wrong in isolation. Together they say *SaaS landing page*, and the content says
*county historical society*.

### 10 — Motion and interaction defects

- **Reveal stagger is unbounded**: `setTimeout(..., i * 70)` where `i` is the IntersectionObserver
  entry index. A batch of ten intersecting elements makes the last one wait 700ms after it is
  already on screen.
- **Reveal distance is 26px**, large enough to read as the page assembling itself rather than
  settling.
- **`prefers-reduced-motion` overrides `animation-duration` but not `transition-duration`.** Card
  hover lift, the theme toggle's `rotate(-18deg)`, button `translateY`, and the 1.3s bar-fill
  width transition all survive reduced-motion. `.bar-fill` is explicitly re-disabled; the others
  are not.
- **Theme switching cross-fades the body over 500ms** (`transition: background .5s, color .5s`)
  while every child switches instantly, producing half a second of mismatched color.
- **670px of unreserved height** is injected below the fold by the two grid builders. Measured CLS
  is 0.0000 because the injection happens outside the viewport, so this is not a scored Core Web
  Vitals problem — but it is a real jump for anyone scrolled to that region during a slow load.

### 11 — Tap targets and the dead preconnect

- At 390px, **15 interactive elements are under 44×44px**. Every source link is a 17px-tall inline
  link; "Back to the top" is 16px; the theme toggle is 38×38.
- `<link rel="preconnect" href="https://fonts.googleapis.com">` is in `<head>` and nothing uses it.
  It opens a DNS + TCP + TLS connection to Google on every page load, for nothing. It violates the
  no-external-requests constraint and it is a privacy leak on a political page. Delete the line.

---

# PART TWO — DESIGN DIRECTION

## The idea: **The Ledger and the Ground**

Two things define this subject and neither is currently on the page.

**The ledger.** A county party's history *is* a record — poll books, tally sheets, precinct
returns, the minute book of the County Executive Committee. The visual language should be ruled
columns, tabular figures, hairlines, marginalia, and a visible chain of custody from every number
to its source. Not cards. Not tiles. Rules and columns.

**The ground.** The Lost Pines are a disjunct stand of loblolly pine sitting a hundred miles west
of the forest they belong to — an isolated population of something that has no business being
there, which survived. That is not a decorative fact; it is the same shape as the story of a
slaveholding frontier county that voted for Frémont in 1856. Use it as the structural motif:
**vertical trunks on a flat horizon**, repeated, isolated, standing. It is unmistakably Bastrop and
it is unmistakably not a stock mountain range.

**The register test.** Every decision answers: *would this appear in a well-funded county museum's
permanent exhibit?* Brass plaques, ruled tables, generous margins, quiet authority — yes. Glowing
pills, lifting cards, counting numbers — no.

**The color decision that makes it work.** The interface accent is **brass**, not red. Clay red
and slate blue are reserved *exclusively* for party data. This resolves the red-white-blue trap
directly: party colors carry data meaning only, never brand meaning, so a red on this page always
means "Republican vote share" and never means "this is a button."

---

## 1. Color tokens

All values below verified numerically. **124 checks, 0 failures.**
Method: WCAG 2.x relative luminance, `(L1+0.05)/(L2+0.05)`. Script preserved in scratchpad
(`palette3.js`) — re-run it after any palette edit.

### 1.1 Dark theme — "Blackland"

```css
:root, :root[data-theme="dark"] {
  /* surfaces */
  --bg:            #0F1512;   /* page */
  --bg-alt:        #141B17;   /* alternating band, footer */
  --surface:       #1A231F;   /* figure / table ground */
  --raised:        #212B26;   /* rail active state, toggle */

  /* lines */
  --hair:          #2C3833;   /* decorative separators only */
  --rule:          #42524B;   /* decorative heavier rule */
  --axis:          #64766E;   /* ANY line carrying data meaning */

  /* text */
  --text:          #F2F0EA;   /* headings, emphasis */
  --text-soft:     #CBD3CC;   /* BODY COPY */
  --text-dim:      #9BA9A1;   /* captions, labels, sources */

  /* interface accent — brass */
  --brass:         #D9A441;
  --brass-hi:      #EFC97F;
  --link:          #E0AC4D;
  --link-hover:    #EFC97F;
  --focus:         #F5C86A;

  /* DATA ONLY — never used for interface */
  --data-r:        #F0A177;
  --data-r-deep:   #B44E22;
  --data-d:        #4E7BAE;
  --data-d-deep:   #365A85;
  --data-neutral:  #B9A98C;   /* third party: TEXT + HAIRLINE ONLY, never a fill */

  /* provenance */
  --verified:      #8FBF9A;
  --unverified:    #B9A98C;
}
```

### 1.2 Light theme — "Sand & Newsprint"

```css
:root[data-theme="light"] {
  --bg:            #F7F4ED;
  --bg-alt:        #F0EBE0;
  --surface:       #FBF9F4;
  --raised:        #FFFFFF;

  --hair:          #DED5C4;
  --rule:          #B5A893;
  --axis:          #827661;

  --text:          #1B211D;
  --text-soft:     #3B453E;
  --text-dim:      #5A6660;

  --brass:         #8A5B10;
  --brass-hi:      #6E4809;
  --link:          #8A5B10;
  --link-hover:    #6E4809;
  --focus:         #8A5B10;

  --data-r:        #B4471F;
  --data-r-deep:   #8E3213;
  --data-d:        #1E3E60;
  --data-d-deep:   #152C45;
  --data-neutral:  #6B5C42;

  --verified:      #2F6B45;
  --unverified:    #6B5C42;
}
```

### 1.3 Era tints

Five stops, applied as `--bg` overrides on `<section data-era="...">`. This is the mechanism for
"a sense of movement through 170 years" — one desaturation/temperature axis, five stops, **not**
eight color schemes. Every stop was contrast-verified against `--text`, `--text-soft`, `--text-dim`
and `--focus`; all pass.

| Era | Range | Dark | Light | Feeling |
|---|---|---|---|---|
| `ground` | 1827–1855 | `#12160F` | `#F7F3E7` | warm sepia, soil |
| `rupture` | 1856–1873 | `#0F1512` | `#F7F4ED` | neutral, base |
| `iron` | 1874–1968 | `#101619` | `#F1F2F0` | cool, drained — the long century |
| `turn` | 1969–1999 | `#131611` | `#F8F4E9` | warming back |
| `present` | 2000– | `#141B17` | `#F0EBE0` | full value |

The shift is deliberately *sub-threshold per section* — you do not notice any single transition,
you notice that the 1890s felt colder than the 2020s when you get to the bottom. Total luminance
swing across the whole document is under 6%, so it never fights the text.

### 1.4 Verified contrast — the values that matter

**Dark theme**

| Pairing | Ratio | Min | |
|---|---|---|---|
| `--text` on `--bg` | 16.22:1 | 4.5 | PASS |
| `--text-soft` on `--bg` (body copy) | 12.08:1 | 4.5 | PASS |
| `--text-soft` on `--surface` | 10.53:1 | 4.5 | PASS |
| `--text-dim` on `--bg` | 7.55:1 | 4.5 | PASS |
| `--text-dim` on `--raised` (worst case) | 5.97:1 | 4.5 | PASS |
| `--link` on `--bg` | 8.96:1 | 4.5 | PASS |
| `--link-hover` on `--bg` | 11.73:1 | 4.5 | PASS |
| `--focus` on `--bg` | 11.75:1 | 3.0 | PASS |
| `--focus` on `--raised` (worst case) | 9.28:1 | 3.0 | PASS |
| `--axis` on `--surface` (worst case) | 3.34:1 | 3.0 | PASS |
| `--data-r` on `--surface` | 7.72:1 | 3.0 | PASS |
| `--data-d` on `--surface` | 3.66:1 | 3.0 | PASS |
| **`--data-r` vs `--data-d`** | **2.11:1** | 1.8 | PASS |
| `--bg` text on `--data-r` fill | 8.86:1 | 4.5 | PASS |
| `#FFF` on `--data-d-deep` | 7.10:1 | 4.5 | PASS |

**Light theme**

| Pairing | Ratio | Min | |
|---|---|---|---|
| `--text` on `--bg` | 14.91:1 | 4.5 | PASS |
| `--text-soft` on `--bg` (body copy) | 9.07:1 | 4.5 | PASS |
| `--text-dim` on `--bg` | 5.46:1 | 4.5 | PASS |
| `--text-dim` on `--bg-alt` (worst case) | 5.04:1 | 4.5 | PASS |
| `--link` on `--bg-alt` (worst case) | 4.93:1 | 4.5 | PASS |
| `--link-hover` on `--bg` | 7.37:1 | 4.5 | PASS |
| `--focus` on `--bg-alt` (worst case) | 4.93:1 | 3.0 | PASS |
| `--axis` on `--bg-alt` (worst case) | 3.26:1 | 3.0 | PASS |
| `--data-r` on `--bg-alt` (worst case) | 4.57:1 | 3.0 | PASS |
| `--data-d` on `--bg` | 9.99:1 | 3.0 | PASS |
| **`--data-r` vs `--data-d`** | **2.02:1** | 1.8 | PASS |
| `#FFF` on `--data-r` fill | 5.44:1 | 4.5 | PASS |
| `#FFF` on `--data-d` fill | 10.98:1 | 4.5 | PASS |

### 1.5 Color rules — non-negotiable

1. **Party colors are data-only.** `--data-r` / `--data-d` never appear on a button, a link, a
   border, an eyebrow, or a hover state. If red appears on this page it is a vote share.
2. **The R fill is always lighter than the D fill, in both themes.** Consistent relative ordering
   across themes; measured separation ≥1.8:1 so the pair survives greyscale, monochrome printing,
   screenshots, and color vision deficiency.
3. **Color is never the only encoding.** Every R/D distinction also carries: a solid vs. 45° hatch
   fill, *and* an in-place text label. See §Charts.
4. **Third-party / "other" is never a fill.** It renders as an unfilled segment with a hairline
   diagonal hatch on `--surface` plus a label. This is honest — "other" is a residual, not a party
   — and it removes an unwinnable three-way contrast problem.
5. **`--hair` and `--rule` are decorative** (measured 1.51:1 and 2.24:1 dark; 1.33:1 and 2.13:1
   light). They may never be the sole indicator of anything. Any line that bounds a chart, marks a
   zero baseline, or carries data meaning uses `--axis`, which clears 3:1 on every background.
6. **No gradients on text, ever.** No gradients at all except one permitted use: the 2011 wildfire
   chapter may use a single vertical `--surface → --data-r-deep` wash at ≤12% opacity behind the
   era plate. That is the only place fire color is allowed.
7. **`--verified` / `--unverified`** mark data provenance and nothing else.

---

## 2. Type

### 2.1 Families — system stacks, zero fetches

```css
--font-display: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua",
                Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia,
                "Times New Roman", serif;
--font-text:    var(--font-display);
--font-ui:      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif;
--font-figure:  var(--font-ui);   /* with tabular-nums, NOT monospace */
```

**Body copy moves from sans to serif.** This is the single change that moves register furthest.
System-ui body says *application*; a Georgia-class serif at 19px/32px says *published*. Georgia is
the guaranteed floor on every platform and is a good text face; Iowan / Charter / Sitka improve it
where present. No file is fetched and no file needs to be committed.

Sans is reserved for interface only: rail, nav, buttons, eyebrows, chart axes, labels, figcaptions.
The contrast between the two families becomes meaningful because each has one job.

**Monospace is deleted from the design.** Wide-tracked `ui-monospace` on every eyebrow and date is
a major contributor to the dashboard read. Figures get `font-variant-numeric: tabular-nums;
font-feature-settings: "tnum" 1, "lnum" 1` on the UI sans — you get column alignment without the
terminal connotation. Small-caps-style eyebrows use `--font-ui` at 12px / 600 / 0.14em tracking /
uppercase. The one surviving monospace-adjacent treatment is optional: the era rail's year ticks
may use `font-variant-numeric: tabular-nums` at 11px — still not a mono family.

### 2.2 The Bastrop Scale — ratio 1.250 (major third), base 19px

| Step | Desktop | Mobile | Line-height | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| `--t--2` | 12px | 12px | 16px / 1.333 | 600 | 0.14em | eyebrows, rail ticks, chart tick labels |
| `--t--1` | 15px | 14px | 24px / 1.60 | 400 | 0.005em | captions, figcaption, source lines, footnotes |
| `--t-0` | 19px | 17px | 32px / 1.684 | 400 | 0 | **body copy** |
| `--t-1` | 24px | 21px | 32px / 1.333 | 400 | 0 | dek, `h4`, table lead cell |
| `--t-2` | 30px | 25px | 40px / 1.333 | 500 | −0.005em | `h3` |
| `--t-3` | 37px | 30px | 44px / 1.189 | 400 | −0.01em | lede, epigraph small |
| `--t-4` | 46px | 36px | 52px / 1.130 | 400 | −0.015em | `h2` on short titles |
| `--t-5` | 58px | 42px | 62px / 1.069 | 400 | −0.018em | chapter title, epigraph |
| `--t-6` | 72px | 50px | 76px / 1.056 | 400 | −0.02em | single-fact display (Ch.5 "1972") |
| `--t-7` | 90px | 58px | 92px / 1.022 | 400 | −0.024em | hero title |

Body line-height 19/32 = exactly 4 × 8px, so body copy sits on the 8px baseline grid. Mobile is
17/28 = 3.5 × 8.

Fluid between 390px and 1200px viewport:

```css
--t--2: 0.75rem;
--t--1: clamp(0.875rem,  0.845rem + 0.124vw, 0.9375rem);
--t-0:  clamp(1.0625rem, 1.002rem + 0.247vw, 1.1875rem);
--t-1:  clamp(1.3125rem, 1.222rem + 0.370vw, 1.5rem);
--t-2:  clamp(1.5625rem, 1.412rem + 0.617vw, 1.875rem);
--t-3:  clamp(1.875rem,  1.664rem + 0.864vw, 2.3125rem);
--t-4:  clamp(2.25rem,   1.949rem + 1.235vw, 2.875rem);
--t-5:  clamp(2.625rem,  2.144rem + 1.975vw, 3.625rem);
--t-6:  clamp(3.125rem,  2.463rem + 2.716vw, 4.5rem);
--t-7:  clamp(3.625rem,  2.662rem + 3.951vw, 5.625rem);
```

The current hero jumps `clamp(3rem, 11vw, 7.5rem)` → 17px with nothing between, so the eye has no
path from the title to the first paragraph. The scale above puts four rungs (`--t-5`, `--t-3`,
`--t-1`, `--t-0`) on that ladder.

### 2.3 Measure

| Element | Measure | Rationale |
|---|---|---|
| body prose | **66ch** | ≈620px at 19px; lands in the 62–68 char band |
| lede | **44ch** | short enough to read as a unit, not a column |
| epigraph / pullquote | **28ch** | display setting |
| figcaption / source | **60ch** | at 15px, ≈480px |
| chapter dek | **52ch** | |
| chart tick labels | n/a | never wrap; rotate or thin instead |

Never allow a paragraph to run the full container. The Chapter Five defect (130ch) is the failure
mode this table exists to prevent.

### 2.4 Type rules

- Italic is meaning, not decoration: titles of works, and the one editorial aside per chapter.
- `text-wrap: balance` on `h1`/`h2`/`h3`/epigraph; `text-wrap: pretty` on `p` (both degrade
  silently where unsupported).
- `hyphens: none` — hyphenated serif display looks broken in screenshots.
- Numerals in running prose use the text serif. Numerals in tables, charts and figures use
  `--font-figure` with `tabular-nums`. Never mix within one column.
- No letter-spacing on anything above `--t-1` except the negative tracking in the table.
- `font-optical-sizing: auto` where the platform supplies it.

---

## 3. Space

8px base. One scale, used everywhere.

```css
--sp-0: 0;      --sp-1: 0.25rem;  /*   4 */  --sp-2: 0.5rem;   /*   8 */
--sp-3: 0.75rem;/*  12 */         --sp-4: 1rem;     /*  16 */
--sp-5: 1.5rem; /*  24 */         --sp-6: 2rem;     /*  32 */
--sp-7: 3rem;   /*  48 */         --sp-8: 4rem;     /*  64 */
--sp-9: 6rem;   /*  96 */         --sp-10: 8rem;    /* 128 */
--sp-11: 10rem; /* 160 */         --sp-12: 12rem;   /* 192 */
```

Applied:

| Slot | Value |
|---|---|
| section vertical padding | `clamp(var(--sp-9), 12vw, var(--sp-12))` — 96→192px |
| era plate → first content | `--sp-8` (64) |
| paragraph → paragraph | `--sp-5` (24) |
| heading → following text | `--sp-4` (16) |
| text block → figure | `--sp-8` (64) |
| figure → figcaption | `--sp-3` (12) |
| figcaption → source line | `--sp-2` (8) |
| chronicle item gap | `--sp-7` (48) |
| table row padding | `--sp-3` block, `--sp-4` inline |
| grid gutter | `clamp(20px, 5vw, 48px)` |

Radius and elevation, both drastically reduced:

```css
--radius-0: 0;      /* rules, bars, table cells, chart marks — the default */
--radius-1: 2px;    /* buttons, chips, badges */
--radius-2: 4px;    /* figure frames, disclosure sheets */
/* there is no --radius-3 */
--shadow-0: none;                                  /* the default */
--shadow-1: 0 1px 0 0 var(--hair);                 /* a rule, not a shadow */
--shadow-2: 0 8px 24px -12px rgb(0 0 0 / .35);     /* the TOC sheet only */
```

Depth is expressed by **rule weight and background value**, not by drop shadow. That is what
separates a ledger from a card deck.

---

## 4. Grid and breakpoints

### 4.1 Breakpoints

| Name | Range | Rail | Gutter | Base |
|---|---|---|---|---|
| `sm` | 0–599 | none | 20px | 17px |
| `md` | 600–899 | none | 28px | 17px |
| `lg` | 900–1119 | none | 40px | 19px |
| `xl` | 1120–1439 | 200px | 48px | 19px |
| `xxl` | 1440+ | 220px | 48px | 19px |

Only `900px` and `1120px` carry real layout changes. Two structural breakpoints is the target;
more than that is a system that has not decided what it is.

### 4.2 The canvas grid

One named-line grid, declared once on every `<section>`. Children declare only which column they
occupy. No nested grid systems, no utility classes.

```css
.canvas {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--gutter), 1fr)
    [rail-start]  var(--rail)
    [rail-end wide-start] minmax(0, 10rem)
    [text-start]  min(66ch, 100%) [text-end]
    minmax(0, 10rem) [wide-end]
    minmax(var(--gutter), 1fr) [full-end];
}
.canvas > *        { grid-column: text; }        /* default */
.canvas > .wide    { grid-column: wide; }        /* figures, charts, tables */
.canvas > .full    { grid-column: full; }        /* horizon band, era plate rule */
.canvas > .rail    { grid-column: rail; }        /* era rail track — RESERVED */
```

> **Correction (post-build).** An earlier version of this spec put *margin notes* in
> the `rail` column. That was wrong and it shipped a bug: at ≥1120px the era rail is
> `position: fixed` and is painted over that exact track, so marginalia were 100%
> invisible and their links were unclickable (`elementFromPoint` returned the rail's
> own `<li>`). The `rail` column is reserved for the era rail and nothing else.
> Marginalia belong in the **right** margin (`text-end / full-end`) at ≥1400px —
> navigation left, annotation right — and fall back into the text column below that,
> because between 1120 and 1399 the right track collapses to roughly nine characters.
>
> Related, same root cause: `--rail` is a **layout** token and must be declared on a
> bare `:root`. It was originally declared inside the `:root,:root[data-theme="dark"]`
> colour block, which scores (0,2,0) and silently outranks the (0,1,0) responsive
> override — so the track resolved to `216px` in light and `0px` in dark, sliding every
> `.canvas` child 108px left underneath the fixed rail. Structural tokens go on the
> bare `:root`; only colour goes in the themed blocks.

- `--rail: 0` below 1120px, `200px` at `xl`, `220px` at `xxl`.
- Max composed content width 1140px (200 rail + 160 + 620 text + 160), matching the current
  `--maxw` so nothing else has to move.
- Figures breaking out to `wide` is the entire figure-layout system. There is no `grid-2`.
- The `rail` column doubles as the margin for source annotations at `xl`+, which is what lets the
  provenance live *next to* each claim instead of only at the bottom.

### 4.3 Three gotchas found while building the prototype

These cost time if you meet them cold. All three are fixed in `prototype.html`.

**a. The text track must subtract the gutters.** A bare `min(66ch, 100%)` resolves its `100%`
against the *grid container*, so at narrow viewports the gutters get **added** to it and the page
gains ~40px of horizontal scroll. Declare the track as a variable:

```css
--content: min(66ch, 100% - var(--gutter) * 2);
/* ... [text-start] var(--content) [text-end] ... */
```
Verified: `scrollWidth === clientWidth` at 320, 360, 390, 600, 900, 1120, 1440, 2560.

**b. Flex items in the sticky bar refuse to shrink.** `min-width` defaults to `auto` on flex
items, so the wordmark's `white-space: nowrap` pushed the top bar to 367px inside a 320px
viewport. Every text child of `.topbar` needs `min-width: 0`, and the chapter chip should
`display: none` below 480px.

**c. SVG label type does not scale with the element.** Chart labels are in viewBox user units, so
a 1000-unit-wide chart squeezed into 350px renders 4px text. Give every chart
`min-width: 560px` and put it in its own `overflow-x: auto` frame. Below ~600px the chart scrolls
sideways with legible labels rather than shrinking into illegibility, and the page body still
does not scroll horizontally.

### 4.4 Rules

- Every section is a `.canvas`. No wrapper divs inside except where a component needs one.
- No element uses a fixed pixel width. Charts are `viewBox` SVG at `width:100%; height:auto`.
- Everything wide gets `overflow-x: auto` on its own container. The body never scrolls sideways.
- `min-height: 100svh` on the hero only; `svh` not `vh`, so mobile browser chrome doesn't clip it.

---

## 5. Place — the Lost Pines system

Three graphic assets, all inline SVG, all under 3KB total, all decorative
(`aria-hidden="true"`, `focusable="false"`).

### 5.1 `PineHorizon` — replaces the ridge silhouette

A **flat** horizon (Bastrop is flat), a low band for the far treeline, and a foreground colonnade
of **vertical loblolly trunks**. Loblollies have long bare trunks and a tuft of canopy at the very
top; that silhouette is unmistakable and is nothing like a triangular conifer or a mountain.

Construction:

- `viewBox="0 0 1440 300"`, `preserveAspectRatio="xMidYMax slice"`.
- **Band 1 (far, back):** a single near-horizontal path with ≤4px of vertical deviation across
  1440px — the blackland prairie horizon. Fill `--horizon-far`.
- **Band 2 (river):** a shallow lens shape crossing the lower third, the Colorado River bend, at
  8% opacity of `--data-d-deep` in dark / `--axis` in light. Deliberately quiet — it should be
  legible only once you know it is there.
- **Band 3 (trunks):** 22–28 `<rect>`s, `width: 3–7px`, `height: 40–100%` of the band,
  x-positions from a hand-authored irregular array (never `i * n` — regular spacing reads as a
  fence), each with a 2–5px canopy tuft `<path>` at the top. Fill `--horizon-near`, with the
  three nearest trunks at full value and the rest stepped down 6% each.

Tokens:

```css
:root            { --horizon-far: #17201B; --horizon-mid: #1B2620; --horizon-near: #232E28; }
:root[data-theme="light"] { --horizon-far: #DCD8C8; --horizon-mid: #CFCBB8; --horizon-near: #B9B7A2; }
```

These are background bands behind no text, so they carry no contrast requirement; they are set
close in value to `--bg` so the horizon reads as atmosphere, not as an illustration competing with
the title.

Reuse: the same component appears at 3 sizes — `hero` (300px tall), `divider` (72px, between eras,
flipped and at 40% opacity), `footer` (140px). One SVG, three CSS heights. That repetition is what
makes it read as *this county* rather than as one decoration.

### 5.2 `TownMarks` — the place names, used as real navigation

Nine towns: Bastrop, Elgin, Smithville, Cedar Creek, McDade, Red Rock, Paige, Rosanky, String
Prairie. Set them once, at `--t--2`, along the base of the hero horizon, positioned at their
approximate real relative geography (a schematic, labeled as one — never presented as an accurate
map). Towns that a chapter is about get `--brass`; the rest get `--text-dim`. In Chapter Three the
same strip highlights Cedar Creek; in the forthcoming McDade chapter it highlights McDade.

This is the cheapest possible way to make a reader feel the county — no map tiles, no image, no
fetches, and it teaches the geography incidentally over eight chapters.

### 5.3 `RiverRule` — the section divider

A 1px `--hair` rule with a single shallow 24px-wide deviation at 38% of its width. Replaces the
`.chapter-alt::before/::after` hairlines. It costs nothing and after four repetitions the reader
registers it as the river.

---

## 6. Navigation — the Era Rail

Replaces the progress bar, the chapter nav row, and the total absence of mobile nav.

### 6.1 `xl` and up (≥1120px): fixed left rail

Occupies the `rail` grid column. `position: fixed`, full height, `--sp-8` from the top.

```
1827 ┃
     ┃  I    THE LITTLE COLONY        1827–1837
     ┃
1856 ┣━ II   A COUNTY VOTES           1856–1860      ← active
     ┃
     ┃  III  PARTY OF LINCOLN         1867–1888
1874 ┃
     ┃  IV   THE LONG CENTURY         1874–1968
     ┃
1972 ┃  V    THE TURN                 1972
     ┃
2024 ┃  VIII TODAY                    now
```

- **Vertical spine**: 1px `--axis`, full height.
- **Year ticks**: `--t--2`, `--text-dim`, `tabular-nums`, at decade anchors. *Ticks are positioned
  by era, not by scroll percentage* — so the 94-year Long Century occupies visibly more rail than
  1856–1860 does. The rail is a time axis. That, not a progress bar, is how you feel 170 years.
- **Chapter entries**: `--font-ui`, `--t--2`, `600`, `0.1em`, uppercase, `--text-dim`.
- **Active**: `--text`, plus a 2px `--brass` bar in the left 2px of the entry, plus
  `aria-current="true"`.
- **Progress**: a `--brass` segment of the spine grows from top to the current position. Driven by
  one `transform: scaleY()` on a `transform-origin: top` element — a compositor-only property, no
  layout, no paint of the spine itself.
- **Width** 200px, entries truncate with `text-overflow: ellipsis` and carry `title`.
- Marked `<nav aria-label="Chapters">` with an `<ol>`.

**With JS disabled:** the rail renders complete and fully clickable, with no active state and no
progress fill. It is a table of contents. That is a correct degradation.

### 6.2 Below 1120px: the chapter chip and TOC sheet

Sticky top bar, 56px tall, `--bg` at 92% with `backdrop-filter: blur(12px)`:

`[wordmark]  ·  Ch. IV — The Long Century   [▾ Contents]        [◐]`

`[▾ Contents]` is a native `<details>/<summary>`, so the full chapter list opens **with JavaScript
disabled**. Opened, it is a full-width sheet on `--surface` with `--shadow-2`, listing all
chapters with era ranges, at 48px row height.

- The "Ch. IV — The Long Century" label is updated by JS via IntersectionObserver. With JS off it
  renders the static string "Contents", which is honest and useful.
- Summary marker replaced with a CSS caret; `list-style: none` plus
  `::-webkit-details-marker { display: none }`.
- Sheet close on outside click and on `Escape` (progressive enhancement only; `<details>` already
  closes on summary click without JS).

### 6.3 Skip links

Three, not one, all revealed on focus at the top-left, 44px min height:
`Skip to the story` · `Skip to the chapter list` · `Skip to sources`.

### 6.4 Focus

```css
:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
  border-radius: var(--radius-1);
}
```
Verified ≥4.93:1 on every background in both themes, including all five era tints. There is no
`:focus { outline: none }` anywhere in the stylesheet.

---

## 7. Components

Notation: every component lists its DOM, its tokens, and its states.

### 7.1 `EraPlate` — the chapter opener

Replaces `.chapter-head`. Full-bleed, 1 `--axis` rule above, `--sp-8` of air below.

```html
<header class="era-plate full" data-era="iron">
  <div class="era-plate__inner">
    <span class="era-plate__num">Chapter Four</span>
    <h2 class="era-plate__title">The Long Century</h2>
    <p class="era-plate__range"><time datetime="1874">1874</time>–<time datetime="1968">1968</time></p>
    <p class="era-plate__dek">Ninety-four years, twenty-four elections, one interruption.</p>
  </div>
</header>
```

| Part | Type | Color |
|---|---|---|
| `__num` | `--font-ui` `--t--2` 600 0.14em upper | `--brass` |
| `__title` | `--font-display` `--t-5` 400 | `--text` |
| `__range` | `--font-figure` `--t-1` 400 tabular | `--text-dim` |
| `__dek` | `--font-display` `--t-1` 400, 52ch | `--text-soft` |

The `__range` moving from a 13px mono caption to a 24px figure line is deliberate: on a history
page the years *are* a headline. Sits on the era tint via `data-era`, and carries a 4px `--brass`
tick on its left edge at `xl`+ that aligns with the rail so the plate and the rail visibly connect.

### 7.2 `Prose`

`--font-text`, `--t-0`, `--text-soft`, measure 66ch, `--sp-5` between paragraphs.
`strong` → `--text` at 600. `em` → italic, no color change. First paragraph after an `EraPlate`
gets no indent; subsequent paragraphs get none either — spacing separates them, not indentation.

**Drop cap** on the first paragraph of each chapter, `xl`+ only:
`initial-letter: 3` with a `float`-based fallback, `--font-display`, `--brass`. It is the cheapest
per-chapter "this is a new chapter" signal and it is deeply museum-register. Disabled below 900px
(drop caps at narrow measure look like errors).

### 7.3 `Lede` and `Epigraph`

- **Lede** — `--font-display` `--t-3` 400, `--text`, 44ch, no border, `--sp-8` above and below.
  The current 2px left border is doing work that whitespace should do.
- **Epigraph** — `--font-display` `--t-5` 400 italic, `--text`, 28ch, `grid-column: wide`, with a
  `--brass` 1px rule 48px long above it. **No decorative quotation glyph.** The oversized `"` at
  4.5em is the single most campaign-flavored mark on the current page.

### 7.4 `FactTable` — replaces `.card-fact`

The `<dl>` content is right; the card around it is not.

- No background, no border, no radius, no shadow.
- Top and bottom `--axis` 1px rules; `--hair` 1px between rows.
- `dt`: `--font-ui` `--t--2` 600 0.1em upper `--text-dim`, column 1.
- `dd`: `--font-text` `--t-0` `--text`, column 2, left-aligned (not right — right-aligned
  definition values force the eye to travel and break down entirely at narrow widths).
- Grid `minmax(8rem, 12rem) 1fr`, `--sp-3` block padding.
- Below 600px collapses to a single column with `dt` above `dd`, 4px gap.
- `grid-column: wide`.

### 7.5 `BallotList` — replaces `.card-ballot`

A real `<table>`, not a `<ul>` of spans.

```
YEAR   CANDIDATE                 PARTY                          RESULT
1856   John C. Frémont           Republican                     carried
1860   John Bell                 Constitutional Union           carried
1872   Horace Greeley            Democratic / Liberal Rep.†     carried
1896   William McKinley          Republican                     plurality
1972   Richard Nixon             Republican                     carried
```

- `<caption>`: "Presidential elections carried in Bastrop County, selected years."
- `<th scope="col">` on the header row; `<th scope="row">` on the year.
- Party cell carries a 3px × 1em color bar in `--data-r` / `--data-d` / `--data-neutral` **plus**
  the party name in text. Never color alone.
- "plurality" and "†" are `--unverified` / footnote-marked, and `†` links to the Greeley note.
- `--hair` row rules; no zebra striping (zebra striping on a 5-row table is noise).
- `grid-column: wide`, `overflow-x: auto` wrapper.

### 7.6 `Chronicle` — the timeline, promoted to an archetype

Keeps the current structure; changes:

- Spine 1px `--axis`, not a fading 2px gradient.
- Node: 9px square, rotated 45°, `--bg` fill, 1.5px `--brass` stroke. A square lozenge is a survey
  marker; a glowing circle is a notification badge.
- Year: `--font-figure` `--t-1` tabular, `--text` (currently 15px `--brass` — the year deserves
  more weight than the accent color gives it).
- Title `--t-2` `--text`; body `--t-0` `--text-soft` at 60ch.
- `.tl-dark` (backlash / violence entries) renamed `data-tone="grave"`: node stroke becomes
  `--axis`, title stays `--text` (the current rule dims it to `--text-soft`, which visually
  de-emphasizes exactly the material that must not be de-emphasized), and a 2px `--rule` bar runs
  the item's full height in the left margin.
- At `sm`/`md` the year moves above the title, spine indents to 16px.

### 7.7 Charts

Three components. All three share the same contract:

1. **The HTML source of truth is a `<table>`.** It is authored in `index.html`, visible by
   default, and styled as a real ledger table. JS with `IntersectionObserver` builds an inline SVG
   from the table's cells, inserts it, and only then sets `hidden` on the table via a
   `.chart--upgraded` class. With JS off, you get a good table. **Nothing is ever created from a
   JS array literal** — the current pattern, where 1872–1968 exists only inside `main.js`, means
   the data cannot be read, cited, or corrected without reading the source.
2. **Zero baseline, always.** No truncated axes. No dual axes. Ever.
3. **Every chart is a `<figure>` with a `<figcaption>` and a mandatory `SourceTag`.** The
   `SourceTag` slot is not optional — a chart component that renders without a source is a bug.
4. **Direct labels.** Series are labeled at the mark. Legends are permitted only when there are
   ≥3 series and direct labelling collides.
5. **Sparse-data honesty.** Gaps are drawn as gaps. See `MarginTrend`.

#### 7.7.1 `MarginTrend` — the spine of the whole page

**This is the chart the historian's multi-decade series is for.** Designed for ~15 points, correct
with 5, correct with 40.

- **X**: year, **linear in time**, 1852→2028. Irregular spacing is the point — a 96-year gap must
  *look* like 96 years.
- **Y**: margin in percentage points. `+` = Republican, `−` = Democratic. Symmetric domain,
  `−60…+60`, **zero line in `--axis` at 1.5px, labeled "even" at both ends**. Zero is the most
  important line on the page and gets the heaviest non-data stroke.
- **Region fill**: above zero `--data-r` at 10% opacity, below zero `--data-d` at 10%. This is what
  makes the shape legible at a glance on a phone.
- **Marks**: 5px circles at verified points, `--data-r` / `--data-d` by sign, 1.5px `--bg` stroke
  so overlapping points stay countable.
- **Connections — the sparse-data rule:**
  - Consecutive verified elections (4 years apart): **solid** 2px line.
  - A gap of more than one election cycle: **dashed** 2px line, `stroke-dasharray: 2 6`, at 55%
    opacity, and a small `--t--2` `--unverified` label reading "no verified data" placed once per
    gap. The gap is a designed state, not an absence.
  - Never interpolate a value that is not in the table.
- **Annotations**: at most five, in `--font-ui` `--t--2`, connected by a 1px `--axis` leader:
  *Frémont 1856* · *McKinley 1896* · *Nixon 1972* · *Bush 2004* · *2024*. Annotations sit inside
  the plot, never in a legend.
- **Marked-but-unverified** points render as an open circle (2px stroke, no fill) in
  `--unverified`, so the chart can show "we know Democrats carried this, we do not have the
  margin" without inventing a number. This is what lets the historian's partial series ship.
- **Height** 380px desktop / 300px `md` / 260px `sm`. `viewBox` scales; text uses
  `vector-effect: non-scaling-stroke` on rules and fixed `font-size` in SVG user units matched to
  the viewBox so labels never scale to illegibility.
- **Reveal**: the line draws left to right via `stroke-dashoffset` over `--dur-5` (900ms)
  `--ease-out`, once, on first intersection. Points fade in with a 40ms stagger capped at 12.
  Under `prefers-reduced-motion` the final state renders immediately.
- **Hover/focus**: each point is a `<g tabindex="0" role="img" aria-label="1972: Nixon, Republican +9.4 points">`
  with a visible focus ring and a small `--surface` tooltip. Keyboard-reachable, left to right.

#### 7.7.2 `RunStrip` — replaces the 5×5 streak grid

Twenty-five elections, 1872–1968, as a **single horizontal row of narrow vertical bars on a year
axis**. A run reads as a run only when it is linear.

- Each election is a bar `min(2.5%, 18px)` wide, full height of a 96px band, 2px gap.
- Democratic: `--data-d` fill **plus** a 45° hatch (`<pattern>` of 1px `--bg` lines at 4px pitch).
- Republican (1896 only): `--data-r` **solid**, at 112% height so it breaks the top of the band,
  with a `--brass` leader and the label "1896 — McKinley, plurality" directly attached.
- Decade ticks below in `--t--2` `--text-dim`: 1880, 1900, 1920, 1940, 1960.
- Above the strip, a `--t-1` figure line: **"One interruption in twenty-four elections."**
- Underlying `<table>` has 25 rows: year, party, note.
- Absorbs a longer run trivially — bars get narrower, the axis stays. Absorbs the historian's
  full series by simply gaining rows.

#### 7.7.3 `BallotBar` — one election, honestly

Replaces `.result-card`. A **100% stacked horizontal bar** that always sums to 100.

```
2024  ├────────── Trump 58.6% ──────────┼──── Harris 40.1% ────┤ 1.3%
      23,276                             15,941                  other
```

- Full `wide` column width — at 1140px the bar is ~940px, so a 58.6/40.1 split is a 174px
  difference instead of the current 17px.
- Segments: R `--data-r` solid; D `--data-d` with 45° hatch; **Other** = no fill, `--axis` 1px
  border, 45° `--data-neutral` hairline hatch, always present, always labeled — even at 1.3%.
- Percentage labels **inside** the segment where the segment exceeds 12% of the bar, otherwise on a
  leader line **outside**. In-fill text: `--bg` on `--data-r` (8.86:1 dark / 5.44:1 light),
  `#FFF` on `--data-d-deep` (7.10:1 / 14.21:1). Never white on mid `--data-d` in dark theme —
  that combination measures 4.40:1 and fails.
- Raw counts below the percentage at `--t--1` `--text-dim`, `tabular-nums`.
- Margin stated once, as a `--t-1` figure line beneath: "Republican margin +18.5 points."
  No pill, no ▲ glyph, no colored badge.
- Height 40px desktop / 32px mobile. `--radius-0`. Fills animate `transform: scaleX()` from a
  left origin over `--dur-5`, compositor-only, no width transitions, no layout thrash.

#### 7.7.4 `SourceTag` — mandatory on every figure

```html
<p class="source-tag">
  <span class="source-tag__badge" data-state="verified">Verified</span>
  <a href="#src-5">KVUE, 2024 county returns</a>
  <span class="source-tag__note">100% of precincts reporting</span>
</p>
```

- `--font-ui` `--t--1`, `--text-dim`.
- Badge: 1px border, `--radius-1`, 2px/6px padding. `verified` → `--verified`;
  `reported` → `--unverified`; `estimate` → `--unverified` + italic.
- The link is a same-page anchor to the numbered source. Every figure is one click from its
  citation, and at `xl`+ the tag renders in the `rail` column beside the figure rather than under
  it — the marginal citation of a printed monograph.

### 7.8 `StatLine` — replaces the four stat cards

Not cards. A **ruled table of three rows**, `wide` column, `--axis` rules top and bottom,
`--hair` between:

```
102,370      County population                                    2023 est.
+21.1%       Population change since 2019                         USAFacts
97.25%       Share of that growth from in-migration               KXAN
```

- Figure: `--font-figure` `--t-4` 400 tabular, `--text`. **Flat color. No gradient.**
- Label: `--font-text` `--t-0` `--text-soft`.
- Right cell: `--t--1` `--text-dim`, links to the source.
- Grid `minmax(7rem, 10rem) 1fr auto`; below 600px the right cell wraps under the label.
- **"#13 fastest-growing county" is cut.** A rank is not a measurement, it changes annually, and
  it is the weakest of the four. Three strong rows beat four with a passenger.
- **No count-up animation.** A number that animates on scroll is a number you cannot screenshot,
  cannot read while scrolling past, and that fights a screen reader. It is also the most
  recognizable marketing-page tic on the current build.

### 7.9 `ThemeToggle`

44×44px (currently 38, below the 44px minimum). `--radius-1`, 1px `--hair`, `--surface`.
Icon: a 16px square, half `--text`, half transparent, with a 1px `--axis` outline — a value swatch,
not a sun/moon. `aria-pressed` reflects state; `aria-label` reads "Switch to parchment theme" /
"Switch to dark theme" and updates on toggle. **No rotation on hover.** Hover changes background to
`--raised` over `--dur-1`.

### 7.10 `Colophon` — the sources section

The strongest content on the page; give it the treatment.

- Set on `--bg-alt`, full section padding.
- `<ol>` with visible `--font-figure` numerals in the `rail` column at `xl`+.
- Source title: `--t-1` `--font-text`, link in `--link`.
- Annotation: `--t--1` `--text-dim` at 60ch.
- Each source carries a **back-reference**: "cited in Ch. II, Ch. IV" as anchor links. Provenance
  should be navigable in both directions.
- The two `note` items become a bordered `<aside>` at the top of the section with the heading
  "Notes on method" — the Greeley counting note and the independence disclaimer are the two most
  credibility-relevant sentences on the site and are currently the last two items in a list.
- All source links get `--sp-3` block padding so they clear 44px on touch.

---

## 8. Motion

```css
--dur-1: 120ms;   /* state: hover, active, focus */
--dur-2: 200ms;   /* UI: nav, toggle, chip */
--dur-3: 320ms;   /* disclosure: TOC sheet */
--dur-4: 520ms;   /* narrative reveal */
--dur-5: 900ms;   /* chart draw — once, on first view only */

--ease-out:      cubic-bezier(.22, 1, .36, 1);    /* entrances — default */
--ease-in-out:   cubic-bezier(.65, 0, .35, 1);    /* two-way state */
--ease-standard: cubic-bezier(.2, 0, 0, 1);       /* UI */
```

Rules:

- **Entrance reveal**: `opacity 0→1` + `translateY(12px→0)`, `--dur-4`, `--ease-out`.
  12px, not 26 — the reveal should feel like settling, not assembling.
- **Stagger is capped at four.** `delay = min(index, 3) * 60ms`. The current unbounded
  `i * 70` makes the tenth item in a batch wait 700ms after it is already on screen.
- **Only `opacity` and `transform` animate.** No width, no height, no top/left, no box-shadow, no
  filter. The current `.bar-fill { transition: width 1.3s }` animates a layout property on every
  frame; `transform: scaleX()` from `transform-origin: left` is identical visually and free.
- **No infinite animation anywhere.** The scroll cue is deleted.
- **No parallax.** It costs a scroll listener, produces the same effect a fixed background does,
  and on a reading page it fights the reader.
- **No count-up.**
- **Theme switch is instantaneous.** Remove `transition: background .5s, color .5s` from `body`.
  Half a second of the body cross-fading while children snap is worse than no transition. If a
  transition is wanted later, it must be applied to a single wrapper with
  `view-transition-name`, all-or-nothing.

Reduced motion — **complete** degradation, not partial:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;   /* the current build omits this */
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  .chart svg .draw { stroke-dashoffset: 0 !important; }
  .bar-fill { transform: none !important; }
}
```

JS must also branch on `matchMedia('(prefers-reduced-motion: reduce)')` and skip every stagger
timer rather than merely shortening it, and must re-check on `change` (a user can flip it mid-session).

---

## 9. Composition — section by section

**The anti-monotony rule:** seven archetypes; **no two adjacent sections may use the same one.**
This is the rule to apply to the historian's new chapters, so the system stays varied as it grows.

| # | Archetype | Shape |
|---|---|---|
| **A** | `Ground` | full-bleed horizon band + prose + FactTable |
| **B** | `Assertion` | one epigraph, near-empty viewport, no figure |
| **C** | `Chronicle` | dated timeline |
| **D** | `Ledger` | chart is the hero, prose is the caption |
| **E** | `Single Fact` | one number at `--t-6`, one paragraph, nothing else |
| **F** | `Roster` | structured list / definition grid |
| **G** | `Colophon` | sources |

### Hero — *the hero must carry the thesis and the navigation model*

Current: a centered title over a generic ridge, plus two buttons. It does no storytelling and it
teaches the reader nothing about the document they are about to enter.

New composition, `min-height: 100svh`, **left-aligned in the `text` column**, not centered:

1. **Eyebrow** — `--t--2` `--brass`: `BASTROP COUNTY · TEXAS · AN INDEPENDENT HISTORY`.
   The word *independent* belongs in the first line of the page. This is not a campaign site and
   the visitor decides that in two seconds.
2. **Title** — `--t-7`, `--font-display`, `--text`, flat, two lines, `text-wrap: balance`.
   The gradient fill on "Red Clay" goes. The two halves of the title currently get two entirely
   different treatments (gradient / solid), which reads as an error.
3. **`&`** — `--brass`, italic, `--t-4`, on its own line, optically centered to the title block's
   left edge + 0.5em.
4. **Dek** — `--t-1`, `--text-soft`, 52ch. The existing sentence is good; keep it verbatim.
5. **The Spine** — *this is the new work.* A horizontal time axis from 1856 to 2024, `wide`
   column, 72px tall:

   ```
   1856 ──●──────────────────────────●──────────────●────────────●── 2024
        Frémont                  McKinley        Nixon         today
          R                      R plurality       R             R
   ```

   Four marks on a real time axis, each a same-page anchor to its chapter. It does four jobs at
   once: it states the thesis (four Republican moments across 168 years, unevenly spaced), it
   shows the shape of the argument before a word is read, it teaches the era-rail interaction, and
   it is a table of contents. Marks are `--data-r`; the axis is `--axis`; labels are `--t--2`.
   **Built from a `<table>`** so it works without JS.
6. **`PineHorizon`** — full-bleed band anchored to the bottom, 300px, with `TownMarks` along its
   base.
7. **No buttons.** "Begin the story" is what scrolling is. A pill CTA with a glow is the single
   most campaign-flavored element on the page and it is the first thing a visitor sees. The Spine
   replaces both buttons and does more.
8. **No scroll cue.**

### Ch. 1 — The Little Colony · archetype **A (Ground)** · era `ground`

`EraPlate` → drop-capped prose (66ch) → full-bleed `PineHorizon` divider with `TownMarks`, all
nine towns in `--text-dim` → `FactTable` in `wide`. The horizon divider between the prose and the
facts is the "before there was a party, there was a place" beat, made structural.

### Ch. 2 — A County Votes for Frémont · archetype **B (Assertion)** · era `rupture`

The startling fact deserves an entire viewport and nothing else in it.

`EraPlate` → **`Epigraph` alone, `--t-5`, 28ch, roughly 55svh of vertical space, nothing beside
it** → then a `RiverRule` → then the prose and the `BallotList` at full `wide` width below.

This directly answers the ragged-right-column problem: the emptiness beside the epigraph becomes
*composed* emptiness (it is the only element in its viewport) rather than *accidental* emptiness
(a 26ch quote in a 1.25fr column with a 0.95fr hole beside it).

### Ch. 3 — The Party of Lincoln at Cedar Creek · archetype **C (Chronicle)** · era `rupture`

`EraPlate` → `Lede` → `TownMarks` strip with **Cedar Creek in `--brass`** → `Chronicle`.
The 1888 Weeks and Wilson entry gets a `--brass` node; the backlash entry gets `data-tone="grave"`.
This is where the forthcoming McDade 1883 material slots in — either as entries here or as its own
`C` chapter, in which case Ch. 3 changes archetype (see the growth plan).

### Ch. 4 — The Long Century · archetype **D (Ledger)** · era `iron`

**Invert the current hierarchy.** Today: prose left, chart right, chart subordinate. The chart *is*
the argument.

`EraPlate` → `RunStrip` at full `wide` width, immediately, before any prose → `SourceTag` →
then the prose at 66ch reading as an extended caption → the `<table>` remains visible below the
chart on `sm` (where a 25-bar strip is tight) and hidden on `lg`+.

The `iron` era tint is at its coldest here, and the era rail visibly gives this chapter more
vertical rail than any other. The reader should feel the length before reading the sentence about
the length.

### Ch. 5 — The Turn · archetype **E (Single Fact)** · era `turn`

The chapter that currently has zero CSS becomes the most spare and the most memorable.

`EraPlate` → **`1972` at `--t-6` (72px), `--font-display`, `--text`, on its own** → one paragraph
at `--t-1` and 44ch → `--sp-11` (160px) of air → the second paragraph at `--t-0`, 66ch.
Nothing else. No figure, no card, no centered text. The era tint warms here for the first time
since 1874, which is the only place in the document where a reader might consciously register the
era system — which is the right place for it to become conscious.

### Ch. 6 — Bush Country · archetype **A (Ground)** · era `present`

`EraPlate` → prose → `BallotBar` for 2000 and 2004 stacked in `wide` → the Handbook of Texas quote
as a **marginal note in the `rail` column** at `xl`+ (`--t--1`, `--brass` 2px left rule), inline
below at smaller sizes. Removing the `card-quote` and making it marginalia is a large register win
for a small change.

### Ch. 7 — **"By the Numbers" is dissolved**

The dashboard-bolted-onto-an-essay problem is not solved by restyling three cards; it is solved by
not having a section whose subject is "numbers." Numbers are the argument, so they live in the
argument. Redistribute:

- `MarginTrend` — becomes a **standalone full-bleed spread between Ch. 5 and Ch. 6**, titled
  *"One county, one hundred and seventy years"*, archetype `D`. This is where the historian's
  multi-decade series lands and it is the visual anchor of the whole page.
- 2020 + 2024 `BallotBar`s — move into Ch. 8 (Today) where they describe the present.
- Precinct 17-of-22 — becomes a **single sentence with an inline 22-mark `RunStrip`** inside Ch. 8,
  not a card. Twenty-two precincts is a fact, not a figure.
- Population `StatLine` — moves into Ch. 8, immediately before the "county partly made of
  strangers" paragraph it exists to support.

The result: one serious chart with its own spread, and every other number sitting next to the
sentence that uses it.

### Ch. 8 — The County Party Today · archetype **F (Roster)** · era `present`

`EraPlate` → the three "what it is / how it governs itself / where to find it" items as a
**`FactTable`-style ruled definition list**, not three cards → `BallotBar` 2020, `BallotBar` 2024
→ precinct sentence with inline marks → `StatLine` (three rows) → the growth paragraph.

This is where the historian's modern-officeholder material lands, as additional `FactTable` rows or
a second ruled roster.

### Closer

Keep the text; delete the container. Currently a 20px-radius gradient panel. New: full-bleed
`PineHorizon` in `footer` size, and the two paragraphs set in the `text` column above it — final
line at `--t-3` italic `--text`. *"The Lost Pines are still standing. The story isn't finished."*
is a good last line and a gradient box is not helping it.

### Colophon

As §7.10.

### Growth plan — absorbing the historian's material

| Incoming | Placement | Archetype | Adjacency check |
|---|---|---|---|
| ~15-point presidential series | `MarginTrend` spread | D | between E (Ch.5) and A (Ch.6) — OK |
| 1883 McDade hangings | new chapter after Ch.3 | **C** | Ch.3 is C → **change Ch.3 to A** (prose + FactTable + TownMarks) or make McDade **B (Assertion)** |
| 2011 wildfire | new chapter between Ch.5 and Ch.6 | **A (Ground)**, `present` era, the one permitted fire wash | neighbors E and D — OK |
| Reconstruction-era organizing | expands Ch.3 `Chronicle` | C | no new section |
| Modern officeholders | Ch.8 roster rows | F | no new section |

Chapter numbering must move to Roman numerals set in `EraPlate` from a single `counter-reset` on
`main`, so inserting a chapter does not require editing eight hard-coded strings.

---

## 10. States — every one, designed

| State | Specification |
|---|---|
| **No JS** | Full document renders. All reveals visible. All charts render as ruled `<table>`s. Era rail renders as a complete, clickable TOC without active state. Mobile `<details>` TOC opens. **This is the baseline, not a fallback.** |
| **Reduced motion** | All durations 1ms; reveals neutral; charts render final; no stagger timers scheduled at all. Re-checked on media-query `change`. |
| **Light theme** | Every token verified above. Data colors keep R-lighter-than-D ordering. |
| **Hover** | Links: underline thickens 1→2px, color `--link` → `--link-hover`, `--dur-1`. Rail entries: `--text-dim` → `--text`. **Nothing translates. Nothing lifts. Nothing scales.** |
| **Focus-visible** | 2px `--focus`, 3px offset, ≥4.93:1 on all 9 backgrounds × 2 themes. Chart points are focusable in reading order. |
| **Active** | Buttons/chips: background `--raised`, no transform. |
| **Empty data** | A `MarginTrend` with one point renders the axes, the zero line, the single point, and a `--t--1` `--unverified` line: "One verified result. More to come." It never renders a blank box. |
| **Sparse data** | Gaps drawn as dashed at 55% opacity + one "no verified data" label per gap. |
| **Unverified value** | Open circle, `--unverified`, badge reads "Reported". |
| **320px** | Gutter 20px, body 17px/28px, `--t-7` = 58px, era rail absent, TOC sheet full-width, charts `overflow-x: auto`. |
| **2560px** | Content caps at 1140px + 220px rail, centered. Horizon SVG `slice`s rather than stretching. |
| **Print** | `@media print`: force light tokens; drop the rail, the sticky bar, the toggle; charts print as the `<table>` (unhide it, hide the SVG — hatch patterns and 10% region fills are unreliable in print); expand every link to `a[href]::after { content: " (" attr(href) ")" }` for external links only; `break-inside: avoid` on figures and chronicle items; sources on a fresh page. **Political pages get printed and screenshotted more than any other category** — this is not optional. |
| **Screenshot** | Because a screenshot is the most common way this page will be shared: every figure is self-sufficient. Title, value labels, and `SourceTag` are all inside the figure's bounding box. No figure depends on a heading above it or a legend beside it to be understood. |

---

## 11. Remove — the explicit deletion list

Delete rather than restyle. Every line here is subtraction.

**HTML**
1. `<link rel="preconnect" href="https://fonts.googleapis.com">` — unused, external, violates the constraint.
2. `<canvas id="emberCanvas">` and the whole `.hero-sky` wrapper.
3. All three `<svg class="ridge">` elements and `.hero-ridge`.
4. `.hero-actions` — both buttons.
5. `.scroll-cue`.
6. `.progress-rail` / `.progress-bar`.
7. `.chapternav` as a top-bar link row (replaced by the rail + TOC sheet).
8. The `#numbers` section as a section.
9. The `#13 fastest-growing county` stat.
10. `.card-quote` (becomes marginalia).
11. `.closer`'s gradient panel wrapper (keep the paragraphs).
12. Every `.card` wrapper in `#modern` (becomes a ruled list).
13. `.pullquote blockquote::before` — the decorative `"` glyph.

**CSS**
14. `.bigstat`, `.bigstat-year`, `.chapter-turn`, `.chapter-long` — dead classes, no rules exist.
15. `.grid-2` and `.grid-3` — replaced by the named canvas grid.
16. All `box-shadow` on cards; `--shadow` as a card token.
17. `.card:hover { transform: translateY(-4px) }` and every other non-interactive hover transform.
18. `.theme-toggle:hover { transform: rotate(-18deg) }`.
19. Every `background-clip: text` gradient — hero title, `.stat-num`.
20. `.btn`, `.btn-primary`, `.btn-ghost` and the glow shadow.
21. `border-radius` of 12px/14px/16px/20px/999px throughout → `--radius-0/1/2` only.
22. `body { transition: background .5s ease, color .5s ease }`.
23. `.chapter-alt` alternating bands (replaced by era tints).
24. `--pine-*`, `--clay-*`, `--gold-*`, `--blue-*` raw ramps — replaced by semantic tokens only.
25. `--mono` and every `font-family: var(--mono)` use.
26. `@keyframes cue`.
27. `.precinct-grid`, `.streak-grid` as square-tile grids.
28. `.delta` pill and the `▲` glyph.
29. `.margin-line` as a dashed-border footer inside a card.
30. `overflow-x: hidden` on `body` — it masks overflow bugs instead of fixing them.

**JS**
31. The entire ember particle system (~80 lines, a `requestAnimationFrame` loop, a resize handler, a visibilitychange handler and an IntersectionObserver, for effectively invisible dust).
32. The ridge parallax scroll handler.
33. The count-up animator.
34. The DOM-building loops for `streakGrid` and `precinctGrid` (data moves to HTML tables; JS reads them).
35. `scroll-behavior: smooth` at document level — keep only on the rail's own anchor handling, and only when `prefers-reduced-motion` is not set.

Net: `main.js` should end at roughly 120 lines doing five things — set `html.js`, theme, rail
active-state + progress, reveal observer, chart upgrade. Nothing else.

---

## 12. Build order

1. **Tokens + reset + canvas grid.** Nothing visual yet. Verify the grid at 320/768/1120/1440/2560.
2. **The no-JS inversion** (`html.js` gate). Confirm the JS-disabled screenshot is a complete page
   before writing another line. This is the highest-value hour in the project.
3. **Type + Prose + EraPlate.** Re-screenshot; the register shift should already be visible.
4. **Era rail + TOC sheet.** Both must work with JS off first, then be enhanced.
5. **PineHorizon + TownMarks.**
6. **Charts**, tables first, SVG upgrade second, in this order: `BallotBar` → `RunStrip` →
   `MarginTrend`.
7. **Recomposition** of sections 1–8 per §9.
8. **Print stylesheet.**
9. **Verify**: re-run the contrast script, re-screenshot all six viewport/theme combinations, run
   the JS-disabled pass, run a `prefers-reduced-motion` pass, tab through the whole document,
   and check `scrollWidth === clientWidth` at 320px.

## 13. Acceptance criteria

- [ ] JS-disabled screenshot at 1440 shows the complete document, all charts as readable tables.
- [ ] Contrast script reports **0 failures** across both themes and all five era tints.
- [ ] `--data-r` vs `--data-d` measures ≥1.8:1, and both carry a non-color encoding.
- [ ] Every `<figure>` contains a `<figcaption>` and a `SourceTag`; no exceptions.
- [ ] No chart data exists only inside `main.js`.
- [ ] `prefers-reduced-motion` produces zero animation and zero scheduled timers.
- [ ] Every interactive target ≥44×44px at 390px.
- [ ] `document.scrollWidth === document.clientWidth` at 320px.
- [ ] Zero network requests to any host other than the origin.
- [ ] CLS = 0 with a scripted scroll through the full document.
- [ ] `main.js` under 150 lines.
- [ ] Printed output is legible in greyscale and every chart prints as a table.

---

## 14. What the prototype already proves

`/.claude/design/prototype.html` builds the hero and Chapter IV to this spec. Verified in headless
Chromium, not asserted:

| Check | Result |
|---|---|
| External network requests | **0** at 1440/768/390, both themes |
| JavaScript disabled | Complete document — 2,503 characters of text, **both charts render as ruled tables** with party swatches |
| `prefers-reduced-motion: reduce` | 0 elements left hidden; all reveals resolved |
| CLS, scripted scroll through the whole document | **0.00000** |
| Horizontal overflow | none at 320, 360, 390, 600, 900, 1120, 1440, 2560 |
| Console / page errors | none |
| Contrast | 124 checks, **0 failures**, both themes × all five era tints |

What it demonstrates that the written spec cannot: the pine colonnade reads unmistakably as
loblolly pine rather than as a mountain range (check the light theme, where it is clearest); the
era rail's proportional spacing makes the ninety-four-year Long Century occupy visibly more rail
than 1856–1860 does; and the `RunStrip`, laid out linearly on a year axis with a hatch on the
Democratic bars, makes "one interruption in twenty-five elections" legible at a glance and in
greyscale — which the 5×5 tile grid never did.

Not built in the prototype: `MarginTrend`, `BallotBar`, `Chronicle`, `FactTable`, `StatLine`,
`Colophon`, and the print stylesheet beyond a stub. Those are specified above.
