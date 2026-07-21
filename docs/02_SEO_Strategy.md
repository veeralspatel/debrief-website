# Debrief — SEO Strategy
*Doc 02 of 11, Website Documentation Set. Synthesized from a 45-keyword competitive audit:
397 organic results collected, 351 kept after excluding app stores/social/support docs, 159
tagged Competitor/Content/Directory/Forum and sent to crawl, 94 pages successfully crawled.*

---

## 1. Business Context & Positioning

See Doc 01 for full context. In short: Debrief is a free, open-source desktop call
recorder/transcriber, competing on the same ICP as Otter.ai and Google Meet's free-tier
transcription users, not a narrow sales-tool niche. This audit's findings confirm that framing,
the audience searching these terms spans far beyond sales/cold-calling into general productivity
and privacy-conscious users.

---

## 2. Keyword Strategy

**44 target keywords across 7 clusters** ("Grain alternative" dropped, zero relevant results,
Google reads it as food grains, not Grain.com):

- **Core category** (6): call recording app, call recorder software, meeting recorder, call
  transcription software, audio transcription app, record and transcribe calls
- **Free modifier** (8): free call recorder, free call recording software, free call
  transcription app, free meeting transcription, unlimited call recording free, call recorder no
  subscription, free voice call recorder mac, free voice call recorder pc
- **Sales/cold-calling** (6): record sales calls software, cold call recording app, sales call
  transcription tool, call coaching software free, record and review sales calls, best app to
  record sales calls
- **Comparison/alternative** (8): Otter.ai alternative free, free alternative to Otter.ai,
  Otter.ai alternative for Mac, Fireflies.ai alternative free, Google Meet transcription
  alternative, Gong alternative free, tl;dv alternative, Fathom alternative free
- **Platform-specific** (5): call recorder for Mac, call recorder for Windows, desktop call
  recording software, record phone calls on Mac, record iPhone calls on Mac
- **Privacy/local-processing** (5): offline call transcription, local transcription app no
  cloud, private call recording software, open source call recorder, open source transcription
  app
- **Long-tail informational** (6): how to record and transcribe phone calls, how to record sales
  calls for free, how to transcribe cold calls, best free call recording software, how to record
  iPhone calls on Mac, how to review my sales calls

**Priority tier:** Privacy/local-processing cluster is highest priority, this is where Debrief
has a genuine, defensible ranking opportunity (see Section 6). Free-modifier and
comparison/alternative clusters are second priority, high competition but directly on-ICP. Core
category and long-tail are lower priority, broad and heavily contested by household names.

---

## 3. Page Strategy (scope change from Doc 01)

**New in Phase 1:** a dedicated landing page targeting the privacy/local-processing cluster
specifically, built around genuine on-device/no-cloud/open-source claims rather than the generic
"privacy" language competitors use as boilerplate. Doc 01 Section 5 has been updated to reflect
this addition.

---

## 4. On-Page SEO Guidelines

- **Meta descriptions:** ≤150 characters. Average across 91 crawled competitor pages is 149.4,
  close to the ~155–160 char display cutoff.
- **Meta titles:** current target (~60 chars) already matches the winning average (56.9 chars
  across crawled pages), no change needed.
- **FAQ blocks:** any comparison-style or how-to content should carry an FAQ section. 41.8% of
  crawled pages use FAQPage schema, concentrated almost entirely on comparison and long-tail "how
  to" content, exactly where Google surfaces rich FAQ snippets.
- **Differentiation language:** avoid leading with "free" alone, it's table stakes (2,105
  mentions across crawled pages, the single most common positioning term). Lead with genuinely
  local/no-cloud/open-source positioning instead, these terms are the rarest in the entire
  crawled set (12 and 4 mentions respectively), meaning almost nobody is actually saying them as
  a structural claim.

---

## 5. Technical SEO Checklist (feeds Doc 04)

- `SoftwareApplication` schema on the main product page. Only 19.8% of competitor pages carry
  this even when effectively selling a product, low-hanging, easy differentiator.
- `FAQPage` schema on the comparison/how-to and new privacy-cluster page.
- Standard technical items carried from the Fernz template: clean URLs, canonical tags, XML
  sitemap, custom 404, no accidental noindex.
- No local business schema needed (no location/NAP for a downloadable app).

---

## 6. Competitor Landscape

**The real competitive set is broader than the 10 originally named competitors.** ~40 additional
software competitors surfaced that weren't on anyone's radar, most notably:

- **withallo.com ("Allo")** — the standout. Ranks for 14/45 keywords (3rd overall, behind only
  Reddit and Quora), best position #1, entirely through four self-authored "best call recording
  software" roundup posts. Worth studying these four URLs directly for structure and internal
  linking, one product is outperforming most full competitor suites through content alone.
- wave.co, read.ai, notta.ai, meetjamie.ai, plaud.ai, cubeacr.app: next tier, none in the
  original 10.
- Otter.ai, despite being the most-named brand in comparison searches, only ranks for 8/45
  keywords, challenger content and roundups outrank the household name on its own comparison
  terms.

**Reddit (68 appearances) and Quora (23) are the #1 and #2 most-frequent domains overall**,
ahead of every product. Google's forums/discussions module is doing real work here. This is a
distribution/community opportunity, not a website build item, tracked separately from this doc
(similar to the Instagram funnel), a genuine, non-astroturfed presence in relevant subreddits
(r/androidapps, sales-tooling communities) is plausibly worth more than another landing page.

---

## 7. Common Mistakes to Avoid

- Don't lead with "free" as the core pitch, it's undifferentiated.
- Don't use generic "privacy" language, most competitors already do this loosely (603 mentions)
  without backing it with a real on-device claim, be specific instead ("processed entirely on
  your device, nothing uploaded" beats "we care about your privacy").
- Don't skip schema markup assuming it doesn't matter, 84.6% of crawled pages carry some schema,
  it's close to universal among what's actually ranking.

---

## 8. Directory & Community Listings (deferred to Phase 2)

G2, Capterra, TrustRadius, GetApp, Software Advice, Product Hunt, and AlternativeTo all showed up
as relevant SEO/discovery surfaces in the crawl. All deferred to Phase 2, including AlternativeTo:
most need real user reviews or a working download to be worth anything (G2/Capterra/
TrustRadius/GetApp/Product Hunt), and keeping the Phase 1 launch checklist lean and fast wins
over squeezing in the one that technically could ship early.

**Threshold defined this session (previously just "enough real usage," no number):** revisit
directory listings at whichever comes first, 500 real downloads, or 90 days after the app ships.
The number matters less than having genuine usage to point to, this is a floor to stop the
question from staying open indefinitely, not a hard trigger that must fire the moment it's hit.

---

## 9. Launch Checklist

- [ ] Schema validated (SoftwareApplication, FAQPage) via Google's Rich Results Test
- [ ] Meta titles/descriptions within length targets on every page
- [ ] XML sitemap submitted via Search Console
- [ ] Privacy/local-processing landing page live and targeting its 5 keywords
- [ ] Directory listings confirmed deferred to Phase 2 (not a launch blocker)

---

## 10. Open Items

- Reddit/Quora community engagement strategy: real, worth doing, tracked outside this doc set.
  No doc in this set owns tracking it; noted here as a deliberate exclusion, not a gap.
- ~~Doc 03 needs to define the privacy page's actual content plan~~ — resolved, Doc 03 §2 has the
  full content plan. **Correction (this audit):** Doc 03 had folded this content into a homepage
  section rather than keeping it a dedicated page as this doc and Doc 01 specify. Decided this
  session: it stays a **dedicated page** with its own URL/title/meta, per this doc's own
  "highest priority, genuine defensible ranking opportunity" framing (Section 2). Doc 03 and
  Doc 04 have been corrected to match.
