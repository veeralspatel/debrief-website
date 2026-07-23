/* ============================================================
   Debrief — Shared site JS
   Vanilla JS only, no framework, no build step (Doc 04 §1).
   Covers: scroll reveals, fragment parallax, FAQ accordion,
   cookie consent + gated GA4, ConvertKit form handling,
   the hero + mechanism + new beats + value stack scroll mechanics,
   and the remaining coded demos (Doc 06 §8).
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Analytics (gated by cookie consent, Doc 04 §7) ---------- */
  function track(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }
  window.debriefTrack = track;

  /* ---------- Scroll reveal ---------- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     Hero animation: idle -> click at ~2s -> live recording.
     Waveform spawns at a fixed playhead (75% across) and pushes left
     continuously, real talk/pause cadence, fades out toward the left edge.
     The status card is the real app's own floating-pill component
     (`.rec-pill`) — this instance stays put in the hero; it is a separate
     DOM node from the traveling companion further down the page, per
     direct instruction that the hero keeps its own thing.
     ============================================================ */
  function initHeroAnimation() {
    var barsBox = document.getElementById('heroWaveBars');
    if (!barsBox) return;

    // Bar count is derived from the container's real measured width, not a guess,
    // so bars always fill it exactly at 5px + 4px gap each, never overflow-shrunk
    // to invisibility (this region is a column-width slice, not the full viewport).
    var BAR_W = 5, BAR_GAP = 4;
    var count = Math.max(16, Math.floor(barsBox.getBoundingClientRect().width / (BAR_W + BAR_GAP)));
    var bars = [];
    for (var i = 0; i < count; i++) {
      var bar = document.createElement('i');
      barsBox.appendChild(bar);
      bars.push(bar);
    }
    var heights = new Array(count).fill(0.03);
    var recording = false;
    var edgeFadeFrac = 0.18; // last ~18% of travel fades + compresses before disappearing
    // Playhead sits at 75% across. Values are computed and stored the moment they
    // spawn at the rightmost slot, but only rendered for real once their index has
    // shifted left past this threshold; right of it always reads as flat incoming dots.
    var liveIndex = Math.floor(count * 0.75);

    var state = 'pause';
    var stateTicksLeft = 999; // stays "off" until recording starts
    var voiceLevel = 0.03;

    function nextVoiceLevel() {
      stateTicksLeft--;
      if (stateTicksLeft <= 0) {
        if (state === 'talking') { state = 'pause'; stateTicksLeft = 6 + Math.random() * 10; }
        else { state = 'talking'; stateTicksLeft = 14 + Math.random() * 22; }
      }
      if (state === 'pause') {
        voiceLevel += (0.04 - voiceLevel) * 0.4;
      } else {
        var burst = Math.random() < 0.12 ? 0.25 : 0;
        voiceLevel += (Math.random() - 0.45) * 0.3 + burst;
        voiceLevel = Math.max(0.12, Math.min(1, voiceLevel));
      }
      return voiceLevel;
    }

    function render() {
      var edgeCount = Math.max(1, Math.floor(count * edgeFadeFrac));
      bars.forEach(function (bar, idx) {
        var v = (idx >= liveIndex) ? 0.03 : heights[idx];
        var edgeFactor = idx < edgeCount ? (idx / edgeCount) : 1;
        bar.style.transform = 'scaleY(' + (v * edgeFactor).toFixed(3) + ')';
        bar.style.opacity = edgeFactor.toFixed(3);
      });
    }

    function waveTick() {
      heights.shift();
      heights.push(recording ? nextVoiceLevel() : 0.03);
      render();
    }

    render();
    if (!reduceMotion) setInterval(waveTick, 90);

    function startRecording() {
      recording = true;
      state = 'talking';
      stateTicksLeft = 10 + Math.random() * 10;
      var pill = document.getElementById('heroPill');
      var timerEl = document.getElementById('heroPillTimer');
      var dotEl = document.getElementById('heroPillDot');
      if (pill) pill.classList.add('in');
      if (dotEl) dotEl.classList.remove('idle-dim');
      if (reduceMotion) { render(); return; }
      var secs = 0;
      setInterval(function () {
        secs++;
        var m = Math.floor(secs / 60), s = secs % 60;
        if (timerEl) timerEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      }, 1000);
    }

    if (reduceMotion) startRecording();
    else setTimeout(startRecording, 2000);
  }

  /* ============================================================
     Problem / Mechanism — scroll-narrated, real Record-tab screen.
     Structure/copy/proportions recreated from the app's own
     record-tab-dark-mode-states.html rather than an invented widget.
     Beat 2 (recording) also lights up the traveling pill's Record-panel
     dock, see initTravelingPill.
     ============================================================ */
  var mechanismState = null; // exposed so the traveling pill can react
  function initMechanismPanel() {
    var beats = document.querySelectorAll('#mechanismBeats .pn-beat');
    var micIdle = document.getElementById('rtMicIdle');
    var recDot = document.getElementById('rtRecDot');
    var statusText = document.getElementById('rtStatusText');
    var center = document.getElementById('rtCenter');
    var recentName = document.getElementById('rtRecentName');
    var recentMeta = document.getElementById('rtRecentMeta');
    var recentBadge = document.getElementById('rtRecentBadge');
    if (!beats.length || !center) return;

    var IDLE_CENTER = '<div class="rt-record-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></div>' +
      '<div class="rt-press-label">Press to record</div><div class="rt-press-sub">or press spacebar</div>';
    var REC_CENTER = '<div class="rt-timer">00:14</div><div class="rt-stop-btn"><div class="rt-stop-icon"></div></div>' +
      '<div class="rt-secondary"><div class="rt-secondary-btn"><div class="rt-pause-icon"><span></span><span></span></div></div>' +
      '<div class="rt-secondary-btn"><div class="rt-mute-icon"></div></div></div><div class="rt-control-caption">Pause · Mute</div>';

    function setState(state) {
      if (state === mechanismState) return;
      mechanismState = state;
      if (state === 'idle') {
        micIdle.classList.remove('hidden'); recDot.classList.remove('on');
        statusText.textContent = 'Device ready'; center.innerHTML = IDLE_CENTER;
        recentName.textContent = '2026-07-14_Acme_Cold'; recentMeta.textContent = 'Today, 1:45 PM · 4:12'; recentBadge.textContent = 'Cold call';
      } else if (state === 'recording') {
        micIdle.classList.add('hidden'); recDot.classList.add('on');
        statusText.textContent = 'Recording'; center.innerHTML = REC_CENTER;
      } else if (state === 'filed') {
        micIdle.classList.remove('hidden'); recDot.classList.remove('on');
        statusText.textContent = 'Device ready'; center.innerHTML = IDLE_CENTER;
        recentName.textContent = '2026-07-20_Discovery_Call'; recentMeta.textContent = 'Just now · 14:22'; recentBadge.textContent = 'Discovery';
      }
      document.dispatchEvent(new CustomEvent('mechanism:state', { detail: { state: state } }));
    }
    setState('idle');

    if (reduceMotion || !('IntersectionObserver' in window)) { setState('recording'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var i = Number(entry.target.dataset.index);
          beats.forEach(function (el) { el.classList.toggle('active', Number(el.dataset.index) === i); });
          setState(entry.target.dataset.state);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    beats.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ accordion (independent, any number open, Doc 06 §7) ---------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var wrap = item.querySelector('.faq-a-wrap');
      if (!q || !wrap) return;
      q.addEventListener('click', function () {
        var isOpen = q.getAttribute('aria-expanded') === 'true';
        q.setAttribute('aria-expanded', String(!isOpen));
        wrap.classList.toggle('open', !isOpen);
        if (!isOpen) {
          track('faq_expand', { faq_question: q.textContent.trim() });
        }
      });
    });
  }

  /* ---------- Cookie consent banner (Doc 06 §13, Doc 04 §7) ---------- */
  var CONSENT_KEY = 'debrief-cookie-consent';

  function loadGA() {
    var GA_ID = document.documentElement.getAttribute('data-ga-id');
    if (!GA_ID || GA_ID.indexOf('G-') !== 0) return; // not configured yet, skip silently
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    var stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') { loadGA(); return; }
    if (stored === 'rejected') { return; }

    banner.hidden = false;
    var accept = document.getElementById('cookie-accept');
    var reject = document.getElementById('cookie-reject');

    function dismiss(choice) {
      localStorage.setItem(CONSENT_KEY, choice);
      if (reduceMotion) {
        banner.hidden = true;
      } else {
        banner.classList.add('leaving');
        setTimeout(function () { banner.hidden = true; }, 220);
      }
      if (choice === 'accepted') loadGA();
    }
    accept.addEventListener('click', function () { dismiss('accepted'); });
    reject.addEventListener('click', function () { dismiss('rejected'); });
  }

  /* ---------- CTA / outbound click tracking ---------- */
  function initClickTracking() {
    document.querySelectorAll('[data-track="cta_click"]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('cta_click', { cta_location: el.getAttribute('data-location') || 'unknown' });
      });
    });
    document.querySelectorAll('[data-track="outbound_github_click"]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('outbound_github_click', {});
      });
    });
  }

  /* ---------- Waitlist form (ConvertKit embed) ----------
     Fixed per a design critique finding: this used to call onSuccess() from
     both .then() and .catch() unconditionally, so a signup could silently
     fail (wrong/placeholder form action, network error, ConvertKit rejecting
     the request) while the visitor was told they were on the list. Success
     now requires an actual ok response; anything else shows a real,
     non-alarming error with a way to try again. */
  function initWaitlistForm() {
    var form = document.getElementById('waitlist-form');
    if (!form) return;
    var field = form.querySelector('.field');
    var errorEl = form.querySelector('.field-error');
    var btn = form.querySelector('.btn-primary');
    var btnLabel = btn ? btn.textContent : '';
    var successEl = document.getElementById('waitlist-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = field.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        field.classList.add('has-error');
        errorEl.textContent = 'Enter a real email address.';
        errorEl.classList.add('show');
        field.focus();
        return;
      }
      field.classList.remove('has-error');
      errorEl.classList.remove('show');
      btn.disabled = true;
      btn.textContent = 'Joining...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      }).catch(function () {
        onError();
      });

      function onSuccess() {
        btn.classList.add('is-success');
        btn.textContent = 'You’re on the list';
        if (successEl) successEl.classList.add('show');
        form.querySelector('.field-group').style.display = 'none';
        track('waitlist_submit', {});
      }

      function onError() {
        btn.disabled = false;
        btn.textContent = btnLabel;
        errorEl.textContent = 'That didn’t go through. Try again in a moment.';
        errorEl.classList.add('show');
        track('waitlist_submit_error', {});
      }
    });
  }

  /* ============================================================
     Filing beat — new file animates into a real Finder-style list.
     ============================================================ */
  function initFilingBeat() {
    var root = document.getElementById('filingBeat');
    if (!root) return;
    var newRow = document.getElementById('finNewRow');
    var revealed = false;
    function reveal() {
      if (revealed) return; revealed = true;
      if (reduceMotion) { newRow.classList.add('in'); return; }
      requestAnimationFrame(function () { newRow.classList.add('in'); });
    }
    if (reduceMotion || !('IntersectionObserver' in window)) { reveal(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { reveal(); io.unobserve(entry.target); } });
    }, { threshold: 0.4 });
    io.observe(root);
  }

  /* ============================================================
     Offline beat — Wi-Fi toggle switches off, waveform keeps going.
     Reuses the exact `.tog`/`.knob` toggle already established on the
     local-transcription page, not a new component.
     ============================================================ */
  function initOfflineBeat() {
    var root = document.getElementById('offlineBeat');
    if (!root) return;
    var toggle = document.getElementById('offToggle');
    var sub = document.getElementById('offSub');
    var waveBox = document.getElementById('offWave');
    if (waveBox && !waveBox.children.length) {
      for (var i = 0; i < 20; i++) {
        var bar = document.createElement('i');
        bar.style.animationDelay = (i * 45) + 'ms';
        bar.style.height = '14px';
        waveBox.appendChild(bar);
      }
    }
    var flipped = false;
    function flip() {
      if (flipped) return; flipped = true;
      var go = function () { toggle.classList.add('off'); sub.textContent = 'Off — still recording locally'; };
      if (reduceMotion) go(); else setTimeout(go, 500);
    }
    if (reduceMotion || !('IntersectionObserver' in window)) { flip(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { flip(); io.unobserve(entry.target); } });
    }, { threshold: 0.4 });
    io.observe(root);
  }

  /* ============================================================
     Traveling companion pill — a second `.rec-pill` instance, fixed to
     the viewport, docking to whichever beat (Record panel / Filing /
     Transcription / Offline) sits closest to the viewport center as the
     page scrolls (weighted-distance blend across the beats' anchor
     points, not a manual per-section lerp). Deliberately starts at the
     Record panel, not the hero — the hero keeps its own still instance.
     Hidden between beats where a call wouldn't really still be "live"
     (a filed, transcribed call isn't recording) — stricter to the real
     app spec than showing it continuously throughout.
     ============================================================ */
  function initTravelingPill() {
    var pill = document.getElementById('travelPill');
    var dotEl = document.getElementById('travelPillDot');
    var timerEl = document.getElementById('travelPillTimer');
    var docks = [
      { el: document.getElementById('dockRecord'), name: 'record' },
      { el: document.getElementById('dockFiling'), name: 'filing' },
      { el: document.getElementById('dockTranscript'), name: 'transcript' },
      { el: document.getElementById('dockOffline'), name: 'offline' }
    ].filter(function (d) { return d.el; });
    if (!pill || docks.length < 4) return;
    if (reduceMotion || window.matchMedia('(max-width: 1023px)').matches) return;

    var seconds = 0, recording = false, activeName = null;
    // Only these two beats ever show the pill. A filed, transcribed call
    // genuinely isn't "recording" anymore, so per the real app spec the pill
    // has no reason to still be on screen at Filing/Transcription — it
    // vanishes there and only comes back once Offline resumes recording,
    // rather than staying visible-but-dim as an in-between compromise.
    var VISIBLE_DOCKS = { record: true, offline: true };

    function setRecording(v) {
      recording = v;
      if (dotEl) dotEl.classList.toggle('idle-dim', !v);
    }
    function resetTimer(v) { seconds = v || 0; render(); }
    function render() {
      var m = Math.floor(seconds / 60), s = seconds % 60;
      if (timerEl) timerEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }
    setInterval(function () { if (recording) { seconds++; render(); } }, 1000);
    render();

    document.addEventListener('mechanism:state', function (e) {
      if (activeName !== 'record') return;
      if (e.detail.state === 'recording') setRecording(true);
      else if (e.detail.state === 'filed') setRecording(false);
    });

    function onDockEnter(name) {
      if (name === 'record') { resetTimer(0); setRecording(mechanismState === 'recording'); }
      else if (name === 'offline') { resetTimer(41); setRecording(true); }
    }

    function loop() {
      var vh = window.innerHeight, centerY = vh * 0.5, sigma = vh * 0.32;
      var weights = [], totalW = 0;
      var rects = docks.map(function (d) { return d.el.getBoundingClientRect(); });
      rects.forEach(function (r) {
        var cy = r.top + r.height / 2;
        var dist = Math.abs(cy - centerY);
        var w = Math.exp(-(dist * dist) / (2 * sigma * sigma));
        weights.push(w); totalW += w;
      });

      var maxI = 0;
      for (var i = 1; i < weights.length; i++) if (weights[i] > weights[maxI]) maxI = i;
      var closest = docks[maxI].name;

      if (totalW < 0.03 || !VISIBLE_DOCKS[closest]) {
        pill.classList.remove('show');
      } else {
        pill.classList.add('show');
        // position against only the visible docks' weights, so the pill
        // doesn't drift toward a hidden Filing/Transcript anchor while
        // traveling between Record and Offline
        var x = 0, y = 0, visW = 0;
        rects.forEach(function (r, i) { if (VISIBLE_DOCKS[docks[i].name]) visW += weights[i]; });
        rects.forEach(function (r, i) {
          if (!VISIBLE_DOCKS[docks[i].name]) return;
          var wn = weights[i] / visW;
          x += (r.left + r.width / 2) * wn;
          y += (r.top + r.height / 2) * wn;
        });
        pill.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';

        if (closest !== activeName && weights[maxI] / totalW > 0.55) { activeName = closest; onDockEnter(closest); }
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ============================================================
     Demo 4 — Auto-detect. Ported from docs/demos-2.html.
     ============================================================ */
  function initDemo4() {
    var root = document.getElementById('demo-4');
    if (!root) return;
    var timers = [], pillInterval;

    function run() {
      timers.forEach(clearTimeout); timers = []; clearInterval(pillInterval);
      var cw = document.getElementById('cw'), pl = document.getElementById('pl'), c4 = document.getElementById('c4');
      cw.classList.remove('in'); pl.classList.remove('in'); c4.classList.remove('in');
      pl.querySelector('.pill-t').textContent = '00:00';

      if (reduceMotion) {
        cw.classList.add('in'); pl.classList.add('in'); c4.classList.add('in');
        pl.querySelector('.pill-t').textContent = '00:03';
        return;
      }
      timers.push(setTimeout(function () { cw.classList.add('in'); }, 600));
      timers.push(setTimeout(function () {
        pl.classList.add('in');
        var s = 0;
        pillInterval = setInterval(function () {
          s++; pl.querySelector('.pill-t').textContent = '00:' + (s < 10 ? '0' : '') + s;
        }, 1000);
      }, 1700));
      timers.push(setTimeout(function () { c4.classList.add('in'); }, 2600));
    }

    var replay = root.querySelector('[data-replay]');
    if (replay) replay.addEventListener('click', run);
    autoplayOnce(root, run);
  }

  /* ============================================================
     Demo 3 — AI feedback (value stack closer). Ported from docs/demos-2.html.
     ============================================================ */
  function initDemo3() {
    var root = document.getElementById('demo-3');
    if (!root) return;
    var timers = [];
    var fbItems = [
      { n: '01', h: 'You answered the price question too early', b: 'At 04:12 they asked about cost before you framed value. You quoted immediately.' },
      { n: '02', h: 'Three questions went unanswered', b: 'Their integration concern at 07:30 never got a direct response.' },
      { n: '03', h: 'Strong close, weak next step', b: 'You booked a follow-up but left the date open. They set the agenda, not you.' }
    ];

    function renderFeedback(fbs) {
      fbItems.forEach(function (it) {
        var d = document.createElement('div'); d.className = 'fb in';
        d.innerHTML = '<div class="fb-h"><span class="n">' + it.n + '</span>' + it.h + '</div><div class="fb-b">' + it.b + '</div>';
        fbs.appendChild(d);
      });
    }

    function run() {
      timers.forEach(clearTimeout); timers = [];
      var f = document.getElementById('f3'), ar = document.getElementById('ar3'),
          m = document.getElementById('m3'), fbs = document.getElementById('fbs');
      f.classList.remove('lift'); ar.classList.remove('go'); m.classList.remove('in'); fbs.innerHTML = '';

      if (reduceMotion) {
        f.classList.add('lift'); ar.classList.add('go'); m.classList.add('in');
        renderFeedback(fbs);
        return;
      }
      timers.push(setTimeout(function () { f.classList.add('lift'); }, 500));
      timers.push(setTimeout(function () { ar.classList.add('go'); }, 900));
      timers.push(setTimeout(function () { m.classList.add('in'); }, 1400));
      timers.push(setTimeout(function () {
        var c = document.createElement('div'); c.className = 'fb in';
        c.innerHTML = '<div class="fb-b"><span class="cursor"></span></div>';
        c.id = 'typing'; fbs.appendChild(c);
      }, 2100));
      fbItems.forEach(function (it, i) {
        timers.push(setTimeout(function () {
          var ty = document.getElementById('typing'); if (ty && i === 0) ty.remove();
          var d = document.createElement('div'); d.className = 'fb';
          d.innerHTML = '<div class="fb-h"><span class="n">' + it.n + '</span>' + it.h + '</div><div class="fb-b">' + it.b + '</div>';
          fbs.appendChild(d);
          setTimeout(function () { d.classList.add('in'); }, 30);
        }, 2900 + i * 1100));
      });
      timers.push(setTimeout(function () { f.classList.remove('lift'); ar.classList.remove('go'); }, 6500));
    }

    var replay = root.querySelector('[data-replay]');
    if (replay) replay.addEventListener('click', run);
    autoplayOnce(root, run);
  }

  /* ============================================================
     Value stack — scroll list + sticky window-chrome panel, real
     Lucide icon paths (the app's own icon set, design-system.html).
     Item 8 ("Searchable call history") folds in the existing
     auto-filing micro-loop tree demo when it becomes active, rather
     than dropping that real content.
     ============================================================ */
  function initValueStackSticky() {
    var listEl = document.getElementById('sdList');
    var railEl = document.getElementById('sdRail');
    if (!listEl || !railEl) return;

    var ICONS = {
      mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
      folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
      fileText: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
      shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
      plug: '<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/>',
      type: '<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>',
      gift: '<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',
      search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>'
    };
    var ITEMS = [
      { icon: 'mic', title: 'One-button recording', desc: 'Never think about capturing a call again. Press record, everything else is handled.' },
      { icon: 'folder', title: 'Automatic file naming and filing', desc: 'Never dig through a folder of "recording_47.m4a" files again. Every call is named and filed the second it ends.' },
      { icon: 'fileText', title: 'Local, on-device transcription', desc: 'Read a call instead of re-listening to it. Skim a transcript in 30 seconds instead of replaying 20 minutes of audio.' },
      { icon: 'shield', title: 'Fully offline, nothing leaves your machine', desc: 'The other person’s voice never touches a third-party server. Full privacy by default, not a paid upgrade.' },
      { icon: 'plug', title: 'Works with your existing setup', desc: 'No new hardware, no separate recorder app. It plugs into how you already make calls.' },
      { icon: 'type', title: 'Custom vocabulary support', desc: 'Stop fighting mangled transcriptions of names, products, and jargon specific to what you do.' },
      { icon: 'gift', title: 'Free, forever, no account required', desc: 'Everything above, for $0. No card, no login, no future upsell wall.' },
      { icon: 'search', title: 'Searchable call history', desc: 'Find any call, any conversation, any detail, in seconds, across everything you’ve ever recorded.', microloop: true }
    ];

    // Picker-wheel mode: laptop+ and motion allowed. .sd-list becomes a tall
    // scroll spacer with a sticky, fixed-height 3-row window inside it, so
    // scrolling the page continuously turns the "wheel" rather than snapping
    // between two dim/full-opacity states. Mobile keeps the plain stacked
    // list (same reasoning as the traveling pill bailing under 1024px).
    var useWheel = !reduceMotion && window.matchMedia('(min-width: 1024px)').matches;
    var ROW_HEIGHT = 176;       // vertical spacing between wheel rows
    var WINDOW_ROWS = 3;        // prev / active / next
    var SCROLL_PER_ITEM = 210;  // px of page scroll consumed advancing one item
    var STICKY_TOP = 120;       // matches .sd-sticky-wrap's own sticky offset

    var wheelWindow = null;
    var itemEls = [];

    if (useWheel) {
      listEl.classList.add('sd-wheel-spacer');
      listEl.style.height = (ITEMS.length * SCROLL_PER_ITEM) + 'px';
      wheelWindow = document.createElement('div');
      wheelWindow.className = 'sd-wheel-window';
      wheelWindow.style.height = (ROW_HEIGHT * WINDOW_ROWS) + 'px';
      wheelWindow.style.top = STICKY_TOP + 'px';
      listEl.appendChild(wheelWindow);
    }
    var mountEl = useWheel ? wheelWindow : listEl;

    ITEMS.forEach(function (it, i) {
      var item = document.createElement('div');
      item.className = 'sd-item'; item.dataset.index = i;
      item.innerHTML = '<div class="sd-num">0' + (i + 1) + ' / 0' + ITEMS.length + '</div><h3>' + it.title + '</h3><p>' + it.desc + '</p>';
      mountEl.appendChild(item);
      itemEls.push(item);
      var dot = document.createElement('div');
      dot.className = 'sd-rail-dot'; dot.dataset.index = i;
      railEl.appendChild(dot);
    });

    var iconEl = document.getElementById('sdIcon');
    var titleEl = document.getElementById('sdTitle');
    var descEl = document.getElementById('sdDesc');
    var countEl = document.getElementById('sdCount');
    var wcTitleEl = document.getElementById('sdWcTitle');
    var microloopEl = document.getElementById('sdMicroloop');
    var microloopTreeEl = document.getElementById('sdMicroloopTree');
    var microloopTimers = [];
    var current = -1;

    var TREE_ROWS = [
      '<span class="fold">▸ Sales/</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-18-acme-intro.md</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-19-follow-up.md</span>',
      '&nbsp;&nbsp;<span class="new">2026-07-20-discovery.md</span>',
      '<span class="fold">▸ Interviews/</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-16-candidate-b.md</span>'
    ];
    function runMicroloop() {
      microloopTimers.forEach(clearTimeout); microloopTimers = [];
      microloopTreeEl.innerHTML = '';
      TREE_ROWS.forEach(function (r, i) {
        var d = document.createElement('div'); d.className = 'tr'; d.innerHTML = r;
        microloopTreeEl.appendChild(d);
        if (reduceMotion) { d.classList.add('in'); }
        else { microloopTimers.push(setTimeout(function () { d.classList.add('in'); }, 300 + i * 380)); }
      });
    }

    function setActive(i) {
      if (i === current) return;
      current = i;
      var it = ITEMS[i];
      iconEl.innerHTML = ICONS[it.icon];
      titleEl.textContent = it.title;
      descEl.textContent = it.desc;
      countEl.textContent = '0' + (i + 1) + ' / 0' + ITEMS.length;
      wcTitleEl.textContent = 'debrief — ' + it.title.toLowerCase();
      microloopEl.hidden = !it.microloop;
      if (it.microloop) runMicroloop();
      document.querySelectorAll('.sd-rail-dot').forEach(function (d) { d.classList.toggle('active', Number(d.dataset.index) <= i); });
      itemEls.forEach(function (el) { el.classList.toggle('active', Number(el.dataset.index) === i); });
    }
    setActive(0);

    if (!useWheel) {
      if (reduceMotion || !('IntersectionObserver' in window)) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) setActive(Number(entry.target.dataset.index)); });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      itemEls.forEach(function (el) { io.observe(el); });
      return;
    }

    // Continuous wheel: distance-from-center drives a gentle-radius CSS 3D
    // tilt (rotateX + a small translateZ pushback, large virtual radius so
    // the curve stays subtle) plus an explicit scale/opacity falloff so the
    // centered row reads as clearly dominant, not just barely brighter.
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function wheelLoop() {
      var rect = listEl.getBoundingClientRect();
      var scrollable = rect.height - (ROW_HEIGHT * WINDOW_ROWS);
      var t = scrollable > 0 ? clamp((STICKY_TOP - rect.top) / scrollable, 0, 1) : 0;
      var progress = t * (ITEMS.length - 1);

      itemEls.forEach(function (el, i) {
        var d = i - progress;
        var absD = Math.abs(d);
        var opacity = clamp(1 - absD * 0.85, 0, 1);
        var scale = clamp(1 - absD * 0.42, 0.35, 1);
        var angle = clamp(d * 9, -34, 34);
        var depth = -Math.abs(angle) * 1.6;
        el.style.transform = 'translateY(-50%) translateY(' + (d * ROW_HEIGHT) + 'px) rotateX(' + (-angle) + 'deg) translateZ(' + depth + 'px) scale(' + scale + ')';
        el.style.opacity = opacity;
        el.style.pointerEvents = absD < 0.5 ? 'auto' : 'none';
      });

      var nearest = clamp(Math.round(progress), 0, ITEMS.length - 1);
      if (nearest !== current) setActive(nearest);

      requestAnimationFrame(wheelLoop);
    }
    requestAnimationFrame(wheelLoop);
  }

  /* ---------- Shared autoplay-once-on-scroll-entry helper ---------- */
  function autoplayOnce(el, run) {
    if (reduceMotion || !('IntersectionObserver' in window)) { run(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveals();
    initHeroAnimation();
    initMechanismPanel();
    initFilingBeat();
    initOfflineBeat();
    initTravelingPill();
    initFaq();
    initCookieBanner();
    initClickTracking();
    initWaitlistForm();
    initDemo4();
    initDemo3();
    initValueStackSticky();
  });
})();
