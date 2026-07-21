# Debrief — Implementation Plan
*Doc 10 of 11, Website Documentation Set. For Claude Code. Read Docs 01-09 first, this sequences
the build, it doesn't repeat their detail. Reference files that actually exist in this folder:
`demos.html`, `demos-2.html`. **Correction (this audit):** this line previously also cited
`hero-concept.html` and `design-system.html` as being "in this doc set's outputs" — neither is.
`hero-concept.html` never existed anywhere (its content is now resolved directly in Doc 06 §9 and
Doc 07); `design-system.html` is a different document entirely, in the separate `/Debrief` app
blueprint folder, specing the Electron app's own UI, not this website (see Doc 06's header
correction).*

---

## Phase 0 — Project Scaffold

1. Repo structure per Doc 04: `index.html`, `/css/styles.css`, `/js/main.js`, `/images`
   (favicon + OG banner only, per Doc 08).
2. Build `styles.css` foundation first: color tokens, type scale, spacing scale, button/form
   states, all exactly per Doc 06 §1-5. Get this right once, every section consumes it.
3. Set up GitHub Pages, connect custom subdomain (CNAME), confirm auto-deploy fires on push
   before building any real content.
4. Build the footer block (GitHub link, Fielder self-select line, socials, per Doc 03/07) as a
   single reusable piece, this is a one-page site but the footer is still worth isolating.

---

## Phase 1 — Hero

1. Copy per Doc 07: eyebrow, H1 ("Press record. Everything else happens on its own.", locked
   this session), subhead, CTA button.
2. Interface fragment per Doc 06 §9 (**correction:** not `hero-concept.html`, that file never
   existed; the spec now lives directly in Doc 06 §9): mid-recording state fragment (live
   timer, MIC/SYS status, in-progress transcript lines), right side, -3° rotation, bottom fade
   mask, bleeding off the viewport edge, no boxed screenshot anywhere.
3. Micro-interactions: pulsing red record dot (~1.8s breathe), 2-3px parallax drift on
   fragments on scroll (Doc 05 §6, Doc 06 §9).
4. Mobile: fragments straighten to 0° rotation below 768px, reduced bleed (Doc 06 §11).

---

## Phase 2 — Problem/Mechanism + Demo 1

1. Section copy per Doc 07.
2. Build Demo 1 per `demos.html`: mic/system audio toggle on → waveform animates live →
   transcript lines type in sequentially → recording stops → file saves with a real-looking
   path. Autoplay once on scroll entry via Intersection Observer, ghost-style replay button
   with `aria-label`.
3. Build Demo 4 (auto-detect) in this same section, directly after Demo 1, **locked this
   session** (Doc 06 §8, was previously an open placement question). Apply the pacing rule from
   Doc 06 §8 carefully here: real copy between the two demos, not just a label, since this is the
   one spot on the page where two Tier 1 demos sit close together by design.

---

## Phase 3 — Value Stack + Demo 3 + Micro-loop

1. Nine value stack items per Doc 07, card component per Doc 06 §6 (checkmark draws in on
   scroll entry, hover lifts 2px, border brightens).
2. Build Demo 3 per `demos-2.html` at the closing item (AI feedback prompt): transcript file
   lifts and border goes blue, arrow activates, file lands in a generic `ANY AI ASSISTANT` chat
   panel, three numbered critiques stream in. No branded chat chrome, no implied partnership
   (Doc 06 §8 hard rule).
3. Build the auto-filing micro-loop per `demos-2.html`, placed beside the auto-filing value
   stack item, no controls, ambient loop only (Tier 2, per Doc 06 §8).

---

## Phase 4 — Privacy & Open Source + Demo 2

1. Section copy per Doc 07.
2. Build Demo 2 per `demos.html`: audio → whisper → .md file sequence inside a "YOUR MACHINE"
   boundary, dashed barrier, crossed-out "their servers" box nothing reaches, then the wifi
   toggle flips off and "still transcribing" resolves. This is the proof moment, keep the
   sequencing exactly as built in the reference file.

---

## Phase 5 — FAQ

1. Five questions per Doc 07 (installer-signing question deliberately excluded, Phase 2 only,
   per Doc 09 §4).
2. Accordion component per Doc 06 §7: 200ms ease, rotating chevron, **independent, any number
   open at once, locked this session** (previously undecided).

---

## Phase 6 — Waitlist Form (Final CTA)

1. ConvertKit embedded form, restyled to Doc 06 §5's field/button tokens, not left as
   ConvertKit's default look (Doc 04 §3).
2. Risk-reversal micro-copy under the button, exact text from Doc 07, must match Email 1
   word-for-word in shape (Doc 03 §3 hard rule).
3. Success state: button morphs inline to the green success style (Doc 06 §4), no page jump.
4. Error state: red border, message under the field, never color alone (Doc 06 §10
   accessibility checklist).

---

## Phase 7 — ConvertKit Setup (parallel, non-code track)

1. Create the ConvertKit form matching the site's visual tokens.
2. Build the 5-email automation with the copy from Doc 07 exactly as drafted, Email 3's tip
   stays a placeholder until Veeral supplies the real detail (Doc 07 open items, do not invent
   one).
3. Confirm the automation's Email 1 timing (immediate) and total sequence length (5 emails,
   ~2 weeks) match what the landing page promises.

---

## Phase 8 — Cross-Section Technical Pass

1. Schema: `SoftwareApplication` and `FAQPage`, per Doc 02/06, validate with Google's Rich
   Results Test.
2. Meta title/description per Doc 07, within Doc 02's length targets.
3. Open Graph tags, using the banner from Doc 08 once built.
4. Canonical tag, XML sitemap, custom 404.
5. Favicon set installed per Doc 08.
6. Google Analytics + Search Console connected, waitlist form submission tracked as the goal
   (Doc 04 §7).

---

## Phase 9 — Accessibility & Motion Pass

Per Doc 06 §10 checklist:
1. Verify text contrast ratios (`#F2F2F7` and `#98989D` on `#0A0A0B`).
2. Focus rings visible on every interactive element, not just the primary CTA.
3. `prefers-reduced-motion: reduce` disables all transitions and animations site-wide,
   including all four demos and the micro-loop, falling back to static end-states.
4. Replay buttons carry `aria-label`, not relying on icon-only visual meaning.
5. Confirm color is never the sole indicator anywhere (error states, success states).

---

## Phase 10 — QA Pass

1. Mobile QA: single column, fragments at 0° rotation, demos play identically to desktop (no
   video fallback problem, they're DOM animation).
2. Desktop QA: hover states on buttons/value-stack cards/links, demo autoplay-once behavior
   confirmed via actual scroll testing, not just code review.
3. Cross-browser spot check.
4. Lighthouse/PageSpeed run, address major flags.
5. ConvertKit form submits correctly, analytics goal fires on real submission.
6. Real link-preview test: share the live URL in a private Instagram/TikTok DM, confirm the OG
   banner and title render correctly before any public launch (Doc 04/08).
7. Confirm the pacing rule held everywhere except the one deliberate exception: Demo 1 and
   Demo 4 sit close together by design in Problem/Mechanism (Doc 06 §8, locked this session).
   Verify the copy between them is a genuine sentence, not just a label, and that Value Stack's
   opening copy gives the page a real pause before Demo 3.

---

## Phase 11 — Launch

1. Final review.
2. Confirm DNS/CNAME live, HTTPS active.
3. Submit XML sitemap via Search Console.
4. Confirm GitHub repo is public-ready (per Doc 01, private during build, public at launch).

---

## Hard Rules Throughout Every Phase

- Do not invent Email 3's cold-calling tip. Leave the placeholder until Veeral supplies a real
  one (Doc 07).
- Do not add the unsigned-installer FAQ or any download-flow content, that's Phase 2 (Doc 09).
- Do not add social proof of any kind, standing rule, no exceptions (Doc 05 §11).
- Do not exceed 4 Tier 1 demos + 1 Tier 2 micro-loop without cutting one first (Doc 06 §8).
- Do not use Inter. IBM Plex Sans and JetBrains Mono only (Doc 06 §2).
- Red never appears on a clickable element (Doc 06 §1).
