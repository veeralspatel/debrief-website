# Debrief — Design System Spec
*Doc 06 of 11, Website Documentation Set. Companion HTML files that actually exist in this
folder, open directly to see every state live: `demos.html` (Demo 1 Problem/Mechanism, Demo 2
Privacy), `demos-2.html` (Demo 3 AI feedback, Demo 4 Auto-detect, auto-filing micro-loop). There
is no separate live HTML reference for this website's own tokens/buttons/form/value-stack/FAQ
states, this markdown doc is the sole source for those (a website-specific companion file was
never built). Note: a file also named `design-system.html` exists in the separate `/Debrief` app
blueprint folder, but it specs the Electron app's own UI (buttons, cards, screens inside
Debrief itself), a different document entirely, not a website reference, don't confuse the two.*

---

## 1. Color Tokens

*Verified this session: every token below matches the authoritative dark-mode app tokens (the
`*-dark-mode-states.html` files in the `/Debrief` blueprint folder), not the older, partially-
superseded light-mode-first `design-system.html` in that same folder (which uses `#007AFF` blue,
green toggle-on, `#1C1C1E`/`#F2F2F7` backgrounds — none of that made it in here, correctly).*

| Token | Hex | Use |
|---|---|---|
| Background | `#0A0A0B` | Page base |
| Surface 1 | `#131315` | Section-level tonal shifts |
| Surface 2 | `#151517` | Cards, fragments, form fields, demo containers |
| Border | `#232326` | Rest state, all bordered elements |
| Border hover | `#2E2E32` | Hover only, never rest |
| Text | `#F2F2F7` | Headlines, primary body |
| Text 2 | `#98989D` | Subheads. **Also, locked this session: any body-size or meaningful-content
  text that needs AA contrast** (FAQ answers, muted body/descriptions, risk-reversal copy),
  moved here from Text 3/4 after a real contrast failure, see §10. |
| Text 3 | `#6C6C70` | **Restricted use after this session's audit:** large-text-only contexts
  (≥18px, or ≥14px at 600+ weight) where 3.79:1 is acceptable, or genuinely decorative text.
  No longer used for FAQ answers or muted body copy, those moved to Text 2. |
| Text 4 | `#48484A` | **Restricted use after this session's audit:** decorative-only
  (demo chrome labels, non-essential timestamps) where failing contrast is acceptable because
  the text carries no meaning on its own. No longer used for risk-reversal copy, that moved to
  Text 2, since 2.17:1 fails even the relaxed large-text threshold on real promise copy. |
| Blue | `#0A84FF` | All CTAs, links, focus rings. The only click color on the site. |
| Blue hover | `#339CFF` | CTA hover only |
| Red | `#FF3B30` | Recording motif only. Never on a clickable element. |
| Green | `#30D158` | Checkmarks, success states, "still transcribing" proof text |

---

## 2. Typography

- **IBM Plex Sans**: all headlines and body copy. Weights 400 (body), 500, 600 (headlines), 700
  (rare emphasis).
- **JetBrains Mono**: eyebrow labels, timestamps, filenames, fine print, demo chrome. Weights
  400–500. Never headlines or body paragraphs.
- Both loaded via Google Fonts, subset to weights actually used (Doc 04 performance rule).

| Role | Spec |
|---|---|
| H1 (hero) | Plex 600, 52px / 1.08 / -0.02em (38px mobile) |
| H2 (section) | Plex 600, 34px / 1.15 / -0.015em (27px mobile) |
| H3 (subsection) | Plex 600, 20px / 1.3 |
| Lead paragraph | Plex 400, 17px / 1.6 |
| Body | Plex 400, 15px / 1.65 |
| Secondary body | Plex 400, 13.5px / 1.55 |
| Eyebrow label | Mono 400, 12px, +0.05em tracking, uppercase |
| Meta / timestamp | Mono 400, 11px |

---

## 3. Spacing Scale

4px base unit: 4, 8, 12, 16, 24, 32, 48, 72, 120.

Section vertical padding: 120px desktop / 72px mobile. Copy column max-width: 560px (460px in
the hero specifically, to leave room for fragments).

---

## 4. Buttons

| State | Spec |
|---|---|
| Primary rest | `#0A84FF` bg, white text, 15px/600 weight, 14px/28px padding, 8px radius |
| Primary hover | bg → `#339CFF`, 150ms ease |
| Primary active | `scale(0.985)`, 100ms ease |
| Primary focus | 2px solid `#0A84FF` outline, 3px offset, always visible for keyboard nav |
| Success (post-submit) | bg → `#30D158`, dark text (`#08210F`) for contrast |
| Ghost (demo controls only) | transparent bg, 1px `#232326` border, hover border → `#2E2E32`, `min-height: 44px` (see correction below) |

Rule: one primary CTA per section, maximum. Ghost buttons are reserved for demo replay controls,
never used for a primary action.

**Touch-target correction, found this session:** the ghost/replay button as actually built in
`demos.html` (13px font, 9px vertical padding) measures ~35px tall, below the 44px minimum touch
target size (a CRITICAL-priority check, not a nice-to-have). Fixed here with an explicit
`min-height: 44px` on the ghost variant; when this component gets rebuilt for the live site,
carry that minimum over even though the reference file itself doesn't have it (the reference
file was a demo-code sandbox, not built against this checklist).

---

## 5. Form Field

- 300px width (desktop). **Mobile width defined this session (previously unspecified):** 100%
  of the column width up to a 340px max, not the fixed 300px, so it doesn't overflow narrow
  phones or leave odd gutters on larger ones, matches the page's own margin behavior.
  `#151517` bg, 1px `#232326` border, 8px radius, 13px/14px padding
- Focus: border → `#0A84FF`, `0 0 0 3px rgba(10,132,255,0.15)` glow
- Error: border → `#FF3B30`, message in red 12.5px directly under the field (never a floating
  tooltip, never only a color change)
- Risk-reversal copy sits directly under the button, Mono 11px, **`#98989D` (Text 2, changed
  this session from `#48484A`, which measured 2.17:1 contrast and failed WCAG even at the large-
  text threshold, see §10)**, per Doc 03 §3 wording

---

## 6. Value Stack Item

- Card: `#151517` bg, 1px `#232326` border, 12px radius, 18px/20px padding, 340px width
- Checkmark: SVG stroke, `#30D158`, draws itself in on scroll entry (300ms)
- Hover: `translateY(-2px)`, border → `#2E2E32`, 180ms ease

---

## 7. FAQ Accordion

- 1px `#232326` dividers, 200ms ease max-height transition
- Chevron rotates 180° on open
- Question 15.5px/500, answer 14px/**`#98989D` (Text 2, changed this session from `#6C6C70`,
  which measured 3.79:1 and failed WCAG's 4.5:1 normal-text threshold, see §10)**
- **Question row padding, defined this session (previously unspecified):** 16px vertical padding
  on the clickable question row, full-width tap target, not just the visible text. Gives ~52px
  total row height at 15.5px/500, comfortably over the 44px touch-target minimum.
- **Interaction model, locked this session (was undecided, only surfaced as "not specified" in
  Doc 10 Phase 5):** independent, any number of items can be open at once. Opening one does not
  close the others.

---

## 8. Demo System

**Four tiers**, in order of weight:
- **Tier 1, full demo**: 5-8s coded sequence, autoplay on scroll entry (Intersection Observer),
  replay button (ghost style, top-right of container), loops on interval when idle for review
  but autoplay-once is the live-site behavior, not the auto-repeat used in these reference files
- **Tier 2, micro-loop**: 2-3s, ambient, no controls, sits beside a value stack item
- **Tier 3, static fragment**: real UI, no motion (the hero treatment)
- **Tier 4**: copy only

**Locked demo set (4 Tier 1 + 1 Tier 2, revised up from the original 2, see Doc 05 §note):**

| # | Section | Proves | File |
|---|---|---|---|
| 1 | Problem/Mechanism | One button, no setup: mic+system on → waveform live → transcript types in → file saves | `demos.html` |
| 2 | Privacy/Open Source | Local is structural: audio never crosses to "their servers," keeps running with wifi off | `demos.html` |
| 3 | Value stack closer | AI feedback prompt: transcript → generic AI chat panel → specific, timestamped critique | `demos-2.html` |
| 4 | Auto-detect | Zero setup: pill appears and starts recording with no click | `demos-2.html` |
| Micro-loop | Beside auto-filing value stack item | Folder tree builds itself, newest file highlighted | `demos-2.html` |

**Placement/pacing rule (the mitigation for running 4 full demos on one page):** no two Tier 1
demos are adjacent without a real copy-only section between them. The page must breathe between
proof moments, or it reads as a slideshow instead of a considered site. Order down the page
follows the section order in Doc 03, which already spaces them naturally (Problem/Mechanism →
Value Stack [demo 3 + micro-loop live here] → Privacy [demo 2] → FAQ).

**Demo 4 placement, locked this session (was unresolved across Docs 05/06/10, all the way to the
implementation plan):** Demo 4 (auto-detect) sits inside the Problem/Mechanism section, directly
after Demo 1, same section, not its own beat. Chosen after comparing both options live (built as
working page-flow mockups, not described abstractly). Trade-off worth remembering when this
section is actually built: two Tier 1 demos now sit close together with only a short one-line
copy caption between them, thinner on the "page must breathe" rule above than the rest of the
page. Mitigate by making sure that caption is a real sentence, not just a label, and that the
section immediately after (Value Stack) opens with enough copy before Demo 3 to give the page a
genuine pause.

**Third-party AI rendering rule:** Demo 3's chat panel is deliberately generic (`ANY AI
ASSISTANT` label), no Claude/ChatGPT branding, no copied chrome, no implied partnership or
endorsement.

**Technical notes (feeds Doc 04):**
- All demos are DOM/CSS animation, not video, per the no-video performance rule
- `prefers-reduced-motion: reduce` disables all transitions/animations site-wide, including
  every demo, falls back to static end-state
- Replay buttons need `aria-label` (icon/ghost button, not self-describing text alone)

---

## 9. Fragment Component (Hero + recurring)

Per Doc 05 §4/§7: real interface fragments, not boxed screenshots, bleeding off viewport edges,
slight rotation on desktop (locked reference: -3°), straightening to 0° below 768px. Drop shadow
`0 40px 100px rgba(0,0,0,0.6)` for large fragments. Content fades at the bottom edge via
gradient mask where a fragment implies more content below. **Criteria defined this session
(previously just "where a fragment implies more content," no test):** applies whenever the
fragment's content genuinely overflows its visible container, transcript lines, file lists, chat
messages, anything with a natural continuation past the frame. Does not apply to a fragment
showing one complete, bounded UI element (a button, a single card) with nothing to continue to.

**Hero fragment content, locked this session (previously unspecified, the "hero-concept.html"
file this was meant to reference never existed, see Doc 07's correction):** mid-recording state,
not a finished/clean transcript. Shows the live record indicator with an elapsed timer, MIC/SYS
source status, and a couple of already-typed transcript lines mid-call, tier 3 (static, no
motion, per §8 above), a frozen frame of the recording state rather than the finished-file state.
Chosen after comparing against a "clean transcript" alternative directly, live, alongside three
headline options, not decided in the abstract.

---

## 10. Accessibility Checklist

**Full contrast pass run this session (previous checklist only verified 2 of 6 text tokens,
missing the two that actually failed):**

| Pair | Ratio | Result |
|---|---|---|
| `#F2F2F7` (Text) on `#0A0A0B` | 17.73:1 | Pass (normal text, 4.5:1) |
| `#98989D` (Text 2) on `#0A0A0B` | 6.89:1 | Pass (normal text, 4.5:1) |
| `#6C6C70` (Text 3) on `#0A0A0B` | 3.79:1 | **Fails 4.5:1 normal text**, passes 3:1 large-text only |
| `#48484A` (Text 4) on `#0A0A0B` | 2.17:1 | **Fails even the 3:1 large-text threshold** |
| `#0A84FF` (Blue) on `#0A0A0B` | 5.43:1 | Pass (normal text, 4.5:1) |
| `#FF3B30` (Red) on `#0A0A0B` | 5.58:1 | Pass (normal text, 4.5:1) |
| `#30D158` (Green) on `#0A0A0B` | 9.79:1 | Pass (normal text, 4.5:1) |
| White CTA text on `#0A84FF` button | 3.65:1 | Pass (large-text, 15px/600 qualifies), borderline, don't drop the button text weight below 600 |

**Fixes applied this session as a result:** risk-reversal copy and FAQ answers/muted body text
moved from Text 3/4 to Text 2 (`#98989D`), see §1's token table and §5/§7 for the specific
changes. Text 3/4 usage is now restricted to genuinely large or decorative text (§1).

- [x] Text contrast verified across all 8 token/background pairs above, not just 2, two real
      failures found and fixed this session
- [ ] Focus rings visible on every interactive element (buttons, form field, FAQ triggers,
      replay controls)
- [ ] `prefers-reduced-motion` respected across all demos, fragments, and micro-interactions
- [ ] Replay buttons carry `aria-label`, not relying on visual-only icons
- [ ] Color never the sole indicator (error state pairs red border with a text message, not
      color alone)

---

## 11. Design Review (this session, `ui-ux-pro-max` + `impeccable` + `frontend-design` methodology)

Ran the actual `ui-ux-pro-max` design-system generator against this product's brief ("open
source developer tool, dark mode, minimal, direct-response") to get the generic pattern this
category defaults to, and compared it against what's already locked here:

- **Generic default for this category:** Inter font, `#0F172A` slate-blue-tinted background,
  single green `#22C55E` accent. This is almost exactly the "near-black + acid-green" and
  "Inter as the safe face" combination the `frontend-design` methodology explicitly names as an
  AI-generated-design tell.
- **What's actually locked here diverges from that default on purpose, and it holds up:** IBM
  Plex Sans/JetBrains Mono instead of Inter (already reasoned through in Doc 05 §3), a true
  considered near-black `#0A0A0B` rather than a slate-tinted one, blue as the sole action color
  with red reserved thematically rather than one green accent doing everything, and the
  interface-fragment hero concept as a real signature element rather than the generic
  headline+3-bullets+centered-CTA pattern the generator defaults to. No changes needed, this
  section exists to record that the divergence was checked, not assumed.

**Two real touch-target failures found and fixed** (§4, §7): the ghost/replay button as actually
built in `demos.html` measures ~35px tall, and the FAQ question row had no padding spec at all,
both below the 44px minimum touch target. Fixed with explicit `min-height`/padding values above.

**Form labeling checked, no issue:** the waitlist form is a single email field directly under an
unambiguous heading and button ("Join the waitlist"), which is an accepted exception to the
"always use a visible label, not just a placeholder" rule, that rule matters most when a field's
purpose isn't obvious from context. No change needed here.

**Reference comparison against real developer-tool products (`awesome-design-md`):** pulled
Raycast ("sleek dark chrome, vibrant gradient accents") and Vercel ("black and white precision,
Geist font, monochrome") as the two closest real-world comparables for a dark, technical, tool-
feeling product. Debrief's system sits deliberately between them, not copying either: flatter and
more restrained than Raycast (no gradients anywhere in this system except the app icon itself,
which is a separate asset), but with more functional color than Vercel's pure monochrome (blue
for action, red for the recording motif, green for status), because this product genuinely needs
that color coding to represent recording state, where Vercel's infrastructure-tooling context
doesn't. Confirms the system reads as its own considered point in the category, not a copy.

---

## 13. Cookie Consent Banner (new this session, see Doc 04 §7 for the technical/legal context)

- Fixed to the bottom of the viewport, full-width, `#131315` bg (Surface 1), 1px `#232326` top
  border, not a modal/overlay, doesn't block page interaction or dim the background.
- Copy: short, one line plus two buttons. "This site uses cookies for analytics and the waitlist
  signup. [Accept] [Reject]" in Doc 07's established voice, specific not vague, matching the
  "no fabrication, no hedging" rules already governing the rest of the copy.
- Buttons: Accept uses the standard primary button style (§4). Reject uses the ghost style (§4),
  same visual weight as a real, equal choice, not visually suppressed to nudge acceptance, that
  would undercut the point of asking.
- Both buttons meet the 44px touch-target minimum (§4/§11's correction applies here too).
- Dismisses on either choice, `200ms` ease slide-down, doesn't reappear on the same
  device/browser once a choice is made (localStorage flag, per Doc 04 §7).
- Respects `prefers-reduced-motion`: instant show/hide instead of the slide, consistent with
  every other motion rule in this doc.

---

## 12. Mobile Behavior

Single column. Fragments lose rotation and reduce bleed. Demos play identically (DOM animation
has no mobile/video-fallback problem). No sticky elements. CTAs appear in hero and waitlist
sections only, per Doc 03/05.
