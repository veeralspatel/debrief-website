# Debrief — Image & Asset Manifest
*Doc 08 of 11, Website Documentation Set*

---

## Governing Rule

**The product itself is shown through coded interface fragments (Doc 05 §4, Doc 06 §9), not
screenshots.** Every "visual" of the app on this page, the hero fragments, all four demos, the
micro-loop, is HTML/CSS/JS rendering in the browser, not an image file. This manifest is
deliberately short as a result, it covers the small number of assets that genuinely have to be
real files: the app icon's derived formats, the favicon set, and the Open Graph banner. There
is no hero screenshot, no product photography, no job/action shots, this doc's Fernz equivalent
was mostly about photography, this one is mostly about one already-locked icon and where it
needs to be exported to.

---

## App Icon (source asset, already locked)

**Design, locked in the app's own design system:** speech bubble containing four vertical
waveform bars, matching the waveform player used throughout the app. Red gradient for light
mode / default, deep garnet for dark mode (Mac only). Source reference: `app-icon-concepts.html`,
in the separate `/Debrief` app blueprint folder, not this one (shared asset, since it's the same
icon used by the app itself, not website-specific).

**Status: design locked, export formats not yet produced.** Before Doc 10 (Implementation Plan)
reaches the asset-export step, this icon needs to be exported at the sizes below.

**Master export spec (defined this session, standard convention, not previously specified):**
1024×1024 PNG, transparent background, sRGB color profile. This is the source every derived size
below is generated from (never re-export from a smaller derived size). Keep the light/default
gradient variant as the master; the dark-mode garnet variant is Mac-only and app-side, not needed
for website assets.

| Export | Size | Use |
|---|---|---|
| Favicon | 32×32, 16×16 (ico), 180×180 (apple-touch-icon) | Browser tab, bookmarks, iOS home screen if saved |
| OG banner base mark | Icon at full resolution, transparent | Composited into the OG banner below, not used standalone at social-share size |

---

## Open Graph Banner (needs creating, not yet built)

**Size: exactly 1200×630.** Not recropped from anything else, composited fresh.

**Why this matters more than usual for this site:** the site is shared directly through the
Instagram/TikTok comment-to-DM funnel and the personal-brand content channel (Doc 07's Email 4),
so the link-preview card is a real first impression, not a nice-to-have.

**Content direction:** dark background (`#0A0A0B`, matching the site), app icon mark, headline
text **locked this session:** "Press record. Everything else happens on its own." (the
mechanism-reveal line already used as a section headline in Doc 07), no screenshot needed here
either, keep it consistent with the coded-fragment philosophy rather than dropping in a UI
mockup.

**Pre-launch checklist item (feeds Doc 04 §9):**
- [ ] OG banner built at exact 1200×630, tested via a real link-preview check (share the URL in
      a private Instagram/TikTok DM before public launch, per Doc 04's existing checklist item)

---

## Favicon Set

Derived from the app icon export above. Standard set: `favicon.ico`, 32×32 and 16×16 PNG,
`apple-touch-icon.png` at 180×180. No separate design work, this is a mechanical export step
once the icon's source formats exist.

---

## What's Explicitly Not Needed for Phase 1

| Asset type | Why not |
|---|---|
| Hero screenshot | Replaced by coded fragments (Doc 05 §4) |
| Product demo video/GIF | Replaced by the coded demo system (Doc 06 §8) |
| Founder photo | No dedicated founder section in v1 (Doc 01 audience rule) |
| Job/action photography | Not applicable, this isn't a service business |
| Social proof imagery (logos, review screenshots) | Standing no-fabrication rule, no real base yet |

---

## Phase 2 Note

Once the app exists, Doc 05 already flags that real screen recordings *could* replace the coded
demos "if they even look better," this isn't guaranteed, the coded versions may remain the
better asset. If Phase 2 does introduce real screenshots or recordings, this manifest gets a new
section at that point, not before.
