---
title: "A customer asked for our VPAT. Here's what that actually means"
published: false
description: "What procurement is really asking for when they request a VPAT or accessibility conformance report, what it costs, and how to produce an honest one without a consultancy."
tags: accessibility, webdev, startup, saas
---

A prospect's procurement team sends over a security-and-compliance questionnaire. Most of
it you can answer. Then there's a line that says:

> *Please provide your VPAT or Accessibility Conformance Report.*

If your reaction is "our what?", this is for you. It was mine too.

## What is actually being asked

**VPAT®** is a template — the Voluntary Product Accessibility Template, maintained by the
Information Technology Industry Council. Fill it in and the completed document is called
an **ACR**, an Accessibility Conformance Report.

The document is a table. One row per accessibility success criterion, and for each row you
declare one of four things:

| Level | Means |
|---|---|
| **Supports** | You tested it and found no defects in scope |
| **Partially Supports** | Met in most of the product, with at least one known defect |
| **Does Not Support** | The majority of the relevant functionality fails |
| **Not Applicable** | The criterion genuinely cannot apply to this product |

Plus a **Remarks** column, which is the part that actually matters. More on that below.

Which criteria? Depends on the edition. The three common ones:

- **WCAG edition** — the 50 WCAG 2.1 Level A and AA success criteria.
- **Section 508 edition** — for selling to US federal agencies.
- **EU edition** — maps to **EN 301 549**, the harmonised European standard, whose
  Chapter 9 incorporates WCAG 2.1 Level AA in full.

For a web application sold internationally, the WCAG/EU editions cover the substance,
because all three rest on the same 50 criteria.

## Why you're suddenly being asked

Two things converged.

**Procurement made it standard.** Per the Seventh Annual State of Digital Accessibility
Report, around three-quarters of organisations now require proof of accessibility for most
digital purchases, and roughly a third require it for every purchase. Your buyer isn't
being difficult — someone in their organisation made it a gate.

**The European Accessibility Act became enforceable.** Enforcement started in June 2025,
and 2026 is the first full year national authorities are actively supervising. Buyers in
the EU manage that risk the way buyers always do: by pushing requirements down the supply
chain, into contracts with vendors like you.

## You might not be in scope, and that changes nothing

Worth knowing, because most vendors selling into this space will not tell you: the EAA
binds service providers with **more than 10 employees or more than €2 million turnover**.
A four-person SaaS under €2m very likely isn't in scope as a service provider.

And it doesn't help you at all, because **an exemption from the regulation is not an
exemption from your customer's questionnaire**. The buyer asking for your ACR isn't
enforcing the EAA against you. They're managing their own obligation through a contract.
That's contract law, and no exemption touches it.

If a deal is blocked, it's blocked either way.

## What it costs to get one

- The ITI template itself: **free**. It's a blank document you can download today.
- A consultancy to run the audit and complete it: commonly **$1,850–$3,100** for a small
  product — roughly $350 for completing the report on top of $1,500–$2,750 for the audit.
- Doing it yourself: a few days of someone's time, and the discipline to be honest.

The expensive part was never the paperwork. It's knowing whether you actually conform.

## The thing everyone gets wrong

The instinct is to make the report look good. Fifty rows of *Supports*, ship it, close the
deal.

That instinct is exactly backwards, for a reason worth internalising: **experienced
reviewers read the Remarks column far more carefully than the conformance level.** A clean
sweep across an entire real product is rare enough that it reads as evidence the testing
never happened. It invites the follow-up question you cannot answer.

Compare:

> ❌ *Supports. "Mostly compliant, we follow best practices."*

> ✅ *Partially Supports. "Tested across sign-up, dashboard and billing with NVDA 2025.1 +
> Firefox. All native controls expose correct name, role and state. Two defects: the
> saved-view combobox does not expose `aria-expanded`, and the plan toggle does not expose
> a checked state. Tracked as ACME-4471/4472, remediation targeted 2026-10-15."*

The second one takes four minutes to write and is the difference between a report that
closes a deal and one that generates a call you'll lose. It says: we tested, we know where
we stand, we have a plan. That is what procurement is buying.

Also worth knowing: a missing **or inaccurate** accessibility statement is separately
punishable in some member states — France provides for fines up to €25,000 per year. An
inflated report isn't just a bad look; it's exposure.

## Two things to say no to

**Overlays.** If a vendor promises conformance from a script tag, walk. Overlays do not
produce conformance with WCAG or EN 301 549, they've drawn litigation of their own, and
buyers' accessibility teams increasingly treat their presence as a *negative* signal in
exactly the procurement review you're trying to pass.

**A green automated scan as your evidence.** Run axe or Lighthouse — you should. But axe
prints its own disclaimer on every run: *"only 20% to 50% of all accessibility issues can
automatically be detected. Manual testing is always required."* The criteria that fail most
in real audits (info and relationships, name/role/value, focus visibility, keyboard
operation) are precisely the ones a scanner cannot judge. A methods section listing only
automated tooling will be read as untested.

## The honest minimum

If you want to produce a defensible report yourself:

1. **Scope it in writing.** List the flows in scope and the ones out, with a reason for
   each exclusion. Anything a customer touches is in scope.
2. **Automated sweep.** axe across representative pages — and on *states*, not just
   routes: open the modal, trigger the validation error, then scan.
3. **Keyboard-only pass.** Put the mouse away and complete every primary flow. This alone
   finds the most serious defects you have.
4. **One screen reader session.** NVDA + Firefox, or VoiceOver + Safari. You need about
   six commands, not fluency.
5. **Zoom and reflow.** 200% zoom, and 320 CSS pixels wide.
6. **Write it down** — including a dated evidence log of what was tested, on what, by
   whom. A conformance claim you cannot reconstruct is one you cannot defend.

Then answer the fifty rows honestly, and give every non-conforming one a real remark and a
real date.

---

*I built a free tool for step 6: [ACR Builder](https://henriqueyuri00.github.io/acr-builder/)
walks the 50 WCAG 2.1 A/AA criteria and exports the report. It deliberately blocks you from
filing a non-conforming criterion without an explanation, and warns you when all fifty come
out as Supports. Runs entirely in your browser — no account, no upload, nothing leaves your
machine. MIT licensed. Not legal advice; whether you're in scope of any of this is a
question for a lawyer.*
