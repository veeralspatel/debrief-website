# Debrief — Phase Transition Plan
*Doc 09 of 11, Website Documentation Set. This is the checklist for the one moment this site
changes fundamentally: the app shipping. Everything below was flagged as a Phase 2 item across
Docs 01-08, collected here so the transition is a checklist, not a redesign.*

---

## 1. Trigger

The app is built, tested, and ready for real users to download. This is the only trigger, there
is no calendar deadline (Doc 01 §9).

---

## 2. Site Structure Changes

- **Expand from the single trimmed page to the full scrollytelling blueprint**
  (`debrief-landing-page-blueprint.md`, built July 16, in the separate `/Debrief` app blueprint
  folder), per Doc 01 §5: Hero → Problem/agitation → Mechanism reveal → How it works → Value
  stack (AI feedback prompt as closing item) → Comparison table → Risk reversal → FAQ → Final CTA
  → Footer.
- **Add the `/download` page**: OS-detected single download button, Gatekeeper/SmartScreen
  bypass instructions, donation placeholder (platform deferred, decided this session, revisit at
  Phase 2 kickoff rather than now, it's genuinely not needed for months). **The actual manual
  OS-override link copy (the bypass instructions themselves) is also formally deferred, confirmed
  this session**, drafting exact wording now for a page and installer that don't exist yet would
  just need rewriting once both are real. Write it at Phase 2 kickoff alongside the broadcast
  copy (Section 7).
- **No founder credibility/photo section**, confirmed this session (see Doc 01 §3): this stays
  excluded in Phase 2 too, not just an unconfirmed Phase 1 assumption. The product sells on
  mechanism/value alone for a cold professional visitor.
- **Add back the dedicated Risk Reversal section** (full version, not just the micro-copy line
  used under the Phase 1 form).
- **Add the Comparison table** (Otter/Gong/Fireflies vs Debrief, per the offer document §5,
  never shown in Phase 1 since Doc 01 judged there was "nothing to compare to yet").
- **Add the "How it works" section**, folded into Problem/Mechanism in Phase 1, gets its own
  space in Phase 2's fuller layout.

---

## 3. CTA & Copy Changes

- **Primary CTA changes from "Join the waitlist" to OS-detected download.**
  **Correction (this audit):** this doc previously described the original 3-tier progressive-
  disclosure download design (Tier 1 one button, Tier 2 "prefer another way?" reveals
  Download/Terminal tabs, Tier 3 build-from-source link) from the launch plan. But the more
  recent landing page blueprint explicitly overrode that: "skip the tiered disclosure system from
  the original launch plan for v1, simple flow instead." Decided this session: **the simplified
  single-button flow is authoritative**, not the 3-tier design. A single OS-detected download
  button, with Gatekeeper/SmartScreen bypass instructions revealed only if needed, no separate
  terminal-install or build-from-source tabs for v1.
- **Risk-reversal micro-copy under the CTA changes**, the Phase 1 version promises "the download
  link the moment it's ready", that promise is now fulfilled, replace with real download
  micro-copy plus the friction-minimization pre-framing copy already planned for the unsigned
  installer.
- **Meta title/description update** to reflect download availability rather than waitlist intent
  (re-run Doc 02's keyword mapping against the live page once this happens, priority keywords
  don't change, but the meta copy itself should).

---

## 4. FAQ Changes

- **Add back the unsigned-installer FAQ**, deferred from Doc 07 (see that doc's Open Items):
  "The installer isn't signed, is it safe?" with the full answer including a real link to the
  download page's bypass instructions. This question was correctly cut from Phase 1 since
  nobody had an installer to worry about yet, it becomes relevant the moment downloading is
  real.
- "When can I actually download it?" FAQ entry gets removed, it's answered by the page itself
  now.

---

## 5. Technical Changes (feeds Doc 04 update at transition time)

- **GitHub Releases wired up** for installer hosting, per Doc 01 §6 (planned from the start,
  just not needed until now).
- **Animation upgrade**: Doc 04/05 deliberately used simple CSS scroll reveals for Phase 1's
  lean build. Phase 2 can move to the full bold GSAP ScrollTrigger/Framer Motion with Lenis
  smooth scroll treatment originally planned in the July 16 session, now justified since there's
  a real product to showcase and the heavier build investment pays for itself (Doc 04's original
  reasoning for deferring it).
- **Schema update**: `SoftwareApplication` schema gains real fields once they exist
  (`downloadUrl`, `operatingSystem`, `applicationCategory`), Doc 02/04's schema requirement was
  always written expecting this.

---

## 6. Visual/Asset Changes (feeds Doc 08 update at transition time)

- **Optional**: real screen recordings could replace the coded demos (Doc 05 explicitly left
  this open, "if they even look better," not a given they'll be swapped).
- **OG banner update**: Doc 08's Phase 1 banner has no download messaging, update the banner
  copy to reflect real availability once live.
- App icon export set (Doc 08) extends to actual installer icons (.icns for Mac, .ico for
  Windows) if not already produced during the app build itself.

---

## 7. Existing Subscriber Handling (the actual transition mechanism)

**This is the one piece that makes the transition real for people who already joined the
waitlist.** Per Doc 03 §6: a one-time, manually-triggered ConvertKit broadcast goes out to the
full existing list the moment the app ships, containing the real download link. This is
separate from the 5-email automation, which every Phase 1 subscriber has already completed or is
partway through by the time this fires.

**Checklist:**
- [ ] Broadcast copy drafted (not yet written, add to Doc 07 once this phase begins). **Confirmed
      this session:** formally deferred, not a gap, drafting real copy for a page/flow that
      doesn't exist yet would just need rewriting once the app is actually real.
- [ ] Broadcast copy's promise matches what Email 1 and the landing page originally told this
      exact list, don't introduce new terms at the finish line
- [ ] Sent to the full list in one broadcast, not folded into the ongoing automation

---

## 8. New Subscriber Handling (post-transition)

Anyone who signs up **after** the transition is signing up on the Phase 2 site, where downloading
is already live. Their version of Email 1 (Doc 07) needs updating: the original Phase 1 wording
("you'll get the download link the moment Debrief is ready") no longer applies, since it's ready
now. Update Email 1 to deliver the real download link immediately, matching the original
nurture-sequence sketch before the Phase 1 adaptation was made (Doc 03 §6's "adaptation note").
Emails 2-5 need no changes, they were never download-dependent.

---

## 9. Cutover Checklist

- [ ] Full Phase 2 site content built and reviewed against the scrollytelling blueprint
- [ ] `/download` page live and tested (OS detection, single-button simplified flow, not the
      3-tier design, per the correction in Section 3 above)
- [ ] GitHub Releases populated with real installers
- [ ] Schema updated and re-validated via Rich Results Test
- [ ] FAQ updated (installer question added, "when can I download" question removed)
- [ ] Email 1 updated for new subscribers
- [ ] Launch broadcast drafted, reviewed, and sent to existing subscribers
- [ ] OG banner and meta tags updated
- [ ] Directory/community listings from Doc 02 §8 revisited now that a real download and (over
      time) real reviews exist: AlternativeTo first, G2/Capterra/TrustRadius/GetApp/Product Hunt
      once the threshold defined this session is hit (500 downloads or 90 days post-launch,
      whichever comes first, per Doc 02 §8)
