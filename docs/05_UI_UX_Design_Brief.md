# Debrief — UI/UX Design Brief
*Doc 05 of 11, Website Documentation Set. **Correction (this audit):** this previously cited a
companion visual reference `hero-concept.html` as "locked direction" — that file never existed
anywhere in either project folder. The hero direction is now locked directly in Doc 06 §9 and
Doc 07 (headline + fragment content, decided via a live side-by-side comparison, not a missing
reference file).*

---

## 1. Overarching Principle

Every visual decision serves either **credibility** (a solo open-source builder who looks
considered, not amateur) or **conversion** (getting the email). If it does neither, cut it.

**Motion rule, the one sentence governing everything interactive:** motion only where it proves
the product or confirms an action, stillness everywhere else.

---

## 2. Color System

Reuses the app's dark foundation for continuity with the interface fragments used throughout
the site, with red's role deliberately reassigned.

| Token | Hex | Use |
|---|---|---|
| Background | `#0A0A0B` | Base page background |
| Surface | `#131315` / `#151517` | Fragment/card backgrounds, section tonal shifts |
| Border | `#232326` (rest) / `#2E2E32` (hover) | Fragment and card borders |
| Text primary | `#F2F2F7` | Headlines, body |
| Text secondary | `#98989D` / `#6C6C70` | Subheads, muted copy |
| Text faint | `#48484A` | Timestamps, fine print |
| Blue (action) | `#0A84FF` | **All CTAs, links, form focus. The only click color.** |
| Red (thematic) | `#FF3B30` | **Recording motif only, never clickable** — pulsing dots, waveform accents, eyebrow markers |
| Green (status) | `#30D158` | Checkmarks, success states |

**Hard rule:** red never appears on an interactive element. Red evokes the product, blue drives
the action.

---

## 3. Typography

**IBM Plex Sans** — headlines and body. Chosen over Inter deliberately: Inter is the default
"AI-generated site" typeface right now, Plex has comparable clarity with an actual point of view,
and its slightly technical character fits an open-source dev tool.

**JetBrains Mono** — the technical accent thread: eyebrow labels, timestamps, filenames
(`transcript.md`), fine print under CTAs, demo UI chrome. Echoes the app's own monospace timer
digits. Small doses only, never headlines or body.

Weights: Plex 600 for headlines (tight letter-spacing, -0.02em), 400 for body. Mono 400-500,
often uppercase with +0.05-0.08em tracking at small sizes.

Both loaded from Google Fonts, subset to used weights only (performance, per Doc 04).

---

## 4. Signature Visual Concept — Interface Fragments as Environment

**No boxed screenshots anywhere.** The product appears as large, real interface fragments
(transcript cards, the record control, folder views) rebuilt in HTML/CSS, bleeding off viewport
edges, slightly rotated, layered behind and beside copy. The page reads as "looking into the
product," not "pictures of the product."

**Correction (this audit):** previously described as "locked in `hero-concept.html`", a file that
never existed. What's actually locked now (Doc 06 §9, Doc 07): a single fragment bleeding off the
right edge (-3° rotation, content fading at the bottom edge), showing the mid-recording state,
live record indicator and timer, MIC/SYS status, in-progress transcript lines, copy block in the
open space to the left. Whether the record indicator/timer reads as part of one unified card
(as compared live this session) or as a separate floating element anchored bottom-left (the
original two-piece composition this line described) is a small implementation detail still open,
not tested head-to-head, default to the single unified card unless it looks wrong once built at
real size. This treatment recurs down the page — different fragments paired with the sections
whose claims they support.

---

## 5. The Demo System

Sections that make a claim get a **coded, simulated demo** proving it — real DOM animation
rebuilding the app's locked designs, not video files, not GIFs, not AI-generated footage.
Honest (shows what the app actually does), sharp at any size, near-zero page weight, dark-mode
native. Real screen recordings can replace them in Phase 2 once the app exists, if they even
look better.

| Section | Demo | Proves |
|---|---|---|
| Problem/Mechanism | Full flow: mic source on → waveform animates live → transcript lines type in → file saves to folder | One button, no setup, it just works |
| Privacy/Open Source | Waveform flows inside a machine outline, never crosses to a crossed-out cloud; a "wifi off" toggle flips on mid-demo and everything keeps running | "Local" is structural truth, not marketing privacy-speak |

**Hard rules:**
- Max one demo per section. A demo exists only to prove a specific claim, never decoration.
- **Revised cap: 4 full (Tier 1) demos + 1 micro-loop (Tier 2) total in Phase 1**, expanded from
  the original 2 once the value stack's closing item and the auto-detect objection proved worth
  showing. This is close to the ceiling before the page reads as a slideshow, the mitigation is
  pacing, not restraint: real quiet copy sections must sit between every demo (see Doc 06 §8 for
  the placement rule). No sixth demo without cutting one first.
- Demos autoplay once on scroll-entry (Intersection Observer), with a replay control. Not
  scroll-scrubbed — that's Phase 2 scrollytelling territory.
- Value stack, hero, FAQ, and form get **no demos**, keeping the two real ones special.

---

## 6. Micro-Interaction Budget

**In (all respecting `prefers-reduced-motion`):**
- Hero: pulsing red record dot (~1.8s breathe), 2-3px parallax drift on fragments
- Value stack: checkmarks draw in on scroll (single SVG stroke, ~300ms), items lift 2px on hover
  with border brightening `#232326` → `#2E2E32`
- FAQ: accordion, 200ms ease, rotating chevron
- CTA button: the one element allowed a real hover moment (brightness lift on the blue); on
  submit, morphs inline to a success state, no page jump
- Links: underline-slide on hover
- Custom text selection color (red tint)
- Visible focus states throughout

**Explicitly out (the "AI site" tells):**
- Cursor followers, magnetic buttons, tilt-on-hover cards
- Particle/mesh/noise backgrounds
- Scroll-jacking, scroll-scrubbed timelines (Phase 2 decision, not Phase 1)
- Decorative animation that proves nothing

---

## 7. Layout & Section Rhythm

Dark throughout, no light/dark alternation. Separation via tonal shifts (`#0A0A0B` → `#131315`),
spacing, and typography. Copy column widths stay readable (~460-560px), fragments and demos take
the remaining space and are allowed to break the grid and bleed off edges. Generous vertical
rhythm, the page should feel calm between its two demo moments.

---

## 8. Trust Signal Placement

- **Open source:** GitHub link in footer, verifiable not claimed
- **Risk reversal:** the no-spam expectation line directly under the waitlist CTA (Doc 03 §3)
- **Privacy claims:** specific and structural, in the Privacy section with its demo (per Doc 02:
  "processed entirely on your device" beats "we care about privacy")
- **Founder authenticity:** subtle, never a dedicated section in v1 (Doc 01 audience rule)
- **No social proof anywhere.** Standing rule: nothing fabricated, and no real base exists yet

---

## 9. Mobile Behavior

Single column. Fragments scale down and lose rotation (straighten to 0°) below ~768px, bleeding
is reduced but kept where it doesn't hide content. **Bleed amount defined this session
(previously just "reduced," no number):** desktop bleeds full edge-to-edge past the viewport;
mobile insets the fragment 24px from the viewport edge instead of bleeding off it, so it reads
as a deliberate partial-bleed layout rather than a screenshot that got cut off. Demos play
identically — they're DOM animation, no video fallback problem. No sticky elements, CTAs in
hero and form sections only.

---

## 10. Microcopy Rule

Plain, confident, benefit-led. No em dashes (standing preference). Specific beats vague:
"processed entirely on your device" not "private and secure," "no card, no account, no trial"
not "risk-free."

---

## 11. What's Cut, and Why

| Pattern | Why |
|---|---|
| Inter as the typeface | The default AI-site font right now; Plex keeps the clarity with a point of view |
| Boxed/framed screenshots | Replaced by the fragment system — environment, not exhibit |
| Video/GIF demos in Phase 1 | Coded demos are honest pre-launch, sharper, and near-weightless; real recordings reconsidered in Phase 2 |
| AI-generated demo footage | Synthetic footage of a not-yet-real product drifts toward the fabrication line; Higgsfield reserved for Phase 2 brand/cinematic moments if wanted |
| Bold scrollytelling (GSAP/Lenis) | Phase 2, when there's a product to showcase (Doc 04) |
| Social proof | Standing no-fabrication rule + no real user base yet |
| Founder-credibility section | Page must stand alone for cold visitors (Doc 01) |
| Sticky nav / floating CTA | Single trimmed page doesn't need it |
| Cursor followers, magnetic buttons, particles, scroll-jack | AI-site tells, decorative noise |
| Red as a CTA color | Alarm connotations work against conversion; red is thematic only |
