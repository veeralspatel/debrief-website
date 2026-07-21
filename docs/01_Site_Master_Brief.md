# Debrief — Site Master Brief
*Doc 01 of 11, Website Documentation Set. Read alongside the rest of the numbered doc set
(00–10). This doc supplies context; it doesn't repeat page structure (Doc 03), design (Docs
05–06), or copy (Doc 07) in detail.*

---

## 1. Product & Site Purpose

Debrief is a free, open-source desktop call recording and transcription app (Electron, Mac +
Windows), built solo by Veeral in his free time. It serves two purposes: a genuine productivity
tool for reviewing sales/cold calls, and a lead magnet, giving the app away free is the
mechanism, email capture is the actual commercial objective (Core Four / 100M Leads framing).
This website's job in Phase 1 is purely to capture emails onto a waitlist before the app is
ready to download.

---

## 2. Audience

**Primary ICP:** people starting or growing something who hit the wall on free-tier caps, minute
limits, and feature paywalls on tools like Otter.ai, Fireflies, Google Meet's transcription,
etc. Not limited to any one profession. Salespeople and cold callers are a strong use case
(reviewing their own calls), but so is anyone who wants to record and organize calls or meetings
without running into a paywall. Same rough ICP as Otter.ai or Google Meet's free-tier
transcription users, not a narrow "build-in-public follower" niche.

**Confirmed this session, worth stating explicitly:** this broad framing is a deliberate choice,
not an oversight. Two of the app blueprint documents in the separate `/Debrief` folder
(`call-recorder-launch-plan.md`, `phase1-call-recorder-spec.md`) describe a narrower target of
"18-25 aspiring entrepreneurs into build-in-public and cold calling." This website follows
`debrief-offer-document.md`'s broader framing instead (any solo founder, freelance setter, or
agency owner doing sales calls, no age framing), since it's the more detailed and more recently
written source for site copy. If anyone building from this folder later cross-references the
launch plan or spec and notices the narrower framing there, that's expected, not a conflict to
"fix" back toward this site. Website copy (Doc 07) has been checked against this decision (see
Doc 07's voice-check note).

**Secondary, self-selecting overlap:** people who already follow Veeral's build-in-public
content may come to the app *because* of that, but the app has to stand on its own for someone
who's never heard of him and found it through search. This lines up with the earlier landing
page session's decision to skip a founder-credibility section for v1, that call was already
made in the direction this audience definition points.

**Implication for Doc 02 (SEO Strategy):** competitor/keyword research needs to include Otter.ai,
Google Meet's transcription, and similar free-tier consumer tools directly, not just
sales-call-review niche tools (Gong, Fireflies, tl;dv). Broader, more consumer-facing search
intent than a narrow niche.

---

## 3. Fielder Cross-Link

Fielder (Veeral's separate company, Auckland trades business owners) surfaces contextually in
the email nurture sequence, letting relevant visitors self-select in. Never pushed on the main
site itself. Distinct audience and brand from Debrief, kept that way deliberately.

**Confirmed this session:** re-checked this call now that the audience is the broader
professional crowd rather than Veeral's build-in-public followers specifically. Decision:
keep it exactly this minimal, zero founder presence on the site itself, a brief founder story
only in Nurture Email 2, the Instagram mention in Email 4 stays but framed as fully optional.
This lets the product sell on its own mechanism/value for a cold professional visitor, matching
the audience rule in Section 2 above.

---

## 4. Branding

Personal brand, not a separate faceless org, this reinforces the build-in-public story the whole
project rests on.

---

## 5. Site Phases

**Phase 1 (this doc set, building now):** Pre-launch. App isn't downloadable yet. Primary CTA is
joining the waitlist. Trimmed site: hero, problem/mechanism, value stack, FAQ, waitlist form. No
download flow, no comparison table (nothing to compare to yet).

**Scope addition (per Doc 02, SEO Strategy):** Phase 1 also includes one dedicated landing page
targeting the privacy/local-processing keyword cluster (offline call transcription, local
transcription app no cloud, private call recording software, open source call recorder, open
source transcription app). The competitive audit found this cluster nearly empty of dedicated
competitor content despite being Debrief's core differentiator, worth the added page even at
this early stage. **Confirmed a real, separate page with its own URL/title/meta tags** (not a
homepage section) so it can rank on its own for this keyword cluster, which Doc 02 marks as the
site's highest-priority ranking opportunity. Content plan is in Doc 03 §2a.

**Phase 2 (later):** Site expands into the existing scrollytelling blueprint
(`debrief-landing-page-blueprint.md`, built July 16, lives in the separate `/Debrief` app
blueprint folder, not this one), full section list, OS-detected download buttons, comparison
table, bonus stack, risk reversal. Doc 09 (Phase Transition Plan) maps the exact add/swap
checklist between the two states.

---

## 6. Hosting & Domain

- GitHub Pages (landing page now, `/download` page added in Phase 2)
- GitHub Releases (installer hosting, added in Phase 2 once the app ships)
- Custom subdomain via CNAME (`debrief.veeralspatel.com`)
- Repo under Veeral's personal GitHub account, not a separate org

---

## 7. Lead Capture Stack

ConvertKit's own embedded signup form, used directly on the site. No Tally form, no n8n webhook,
no MX-record validation step, no Airtable mirror. ConvertKit handles the signup form, list,
opt-in, unsubscribe handling, and the nurture automation natively, no custom pipeline needed.

**Nurture sequence: 5 emails over ~2 weeks, then silence until there's something real to say.**
Full sequence structure (timing, purpose, content per email) is defined in Doc 03, Section 6.
Actual email copy is drafted in Doc 07.

*Out of scope for this doc set: the Instagram comment-to-DM funnel (Meta Private Reply API via
n8n) is separate infrastructure Veeral is handling on his own, not part of the site's lead
capture mechanism itself.*

---

## 7a. Offer Strategy (Hormozi Framework Alignment, decided this session)

The `hormozi/` reference docs were audited against the actual site plan. Three deliberate,
confirmed calls, not oversights:

- **No scarcity mechanism.** Debrief is free and unlimited forever, that IS the differentiator
  (Doc 02's research found almost no competitor makes this claim structurally). Manufacturing
  scarcity on top of an unlimited-forever product would undermine the promise. The pre-launch
  waitlist already carries natural "not available yet" timing on its own, nothing more needed.
- **No formal guarantee beyond the existing risk-reversal copy.** "No card, no account, no
  trial" already functions as the guarantee for a $0 product, there's nothing to refund. A
  formal money-back guarantee badge doesn't map to free software and would read as confusing.
- **Stays a pure lead magnet, no upsell ladder.** No backend paid product, no pricing anywhere
  in this doc set, confirmed intentional. Fielder is the only cross-link, and it's a different
  product for a different audience (Section 3 above), not an upsell path for Debrief itself.

The one Hormozi-checklist item that did change something: the Value Stack's stack-close line now
carries a real anchor number instead of staying purely qualitative (see Doc 07).

**Lead-gen channel check (100m-leads' "Core Four"):** the actual plan across this doc set leans
almost entirely on Post Free Content, organic SEO (Doc 02) plus Instagram/TikTok content with a
comment-to-DM automation layered on top (a content-driven hybrid, not true 1:1 cold outreach).
No paid ads anywhere in the plan, and no budget to fund them. This matches the framework's own
early-stage guidance better than it might first look: master one channel deeply before adding
more, and warm/cold 1:1 outreach doesn't scale for a broad-audience app the way it does for a
service business. Confirmed as the right fit, not a gap, no change needed.

---

## 8. Confirmed vs. Pending

**Confirmed:**
- App name: Debrief
- Free, open source, MIT license
- Personal brand, not standalone
- GitHub Pages + Releases (Phase 2) + custom subdomain
- Lead capture: ConvertKit embedded form only, no Tally, no n8n, no Airtable
- Mac code signing skipped pre-traction (revisit later if traction justifies the $99/yr)
- Credentials never touch the public repo, by architecture
- Audience is broader than the personal-brand following, same rough ICP as Otter.ai/Google Meet
  free-tier users

**Pending — still genuinely open:**
- Email 3's nurture content specifically — the other 4 emails are fully drafted in Doc 07; Email 3
  remains a marked placeholder pending a real, non-fabricated detail from Veeral, deliberately
  left open this session, see Doc 07's Open Items.

**Resolved this session:**
- ~~Nurture sequence copy/content itself~~ — Doc 07 has full drafted copy for 4 of 5 emails.
- ~~Full page list & content plan (Doc 03)~~ — Doc 03 has the full plan: homepage (6 sections) +
  a dedicated privacy/local-processing page (corrected this session, see Doc 03 §2a).
- ~~Privacy policy copy near the email field~~ — **decided this session: a real Privacy Policy
  page exists (drafted in Doc 07), but it's deliberately low-visibility, not placed near the
  homepage email field.** Linked only from nurture email footers and from the bottom of the
  dedicated Privacy & Open Source page. Confirm this placement reading is right, it's this
  session's interpretation of your instruction to keep it off the homepage.
- ~~AI-disclosure sentence~~ — confirmed this session: Doc 07's existing Privacy section language
  ("using an open-source model, not a cloud API") already satisfies this, no separate sentence
  needed.
- **New this session, not previously tracked:** cookie-consent banner added for GA/ConvertKit
  tracking (see Doc 04/06's new sections) given EU-reachable traffic.

---

## 9. Timeline

No firm external deadline. Self-paced, alongside the rest of the Debrief build.
