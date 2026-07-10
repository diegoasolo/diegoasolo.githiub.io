
//links
const LINKS = {
  resume: './Images/CV_diego_solorzano.pdf',
  github: 'https://github.com/diegoasolo',
  linkedin: 'https://www.linkedin.com/in/diegoasolo/',
  email: 'diegoasolo12@gmail.com'
};

// Projects data is loaded from projects-data.js

// toggle theme
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// links and year
document.getElementById('resumeLink').href = LINKS.resume;
document.getElementById('githubLink').href = LINKS.github;
document.getElementById('linkedinLink').href = LINKS.linkedin;
document.getElementById('emailLink').href = `mailto:${LINKS.email}`;
document.getElementById('mailtoDirect').href = `mailto:${LINKS.email}`;
document.getElementById('year').textContent = new Date().getFullYear();

// projects render
const grid = document.getElementById('projectGrid');
if (grid) {
  // Show only first 3 projects on home page
  const projectsToShow = PROJECTS.slice(0, 3);
  function projCard(p){
    const el = document.createElement('article');
    el.className = 'card';
    const thumbnail = p.thumbnail || (p.media && p.media[0] && p.media[0].url) || '';
    el.innerHTML = `
      <img src="${thumbnail}" alt="Project thumbnail" loading="lazy"/>
      <div class="p">
        <h3 style="margin:0; font-size:18px">${p.title}</h3>
        <p class="muted" style="margin:8px 0 0">${p.shortDescription || p.description}</p>
        <div class="tags">${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
        <div style="margin-top:10px"><a class="btn" href="project-detail.html?id=${p.id}">Details →</a></div>
      </div>`;
    return el;
  }
  projectsToShow.forEach(p => grid.appendChild(projCard(p)));
}

// "Hi, I'm..." cycling title
const cycleEl = document.getElementById('cycleText');
if (cycleEl) {
  const words = ['Diego', 'an Electrical Engineer', 'a Photonics Researcher', 'a Musician', 'a Coffee Lover'];
  const titleEl = cycleEl.closest('.hero-title');

  // Reserve exactly as much height as the tallest word needs (it may wrap
  // to more lines than others at narrow widths) so the title never grows
  // or shrinks — and nothing below it shifts — as the word cycles.
  function sizeHeroTitle(){
    if (!titleEl) return;
    const savedText = cycleEl.textContent;
    titleEl.style.minHeight = '0';
    let maxHeight = 0;
    words.forEach(w => {
      cycleEl.textContent = w;
      maxHeight = Math.max(maxHeight, titleEl.offsetHeight);
    });
    cycleEl.textContent = savedText;
    titleEl.style.minHeight = maxHeight + 'px';
  }
  sizeHeroTitle();
  let titleResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(titleResizeTimer);
    titleResizeTimer = setTimeout(sizeHeroTitle, 150);
  });

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    cycleEl.textContent = words[0];
  } else {
    const TYPE_SPEED = 70, DELETE_SPEED = 40, HOLD = 1400, GAP = 300;
    let wordIndex = 0, charIndex = 0, deleting = false;
    (function tick() {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        cycleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(tick, HOLD); return; }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        cycleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, GAP);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    })();
  }
}

// ====== Photonic circuit trace (hero -> about), with scroll-driven pulse ======
(function circuitFX(){
  const layer = document.getElementById('circuitLayer');
  const svg = document.getElementById('circuitSvg');
  const mainEl = document.getElementById('home');
  const heroEl = document.querySelector('.hero');
  const startEl = document.getElementById('heroCtas');
  const endEl = document.getElementById('aboutMoreBtn');
  if (!layer || !svg || !mainEl || !heroEl || !startEl || !endEl) return;

  const NS = 'http://www.w3.org/2000/svg';
  const BEND_RADIUS = 22;
  const COUPLER_HALF_ANGLE = 20 * Math.PI / 180;
  const COUPLER_TAPER_R = 9;
  const COUPLER_MAX_R = 28;
  const COUPLER_ARCS = 5;
  const COUPLER_SEGMENTS = 12;
  const RING_RADIUS = 30;
  const RING_GAP = 5;
  const RING_ALONG_OFFSET = 95;
  const ZIG_STEP = 70;
  const ZIG_DROP = 60;
  const MOD_MARGIN = 290;
  const MOD_LEN = 250;
  const MOD_ARM_GAP = 26;
  const MOD_DIAG_FRAC = 0.22;
  const MOD_BOX_W = 14;
  const MOD_BOX_H = 10;
  const MOD_PS_LEN = 28;
  const MOD_PS_H = 8;
  const COUPLER_GLOW_LEN = 48;
  let pathEl, pathLength, layerTopDoc, layerHeight;
  let pulseMain, pulseArmTop, pulseArmBottom, pulseRing;
  let modStartLen, modEndLen, modP0, modP2, modArmTop, modArmBottom;
  let ringCx, ringCy, ringWindowStart, ringLoopEnd;
  let couplerStart, couplerEnd;

  function dist(a, b){ return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function towards(from, to, d){
    const dx = to[0] - from[0], dy = to[1] - from[1];
    const len = Math.hypot(dx, dy) || 1;
    return [from[0] + (dx / len) * d, from[1] + (dy / len) * d];
  }
  // Builds a polyline path with each interior corner replaced by a smooth
  // curve, so the trace reads like a waveguide bend rather than a sharp turn.
  function roundedPath(points, radius){
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1], curr = points[i], next = points[i + 1];
      const r = Math.min(radius, dist(prev, curr) / 2, dist(curr, next) / 2);
      const start = towards(curr, prev, r);
      const end = towards(curr, next, r);
      d += ` L ${start[0]} ${start[1]} Q ${curr[0]} ${curr[1]} ${end[0]} ${end[1]}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last[0]} ${last[1]}`;
    return d;
  }

  // Points along a circular arc of radius r, centered at the local origin,
  // sweeping from fromAngle to toAngle (0 = straight up / -y, positive = right).
  function arcPoints(r, fromAngle, toAngle, segments){
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = fromAngle + (toAngle - fromAngle) * (i / segments);
      pts.push([r * Math.sin(t), -r * Math.cos(t)]);
    }
    return pts;
  }
  // Point at fraction t (0-1) of the total length along a polyline.
  function polylineAtT(pts, t){
    const segLens = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) { const l = dist(pts[i], pts[i + 1]); segLens.push(l); total += l; }
    let target = Math.max(0, Math.min(1, t)) * total;
    for (let i = 0; i < segLens.length; i++) {
      if (target <= segLens[i] || i === segLens.length - 1) {
        const localT = segLens[i] ? target / segLens[i] : 0;
        return {
          x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * localT,
          y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * localT
        };
      }
      target -= segLens[i];
    }
    return { x: pts[pts.length - 1][0], y: pts[pts.length - 1][1] };
  }
  // Finds the length along pathEl whose point is closest to `target`, near
  // `approxLen` (a raw-waypoint estimate). Corner rounding means the actual
  // rendered path deviates slightly from raw waypoint-distance sums, so a
  // transition anchored to the raw estimate can visibly jump; this anchors
  // it to where the path truly is instead.
  function lengthAtPoint(el, target, approxLen, searchRadius, total){
    const lo = Math.max(0, approxLen - searchRadius);
    const hi = Math.min(total, approxLen + searchRadius);
    let bestLen = approxLen, bestDist = Infinity;
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
      const len = lo + (hi - lo) * (i / steps);
      const p = el.getPointAtLength(len);
      const d = dist([p.x, p.y], target);
      if (d < bestDist) { bestDist = d; bestLen = len; }
    }
    return bestLen;
  }
  function pointsToPathD(pts, close){
    let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
    if (close) d += ' Z';
    return d;
  }
  // Builds a focusing-grating-coupler icon: a wedge that's blank near the
  // apex (the taper) then fanned with curved, evenly-spaced period lines —
  // anchored at (x, y), apex touching the waveguide, opening away from it.
  function couplerGroup(x, y){
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'circuit-coupler');
    g.setAttribute('transform', `translate(${x}, ${y})`);

    const outlinePts = [[0, 0]].concat(arcPoints(COUPLER_MAX_R, -COUPLER_HALF_ANGLE, COUPLER_HALF_ANGLE, COUPLER_SEGMENTS));
    const taper = document.createElementNS(NS, 'path');
    taper.setAttribute('class', 'circuit-coupler-taper');
    taper.setAttribute('d', pointsToPathD(outlinePts, true));
    g.appendChild(taper);

    let teethD = '';
    for (let i = 1; i <= COUPLER_ARCS; i++) {
      const r = COUPLER_TAPER_R + (COUPLER_MAX_R - COUPLER_TAPER_R) * (i / COUPLER_ARCS);
      teethD += pointsToPathD(arcPoints(r, -COUPLER_HALF_ANGLE, COUPLER_HALF_ANGLE, COUPLER_SEGMENTS), false) + ' ';
    }
    const teeth = document.createElementNS(NS, 'path');
    teeth.setAttribute('class', 'circuit-coupler-teeth');
    teeth.setAttribute('d', teethD.trim());
    g.appendChild(teeth);

    return g;
  }

  function build(){
    svg.querySelectorAll('.circuit-trace-guide, .circuit-trace, .circuit-modulator-arm, .circuit-modulator-ps, .circuit-modulator-box, .circuit-coupler, .circuit-ring, .circuit-pulse').forEach(n => n.remove());

    const vw = document.documentElement.clientWidth;
    const mainRect = mainEl.getBoundingClientRect();
    const heroRect = heroEl.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    const pad = 16;
    const xA = startRect.left + startRect.width * 0.5;
    const yA = startRect.bottom + COUPLER_MAX_R + 16;
    const yHeroBottom = heroRect.bottom + 10;
    const xOuter = mainRect.right + 48;
    const yB = endRect.top + endRect.height * 0.5;
    const yBelowAbout = endRect.bottom + 32;
    const xB = endRect.right + 24;

    const top = yA - pad;
    const bottom = yBelowAbout + pad;
    const height = Math.max(bottom - top, 40);

    layer.style.top = (top - mainRect.top) + 'px';
    layer.style.height = height + 'px';
    layer.style.width = vw + 'px';
    svg.setAttribute('viewBox', `0 0 ${vw} ${height}`);
    svg.setAttribute('width', vw);
    svg.setAttribute('height', height);

    // Waypoints stay inside the hero's left (text) column and then swing
    // out past the container's right edge — clear of both the hero photo
    // and the project cards — before ducking back in beside the About CTA.
    // From the coupler: down, right, down, left — so the bus arrives at the
    // ring's top moving left, entering counter-clockwise and exiting at the
    // bottom, where the bottom bus genuinely continues the route onward.
    const heroImgEl = document.getElementById('heroImg');
    const safeX = heroImgEl ? heroImgEl.getBoundingClientRect().left - 24 : xOuter;
    ringCx = Math.min(xA + ZIG_STEP, safeX - RING_RADIUS);
    const rightX = Math.min(ringCx + RING_ALONG_OFFSET, safeX);
    const projectsHeading = document.querySelector('#projects h2');
    const ringSpan = RING_RADIUS * 2 + RING_GAP * 2;
    // Turn 1 sits well above the hero's own bottom edge, so there's genuine
    // room for a visible "down" step afterward instead of it getting
    // squashed to nothing by the Projects heading below.
    const turn1Y = yHeroBottom - (ZIG_DROP + ringSpan + 40);
    const maxTopBusY = projectsHeading
      ? projectsHeading.getBoundingClientRect().top - ringSpan - 10
      : turn1Y + ZIG_DROP;
    const topBusYAbs = Math.max(turn1Y + 4, Math.min(turn1Y + ZIG_DROP, maxTopBusY));
    const ringCyAbs = topBusYAbs + RING_RADIUS + RING_GAP;
    const dropYAbs = ringCyAbs + RING_RADIUS + RING_GAP;
    ringCy = ringCyAbs - top;

    const points = [
      [xA, yA - top],
      [xA, turn1Y - top],
      [rightX, turn1Y - top],
      [rightX, topBusYAbs - top],
      [ringCx, topBusYAbs - top],
      [ringCx, dropYAbs - top],
      [xOuter, dropYAbs - top],
      [xOuter, yBelowAbout - top],
      [xB, yBelowAbout - top],
      [xB, yB - top]
    ];
    const ringExitIdx = 5, turn2Idx = 6;
    const turn3Idx = 7;
    const turn4Idx = 8;

    const d = roundedPath(points, BEND_RADIUS);

    // Invisible guide carrying the full, unbroken geometry — used only for
    // length/position math (ring + pulse), never rendered directly, since
    // the visible trace gets interrupted by the modulator below.
    pathEl = document.createElementNS(NS, 'path');
    pathEl.setAttribute('d', d);
    pathEl.setAttribute('class', 'circuit-trace-guide');
    svg.appendChild(pathEl);
    pathLength = pathEl.getTotalLength();

    const [xStart, yStart] = points[0];
    const [xEnd, yEnd] = points[points.length - 1];
    couplerStart = couplerGroup(xStart, yStart);
    couplerEnd = couplerGroup(xEnd, yEnd);
    svg.appendChild(couplerStart);
    svg.appendChild(couplerEnd);

    // Dual-bus ring resonator: the route genuinely dips through it — the
    // trace up to points[4] is the top bus (touching the ring's top), and
    // the trace from points[5] onward is the bottom bus (touching the
    // ring's bottom) that actually continues the journey from here on.
    // Purely decorative: both bus lines also extend past the ring to the
    // screen's left edge, independent of the actual routed path/pulse —
    // drawn before the ring so it visually sits on top of them.
    const topBusExtension = document.createElementNS(NS, 'path');
    topBusExtension.setAttribute('d', `M 0 ${points[4][1]} L ${ringCx} ${points[4][1]}`);
    topBusExtension.setAttribute('class', 'circuit-trace');
    svg.appendChild(topBusExtension);

    const bottomBusExtension = document.createElementNS(NS, 'path');
    bottomBusExtension.setAttribute('d', `M 0 ${points[5][1]} L ${ringCx} ${points[5][1]}`);
    bottomBusExtension.setAttribute('class', 'circuit-trace');
    svg.appendChild(bottomBusExtension);

    const ring = document.createElementNS(NS, 'circle');
    ring.setAttribute('cx', ringCx);
    ring.setAttribute('cy', ringCy);
    ring.setAttribute('r', RING_RADIUS);
    ring.setAttribute('class', 'circuit-ring');
    svg.appendChild(ring);

    // Running cumulative length at each waypoint, so downstream lookups
    // (ring window, modulator span) stay correct regardless of how many
    // points make up any given stretch (e.g. the meander below).
    const cumLen = [0];
    for (let i = 1; i < points.length; i++) cumLen.push(cumLen[i - 1] + dist(points[i - 1], points[i]));

    // Anchor the ring's pulse-handoff points to where the (corner-rounded)
    // path actually sits, not the raw waypoint-distance estimate — keeps the
    // straight-line pulse and the arc pulse perfectly lined up at the swap.
    ringWindowStart = lengthAtPoint(pathEl, points[4], cumLen[4], BEND_RADIUS * 3, pathLength);
    const ringExitLen = lengthAtPoint(pathEl, points[ringExitIdx], cumLen[ringExitIdx], BEND_RADIUS * 3, pathLength);
    ringLoopEnd = ringExitLen;

    // Modulator: placed after the (now shifted) 3rd turn, splitting into two
    // arms and recombining further along the same run.
    const cumLen3 = cumLen[turn3Idx];
    const seg34Len = cumLen[turn4Idx] - cumLen[turn3Idx];
    modStartLen = cumLen3 + MOD_MARGIN;
    const modLen = Math.min(MOD_LEN, Math.max(0, seg34Len - MOD_MARGIN * 2));
    modEndLen = modStartLen + modLen;
    const modStart = pathEl.getPointAtLength(modStartLen);
    const modEnd = pathEl.getPointAtLength(modEndLen);
    modP0 = [modStart.x, modStart.y];
    modP2 = [modEnd.x, modEnd.y];
    const baseY = (modP0[1] + modP2[1]) / 2;
    const xAt = (t) => modP0[0] + (modP2[0] - modP0[0]) * t;
    // Straight diagonal legs out to a flat, offset run down the middle —
    // matches a real MZM: splitter -> two arms -> combiner.
    const armTop = [modP0, [xAt(MOD_DIAG_FRAC), baseY - MOD_ARM_GAP], [xAt(1 - MOD_DIAG_FRAC), baseY - MOD_ARM_GAP], modP2];
    const armBottom = [modP0, [xAt(MOD_DIAG_FRAC), baseY + MOD_ARM_GAP], [xAt(1 - MOD_DIAG_FRAC), baseY + MOD_ARM_GAP], modP2];
    modArmTop = armTop;
    modArmBottom = armBottom;

    // Visible trace: bus segments broken at the ring (small coupling gaps,
    // no line drawn through it) and at the modulator, plus the modulator's
    // two arm legs standing in for its split-and-recombine section.
    const topBusD = roundedPath(points.slice(0, 5), BEND_RADIUS);
    const topBus = document.createElementNS(NS, 'path');
    topBus.setAttribute('d', topBusD);
    topBus.setAttribute('class', 'circuit-trace');
    svg.appendChild(topBus);

    const beforeD = roundedPath(points.slice(ringExitIdx, turn3Idx + 1).concat([modP0]), BEND_RADIUS);
    const beforePath = document.createElementNS(NS, 'path');
    beforePath.setAttribute('d', beforeD);
    beforePath.setAttribute('class', 'circuit-trace');
    svg.appendChild(beforePath);

    const afterD = roundedPath([modP2].concat(points.slice(turn4Idx)), BEND_RADIUS);
    const afterPath = document.createElementNS(NS, 'path');
    afterPath.setAttribute('d', afterD);
    afterPath.setAttribute('class', 'circuit-trace');
    svg.appendChild(afterPath);

    [armTop, armBottom].forEach((pts) => {
      const arm = document.createElementNS(NS, 'path');
      arm.setAttribute('d', pointsToPathD(pts, false));
      arm.setAttribute('class', 'circuit-modulator-arm');
      svg.appendChild(arm);
    });

    // Phase-shifter blocks, centered on each arm's flat run.
    [-MOD_ARM_GAP, MOD_ARM_GAP].forEach((offset) => {
      const cx = xAt(0.5), cy = baseY + offset;
      const ps = document.createElementNS(NS, 'rect');
      ps.setAttribute('x', cx - MOD_PS_LEN / 2);
      ps.setAttribute('y', cy - MOD_PS_H / 2);
      ps.setAttribute('width', MOD_PS_LEN);
      ps.setAttribute('height', MOD_PS_H);
      ps.setAttribute('rx', 2);
      ps.setAttribute('class', 'circuit-modulator-ps');
      svg.appendChild(ps);
    });

    // Splitter / combiner blocks (1x2 and 2x1 MMI) at the junctions.
    [modP0, modP2].forEach((p) => {
      const box = document.createElementNS(NS, 'rect');
      box.setAttribute('x', p[0] - MOD_BOX_W / 2);
      box.setAttribute('y', p[1] - MOD_BOX_H / 2);
      box.setAttribute('width', MOD_BOX_W);
      box.setAttribute('height', MOD_BOX_H);
      box.setAttribute('rx', 2);
      box.setAttribute('class', 'circuit-modulator-box');
      svg.appendChild(box);
    });

    pulseMain = document.createElementNS(NS, 'path');
    pulseMain.setAttribute('class', 'circuit-pulse');
    svg.appendChild(pulseMain);
    pulseArmTop = document.createElementNS(NS, 'path');
    pulseArmTop.setAttribute('class', 'circuit-pulse');
    svg.appendChild(pulseArmTop);
    pulseArmBottom = document.createElementNS(NS, 'path');
    pulseArmBottom.setAttribute('class', 'circuit-pulse');
    svg.appendChild(pulseArmBottom);
    pulseRing = document.createElementNS(NS, 'path');
    pulseRing.setAttribute('class', 'circuit-pulse');
    svg.appendChild(pulseRing);

    layerTopDoc = top + window.scrollY;
    layerHeight = height;
    updatePulse();
  }

  const PULSE_LEN = 20;
  function updatePulse(){
    if (!pathEl || !pulseMain) return;
    const viewportCenter = window.scrollY + window.innerHeight * 0.5;
    let progress = (viewportCenter - layerTopDoc) / layerHeight;
    // Extend past progress=1 by the pulse's own length so the tail can catch
    // up to the (now fixed) head at the end coupler and the beam shrinks
    // away there, mirroring how it grows from nothing at the start coupler.
    const maxProgress = 1 + PULSE_LEN / pathLength;
    progress = Math.max(0, Math.min(maxProgress, progress));
    const virtualHeadLen = progress * pathLength;
    const headLen = Math.min(virtualHeadLen, pathLength);
    const tailLen = Math.max(0, Math.min(virtualHeadLen - PULSE_LEN, pathLength));

    const overlapsMod = modStartLen != null && headLen >= modStartLen && tailLen <= modEndLen;
    const overlapsRingLoop = ringWindowStart != null && headLen >= ringWindowStart && tailLen <= ringLoopEnd;

    if (couplerStart) couplerStart.classList.toggle('is-lit', headLen <= COUPLER_GLOW_LEN);
    if (couplerEnd) couplerEnd.classList.toggle('is-lit', tailLen >= pathLength - COUPLER_GLOW_LEN);

    if (overlapsMod) {
      // The pulse is inside the modulator's span — render it as two short
      // segments riding each arm, so the light visibly splits and recombines.
      const localHead = Math.min(Math.max(headLen, modStartLen), modEndLen);
      const localTail = Math.min(Math.max(tailLen, modStartLen), modEndLen);
      const tHead = (localHead - modStartLen) / (modEndLen - modStartLen);
      const tTail = (localTail - modStartLen) / (modEndLen - modStartLen);
      const topTail = polylineAtT(modArmTop, tTail);
      const topHead = polylineAtT(modArmTop, tHead);
      const botTail = polylineAtT(modArmBottom, tTail);
      const botHead = polylineAtT(modArmBottom, tHead);
      pulseArmTop.setAttribute('d', `M ${topTail.x} ${topTail.y} L ${topHead.x} ${topHead.y}`);
      pulseArmBottom.setAttribute('d', `M ${botTail.x} ${botTail.y} L ${botHead.x} ${botHead.y}`);
      pulseMain.setAttribute('d', '');
      pulseRing.setAttribute('d', '');
    } else if (overlapsRingLoop) {
      // The pulse has reached the ring — it leaves the top bus and loops
      // around the ring's left side, top to bottom, onto the bottom bus
      // that actually continues the route from here on. Head/tail are
      // clamped independently (same approach as the modulator arms above),
      // so the arc grows in from the exact hand-off point and shrinks back
      // out the same way, instead of snapping to a fixed-width segment.
      const localHead = Math.min(Math.max(headLen, ringWindowStart), ringLoopEnd);
      const localTail = Math.min(Math.max(tailLen, ringWindowStart), ringLoopEnd);
      const tHead = (localHead - ringWindowStart) / (ringLoopEnd - ringWindowStart);
      const tTail = (localTail - ringWindowStart) / (ringLoopEnd - ringWindowStart);
      const angleAt = (t) => Math.PI * 2 + (Math.PI - Math.PI * 2) * t;
      const a1 = angleAt(tTail);
      const a2 = angleAt(tHead);
      const arcPts = arcPoints(RING_RADIUS, a1, a2, 8).map(([lx, ly]) => [ringCx + lx, ringCy + ly]);
      pulseRing.setAttribute('d', pointsToPathD(arcPts, false));
      pulseMain.setAttribute('d', '');
      pulseArmTop.setAttribute('d', '');
      pulseArmBottom.setAttribute('d', '');
    } else {
      const head = pathEl.getPointAtLength(headLen);
      const tail = pathEl.getPointAtLength(tailLen);
      pulseMain.setAttribute('d', `M ${tail.x} ${tail.y} L ${head.x} ${head.y}`);
      pulseArmTop.setAttribute('d', '');
      pulseArmBottom.setAttribute('d', '');
      pulseRing.setAttribute('d', '');
    }
  }

  let ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updatePulse(); ticking = false; });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', build);
  build();
})();

// contact handling
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const subject = encodeURIComponent('Portfolio inquiry from ' + data.name);
  const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} <${data.email}>`);
  // Mailto fallback (no backend needed)
  window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
});

// smooth scroll (no frameworks)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  });
});