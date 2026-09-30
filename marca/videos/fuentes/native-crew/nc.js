// onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
// Native Crew · presentación y pitch, look "dusk" de la skill. Uso no comercial: para enseñar a colegas.
// Todo es función pura de t (segundos). Contrato onetake: __seek, __ready, __meta, y __events() para el sonido.
(function () {
  'use strict';
  const V = window.NC_VERSION || 'presentacion';
  const { clamp, lerp, seg, sstep, ssstep, ease, ring } = OM;
  const cubicIn = u => u * u * u;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const S = (el, k, v) => el.setAttribute(k, v);
  const f1 = v => (+v).toFixed(1), f3 = v => (+v).toFixed(3);
  const C = Object.assign({}, LOOK.color, { chat: '#2a2638' });
  const DISP = LOOK.type.display.family, TEXT = LOOK.type.text.family;

  // ───────────────────────────── líneas de tiempo ─────────────────────────────
  const TL = {
    presentacion: {
      dur: 23.5, tu: 0.2, sub1: 0.8, sub1Text: 'haces tu trabajo', rain0: 1.9, sub2: 3.0, sub2Text: '…y todo lo demás',
      shake0: 4.2, burst: 4.55, tag: 5.15, tagText: 'Empleados virtuales para tu negocio',
      carta0: 6.7, cards0: 7.2, cursorIn: 8.2, picks: [8.7, 9.3, 9.9], cursorOut: 10.4,
      casc0: 10.5, conn: 11.1, tok0: 11.6, sect0: 15.6, gather: 17.8,
      steps0: null, phone0: null, model0: null, end0: 17.95, endTag: 18.7,
      holds: [[3.45, 4.15], [5.75, 6.6], [15.2, 15.55], [19.35, 99]],
    },
    pitch: {
      dur: 41, tu: 0.2, sub1: 0.8, sub1Text: 'contestas, persigues, recuerdas, cobras…', rain0: 1.9, sub2: 3.7,
      sub2Text: '…y aun así se te escapan clientes', shake0: 5.3, burst: 5.65, tag: 6.25, tagText: 'Empleados virtuales, a la carta',
      carta0: 7.8, cards0: 8.3, cursorIn: 9.3, picks: [9.8, 10.4, 11.0], cursorOut: 11.5,
      casc0: 11.6, conn: 12.2, tok0: 12.7, sect0: 16.7, gather: 18.9,
      steps0: 19.1, phone0: 24.4, model0: 30.2, end0: 35.8, endTag: 36.5,
      holds: [[4.15, 5.2], [6.85, 7.7], [16.3, 16.65], [22.9, 24.3], [28.7, 30.1], [33.2, 35.7], [37.3, 99]],
    },
  };
  const T = TL[V];
  const SECT = [
    ['Peluquería', ['telefonista', 'responsable', 'comunicacion']],
    ['Academia', ['recepcionista', 'administrativo', 'comunicacion']],
    ['Estudio de pilates', ['recepcionista', 'responsable', 'recuperador']],
  ];
  const sectT = i => T.sect0 + 0.3 + i * 0.65;
  const PICK = ['recepcionista', 'responsable', 'comunicacion'];
  const EMP = [
    { id: 'recepcionista', t: ['Recepcionista', 'comercial'], s: ['Contesta y persigue', 'a los indecisos'], icon: 'chat' },
    { id: 'responsable', t: ['Responsable', 'de clientes'], s: ['Cuida a los nuevos', 'y a los que faltan'], icon: 'heart' },
    { id: 'recuperador', t: ['Recuperador'], s: ['Escribe a los', 'que se fueron'], icon: 'return' },
    { id: 'administrativo', t: ['Administrativo'], s: ['Cobros, bonos', 'y papeles'], icon: 'clip' },
    { id: 'comunicacion', t: ['Comunicación'], s: ['Reseñas y', 'recomendaciones'], icon: 'star' },
    { id: 'telefonista', t: ['Telefonista'], s: ['Coge el teléfono', 'por ti'], icon: 'phone' },
  ];
  const CHIPS = ['Responder whatsapps', 'Seguimientos', 'Recordatorios', 'Cobros', 'Reseñas', 'Papeles', 'Llamadas', 'Agenda'];
  const PILE = [{ x: 820, y: 612, r: -7 }, { x: 1110, y: 615, r: 5 }, { x: 965, y: 560, r: -2 }, { x: 870, y: 500, r: 9 },
    { x: 1070, y: 470, r: -8 }, { x: 960, y: 425, r: 4 }, { x: 790, y: 415, r: -11 }, { x: 1135, y: 385, r: 7 }];
  const CW = 460, CH = 230;
  const GRID = i => ({ x: [460, 960, 1460][i % 3], y: [455, 725][Math.floor(i / 3)] });
  const SLOT = [{ x: 440, y: 560 }, { x: 960, y: 560 }, { x: 1480, y: 560 }], SLOT_S = 0.85;
  const STEP_X = [460, 960, 1460], STEP_Y = 520;
  const LABELS = ['interesado', 'cliente', 'se queda', 'trae a un amigo', 'tu negocio'];
  const HS = 0.2; // escala del logo como cabecera
  const TOKEN_TIMES = [0.6, 1.4, 2.2, 3.4];

  // ───────────────────────────── utilidades ─────────────────────────────
  function E(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function tf(el, x, y, s = 1, rot = 0, sx = 1, sy = 1) {
    S(el, 'transform', `translate(${f1(x)},${f1(y)}) rotate(${f1(rot)}) scale(${f3(s * sx)},${f3(s * sy)})`);
  }
  const op = (el, v) => S(el, 'opacity', f3(clamp(v, 0, 1)));
  const hide = el => S(el, 'opacity', 0);
  // texto de titular (Geist) y de lectura (Inter), planos: el look manda
  function disp(parent, str, size, { anchor = 'middle', fill = C.ink, weight = 600, x = 0, y = 0 } = {}) {
    const t = E('text', { x, y, 'font-size': size, 'font-family': DISP, 'font-weight': weight, 'text-anchor': anchor, fill,
      'letter-spacing': f1(LOOK.type.display.tracking * size) }, parent);
    t.textContent = str; return t;
  }
  function text(parent, str, size, { anchor = 'middle', fill = C.mute, weight = 500, x = 0, y = 0 } = {}) {
    const t = E('text', { x, y, 'font-size': size, 'font-family': TEXT, 'font-weight': weight, 'text-anchor': anchor, fill,
      'letter-spacing': f1(LOOK.type.text.tracking * size) }, parent);
    t.textContent = str; return t;
  }
  const G = (parent, children) => { const g = E('g', { opacity: 0 }, parent); if (children) children(g); return g; };
  function pill(parent, str, { size = 20, fill = C.accent, color = C.ink, font = TEXT, weight = 600, padX = 18, h = null, stroke = 'none' } = {}) {
    const g = G(parent);
    const t = (font === DISP ? disp : text)(g, str, size, { fill: color, weight });
    const w = t.getComputedTextLength() + padX * 2, hh = h || size * 1.8;
    S(t, 'y', f1(size * 0.35));
    g.insertBefore(E('rect', { x: -w / 2, y: -hh / 2, width: w, height: hh, rx: hh / 2, fill, stroke, 'stroke-width': 2 }), t);
    g._w = w; return g;
  }
  function showRise(el, t, tIn, tOut, x, y, { dist = 30, outDur = 0.25, s = 1 } = {}) {
    if (tIn == null || t < tIn - 0.01 || (tOut != null && t > tOut + outDur)) { hide(el); return; }
    const w = OM.wordRise(t, tIn, { dist });
    let o = w.op, dy = w.y, sc = w.s * s;
    if (tOut != null && t >= tOut) { const l = OM.liftOut(t, tOut, { dur: outDur, dist: 50 }); o *= l.op; dy += l.dy; sc *= l.s; }
    tf(el, x, y + dy, sc); op(el, o);
  }
  const mtx = M => `matrix(${M.map(v => v.toFixed(4)).join(',')})`;

  function icon(g, kind, cx, cy) {
    const st = { fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    const ig = E('g', { transform: `translate(${cx},${cy})` }, g);
    if (kind === 'chat') {
      E('rect', Object.assign({ x: -26, y: -22, width: 52, height: 36, rx: 10 }, st), ig);
      E('path', Object.assign({ d: 'M-12,14 L-19,26 L-1,14' }, st), ig);
      [-11, 0, 11].forEach(x => E('circle', { cx: x, cy: -4, r: 3.5, fill: C.accent2 }, ig));
    } else if (kind === 'heart') {
      E('path', Object.assign({ d: 'M0,24 C-38,0 -31,-28 -13,-28 C-4,-28 0,-19 0,-15 C0,-19 4,-28 13,-28 C31,-28 38,0 0,24 Z' }, st), ig);
    } else if (kind === 'return') {
      E('path', Object.assign({ d: 'M21,-7 A24,24 0 1 0 23,12' }, st), ig);
      E('path', Object.assign({ d: 'M7,-19 L22,-8 L9,4' }, st), ig);
    } else if (kind === 'clip') {
      E('rect', Object.assign({ x: -20, y: -24, width: 40, height: 52, rx: 6 }, st), ig);
      E('path', Object.assign({ d: 'M-10,-5 H10 M-10,6 H10 M-10,17 H3' }, st, { 'stroke-width': 4 }), ig);
      E('rect', { x: -9, y: -30, width: 18, height: 11, rx: 3, fill: C.accent2 }, ig);
    } else if (kind === 'star') {
      const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 12 : 28; pts.push(`${f1(Math.cos(a) * r)},${f1(Math.sin(a) * r + 2)}`); }
      E('polygon', Object.assign({ points: pts.join(' ') }, st), ig);
    } else if (kind === 'phone') {
      E('rect', Object.assign({ x: -24, y: -28, width: 32, height: 56, rx: 7 }, st), ig);
      E('circle', { cx: -8, cy: 18, r: 3, fill: C.accent2 }, ig);
      E('path', Object.assign({ d: 'M15,-10 A12,12 0 0 1 15,10 M22,-17 A22,22 0 0 1 22,17' }, st, { 'stroke-width': 4 }), ig);
    }
  }

  // ───────────────────────────── construcción ─────────────────────────────
  const R = {};
  let LOGO_W = 0, loopPath = null, loopLen = 0;
  function build() {
    const W = $('world');
    ['tuL', 'chipsL', 'captL', 'connL', 'tokL', 'cardsL', 'stepsL', 'phoneL', 'modelL', 'endL', 'logoL', 'plusL', 'curL']
      .forEach(n => (R[n] = E('g', {}, W)));

    R.tu = G(R.tuL, g => disp(g, 'Tú', 340, { weight: 700 }));
    R.sub1 = G(R.tuL, g => disp(g, T.sub1Text, 58, { fill: C.mute, weight: 500 }));
    R.sub2 = G(R.tuL, g => disp(g, T.sub2Text, 58, { fill: C.ink, weight: 500 }));
    R.chips = CHIPS.map(c => {
      const g = pill(R.chipsL, c, { size: 27, fill: C.card, color: C.ink, weight: 600, h: 64, padX: 30, stroke: C.line });
      E('circle', { cx: -g._w / 2 + 16, cy: 0, r: 5, fill: C.accent }, g);
      return g;
    });

    // logo: "Native Crew" + un punto de luz
    R.logo = E('g', {}, R.logoL);
    const probe = disp(R.logo, 'Native Crew', 200, { anchor: 'start' });
    LOGO_W = probe.getComputedTextLength() + 60;
    const adv = [...'Native Crew'].map((c, i) => probe.getSubStringLength(i, 1)); R.logo.removeChild(probe);
    let x = -LOGO_W / 2;
    R.letters = [];
    [...'Native Crew'].forEach((ch, i) => {
      if (ch !== ' ') {
        const lg = E('g', {}, R.logo);
        disp(lg, ch, 200, { anchor: 'start', x: f1(x), fill: i > 6 ? C.accent : C.ink, weight: 700 });
        R.letters.push({ g: lg, cx: x + adv[i] / 2 });
      }
      x += adv[i];
    });
    R.dot = E('g', {}, R.logo);
    E('circle', { cx: x + 26, cy: -14, r: 42, fill: C.accent2, opacity: 0.35, filter: 'url(#glow)' }, R.dot);
    E('circle', { cx: x + 26, cy: -14, r: 17, fill: C.accent2 }, R.dot);
    R.dotX = x + 26;
    R.tag = G(R.captL, g => text(g, T.tagText, 40, { fill: C.mute }));

    R.cartaT = G(R.captL, g => disp(g, 'La carta', 88));
    R.cartaS = G(R.captL, g => text(g, 'Elige los empleados que tu negocio necesita', 30));
    R.cascT = G(R.captL, g => disp(g, 'Se pasan el trabajo entre ellos', 60));
    R.sectT = G(R.captL, g => disp(g, 'A la carta, para cada negocio', 60));
    R.sectP = SECT.map(([n]) => pill(R.captL, n, { size: 38, font: DISP, weight: 600, fill: C.accent, color: C.ink, h: 76, padX: 34 }));

    const conn = (d, col) => E('path', { d, fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }, R.connL);
    R.conns = [conn('M642,560 L758,560', C.accent), conn('M1162,560 L1278,560', C.accent), conn('M1480,664 C1480,905 440,905 440,664', C.accent2)];
    S(R.conns[2], 'stroke-opacity', 0.55);
    R.arrows = [[758, 560, 0, C.accent], [1278, 560, 0, C.accent], [440, 664, -90, C.accent2]].map(([ax, ay, a, col]) => {
      const g = G(R.connL); E('path', { d: 'M-13,-12 L5,0 L-13,12 Z', fill: col }, g); g._pos = [ax, ay, a]; return g;
    });
    R.connLen = R.conns.map(p => p.getTotalLength());
    loopPath = E('path', { d: 'M1480,560 L1480,664 C1480,905 440,905 440,664 L440,560', fill: 'none', stroke: 'none' }, R.connL);
    loopLen = loopPath.getTotalLength();

    // el cliente: un punto de luz
    R.tok = G(R.tokL);
    R.tokLabels = LABELS.map(l => { const p = pill(R.tok, l, { size: 20, fill: C.accent, color: C.ink }); S(p, 'transform', 'translate(0,-50)'); return p; });
    E('circle', { r: 40, fill: C.accent2, opacity: 0.4, filter: 'url(#glow)' }, R.tok);
    E('circle', { r: 15, fill: C.accent2 }, R.tok);

    R.cards = EMP.map((emp, gi) => {
      const g = G(R.cardsL);
      const sel = E('rect', { x: -CW / 2 - 6, y: -CH / 2 - 6, width: CW + 12, height: CH + 12, rx: 30, fill: 'none', stroke: C.accent2, 'stroke-width': 3, opacity: 0 }, g);
      E('rect', { x: -CW / 2, y: -CH / 2, width: CW, height: CH, rx: 24, fill: C.card, stroke: C.line, 'stroke-width': 2.5 }, g);
      E('circle', { cx: -150, cy: 0, r: 58, fill: C.deep, stroke: C.accent, 'stroke-width': 3 }, g);
      icon(g, emp.icon, -150, 0);
      const two = emp.t.length === 2;
      emp.t.forEach((l, i) => disp(g, l, 32, { anchor: 'start', x: -68, y: (two ? -38 : -16) + i * 36 }));
      emp.s.forEach((l, i) => text(g, l, 21, { anchor: 'start', x: -68, y: (two ? 34 : 20) + i * 27 }));
      const badge = G(g);
      E('circle', { r: 24, fill: C.accent2 }, badge);
      E('path', { d: 'M-10,1 L-2,9 L11,-8', fill: 'none', stroke: C.deep, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, badge);
      return { id: emp.id, gi, g, badge, sel };
    });
    R.plus = G(R.plusL, g => disp(g, '+1 cliente', 46, { fill: C.accent2 }));

    R.cur = G(R.curL);
    E('path', { d: 'M0,0 L26,19 L14,21 L22,37 L16,40 L8,24 L0,33 Z', fill: C.ink, stroke: C.ground, 'stroke-width': 3, 'stroke-linejoin': 'round' }, R.cur);

    R.endT = G(R.endL, g => disp(g, 'Elige tu equipo.', 84));
    R.endS = G(R.endL, g => text(g, 'Nosotros lo ponemos a trabajar.', 36));

    if (T.steps0 != null) buildPitch();
  }

  function buildPitch() {
    R.stepsT = G(R.stepsL, g => disp(g, 'Cómo funciona', 76));
    R.stepConns = [E('path', { d: 'M555,520 L865,520', fill: 'none', stroke: C.accent, 'stroke-width': 5, 'stroke-linecap': 'round' }, R.stepsL),
      E('path', { d: 'M1055,520 L1365,520', fill: 'none', stroke: C.accent, 'stroke-width': 5, 'stroke-linecap': 'round' }, R.stepsL)];
    R.stepConnLen = R.stepConns.map(p => p.getTotalLength());
    const lab = ['Diagnóstico', 'Tu combinación', 'Piloto de 30 días'];
    const sub = ['Cuestionario e informe con cifras', 'Los empleados que necesitas', 'Medido desde el primer día'];
    R.steps = STEP_X.map((sx, i) => {
      const g = G(R.stepsL);
      E('circle', { r: 88, fill: C.card, stroke: C.accent, 'stroke-width': 3 }, g);
      disp(g, String(i + 1), 88, { y: 31, weight: 700 });
      const l = G(R.stepsL, gg => disp(gg, lab[i], 42));
      const s = G(R.stepsL, gg => text(gg, sub[i], 24));
      return { g, l, s };
    });
    R.phone = G(R.phoneL);
    const P = R.phone;
    E('rect', { x: -230, y: -418, width: 460, height: 836, rx: 56, fill: C.deep, stroke: C.line, 'stroke-width': 3 }, P);
    E('rect', { x: -205, y: -385, width: 410, height: 770, rx: 34, fill: '#0f0e14' }, P);
    E('path', { d: 'M-205,-351 A34,34 0 0 1 -171,-385 L171,-385 A34,34 0 0 1 205,-351 L205,-300 L-205,-300 Z', fill: C.card }, P);
    E('circle', { cx: -160, cy: -342, r: 22, fill: C.accent }, P);
    disp(P, 'Encargado', 28, { anchor: 'start', x: -126, y: -338 });
    text(P, 'tu equipo de Native Crew', 17, { anchor: 'start', x: -126, y: -314 });
    const bubble = (lines, side, y, fill, color) => {
      const g = G(P);
      const ts = lines.map((l, i) => text(g, l, 22, { anchor: 'start', y: 30 + i * 30, fill: color, weight: 500 }));
      const w = Math.max(...ts.map(t => t.getComputedTextLength())) + 36, h = lines.length * 30 + 24;
      const x0 = side === 'L' ? -188 : 188 - w;
      g.insertBefore(E('rect', { x: x0, y: 0, width: w, height: h, rx: 18, fill }), ts[0]);
      ts.forEach(t => S(t, 'x', f1(x0 + 18)));
      g._y = y; return g;
    };
    R.b1 = bubble(['Buenos días. Hoy tienes 14', 'citas y 2 huecos a las 17:00.'], 'L', -272, C.chat, C.ink);
    R.b2 = bubble(['Marta lleva 3 semanas sin', 'venir. ¿Le escribo?'], 'L', -160, C.chat, C.ink);
    R.btns = G(P);
    R.btnSi = pill(R.btns, 'Sí', { size: 24, fill: 'none', color: C.accent2, h: 50, padX: 34, stroke: C.accent2 }); op(R.btnSi, 1); S(R.btnSi, 'transform', 'translate(-128,-40)');
    const no = pill(R.btns, 'No', { size: 24, fill: 'none', color: C.mute, h: 50, padX: 34, stroke: C.line }); op(no, 1); S(no, 'transform', 'translate(-20,-40)');
    R.bOwner = bubble(['Sí'], 'R', 20, C.accent, C.ink);
    R.b3 = bubble(['Hecho. Le he escrito y te', 'aviso si responde.'], 'L', 98, C.chat, C.ink);
    R.phoneC1 = G(R.phoneL, g => disp(g, 'Hablas con tu equipo', 64));
    R.phoneS = G(R.phoneL, g => { text(g, 'Por WhatsApp. Tu Encargado coordina', 30); text(g, 'al resto y te pregunta lo importante.', 30, { y: 42 }); });
    R.modelT = G(R.modelL, g => disp(g, 'Cómo ganamos', 76));
    const mp = ['Montaje', 'Cuota mensual', 'Por resultado'], ms = ['una vez', 'operación y supervisión', 'clientes conseguidos o recuperados'];
    R.mPills = mp.map((m, i) => G(R.modelL, g => {
      E('rect', { x: -190, y: -56, width: 380, height: 108, rx: 54, fill: C.card, stroke: i === 2 ? C.accent2 : C.accent, 'stroke-width': 3 }, g);
      disp(g, m, 38, { y: 12 });
      text(g, ms[i], 22, { y: 96 });
    }));
    R.plusSigns = [0, 1].map(() => G(R.modelL, g => disp(g, '+', 72, { fill: C.accent2 })));
    R.modelKey = G(R.modelL, g => disp(g, 'Solo ganamos más si tu negocio gana más', 46));
    R.modelC = G(R.modelL, g => text(g, 'Los mismos empleados, en muchos negocios', 28));
    R.secChips = ['Fitness', 'Estética', 'Peluquerías', 'Academias'].map(s => pill(R.modelL, s, { size: 24, fill: 'none', color: C.ink, h: 50, padX: 26, stroke: C.line }));
  }

  // ───────────────────────────── cámara ─────────────────────────────
  function keys() {
    const k = [{ t: 0, x: 960, y: 560, zoom: 1.06 },
      { t: T.rain0, x: 960, y: 555, zoom: 1.04, curve: ease.sineInOut },
      { t: T.shake0, x: 960, y: 530, zoom: 1.13, curve: ease.sineInOut },
      { t: T.burst, x: 960, y: 530, zoom: 1.13 },
      { t: T.burst + 0.4, x: 960, y: 560, zoom: 1.0, curve: ease.expoOut },
      { t: T.casc0, x: 960, y: 560, zoom: 1.0 },
      { t: T.casc0 + 0.8, x: 960, y: 575, zoom: 1.03, curve: ease.sineInOut },
      { t: T.sect0 - 0.3, x: 960, y: 578, zoom: 1.035, curve: ease.sineInOut },
      { t: T.sect0, x: 960, y: 560, zoom: 1.0, curve: ease.sineInOut }];
    if (T.steps0 != null) {
      k.push({ t: T.steps0 + 0.6, x: 960, y: 560, zoom: 1.0 }, { t: T.phone0 - 0.1, x: 960, y: 560, zoom: 1.03, curve: ease.sineInOut },
        { t: T.phone0 + 0.7, x: 965, y: 545, zoom: 1.02, curve: ease.expoInOut }, { t: T.model0 - 0.1, x: 968, y: 545, zoom: 1.03, curve: ease.sineInOut },
        { t: T.model0 + 0.6, x: 960, y: 560, zoom: 1.0, curve: ease.expoInOut });
    }
    k.push({ t: T.end0, x: 960, y: 560, zoom: 1.0 }, { t: T.end0 + 0.7, x: 960, y: 580, zoom: 1.05, curve: ease.expoOut });
    return k.sort((a, b) => a.t - b.t);
  }
  let KEYS = [], HITS = [];
  function camAt(t) {
    const c = OM.camera(t, KEYS);
    let e = sstep(0.1, 0.5, t) * 4.5;
    for (const [a, b] of T.holds) e *= 1 - sstep(a - 0.15, a, t) * (1 - sstep(b, b + 0.2, t));
    let x = c.x + e * (Math.sin(1.7 * t) + 0.6 * Math.sin(2.9 * t + 1)) / c.zoom, y = c.y + e * (Math.sin(1.3 * t + 2) + 0.5 * Math.sin(3.3 * t)) / c.zoom, rot = c.rot;
    for (const [th, amp, decay] of HITS) { const s = OM.shake(t, th, { amp, decay, seed: Math.round(th * 100) }); x += s.x / c.zoom; y += s.y / c.zoom; rot += s.rot; }
    return { x, y, zoom: c.zoom, rot };
  }

  // ───────────────────────────── escenas ─────────────────────────────
  const chipT = i => T.rain0 + i * 0.17, chipLand = i => chipT(i) + 0.34;
  function sceneOpening(t) {
    if (t < T.tu - 0.01 || t > T.burst + 0.15) hide(R.tu);
    else {
      const w = OM.wordRise(t, T.tu, { dist: 60, zeta: 0.5 });
      let landed = 0, rr = 0;
      CHIPS.forEach((c, i) => { if (t >= chipLand(i)) { landed++; rr += ring(t - chipLand(i), 9, 24); } });
      const sy = 1 - 0.028 * landed - 0.05 * rr, sx = 1 + 0.018 * landed + 0.03 * rr;
      const tr = t >= T.shake0 ? Math.sin(t * 71) * 5 * sstep(T.shake0, T.shake0 + 0.1, t) : 0;
      const k = seg(t, T.burst, T.burst + 0.12);
      tf(R.tu, 960 + tr, 668 + w.y, w.s * (1 - 0.5 * k), 0, sx, sy); op(R.tu, w.op * (1 - k));
    }
    showRise(R.sub1, t, T.sub1, T.sub2 - 0.25, 960, 800);
    showRise(R.sub2, t, T.sub2, T.burst, 960, 800);
    R.chips.forEach((g, i) => {
      const t0 = chipT(i), P = PILE[i];
      if (t < t0) { hide(g); return; }
      const k = seg(t, t0, t0 + 0.34);
      let x = P.x, y = lerp(-180, P.y, k * k), rot = lerp(P.r + (i % 2 ? 28 : -28), P.r, k), sx = 1, sy = 1;
      if (t >= chipLand(i)) { const im = OM.impact(t, chipLand(i), { sqx: 0.08, sqy: 0.16 }); sx = im.sx; sy = im.sy; }
      if (t >= T.shake0 && t < T.burst) { x += Math.sin(t * 63 + i) * 4; rot += Math.sin(t * 47 + i) * 2; }
      if (t >= T.burst) {
        const u = seg(t, T.burst, T.burst + 0.8), dx = P.x - 960, dy = P.y - 560, n = Math.hypot(dx, dy) || 1, d = 1900 * ease.expoOut(u);
        x += dx / n * d; y += dy / n * d; rot += (i % 2 ? 1 : -1) * 380 * u;
        if (u >= 1) { hide(g); return; }
      }
      tf(g, x, y, 1, rot, sx, sy); op(g, 1);
    });
  }
  function logoPose(t) {
    const big = { x: 960, y: 610, s: 1 }, head = { x: 70 + LOGO_W * HS / 2, y: 108, s: HS }, end = { x: 960, y: 540, s: 1 };
    const mix = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), s: Math.exp(lerp(Math.log(a.s), Math.log(b.s), k)) });
    let p = big;
    if (t >= T.carta0) p = mix(big, head, ease.quintInOut(seg(t, T.carta0, T.carta0 + 0.6)));
    if (t >= T.end0) p = mix(head, end, ease.quintInOut(seg(t, T.end0, T.end0 + 0.65)));
    return p;
  }
  function sceneLogo(t) {
    if (t < T.burst - 0.01) { hide(R.logo); return; }
    const p = logoPose(t);
    S(R.logo, 'transform', `translate(${f1(p.x)},${f1(p.y)}) scale(${f3(p.s)})`); op(R.logo, 1);
    const land = OM.impact(t, T.end0 + 0.65, { sqx: 0, sqy: 0.12 });
    R.letters.forEach((L, j) => {
      const d = OM.letterDrop(t, T.burst, j, { dist: 150, stagger: 0.035 });
      const dy = d.y + (t >= T.end0 + 0.65 ? (1 - land.sy) * 90 * Math.cos(j * 0.9) : 0);
      S(L.g, 'transform', `translate(${f1(L.cx)},${f1(dy)}) scale(${f3(d.sx)},${f3(d.sy)}) translate(${f1(-L.cx)},0)`); op(L.g, d.op);
    });
    // el punto de luz llega el último, como el sujeto del film
    const dt = T.burst + 0.55, dp = OM.popIn(t, dt, { rise: 0, s0: 0, ds: 1, zeta: 0.45, omega: 16 });
    S(R.dot, 'transform', `translate(${f1(R.dotX)},-14) scale(${f3(Math.max(0, dp.s))}) translate(${f1(-R.dotX)},14)`); op(R.dot, t >= dt ? 1 : 0);
    showRise(R.tag, t, T.tag, T.carta0, 960, 740);
  }
  function sceneCaptions(t) {
    showRise(R.cartaT, t, T.carta0 + 0.15, T.casc0, 960, 238);
    showRise(R.cartaS, t, T.carta0 + 0.28, T.casc0, 960, 294);
    showRise(R.cascT, t, T.casc0 + 0.3, T.sect0, 960, 255);
    showRise(R.sectT, t, T.sect0 + 0.05, T.gather, 960, 205);
    R.sectP.forEach((p, i) => {
      const a = sectT(i), b = i < SECT.length - 1 ? sectT(i + 1) : T.gather;
      if (t < a || t >= b + (i === SECT.length - 1 ? 0.25 : 0)) { hide(p); return; }
      const pr = OM.press(t, a, { depth: 0.22 }), o = i === SECT.length - 1 ? 1 - seg(t, b, b + 0.25) : 1;
      tf(p, 960, 305, pr.s); op(p, o);
    });
  }
  function slotSets(t) {
    let ids = PICK, prev = null, ts = -1;
    SECT.forEach(([, set], i) => { if (t >= sectT(i)) { prev = ids; ids = set; ts = sectT(i); } });
    return { ids, prev, ts };
  }
  const FLIP = 0.2;
  function sceneCards(t) {
    const { ids, prev, ts } = slotSets(t);
    R.cards.forEach(card => {
      const { id, gi, g, badge, sel } = card, gp = GRID(gi), tIn = T.cards0 + gi * 0.07;
      if (t < tIn - 0.01) { hide(g); return; }
      const p = OM.popIn(t, tIn, { rise: 44, s0: 0.82, ds: 0.18 });
      let x = gp.x, y = gp.y + p.dy, s = p.s, o = p.op, sx = 1, rot = 0, bs = 0, so = 0;
      const pi = PICK.indexOf(id);
      if (pi >= 0 && t >= T.picks[pi]) {
        s *= OM.press(t, T.picks[pi], { depth: 0.08 }).s; y -= 14 * sstep(T.picks[pi], T.picks[pi] + 0.15, t);
        bs = OM.tick(t, T.picks[pi] + 0.04).s * (1 - sstep(T.conn, T.conn + 0.2, t));
        so = sstep(T.picks[pi], T.picks[pi] + 0.12, t) * (1 - sstep(T.conn, T.conn + 0.3, t));
      }
      if (pi < 0 && t >= T.picks[0]) o *= 1 - 0.55 * sstep(T.picks[0], T.picks[0] + 0.3, t);
      if (t >= T.casc0) {
        if (pi >= 0) {
          const k = ease.quintInOut(seg(t, T.casc0 + pi * 0.06, T.casc0 + 0.65 + pi * 0.06)), sl = SLOT[pi];
          x = lerp(gp.x, sl.x, k); y = lerp(gp.y - 14, sl.y, k) - Math.sin(k * Math.PI) * 70; s = lerp(s, SLOT_S, k);
        } else { const k = ssstep(T.casc0, T.casc0 + 0.35, t); o *= 1 - k; y += 60 * k; s *= 1 - 0.15 * k; }
      }
      if (t >= T.tok0 && pi >= 0 && t < T.sect0) TOKEN_TIMES.forEach((d, j) => {
        if ([0, 1, 2, 0][j] === pi) { const pr = OM.press(t, T.tok0 + d, { depth: 0.07, flash: 0.35 }); s *= pr.s; if (pr.active) so = Math.max(so, 1 - (t - T.tok0 - d) / 0.35); }
      });
      if (prev) {
        const j = ids.indexOf(id), jp = prev.indexOf(id);
        if (j >= 0 && jp === j) { x = SLOT[j].x; y = SLOT[j].y; s = SLOT_S; o = 1; }
        else if (j >= 0) { const k = seg(t, ts + FLIP, ts + 2 * FLIP); x = SLOT[j].x; y = SLOT[j].y; s = SLOT_S * OM.press(t, ts + 2 * FLIP, { depth: 0.06 }).s; sx = k > 0 ? ease.cubicOut(k) : 0; o = k > 0 ? 1 : 0; so = k > 0 ? 1 - seg(t, ts + 2 * FLIP, ts + 2 * FLIP + 0.4) : 0; }
        else if (jp >= 0) { const k = seg(t, ts, ts + FLIP); x = SLOT[jp].x; y = SLOT[jp].y; s = SLOT_S; sx = 1 - cubicIn(k); o = k < 1 ? 1 : 0; }
        else o = 0;
      }
      if (t >= T.gather) {
        const k = cubicIn(seg(t, T.gather, T.gather + 0.45)), j = ids.indexOf(id);
        x = lerp(x, 960, k); y = lerp(y, 540, k); s *= 1 - 0.88 * k; rot = (j - 1) * 25 * k; o *= 1 - sstep(0.75, 1, k);
      }
      if (o <= 0.001) { hide(g); return; }
      tf(g, x, y, s, rot, sx, 1); op(g, o); op(sel, so);
      S(badge, 'transform', `translate(${CW / 2 - 20},${-CH / 2 + 20}) scale(${f3(Math.max(0, bs))})`); op(badge, bs > 0 ? 1 : 0);
    });
  }
  function drawOn(p, L, k) { S(p, 'stroke-dasharray', `${f1(L)} ${f1(L)}`); S(p, 'stroke-dashoffset', f1(L * (1 - k))); }
  function sceneConnectors(t) {
    const out = t >= T.gather ? 1 - seg(t, T.gather, T.gather + 0.25) : 1;
    R.conns.forEach((p, i) => {
      if (t < T.conn + i * 0.14) { hide(p); hide(R.arrows[i]); return; }
      drawOn(p, R.connLen[i], ease.cubicOut(seg(t, T.conn + i * 0.14, T.conn + 0.45 + i * 0.14))); op(p, out);
      const a = R.arrows[i], [ax, ay, ang] = a._pos, ak = OM.tick(t, T.conn + 0.45 + i * 0.14);
      if (ak.on) { tf(a, ax, ay, ak.s, ang); op(a, out); } else hide(a);
    });
    if (T.steps0 != null) {
      const sOut = t >= T.phone0 ? 1 - seg(t, T.phone0, T.phone0 + 0.35) : 1;
      R.stepConns.forEach((p, i) => {
        if (t < T.steps0 + 0.8 + i * 0.15) { hide(p); return; }
        drawOn(p, R.stepConnLen[i], ease.cubicOut(seg(t, T.steps0 + 0.8 + i * 0.15, T.steps0 + 1.2 + i * 0.15))); op(p, sOut);
        S(p, 'transform', `translate(${f1(-300 * (1 - sOut))},0)`);
      });
    }
  }
  function tokenAt(t) {
    const u = t - T.tok0;
    if (u >= 0 && u < 3.55) {
      const segs = [[0, 0.6, [-60, 560], [440, 560], 0], [0.8, 1.4, [440, 560], [960, 560], 1], [1.6, 2.2, [960, 560], [1480, 560], 2]];
      for (const [a, b, A, B, lab] of segs) if (u < b + 0.2) {
        const k = ease.cubicInOut(seg(u, a, b));
        return { x: lerp(A[0], B[0], k), y: lerp(A[1], B[1], k), label: lab };
      }
      const k = ease.cubicInOut(seg(u, 2.4, 3.4)), pt = loopPath.getPointAtLength(loopLen * k);
      return { x: pt.x, y: pt.y, label: 3 };
    }
    if (T.steps0 != null) {
      const v = t - T.steps0;
      if (v >= 1.4 && v < 3.8) {
        const segs = [[1.4, 2.0, -60, STEP_X[0]], [2.2, 2.8, STEP_X[0], STEP_X[1]], [3.0, 3.6, STEP_X[1], STEP_X[2]]];
        for (const [a, b, A, B] of segs) if (v < b + 0.2) return { x: lerp(A, B, ease.cubicInOut(seg(v, a, b))), y: STEP_Y, label: 4 };
      }
    }
    return null;
  }
  function sceneToken(t) {
    const p = tokenAt(t);
    if (!p) hide(R.tok);
    else { tf(R.tok, p.x, p.y); op(R.tok, 1); R.tokLabels.forEach((l, i) => op(l, i === p.label ? 1 : 0)); }
    const tp = T.tok0 + 3.4;
    if (t < tp || t > tp + 1.0) hide(R.plus);
    else { const w = OM.wordRise(t, tp, { dist: 20, zeta: 0.5 }), k = seg(t, tp + 0.55, tp + 1.0); tf(R.plus, 440, 425 + w.y - 50 * k, w.s); op(R.plus, w.op * (1 - k)); }
  }
  function sceneSteps(t) {
    if (T.steps0 == null) return;
    const out = t >= T.phone0 ? cubicIn(seg(t, T.phone0, T.phone0 + 0.35)) : 0;
    showRise(R.stepsT, t, T.steps0, T.phone0, 960, 235);
    const popT = i => T.steps0 + [0.35, 0.05, 0.55][i];
    R.steps.forEach((st, i) => {
      if (t < popT(i) - 0.01 || out >= 1) { hide(st.g); hide(st.l); hide(st.s); return; }
      const p = OM.popIn(t, popT(i), { rise: 40, s0: 0.5, ds: 0.5, zeta: 0.55 });
      const press = OM.press(t, T.steps0 + [2.0, 2.8, 3.6][i], { depth: 0.1 }).s, dx = -300 * out;
      tf(st.g, STEP_X[i] + dx, STEP_Y + p.dy, p.s * press); op(st.g, p.op * (1 - out));
      const w = OM.wordRise(t, popT(i) + 0.15, { dist: 24 });
      tf(st.l, STEP_X[i] + dx, 680 + w.y, w.s); op(st.l, (t >= popT(i) + 0.14 ? w.op : 0) * (1 - out));
      tf(st.s, STEP_X[i] + dx, 726 + w.y); op(st.s, (t >= popT(i) + 0.2 ? w.op : 0) * (1 - out));
    });
  }
  function scenePhone(t) {
    if (T.phone0 == null) return;
    const t0 = T.phone0;
    if (t < t0 - 0.01 || t > T.model0 + 0.6) { hide(R.phone); hide(R.phoneC1); hide(R.phoneS); return; }
    const p = OM.popIn(t, t0, { rise: 900, s0: 1, ds: 0, zeta: 0.72, omega: 12 });
    const ex = t >= T.model0 ? ease.expoIn(seg(t, T.model0, T.model0 + 0.5)) * 1100 : 0;
    tf(R.phone, 1320 + ex, 540 + p.dy); op(R.phone, 1);
    [[R.b1, 0.9], [R.b2, 1.9], [R.btns, 2.3], [R.bOwner, 3.25], [R.b3, 3.9]].forEach(([g, d]) => {
      if (t < t0 + d) { hide(g); return; }
      const q = OM.popIn(t, t0 + d, { rise: 18, s0: 0.85, ds: 0.15 });
      tf(g, 0, (g._y != null ? g._y : 0) + q.dy, q.s); op(g, q.op);
    });
    const pr = OM.press(t, t0 + 3.05, { depth: 0.2 }), on = t >= t0 + 3.05;
    S(R.btnSi, 'transform', `translate(-128,-40) scale(${f3(pr.s)})`);
    S(R.btnSi.querySelector('rect'), 'fill', on ? C.accent2 : 'none');
    S(R.btnSi.querySelector('text'), 'fill', on ? C.deep : C.accent2);
    showRise(R.phoneC1, t, t0 + 0.3, T.model0, 600, 470);
    showRise(R.phoneS, t, t0 + 0.6, T.model0, 600, 550);
  }
  function sceneModel(t) {
    if (T.model0 == null) return;
    const t0 = T.model0, tOut = T.end0;
    const lift = () => (t >= tOut ? OM.liftOut(t, tOut, { dur: 0.25 }) : { op: 1, dy: 0, s: 1 });
    showRise(R.modelT, t, t0 + 0.1, tOut, 960, 250);
    R.mPills.forEach((g, i) => {
      const a = t0 + 0.4 + i * 0.35;
      if (t < a || t > tOut + 0.3) { hide(g); return; }
      const q = OM.popIn(t, a, { rise: 50, s0: 0.6, ds: 0.4, zeta: 0.5 }), l = lift();
      tf(g, [470, 960, 1450][i], 470 + q.dy + l.dy, q.s * l.s); op(g, q.op * l.op);
    });
    R.plusSigns.forEach((g, i) => {
      const a = t0 + 0.6 + i * 0.35;
      if (t < a || t > tOut + 0.3) { hide(g); return; }
      const q = OM.popIn(t, a, { rise: 20, s0: 0.3, ds: 0.7, zeta: 0.45 }), l = lift();
      tf(g, [715, 1205][i], 494 + q.dy + l.dy, q.s * l.s); op(g, q.op * l.op);
    });
    showRise(R.modelKey, t, t0 + 1.6, tOut, 960, 690);
    showRise(R.modelC, t, t0 + 2.1, tOut, 960, 790);
    R.secChips.forEach((g, i) => {
      const a = t0 + 2.3 + i * 0.1;
      if (t < a || t > tOut + 0.3) { hide(g); return; }
      const q = OM.popIn(t, a, { rise: 20, s0: 0.7, ds: 0.3 }), l = lift();
      tf(g, 960 + (i - 1.5) * 230, 860 + q.dy + l.dy, q.s * l.s); op(g, q.op * l.op);
    });
  }
  function sceneEnd(t) {
    showRise(R.endT, t, T.endTag, null, 960, 740);
    showRise(R.endS, t, T.endTag + 0.2, null, 960, 810);
  }
  function cursorKnots() {
    const g0 = GRID(0), g1 = GRID(1), g4 = GRID(4);
    const sets = [{ from: T.cursorIn - 0.4, to: T.cursorOut + 0.35, clicks: T.picks, kn: [{ t: T.cursorIn - 0.4, x: 1850, y: 1220 },
      { t: T.picks[0] - 0.12, x: g0.x + 40, y: g0.y + 30 }, { t: T.picks[0] + 0.12, x: g0.x + 40, y: g0.y + 30 },
      { t: T.picks[1] - 0.12, x: g1.x + 40, y: g1.y + 30 }, { t: T.picks[1] + 0.12, x: g1.x + 40, y: g1.y + 30 },
      { t: T.picks[2] - 0.12, x: g4.x + 40, y: g4.y + 30 }, { t: T.picks[2] + 0.16, x: g4.x + 40, y: g4.y + 30 },
      { t: T.cursorOut + 0.35, x: 1550, y: 1260 }] }];
    if (T.phone0 != null) {
      const bx = 1320 - 128 + 8, by = 540 - 40 + 8;
      sets.push({ from: T.phone0 + 2.4, to: T.phone0 + 3.9, clicks: [T.phone0 + 3.05], kn: [{ t: T.phone0 + 2.4, x: 1760, y: 1180 },
        { t: T.phone0 + 2.95, x: bx, y: by }, { t: T.phone0 + 3.2, x: bx, y: by }, { t: T.phone0 + 3.9, x: 1780, y: 1220 }] });
    }
    return sets;
  }
  let CURSORS = [];
  function sceneCursor(t) {
    const set = CURSORS.find(s => t >= s.from && t <= s.to);
    if (!set) { hide(R.cur); return; }
    const c = OM.cursor(t, set.kn, set.clicks);
    tf(R.cur, c.x, c.y, c.s); op(R.cur, 1);
  }

  function seek(t) {
    const CAM = camAt(t);
    S($('world'), 'transform', mtx(OM.view(CAM)));
    S($('lattice'), 'transform', mtx(OM.view(CAM, { depth: 1.2 })));
    sceneOpening(t); sceneLogo(t); sceneCaptions(t); sceneCards(t); sceneConnectors(t); sceneToken(t);
    sceneSteps(t); scenePhone(t); sceneModel(t); sceneEnd(t); sceneCursor(t);
    const hud = $('hud'); if (hud) hud.textContent = 't=' + t.toFixed(3);
    return Promise.resolve();
  }

  // ───────────────────────────── eventos para el sonido ─────────────────────────────
  function events() {
    const ev = [], add = (t, kind, x = 960, v = 1, extra = {}) => ev.push(Object.assign({ t: +t.toFixed(3), kind, pan: clamp((x - 960) / 960, -1, 1), v }, extra));
    CHIPS.forEach((c, i) => add(chipLand(i), 'tick', PILE[i].x, 0.45 + 0.07 * i));
    add(T.shake0 - 0.6, 'rise', 960, 1, { dur: T.burst - T.shake0 + 0.6 });
    add(T.burst, 'boom'); add(T.burst + 0.55, 'logo', 1500);
    add(T.tag, 'word', 960, 0.5);
    add(T.carta0, 'whoosh', 300, 0.7, { to: -0.6 });
    EMP.forEach((e, gi) => { if (gi % 2 === 0) add(T.cards0 + gi * 0.07, 'pop', GRID(gi).x, 0.6); });
    T.picks.forEach((p, i) => add(p, 'click', GRID([0, 1, 4][i]).x, 1, { n: i }));
    add(T.casc0 + 0.1, 'whoosh', 960, 0.8, { to: 0 });
    [[0.6, 440, 0], [1.4, 960, 1], [2.2, 1480, 2]].forEach(([d, x, n]) => add(T.tok0 + d, 'note', x, 1, { n }));
    add(T.tok0 + 2.4, 'whoosh', 1480, 0.6, { to: -0.55 });
    add(T.tok0 + 3.4, 'chord', 440, 1);
    SECT.forEach((s, i) => add(sectT(i), 'flip', 960, 0.9, { n: i }));
    add(T.gather, 'whoosh', 960, 0.8, { to: 0 });
    if (T.steps0 != null) {
      add(T.steps0 + 0.05, 'pop', 960, 0.8); add(T.steps0 + 0.35, 'pop', 460, 0.6); add(T.steps0 + 0.55, 'pop', 1460, 0.6);
      [[2.0, 460, 0], [2.8, 960, 1], [3.6, 1460, 2]].forEach(([d, x, n]) => add(T.steps0 + d, 'note', x, 1, { n: n + 1 }));
      add(T.phone0, 'whoosh', 1320, 0.8, { to: 0.4 });
      [0.9, 1.9, 3.25, 3.9].forEach((d, i) => add(T.phone0 + d, 'bubble', i === 2 ? 1500 : 1180, 0.8));
      add(T.phone0 + 3.05, 'click', 1200, 1, { n: 0 });
      add(T.model0, 'whoosh', 1320, 0.7, { to: 0.7 });
      [0, 1, 2].forEach(i => add(T.model0 + 0.4 + i * 0.35, 'note', [470, 960, 1450][i], 0.9, { n: i + 2 }));
      add(T.model0 + 1.6, 'word', 960, 0.7);
    }
    add(T.end0 + 0.65, 'land', 960, 1); add(T.endTag, 'word', 960, 0.6);
    return { dur: T.dur, burst: T.burst, casc0: T.casc0, end0: T.end0, holds: T.holds, events: ev.sort((a, b) => a.t - b.t) };
  }

  const cuts = [T.burst, T.carta0, T.casc0, T.sect0, T.gather, T.steps0, T.phone0, T.model0, T.end0].filter(v => v != null);
  window.__meta = { dur: T.dur, fps: 30, w: 1920, h: 1080, cuts };
  window.__events = events;
  window.__seek = async t => { await seek(t); return true; };
  window.__ready = LOOK.ready.then(() => {
    build();
    KEYS = keys(); CURSORS = cursorKnots();
    HITS = [[T.burst, 16, 8], ...T.picks.map(p => [p, 3, 12]), [T.tok0 + 3.4, 4, 10], ...SECT.map((s, i) => [sectT(i) + 2 * FLIP, 3, 12]), [T.end0 + 0.65, 10, 8]];
    if (T.steps0 != null) HITS.push([T.steps0 + 0.05, 5, 10], [T.phone0 + 0.45, 6, 9], [T.model0 + 0.4, 4, 10]);
    return seek(0);
  });
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.__ready.then(() => seek(parseFloat(q.get('t'))));
  if (q.has('hud')) window.__ready.then(() => { $('hud').style.display = 'block'; });
  if (q.has('play')) window.__ready.then(() => { const t0 = performance.now(); (function loop() { seek(((performance.now() - t0) / 1000) % T.dur); requestAnimationFrame(loop); })(); });
})();
