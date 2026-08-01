/* =========================================================================
   Red Clay & Lost Pines — interactions
   Plain ES2018, no dependencies, no build step. Safe for GitHub Pages.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- theme */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var stored = null;
  try { stored = localStorage.getItem('rcl-theme'); } catch (e) { /* private mode */ }
  if (stored) {
    root.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('rcl-theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ------------------------------------------------- scroll progress + nav */
  var bar = document.getElementById('progressBar');
  var topbar = document.getElementById('topbar');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.chapternav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = pct.toFixed(2) + '%';
      if (topbar) topbar.classList.toggle('stuck', window.scrollY > 40);

      var mark = window.scrollY + window.innerHeight * 0.35;
      var current = -1;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= mark) current = i;
      }
      navLinks.forEach(function (a, i) { a.classList.toggle('active', i === current); });

      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ------------------------------------------------------- reveal on view */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        window.setTimeout(function () { el.classList.add('in'); }, i * 70);
        revealObserver.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------- one-shot "in view" helper util */
  function whenInView(el, fn) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { fn(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
  }

  /* ------------------------------- the long Democratic century, as tiles */
  /* Presidential elections 1872 through 1968. Democrats carried Bastrop
     County in virtually every one; 1896 (McKinley) is the lone Republican
     plurality. Source: Handbook of Texas, "Bastrop County". */
  var streak = document.getElementById('streakGrid');
  if (streak) {
    var frag = document.createDocumentFragment();
    var tiles = [];
    for (var y = 1872; y <= 1968; y += 4) {
      var t = document.createElement('div');
      t.className = 'tile' + (y === 1896 ? ' r' : '');
      t.setAttribute('data-year', String(y));
      t.title = y + ' — ' + (y === 1896 ? 'McKinley (R) plurality' : 'Democratic');
      frag.appendChild(t);
      tiles.push(t);
    }
    streak.appendChild(frag);
    whenInView(streak, function () {
      tiles.forEach(function (t, i) {
        window.setTimeout(function () { t.classList.add('in'); }, reduceMotion ? 0 : i * 45);
      });
    });
  }

  /* ------------------------------------------- 2020 precincts: 17 R / 5 D */
  var pgrid = document.getElementById('precinctGrid');
  if (pgrid) {
    var pfrag = document.createDocumentFragment();
    var cells = [];
    for (var p = 0; p < 22; p++) {
      var c = document.createElement('div');
      c.className = 'p' + (p < 17 ? ' r' : '');
      c.title = p < 17 ? 'Majority Republican precinct' : 'Majority Democratic precinct';
      pfrag.appendChild(c);
      cells.push(c);
    }
    pgrid.appendChild(pfrag);
    whenInView(pgrid, function () {
      cells.forEach(function (c, i) {
        window.setTimeout(function () { c.classList.add('in'); }, reduceMotion ? 0 : i * 40);
      });
    });
  }

  /* -------------------------------------------------------- result bars */
  Array.prototype.forEach.call(document.querySelectorAll('.bar-fill'), function (fill) {
    var pct = parseFloat(fill.getAttribute('data-pct')) || 0;
    whenInView(fill.closest('.result-card') || fill, function () {
      window.setTimeout(function () { fill.style.width = pct + '%'; }, 120);
    });
  });

  /* ---------------------------------------------------- counting numbers */
  Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';

    function render(v) {
      var n = decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString('en-US');
      el.textContent = prefix + n + suffix;
    }

    if (reduceMotion) { render(target); return; }

    whenInView(el, function () {
      var duration = 1500;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        render(target * eased);
        if (t < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  });

  /* ------------------------------------------------- hero parallax ridges */
  var ridges = document.querySelectorAll('.hero-ridge .ridge');
  if (ridges.length && !reduceMotion) {
    var pTicking = false;
    window.addEventListener('scroll', function () {
      if (pTicking) return;
      pTicking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          ridges[0].style.transform = 'translateY(' + (y * 0.16) + 'px)';
          ridges[1].style.transform = 'translateY(' + (y * 0.09) + 'px)';
          ridges[2].style.transform = 'translateY(' + (y * 0.03) + 'px)';
        }
        pTicking = false;
      });
    }, { passive: true });
  }

  /* ----------------------------------------------- embers over the pines */
  var canvas = document.getElementById('emberCanvas');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var running = true;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      var count = Math.max(28, Math.min(90, Math.round(w / 16)));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.9 + 0.5,
          vy: -(Math.random() * 0.34 + 0.08),
          vx: (Math.random() - 0.5) * 0.22,
          a: Math.random() * 0.55 + 0.12,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function tint() {
      return root.getAttribute('data-theme') === 'light'
        ? [194, 65, 12]
        : [236, 196, 120];
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      var rgb = tint();
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.tw) * 0.12;
        p.tw += 0.012;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;

        var alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw * 1.7));
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha.toFixed(3) + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      window.requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; window.requestAnimationFrame(frame); }
    });

    resize();
    window.requestAnimationFrame(frame);

    /* stop painting once the hero has scrolled well out of view */
    var hero = document.getElementById('top');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running && !document.hidden) { running = true; window.requestAnimationFrame(frame); }
        if (!visible) running = false;
      }, { threshold: 0 }).observe(hero);
    }
  }
})();
