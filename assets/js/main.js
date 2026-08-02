/* ==========================================================================
   Red Clay & Lost Pines
   Progressive enhancement only. The document is complete without this file.
   Five jobs: theme, reveal, rail state, and three charts upgraded FROM the
   tables already in the markup. No chart data exists in this file.
   Every module is isolated: if one throws, the rest still run and that
   module's ruled table simply stays visible.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var NS = 'http://www.w3.org/2000/svg';
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = mqReduce.matches;
  if (mqReduce.addEventListener) {
    mqReduce.addEventListener('change', function (e) { reduce = e.matches; });
  }

  function mod(fn) { try { fn(); } catch (e) { /* isolated by design */ } }
  function el(n, a) {
    var e = document.createElementNS(NS, n);
    for (var k in a) if (a[k] !== undefined) e.setAttribute(k, a[k]);
    return e;
  }
  function txt(cls, x, y, s, anchor) {
    var t = el('text', { 'class': cls, x: x, y: y, 'text-anchor': anchor || 'start' });
    t.textContent = s; return t;
  }
  /* the 45-degree Democratic hatch: colour is never the only encoding */
  function hatch(svg, id) {
    var defs = el('defs', {});
    var p = el('pattern', { id: id, width: 5, height: 5,
      patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
    p.appendChild(el('rect', { width: 5, height: 5, fill: 'var(--data-d)' }));
    p.appendChild(el('rect', { width: 1.4, height: 5, fill: 'var(--bg)', opacity: 0.85 }));
    defs.appendChild(p); svg.appendChild(defs);
  }
  function upgrade(id, decorativeSvg) {
    var f = document.getElementById(id);
    if (!f) return;
    f.classList.add('chart--upgraded');
    /* a data chart's SVG is decorative once its table is in the a11y tree */
    if (decorativeSvg) {
      var svg = f.querySelector('.chart__svg');
      if (svg) {
        svg.setAttribute('aria-hidden', 'true');
        svg.removeAttribute('role');
        svg.removeAttribute('aria-label');
      }
    }
  }

  /* -------------------------------------------------------------- THEME */
  mod(function () {
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    function sync() {
      var light = root.getAttribute('data-theme') === 'light';
      toggle.setAttribute('aria-pressed', String(light));
      toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to parchment theme');
    }
    sync();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('rcl-theme', next); } catch (e) {}
      sync();
    });
  });

  /* ---------------------------------------------------------------- TOC */
  mod(function () {
    var toc = document.querySelector('details.toc');
    if (!toc) return;
    document.addEventListener('click', function (e) {
      if (toc.open && !toc.contains(e.target)) toc.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toc.open) { toc.open = false; toc.querySelector('summary').focus(); }
    });
  });

  /* ------------------------------------------------- THE SPINE (hero) --
     A time axis that is also a table of contents. Marks are brass, not a
     party colour: this is wayfinding, not a data series. */
  mod(function () {
    var svg = document.getElementById('spineSvg');
    var rows = svg && [].slice.call(document.querySelectorAll('#spineData tr'));
    if (!svg || !rows || !rows.length) return;

    var W = 1000, m = 30, y = 64, lo = 1850, hi = 2032;
    function X(yr) { return m + (yr - lo) / (hi - lo) * (W - 2 * m); }

    svg.appendChild(el('line', { 'class': 'ax', x1: m, y1: y, x2: W - m, y2: y }));
    svg.appendChild(el('line', { 'class': 'ax', x1: m, y1: y - 6, x2: m, y2: y + 6 }));
    svg.appendChild(el('line', { 'class': 'ax', x1: W - m, y1: y - 6, x2: W - m, y2: y + 6 }));

    rows.forEach(function (r, i) {
      var yr = +r.getAttribute('data-year');
      var x = X(yr);
      var high = i % 2 === 0;            /* stagger so labels never collide */
      var ly = high ? y - 20 : y - 40;
      var a = el('a', { href: r.getAttribute('data-href') || '#' });
      /* transparent hit area: >=44 CSS px wide and tall at every breakpoint */
      a.appendChild(el('rect', { 'class': 'hit', x: x - 40, y: 0, width: 80, height: 112 }));
      a.appendChild(el('line', { 'class': 'ax', x1: x, y1: y - 8, x2: x, y2: ly + 5 }));
      a.appendChild(el('circle', { 'class': 'mk', cx: x, cy: y, r: 6 }));
      a.appendChild(txt('lbl', x, ly, r.getAttribute('data-label') || '', 'middle'));
      a.appendChild(txt('yr', x, y + 24, String(yr), 'middle'));
      svg.appendChild(a);
    });
    upgrade('spineFig');
  });

  /* ---------------------------------------------------- RUNBAND (Ch IV)
     One continuous band, not twenty-four bars. The source characterises the
     run as "virtually every" election and names only 1896; drawing each year
     as an individually attested result would harden a hedge it did not make. */
  mod(function () {
    var svg = document.getElementById('runSvg');
    var rows = svg && [].slice.call(document.querySelectorAll('#runData tr'));
    if (!svg || !rows || !rows.length) return;
    hatch(svg, 'hatchD');

    var W = 1000, m = 30, base = 120, band = 76, lo = 1870, hi = 1974;
    function X(yr) { return m + (yr - lo) / (hi - lo) * (W - 2 * m); }

    rows.forEach(function (r) {
      var from = +r.getAttribute('data-from'), to = +r.getAttribute('data-to');
      var kind = r.getAttribute('data-kind'), party = r.getAttribute('data-party');
      var g = el('g', {});

      if (kind === 'run') {
        g.appendChild(el('rect', { 'class': 'bar-d', x: X(from).toFixed(1), y: base - band,
          width: (X(to) - X(from)).toFixed(1), height: band }));
        svg.appendChild(g);
      } else {
        var h = band * 1.12, w = 14, x = X(from) - w / 2;
        g.appendChild(el('rect', { 'class': 'bar-r', x: x.toFixed(1), y: (base - h).toFixed(1),
          width: w, height: h.toFixed(1) }));
        svg.appendChild(g);
        svg.appendChild(el('line', { 'class': 'lead', x1: X(from), y1: base - h - 4, x2: X(from), y2: 30 }));
        svg.appendChild(txt('call', X(from) + 8, 26, '1896 — McKinley, plurality'));
      }
    });

    svg.appendChild(el('line', { 'class': 'base', x1: m, y1: base + 0.5, x2: W - m, y2: base + 0.5 }));
    [1880, 1900, 1920, 1940, 1960].forEach(function (d) {
      svg.appendChild(el('line', { 'class': 'base', x1: X(d), y1: base, x2: X(d), y2: base + 5,
        'stroke-width': 1 }));
      svg.appendChild(txt('tick', X(d), base + 24, String(d), 'middle'));
    });
    svg.appendChild(txt('tick', X(1876), base + 46, 'Democratic — 1876 to 1968, twenty-four elections'));
    upgrade('runFig', true);
  });

  /* --------------------------------------------------- THE PLATE (arc)
     Two registers on one axis. Upper: direction. Lower: margin, which is
     nearly empty on purpose — margins are documented for two elections. */
  mod(function () {
    var svg = document.getElementById('arcSvg');
    var rows = svg && [].slice.call(document.querySelectorAll('#arcData tr'));
    if (!svg || !rows || !rows.length) return;
    hatch(svg, 'hatchA');

    var W = 1000, mL = 54, mR = 26, lo = 1844, hi = 2030;
    var baseA = 110, band = 64, zero = 250, PER = 2;   /* 2 units per point, ±25 */
    function X(yr) { return mL + (yr - lo) / (hi - lo) * (W - mL - mR); }
    function Y(v) { return zero - v * PER; }

    svg.appendChild(txt('tick', mL, 18, 'WHO CARRIED THE COUNTY'));

    var pts = [];
    rows.forEach(function (r) {
      var from = +r.getAttribute('data-from'), to = +r.getAttribute('data-to');
      var kind = r.getAttribute('data-kind'), party = r.getAttribute('data-party');
      var margin = r.getAttribute('data-margin');

      if (kind === 'gap') {
        svg.appendChild(el('line', { 'class': 'gapline', x1: X(from), y1: baseA, x2: X(from), y2: baseA - band * 0.62 }));
        return;
      }
      var g = el('g', {});

      if (kind === 'run') {
        g.appendChild(el('rect', { 'class': 'bar-d', x: X(from).toFixed(1), y: baseA - band,
          width: (X(to) - X(from)).toFixed(1), height: band }));
      } else {
        var isR = party === 'R', h = isR ? band * 1.12 : band, w = 9;
        g.appendChild(el('rect', {
          'class': party === 'R' ? 'bar-r' : party === 'D' ? 'bar-d' : 'bar-o',
          x: (X(from) - w / 2).toFixed(1), y: (baseA - h).toFixed(1), width: w, height: h.toFixed(1) }));
      }
      svg.appendChild(g);
      if (margin) pts.push({ yr: from, v: +margin });
    });

    svg.appendChild(el('line', { 'class': 'base', x1: mL, y1: baseA + 0.5, x2: W - mR, y2: baseA + 0.5 }));
    svg.appendChild(txt('note', mL, 134, 'Dashed = no verified county return. Never interpolated.'));

    /* lower register — margin */
    svg.appendChild(txt('tick', mL, 186, 'REPUBLICAN MARGIN, IN POINTS'));
    /* scale reference as edge ticks, not full-width gridlines: a rule running
       under the only two data points competes with them for no gain */
    [[20, 'R +20'], [-20, 'D +20']].forEach(function (p) {
      svg.appendChild(el('line', { 'class': 'base', x1: mL, y1: Y(p[0]), x2: mL + 6, y2: Y(p[0]), 'stroke-width': 1 }));
      svg.appendChild(txt('tick', mL - 8, Y(p[0]) + 4, p[1], 'end'));
    });
    svg.appendChild(el('line', { 'class': 'zero', x1: mL, y1: zero, x2: W - mR, y2: zero }));
    svg.appendChild(txt('tick', mL - 8, zero + 4, 'even', 'end'));
    svg.appendChild(txt('note', mL + 6, zero - 10, 'Margins are documented for 2020 and 2024 only.'));

    pts.sort(function (a, b) { return a.yr - b.yr; });
    for (var i = 1; i < pts.length; i++) {
      svg.appendChild(el('line', { 'class': 'ln', x1: X(pts[i - 1].yr), y1: Y(pts[i - 1].v),
        x2: X(pts[i].yr), y2: Y(pts[i].v) }));
    }
    pts.forEach(function (p, i) {
      svg.appendChild(el('circle', { 'class': 'pt', cx: X(p.yr), cy: Y(p.v), r: 5 }));
      svg.appendChild(txt('call', X(p.yr) + (i ? 10 : -10), Y(p.v) + (i ? -14 : 6),
        '+' + p.v.toFixed(1), i ? 'start' : 'end'));
    });

    svg.appendChild(el('line', { 'class': 'base', x1: mL, y1: 310, x2: W - mR, y2: 310 }));
    [1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025].forEach(function (d) {
      svg.appendChild(el('line', { 'class': 'base', x1: X(d), y1: 310, x2: X(d), y2: 315, 'stroke-width': 1 }));
      svg.appendChild(txt('tick', X(d), 332, String(d), 'middle'));
    });
    upgrade('arcFig', true);
  });

  /* ------------------------------------------------------------- REVEAL
     Capped stagger, opacity and transform only. Under reduced motion no
     timer is ever scheduled — the class is applied immediately. */
  var items = document.querySelectorAll('[data-reveal]');
  function showAll() { [].forEach.call(items, function (e) { e.classList.add('in'); }); }
  try {
    if (!('IntersectionObserver' in window) || reduce) {
      showAll();
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en, i) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          if (reduce) { en.target.classList.add('in'); return; }
          var d = Math.min(i, 3) * 60;
          if (!d) { en.target.classList.add('in'); return; }
          setTimeout(function () { en.target.classList.add('in'); }, d);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      [].forEach.call(items, function (e) { io.observe(e); });
    }
  } catch (e) { showAll(); }

  /* ------------------------------------------ RAIL PROGRESS + POSITION
     One scaleY on one element: compositor-only, no layout, no paint. */
  mod(function () {
    var fill = document.getElementById('railFill');
    var chip = document.getElementById('chip');
    var links = [].slice.call(document.querySelectorAll('.rail a'));
    if (!links.length) return;
    var targets = links.map(function (a) {
      try { return document.querySelector(a.getAttribute('href')); } catch (e) { return null; }
    });
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var max = root.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (fill) fill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
        var mark = window.scrollY + window.innerHeight * 0.35, cur = -1;
        for (var i = 0; i < targets.length; i++) {
          if (targets[i] && targets[i].getBoundingClientRect().top + window.scrollY <= mark) cur = i;
        }
        links.forEach(function (a, i) {
          if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
        if (chip && cur > -1) chip.textContent = links[cur].textContent.replace(/^\s*\d{4}\s*/, '').trim();
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  });
})();
