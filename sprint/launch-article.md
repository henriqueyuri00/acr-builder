---
title: "Your axe run is green and your dark mode has 1.04:1 contrast"
published: false
description: "A single axe run only tests the colour scheme the browser happens to be in. Here's the specificity bug that hid behind a green check, and a CI setup that catches it."
tags: accessibility, css, testing, webdev
---

I shipped a page that reported **zero axe violations**. It had button text at a contrast
ratio of **1.04:1** — which is, for practical purposes, invisible text.

The scan wasn't broken. It was answering a narrower question than I thought I was asking.

## The bug

I had a theme system built the ordinary way. Tokens on `:root`, overridden in a
`prefers-color-scheme` media query, and overridden again by an explicit `[data-theme]`
attribute so a manual toggle wins in both directions.

Buttons came in two flavours: a solid primary and a bordered secondary.

```css
.btn      { background: var(--accent); color: var(--panel); }
.btn.sec  { background: transparent;   color: var(--ink);   }
```

In dark mode the accent goes light green, so white-on-accent stops working. I patched it
the way you patch things at 1am:

```css
:root[data-theme=dark] .btn { color: #10241b }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme=light]) .btn { color: #10241b }
}
```

Now count the specificity.

| Selector | Specificity |
|---|---|
| `.btn.sec` | **0,2,0** |
| `:root[data-theme=dark] .btn` | **0,3,0** |
| `:root:not([data-theme=light]) .btn` | **0,3,0** |

`:not()` doesn't add specificity of its own, but its *argument* does. So
`:root` (0,1,0) + `[data-theme=light]` (0,1,0) + `.btn` (0,1,0) lands at 0,3,0.

My theme patch outranks the component modifier. In dark mode, every **secondary** button
— transparent background, sitting on a `#1a1c1f` panel — got painted `#10241b`.
Dark green on near-black. **1.04:1.**

The nasty part is that this class of bug is invisible in review. The rule looks correct.
It *is* correct, for the buttons it was written for. It just also matched buttons it was
never meant to touch, in one theme only.

## Why the scan didn't catch it

axe-core evaluates the DOM **as currently rendered**. It reads computed styles, and
computed styles resolve exactly one colour scheme: whichever one the browser is in right
now.

So `npx axe https://example.com` is not "does this page pass contrast." It's "does this
page pass contrast *in the scheme this headless browser happened to boot in*." If your
CI runs light and your bug is dark, you get a green check that means nothing.

I didn't want to take my own word for this, so I re-introduced the bug and ran axe
against the same page twice, changing only the theme:

```js
const runIn = async theme => {
  document.documentElement.setAttribute('data-theme', theme);
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const { violations } = await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] }
  });
  return violations;
};
```

Same page. Same axe 4.12.1. Same second.

```
light → 0 violations
dark  → 2 violations
        color-contrast 1.13 (#10241b on #131416)
        color-contrast 1.04 (#10241b on #1a1c1f)
```

One run says ship it. The other says two elements are unreadable.

## The fix, and the better fix

The immediate fix is to stop overriding the colour and start **swapping the token**. The
override created a specificity contest; a token has none to win.

```css
:root                            { --accent:#1c5d3f; --on-accent:#fff;    }
@media (prefers-color-scheme:dark){ :root:not([data-theme=light]) {
                                   --accent:#6cc49a; --on-accent:#10241b; } }
:root[data-theme=dark]           { --accent:#6cc49a; --on-accent:#10241b; }

.btn     { background: var(--accent); color: var(--on-accent); }
.btn.sec { background: transparent;   color: var(--ink);       }
```

`.btn.sec` now wins cleanly, in every theme, because nothing is competing with it. The
general rule: **let themes change values, not selectors.** The moment a theme block
starts naming components, you've entered a specificity war you will eventually lose in
exactly one of your themes.

## Testing both schemes in CI

`page.emulateMedia()` is the piece most setups are missing:

```js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES  = ['/', '/pricing', '/app/dashboard'];
const SCHEMES = ['light', 'dark'];

for (const colorScheme of SCHEMES) {
  for (const route of ROUTES) {
    test(`a11y ${colorScheme} ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(violations).toEqual([]);
    });
  }
}
```

Two caveats worth knowing, because they bit me:

**`emulateMedia` only drives `prefers-color-scheme`.** If you also ship a manual toggle
that writes `data-theme` or a class, that path is a *different* code path and needs its
own case. Set the attribute explicitly before analysing.

**Analyse states, not just routes.** Contrast bugs love disabled buttons, validation
errors, toasts, empty states and open modals — none of which exist in the DOM when the
page first loads. Open the thing, then scan.

## The wider point

Automated accessibility testing is worth doing and it is worth being clear-eyed about.
The axe CLI prints its own disclaimer every run:

> *"only 20% to 50% of all accessibility issues can automatically be detected. Manual
> testing is always required."*

I'd add a corollary from this bug: within that 20–50%, a scan only covers the *rendered
state you gave it*. Every scheme, every breakpoint, every interaction state you don't
render is a state you didn't test. A green check is evidence about one configuration,
not a certificate.

---

*I found this while building [ACR Builder](https://henriqueyuri00.github.io/acr-builder/)
— a free, offline, client-side tool that walks the 50 WCAG 2.1 A/AA success criteria and
exports a conformance report, for teams whose enterprise customers have started asking for
accessibility documentation. Auditing it against itself turned up five real defects, this
being the most embarrassing. MIT licensed, no signup, nothing leaves your browser.
[Source](https://github.com/henriqueyuri00/acr-builder).*
