# Debrief — Copy Deck
*Doc 07 of 11, Website Documentation Set. Drafted from the offer document
(`debrief-offer-document.md`, in the separate `/Debrief` app blueprint folder, read-only source),
Doc 01 (audience), Doc 02 (keyword priorities), Doc 03 (section plan, FAQ sourcing, nurture
structure), and Doc 05/06 (voice, demo system). This is the source of truth for wording, Claude
Code should not invent copy inline.*

---

## Voice Rules

1. **No em dashes**, ever. Commas, periods, or two sentences instead (standing preference).
2. **Specific beats vague, always.** "Processed entirely on your device" beats "private and
   secure." "No card, no account, no trial" beats "risk-free."
3. **Confident, benefit-driven, direct-response tone.** Not hype-y. Lead every section with the
   benefit, the feature is the proof, not the headline.
4. **Plain and literal CTAs.** "Join the waitlist" not "Get Started."
5. **Short sentences.** This audience scrolls fast.
6. Founder credibility can appear briefly (Section on Nurture Email 2) but the page itself must
   stand alone for a cold visitor who's never seen Veeral's content (Doc 01 audience rule).

**Headline reconciliation:** the original offer document's headline options (Section 8, Options
A-D) were written for a sales/cold-calling-specific audience. Doc 01 later broadened the ICP to
match Otter.ai/Google Meet free-tier users generally, sales being a strong example, not the
exclusive frame. Option B from that set ("Press record. Everything else happens on its own.") is
mechanism-led rather than audience-specific, so it survived the broadening cleanly and is now the
locked H1 (see below). Sales stays present as a strong supporting example, not the header.

**H1/hero visual: locked this session**, replacing the earlier "hero-concept.html" claim that
turned out to reference a file that never existed (see Doc 01/06/08's corrections). Real visual
options were built and compared directly (headline × fragment content, live, in the actual
IBM Plex Sans/JetBrains Mono/dark-token treatment) rather than described in the abstract. Chosen:
the mechanism-led headline below, paired with a mid-recording fragment (see Doc 06 §9's
correction on fragment content).

---

## Hero

**Eyebrow:** OPEN SOURCE · MAC + WINDOWS

**H1 (locked this session):**
Press record. Everything else happens on its own.

**Subhead:**
Debrief runs entirely on your machine. No minute caps, no upload, no account. Just the calls you
actually need to remember.

**CTA:** Join the waitlist

---

## Problem / Mechanism

**Heading:** Reviewing your calls shouldn't be the hard part

**Body:**
Everyone serious about getting better at what they do already knows they should go back and
listen to their calls. Almost nobody actually does it consistently. Not from lack of discipline,
the process itself is the problem: remember to hit record, remember to save the file, remember
to name it so it's findable later, remember to actually dig it up when you want to review it.
After the twentieth call, the system falls apart. Recordings pile up, unnamed and unsorted, and
the review that was supposed to make you better never happens.

**Mechanism reveal:**
That's the whole mechanism. Debrief captures, transcribes, names, and files every call
automatically, so reviewing them stops being a task you have to remember to do.

**Correction (this audit):** this line previously opened with "Press record. Everything else
happens on its own.", the exact sentence now used as the H1 above. Reworded so the page doesn't
repeat a full sentence verbatim a few hundred pixels below the hero. If you'd rather keep the
literal echo as a deliberate callback (a legitimate device, per `hormozi-voice.md`'s "repeats key
phrases for emphasis"), say so and I'll revert this line.

*(Demo 1 lives here per Doc 06 §8: mic/system on → waveform live → transcript types in → file
saves. **Demo 4 (auto-detect) also lives in this section, immediately after Demo 1, locked this
session, see Doc 06 §8's correction.**)*

---

## Value Stack

**Heading:** Everything included, none of it optional

- **One-button recording** → Never think about capturing a call again. Press record, everything
  else is handled.
- **Automatic file naming and filing** → Never dig through a folder of "recording_47.m4a" files
  again. Every call is named and filed the second it ends.
- **Local, on-device transcription** → Read a call instead of re-listening to it. Skim a
  transcript in 30 seconds instead of replaying 20 minutes of audio.
- **Fully offline, nothing leaves your machine** → The other person's voice never touches a
  third-party server. Full privacy by default, not a paid upgrade.
- **Works with your existing setup** → No new hardware, no separate recorder app. It plugs into
  how you already make calls.
- **Searchable call history** → Find any call, any conversation, any detail, in seconds, across
  everything you've ever recorded. *(Micro-loop lives here per Doc 06 §8.)*
- **Custom vocabulary support** → Stop fighting mangled transcriptions of names, products, and
  jargon specific to what you do.
- **Free, forever, no account required** → Everything above, for $0. No card, no login, no
  future upsell wall.
- **Included AI call feedback prompt** → A transcript alone doesn't make you better, feedback on
  it does. Paste your call into any AI assistant with the included prompt and get real coaching:
  what went well, where you lost control, how you handled objections, pacing notes. *(Demo 3
  lives here per Doc 06 §8.)*

**Stack close (locked this session with a real anchor number):**
Any one of these is worth paying for. Together, this is normally a $10 to $20 a month
subscription elsewhere. Debrief is free.

**Sourcing note on the number:** approximate public pricing for comparable tools (Otter.ai,
Fireflies) at the time of this audit, not pulled from Doc 02's own dataset (that research tracked
keyword rankings, not pricing) and not fabricated either. **Verify the actual current figures
before publish**, subscription pricing changes, and get this specific before it goes live.

---

## Privacy & Open Source

**Heading:** Local isn't a marketing word here

**Body:**
Debrief doesn't upload your calls anywhere to transcribe them. Recording, transcription, and
filing all happen on your own machine, using an open-source model, not a cloud API. Turn off
your wifi mid-call and it keeps working, because it was never talking to anything but your own
computer. The full source is on GitHub if you want to verify that yourself instead of taking our
word for it.

*(Demo 2 lives here per Doc 06 §8: audio → whisper → .md file inside a machine boundary, nothing
crosses to "their servers," keeps running with wifi off.)*

---

## FAQ

**Is Debrief really free?**
Yes. No card, no account, no trial that expires, no feature paywall waiting on the other side.
It's fully open source under the MIT license, so nothing is hidden.

**Where do my recordings go, is anything uploaded?**
Nowhere but your own computer. Recording and transcription both happen locally, nothing is
uploaded, nothing touches a third-party server.

**Why not just use Otter, Gong, or Fireflies?**
Those tools are built for teams and general meetings that happen to include a call sometimes.
Debrief is built specifically for the call you're trying to get better at, free, local, with
none of the account, cost, or privacy trade-offs of sending your calls to someone else's server.

**What platforms does it work on?**
Mac and Windows.

**When can I actually download it?**
Soon. Join the waitlist and you'll get the download link the moment it's ready, no earlier
promise than that.

---

## Waitlist Form (Final CTA)

**Heading:** Get the download link the moment it's ready

**Button:** Join the waitlist

**Risk-reversal micro-copy (locked, Doc 03 §3, must match Nurture Email 1 exactly):**
```
No spam. You'll get the download link the moment Debrief is ready, then a handful
of real emails over the next couple weeks, no pitch, just useful stuff. After that
I'll leave you alone until there's something worth saying. Unsubscribe anytime,
one click.
```

---

## Footer

- GitHub (link, ungated)
- A short self-select line for Fielder, low-key, not a pitch: *"Also building Fielder, tools for
  trades businesses, if that's relevant to you."*
- Socials

**Correction (this audit):** the homepage footer deliberately does NOT get a Privacy Policy link,
per this session's decision to keep it low-visibility. Homepage footer stays exactly as drafted
above. The Privacy Policy link lives in nurture email footers and on the dedicated Privacy & Open
Source page instead (see the new Privacy Policy section and Doc 03 §2a).

---

## Privacy Policy (new page, `/privacy-policy`, locked this session)

**Not linked from the homepage.** Linked only from nurture email footers and the bottom of the
dedicated Privacy & Open Source page (Doc 03 §2a). Deliberately low-visibility per this session's
decision, not hidden, just not pushed.

**Heading:** Privacy Policy

**Body:**
```
This covers debrief.veeralspatel.com, the website. The app itself, and what it does or
doesn't send anywhere, is covered on the Privacy & Open Source page, this page is about
the site you're reading right now.

What this site collects

Your email address, if you join the waitlist. Handled by ConvertKit, used only to send
the emails described when you signed up. Unsubscribe anytime, one click.

Basic analytics through Google Analytics: pages visited, rough location, device type.
Used to see what's working on the site, not to identify you personally.

What this site never does

Never sells your email or shares it with anyone else. Never uses it for anything beyond
what was described when you signed up.

Cookies

This site uses cookies for Google Analytics and the waitlist signup form. You'll see a
consent option the first time you visit, and you can change your choice anytime from
the link in the footer.

Questions

[Real contact email needed here, not fabricated, same no-invention rule as Email 3's
tip. Placeholder until Veeral supplies one.]
```

**Meta:** noindex is fine for this page, it doesn't need to rank, it needs to exist and be
findable when someone looks for it.

---

## Nurture Sequence Copy (5 emails, structure locked in Doc 03 §6)

**Privacy Policy link, locked this session:** goes in ConvertKit's own native email footer
(unsubscribe link, sender address, etc., the platform generates this automatically per Doc 04 §3,
separate from the hand-written body copy below), not manually typed into each email body. Keeps
the personal, direct voice intact in the actual message while still putting the link on every
single email, which is where it actually needs to be for compliance, not just Email 1.

**Email 1, immediate. Subject: You're on the list**
```
Hey, thanks for signing up.

You'll get the download link the moment Debrief is ready, no earlier promise
than that. In the meantime you'll get a handful of real emails from me over
the next couple weeks, no pitch, nothing to buy. After that I'll leave you
alone until there's something actually worth saying, like the app shipping.

Talk soon,
Veeral
```

**Email 2, day 2-3. Subject: Why I built this**
```
Quick one. Figured you'd want to know why Debrief exists.

I cold call every day for Fielder, a separate thing I'm building for trades
businesses. I kept meaning to go back and review my calls to get better, and
kept not doing it, because the admin of saving, naming, and finding the
recording was always more annoying than the actual review.

Debrief is the fix I built for myself first. Figured other people hit the
same wall.

Veeral
```

**Email 3, day 5-7. Subject: One thing that actually moved my close rate**
```
No pitch in this one, just something that's worked for me.

[Specific, real tip drawn from actual reps, e.g. closing Savio or working the
122-lead list, written once real material is on hand. Placeholder, do not
invent a fabricated anecdote to fill this, see Open Items below.]

Veeral
```

**Email 4, day 10-12. Subject: Where I post the rest of this stuff**
```
If you want more of this kind of thing, I post daily on Instagram. Not asking
you to subscribe, just letting you know it's there if you want it.

Veeral
```

**Email 5, day 14. Subject: That's it from me for now**
```
This is where the automated stuff ends. I'm not going to keep emailing for
the sake of it.

If you want to stay in the loop, the content channel above is where I'll be.
I'll email this list again when Debrief actually ships, or if something
happens that's genuinely worth telling you about. Until then, thanks for
being here early.

Veeral
```

---

## Meta Tags

**Title (58 chars):** `Debrief — Free, Open Source Call Recorder & Transcriber`
**Description (139 chars):** `Free call recording and transcription for Mac and Windows. No minute caps, no cloud, no account. Open source, runs on your device.`

---

## Open Items

- **Line-by-line voice QA against `hormozi-voice.md` (this audit):** searched the full doc for
  the explicit banned buzzword list (synergy, leverage, ecosystem, alignment), the hedge-word
  list (maybe, it depends, could be), and common corporate-speak substitutes (utilize, robust,
  seamless, empower, cutting-edge, game-changing). Zero hits, clean. Sentence structure already
  matches the voice guide's preference for short, punchy lines, and the one longer sentence in
  Problem/Mechanism ("remember to hit record, remember to save the file...") uses repetition
  deliberately, which the voice guide explicitly calls out as a legitimate device, not a run-on
  to fix.
- **Voice-check against broad-professional audience (this audit, Doc 01's confirmed decision):**
  read through every section and nurture email specifically looking for anything too casual,
  young, or influencer-toned. Result: clean. Hero, Problem/Mechanism, Value Stack, Privacy, FAQ,
  and Waitlist copy all already read as professional/direct-response, no changes needed. One item
  worth a conscious look rather than a rewrite: Nurture Email 4 mentions "I post daily on
  Instagram," a personal-brand/content-creator detail that a broader professional audience (an
  agency owner, a freelance setter) may care about less than the original narrower audience
  would have. Not a tone violation on its own (it's framed low-pressure, "not asking you to
  subscribe"), but it's the same question as how much build-in-public framing belongs here,
  tracked as its own decision, not fixed inline here.
- ~~Hero visual/H1 not actually locked~~ — **locked this session**: built live headline ×
  fragment comparisons and picked directly (see the H1 and Mechanism reveal sections above).
- **Unsigned-installer FAQ moved to Phase 2** (tracked in Doc 09): the question and its answer
  assumed a `/download` page that doesn't exist in Phase 1, and the objection itself is moot
  before anyone can install anything. Add it back once Phase 2 introduces the download page.
- Email 3's specific tip is a placeholder, needs a real, specific detail from Veeral's own
  calls, not a fabricated anecdote (standing no-fabrication rule applies to nurture copy too).
- **New this session:** the Privacy Policy page's "Questions" line needs a real contact email,
  not fabricated, same rule as Email 3. Placeholder until supplied.
- ~~Fielder self-select line in the footer, confirm exact wording before build~~ — **locked this
  session**: wording confirmed as drafted, no change.
- Final copy pass against `copy-editing`/`copychief`-equivalent review before lock, matching the
  QA step used on the Fernz project, optional but recommended given how much rides on this page.
