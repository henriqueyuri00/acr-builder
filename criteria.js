/*!
 * WCAG 2.1 Level A + AA success criteria (50 total: 30 A, 20 AA).
 * This is the normative set referenced by EN 301 549 Chapter 9, which is the
 * harmonised standard used to claim conformance under the European
 * Accessibility Act (EAA).
 *
 * Field guide:
 *   what  - plain-English meaning, no standards-speak
 *   ask   - what a procurement reviewer is actually checking when they read
 *           your conformance report against this row
 *   fail  - the way real web applications most commonly break it
 *   na    - the only circumstances under which "Not Applicable" is honest
 *           (null = it essentially always applies to a web app)
 *
 * Licence: MIT. Not legal advice.
 */

const CRITERIA = [
  /* ---------------------------------------------------------------- 1. Perceivable */
  {
    id: "1.1.1", name: "Non-text Content", level: "A", principle: "Perceivable",
    what: "Every image, icon, chart and control that isn't text needs a text alternative that serves the same purpose.",
    ask: "Do screen reader users get the same information from your UI as sighted users?",
    fail: "Icon-only buttons (a bare <svg> inside a <button>) with no accessible name. Decorative images given descriptive alt text instead of alt=\"\", which adds noise rather than removing it.",
    na: null
  },
  {
    id: "1.2.1", name: "Audio-only and Video-only (Prerecorded)", level: "A", principle: "Perceivable",
    what: "Prerecorded audio-only content needs a transcript; prerecorded video-only content needs a transcript or audio description.",
    ask: "Is there a text equivalent for media that carries information in only one sensory channel?",
    fail: "A silent product demo GIF or looping background video that demonstrates a workflow, with nothing describing what it shows.",
    na: "You publish no prerecorded audio-only or video-only content anywhere in the product."
  },
  {
    id: "1.2.2", name: "Captions (Prerecorded)", level: "A", principle: "Perceivable",
    what: "Prerecorded video with sound needs synchronised captions.",
    ask: "Can a deaf user follow your onboarding and help videos?",
    fail: "Relying on YouTube's auto-generated captions. Auto-captions are not accurate enough to count as conformant; they need review.",
    na: "The product contains no prerecorded video with an audio track."
  },
  {
    id: "1.2.3", name: "Audio Description or Media Alternative (Prerecorded)", level: "A", principle: "Perceivable",
    what: "Prerecorded video needs either an audio description of the important visuals, or a full text alternative.",
    ask: "Does a blind user get the visual information your videos convey?",
    fail: "A screencast where the narrator says \"just click here and then here\" — the words carry none of the meaning without the picture.",
    na: "The product contains no prerecorded video with an audio track."
  },
  {
    id: "1.3.1", name: "Info and Relationships", level: "A", principle: "Perceivable",
    what: "Structure conveyed visually (headings, lists, tables, form labels, groupings) must also exist in the markup.",
    ask: "Is your visual hierarchy real, or is it just CSS?",
    fail: "Styling a <div> to look like a heading. Building a data table out of flexbox divs. Placeholder text used instead of a real <label>. This is one of the most frequently cited criteria in audits.",
    na: null
  },
  {
    id: "1.3.2", name: "Meaningful Sequence", level: "A", principle: "Perceivable",
    what: "When reading order matters, the DOM order must match the order the content is meant to be read in.",
    ask: "Does the content still make sense when the CSS is switched off?",
    fail: "Using CSS order, grid-area or position to visually reorder content while leaving the DOM in a different sequence.",
    na: null
  },
  {
    id: "1.3.3", name: "Sensory Characteristics", level: "A", principle: "Perceivable",
    what: "Instructions must not rely only on shape, colour, size, position or sound.",
    ask: "Would the instruction still work read aloud, with no visual reference?",
    fail: "\"Click the green button on the right\" or \"see the box below\" with no other identifying label.",
    na: null
  },
  {
    id: "1.4.1", name: "Use of Color", level: "A", principle: "Perceivable",
    what: "Colour must never be the only way information is conveyed.",
    ask: "Can a colourblind user tell your states apart?",
    fail: "Form validation that only turns a field border red. Chart series distinguished purely by colour with no direct labels, patterns or markers. Status dots with no text.",
    na: null
  },
  {
    id: "1.4.2", name: "Audio Control", level: "A", principle: "Perceivable",
    what: "Any audio that plays automatically for more than 3 seconds needs a way to pause, stop or mute it.",
    ask: "Can a screen reader user silence your page so they can hear their own screen reader?",
    fail: "Autoplaying a video with sound on the marketing page or in an embedded player.",
    na: "No audio plays automatically anywhere."
  },
  {
    id: "1.2.4", name: "Captions (Live)", level: "AA", principle: "Perceivable",
    what: "Live audio content in synchronised media needs real-time captions.",
    ask: "Are your webinars and live streams captioned as they happen?",
    fail: "Running live product webinars or in-app video calls with no live captioning option.",
    na: "You broadcast no live synchronised media."
  },
  {
    id: "1.2.5", name: "Audio Description (Prerecorded)", level: "AA", principle: "Perceivable",
    what: "Prerecorded video needs an actual audio description track (at AA the text-alternative escape hatch from 1.2.3 is gone).",
    ask: "Is there a described audio track, not just a transcript?",
    fail: "Assuming the transcript that satisfied 1.2.3 also satisfies this. At AA it does not.",
    na: "The product contains no prerecorded video with an audio track."
  },
  {
    id: "1.3.4", name: "Orientation", level: "AA", principle: "Perceivable",
    what: "Don't lock content to portrait or landscape unless the orientation is essential.",
    ask: "Does your app work rotated, for a user whose device is mounted to a wheelchair?",
    fail: "A mobile web view that shows \"please rotate your device\" instead of reflowing.",
    na: null
  },
  {
    id: "1.3.5", name: "Identify Input Purpose", level: "AA", principle: "Perceivable",
    what: "Inputs collecting information about the user need a programmatic autocomplete purpose.",
    ask: "Can the browser and assistive tech autofill your forms correctly?",
    fail: "Sign-up and billing forms with no autocomplete attributes, or with autocomplete=\"off\" applied wholesale.",
    na: null
  },
  {
    id: "1.4.3", name: "Contrast (Minimum)", level: "AA", principle: "Perceivable",
    what: "Text needs 4.5:1 contrast against its background; large text (18.66px bold or 24px) needs 3:1.",
    ask: "Is your text readable in low vision, poor light, or on a cheap monitor?",
    fail: "Grey placeholder and helper text. Light-grey-on-white secondary labels. White text on brand-colour buttons where the brand colour is mid-tone. Disabled controls are exempt, but 'disabled-looking' styling on enabled controls is not.",
    na: null
  },
  {
    id: "1.4.4", name: "Resize Text", level: "AA", principle: "Perceivable",
    what: "Text must stay readable and functional when zoomed to 200% without assistive technology.",
    ask: "Does your layout survive a browser zoom to 200%?",
    fail: "Fixed-height containers with overflow:hidden that clip text once it grows. Text sized in px inside a fixed-px container.",
    na: null
  },
  {
    id: "1.4.5", name: "Images of Text", level: "AA", principle: "Perceivable",
    what: "Use real text rather than pictures of text, unless the presentation is essential or customisable.",
    ask: "Is any of your text baked into an image where it can't be resized or read aloud?",
    fail: "Marketing hero banners, pricing tables or feature comparison graphics exported from Figma as PNGs with the text inside.",
    na: null
  },
  {
    id: "1.4.10", name: "Reflow", level: "AA", principle: "Perceivable",
    what: "Content must reflow into a single column at 320 CSS pixels wide without two-dimensional scrolling.",
    ask: "Can a user at 400% zoom read your app without scrolling sideways on every line?",
    fail: "Wide data tables and dashboards with fixed min-widths. Side-by-side layouts that never collapse. Note: data tables are one of the few things allowed to scroll horizontally.",
    na: null
  },
  {
    id: "1.4.11", name: "Non-text Contrast", level: "AA", principle: "Perceivable",
    what: "UI component boundaries and meaningful graphics need 3:1 contrast against adjacent colours.",
    ask: "Can a low-vision user see where your input fields and buttons are?",
    fail: "Very light input borders (#e5e7eb on white is roughly 1.2:1 and fails). Low-contrast focus rings. Chart lines and icons in pale tints.",
    na: null
  },
  {
    id: "1.4.12", name: "Text Spacing", level: "AA", principle: "Perceivable",
    what: "No loss of content when users override line height to 1.5, paragraph spacing to 2x, letter spacing to 0.12em and word spacing to 0.16em.",
    ask: "Does your layout break when a dyslexic user applies their own spacing stylesheet?",
    fail: "Buttons and badges with fixed heights that clip their own labels once spacing increases.",
    na: null
  },
  {
    id: "1.4.13", name: "Content on Hover or Focus", level: "AA", principle: "Perceivable",
    what: "Content that appears on hover or focus must be dismissible (Escape), hoverable (you can move the pointer onto it) and persistent (it doesn't vanish on its own).",
    ask: "Can a user with a magnifier reach your tooltip content without it disappearing?",
    fail: "Tooltips that close on mouseleave of the trigger, so the pointer can never travel to the tooltip. Tooltips with no Escape handler. Custom tooltips are a much more common failure than the native title attribute.",
    na: null
  },

  /* ---------------------------------------------------------------- 2. Operable */
  {
    id: "2.1.1", name: "Keyboard", level: "A", principle: "Operable",
    what: "Everything must be operable from a keyboard alone.",
    ask: "Can someone who cannot use a mouse complete every task in your product?",
    fail: "Click handlers attached to <div> or <span> with no key handler, no tabindex and no role. Custom dropdowns, drag-and-drop and canvas interactions with no keyboard path.",
    na: null
  },
  {
    id: "2.1.2", name: "No Keyboard Trap", level: "A", principle: "Operable",
    what: "Keyboard focus must always be able to move away from any component.",
    ask: "Can a keyboard user get out of your modal?",
    fail: "Modals that trap focus correctly but provide no Escape key and no reachable close button. Third-party embeds (payment iframes, chat widgets) that swallow focus.",
    na: null
  },
  {
    id: "2.1.4", name: "Character Key Shortcuts", level: "A", principle: "Operable",
    what: "Single-character shortcuts must be switchable off, remappable, or active only on focus.",
    ask: "Does a speech-input user trigger your shortcuts by accident just by talking?",
    fail: "Adding single-key shortcuts (j/k navigation, 'c' to compose, '/' to search) globally with no way to disable them.",
    na: "The product implements no single-character key shortcuts."
  },
  {
    id: "2.2.1", name: "Timing Adjustable", level: "A", principle: "Operable",
    what: "Time limits must be adjustable, extendable, or turned off.",
    ask: "Does a user who reads slowly lose their work when the session expires?",
    fail: "Session timeouts that log the user out silently and discard unsaved form data with no warning and no extend option.",
    na: "The product enforces no time limits at all — check session expiry, OTP windows and auto-advancing content before claiming this."
  },
  {
    id: "2.2.2", name: "Pause, Stop, Hide", level: "A", principle: "Operable",
    what: "Moving, blinking or auto-updating content lasting more than 5 seconds needs a pause, stop or hide control.",
    ask: "Can a user with attention or vestibular difficulties stop your animation?",
    fail: "Auto-rotating carousels and testimonial sliders with no pause button. Infinitely animated background gradients. Live-updating dashboards with no freeze.",
    na: null
  },
  {
    id: "2.3.1", name: "Three Flashes or Below Threshold", level: "A", principle: "Operable",
    what: "Nothing may flash more than three times per second.",
    ask: "Could your UI trigger a seizure?",
    fail: "Rarely failed deliberately; check loading spinners, video content and any rapid strobe transitions.",
    na: null
  },
  {
    id: "2.4.1", name: "Bypass Blocks", level: "A", principle: "Operable",
    what: "Provide a way to skip repeated blocks of content, such as a skip link or proper landmarks.",
    ask: "Does a keyboard user have to tab through your whole nav on every page?",
    fail: "No skip link, and no <main> landmark. A skip link that exists but is permanently hidden with display:none never receives focus and does not count.",
    na: null
  },
  {
    id: "2.4.2", name: "Page Titled", level: "A", principle: "Operable",
    what: "Every page needs a descriptive, unique title.",
    ask: "Can a user with 20 tabs open tell which one is which?",
    fail: "Single-page apps that never update document.title on route change, leaving every view titled the same.",
    na: null
  },
  {
    id: "2.4.3", name: "Focus Order", level: "A", principle: "Operable",
    what: "Focus must move in an order that preserves meaning and operability.",
    ask: "Does tabbing through your page follow a sensible path?",
    fail: "Positive tabindex values (tabindex=\"3\") that hijack the order. Modals that open without moving focus into them, leaving the user tabbing through the page behind.",
    na: null
  },
  {
    id: "2.4.4", name: "Link Purpose (In Context)", level: "A", principle: "Operable",
    what: "The purpose of each link must be clear from its text, or from its text plus its immediate context.",
    ask: "Does your list of links make sense when read out on its own?",
    fail: "A page full of \"Read more\", \"Click here\" and \"Learn more\" links. Screen reader users often navigate by pulling up a list of all links, stripped of surrounding text.",
    na: null
  },
  {
    id: "2.5.1", name: "Pointer Gestures", level: "A", principle: "Operable",
    what: "Multipoint or path-based gestures need a single-pointer alternative.",
    ask: "Can a user who can only tap use your swipe and pinch features?",
    fail: "Swipe-to-delete, pinch-to-zoom on a map, or a drag-only slider with no button or input alternative.",
    na: "The product uses no multipoint or path-based gestures."
  },
  {
    id: "2.5.2", name: "Pointer Cancellation", level: "A", principle: "Operable",
    what: "Actions must not fire on down-event alone; users need to be able to abort by moving away before releasing.",
    ask: "If a user presses the wrong button, can they slide off it to cancel?",
    fail: "Wiring destructive actions to onMouseDown or onTouchStart instead of onClick.",
    na: null
  },
  {
    id: "2.5.3", name: "Label in Name", level: "A", principle: "Operable",
    what: "A control's accessible name must contain the visible label text.",
    ask: "Can a speech-input user say what they see and have it work?",
    fail: "A button reading \"Save\" given aria-label=\"Submit form\". The visible word is now absent from the accessible name, so \"click Save\" fails. aria-label silently overrides visible text — this is the single most common way well-intentioned ARIA breaks things.",
    na: null
  },
  {
    id: "2.5.4", name: "Motion Actuation", level: "A", principle: "Operable",
    what: "Functions triggered by device motion must also work through the UI, and motion actuation must be disableable.",
    ask: "Can a user with tremor avoid triggering actions by accident?",
    fail: "Shake-to-undo or tilt-to-navigate with no button equivalent.",
    na: "The product responds to no device motion or user motion."
  },
  {
    id: "2.4.5", name: "Multiple Ways", level: "AA", principle: "Operable",
    what: "Offer more than one way to locate a page within a set of pages.",
    ask: "Is there a search, sitemap or index — not just the nav?",
    fail: "Documentation and marketing sites with navigation only and no search or sitemap.",
    na: "Applies to sets of pages; a step in a process is exempt."
  },
  {
    id: "2.4.6", name: "Headings and Labels", level: "AA", principle: "Operable",
    what: "Headings and labels must describe the topic or purpose.",
    ask: "Are your headings informative, or decorative?",
    fail: "Generic headings like \"Section\" or \"More\". Form labels that say \"Name\" on a page with four different name fields.",
    na: null
  },
  {
    id: "2.4.7", name: "Focus Visible", level: "AA", principle: "Operable",
    what: "Keyboard focus must always be visible.",
    ask: "Can a keyboard user see where they are?",
    fail: "The single most common deliberate accessibility failure on the web: a global *:focus { outline: none } to make the design look tidy. Use :focus-visible instead of removing the indicator.",
    na: null
  },
  {
    id: "2.4.11", name: "Focus Not Obscured (Minimum)", level: "AA", principle: "Operable", wcag: ["2.2"],
    what: "When an element receives keyboard focus, it must not be entirely hidden by content the author added.",
    ask: "Can a keyboard user still see the thing they just tabbed to?",
    fail: "Sticky headers and footers that cover the focused control as you tab down the page. Cookie banners and chat widgets parked over the bottom of the viewport. The element still has focus — you just can't see it.",
    na: null
  },
  {
    id: "2.5.7", name: "Dragging Movements", level: "AA", principle: "Operable", wcag: ["2.2"],
    what: "Anything operated by dragging must also work with a single pointer without dragging, unless dragging is essential.",
    ask: "Can someone who cannot drag still reorder your list?",
    fail: "Kanban boards, reorderable lists and range sliders built drag-only. The fix is usually a pair of move buttons or a number input, not a rewrite.",
    na: "The product has no drag-operated functionality."
  },
  {
    id: "2.5.8", name: "Target Size (Minimum)", level: "AA", principle: "Operable", wcag: ["2.2"],
    what: "Pointer targets must be at least 24 by 24 CSS pixels, with exceptions for sufficiently spaced, inline, or essential targets.",
    ask: "Can someone with an imprecise pointer hit your controls?",
    fail: "Icon-only buttons drawn at 16px, densely packed row actions in data tables, and small close buttons on modals and toasts.",
    na: null
  },

  /* ---------------------------------------------------------------- 3. Understandable */
  {
    id: "3.1.1", name: "Language of Page", level: "A", principle: "Understandable",
    what: "The default human language of each page must be set programmatically.",
    ask: "Does the screen reader pronounce your content in the right language?",
    fail: "A missing or wrong lang attribute on <html>. A boilerplate lang=\"en\" left on a site that is actually in another language.",
    na: null
  },
  {
    id: "3.2.1", name: "On Focus", level: "A", principle: "Understandable",
    what: "Moving focus to a component must not automatically cause a change of context.",
    ask: "Does anything unexpected happen just from tabbing?",
    fail: "Opening a modal, submitting a form or navigating away when a field receives focus.",
    na: null
  },
  {
    id: "3.2.2", name: "On Input", level: "A", principle: "Understandable",
    what: "Changing a setting must not automatically cause a change of context unless the user was warned first.",
    ask: "Does selecting an option unexpectedly navigate the user somewhere?",
    fail: "A <select> that navigates on change. Auto-submitting a form when the last field is filled.",
    na: null
  },
  {
    id: "3.3.1", name: "Error Identification", level: "A", principle: "Understandable",
    what: "Input errors must be identified and described in text.",
    ask: "Does a screen reader user know which field failed and why?",
    fail: "Errors shown only as a red border or a red asterisk, with no text and no programmatic association to the field.",
    na: null
  },
  {
    id: "3.3.2", name: "Labels or Instructions", level: "A", principle: "Understandable",
    what: "Inputs that need user input must have labels or instructions.",
    ask: "Does every field have a real, persistent label?",
    fail: "Placeholder-only forms. The placeholder disappears the moment typing starts, taking the label with it, and it fails contrast far more often than not.",
    na: null
  },
  {
    id: "3.1.2", name: "Language of Parts", level: "AA", principle: "Understandable",
    what: "Passages in a different language need their own lang attribute.",
    ask: "Are foreign-language phrases marked up so they're pronounced correctly?",
    fail: "Mixed-language testimonials, product names or quoted content with no lang attribute on the fragment.",
    na: "All content is in a single language."
  },
  {
    id: "3.2.3", name: "Consistent Navigation", level: "AA", principle: "Understandable",
    what: "Repeated navigation must appear in the same relative order across pages.",
    ask: "Does your nav stay put, or reshuffle between views?",
    fail: "Nav items that reorder based on usage, recency or personalisation.",
    na: "Applies to sets of pages."
  },
  {
    id: "3.2.4", name: "Consistent Identification", level: "AA", principle: "Understandable",
    what: "Components with the same function must be labelled consistently.",
    ask: "Is the same action called the same thing everywhere?",
    fail: "The same action called \"Delete\" on one screen, \"Remove\" on another and \"Trash\" on a third. Same icon, three different accessible names.",
    na: "Applies to sets of pages."
  },
  {
    id: "3.3.3", name: "Error Suggestion", level: "AA", principle: "Understandable",
    what: "When an input error is detected and a correction is known, suggest it.",
    ask: "Do your error messages tell the user how to fix the problem?",
    fail: "\"Invalid input\" or \"Something went wrong\" with no indication of the expected format.",
    na: null
  },
  {
    id: "3.2.6", name: "Consistent Help", level: "A", principle: "Understandable", wcag: ["2.2"],
    what: "If a help mechanism is repeated across pages, it must appear in the same relative order each time.",
    ask: "Is your support link in the same place on every page?",
    fail: "A contact or support widget that sits in the header on marketing pages and in the footer inside the app. Note this only applies to help you already offer — it does not require you to add any.",
    na: "The product provides no help mechanism at all — no contact details, no support link, no chat, no self-help."
  },
  {
    id: "3.3.7", name: "Redundant Entry", level: "A", principle: "Understandable", wcag: ["2.2"],
    what: "Information the user already entered in the same process must be auto-populated or offered for selection, unless re-entering it is essential.",
    ask: "Are you making people type the same thing twice?",
    fail: "Multi-step checkout that asks for the address again at confirmation. Forms that discard what was typed when validation fails. Re-entry is only essential where it is the point, such as confirming a new password.",
    na: null
  },
  {
    id: "3.3.8", name: "Accessible Authentication (Minimum)", level: "AA", principle: "Understandable", wcag: ["2.2"],
    what: "Logging in must not depend on a cognitive function test — remembering a password, solving a puzzle, transcribing characters — unless an alternative or an assisting mechanism exists.",
    ask: "Can someone authenticate without relying on memory or puzzle-solving?",
    fail: "Blocking paste in the password field, which breaks password managers and turns login into a memory test. CAPTCHAs requiring transcription or object recognition with no alternative. Supporting paste and WebAuthn is usually the whole fix.",
    na: null
  },
  {
    id: "3.3.4", name: "Error Prevention (Legal, Financial, Data)", level: "AA", principle: "Understandable",
    what: "For legal commitments, financial transactions and data deletion, submissions must be reversible, checked or confirmable.",
    ask: "Can a user undo or review before they're committed?",
    fail: "One-click irreversible destructive actions — delete account, cancel subscription, submit payment — with no confirmation step or undo window.",
    na: "The product involves no legal commitments, financial transactions, test responses or user-controllable data deletion. Rare for SaaS; check your billing and delete flows before claiming this."
  },

  /* ---------------------------------------------------------------- 4. Robust */
  {
    id: "4.1.1", name: "Parsing", level: "A", principle: "Robust", wcag: ["2.1"],
    what: "Elements must have complete tags, be properly nested, and have unique IDs.",
    ask: "Is your markup well-formed enough for assistive tech to parse?",
    fail: "Duplicate id attributes from repeated components — the classic React failure where a list renders the same id on every row, breaking every label and aria-describedby that points at it.",
    na: "Note: WCAG 2.2 removed this criterion as obsolete, since modern browsers and assistive tech handle malformed markup consistently. It remains normative in WCAG 2.1 and therefore in EN 301 549. Most reports now mark it Supports."
  },
  {
    id: "4.1.2", name: "Name, Role, Value", level: "A", principle: "Robust",
    what: "Every UI component needs a programmatically determinable name, role, and state.",
    ask: "Does your custom component announce itself correctly to a screen reader?",
    fail: "Custom components built from divs with no role, no accessible name and no state. A toggle that never exposes aria-checked. A collapsible that never exposes aria-expanded. Together with 1.3.1 and 4.1.2, this accounts for a large share of all audit findings.",
    na: null
  },
  {
    id: "4.1.3", name: "Status Messages", level: "AA", principle: "Robust",
    what: "Status messages must be programmatically exposed so assistive tech announces them without moving focus.",
    ask: "Does a screen reader user hear your toasts, validation summaries and loading states?",
    fail: "Toast notifications, \"3 results found\" counters, autosave indicators and async loading states rendered with no live region, so a screen reader user never learns they happened.",
    na: null
  }
];

/* A criterion with no `wcag` field is in both 2.1 and 2.2. Only the exceptions
   carry it: 4.1.1 Parsing (removed in 2.2) and the six criteria 2.2 introduced
   at A/AA. */
function criteriaFor(version) {
  return CRITERIA.filter(c => !c.wcag || c.wcag.includes(version));
}

/* Integrity guard. These counts are normative — if they drift, every report
   this tool generates is wrong, which is worse than the tool not existing.
     WCAG 2.1 A/AA: 30 A + 20 AA = 50
     WCAG 2.2 A/AA: 31 A + 24 AA = 55  (2.1, minus 4.1.1, plus six new)      */
[["2.1", 30, 20], ["2.2", 31, 24]].forEach(([version, expectA, expectAA]) => {
  const set = criteriaFor(version);
  const a  = set.filter(c => c.level === "A").length;
  const aa = set.filter(c => c.level === "AA").length;
  if (a !== expectA || aa !== expectAA) {
    throw new Error(
      `Criteria set corrupt for WCAG ${version}: expected ${expectA} A / ${expectAA} AA, got ${a} A / ${aa} AA`);
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { CRITERIA, criteriaFor };
