# Research Brief — *Red Clay & Lost Pines*
## Verification, gap-filling, and framing for the Bastrop County Republican history

Prepared for the rewrite of `/home/user/justin/index.html`. Nothing in `index.html` was edited.

---

## 0. Access note — read this first, it conditions every confidence rating below

**WebFetch and direct `curl` are both fully blocked in this environment.** Every host I
probed returned HTTP 403 at the egress proxy (`CONNECT tunnel failed, response 403`), including
every host I would normally treat as tier 1–2:

| Unreachable (403 at proxy) | What I wanted from it |
|---|---|
| `tshaonline.org` | The full Handbook of Texas *Bastrop County*, *Cedar Creek*, *Thompson, Cal* entries |
| `en.wikipedia.org` | County results tables in the "…presidential election in Texas" articles |
| `elections.sos.state.tx.us`, `sos.state.tx.us` | Official Texas SoS canvass returns, 1992– |
| `texasalmanac.com` | County-by-county returns through 1992; 19th-c. Black legislators list |
| `texascounties.net` | 2012/2016/2020 county presidential tables |
| `ballotpedia.org` | Officeholder party affiliations and race results |
| `bastropvotes.org`, `results.enr.clarityelections.com` | County's own canvass archive, 2006– |
| `tarlton.law.utexas.edu`, `tarltonapps.law.utexas.edu` | 1868–69 convention delegate journal |
| `tsl.texas.gov`, `tsl.access.preservica.com` | Texas State Library holdings |
| `texashistory.unt.edu` (Portal to Texas History) | Newspapers, canvass books |
| `dataverse.harvard.edu` (MIT Election Lab) | County returns 2000–2020 |
| `usafacts.org`, `census.gov`, `kvue.com`, `kxan.com`, `texastribune.org`, `data.capitol.texas.gov`, `bastropcountyhistorical.org`, `bastroptexas.net` | Various |

**Everything below therefore rests on WebSearch result content — search-engine extraction of
those same pages — not on pages I retrieved and read myself.** That is a real epistemic
downgrade and I have graded confidence accordingly. Where I say a Handbook sentence is
"verified," I mean I recovered what is presented as its verbatim text through two or more
independently phrased searches, not that I read the page. **Anything you intend to display as a
number on the site should be re-checked against the primary source once you have a machine that
can reach these hosts.** I flag the specific ones that most need it.

One methodological warning that saved this brief from a bad error is in §1.15 — please read it
before you source any number from a "county politics" aggregator.

---

## 1. VERIFICATION OF EXISTING CLAIMS

### 1.1 — ⛔ **The 1856 Frémont vote. This is wrong, and it is load-bearing.**

**The site says:** "a county that voted for the party's *first* presidential nominee in 1856"
(hero); "In 1856, most voters in Bastrop County cast their ballots for John C. Frémont" (Ch. 2
pullquote); a "1856 · John C. Frémont · Republican" line in the ballot card.

**The Handbook of Texas does say this.** Recovered text, *Bastrop County*:

> "In the presidential elections of 1848 and 1852, most of the voters in Bastrop County supported
> the Whig candidates; in 1856, most voted for John C. Fremont, the candidate of the new
> Republican Party; and in 1860, John Bell of the Constitutional Union Party carried the county."

**But the Handbook is in error, and demonstrably so.** John C. Frémont was **not on the ballot in
Texas in 1856** and received **no votes in the state**. Texas went to Buchanan (~67%) with
Fillmore of the American (Know-Nothing) Party as the sole opposition. Frémont received zero votes
in ten of the fourteen slave states that held a popular vote; Texas was one of them, alongside
Louisiana, Florida, and the rest of the Deep South.

- Source (tier 4, for orientation): *1856 United States presidential election in Texas* —
  https://en.wikipedia.org/wiki/1856_United_States_presidential_election_in_Texas — "Republican
  Party nominee John C. Frémont was not on the ballot."
- Corroborating (tier 3): Britannica, *United States presidential election of 1856* —
  https://www.britannica.com/event/United-States-presidential-election-of-1856
- Corroborating (tier 2): Library of Congress research guide, *Presidential Election of 1856* —
  https://guides.loc.gov/presidential-election-1856
- Parallel state articles confirming the same ballot exclusion in LA and FL.

**Confidence: high** that Frémont received no Bastrop County votes. This is not a close call —
a county cannot give a majority to a candidate who has no ballot line and no statewide votes.

**What the county almost certainly did in 1856:** voted for **Millard Fillmore (American /
Know-Nothing Party)**. That is the reading that makes the Handbook's own sentence internally
coherent — Whig in 1848, Whig in 1852, [Whig-successor] in 1856, Constitutional Union in 1860.
The American Party was where Southern Whigs went in 1856; the Constitutional Union Party was
where they went in 1860. Bastrop County's identity across those four elections is a single
consistent thing: **the anti-Democratic, Unionist, ex-Whig bloc.**

**Confidence that it was specifically Fillmore: moderate.** It is the only candidate it could
have been given a two-man Texas ballot, and it fits the sequence perfectly — but I could not
reach a county-level 1856 return to confirm it, and I will not assert a county result I have
not seen. See §4.1 for how to verify and §5.1 for how to write around it.

**Recommended action:** do not print "Frémont" as fact. Options, best to worst:
1. Rewrite the chapter around the *Whig–Unionist* identity (1848–1861), which is fully sourced
   and is a genuinely better story. Mention the Handbook's Frémont line as a documented error.
2. Keep the Frémont line but attribute and immediately qualify it in the body text.
3. Leave it as-is. I would advise against this; it is the single most checkable claim on the
   page and the one most likely to be challenged.

---

### 1.2 — ✅ 1860, John Bell (Constitutional Union)

Verified as Handbook text (see quotation in §1.1). Tier 2. **Confidence: high** for the Handbook
saying it; I could not reach an independent county canvass.

---

### 1.3 — ✅ 1872 Greeley fusion — the site's characterization is correct and its footnote is good

Recovered Handbook text:

> "In 1872 (the first year county voters could vote for president after Reconstruction) Horace
> Greeley, the Democratic candidate, won most of the county's votes."

Your Sources note (#9) — Greeley as the Democratic/Liberal Republican fusion nominee, counted on
the Democratic side "as the Handbook of Texas counts him" — is accurate and well-handled.

**One addition worth making:** the Handbook's parenthetical explains a hole in your timeline.
Texas cast no electoral votes in 1864 (Confederacy) or 1868 (unreconstructed). The gap between
1860 and 1872 in the ballot card is not an omission, it is a fact, and saying so is free color.

Tier 2. **Confidence: high.**

---

### 1.4 — ⚠️ "1874 through 1968" — verbatim from the Handbook, but the date is odd and worth a fix

Recovered Handbook text:

> "Thereafter the Democratic presidential candidates carried the county in virtually every
> election from 1874 through 1968; the only exception occurred in 1896, when Republican William
> McKinley won a plurality of the county's votes."

**1874 is not a presidential year.** The presidential elections in that run are **1876 through
1968** — twenty-four of them, one every four years. The Handbook's "1874" appears to be a slip
(or a reference to the general Democratic recapture of Texas government in 1873–74).

Your Chapter 4 reproduces "1874 through 1968" and then says "One year out of twenty-four."
Twenty-four is right for 1876–1968 inclusive. So your *count* is already computed on the correct
series — it is only the start-year label that is off.

**Also note the Handbook's hedge, "virtually every election."** The Handbook itself is not
claiming a clean sweep. Your Chapter 4 says "in virtually every single election" (good) but the
streak graphic and the "ninety-four-year drought" line in the closer both harden it into an
absolute. Recommend keeping the hedge visible in the graphic caption.

**Recommended fix:** "From 1876 through 1968 — twenty-four consecutive presidential elections —
Democratic candidates carried Bastrop County in all but one."

Tier 2. **Confidence: high** on the Handbook wording; **high** that 1876 is the correct start.

---

### 1.5 — ✅ 1896 McKinley plurality

Verified as Handbook text (§1.4). Tier 2. **Confidence: high.**

Worth adding for accuracy: 1896 in Texas was a four-way scramble (Bryan / McKinley / Palmer Gold
Democrats / Populists). A *plurality* in that year usually means the Democratic and Populist
vote split, not that the county turned Republican. Your card already marks it "(plurality)",
which is exactly right — don't let the rewrite upgrade it.

---

### 1.6 — ✅ Nixon 1972

Recovered Handbook text: "After 1972, when Republican Richard Nixon took the county with a
comfortable majority, Republican candidates began to become more competitive in the area."

Tier 2. **Confidence: high** on the fact. **But see §2 and §5.3 — the site's interpretation of
1972 as "The Turn" is not supportable.** This is the second-biggest framing problem on the page.

---

### 1.7 — ✅ Bush 2000 and 2004

Recovered Handbook text: "George W. Bush carried the county with comfortable majorities in 2000
and 2004." Tier 2. **Confidence: high** on the fact; no vote totals recovered (§4.3).

---

### 1.8 — ✅ The Handbook quotation in the Chapter 6 quote-card

The card attributes to the Handbook: *"By the early twenty-first century, Republican candidates
were fully competitive in races for local offices too."* I recovered the surrounding passage but
**not this exact sentence**. The Handbook's recovered phrasing near this point is "Republican
candidates began to become more competitive in the area." Those are different sentences.

**Recommended action:** either drop the quotation marks and paraphrase, or verify the exact
sentence against the live Handbook page before publishing it as a pull-quote with attribution.
A quote-card is the highest-risk place on a page to be approximate. **Confidence: low** that the
quoted sentence appears in the Handbook as written.

---

### 1.9 — ✅ Cal Thompson's 1869 land purchase — verified, and much richer than the site has it

Cal (Calvin) Thompson has **his own Handbook of Texas entry**, which the site does not cite:
https://www.tshaonline.org/handbook/entries/thompson-cal

Recovered content:
- Born in slavery c. **1828** in Tennessee.
- Purchased land in the **Cedar Creek** community in **1869**, **at the suggestion of his former
  enslaver, Marshall Trigg of Hills Prairie**.
- Built holdings to **500 acres** of farmland a few miles west of Bastrop.
- **Murdered on the evening of April 21, 1890**, shot by two white men as he rode out of Bastrop
  toward Cedar Creek; his body was found the next morning after his horse was found loose.
- His death is framed by the entry as part of the wave of racial violence following the Cedar
  Creek shootout (§3.1).

Tier 2. **Confidence: high** on the 1869 purchase and the 1890 murder; **moderate** on the
Marshall Trigg detail and the 500-acre figure (single-source, one search).

**This changes the chapter.** The site currently uses Thompson as a founding image — a freedman
buying land in the year Black Texans first voted. The Handbook's entry is a *complete arc*:
he buys in 1869 and he is shot dead in 1890. Using only the first half is the single largest
omission on the page. See §5.4.

---

### 1.10 — ⚠️ May 1888, Orange Weeks → **the name is Orange WICKS**

**Correction.** The Handbook's *Cedar Creek* and *Thompson, Cal* entries give the name as
**Orange Wicks** (some renderings show "Weeks (Wicks)", indicating "Weeks" is a variant or an
error that has propagated). Ike Wilson is correct as spelled.

Verified content:
- **May 1888**: two African American men, **Orange Wicks** and **Ike Wilson**, elected **justice
  of the peace** and **constable** respectively for the **Cedar Creek precinct**.
- **Orange W. Wicks was the first African American elected justice of the peace in Bastrop
  County.** (New fact — worth adding.)

Sources: https://www.tshaonline.org/handbook/entries/cedar-creek-tx-bastrop-county ;
https://www.tshaonline.org/handbook/entries/thompson-cal . Tier 2.
**Confidence: high** on the offices, date, and Wilson; **moderate-high** on "Wicks" as the
correct spelling — both TSHA entries I recovered use it, but I could not read the pages directly.
Given the ambiguity I would write it as **Orange Wicks** with a note that some sources render it
"Weeks."

---

### 1.11 — ⛔ "Fifty-two African American men served in the Texas Legislature during Reconstruction.
Every one of them was a Republican."

**Both halves of this need repair.**

**On the number.** Your source (Texas Highways, tier 3) does say "Fifty-two African American men
served as Texas legislators during the Reconstruction era… All were Republicans." But the
institutional sources give a materially different accounting:

- **Texas Almanac**, *African American Legislators of the 19th Century*
  (https://www.texasalmanac.com/articles/african-american-legislators-of-the-19th-century) and
  Texas State Library (https://www.tsl.texas.gov/treasures/giants/aalege): **by the end of the
  1800s, 52 African Americans had served in 2 constitutional conventions and 14 legislatures.**
- Another recovered figure: **41** African Americans served in the *state legislature* between
  **1868 and 1900**.

So "52" is **legislators *plus* constitutional convention delegates**, over **1868–1900** — not
52 legislators, and not "during Reconstruction." Texas Reconstruction ends in 1873–74; more than
half of that 1868–1900 span is post-Reconstruction. The site's sentence compresses a 32-year
count into a ~6-year era and drops the convention delegates.

**On "every one of them was a Republican."** For the Reconstruction cohort proper this is
substantially true and is what Texas Highways asserts. Extended across 1868–1900 it gets
slippery: the later Black officeholders operated in an era of Republican factionalism and
Populist fusion, and blanket party attribution across three decades is not something the
institutional sources make.

**Recommended replacement:** "Between 1868 and 1900, fifty-two African American men served Texas
either in the legislature or as delegates to a constitutional convention. The Reconstruction-era
cohort were Republicans — in a state whose Democratic party had carried it into the Confederacy."
That keeps your rhetorical beat, keeps the striking number, and stops overclaiming.

Tier 2 vs. tier 3 conflict; I trust the Almanac/TSL accounting. **Confidence: high** that the
site's current phrasing misstates what the 52 counts.

---

### 1.12 — ✅ 2020 presidential totals — verified, two sources

Trump **20,516 (56.0%)** / Biden **15,110 (42.2%)**.
- https://www.zipdatamaps.com/election-atlas/county/tx/bastrop-county/map-of-2020-presidential-election-results-by-voting-precinct (tier 4)
- NBC News Texas president results, https://www.nbcnews.com/politics/2020-elections/texas-president-results (tier 3) — independently returns the same two totals and percentages.

**Confidence: high.** Your derived margin of +13.8 is correct arithmetic (56.0 − 42.2 = 13.8).

---

### 1.13 — ✅ 17 of 22 precincts, 2020

"22 voting precincts… 5 voted majority Democrat and 17 voted majority Republican." Source as
above (zipdatamaps, tier 4). **Confidence: moderate-high** — the claim is consistent across
searches but rests on a single tier-4 publisher. The county's own canvass
(https://www.bastropvotes.org/election-information-2/election-results/election-archives/) would
settle it; it is unreachable from here.

---

### 1.14 — ✅ 2024 presidential totals — verified, two sources

Trump **23,276 (58.6%)** / Harris **15,941 (40.1%)**, 100% of precincts reporting.
- KVUE, https://www.kvue.com/article/news/politics/vote-texas/presidential-race-central-texas-counties/269-0d0ef374-5e26-4120-becf-eec6e72345d1
- FOX 7 Austin, https://www.fox7austin.com/election/central-texas-president-vote-2024 — returns
  the identical four numbers.

Tier 3, two independent outlets. **Confidence: high.** Derived margin +18.5 and the +4.7 swing
vs. 2020 are both correct arithmetic.

**Context worth adding:** 2024 was a *regional* Republican year, not a Bastrop-specific one —
the same FOX 7 piece records Trump retaking Williamson County (50.4–47.9) after Biden flipped it
in 2020. Bastrop's +4.7 shift is roughly the Central Texas norm, not an outlier.

---

### 1.15 — ⚠️⚠️ **A data trap you must know about: Homefacts serves STATEWIDE numbers on its county page**

`https://www.homefacts.com/politics/Texas/Bastrop-County/Bastrop.html` presents a clean-looking
"Bastrop County presidential results by year, 1964–2012" table. **Every value on it is the Texas
statewide result, not the county result.** I checked all nine years it returned:

| Year | Homefacts "Bastrop County" | Actual Texas statewide |
|---|---|---|
| 1976 | 51.1 D / 48.0 R | Carter 51.14 / Ford 48.0 ✔ |
| 1980 | 41.4 D / 55.3 R | Carter 41.4 / Reagan 55.3 ✔ |
| 1984 | 36.1 D / 63.6 R | Mondale 36.1 / Reagan 63.6 ✔ |
| 1988 | 43.3 D / 56.0 R | Dukakis 43.3 / Bush 56.0 ✔ |
| 1992 | 37.1 D / 40.6 R | Clinton 37.07 / Bush 40.56 ✔ |
| 1996 | 43.8 D / 48.8 R | Clinton 43.8 / Dole 48.8 ✔ |
| 2000 | 38.0 D / 59.3 R | Gore 38.0 / Bush 59.3 ✔ |
| 2004 | 38.2 D / 61.1 R | Kerry 38.2 / Bush 61.1 ✔ |
| 2008 | 43.7 D / 55.5 R | Obama 43.7 / McCain 55.5 ✔ |
| 2012 | 41.4 D / 57.2 R | Obama 41.4 / Romney 57.2 ✔ |

Ten for ten. Statewide comparison verified against the Texas Tribune's
"How Texas voted in every presidential election since 1976"
(https://www.texastribune.org/2016/11/08/heres-how-texas-voted-every-presidential-election/) and
the Wikipedia Texas state-year articles.

This matters because **Homefacts is the top search hit for "Bastrop County presidential election
results by year."** It is the first thing you or any collaborator will find, it looks
authoritative, and it will hand you ten fabricated county data points that are wrong in exactly
the direction that flatters a "smooth Republican trend" narrative — it would show the county
going Republican in 1980 and never returning, which is the opposite of what happened (§2).
**Do not use it. Blocklist it.**

---

### 1.16 — ⚠️ Population statistics — three of four verify, one has a period mismatch, and the headline number is stale

| Site claim | Status |
|---|---|
| Population **102,370** (2023) and **84,522** (2019), **+21.1%** | ✅ Verified. These are **ACS 2019–2023 five-year estimates**. Community Impact, https://communityimpact.com/austin/bastrop-cedar-creek/government/2025/01/03/new-data-shows-bastrop-countys-growth-in-population-annual-household-income/ (tier 3), gives 84,522 → 102,370 = 21.12%. **Confidence: high.** |
| **13.9%** growth 2020→2023; **13th** fastest-growing county in Texas | ✅ Verified. KXAN on Census Bureau estimates, https://www.kxan.com/news/texas/these-were-the-fastest-growing-counties-in-texas-in-2023-according-to-new-census-bureau-estimates/ (tier 3). **Confidence: high.** |
| **97.25%** of growth from in-migration | ⚠️ **Period mismatch.** The figure is real and correctly quoted, but it is from **2020–2021**, not 2020–2023. KXAN, https://www.kxan.com/news/texas/maps-which-texas-counties-are-growing-the-fastest/. The site's layout places it directly beneath the 13.9% (2020–2023) stat, implying they describe the same window. The comparable recent figure is **77.4%** (2024–25 estimates) — still dominant, but not 97%. **Fix:** label it "2020–21" explicitly, or switch to the 77.4% figure, or say "between 77% and 97% depending on the year measured." |

**Additionally — the headline population number is now stale and understates the county badly.**
102,370 is a five-year *average* centered around 2021, published as a "2023" figure. Current
estimates:
- **~114,931** (most recent Census base) and **~118,908 (2025)** — Data Commons,
  https://datacommons.org/place/geoId/48021 ; USAFacts,
  https://usafacts.org/answers/how-many-people-live-in-the-us/county/bastrop-county-tx/
- **~121,879 (2026 projection)** — World Population Review,
  https://worldpopulationreview.com/us-counties/texas/bastrop-county

A local Republican-aligned site is already publishing "122,000 residents"
(https://bastropcc.com/blog/bastrop-county-growth/). Your page showing 102,370 will read as
roughly 16,000 people behind. **Recommend: lead with ~119,000 (2025 estimate) and keep 102,370
only inside the explicit 2019→2023 ACS growth comparison.** Tier 3/4; **confidence: moderate-high**
on ~119k for 2025.

---

### 1.17 — Chapter 1 (colonization, 1827/1836/1837, Baron de Bastrop)

**Not independently verified.** I spent the budget on the contested political claims. These are
standard, uncontroversial Handbook facts and I have no reason to doubt any of them; I simply did
not check them and will not pretend otherwise. One nuance if you want it: the Baron de Bastrop's
title was self-assumed — Felipe Enrique Neri was born Philip Hendrik Nering Bögel and left the
Netherlands ahead of an embezzlement charge. That is well-established and adds a nice note of
texture to "the Dutch businessman," but I did not source it in this session.

---

## 2. THE BIG GAP: PRESIDENTIAL RESULTS, 1972 → 2016

**The headline finding: there is no smooth trend to draw, and the site's implicit story is wrong.**
Nixon 1972 did **not** start a Republican era in Bastrop County. The county went straight back to
the Democrats and stayed with them, in some form, for another **twenty-four years**. The durable
Republican flip at the presidential level is **2000**, not 1972.

The load-bearing evidence is a second passage in the Handbook of Texas *Bastrop County* entry
that the site does not currently use. Recovered verbatim through repeated independent searches:

> "The Democrats won majorities in the county in 1976, 1982, and 1988, but Republican Ronald
> Reagan won there in 1984… in 1992 and 1996, Democrat Bill Clinton won only pluralities in the
> area, partly because independent candidate Ross Perot attracted many voters who might otherwise
> have voted Republican. George W. Bush carried the county with comfortable majorities in 2000
> and 2004."

### The series as far as it can be sourced

| Year | Winner in Bastrop County | Detail | Source & tier | Confidence |
|---|---|---|---|---|
| **1972** | **R — Nixon** | "comfortable majority" | Handbook of Texas, T2 | High |
| **1976** | **D — Carter** | majority | Handbook of Texas, T2 | High |
| **1980** | **D — Carter** | **Carter 4,716 (53.91%) / Reagan 3,768 (43.07%)**, 8,748 total | single unattributed county table via search, T4 | **Moderate** — see note |
| **1984** | **R — Reagan** | Handbook singles it out as the exception | Handbook of Texas, T2 | High |
| **1988** | **D — Dukakis** | majority | Handbook of Texas, T2 | High |
| **1992** | **D — Clinton** | **plurality only**; Perot splitting the anti-Democratic vote | Handbook of Texas, T2 | High |
| **1996** | **D — Clinton** | **plurality only** | Handbook of Texas, T2 | High |
| **2000** | **R — Bush** | "comfortable majority" | Handbook of Texas, T2 | High (no numbers) |
| **2004** | **R — Bush** | "comfortable majority" | Handbook of Texas, T2 | High (no numbers) |
| **2008** | **R — McCain** | no county figures recovered | — | Not sourced |
| **2012** | **R — Romney** | no county figures recovered | — | Not sourced |
| **2016** | **R — Trump** | **won by a 20-point margin**; Trump **~56%** | KVUE "Backstory," T3; NBC News TX county results, T3 | Moderate-high on margin; moderate on 56% |
| **2020** | **R — Trump** | 56.0% / 42.2% (§1.12) | T3+T4, two sources | High |
| **2024** | **R — Trump** | 58.6% / 40.1% (§1.14) | T3, two sources | High |

**Notes on individual cells:**

- **1980.** A single search returned an internally consistent county row: Carter 4,716, Reagan
  3,768, total 8,748. The arithmetic checks (4,716/8,748 = 53.91%; 3,768/8,748 = 43.07%; the
  264-vote residual is a plausible Anderson/other bucket), and a ~8,700-vote turnout is right for
  a county of ~24,700 in 1980 — which is strong evidence it is a real extracted table row rather
  than a confabulation. **But I could not re-surface it in three subsequent searches, and the
  Handbook's own sentence conspicuously omits 1980** from its list of Democratic years. Treat as
  **provisional**. If you display it, mark it. If you want one number verified before publication,
  make it this one.
- **1984.** Note *how* Reagan won it — 1984 was a 63.6%-statewide national landslide. A county
  that goes Republican only in 1972 and 1984 is a county that goes Republican in blowouts and
  comes home otherwise. That is the correct reading of both those data points.
- **1992/1996.** Clinton **won** Bastrop County twice. This is the fact most sharply at odds with
  the site's current shape. The Handbook's causal note (Perot draining the right) is doing real
  work and should be reproduced, not paraphrased away — it prevents a reader from concluding the
  county was still Democratic by conviction.
- **2016.** KVUE's "Backstory" gives the margin (+20) in a comparative list — Williamson +10,
  Caldwell +16, Bastrop +20, Hays +0.8, Burnet +57, Fayette +60. NBC's county table gives Trump
  56%. Those are mutually consistent (56 R / ~36 D / ~8 third-party is a normal 2016 shape). I
  have **no vote totals** and would not print a Clinton percentage.
- **2008 and 2012.** I could not source these at all. Do not interpolate them; do not let the
  chart imply them. See §4.3.

### What this series actually looks like when you draw it

Not a trend line — a **step function with a false start**:

```
1972  R  ← Nixon landslide
1976  D
1980  D  (provisional)
1984  R  ← Reagan landslide
1988  D
1992  D  (plurality — Perot)
1996  D  (plurality — Perot)
─────────────────────────── the actual flip
2000  R
2004  R
2008  R
2012  R
2016  R  (+20)
2020  R  (+13.8)  ← Biden-era narrowing
2024  R  (+18.5)
```

Two isolated landslide-year Republican wins (1972, 1984); an otherwise unbroken Democratic hold
through 1996; a hard flip in 2000 that has never reversed; and — worth noticing — the Republican
margin **narrowing** in 2020 before widening again in 2024. The county is not on a monotonic
march. Your instinct in the assignment ("do not assume a smooth monotonic trend") was correct,
and the sources bear it out more strongly than you probably expected.

---

## 3. NEWLY SURFACED MATERIAL, RANKED BY WHAT IT ADDS

### 3.1 — 🥇 **The Cedar Creek Shootout, June 13, 1889 — and the destruction of the county's Black Republican politics**

**This is the most important thing missing from the site.** Chapter 3 currently ends on the 1888
election of Wicks and Wilson — a note of triumph. What actually happened next is the collapse of
the whole thing inside eighteen months.

The sequence, from the Handbook of Texas *Cedar Creek* and *Thompson, Cal* entries:

1. **May 1888** — Orange Wicks elected justice of the peace (the first African American to hold
   that office in Bastrop County), Ike Wilson elected constable, for the Cedar Creek precinct.
2. **June 1889** — tension builds around an assault-and-battery case against **Andy (Andie)
   Litton**, a young white man. (The Litton name is old Cedar Creek gentry — Addison Litton held
   the original 1832 league on both sides of the creek.)
3. **June 13, 1889** — **Justice Wicks calls the case** (recorded variously as *State of Texas v.
   Addie Lytton* / Litton). A white defendant's refusal to let **Constable Ike Wilson serve
   papers** on him escalates into an armed confrontation between white and Black groups outside
   the court. **Four men are killed — two white, two Black.**
4. **Aftermath** — **Wicks and Wilson are arrested and charged with murder.** Numerous African
   Americans are arrested. In the years following, "a considerable number of African Americans
   were either killed or forced into exile from Cedar Creek."
5. **April 21, 1890** — **Cal Thompson is shot dead** by two white men on the road from Bastrop
   to Cedar Creek (§1.9).
6. **The demographic result: Cedar Creek's population falls from 600 in 1884 to 250 by 1896** — a
   community losing roughly **58%** of its people in twelve years. *(That percentage is my
   arithmetic from the two sourced figures: (600−250)/600 = 58.3%.)*

Sources: https://www.tshaonline.org/handbook/entries/cedar-creek-tx-bastrop-county ;
https://www.tshaonline.org/handbook/entries/thompson-cal . Tier 2.
**Confidence: high** on the June 13 1889 date, the four deaths, the arrests of Wicks and Wilson,
the Thompson murder, and the 600→250 population figures. **Moderate** on the defendant's exact
name (renderings vary: Andy Litton / Andie Litton / Addie Lytton).

**There is a dedicated monograph:** Donald R. Nesby, *The Shootout at Cedar Creek, June 1889: Ike
Wilson and the Legacy of Black Texas Lawmen* (2004), ISBN 9781881825470 —
https://books.google.com/books/about/The_Shootout_at_Cedar_Creek_June_1889.html?id=1RTLpwAACAAJ .
This is the specialist source; if you want one interlibrary-loan request out of this brief, make
it this. There is also a **Bastrop Opera House stage production, *The Cedar Creek Shootout***
(2017) — https://ctxlivetheatre.com/productions/20170428-the-cedar-creek-shootout-by-bastrop-opera/
— which tells you the county itself treats this as part of its public memory, not a buried story.

**Why it matters structurally:** the site's Chapter 3 is called "The Party of Lincoln at Cedar
Creek" and its Chapter 4 is called "The Long Century," and between them there is a silent cut.
The reader is left to infer that Black Republican voting simply *faded*. It did not fade. It was
killed at a courthouse door in June 1889, and the disfranchisement statutes of 1902–03 (§3.9)
arrived thirteen years later to make permanent what violence had already accomplished.

---

### 3.2 — 🥈 **Jeremiah J. Hamilton — Bastrop County's own Black Republican legislator**

The site's Chapter 3 talks about "fifty-two legislators" in the abstract while the county's actual
one goes unnamed. Fix this.

**Jeremiah J. Hamilton** (1838–1905):
- Born **enslaved, July 1, 1838, in Tennessee**; brought to Texas **1847**; **taught to read
  illegally while enslaved**.
- **Secretary of the Texas State Central Committee of Colored Men, March 1866.**
- **Lived in Bastrop County**; a spokesman for Black workers **as early as 1866**; acquired land
  and served as a **land trustee for Black residents**.
- **Summer 1866 — founded a school for Black students of all ages in Bastrop.**
- **Selected for the board that registered voters in Bastrop County in 1867** — i.e. he personally
  ran the registration drive your Chapter 3 timeline describes generically.
- **Elected as a Republican in 1869; served in the Texas House, 12th Legislature, February 9, 1870
  – January 14, 1873**, representing Bastrop (with Fayette in the district).
- As a legislator favored bills advancing **law enforcement, education, and civil rights**.
- Built the **Hamilton House (1871)**, still standing at Symphony Square in Austin.
- Worked as newspaperman, teacher, and carpenter. Died **1905**.

Sources: https://www.tshaonline.org/handbook/entries/hamilton-jeremiah-j (T2);
Texas Legislative Reference Library member profile,
https://lrl.texas.gov/legeLeaders/members/memberDisplay.cfm?memberID=4440 (T2 — an official
legislative record, the best single citation for the dates of service);
Texas State Library, *Forever Free* biographies,
https://www.tsl.texas.gov/exhibits/forever/biographies/page5.html (T2).
**Confidence: high.** Minor unresolved detail: whether the seat is described as "Bastrop" or
"Fayette and Bastrop" varies by source — the LRL profile is the authority.

**And it is live news.** In September 2025 Bastrop moved to erect a **state historical marker
honoring Hamilton**: Community Impact,
https://communityimpact.com/austin/bastrop-cedar-creek/government/2025/09/05/bastrop-historical-marker-to-honor-former-slave-jeremiah-j-hamilton/
(T3). That gives the site a clean way to connect Chapter 3 to the present day that has nothing to
do with vote totals — the county is currently, actively, memorializing its first Black Republican
legislator.

**Also worth a line: Robert A. Kerr**, who as a member of the **Bastrop County School Board**
helped establish **the first high school for African Americans in Bastrop County**. Surfaced via
search (T4 pointer to a Wikipedia entry); **confidence: moderate**, not independently verified.

---

### 3.3 — 🥉 **Morgan C. Hamilton — Bastrop County's delegate to the Constitutional Convention of 1868–69, and later U.S. Senator**

The site has no Reconstruction-era *organization* at all. Here it is.

- **Morgan C. Hamilton (1809–1893)** sat in the **Constitutional Convention of 1868–69 as a
  delegate from the County of Bastrop**. He had been appointed **state comptroller in 1867**. At
  the convention he led a **Radical Republican faction calling for the disfranchisement of all
  former Confederates**, which made him controversial even among Republicans. He went on to serve
  as **U.S. Senator from Texas**. He was the brother of **Andrew Jackson Hamilton**, the Unionist
  provisional governor.
- **Julius Schuetze** sat as delegate for **the counties of Fayette and Bastrop** — a German-Texan
  Unionist, which is the other half of the county's Republican coalition and one the site
  completely omits (see §5.5).
- Convention composition: **ninety delegates, eighty white and ten Black**; a commonly cited
  alternate count is eleven African Americans.

Sources: delegate list in the *Journals of the Reconstruction Convention, 1868*,
https://tarltonapps.law.utexas.edu/imgs/constitutions/files/journals1868/1869_delegates_jnl.pdf
(**T1 — a primary document**, though I could only reach it through search extraction, not
directly); https://www.tshaonline.org/handbook/entries/hamilton-morgan-calvin (T2);
https://www.tshaonline.org/handbook/entries/constitutional-convention-of-1868-69 (T2);
congressional biography, https://bioguide.congress.gov/search/bio/H000115 (T1/T2).
**Confidence: moderate-high.** The delegate-county assignment comes from search extraction of the
journal; because Morgan Hamilton's residence and business life were centered on Austin/Travis
County, the Bastrop seat is exactly the kind of detail worth confirming against the journal PDF
before you print it (§4.5). Also noted in search: `afrotexan.com` hosts a page
`/Republican/conventions/1869__morgan_hamilton.htm`, which suggests a Texas Black-Republican
convention archive that may be worth mining if you can reach it.

---

### 3.4 — **The 1861 secession referendum: Bastrop County voted NO, 352–335**

Recovered from the Handbook *Bastrop County* entry: despite backing national Union candidates
through 1860, **Bastrop County voters rejected the secession ordinance 352 to 335** — then
"rallied for the Confederate cause," arming and equipping companies and providing for soldiers'
families.

Context: the referendum was held **February 23, 1861**; statewide it passed with roughly **76%**
in favor; of the counties casting votes, **only about eighteen returned majorities against
secession**. Bastrop was one of them.

Sources: Handbook of Texas *Bastrop County* (T2, via search);
https://en.wikipedia.org/wiki/1861_Texas_secession_referendum (T4);
Texas Almanac secession materials, https://www.texasalmanac.com/drupal-backup/images/Secession3.pdf (T2);
**and the scholarly source of record for county-level secession returns** — Timmons, "The
Referendum in Texas on the Ordinance of Secession, February 23, 1861: The Vote," *East Texas
Historical Journal* 11:2, https://scholarworks.sfasu.edu/ethj/vol11/iss2/6/ (T2, peer-reviewed;
open access, and it *should* be reachable from an unblocked machine).

**Confidence: moderate-high** on 352–335 (single recovered attribution to the Handbook, but the
"one of ~18 anti-secession counties" fact corroborates it structurally). **Verify against the
ETHJ article** — it is the cleanest citation available and it is free.

**This is the fact that should anchor Chapter 2 instead of Frémont.** It is a *county-level vote
count* — the thing the site otherwise has none of before 1972 — it is 17 votes wide, and it says
precisely what the chapter wants to say: this county did not go along. And it comes with its own
built-in complication (they voted no, then they fought anyway), which is exactly the kind of
honesty that makes the rest of the page credible.

---

### 3.5 — **1848 and 1852: the county was Whig**

From the same Handbook sentence quoted in §1.1: "In the presidential elections of 1848 and 1852,
most of the voters in Bastrop County supported the Whig candidates" — i.e. **Zachary Taylor
(1848)** and **Winfield Scott (1852)**. T2, **confidence: high** on the Handbook wording.

Small fact, large structural payoff: it converts the site's isolated 1856 curiosity into a
**four-election pattern** (1848 W, 1852 W, 1856 anti-Democratic, 1860 CU, 1861 anti-secession) and
gives Chapter 2 a real thesis that survives the loss of the Frémont claim.

---

### 3.6 — **McDade, 1883: the vigilante hangings and the Christmas Day shootout**

The county's other 1880s violence story, and it connects to your law-enforcement thread.

- McDade was a railroad depot town of ~150 by 1879 and a stronghold of an outlaw band known as the
  **"notch cutters."** County law enforcement was distant and ineffective.
- The vigilante pattern long predates 1883: **1875**, citizens hang two suspected outlaws,
  provoking the murder of two vigilantes and the hanging of a third outlaw; **early 1876**, two men
  caught with a skinned cow bearing the **Olive** brand are shot on the spot; **June 26, 1877**,
  vigilantes stop a dance, take four men out and lynch them.
- **November 1883** — two men murdered at Fedor; separately, a man beaten, robbed, left for dead.
- **December 1, 1883** — the investigating officer, **Deputy Sheriff Isaac "Bose" Heffington**, is
  shot dead in McDade. **Jeff Fitzpatrick** was indicted for the killing.
- **Christmas Eve 1883** — a vigilance committee hangs suspected perpetrators. **Sources conflict
  on the number: "four" and "three" both appear.**
- **Christmas Day 1883** — a gunfight in front of a McDade saloon leaves **three more men dead**.
- One local account claims that from 1875 to 1884 there were more killings in McDade than in
  Tombstone and Deadwood combined — colorful, tier-4, and I would not repeat it as fact.

Sources: https://www.tshaonline.org/handbook/entries/mcdade-tx (T2);
https://www.texasalmanac.com/places/mcdade (T2);
http://bob-texashillcountry.blogspot.com/2009/12/1883-bloody-christmas-in-mcdade-texas.html (T4).
**Confidence: high** on the general sequence and on Heffington's name and death date;
**low** on the number hanged Christmas Eve — report it as "three or four, sources differ," or
avoid the count.

**How it intersects with politics — handle with care.** I did **not** find a source directly
linking the McDade vigilance committee to party politics, to the county Republican organization,
or to the Cedar Creek events. What the episode legitimately supports is a *structural* argument
about the same decade: in 1880s Bastrop County, formal law enforcement was weak and contested, and
private armed committees repeatedly substituted for it — at McDade in 1883 against white outlaws,
and at Cedar Creek in 1889 against Black officeholders who were themselves the legal authority.
The through-line is **who gets to be the law**, and Wicks and Wilson lost that argument at
gunpoint. That framing is defensible on the sourced facts. **Do not assert a direct organizational
link between the two — I have no evidence for one, and it would be invention.**

---

### 3.7 — **The modern county Republican officeholders: names and years**

The site's Chapter 6 asserts local competitiveness with no names at all. Here is the roster I
could source.

| Person | Office | Year | Source / tier | Confidence |
|---|---|---|---|---|
| **Clara Beckett (R)** | County Commissioner, Pct. 2 | **Elected 2002**, took office Jan. 2003; **still serving** — longest-serving member of the court, on the ballot again in 2026 | Ballotpedia (T3); LegiStorm, https://www.legistorm.com/person/bio/498788/Clara_Peacock_Beckett.html (T3) | High on 2002/2003 and party |
| **Ronnie McDonald (D)** | County Judge | **Elected 1998** at age 27 — **youngest county judge in Texas history and the first African American county judge in Bastrop County**; served **1998/99–2012**; **did not seek re-election in 2012 after the Complex Fire** | http://www.main.org/aspa/mcdonald.htm (T3/T4) | Moderate-high |
| **Paul Pape (R)** | County Judge | **Won a special election in 2012** to succeed McDonald; re-elected **2014** and **2018**; did not seek re-election 2022; lost the GOP primary runoff for Texas House District 17 on May 24, 2022 | Ballotpedia, https://ballotpedia.org/Paul_Pape (T3) | High |
| **Maurice Cook (R)** | Sheriff | Won the GOP nomination in **2016** by **4 votes** (50.23%) in the runoff, then **defeated Democrat Mike Renck with 58%** in November; still sheriff, on the ballot in 2024 | Spectrum News, https://spectrumlocalnews.com/tx/austin/politics/2016/05/25/unofficial-results--maurice-cook-wins-republican-sheriff-nomination (T3); KVUE, https://www.kvue.com/article/news/politics/elections/cook-defeats-renck-in-bastrop-sheriff-race/269-349629711 (T3) | High |
| **Gregory Klaus (R)** | County Judge | Won the **2022** GOP runoff over **Don Loucks**, 3,382 (55%) to 2,794 (45%); won the general; **took office January 2023** | Ballotpedia (T3); LegiStorm, https://www.legistorm.com/person/bio/498786/Gregory_Klaus.html (T3) | High |
| **Curtis Courtney** | **County Republican Party Chair, 2022–present** | Republican precinct chair for Pct. 4019, **2015–2022**; became county chair **June 2022** | https://www.bastropctygop.com/county-chair/ (T3, party's own site) | Moderate-high |
| Predecessor chair, "**Mike**" | County Republican Party Chair, to **June 13, 2022** | Handed off to Courtney | https://www.bastropctygop.com/2022/06/12/mike-thanks-you/ (T3) | **Low on the surname** — do not print it; see §4.6 |

**The best single sentence you can now write about the modern turn:** *the county judgeship passed
from Democrat Ronnie McDonald to Republican Paul Pape in 2012, and the sheriff's office to
Republican Maurice Cook in 2016 — eleven and fifteen years after the county's presidential vote had
flipped.* That is the down-ballot lag your Chapter 5 gestures at ("down-ballot races that went
uncontested for years before someone finally filed"), made concrete with names and dates. Note
also that **Clara Beckett won a commissioner's seat in 2002 — the same cycle-pair as the
presidential flip**, well ahead of the countywide offices.

**One important caution: the 2024 "Republicans won every race" claim.** Ballotpedia is cited on
the site for this and I have no evidence against it. But **Cheryl Renee' Reese (D)** held/contested
Commissioner Pct. 4 in 2022, and I could **not** confirm the outcome of that race or the current
partisan composition of the commissioners court — search synthesis garbled it badly (one response
placed Beckett in two precincts simultaneously). **Do not claim the commissioners court has an
all-Republican majority, or state when it first got one. I could not establish either.** See §4.4.

---

### 3.8 — **The 2011 Bastrop County Complex Fire**

Facts, well sourced:
- Ignited **September 4, 2011**; burned **55 days**; **the most destructive wildfire in Texas
  history**; **~1,600–1,691 homes destroyed**; **two deaths**; property damage estimated at
  **$325 million**; ~**32,000–34,000 acres** burned, including **~95% of Bastrop State Park** and
  **32,400 acres of the Lost Pines** ecosystem.
- Recovery: **459 single-family homes** rebuilt on destroyed lots by 2013 — **46% of the 2011
  stock**, and **75% of all rebuilding done between 2012 and 2021**. Of the destroyed homes,
  **747 belonged to families with no resources or inadequate insurance** (Bastrop County Long Term
  Recovery Team). Over **4 million** drought-hardy loblolly pines replanted from January 2013.
- Compounding disasters: **2015 flood/dam breach**, the **2015 Hidden Pines Fire**, and a
  **Memorial Day 2016 flood**.

Sources: https://en.wikipedia.org/wiki/Bastrop_County_Complex_Fire (T4);
U.S. Dept. of the Interior, https://www.doi.gov/recovery/recovery-in-action/bastrop (T2);
Texas Real Estate Research Center (Texas A&M), https://trerc.tamu.edu/article/reflecting-on-bastrop
(T2 — the source for the rebuild statistics, and the best one here);
TPWD, https://tpwd.texas.gov/state-parks/bastrop/life-after-wildfire (T2);
KXAN ten-year retrospective (T3). **Confidence: high** on the physical facts.

**On the political aftermath — be careful.** I found **one** genuine political consequence:
**County Judge Ronnie McDonald (D) chose not to seek re-election in 2012 after the fire**, and the
seat went to Republican Paul Pape in that year's special election. That is a real, sourceable
hinge and it is a good one — the county's last Democratic countywide executive leaves in the
aftermath of the fire, and the office has been Republican ever since.

**What I could not source: any claim that the fire changed the county's partisan composition.**
The rebuild data actually cuts the other way — the dominant pattern was *existing residents
rebuilding on their own lots*, not wholesale replacement of the population. The county's political
transformation is far better explained by the Austin-driven in-migration that both predates and
outlasts the fire (the county roughly doubled from ~1990 to 2010, before the fire). **Frame the
fire as a civic and symbolic rupture with one documented political consequence — not as a
demographic cause.** Claiming otherwise would be exactly the kind of tidy causal story the
evidence does not support.

---

### 3.9 — **Disfranchisement: how the Cedar Creek electorate was finally shut out**

The mechanics, in order:

1. **Violence first** (1889–90 and after) — see §3.1. This did the initial work locally, a decade
   before any statute.
2. **The poll tax, 1902.** The Texas Constitution was amended in **1902** to require payment of a
   poll tax (**$1.50–$1.75**) as a precondition of voting. Courts later found that a primary
   purpose of the 1902 amendment "was the desire to disenfranchise the Negro and the poor white
   supporters of the Populist Party" (*United States v. Texas*, 252 F. Supp. 234 (W.D. Tex. 1966),
   https://law.justia.com/cases/federal/district-courts/FSupp/252/234/1410599/ — **T1, a federal
   court opinion, and the strongest citation in this section**).
3. **The Terrell Election Law, 1903** (amended repeatedly thereafter) — allowed parties to
   restrict who could vote in their primaries, **paving the way for the white primary**. Since the
   Democratic primary was the only election that mattered in one-party Texas, exclusion from it
   was exclusion from politics. https://en.wikipedia.org/wiki/Terrell_Election_Law (T4);
   Handbook of Texas, *Election Laws*, https://www.tshaonline.org/handbook/entries/election-laws
   and *White Primary*, https://www.tshaonline.org/handbook/entries/white-primary (T2).
4. **The broader campaign** — Handbook of Texas, *African Americans and Politics*
   (https://www.tshaonline.org/handbook/entries/african-americans-and-politics, T2) describes
   intimidation, harassment of Black leaders, lynching (300–500 Black Texans late in the century),
   Jim Crow institution-building, and repeated legislative attempts at a poll tax from 1875 onward,
   "culminat[ing] in the effective removal of Blacks from the electorate."

**Confidence: high** on all four. **What I could not find: any Bastrop-County-specific
disfranchisement mechanic** — no local poll-tax receipt counts, no county Democratic club rules, no
local white-primary resolution. See §4.7. The honest construction is to narrate the statewide
machinery and let the Cedar Creek population collapse (600 → 250, §3.1) stand as the local
evidence, without asserting a local mechanism I cannot document.

**One quantitative lead I could not pull:** the Texas Secretary of State publishes historical
**voter registration figures for Bastrop County** at
https://www.sos.state.tx.us/elections/historical/bastrop.shtml. Blocked here. If it reaches back
far enough it is the single best chart on the whole site — registration collapsing after 1902 and
recovering after 1944/1965.

---

## 4. RESEARCH GAPS — what I could not verify, and exactly how to close each one

**4.1 — Bastrop County's actual 1856 result.** *Need:* an 1856 county canvass return or a Texas
county-returns table for 1856. *Where:* the Texas Almanac's *Political History of Texas* county
tables (texasalmanac.com); the Portal to Texas History (texashistory.unt.edu) for the county
canvass book or a contemporaneous newspaper; the Bastrop County Clerk. *Interim phrasing if
unresolved:* "The Handbook of Texas records that a majority of the county's voters chose the
new Republican Party's John C. Frémont in 1856. Frémont, however, was not on the Texas ballot and
received no votes in the state; the county's anti-Democratic majority that year would have gone to
Millard Fillmore of the American Party. What is not in doubt is the pattern: Whig in 1848 and 1852,
against the Democrats in 1856, Constitutional Union in 1860, and against secession in 1861."

**4.2 — Bastrop County 1980.** *Need:* one confirmation of Carter 4,716 / Reagan 3,768 / 8,748.
*Where:* Wikipedia's "1980 United States presidential election in Texas" county table (unblocked
machine); Dave Leip's Atlas (uselectionatlas.org, county datagraph for FIPS 48021); Texas Almanac
1981–82 edition. *Highest-value single verification in this brief.*

**4.3 — County percentages for 2000, 2004, 2008, 2012, and totals for 2016.** *Need:* county-level
returns. *Where, in order of ease:* (a) **MIT Election Data + Science Lab, "County Presidential
Election Returns 2000–2020,"** on Harvard Dataverse — a single CSV covering 2000, 2004, 2008,
2012, 2016, 2020 for FIPS 48021, and it would close this entire gap in one download; (b) the
county's own archive at bastropvotes.org (results back to ~2006); (c) texascounties.net's
per-year tables; (d) Texas SoS canvass, 1992–. **Do not interpolate. Do not let a chart draw a
line through 2008 and 2012.**

**4.4 — Commissioners court partisan composition, and when it first had a Republican majority.**
*Need:* general-election results for all four commissioner precincts across roughly 2002–2024,
plus the county judge. *Where:* Ballotpedia's per-year "Bastrop County, Texas, elections" pages,
the county canvass archive, or the county's own commissioners pages (bastropcounty.gov). **I
could not establish this and you should not assert it.** Specifically unresolved: the 2022 Pct. 4
outcome (Cheryl Renee' Reese (D) vs. David Glass (R)).

**4.5 — Morgan C. Hamilton's Bastrop seat.** *Need:* the delegate list in the 1868–69 convention
journal. *Where:* the Tarlton Law Library PDF cited in §3.3 — a primary document, freely available,
just unreachable from here. Confirm both Hamilton (Bastrop) and Schuetze (Fayette & Bastrop)
before printing.

**4.6 — The name of the county GOP chair before Curtis Courtney.** Search returned only the first
name "Mike," and one synthesis offered a surname that was visibly a byline artifact. **Do not
print a surname.** *Where:* bastropctygop.com's own archives, or the Republican Party of Texas
county-chair roster (a version exists at
https://law.osu.edu/electionlaw/litigation/documents/AppendixBRepublicanPartyCountyChairmen.pdf).

**4.7 — Bastrop-County-specific disfranchisement mechanics.** *Need:* local poll-tax receipt
counts, county Democratic executive committee minutes, or contemporaneous newspapers.
*Where:* Portal to Texas History newspaper collection (*Bastrop Advertiser*), the Bastrop County
Historical Society, the county clerk's records.

**4.8 — Chapter 1 colonization facts.** Not checked this session (§1.17). Low risk, but unverified.

**4.9 — The Chapter 6 pull-quote.** Verify the exact sentence or paraphrase it (§1.8).

---

## 5. FRAMING NOTES

### 5.1 — "Came all the way back": no, and here is precisely why

You asked me directly whether the hero's "came all the way back" is defensible. **It is not, on
three independent grounds — and any one of them alone would be enough to sink it.**

**Ground one: the 1856 premise is factually wrong.** The county did not vote for the Republican
Party's first nominee, because it could not (§1.1). Whatever else survives the rewrite, the
sentence "voted for the party's *first* presidential nominee in 1856" has to go. It is the
foundation the arc is built on and it will not hold weight.

**Ground two: the "there" it is supposedly returning to never existed as a Republican place.**
Even granting the Handbook's sentence at face value, Bastrop County in 1856 was a **slaveholding
county with a cotton economy** whose anti-Democratic majority was a **Whig-Unionist** bloc — men
voting to hold the Union together and to keep the sectional agitators of both parties at bay.
Three months after backing Bell, they voted against secession 352–335 (§3.4) — and then armed
companies for the Confederacy anyway. That is a Unionist county, not a Republican one. There is no
1856 Republican Bastrop County for 2024 to come back to.

**Ground three — the one that actually matters: the county's real Republican electorate did not
leave, and it did not come back. It was destroyed, and it was Black.**

This is the heart of it. From 1869 to about 1890, Bastrop County had a genuine mass Republican
electorate: freedmen registered by a board that included Jeremiah J. Hamilton (§3.2), voting for a
party that sent Hamilton to the Twelfth Legislature and Morgan C. Hamilton to the constitutional
convention (§3.3), and electing their own justice of the peace and constable at Cedar Creek in
1888 (§1.10). That electorate did not become disillusioned, migrate to the Democrats, or fade with
changing times. **Four men were killed outside Justice Wicks's court on June 13, 1889; Wicks and
Wilson were arrested and charged with murder; Cal Thompson was shot dead on the Cedar Creek road
ten months later; Black residents were killed or driven out; and Cedar Creek went from 600 people
to 250 (§3.1).** The poll tax and the white primary arrived thirteen years later to formalize a
result that violence had already delivered.

**The modern Republican majority is not the descendant of that electorate.** It is a different
coalition — overwhelmingly white, substantially arrived from somewhere else (77–97% of recent
growth is in-migration, §1.16), voting Republican for reasons that have nothing to do with
Reconstruction. Calling that "coming all the way back" doesn't just flatten the story; it
retroactively hands the modern coalition an inheritance from people whose political rights were
taken from them by force, by the ancestors of the community that coalition now belongs to. That is
not a charge against anyone living. It is simply the reason the metaphor fails.

**How to fix it without losing the drama.** Don't tell a circle story; tell a **three-parties**
story. Same name, three different bodies of people, and the transitions between them are the
history:

> The Republican Party has carried Bastrop County three separate times, and it was a different
> party each time. In the 1870s and 1880s it was the party of freedmen at Cedar Creek — and it was
> destroyed by violence and then by law. In 1972 and 1984 it was a landslide-year visitor that
> never stayed. Since 2000 it has been the county's governing majority, built on a population that
> has more than doubled since 1990. One name, three parties, a hundred and sixty years.

That is more interesting than "came all the way back," it is defensible line by line, and it does
not require you to soften anything about the modern county party. Concretely, for the hero: replace
"and then came all the way back" with something like **"—and is now one of the most reliably
Republican counties in Central Texas."** Same landing, no false claim of continuity.

### 5.2 — Separate the party label from the party, in the page's structure

Your persona brief demands this and the site currently doesn't do it. The cheapest structural fix:
put a short standing note — a single line under the Chapter 2 and Chapter 3 headers, or one
sidebar — saying plainly that the Republican Party of 1856, of 1872, and of 2024 are different
coalitions wearing the same name, and that the page is tracking a *name across time*, not a
continuous organization. **Saying this out loud costs you one sentence and buys the entire page its
credibility.** Without it, every strong claim reads as advocacy; with it, the reader trusts you and
the Reconstruction chapters land much harder.

### 5.3 — Chapter 5 ("The Turn," 1972) is the second-biggest problem

It is not a turn. The county voted Democratic in 1976, 1980, and 1988, and gave Clinton pluralities
in 1992 and 1996 (§2). The chapter's own text — "Nothing about it was instant. The turn ran on the
slow clock of rural Texas" — is doing the work of covering a gap you couldn't source, and the
sources now show the gap was pointing the other way.

**Recommended restructure:** rename it something like **"The False Dawn"** or **"Two Landslides
and a Long Wait,"** and let it carry the real finding: Nixon 1972 and Reagan 1984 were
national-landslide visits, the county went home each time, and the *actual* flip is 2000 — with
Perot in 1992–96 as the visible hinge, splitting the anti-Democratic vote and letting Clinton win
twice with pluralities on the way there. Then Chapter 6 ("Bush Country") stops being a continuation
and becomes **the payoff**, which is a much better chapter. And the 1972→2000 stretch stops being
an embarrassing hole in the chart and becomes the most interesting stretch on it.

### 5.4 — Chapter 3 currently ends on a triumph that was undone within eighteen months

Ending at "Weeks and Wilson, May 1888" and cutting to "Then the door closed" (Ch. 4) implies the
door closed through some impersonal process. It closed at a specific place on a specific day
(§3.1). Add a fifth timeline entry — **June 13, 1889** — and a sixth — **April 21, 1890** — and
Chapter 4's "Then the door closed" acquires a subject and a verb. The tl-dark item currently
reading "Racial confrontations flared around the community of Cedar Creek" is the single vaguest
sentence on the page, and it is vague about the most important thing that happened in it.

Your persona standard is the right one here: *"Bastrop County's Republican story includes freedmen
voting at Cedar Creek and it includes the violent collapse of that coalition; a brief that omits
either is a worse brief."* The same is true of the site. And note — this is not a concession that
weakens the page. A history that tells the whole Cedar Creek story is one that a hostile reader
cannot dismiss, and the county is itself putting up a marker to Jeremiah J. Hamilton in 2025
(§3.2). You would be writing with the grain of what Bastrop County is currently doing, not against
it.

### 5.5 — Two smaller framing notes

**The German Unionist strand is missing.** Julius Schuetze's presence as a Bastrop/Fayette delegate
(§3.3) points at it: Central Texas German communities were a distinct Unionist and often
Republican-voting bloc, independent of the Black electorate. The site's Reconstruction chapter
presents the county's Republican coalition as entirely Black. It was mostly Black, but not only,
and the two-part coalition — freedmen plus German Unionists — is both more accurate and more
interesting. I did not research this deeply; flagging it as a thread worth pulling.

**"A Republican voter in Bastrop County in 1930…"** (Chapter 4). Lovely line, but it lands
strangely once the page tells the Cedar Creek story: in 1930 a great many of the county's would-be
Republican voters were not failing to remember a Republican victory — they were barred from voting
at all by the poll tax and the white primary (§3.9). Consider redirecting the line to carry that
weight instead. It is a better sentence if the reason for the silence is named.

---

## 6. IF YOU ONLY DO SIX THINGS

1. **Kill the Frémont claim** in the hero, the pullquote, and the ballot card (§1.1). Replace the
   chapter's anchor with the **352–335 secession vote** (§3.4) and the **1848/1852 Whig** pattern
   (§3.5).
2. **Add the 1976–1996 Democratic years** from the Handbook (§2) and **rename Chapter 5**. This
   turns your worst gap into your best chapter (§5.3).
3. **Finish the Cedar Creek story** — June 13, 1889 and April 21, 1890 and 600→250 (§3.1, §5.4).
4. **Name Jeremiah J. Hamilton** (§3.2) and **Morgan C. Hamilton** (§3.3). The Reconstruction
   chapter currently has no Republicans in it by name.
5. **Fix the three number problems:** the "52 legislators" framing (§1.11), the 97.25% period
   mismatch (§1.16), and the stale 102,370 population headline (§1.16). And **blocklist Homefacts**
   (§1.15).
6. **Replace "came all the way back"** with the three-parties framing (§5.1), and add the
   one-sentence label-vs-party note (§5.2).
