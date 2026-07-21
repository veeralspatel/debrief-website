# Debrief — Site Content & Flow Brief
*Doc 03 of 11, Website Documentation Set. Read alongside Doc 01 (context), Doc 02 (SEO), and the
existing offer document (`debrief-offer-document.md`) and Phase 2 blueprint
(`debrief-landing-page-blueprint.md`, both in the separate `/Debrief` app blueprint folder, read-
only source), which this doc trims down for Phase 1.*

---

## 1. Site Overview

**Phase 1 is two pages: the homepage** (`index.html`, a single scrolling page, no persistent nav
bar, no sticky elements, carried over from the Phase 2 blueprint's existing design philosophy —
clean scroll, CTA only in hero and final sections) **and a dedicated privacy/local-processing
page** (own URL, see Section 2a below). No separate `/download` page yet, that's added in
Phase 2. **Correction (this audit):** an earlier draft of this doc folded the privacy content
into a homepage section instead of a separate page, contradicting Doc 01/02, which both specify
a dedicated page for SEO reasons (Doc 02 marks this keyword cluster the site's highest-priority
ranking opportunity). Corrected this session, resolved as a dedicated page.

**Homepage section order, top to bottom:**
1. Hero
2. Problem / Mechanism
3. Value Stack
4. FAQ
5. Waitlist Form (Final CTA)
6. Footer

The Privacy & Open Source page is not part of this scroll, it's linked to from the homepage (see
Section 2a).

---

## 2. Section-by-Section Content Plan

### Hero
**Headline locked this session (see Doc 07):** "Press record. Everything else happens on its
own." (mechanism-led, offer document Option B), replacing the earlier "Option A or D" note below,
which predates the live headline comparison this session ran. **Correction (this audit): no
screenshot, ever** — Docs 04, 05, 06, and 08 all independently confirm the final approach is
coded interface fragments (Tier 3 static fragment, per Doc 06 §8/§9), never a product screenshot.
**Fragment content locked this session:** mid-recording state (live timer, MIC/SYS status,
in-progress transcript lines), not a finished-transcript state, chosen after a live side-by-side
comparison (see Doc 06 §9's correction). Primary CTA button leads to the waitlist form via anchor
scroll, no separate page.

### Problem / Mechanism
Collapses the Phase 2 blueprint's two separate sections (Problem/agitation, Mechanism reveal)
into one, per Doc 01's trimmed scope. Content pulled directly from offer document Sections 2–3:
the "friction problem, not a discipline problem" insight, then the one-button mechanism reveal.
**Demo 4 (auto-detect) placement locked this session:** lives in this section too, directly after
Demo 1, not a separate beat (see Doc 06 §8's correction for the full reasoning and the pacing
trade-off it introduces).

### Value Stack
Full stack from offer document Section 4, unchanged, ending with the AI call feedback prompt as
the closing, biggest item.

### 2a. Privacy & Open Source — Dedicated Page *(new, corrected this session to be a real page)*
Own URL, **`/local-transcription` (locked this session, not `/privacy`)**, own `<title>` and meta
description targeting the 5 privacy/local-processing keywords directly (Doc 02 Section 2), rather
than sharing the homepage's title/meta. **Naming note:** `/privacy` was the original candidate
slug, changed to avoid colliding with the new, separate Privacy Policy page (Doc 07), which is a
legal/compliance document, not this product-marketing content, keeping the two clearly distinct
avoids a confusing near-duplicate URL. Expands on the value stack's "fully offline, nothing
leaves your machine" bullet into real depth. Per Doc 02 Section 4/7 guidance: avoid generic "we
care about your privacy" language, be specific about what's actually true (local Whisper
transcription, nothing uploaded, open source so it's verifiable, not just claimed).

**Footer, locked this session:** this page's footer includes a link to the actual Privacy Policy
page (Doc 07), since this is one of only two places that link exists (the other is nurture email
footers, per Doc 07). Makes sense thematically too, this page already covers privacy in depth.

**Linked from the homepage:** the Value Stack's "Fully offline, nothing leaves your machine"
item links through to this page for readers who want the full depth, and it's referenced in the
footer alongside the GitHub link. Should also carry its own FAQPage schema (Doc 02 §5), separate
from the homepage FAQ's schema block.

### FAQ
Sourced directly from existing materials, not fresh copy. Candidate questions, pulled from the
offer document's objection-handling and risk reversal sections:
- Is Debrief really free? (Section 7: no card, no account, no trial, no feature paywall)
- Where do my recordings go, is anything uploaded anywhere? (Section 5: local, on-device,
  nothing leaves your machine)
- Why not just use Otter / Gong / Fireflies? (Section 5's comparison table, turned into
  prose Q&A)
- What platforms does it work on? (Mac + Windows)
- When can I actually download it? (explains the waitlist purpose directly)

**Cut from Phase 1 (this audit reconciles a stale list):** "The installer isn't signed, is it
safe?" was originally listed here as a 6th candidate, but Doc 07 and Doc 09 both already moved
it to Phase 2, since it assumes a `/download` page that doesn't exist yet in Phase 1, and the
objection itself is moot before anyone can install anything. Doc 07's actual FAQ (5 questions)
reflects the cut correctly; this list just hadn't been updated to match.

### Waitlist Form (Final CTA)
ConvertKit embedded signup form. Risk-reversal micro-copy sits directly under the button (see
Section 3 below), not in the FAQ, per the Value Equation reasoning that objections need killing
at the moment of decision, not several sections away.

### Footer
Unchanged from the Phase 2 blueprint's design: GitHub link (ungated, no email required),
Fielder self-select line, socials.

---

## 3. Risk-Reversal Micro-Copy

Placed directly under the waitlist form's CTA button. Must match Email 1's expectation-setting
language exactly, same shape, same timeframe, same "then silence" ending, so the promise made on
the page is the same promise kept in the inbox.

```
No spam. You'll get the download link the moment Debrief is ready, then a handful
of real emails over the next couple weeks, no pitch, just useful stuff. After that
I'll leave you alone until there's something worth saying. Unsubscribe anytime,
one click.
```

---

## 4. Post-Signup Flow

1. Visitor submits the ConvertKit embedded form.
2. On-page confirmation (ConvertKit's native success state, styled to match the site).
3. Email 1 fires immediately (see Section 6).
4. Subscriber enters the 5-email nurture automation, timed from signup date.

---

## 5. Site-Wide Copy Notes (feeds Doc 07)
- No em dashes anywhere in final copy, per standing preference.
- Confident, benefit-driven, direct-response tone, not hype-y (per offer doc Section 11).
- Founder credibility can appear briefly but the page must stand alone for a cold, organic
  visitor who's never seen Veeral's content.

---

## 6. Nurture Sequence Structure

**5 emails over ~2 weeks, then silence until there's something real to say. Not 4-5, not
optional past that point, all 5 ship.**

**Adaptation note:** the sequence as originally sketched assumed a download link exists at
signup (Phase 2 behavior). Since Phase 1 is pre-launch, Email 1 below is adapted to confirm the
signup and set expectations rather than deliver a download. The actual "here's your download
link" moment becomes a separate, one-time broadcast sent to the full list at launch, tracked in
Doc 09 (Phase Transition Plan), not part of this automated sequence.

| # | Timing | Purpose | Content |
|---|---|---|---|
| 1 | Immediate | Confirm + set expectations | You're on the list. You'll get the download link the moment it's ready, plus this same handful of emails over the next couple weeks, no spam. Matches the landing page risk-reversal line exactly. |
| 2 | Day 2–3 | Founder story | Short: why Debrief exists, cold calls daily for Fielder, got sick of the manual admin. Same founder-credibility line from offer doc Section 11, repurposed for email. |
| 3 | Day 5–7 | Real value, no pitch | One specific, real cold-calling/sales tip from actual reps (e.g. closing Savio, working the 122-lead list). Proves worth following, does the actual work of the sequence. |
| 4 | Day 10–12 | Low-pressure content push | Point to YouTube/TikTok/Instagram, whichever's easiest to follow. "I post this daily if you want more," not "subscribe." |
| 5 | Day 14 | Soft loop-close (required, not optional) | Sets expectation that the automated sequence ends here. Will only email again for a major update (app launch/download availability) or something genuinely worth saying. |

**Separate from this automation:** the launch-day broadcast (real download link, sent once to
the full list when the app ships) is a manual/triggered ConvertKit broadcast, not part of the
welcome automation. This is the actual mechanism that converts a Phase 1 waitlist subscriber into
a Phase 2 downloader, defined fully in Doc 09.

---

## 7. Confirmed vs. Pending

**Confirmed:**
- Two pages total in Phase 1: the homepage (single scroll, no persistent nav, 6 sections in the
  order above) and the dedicated Privacy & Open Source page (Section 2a)
- Privacy & Open Source is its own page with its own URL/title/meta, not a homepage section
  (corrected this session)
- FAQ sourced from existing offer document material
- FAQ accordion is independent (any number open at once), locked this session (Doc 06 §7)
- Risk-reversal micro-copy placed under the form CTA, matched word-for-word in shape to Email 1
- 5-email nurture sequence, all required, launch-day download broadcast handled separately
- Hero headline and fragment content locked this session (see Section 2 above and Doc 07)
- Demo 4 placement locked this session: inside Problem/Mechanism, after Demo 1 (Doc 06 §8)

**Pending:**
- ~~Final copy for every section (Doc 07)~~ — resolved, Doc 07 has full section copy.
- ~~Exact FAQ answer wording (Doc 07...)~~ — resolved, Doc 07 has all 5 final FAQ answers.
