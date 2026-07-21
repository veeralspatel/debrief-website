# Debrief — Claude Code Kickoff
*Doc 00 of 11, Website Documentation Set. Read this first, before Phase 0 of `10_Implementation_
Plan.md`. Covers everything that has to happen in/around Claude Code itself before the build phases
start.*

**Do these in order. Don't skip to Phase 0 until §A-§B are done and §C-§F are at least
started.**

---

## §A — Repository & Hosting

1. Repo already exists: `github.com/veeralspatel/debrief`, personal account, private during
   build, public at launch (Doc 01 §6).
2. Upload the full doc set into the repo (a `/docs` folder Claude Code can read): Docs 00-10, plus
   the visual reference files that actually exist in this folder: `demos.html`, `demos-2.html`.
   Three files cited elsewhere in this doc set as source material — `app-icon-concepts.html`,
   `debrief-offer-document.md`, `debrief-landing-page-blueprint.md` — live in the separate
   `/Debrief` app blueprint folder, not this one. They're read-only reference material (never
   edited), so cite them, don't copy them into this repo. `hero-concept.html` does not exist
   anywhere yet, despite being referenced as "locked" elsewhere in this doc set, see Doc 07's
   Open Items, resolving it is tracked as its own task, not a §A blocker.
3. Set up GitHub Pages on the repo, connect the custom subdomain (`debrief.veeralspatel.com`)
   via CNAME, confirm auto-deploy fires on push before any real content exists, per Doc 04 §2.

---

## §B — Brand Asset Resolution (do this before Phase 0, not during)

Unlike the Fernz project, there's no bad-source-file problem here, the app icon is already
cleanly designed (speech bubble with waveform glyph, red gradient light/default, deep garnet
dark mode Mac-only), just not yet exported to the formats the website needs.

**Workflow:**
1. Export the locked icon (source: `app-icon-concepts.html`, in the `/Debrief` app blueprint
   folder, not this one) to a clean, transparent, full-resolution master.
2. From that master, generate: the favicon set (32×32, 16×16, apple-touch-icon 180×180) and the
   base mark used inside the Open Graph banner.
3. Build the OG banner at exactly 1200×630 per Doc 08, dark background, icon mark, short
   headline variant, no product screenshot (consistent with the coded-fragment philosophy, this
   isn't a UI mockup, it's a share card).
4. Verify both render cleanly, and test the OG banner with an actual link-preview check (share
   the URL in a private Instagram/TikTok DM) before treating this as done, per Doc 04/08's
   checklist item.

---

## §C — Marketing/Copy Skills Install

Same mechanism as the Fernz project, lighter selection, since this is a solo build rather than a
client engagement.

```bash
npx skills add coreyhaines31/marketingskills --skill copywriting copy-editing cro schema -a claude-code
```

Add one single-file skill manually:
- **`copychief`** (from `robpalmer99/claude-code-copywriting-skills`) — line-by-line copy
  review, used as the final QA pass on `07_Copy_Deck.md`, not for drafting.

**Skip `ogilvy`** this time, it's tuned for the Fernz project's trustworthy-tradesman register.
Debrief's voice is direct-response and Hormozi-informed (Doc 07's voice rules), a different
register, no drafting-anchor skill substituted, the doc set's own voice rules carry that weight
instead.

---

## §D — Context File

Create `.agents/product-marketing.md` (or wherever the installed skill version reads, check its
own README) so every skill in §C reads this before doing anything:

```markdown
# Debrief — Marketing/Copy Context

**Business:** Free, open-source desktop call recorder and transcriber (Mac + Windows), built
solo by Veeral. Dual purpose: real productivity tool and lead magnet, email capture is the
actual commercial objective.

**Audience:** Same rough ICP as Otter.ai or Google Meet's free-tier transcription users, not a
narrow niche. Salespeople and cold callers are a strong example use case, not the exclusive
frame. Secondary, self-selecting overlap with Veeral's build-in-public following, the page must
stand alone for a cold visitor who's never seen that content.

**Voice:** Confident, benefit-driven, direct-response, Hormozi-informed. Not hype-y, not
casual-influencer voice. Lead every section with the benefit, the feature is the proof, not the
headline. Plain, literal CTAs, "Join the waitlist" not "Get Started."

**Hard rules, do not violate regardless of what a framework suggests:**
- No em dashes anywhere, ever. Commas, periods, or two sentences instead.
- No fabricated social proof, no exceptions, standing rule.
- Don't invent Email 3's cold-calling tip, or any other specific claim not actually true. Leave
  a clearly marked placeholder instead.
- Specific beats vague, always ("processed entirely on your device" not "private and secure").
- Red never appears on a clickable element, blue is the only click color on the site.
- IBM Plex Sans and JetBrains Mono only, never Inter.
- Full copy on mobile, never a thinner version.

**Copy craft rules:**
- **Rule of One**: every section pushes one core idea, sub-points reinforce it.
- **Show, don't tell**: a specific fact beats an adjective every time.
- **One CTA per section.**
- **Cut intensifiers** ("very," "really," "truly") wherever they don't add real information.

**Source of truth:** the full numbered doc set (`01`-`10`), especially `07_Copy_Deck.md` for
actual wording. If a skill's output conflicts with these, the docs win.
```

---

## §E — Copy Deck QA Pass (do before Phase 6 of the Implementation Plan)

1. Run `07_Copy_Deck.md` through the `copy-editing` skill for tightening.
2. Run the result through `copychief` for a line-by-line critique.
3. Independent readability check via Hemingway Editor (external). **Target defined this session
   (previously no number given):** grade 6-8 as a soft reference point, not a hard gate, matches
   general marketing-copy norms for a broad professional audience that scrolls fast (Doc 01).
   Same caveat as the Fernz project still applies: don't dumb down specific, deliberate phrasing
   like "processed entirely on your device" just to shave a grade level off the score.
4. Email 3's placeholder and the Privacy Policy page's contact-email placeholder stay untouched
   by this pass, they're explicitly not ready for copy QA yet (Doc 07 open items). **Correction
   (this audit):** the Fielder footer line was previously listed here too, it's locked now
   (confirmed as drafted, no change), no longer a QA exclusion.

---

## §F — GitHub Issues Structure

Same discipline as the Fernz project, confirmed to keep.

**Structure:**
- **Milestones = Phases.** One Milestone per Doc 10 phase (0 through 11).
- **Issues = each phase's numbered steps**, near copy-paste from the Implementation Plan.
- **Sub-issues where genuinely multi-part**: the four demos in Phases 2-4 each warrant their own
  sub-issue, since each has its own build and QA surface.

**Labels:**
- `launch-blocker` — schema validation, ConvertKit form testing, OG preview test, anything
  Phase 9-11 flags as pre-launch critical
- `content-pending` — Email 3's tip, the Privacy Policy page's contact email, anything else
  flagged pending in the doc set (**correction:** the Fielder footer line was previously listed
  here, it's locked now, no longer pending)
- `asset-fix` — the favicon/OG banner export in §B

**One pinned issue, titled `PENDING — do not ship as final`:** running checklist of Email 3's
placeholder, the Privacy Policy contact email, and anything else marked `content-pending`,
checked before the Phase 10 QA pass and before Phase 11 launch.

---

## Once §A-§F Are Done

Proceed to `10_Implementation_Plan.md` Phase 0.
