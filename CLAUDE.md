# Debrief Website

Marketing/waitlist site for Debrief, a free open-source desktop call recorder and transcriber
(Mac + Windows). Plain HTML/CSS/JS, no framework, no build step. Hosted on GitHub Pages at
`debrief.veeralspatel.com`.

**This is a separate repo from `veeralspatel/debrief`**, which is the Electron app's own dev
repo (issue-tracked, different workflow). Don't confuse the two. This repo is just the static
marketing site.

## Source of truth

Full doc set in `/docs` (00-10, numbered, read in order). `06_Design_System_Spec.md` is the only
source of truth for tokens/components, `07_Copy_Deck.md` is the only source of truth for wording.
`docs/demos.html` and `docs/demos-2.html` are working reference code for the four coded demos,
already ported into `js/main.js` and the page markup.

## Structure

```
index.html                       homepage (hero, problem/mechanism, value stack, faq, waitlist)
local-transcription/index.html   dedicated privacy/local-processing SEO page
privacy-policy/index.html        legal page, noindex
404.html
css/styles.css                   shared tokens + all component styles
js/main.js                       scroll reveals, demos, FAQ accordion, cookie consent, form handling
images/                          favicon set + OG banner (generated from the locked app icon design)
```

## Deviations from the original doc set (post-audit, direct instruction this session)

- **Hero visual no longer matches Doc 06 §9's static tilted-fragment spec.** Replaced with a live
  ambient animation: idle record button -> click at ~2s -> live recording, a red waveform spawns
  at a fixed blue playhead (75% across) and pushes left continuously with real talk/pause cadence,
  fading out before the copy column. Runs once, then forever, no reset, no replay control (unlike
  the four numbered demos). Implementation in `initHeroAnimation()` in `js/main.js` and the
  `.hero-anim-*` / `.hero-wave-*` / `.had-*` classes in `css/styles.css`. The generic `.fragment`
  component (tilt, fade-bottom, parallax var) is kept in the CSS for any other recurring use, it's
  just no longer used in the hero.
- Real reference points used for this direction: granola.ai (sticky/updating content, soft
  section-color transitions) and wisprflow.ai (rounded overlapping sections, animated curved
  waveform-and-text motif). Full rounded/overlapping-section treatment elsewhere on the page was
  approved in scope but not yet built as of this note, revisit if picking this back up.
- **Known gotcha if extending this pattern elsewhere:** a scrolling bar-waveform confined to a
  narrow column (not the full viewport) will silently overflow-shrink every bar to invisible width
  if the bar count isn't derived from the container's real measured width. Always compute count
  from `container.getBoundingClientRect().width / (barWidth + gap)`, don't hardcode it.

## Known open items (do not fabricate, per standing rule)

All previously-tracked items here are resolved as of 2026-07-29: Nurture Email 3's cold-calling
tip is written (Doc 07), the Privacy Policy contact email is real (`hello@veeralspatel.com`), GA4
is wired (`G-CTZ8ZYQSD7`), and the "$10 to $20/month" anchor was verified against current
Otter.ai/Fireflies pricing. Next open items: HTTPS cert on the custom domain still shows
`https_enforced: false` per `gh api repos/veeralspatel/debrief-website/pages` (should self-resolve,
just check it), and whether Veeral wants the 5-email sequence actually built inside Kit's
automation UI (offered, not yet answered).

## Hard rules

- No em dashes in copy, ever.
- Red (`#FF3B30`) never on a clickable element. Blue (`#0A84FF`) is the only click color.
- IBM Plex Sans + JetBrains Mono only, never Inter.
- No social proof, anywhere, no exceptions.
- Max 4 Tier-1 demos + 1 Tier-2 micro-loop total.
