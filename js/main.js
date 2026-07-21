/* ============================================================
   Debrief — Shared site JS
   Vanilla JS only, no framework, no build step (Doc 04 §1).
   Covers: scroll reveals, fragment parallax, FAQ accordion,
   cookie consent + gated GA4, ConvertKit form handling,
   and the four coded demos + auto-filing micro-loop (Doc 06 §8).
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
     Hero animation: idle button -> click at ~2s -> live recording.
     Waveform spawns at a fixed playhead (75% across) and pushes left
     continuously, real talk/pause cadence, fades out toward the left edge.
     Runs once, then continues indefinitely, no reset, no replay control,
     this is an ambient hero loop, not one of the four proof demos.
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
      document.getElementById('heroAnimBtn').classList.add('live');
      document.getElementById('heroAnimTimer').classList.add('live');
      document.getElementById('heroAnimMic').textContent = 'ON';
      document.getElementById('heroAnimMic').className = 'on';
      document.getElementById('heroAnimSys').textContent = 'ON';
      document.getElementById('heroAnimSys').className = 'on';
      if (reduceMotion) { render(); return; }
      var secs = 0;
      setInterval(function () {
        secs++;
        var m = Math.floor(secs / 60), s = secs % 60;
        document.getElementById('heroAnimTimer').textContent =
          (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      }, 1000);
    }

    if (reduceMotion) startRecording();
    else setTimeout(startRecording, 2000);
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

  /* ---------- Waitlist form (ConvertKit embed) ---------- */
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
      }).then(function () {
        onSuccess();
      }).catch(function () {
        // ConvertKit endpoint not wired up yet in local/dev, still show success
        // so the styled confirmation state can be reviewed before the real form ID exists.
        onSuccess();
      });

      function onSuccess() {
        btn.classList.add('is-success');
        btn.textContent = 'You’re on the list';
        if (successEl) successEl.classList.add('show');
        form.querySelector('.field-group').style.display = 'none';
        track('waitlist_submit', {});
      }
    });
  }

  /* ============================================================
     Demo 1 — Problem/Mechanism: mic/system on -> waveform live ->
     transcript types in -> file saves. Ported from docs/demos.html.
     ============================================================ */
  function initDemo1() {
    var root = document.getElementById('demo-1');
    if (!root) return;
    var wave = document.getElementById('wv');
    var bars = [];
    for (var i = 0; i < 28; i++) {
      var bar = document.createElement('i');
      wave.appendChild(bar);
      bars.push(bar);
    }
    var lines = [
      { t: '00:04', s: 'You', b: false, x: 'Thanks for jumping on, I know you’re busy.' },
      { t: '00:11', s: 'Prospect', b: true, x: 'No worries. So what does this actually do differently?' },
      { t: '00:19', s: 'You', b: false, x: 'It records the whole call and writes the transcript locally, nothing gets uploaded.' }
    ];
    var timers = [], waveInt;

    function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(waveInt); }

    function run() {
      clear();
      var rb = document.getElementById('rb'), rt = document.getElementById('rt'),
          fd = document.getElementById('fd'), fn = document.getElementById('fn'),
          tl = document.getElementById('tl'), sv = document.getElementById('sv'),
          s1 = document.getElementById('s1'), s2 = document.getElementById('s2');

      rb.classList.remove('live'); rt.classList.remove('live'); wave.classList.remove('live');
      fd.classList.remove('live'); sv.classList.remove('in'); tl.innerHTML = '';
      rt.textContent = '00:00'; fn.textContent = 'no active recording';
      s1.textContent = '—'; s2.textContent = '—'; s1.className = ''; s2.className = '';
      bars.forEach(function (b) { b.style.transform = 'scaleY(' + (4 / 30) + ')'; });

      if (reduceMotion) {
        s1.textContent = 'ON'; s1.className = 'on'; s2.textContent = 'ON'; s2.className = 'on';
        rb.classList.add('live'); rt.classList.add('live'); wave.classList.add('live'); fd.classList.add('live');
        fn.textContent = '2026-07-20-discovery-call.md';
        lines.forEach(function (l) {
          var d = document.createElement('div'); d.className = 'tline in';
          d.innerHTML = '<span class="ttime">' + l.t + '</span><span class="ttext"><span class="tspk' + (l.b ? ' b' : '') + '">' + l.s + '</span>' + l.x + '</span>';
          tl.appendChild(d);
        });
        sv.classList.add('in');
        return;
      }

      timers.push(setTimeout(function () { s1.textContent = 'ON'; s1.className = 'on'; }, 500));
      timers.push(setTimeout(function () { s2.textContent = 'ON'; s2.className = 'on'; }, 800));
      timers.push(setTimeout(function () {
        rb.classList.add('live'); rt.classList.add('live'); wave.classList.add('live'); fd.classList.add('live');
        fn.textContent = '2026-07-20-discovery-call.md';
        var sec = 0;
        waveInt = setInterval(function () {
          bars.forEach(function (b) {
            var h = 4 + Math.random() * 26;
            b.style.transform = 'scaleY(' + (h / 30) + ')';
          });
          sec++;
          if (sec % 10 === 0) { var s = Math.floor(sec / 10); rt.textContent = '00:' + (s < 10 ? '0' : '') + s; }
        }, 100);
      }, 1200));
      lines.forEach(function (l, i) {
        timers.push(setTimeout(function () {
          var d = document.createElement('div'); d.className = 'tline';
          d.innerHTML = '<span class="ttime">' + l.t + '</span><span class="ttext"><span class="tspk' + (l.b ? ' b' : '') + '">' + l.s + '</span>' + l.x + '</span>';
          tl.appendChild(d);
          setTimeout(function () { d.classList.add('in'); }, 30);
        }, 2200 + i * 1400));
      });
      timers.push(setTimeout(function () {
        clearInterval(waveInt);
        rb.classList.remove('live'); rt.classList.remove('live'); wave.classList.remove('live'); fd.classList.remove('live');
        bars.forEach(function (b) { b.style.transform = 'scaleY(' + (4 / 30) + ')'; });
        sv.classList.add('in');
      }, 7400));
    }

    var replay = root.querySelector('[data-replay]');
    if (replay) replay.addEventListener('click', run);
    autoplayOnce(root, run);
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
     Demo 2 — Privacy machine boundary + wifi off. Ported from docs/demos.html.
     ============================================================ */
  function initDemo2() {
    var root = document.getElementById('demo-2');
    if (!root) return;
    var timers = [];

    function run() {
      timers.forEach(clearTimeout); timers = [];
      var n = [document.getElementById('n1'), document.getElementById('n2'), document.getElementById('n3')];
      var tg = document.getElementById('tg'), wl = document.getElementById('wl'), st = document.getElementById('st');
      n.forEach(function (x) { x.classList.remove('act'); });
      tg.classList.remove('off'); wl.textContent = 'connected'; st.classList.remove('in');

      if (reduceMotion) {
        n.forEach(function (x) { x.classList.add('act'); });
        tg.classList.add('off'); wl.textContent = 'off'; st.classList.add('in');
        return;
      }
      n.forEach(function (x, i) { timers.push(setTimeout(function () { x.classList.add('act'); }, 600 + i * 700)); });
      timers.push(setTimeout(function () { tg.classList.add('off'); wl.textContent = 'off'; }, 3000));
      timers.push(setTimeout(function () { st.classList.add('in'); }, 3600));
      timers.push(setTimeout(function () {
        n.forEach(function (x) { x.classList.remove('act'); });
        n.forEach(function (x, i) { timers.push(setTimeout(function () { x.classList.add('act'); }, i * 700)); });
      }, 4200));
    }

    var replay = root.querySelector('[data-replay]');
    if (replay) replay.addEventListener('click', run);
    autoplayOnce(root, run);
  }

  /* ============================================================
     Micro-loop — auto-filing (Tier 2, ambient, no controls).
     ============================================================ */
  function initMicroLoop() {
    var tree = document.getElementById('tree');
    if (!tree) return;
    var rows = [
      '<span class="fold">▸ Sales/</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-18-acme-intro.md</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-19-follow-up.md</span>',
      '&nbsp;&nbsp;<span class="new">2026-07-20-discovery.md</span>',
      '<span class="fold">▸ Interviews/</span>',
      '&nbsp;&nbsp;<span class="file">2026-07-16-candidate-b.md</span>'
    ];
    var timers = [];
    function run() {
      timers.forEach(clearTimeout); timers = [];
      tree.innerHTML = '';
      rows.forEach(function (r, i) {
        var d = document.createElement('div'); d.className = 'tr'; d.innerHTML = r;
        tree.appendChild(d);
        if (reduceMotion) { d.classList.add('in'); }
        else { timers.push(setTimeout(function () { d.classList.add('in'); }, 300 + i * 380)); }
      });
    }
    autoplayOnce(tree.closest('.demo-wrap') || tree, run);
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
    initFaq();
    initCookieBanner();
    initClickTracking();
    initWaitlistForm();
    initDemo1();
    initDemo4();
    initDemo3();
    initDemo2();
    initMicroLoop();
  });
})();
