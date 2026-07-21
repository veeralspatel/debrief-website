# Debrief Website — Build Instructions

This folder is the marketing/waitlist website for **Debrief**, a free, open-source desktop call
recorder and transcriber (Mac + Windows). The full doc set (`00`-`10` below, plus `hormozi/`) was
audited end-to-end on 2026-07-21: every vague placeholder, stale cross-reference, and real
contradiction was found and resolved. **This folder is now decision-complete and ready to build
from.** Read this file first, then start with `00_Claude_Code_Kickoff.md`.

## The single most important rule

**`/Users/veeral/Desktop/Debrief`** (note: no "Website" in that name) is a **separate, read-only**
folder containing the actual app's own product and design blueprints — `debrief-offer-document.md`,
`debrief-landing-page-blueprint.md`, `app-icon-concepts.html`, dark-mode UI state files, and an
app-side `design-system.html` that specs the Electron app's own UI. **Never edit, move, or delete
anything in that folder.** It's cited throughout this doc set as read-only source material. This
website's own design system lives entirely in `06_Design_System_Spec.md` — don't confuse the two
`design-system.html`-adjacent documents, see that doc's header for the full explanation.

## Doc set (read in this order)

| Doc | Covers |
|---|---|
| `00_Claude_Code_Kickoff.md` | Pre-build checklist: repo/hosting, brand asset export, skill installs, context file, copy QA pass, GitHub issues |
| `01_Site_Master_Brief.md` | Product/site purpose, audience, branding, phases, offer-strategy (Hormozi) alignment |
| `02_SEO_Strategy.md` | Keyword clusters, on-page SEO, competitor landscape, directory-listing thresholds |
| `03_Site_Content_and_Flow_Brief.md` | Page/section structure (two pages: homepage + dedicated `/local-transcription` page), content plan, nurture sequence |
| `04_Technical_Brief.md` | Stack (plain HTML/CSS/JS, no framework), hosting, schema, analytics, cookie consent |
| `05_UI_UX_Design_Brief.md` | Design principles, color/type rationale, the "interface fragments as environment" concept, mobile behavior |
| `06_Design_System_Spec.md` | **The only source of truth for tokens/components.** Colors, type scale, spacing, buttons, forms, FAQ, demo system, accessibility, consent banner |
| `07_Copy_Deck.md` | **The only source of truth for wording.** All page copy, FAQ, nurture emails, Privacy Policy, meta tags |
| `08_Image_Asset_Manifest.md` | App icon export spec, favicon set, OG banner |
| `09_Phase_Transition_Plan.md` | What changes when the app ships (Phase 1 → Phase 2 cutover) |
| `10_Implementation_Plan.md` | **Start here for the actual build.** Phase-by-phase sequence (Phase 0–11), each step cites the doc section it implements |
| `demos.html`, `demos-2.html` | Real, working reference code for Demo 1-4 — open directly, these are accurate, not mockups |
| `hormozi/` | Source frameworks ($100M Offers/Leads/Money Models, voice guide) already applied throughout the doc set |

Every doc has inline **"locked this session"** / **"corrected this session"** annotations marking
what the 2026-07-21 audit changed and why — read those in place rather than assuming a doc's
original prose is still accurate on first glance, several sections were corrected in-line.

## Two things still need real input before those specific pieces are finished

Check whether Veeral has since supplied these before treating them as blocking:

1. **Nurture Email 3** (`07_Copy_Deck.md`) needs a real, specific cold-calling/sales tip from his
   own experience. Standing no-fabrication rule — do not invent one, leave the placeholder.
2. **Privacy Policy contact email** (`07_Copy_Deck.md`, new Privacy Policy section) needs a real
   address. Same rule — do not invent one.

Everything else in the doc set is locked. If either of these is still unresolved when reaching the
relevant build phase, stop and ask rather than filling in a placeholder value.

## Skills to use during the build

- **`ui-ux-pro-max`** — use for stack-specific implementation guidance (this is a plain
  HTML/CSS/JS build per Doc 04, no framework) and to sanity-check any *new* UI decisions that come
  up mid-build against its accessibility/touch-target/layout checklists. Doc 06 §11's design
  review already ran this once at the spec level; re-run it against actual built code before
  shipping (Doc 10 Phase 9).
- **`impeccable`** — use for the actual frontend build/craft work. It ships a design-detector hook
  that flags contrast, touch-target, and layout-thrashing issues automatically as files are
  edited, which is exactly the category of gap the 2026-07-21 audit caught by hand (two WCAG
  contrast failures, two touch-target failures) — let the hook catch new instances of the same
  class of bug live instead of relying on another manual pass. Read `06_Design_System_Spec.md` as
  the existing, locked design system before it tries to invent its own; this project has already
  been through the "avoid generic AI-design defaults" check (Doc 06 §11), don't redo that from
  scratch, extend it.
- **`frontend-design`** (Claude Code plugin) — was not enabled in the audit session's environment;
  check whether it's available now. If so, invoke it directly for any new visual/component work.
  If not, its methodology is already applied manually and documented in Doc 06 §11 (two-pass
  token system, "avoid generic AI-design defaults" checklist, "hero is a thesis" heuristic) —
  apply the same standard by hand.
- **`awesome-design-md`** — not a skill, a reference library of real product DESIGN.md files
  (fetchable at `getdesign.md/<product>/design-md`). Already pulled Raycast and Vercel for
  comparison in Doc 06 §11. Useful if more real-world reference points are needed for any new
  visual decision that comes up mid-build.

## Where to actually start

1. `00_Claude_Code_Kickoff.md` §A through §F (repo/hosting setup, brand asset export, skill
   installs, context file, copy QA pass, GitHub issue structure).
2. Then `10_Implementation_Plan.md` Phase 0 onward, in order. Each phase step cites the exact doc
   section it implements — follow those citations rather than re-deriving decisions that are
   already locked.
