# ACR Builder

**Write an accessibility conformance report you can actually defend.**
Free, MIT, runs entirely in your browser. No account, no upload, no analytics, works offline.

---

## What this is

Your enterprise customer's procurement team asked for a VPAT® or an Accessibility
Conformance Report. The official template is free and blank. A consultancy will fill it
in for $1,850–$3,100.

This walks you through all **50 WCAG 2.1 Level A and AA success criteria** — the set
referenced by **EN 301 549 Chapter 9**, the harmonised standard behind the European
Accessibility Act — and exports a clean report as HTML or Markdown.

**[→ Open the builder](https://henriqueyuri00.github.io/acr-builder/)** · or download
[`acr-builder.html`](dist/acr-builder.html) and open it from your filesystem.

## Why another one

Most tools in this space will happily generate a beautiful report full of "Supports"
that you cannot back up. This one argues with you:

- Mark a criterion **Does Not Support** or **Partially Supports** with no explanation and
  it blocks you. Reviewers read the remarks column far more carefully than the level.
- Mark something **Not Applicable** that always applies to a web product and it says so.
  N/A means the criterion *cannot* apply — not that you haven't built the feature yet.
- Fill in all fifty as **Supports** and it warns you that experienced reviewers read a
  clean sweep as a sign the testing never happened.

An honest "Partially Supports — the date picker isn't keyboard operable, fix shipping
2026-10-15" closes more deals than a suspicious wall of green.

## What it is not

**Not an overlay.** A script tag cannot make a keyboard trap operable, cannot give a
custom combobox a role, and cannot write your report. Overlays do not produce conformance
with WCAG or EN 301 549 and buyers' accessibility teams increasingly treat them as a
negative signal.

**Not a scanner.** It records judgements; it does not make them. Run axe or Lighthouse
first — and note that axe prints its own disclaimer on every run: *"only 20% to 50% of
all accessibility issues can automatically be detected."*

**Not legal advice.** Whether you're in scope of the EAA, and what your member state
requires, is a question for a lawyer.

## You might not even need this

The EAA binds service providers with **more than 10 employees or more than €2 million
turnover**. A four-person SaaS under €2m very likely isn't in scope as a service provider.

But an exemption from the regulation is not an exemption from your customer's procurement
questionnaire — that's contract law, and no exemption touches it. Roughly three-quarters
of organisations now require proof of accessibility for most purchases.

## Privacy

Everything stays in your browser. State persists to `localStorage`; export a JSON working
file to move between machines or check it into your repo alongside the report. There is
no server, no telemetry, and no network request of any kind. The single-file build makes
this checkable — open it in devtools and watch the network tab stay empty.

## Project layout

```
index.html           the builder
criteria.js          the 50 criteria, with a runtime guard asserting 30 A / 20 AA
dist/acr-builder.html  single-file build, no external requests
build.js             inlines and verifies the build
sprint/              landing page for the paid companion kit
(kit/ is intentionally not published here)
```

## Verification

The criteria set is asserted programmatically, because a compliance tool with a wrong
criteria list is worse than no tool. Three separate automated fetches of the WCAG 2.1
spec each returned an incomplete or mislevelled list — 2.5.1–2.5.4 dropped, or 2.2.3 /
2.5.5 misreported as AA when they are AAA — so the set is pinned and guarded:

```js
if (_A !== 30 || _AA !== 20) throw new Error('Criteria set corrupt');
```

Both pages report **zero axe violations** (axe-core 4.12.1, tags `wcag2a wcag2aa wcag21a
wcag21aa`), verified in **both light and dark schemes**, with contrast measured
independently across every distinct text element.

That dual-scheme check exists because a single-scheme run missed a real bug here: a theme
override at specificity (0,3,0) outranked a component modifier at (0,2,0) and painted
secondary buttons at **1.04:1** in dark mode only. axe reported the page clean in light
and found two violations in dark, in the same second.

```bash
npm install
node build.js                                     # build + verify
npx axe http://localhost:8811/index.html \
  --tags wcag2a,wcag2aa,wcag21a,wcag21aa          # scan
```

## The paid companion

The builder asks fifty questions. If you don't know how to answer them,
[**The Conformance Sprint**](sprint/) is a three-day testing protocol — automated sweep,
keyboard and screen reader passes, then writing it down — plus fill-in templates for the
evidence log, remediation roadmap, EAA Annex V accessibility statement and the eight
procurement questions that come back every time. $49, one-time.

The builder is complete without it. No crippled features, no upsell wall.

## Licence

MIT for the builder and the criteria data.

VPAT® is a registered service mark of the Information Technology Industry Council. This
project is not affiliated with, endorsed by, or certified by ITI, and does not reproduce
or modify their template — it produces an Accessibility Conformance Report from the
underlying WCAG 2.1 success criteria. WCAG is a W3C Recommendation.
