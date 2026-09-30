// onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
// Native Crew · "Así trabaja tu equipo": los agentes como personajes. Look "dusk". Uso no comercial.
// Todo es función pura de t. Contrato onetake: __seek, __ready, __meta y __events() para el sonido.
(function () {
  'use strict';
  const { clamp, lerp, seg, sstep, ease, ring } = OM;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const S = (el, k, v) => el.setAttribute(k, v);
  const f1 = v => (+v).toFixed(1), f3 = v => (+v).toFixed(3);
  const C = Object.assign({}, LOOK.color, { chat: '#2a2638', dark: '#15131c' });
  const DISP = LOOK.type.display.family, TEXT = LOOK.type.text.family;
  const DUR = 32;

  // ───────────────────────────── reparto ─────────────────────────────
  const CAST = {
    Y: { name: 'Encargado', color: C.accent2, x: 960, y: 360, R: 78, voice: 1.0 },
    B: { name: 'Recepcionista', color: '#4c9aff', x: 600, y: 700, R: 66, voice: 1.35 },
    G: { name: 'Responsable de clientes', color: '#3ddc97', x: 960, y: 700, R: 66, voice: 1.15 },
    R: { name: 'Recuperador', color: '#ff5f6d', x: 1320, y: 700, R: 66, voice: 0.8 },
  };
  const IDS = ['Y', 'B', 'G', 'R'];

  // ───────────────────────────── guion (segundos) ─────────────────────────────
  const K = {
    yAppear: 0.3, yGrow: 0.9, yEyes: 1.25, cap0: 1.5, cap0Out: 3.3, yHi: 2.85, yHop: [3.6, 4.2],
    drop: { B: 4.2, G: 4.45, R: 4.7 }, cap1: 5.2, cap1Out: 6.9,
    panelL: 7.0, panelLOut: 19.3, panelR: 14.6, panelROut: 19.35, panelR2: 19.6, panelR2Out: 24.6,
    cap2: 9.8, cap2Out: 12.4, cardB: 9.45, toss1: [10.3, 10.9],
    later: 12.7, laterOut: 13.9, cardBad: 13.0, toss2: [13.9, 14.4], tap: 16.3, toss3: [16.9, 17.4],
    cap3: 16.6, cap3Out: 19.2, card2In: [19.7, 20.3], toss4: [22.2, 23.0], plus: 23.9,
    cap4: 20.0, cap4Out: 24.4, net: 25.0, wave: 25.2, cap5: 25.4, cap5Out: 27.0,
    outro: 27.0, logo: 27.9, dive: [28.6, 29.2], tag: 29.7,
  };
  const HOLDS = [[5.9, 6.9], [12.0, 12.6], [18.95, 19.6], [24.2, 24.9], [26.25, 26.9], [30.3, 99]];
  // quién habla y cuándo (la boca se mueve, suena la "voz")
  const TALK = [['Y', 2.85, 3.3], ['B', 7.75, 8.25], ['G', 11.0, 11.5], ['G', 13.2, 13.7], ['Y', 14.8, 15.3], ['G', 17.5, 17.95],
    ['R', 20.4, 20.95], ['B', 23.1, 23.55]];
  const BLINKS = { Y: [1.9, 5.4, 8.8, 12.2, 19.1, 24.5, 27.75], B: [6.2, 11.8, 16.0, 19.4, 26.4], G: [6.5, 9.4, 15.6, 21.0, 26.6], R: [6.0, 10.4, 14.9, 18.4, 26.3] };
  const MOODS = [ // [id, desde, hasta, humor]
    ['Y', 1.25, 3.6, 'happy'], ['B', 9.15, 9.8, 'happy'], ['G', 10.9, 11.6, 'happy'], ['G', 13.05, 13.95, 'worried'],
    ['Y', 14.4, 14.75, 'o'], ['Y', 16.55, 17.2, 'happy'], ['G', 17.4, 17.6, 'happy'], ['G', 18.65, 19.5, 'happy'],
    ['R', 19.9, 21.6, 'determined'], ['G', 22.45, 22.85, 'o'], ['B', 23.0, 23.1, 'o'], ['B', 23.9, 24.6, 'happy'], ['R', 23.9, 24.6, 'happy'],
    ['Y', 25.2, 26.2, 'happy'], ['B', 25.2, 26.2, 'happy'], ['G', 25.2, 26.2, 'happy'], ['R', 25.2, 26.2, 'happy'],
  ];

  // conversaciones
  const PANELS = {
    L: { x: 270, top: 250, t0: K.panelL, t1: K.panelLOut, head: 'Ana · WhatsApp' },
    R: { x: 1650, top: 250, t0: K.panelR, t1: K.panelROut, head: 'Tú · el dueño' },
    R2: { x: 1650, top: 250, t0: K.panelR2, t1: K.panelR2Out, head: 'Luis · WhatsApp' },
  };
  const MSGS = [ // [panel, t, de, líneas, agente]
    ['L', 7.3, 'client', ['¿Tenéis clase mañana?']],
    ['L', 8.35, 'agent', ['¡Sí! ¿Te reservo el', 'jueves a las 19:00?'], 'B'],
    ['L', 9.0, 'client', ['¡Vale!']],
    ['L', 11.65, 'agent', ['¡Bienvenida, Ana!'], 'G'],
    ['R', 15.35, 'agent', ['Ana lleva 12 días sin', 'venir. ¿Le escribo?'], 'Y'],
    ['R', 16.5, 'owner', ['Sí']],
    ['L', 17.95, 'agent', ['¿Todo bien? Si te va mejor', 'otro horario, te lo busco.'], 'G'],
    ['L', 18.6, 'client', ['¡Gracias! Vuelvo el lunes']],
    ['R2', 21.1, 'agent', ['¡Hola, Luis! Te echamos', 'de menos. ¿Te apetece volver?'], 'R'],
    ['R2', 21.8, 'client', ['¿Tenéis horario de tarde?']],
    ['R2', 23.55, 'agent', ['¡Claro! Jueves a las 18:00.', 'Te guardo sitio.'], 'B'],
  ];
  const PACKET = 0.33; // lo que tarda un mensaje en viajar del agente a la conversación

  // ───────────────────────────── utilidades ─────────────────────────────
  function E(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const op = (el, v) => S(el, 'opacity', f3(clamp(v, 0, 1)));
  const hide = el => S(el, 'opacity', 0);
  function tf(el, x, y, s = 1, rot = 0, sx = 1, sy = 1) {
    S(el, 'transform', `translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f3(s * sx)},${f3(s * sy)})`);
  }
  function disp(parent, str, size, { anchor = 'middle', fill = C.ink, weight = 600, x = 0, y = 0 } = {}) {
    const t = E('text', { x, y, 'font-size': size, 'font-family': DISP, 'font-weight': weight, 'text-anchor': anchor, fill,
      'letter-spacing': f1(LOOK.type.display.tracking * size) }, parent);
    t.textContent = str; return t;
  }
  function text(parent, str, size, { anchor = 'middle', fill = C.mute, weight = 500, x = 0, y = 0 } = {}) {
    const t = E('text', { x, y, 'font-size': size, 'font-family': TEXT, 'font-weight': weight, 'text-anchor': anchor, fill }, parent);
    t.textContent = str; return t;
  }
  const G = (parent, fn) => { const g = E('g', { opacity: 0 }, parent); if (fn) fn(g); return g; };
  function pill(parent, str, { size = 20, fill = C.card, color = C.ink, padX = 18, h = null, stroke = C.line, font = TEXT, weight = 600 } = {}) {
    const g = G(parent);
    const t = (font === DISP ? disp : text)(g, str, size, { fill: color, weight });
    const w = t.getComputedTextLength() + padX * 2, hh = h || size * 1.8;
    S(t, 'y', f1(size * 0.35));
    g.insertBefore(E('rect', { x: -w / 2, y: -hh / 2, width: w, height: hh, rx: hh / 2, fill, stroke, 'stroke-width': 2 }), t);
    g._w = w; return g;
  }
  function showRise(el, t, tIn, tOut, x, y, { dist = 26, outDur = 0.25 } = {}) {
    if (t < tIn - 0.01 || (tOut != null && t > tOut + outDur)) { hide(el); return; }
    const w = OM.wordRise(t, tIn, { dist });
    let o = w.op, dy = w.y, sc = w.s;
    if (tOut != null && t >= tOut) { const l = OM.liftOut(t, tOut, { dur: outDur, dist: 40 }); o *= l.op; dy += l.dy; sc *= l.s; }
    tf(el, x, y + dy, sc); op(el, o);
  }
  const mtx = M => `matrix(${M.map(v => v.toFixed(4)).join(',')})`;
  const inWin = (t, a, b) => t >= a && t < b;

  // ───────────────────────────── personajes ─────────────────────────────
  const CH = {};
  function buildChar(id, parent) {
    const c = CAST[id], R = c.R, g = E('g', { opacity: 0 }, parent);
    const o = { g, R };
    o.halo = E('circle', { r: R * 1.7, fill: c.color, opacity: 0.22, filter: 'url(#glow)' }, g);
    o.body = E('circle', { r: R, fill: c.color }, g);
    E('ellipse', { cx: -R * 0.36, cy: -R * 0.42, rx: R * 0.26, ry: R * 0.16, fill: '#fff', opacity: 0.32, transform: `rotate(-25 ${-R * 0.36} ${-R * 0.42})` }, g);
    o.face = E('g', {}, g);
    o.blush = [-1, 1].map(s => E('ellipse', { cx: s * R * 0.52, cy: R * 0.16, rx: R * 0.14, ry: R * 0.08, fill: '#ff8fa3', opacity: 0 }, o.face));
    o.eyes = [-1, 1].map(s => {
      const eg = E('g', { transform: `translate(${f1(s * R * 0.32)},${f1(-R * 0.12)})` }, o.face);
      const lid = E('g', {}, eg);
      E('ellipse', { rx: R * 0.17, ry: R * 0.21, fill: '#fff' }, lid);
      const pupil = E('circle', { r: R * 0.095, fill: C.dark }, lid);
      const glint = E('circle', { r: R * 0.03, fill: '#fff' }, lid);
      const happy = E('path', { d: `M${f1(-R * 0.14)},${f1(R * 0.04)} Q0,${f1(-R * 0.16)} ${f1(R * 0.14)},${f1(R * 0.04)}`, fill: 'none', stroke: C.dark, 'stroke-width': R * 0.07, 'stroke-linecap': 'round', opacity: 0 }, eg);
      return { eg, lid, pupil, glint, happy, s };
    });
    o.brows = [-1, 1].map(s => E('path', { d: `M${f1(-R * 0.13)},0 L${f1(R * 0.13)},0`, stroke: C.dark, 'stroke-width': R * 0.07, 'stroke-linecap': 'round', opacity: 0 }, o.face));
    o.mouth = E('path', { fill: 'none', stroke: C.dark, 'stroke-width': R * 0.07, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, o.face);
    o.sweat = E('path', { d: `M0,${-R * 0.16} Q${R * 0.11},0 0,${R * 0.1} Q${-R * 0.11},0 0,${-R * 0.16} Z`, fill: '#8fd3ff', opacity: 0 }, g);
    o.label = pill(parent, c.name, { size: 21, fill: C.card, color: C.ink, h: 40, padX: 18 });
    E('circle', { cx: -o.label._w / 2 + 16, cy: 0, r: 5, fill: c.color }, o.label);
    CH[id] = o;
  }
  function mouthPath(R, mood, talkOpen) {
    const r = v => f1(v * R);
    if (talkOpen) return { d: `M${r(-0.13)},${r(0.3)} Q0,${r(0.62)} ${r(0.13)},${r(0.3)} Q0,${r(0.2)} ${r(-0.13)},${r(0.3)} Z`, fill: C.dark };
    if (mood === 'happy') return { d: `M${r(-0.27)},${r(0.2)} Q0,${r(0.66)} ${r(0.27)},${r(0.2)} Z`, fill: C.dark };
    if (mood === 'worried') return { d: `M${r(-0.2)},${r(0.4)} Q0,${r(0.24)} ${r(0.2)},${r(0.4)}`, fill: 'none' };
    if (mood === 'o') return { d: `M${r(-0.09)},${r(0.34)} a${r(0.09)},${r(0.11)} 0 1 0 ${r(0.18)},0 a${r(0.09)},${r(0.11)} 0 1 0 ${r(-0.18)},0`, fill: C.dark };
    if (mood === 'determined') return { d: `M${r(-0.2)},${r(0.33)} L${r(0.2)},${r(0.3)}`, fill: 'none' };
    return { d: `M${r(-0.24)},${r(0.25)} Q0,${r(0.46)} ${r(0.24)},${r(0.25)}`, fill: 'none' };
  }
  const moodOf = (id, t) => { let m = 'smile'; for (const [i, a, b, mm] of MOODS) if (i === id && inWin(t, a, b)) m = mm; return m; };
  const talking = (id, t) => TALK.some(([i, a, b]) => i === id && inWin(t, a, b));
  const blinkK = (id, t) => { let k = 0; for (const b of BLINKS[id]) { const u = seg(t, b, b + 0.14); if (u > 0 && u < 1) k = Math.max(k, Math.sin(u * Math.PI)); } return k; };

  // posiciones: el amarillo nace en el centro y sube; los demás caen del cielo
  function charPose(id, t) {
    const c = CAST[id];
    let x = c.x, y = c.y, s = 1, sx = 1, sy = 1, vis = true;
    if (id === 'Y') {
      if (t < K.yAppear) vis = false;
      const grow = OM.popIn(t, K.yGrow, { rise: 0, s0: 0.22, ds: 0.78, zeta: 0.5, omega: 14 });
      const born = OM.popIn(t, K.yAppear, { rise: 0, s0: 0, ds: 0.22, zeta: 0.6, omega: 18 });
      s = t < K.yGrow ? born.s : grow.s;
      if (t < K.yHop[0]) { x = 960; y = 560; }
      else { const h = OM.hop(t, K.yHop[0], K.yHop[1], { x: 960, y: 560 }, { x: c.x, y: c.y }, { height: 90 }); x = h.x; y = h.y; }
      const im = OM.impact(t, K.yHop[1], { sqx: 0.14, sqy: 0.18 }); if (t >= K.yHop[1]) { sx = im.sx; sy = im.sy; }
      if (t >= K.yHop[0] - 0.15 && t < K.yHop[0]) { const q = seg(t, K.yHop[0] - 0.15, K.yHop[0]); sx = 1 + 0.12 * q; sy = 1 - 0.14 * q; }
    } else {
      const t0 = K.drop[id];
      if (t < t0) vis = false;
      const k = seg(t, t0, t0 + 0.35); y = lerp(-160, c.y, k * k);
      if (t < t0 + 0.35) { sx = 0.9; sy = 1.14; }
      else { const im = OM.impact(t, t0 + 0.35, { sqx: 0.2, sqy: 0.24 }); sx = im.sx; sy = im.sy; }
    }
    // recoger la ficha: aplastarse un poco
    for (const [a, b, from, to] of TOSSES) {
      if (to === id && t >= b) { const im = OM.impact(t, b, { sqx: 0.12, sqy: 0.15 }); sx *= im.sx; sy *= im.sy; }
      if (from === id && t >= a - 0.16 && t < a + 0.12) { const q = t < a ? seg(t, a - 0.16, a) : 1 - seg(t, a, a + 0.12); sx *= 1 + 0.1 * q; sy *= 1 - 0.13 * q; }
    }
    // el verde se agacha cuando la ficha le pasa por encima
    if (id === 'G') { const d = sstep(22.35, 22.5, t) * (1 - sstep(22.75, 22.95, t)); sy *= 1 - 0.3 * d; sx *= 1 + 0.15 * d; y += 22 * d; }
    // saltitos de alegría y la ola final
    const hops = { B: [9.2, 23.95], Y: [16.6], G: [18.7], R: [23.95] }[id] || [];
    for (const h of hops) { const u = seg(t, h, h + 0.4); if (u > 0 && u < 1) y -= Math.sin(u * Math.PI) * 38; }
    const w = K.wave + IDS.indexOf(id) * 0.14, u = seg(t, w, w + 0.42); if (u > 0 && u < 1) y -= Math.sin(u * Math.PI) * 46;
    // final: los demás se van; el amarillo va al centro y salta al logo
    let o = vis ? 1 : 0;
    if (t >= K.outro) {
      if (id !== 'Y') { const k = seg(t, K.outro, K.outro + 0.4); o *= 1 - k; s *= 1 - 0.5 * k; y += 40 * k; }
      else {
        const k = ease.cubicInOut(seg(t, K.outro, K.outro + 0.5)); x = lerp(c.x, 960, k); y = lerp(c.y, 520, k);
        if (t >= K.dive[0]) {
          const h = OM.hop(t, K.dive[0], K.dive[1], { x: 960, y: 520 }, DOT_POS, { height: 170, curve: ease.cubicInOut });
          x = h.x; y = h.y; s *= lerp(1, DOT_R / CAST.Y.R, ease.cubicInOut(seg(t, K.dive[0], K.dive[1])));
          if (t >= K.dive[1]) { const im = OM.impact(t, K.dive[1], { sqx: 0.25, sqy: 0.3 }); sx = im.sx; sy = im.sy; }
        }
      }
    }
    return { x, y, s, sx, sy, o };
  }

  // la ficha del cliente: quién la tiene y cómo vuela
  const TOSSES = [ // [desde, hasta, de, a]
    [K.toss1[0], K.toss1[1], 'B', 'G'], [K.toss2[0], K.toss2[1], 'G', 'Y'], [K.toss3[0], K.toss3[1], 'Y', 'G'],
    [K.toss4[0], K.toss4[1], 'R', 'B'],
  ];
  const cardSpot = (id, t) => { const p = charPose(id, t), R = CAST[id].R * p.s; return { x: p.x, y: p.y - R - 62 }; };
  function cardState(which, t) {
    if (which === 'ana') {
      if (t < K.cardB || t > 19.2) return null;
      let holder = 'B';
      for (const [a, b, from, to] of TOSSES.slice(0, 3)) {
        if (t >= a && t < b) {
          const A = cardSpot(from, t), B = cardSpot(to, t), h = OM.hop(t, a, b, A, B, { height: to === 'Y' ? 120 : 160 });
          return { x: h.x, y: h.y, rot: 360 * ease.smoother(seg(t, a, b)), s: 1, flying: true };
        }
        if (t >= b) holder = to;
      }
      const p = cardSpot(holder, t), pop = OM.popIn(t, K.cardB, { rise: 20, s0: 0.5, ds: 0.5, zeta: 0.5 });
      const fade = 1 - seg(t, 18.9, 19.2);
      return { x: p.x, y: p.y + pop.dy, rot: 0, s: pop.s, o: fade };
    }
    // Luis: entra por la derecha hasta el rojo, luego vuela al azul
    if (t < K.card2In[0] || t > 24.4) return null;
    if (t < K.card2In[1]) {
      const B = cardSpot('R', t), h = OM.hop(t, K.card2In[0], K.card2In[1], { x: 2050, y: 330 }, B, { height: 60 });
      return { x: h.x, y: h.y, rot: -200 * (1 - seg(t, K.card2In[0], K.card2In[1])), s: 1 };
    }
    const [a, b] = K.toss4;
    if (t >= a && t < b) {
      const A = cardSpot('R', t), B = cardSpot('B', t), h = OM.hop(t, a, b, A, B, { height: 300 });
      return { x: h.x, y: h.y, rot: -360 * ease.smoother(seg(t, a, b)), s: 1, flying: true };
    }
    const p = cardSpot(t < a ? 'R' : 'B', t);
    return { x: p.x, y: p.y, rot: 0, s: 1, o: 1 - seg(t, 24.1, 24.4) };
  }

  // ───────────────────────────── construcción ─────────────────────────────
  const R = {};
  let DOT_POS = { x: 0, y: 0 }, DOT_R = 17;
  function build() {
    const W = $('world');
    ['netL', 'panelL', 'capL', 'cardL', 'charL', 'pktL', 'logoL', 'curL'].forEach(n => (R[n] = E('g', {}, W)));

    R.net = [];
    [['Y', 'B'], ['Y', 'G'], ['Y', 'R'], ['B', 'G'], ['G', 'R'], ['B', 'R']].forEach(([a, b], i) => {
      const A = CAST[a], B = CAST[b];
      const d = a === 'B' && b === 'R' ? `M${A.x},${A.y} Q${(A.x + B.x) / 2},${A.y + 190} ${B.x},${B.y}` : `M${A.x},${A.y} L${B.x},${B.y}`;
      const p = E('path', { d, fill: 'none', stroke: C.accent, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }, R.netL);
      p._len = p.getTotalLength(); p._i = i; R.net.push(p);
    });

    IDS.forEach(id => buildChar(id, R.charL));

    // conversaciones (paneles de chat)
    R.panels = {};
    for (const [key, P] of Object.entries(PANELS)) {
      const g = G(R.panelL);
      E('rect', { x: -210, y: 0, width: 420, height: 440, rx: 28, fill: C.deep, stroke: C.line, 'stroke-width': 2 }, g);
      const head = E('g', { transform: 'translate(0,38)' }, g);
      E('circle', { cx: -170, cy: 0, r: 13, fill: key === 'R' ? C.accent : '#25d366' }, head);
      disp(head, P.head, 24, { anchor: 'start', x: -148, y: 8 });
      E('path', { d: 'M-190,70 L190,70', stroke: C.line, 'stroke-width': 2 }, g);
      R.panels[key] = { g, P, msgs: [] };
    }
    const nextY = { L: 92, R: 92, R2: 92 };
    MSGS.forEach(([key, t, from, lines, agent]) => {
      const pan = R.panels[key], g = G(pan.g);
      const col = from === 'agent' ? CAST[agent].color : from === 'owner' ? C.accent : C.chat;
      const ts = lines.map((l, i) => text(g, l, 21, { anchor: 'start', y: 30 + i * 28, fill: C.ink, weight: 500 }));
      const w = Math.max(...ts.map(x => x.getComputedTextLength())) + 34, h = lines.length * 28 + 22;
      const x0 = from === 'client' ? -190 : 190 - w;
      const rect = E('rect', { x: x0, y: 0, width: w, height: h, rx: 16, fill: from === 'client' ? C.chat : col, 'fill-opacity': from === 'client' ? 1 : 0.2, stroke: from === 'client' ? 'none' : col, 'stroke-width': 2 }, g);
      g.insertBefore(rect, ts[0]); ts.forEach(x => S(x, 'x', f1(x0 + 17)));
      const y = nextY[key]; nextY[key] += h + 14;
      pan.msgs.push({ g, t, y, from, agent, cx: x0 + w / 2, h });
    });
    // botones Sí / No en la conversación con el dueño
    R.btns = G(R.panels.R.g);
    R.btnSi = pill(R.btns, 'Sí', { size: 22, fill: 'none', color: C.accent2, stroke: C.accent2, h: 46, padX: 30 }); op(R.btnSi, 1); S(R.btnSi, 'transform', 'translate(-60,0)');
    const no = pill(R.btns, 'No', { size: 22, fill: 'none', color: C.mute, stroke: C.line, h: 46, padX: 30 }); op(no, 1); S(no, 'transform', 'translate(40,0)');

    // fichas
    const card = (lines) => {
      const g = G(R.cardL);
      E('rect', { x: -120, y: -34, width: 240, height: 68, rx: 14, fill: C.card, stroke: C.accent, 'stroke-width': 2.5 }, g);
      const dot = E('circle', { cx: -94, cy: 0, r: 8, fill: C.accent2 }, g);
      const tl = lines.map((l, i) => text(g, l, i ? 17 : 21, { anchor: 'start', x: -76, y: i ? 20 : -4, fill: i ? C.mute : C.ink, weight: i ? 500 : 600 }));
      return { g, dot, tl };
    };
    R.cardAna = card(['Ana', 'clase de prueba · jueves']);
    R.cardLuis = card(['Luis', 'se fue hace 3 meses']);

    R.pkt = E('g', { opacity: 0 }, R.pktL);
    R.pktHalo = E('circle', { r: 22, opacity: 0.5, filter: 'url(#glow)' }, R.pkt);
    R.pktDot = E('circle', { r: 8 }, R.pkt);

    R.cap0 = G(R.capL, g => disp(g, 'Este es tu Encargado', 60));
    R.cap1 = G(R.capL, g => disp(g, 'Y este, su equipo', 56));
    R.cap2 = G(R.capL, g => disp(g, 'Se pasan el trabajo entre ellos', 52));
    R.later = pill(R.capL, 'Dos semanas después', { size: 26, fill: C.card, color: C.ink, h: 54, padX: 28, font: DISP });
    R.cap3 = G(R.capL, g => disp(g, 'Tú solo decides lo importante', 52));
    R.cap4 = G(R.capL, g => disp(g, 'Y recuperan a los que se fueron', 52));
    R.cap5 = G(R.capL, g => disp(g, 'Un equipo que se habla. Tú solo dices sí.', 52));
    R.hi = G(R.capL, g => { E('rect', { x: -92, y: -32, width: 184, height: 58, rx: 20, fill: C.card, stroke: C.accent2, 'stroke-width': 2 }, g); disp(g, '¡Equipo!', 30, { y: 7 }); });
    R.says = {};
    [['voy', 'R', '¡Voy!'], ['alta', 'G', '¡Alta!'], ['mmm', 'G', 'Mmm…']].forEach(([k, id, s]) => {
      R.says[k] = G(R.capL, g => { E('rect', { x: -70, y: -28, width: 140, height: 52, rx: 18, fill: C.card, stroke: CAST[id].color, 'stroke-width': 2 }, g); disp(g, s, 26, { y: 7 }); });
    });
    R.plus = G(R.capL, g => disp(g, '+1 cliente', 44, { fill: C.accent2 }));

    // logo final: el hueco del punto es para el Encargado
    R.logo = E('g', {}, R.logoL);
    const probe = disp(R.logo, 'Native Crew', 200, { anchor: 'start', weight: 700 });
    const LW = probe.getComputedTextLength() + 60, adv = [...'Native Crew'].map((c, i) => probe.getSubStringLength(i, 1));
    R.logo.removeChild(probe);
    let x = -LW / 2; R.letters = [];
    [...'Native Crew'].forEach((ch, i) => {
      if (ch !== ' ') { const lg = E('g', {}, R.logo); disp(lg, ch, 200, { anchor: 'start', x: f1(x), fill: i > 6 ? C.accent : C.ink, weight: 700 }); R.letters.push({ g: lg, cx: x + adv[i] / 2 }); }
      x += adv[i];
    });
    R.logoY = 600;
    DOT_POS = { x: 960 + x + 26, y: R.logoY - 14 };
    R.tag = G(R.logoL, g => disp(g, 'Elige tu equipo.', 64));

    R.cur = G(R.curL);
    E('path', { d: 'M0,0 L26,19 L14,21 L22,37 L16,40 L8,24 L0,33 Z', fill: C.ink, stroke: C.ground, 'stroke-width': 3, 'stroke-linejoin': 'round' }, R.cur);
  }

  // ───────────────────────────── cámara ─────────────────────────────
  const KEYS = [
    { t: 0, x: 960, y: 560, zoom: 1.12 }, { t: 3.5, x: 960, y: 555, zoom: 1.08, curve: ease.sineInOut },
    { t: 4.3, x: 960, y: 560, zoom: 1.0, curve: ease.expoOut },
    { t: 6.9, x: 960, y: 560, zoom: 1.0 }, { t: 7.5, x: 830, y: 540, zoom: 1.06, curve: ease.sineInOut },
    { t: 10.2, x: 830, y: 540, zoom: 1.06 }, { t: 10.9, x: 900, y: 545, zoom: 1.05, curve: ease.sineInOut },
    { t: 13.8, x: 900, y: 545, zoom: 1.05 }, { t: 14.8, x: 1000, y: 530, zoom: 1.02, curve: ease.expoInOut },
    { t: 16.9, x: 1000, y: 530, zoom: 1.02 }, { t: 17.6, x: 900, y: 540, zoom: 1.05, curve: ease.sineInOut },
    { t: 19.4, x: 900, y: 540, zoom: 1.05 }, { t: 20.1, x: 1090, y: 530, zoom: 1.06, curve: ease.expoInOut },
    { t: 22.1, x: 1090, y: 530, zoom: 1.06 }, { t: 23.0, x: 1000, y: 540, zoom: 1.0, curve: ease.sineInOut },
    { t: 24.6, x: 960, y: 560, zoom: 1.0 }, { t: 25.2, x: 960, y: 580, zoom: 1.03, curve: ease.sineInOut },
    { t: K.outro, x: 960, y: 580, zoom: 1.03 }, { t: K.outro + 0.6, x: 960, y: 560, zoom: 1.0, curve: ease.sineInOut },
    { t: K.dive[1], x: 960, y: 560, zoom: 1.0 }, { t: K.dive[1] + 0.8, x: 960, y: 570, zoom: 1.05, curve: ease.expoOut },
  ];
  const HITS = [[K.yHop[1], 5, 11], [K.drop.B + 0.35, 6, 10], [K.drop.G + 0.35, 6, 10], [K.drop.R + 0.35, 6, 10],
    ...TOSSES.map(x => [x[1], 4, 11]), [K.card2In[1], 3, 12], [K.plus, 5, 10], [K.dive[1], 10, 8]];
  function camAt(t) {
    const c = OM.camera(t, KEYS);
    let e = sstep(0.1, 0.5, t) * 4;
    for (const [a, b] of HOLDS) e *= 1 - sstep(a - 0.15, a, t) * (1 - sstep(b, b + 0.2, t));
    let x = c.x + e * (Math.sin(1.7 * t) + 0.6 * Math.sin(2.9 * t + 1)) / c.zoom, y = c.y + e * (Math.sin(1.3 * t + 2) + 0.5 * Math.sin(3.3 * t)) / c.zoom, rot = c.rot;
    for (const [th, amp, decay] of HITS) { const s = OM.shake(t, th, { amp, decay, seed: Math.round(th * 100) }); x += s.x / c.zoom; y += s.y / c.zoom; rot += s.rot; }
    return { x, y, zoom: c.zoom, rot };
  }

  // ───────────────────────────── qué mira cada uno ─────────────────────────────
  function packetAt(t) {
    for (const [key, tm, from, lines, agent] of MSGS) {
      if (from !== 'agent') continue;
      const a = tm - PACKET;
      if (t >= a && t < tm) {
        const P = PANELS[key], m = R.panels[key].msgs.find(mm => mm.t === tm);
        const A = charPose(agent, t), B = { x: P.x + m.cx, y: P.top + m.y + m.h / 2 };
        const h = OM.hop(t, a, tm, A, B, { height: 80, curve: ease.cubicInOut });
        return { x: h.x, y: h.y, color: CAST[agent].color };
      }
    }
    return null;
  }
  function focus(t) {
    const ca = cardState('ana', t), cl = cardState('luis', t);
    if (ca && ca.flying) return ca; if (cl && cl.flying) return cl;
    const pk = packetAt(t); if (pk) return pk;
    for (const [key, tm, from] of MSGS) if (from !== 'agent' && t >= tm && t < tm + 0.7) { const P = PANELS[key], m = R.panels[key].msgs.find(mm => mm.t === tm); return { x: P.x + m.cx, y: P.top + m.y }; }
    for (const [id, a, b] of TALK) if (inWin(t, a - 0.1, b + 0.2)) return { speaker: id };
    return null;
  }

  // ───────────────────────────── escenas ─────────────────────────────
  function sceneChars(t) {
    const f = focus(t);
    IDS.forEach(id => {
      const o = CH[id], p = charPose(id, t), R0 = CAST[id].R;
      if (p.o <= 0.001) { hide(o.g); hide(o.label); return; }
      tf(o.g, p.x, p.y, p.s, 0, p.sx, p.sy); op(o.g, p.o);
      // mirada
      let lx = 0, ly = 0;
      let tgt = null;
      if (f && f.speaker) { if (f.speaker !== id) tgt = charPose(f.speaker, t); }
      else if (f) tgt = f;
      if (id === 'Y' && t >= K.outro + 0.5) tgt = null;
      if (tgt) { const dx = tgt.x - p.x, dy = tgt.y - p.y, n = Math.hypot(dx, dy) || 1; lx = dx / n; ly = dy / n; }
      const mood = moodOf(id, t), talk = talking(id, t), open = talk && Math.floor(t * 11) % 2 === 0;
      const bl = 1 - 0.95 * blinkK(id, t) - (id === 'Y' && t < K.yEyes ? 0.95 * (1 - seg(t, K.yEyes - 0.2, K.yEyes)) : 0);
      const wink = id === 'Y' && inWin(t, 27.6, 27.85);
      o.eyes.forEach((e, i) => {
        S(e.pupil, 'cx', f1(lx * R0 * 0.07)); S(e.pupil, 'cy', f1(ly * R0 * 0.09));
        S(e.glint, 'cx', f1(lx * R0 * 0.07 + R0 * 0.04)); S(e.glint, 'cy', f1(ly * R0 * 0.09 - R0 * 0.05));
        const happyEyes = mood === 'happy' || (wink && i === 1);
        S(e.lid, 'transform', `scale(1,${f3(clamp(bl, 0.05, 1))})`); op(e.lid, happyEyes ? 0 : 1); op(e.happy, happyEyes ? 1 : 0);
      });
      const mp = mouthPath(R0, mood, open); S(o.mouth, 'd', mp.d); S(o.mouth, 'fill', mp.fill);
      o.blush.forEach(b => op(b, mood === 'happy' ? 0.45 : 0));
      const bw = mood === 'determined' ? 1 : mood === 'worried' ? -1 : 0;
      o.brows.forEach((b, i) => {
        const s = i ? 1 : -1; S(b, 'transform', `translate(${f1(s * R0 * 0.32)},${f1(-R0 * 0.44)}) rotate(${f1(s * bw * 18)})`); op(b, bw ? 1 : 0);
      });
      const sw = id === 'G' && inWin(t, 13.1, 14.0); op(o.sweat, sw ? 1 : 0);
      if (sw) { const u = seg(t, 13.1, 14.0); S(o.sweat, 'transform', `translate(${f1(R0 * 0.78)},${f1(-R0 * 0.35 + u * R0 * 0.5)})`); }
      // al final el Encargado pierde la cara y se queda como el punto del logo
      op(o.face, id === 'Y' ? 1 - seg(t, K.dive[1] - 0.15, K.dive[1] + 0.1) : 1);
      // etiqueta
      const lt = id === 'Y' ? K.yEyes + 0.3 : K.drop[id] + 0.45, lo = t >= K.outro - 0.3 ? 1 - seg(t, K.outro - 0.3, K.outro) : 1;
      if (t < lt || lo <= 0) hide(o.label);
      else { const w = OM.wordRise(t, lt, { dist: 16 }); tf(o.label, p.x, p.y + R0 * p.s + 44 + w.y, w.s); op(o.label, w.op * lo * (id === 'Y' && t < K.yHop[1] ? 0 : 1)); }
    });
  }
  function sceneCards(t) {
    [['ana', R.cardAna], ['luis', R.cardLuis]].forEach(([w, c]) => {
      const st = cardState(w, t);
      if (!st) { hide(c.g); return; }
      tf(c.g, st.x, st.y, st.s, st.rot); op(c.g, st.o == null ? 1 : st.o);
    });
    // la ficha de Ana cambia cuando deja de venir, y vuelve a estar bien al final
    const bad = t >= K.cardBad && t < 18.6;
    R.cardAna.tl[1].textContent = t < K.cardBad ? 'clase de prueba · jueves' : bad ? '12 días sin venir' : 'vuelve el lunes';
    S(R.cardAna.dot, 'fill', bad ? CAST.R.color : t >= 18.6 ? CAST.G.color : C.accent2);
    R.cardLuis.tl[1].textContent = t < K.toss4[0] ? 'se fue hace 3 meses' : 'quiere volver · jueves';
    S(R.cardLuis.dot, 'fill', t < K.toss4[0] ? C.mute : CAST.G.color);
  }
  function scenePanels(t) {
    for (const [key, pan] of Object.entries(R.panels)) {
      const P = pan.P;
      if (t < P.t0 - 0.01 || t > P.t1 + 0.3) { hide(pan.g); continue; }
      const q = OM.popIn(t, P.t0, { rise: 40, s0: 0.92, ds: 0.08 }), l = t >= P.t1 ? OM.liftOut(t, P.t1, { dur: 0.3 }) : { op: 1, dy: 0, s: 1 };
      tf(pan.g, P.x, P.top + q.dy + l.dy, q.s * l.s); op(pan.g, q.op * l.op);
      pan.msgs.forEach(m => {
        if (t < m.t) { hide(m.g); return; }
        const pp = OM.popIn(t, m.t, { rise: 14, s0: 0.8, ds: 0.2, zeta: 0.55 });
        tf(m.g, 0, m.y + pp.dy, pp.s); op(m.g, pp.op);
      });
    }
    // botones Sí/No
    const bt = 15.55;
    if (t < bt || t > PANELS.R.t1 + 0.3) hide(R.btns);
    else {
      const q = OM.popIn(t, bt, { rise: 10, s0: 0.8, ds: 0.2 }), m = R.panels.R.msgs[0];
      tf(R.btns, 0, m.y + m.h + 36 + q.dy, q.s); op(R.btns, q.op);
      const pr = OM.press(t, K.tap, { depth: 0.2 }), on = t >= K.tap;
      S(R.btnSi, 'transform', `translate(-60,0) scale(${f3(pr.s)})`);
      S(R.btnSi.querySelector('rect'), 'fill', on ? C.accent2 : 'none'); S(R.btnSi.querySelector('text'), 'fill', on ? C.dark : C.accent2);
    }
    // mensajes del dueño y otros: el "Sí" del dueño sube por debajo de los botones
    const own = R.panels.R.msgs[1]; if (own && t >= own.t) { const pp = OM.popIn(t, own.t, { rise: 14, s0: 0.8, ds: 0.2 }); tf(own.g, 0, own.y + 62 + pp.dy, pp.s); }
  }
  function scenePacket(t) {
    const p = packetAt(t);
    if (!p) { hide(R.pkt); return; }
    S(R.pktHalo, 'fill', p.color); S(R.pktDot, 'fill', p.color); tf(R.pkt, p.x, p.y); op(R.pkt, 1);
  }
  function sceneCaptions(t) {
    showRise(R.cap0, t, K.cap0, K.cap0Out, 960, 820);
    showRise(R.cap1, t, K.cap1, K.cap1Out, 960, 150);
    showRise(R.cap2, t, K.cap2, K.cap2Out, 960, 150);
    showRise(R.later, t, K.later, K.laterOut, 960, 150);
    showRise(R.cap3, t, K.cap3, K.cap3Out, 960, 150);
    showRise(R.cap4, t, K.cap4, K.cap4Out, 960, 150);
    showRise(R.cap5, t, K.cap5, K.cap5Out, 960, 150);
    const say = (el, id, a, b) => { if (t < a || t > b + 0.2) { hide(el); return; } const p = charPose(id, t), q = OM.popIn(t, a, { rise: 12, s0: 0.6, ds: 0.4, zeta: 0.5 }), o = 1 - seg(t, b, b + 0.2); tf(el, p.x + CAST[id].R * 1.5, p.y - CAST[id].R * 0.85 + q.dy, q.s); op(el, q.op * o); };
    say(R.hi, 'Y', K.yHi, 3.75); say(R.says.alta, 'G', 11.0, 11.7); say(R.says.mmm, 'G', 13.2, 13.9); say(R.says.voy, 'R', 20.4, 21.1);
    if (t < K.plus || t > K.plus + 1.1) hide(R.plus);
    else { const p = charPose('B', t), w = OM.wordRise(t, K.plus, { dist: 20, zeta: 0.5 }), k = seg(t, K.plus + 0.6, K.plus + 1.1); tf(R.plus, p.x, p.y - 250 + w.y - 40 * k, w.s); op(R.plus, w.op * (1 - k)); }
  }
  function sceneNet(t) {
    R.net.forEach(p => {
      const a = K.net + p._i * 0.08;
      if (t < a || t > K.outro + 0.4) { S(p, 'opacity', 0); return; }
      const k = ease.cubicOut(seg(t, a, a + 0.45)), o = 1 - seg(t, K.outro, K.outro + 0.4);
      S(p, 'stroke-dasharray', `${f1(p._len)} ${f1(p._len)}`); S(p, 'stroke-dashoffset', f1(p._len * (1 - k))); S(p, 'opacity', f3(0.8 * o));
    });
  }
  function sceneLogo(t) {
    if (t < K.logo - 0.01) { hide(R.logo); hide(R.tag); return; }
    S(R.logo, 'transform', `translate(960,${R.logoY})`); op(R.logo, 1);
    const land = OM.impact(t, K.dive[1], { sqx: 0, sqy: 0.12 });
    R.letters.forEach((L, j) => {
      const d = OM.letterDrop(t, K.logo, j, { dist: 140, stagger: 0.035 });
      const dy = d.y + (t >= K.dive[1] ? (1 - land.sy) * 110 * Math.exp(-Math.pow((L.cx - (DOT_POS.x - 960)) / 500, 2)) : 0);
      S(L.g, 'transform', `translate(${f1(L.cx)},${f1(dy)}) scale(${f3(d.sx)},${f3(d.sy)}) translate(${f1(-L.cx)},0)`); op(L.g, d.op);
    });
    showRise(R.tag, t, K.tag, null, 960, R.logoY + 150);
  }
  function sceneCursor(t) {
    if (t < K.tap - 0.7 || t > K.tap + 0.7) { hide(R.cur); return; }
    const m = R.panels.R.msgs[0], bx = PANELS.R.x - 60 + 6, by = PANELS.R.top + m.y + m.h + 36 + 8;
    const c = OM.cursor(t, [{ t: K.tap - 0.7, x: 1900, y: 1150 }, { t: K.tap - 0.1, x: bx, y: by }, { t: K.tap + 0.15, x: bx, y: by }, { t: K.tap + 0.7, x: 1900, y: 1200 }], [K.tap]);
    tf(R.cur, c.x, c.y, c.s); op(R.cur, 1);
  }

  function seek(t) {
    const CAM = camAt(t);
    S($('world'), 'transform', mtx(OM.view(CAM)));
    S($('lattice'), 'transform', mtx(OM.view(CAM, { depth: 1.2 })));
    sceneNet(t); scenePanels(t); sceneCards(t); sceneChars(t); scenePacket(t); sceneCaptions(t); sceneLogo(t); sceneCursor(t);
    const hud = $('hud'); if (hud) hud.textContent = 't=' + t.toFixed(3);
    return Promise.resolve();
  }

  // ───────────────────────────── sonido ─────────────────────────────
  function events() {
    const ev = [], add = (t, kind, x = 960, v = 1, extra = {}) => ev.push(Object.assign({ t: +t.toFixed(3), kind, pan: clamp((x - 960) / 960, -1, 1), v }, extra));
    add(K.yAppear, 'spark', 960, 0.8); add(K.yGrow, 'pop', 960, 1);
    IDS.slice(1).forEach(id => add(K.drop[id] + 0.35, 'thud', CAST[id].x, 0.8, { voice: CAST[id].voice }));
    add(K.yHop[0], 'hop', 960, 0.7); add(K.yHop[1], 'thud', 960, 0.6, { voice: 1 });
    TALK.forEach(([id, a, b]) => add(a, 'talk', CAST[id].x, 1, { dur: b - a, voice: CAST[id].voice }));
    MSGS.forEach(([key, tm, from, lines, agent]) => {
      if (from === 'agent') add(tm - PACKET, 'zip', CAST[agent].x, 0.7, { to: (PANELS[key].x - 960) / 960 });
      add(tm, 'msg', PANELS[key].x, from === 'client' ? 0.8 : 0.6);
    });
    TOSSES.forEach(([a, b, from, to]) => { add(a, 'whoosh', CAST[from].x, 0.8, { to: (CAST[to].x - 960) / 960 }); add(b, 'catch', CAST[to].x, 0.9); });
    add(K.card2In[0], 'whoosh', 1800, 0.6, { to: 0.3 }); add(K.card2In[1], 'catch', CAST.R.x, 0.8);
    add(K.tap, 'click', PANELS.R.x, 1); add(K.plus, 'chord', CAST.B.x, 1);
    add(K.net, 'rise', 960, 0.6, { dur: 0.8 }); IDS.forEach((id, i) => add(K.wave + i * 0.14, 'note', CAST[id].x, 0.8, { n: i }));
    add(K.logo, 'word', 960, 0.6); add(K.dive[0], 'hop', 960, 0.8); add(K.dive[1], 'land', 1400, 1); add(K.tag, 'word', 960, 0.5);
    return { dur: DUR, burst: 0.9, casc0: 7.0, end0: K.dive[1], holds: HOLDS, events: ev.sort((a, b) => a.t - b.t) };
  }

  window.__meta = { dur: DUR, fps: 30, w: 1920, h: 1080, cuts: [K.yHop[0], K.panelL, K.later, K.panelR2, K.net, K.outro, K.logo] };
  window.__events = events;
  window.__seek = async t => { await seek(t); return true; };
  window.__ready = LOOK.ready.then(() => { build(); return seek(0); });
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.__ready.then(() => seek(parseFloat(q.get('t'))));
  if (q.has('hud')) window.__ready.then(() => { $('hud').style.display = 'block'; });
  if (q.has('play')) window.__ready.then(() => { const t0 = performance.now(); (function loop() { seek(((performance.now() - t0) / 1000) % DUR); requestAnimationFrame(loop); })(); });
})();
