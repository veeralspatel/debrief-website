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

## Known open items (do not fabricate, per standing rule)

- Nurture Email 3's cold-calling tip (ConvertKit side, not this repo, but tracked in Doc 07)
- Privacy Policy page's contact email — currently a placeholder in `privacy-policy/index.html`
- GA4 measurement ID — not wired in yet, needs a real property created in Veeral's account
- ConvertKit form action URL / form ID — currently a placeholder, needs the real embed
- Value stack's "$10 to $20/month" anchor number needs a real-figure check before launch (Doc 07)

## Hard rules

- No em dashes in copy, ever.
- Red (`#FF3B30`) never on a clickable element. Blue (`#0A84FF`) is the only click color.
- IBM Plex Sans + JetBrains Mono only, never Inter.
- No social proof, anywhere, no exceptions.
- Max 4 Tier-1 demos + 1 Tier-2 micro-loop total.
