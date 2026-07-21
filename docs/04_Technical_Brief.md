# Debrief — Technical Brief
*Doc 04 of 11, Website Documentation Set*

---

## 1. Stack

**Plain HTML/CSS/JS. No framework, no build step.**

**Two pages in Phase 1 (corrected this session — was previously scoped as a single page):** the
homepage (`index.html`, a single scrolling page matching Doc 03's 6-section structure) and a
dedicated privacy/local-processing page (own HTML file, own URL, own title/meta, per Doc 01/02/03
§2a). No animation library dependency, scroll reveals (fade/slide-up as sections enter viewport)
built with vanilla JS Intersection Observer + CSS transitions. Reserve GSAP/Framer Motion/Lenis
for Phase 2, once there's a real product to showcase and the heavier build pays for itself.

```
/
├── index.html
├── /local-transcription/index.html   (or similar slug, the dedicated privacy page, Doc 03 §2a,
│                                       exact slug still an open naming choice)
├── /css
│   └── styles.css        (shared between both pages)
├── /js
│   └── main.js          (scroll reveal via Intersection Observer, nothing else)
├── /images               (favicon, OG banner only, no hero screenshot, see Doc 08)
└── /favicon + OG asset
```

---

## 2. Hosting & Deployment

- GitHub Pages, deployed from `github.com/veeralspatel/debrief`, personal account
- Custom subdomain via CNAME (`debrief.veeralspatel.com`)
- Push to GitHub → auto-deploy, no manual step
- HTTPS handled automatically

---

## 3. Lead Capture Form Integration

ConvertKit's own embedded signup form (JS embed), styled to match the site's design system
rather than left as ConvertKit's default look. Appears once, in the Waitlist Form / Final CTA
section per Doc 03. No Tally, no n8n, no Airtable, no custom backend, ConvertKit handles opt-in,
list, and the 5-email nurture automation natively.

---

## 4. Performance & Image Handling

- Hero and demo visuals are coded HTML/CSS/JS fragments (Doc 05 §4, Doc 06 §9), not raster
  screenshots, so there's nothing to compress or lazy-load for the hero itself
- The only real image assets on the page are the favicon and Open Graph banner (Doc 08),
  compress and use modern formats for those specifically
- No video, confirmed (not just an assumption): nothing else in the doc set calls for one, and it
  would cut against the coded-fragment philosophy (Doc 06 §8) that everything shown is DOM/CSS,
  not media. Revisit only if a future phase has a specific reason to add one.
- Minimal third-party scripts: ConvertKit embed, analytics, nothing else

---

## 5. Structured Data (Schema)

Required for launch, per Doc 02 Section 5:
- **SoftwareApplication** schema on the homepage
- **FAQPage** schema on the homepage FAQ section
- **FAQPage** schema on the dedicated privacy page too, if it carries its own FAQ content
  (corrected this session to reflect the privacy page now being a separate page, Doc 03 §2a)
- No LocalBusiness/NAP schema, not applicable to a downloadable app
- Validate all schema with Google's Rich Results Test before launch

---

## 6. On-Page Technical Requirements

- Clean canonical URL per page, root domain for the homepage, its own slug for the privacy page
  (corrected this session — Phase 1 is two pages, not one, see §1)
- Unique `<title>` and meta description **on each page**, within Doc 02's length targets (title
  ~60 chars, description ≤150 chars) — the privacy page's meta must target its own keyword
  cluster (Doc 02 §2), not repeat the homepage's
- Open Graph tags, important here since the site gets shared directly via the Instagram/TikTok
  funnel, link previews need to look right
- Canonical tag on each page, no www/non-www duplication
- No accidental noindex on either page
- Custom 404 page (relevant now that there are already two real pages with an internal link
  between them, not just once Phase 2 adds `/download`)
- XML sitemap submitted via Search Console, now two URLs instead of one, still minimal but
  correct ahead of Phase 2 adding more

---

## 7. Analytics & Tracking

- **Google Analytics 4, locked this session.** Universal Analytics was sunset in 2024, GA4 is the
  only real option, this was previously just "Google Analytics" with no version specified.
- Google Search Console connected.
- **Event list, locked this session (previously only the one conversion event was named):**
  - `waitlist_submit` — the primary conversion event, validates the Doc 02 SEO investment
  - `cta_click` — hero and final-CTA button clicks, separates "clicked" from "converted"
  - `outbound_github_click` — the footer GitHub link, the main proof-of-openness moment
  - `privacy_page_view` — visits to the dedicated `/local-transcription` page, a direct read on
    whether Doc 02's highest-priority keyword cluster is actually landing people there
  - `faq_expand` — which FAQ question opens, useful signal for what visitors are actually
    unsure about
- **Measurement ID:** can't be set until the actual GA4 property is created in Veeral's Google
  Analytics account, that's a real account-setup action, not a doc decision, tracked as a Doc 10
  build step (Phase 8).
- Goal tracking: waitlist form submission (`waitlist_submit`) is the primary conversion event,
  this is what actually validates the Doc 02 SEO investment, not raw traffic alone.

**Cookie consent, new this session (GA and the ConvertKit embed both set cookies, site is
EU-reachable, decided to add a real consent mechanism rather than ship without one):**
- A simple accept/reject banner, shown on first visit, persists the choice (localStorage,
  no cookie needed just to remember the cookie choice).
- **GA does not load until consent is given.** ConvertKit's embed is treated as functionally
  necessary (it's the entire point of the page, joining the waitlist), so it loads regardless,
  but the Privacy Policy discloses this plainly rather than hiding it.
- Reject choice is respected, no GA fires, no dark-pattern reload-until-you-accept behavior.
- Visual spec for the banner itself lives in Doc 06's new consent-banner section.
- Not formal legal advice, this is a common, reasonable implementation pattern for a small site,
  not a substitute for an actual legal read if this matters a lot.

---

## 8. Mobile Behavior

No sticky elements, no persistent nav, per Doc 03. The scroll-reveal treatment is lightweight
enough to work identically on mobile without a separate degraded version, unlike the Phase 2
blueprint's heavier animation, which does need a simplified mobile fallback.

---

## 9. Pre-Launch Technical Checklist

- [ ] Title and meta description within length targets
- [ ] SoftwareApplication and FAQPage schema validated via Rich Results Test
- [ ] ConvertKit form tested and submitting correctly
- [ ] Open Graph tags confirmed correct via a real link-preview test (share the URL in a private
      Instagram/TikTok DM to check rendering)
- [ ] Google Analytics + Search Console connected, waitlist submission tracked as a goal
- [ ] Lighthouse/PageSpeed run, address any major flags
- [ ] No accidental noindex, no broken internal links
- [ ] Favicon and OG banner compressed, modern format (per §4, these are the only two real
      image assets on the page; there's no lazy-loading story here since neither sits below the
      fold, the OG banner isn't even rendered in-page, it's only read by crawlers/link previews)
