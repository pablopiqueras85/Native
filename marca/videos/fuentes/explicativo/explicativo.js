// onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
// Native Crew · vídeo explicativo con voz en off: cada cliente, cómo funciona Dots, la implementación y lo que es tuyo.
// Look "dusk". Uso no comercial: para que el fundador lo entienda y lo enseñe a colegas.
// Todo es función pura de t. Contrato onetake: __seek, __ready, __meta y __events() para el sonido.
(function () {
  'use strict';
  const { clamp, lerp, seg, ease } = OM;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const S = (el, k, v) => el.setAttribute(k, v);
  const f1 = v => (+v).toFixed(1), f3 = v => (+v).toFixed(3);
  const C = Object.assign({}, LOOK.color, { blue: '#4c9aff', green: '#3ddc97', red: '#ff5f6d', yellow: '#f4c64f', orange: '#ff8a5b', violet: '#8b7dff' });
  const DISP = LOOK.type.display.family, TEXT = LOOK.type.text.family;
  const P = window.PLAN, L = P.lines, DUR = P.dur;
  const LS = i => L[i - 1].t0, LE = i => L[i - 1].t0 + L[i - 1].dur, LF = (i, f) => LS(i) + L[i - 1].dur * f;

  // ───────────────────────────── escenarios (mundo) ─────────────────────────────
  const ST = {
    intro: [0, 0], cli: [2300, 0], dec: [2300, 1300], por: [2300, 2600],
    dot: [4600, 0], reg: [4600, 1300], pkg: [6900, 0], rev: [6900, 1300],
    tuyo: [9200, 0], rut: [9200, 1300], fas: [9200, 2600], pil: [11500, 0], fin: [11500, 1300],
  };
  const CH = [ // capítulos: cartel en pantalla durante el hueco antes de la frase
    { n: '1', t: 'En cada cliente', line: 3 }, { n: '2', t: 'Cómo funciona Dots', line: 11 },
    { n: '3', t: 'Cómo lo implementarías', line: 16 }, { n: '4', t: 'Lo que construyes tú', line: 22 },
    { n: '5', t: 'Por dónde empezar', line: 27 },
  ];
  const chT = c => [LE(c.line - 1) + 0.15, LS(c.line) - 0.2];
  // cámara: llega a cada escenario antes de su primera frase
  const STAGE_AT = [['intro', 0], ['cli', 3], ['dec', 5], ['por', 10], ['dot', 11], ['reg', 14], ['pkg', 16], ['rev', 19],
    ['tuyo', 22], ['rut', 24], ['fas', 26], ['pil', 27], ['fin', 28]];
  function camKeys() {
    const K = [];
    STAGE_AT.forEach(([s, line], j) => {
      const [x, y] = ST[s], cx = x + 960, cy = y + 540;
      const arrive = j === 0 ? 0 : LS(line) - 0.35, leave = j === 0 ? 0 : arrive - 1.05;
      if (j > 0) K.push({ t: leave, x: K[K.length - 1].x, y: K[K.length - 1].y, zoom: K[K.length - 1].zoom });
      K.push({ t: Math.max(arrive, 0), x: cx, y: cy, zoom: 1, curve: ease.expoInOut });
      const next = STAGE_AT[j + 1], end = next ? LS(next[1]) - 1.4 : DUR;
      K.push({ t: end, x: cx, y: cy - 6, zoom: 1.025, curve: ease.sineInOut });
    });
    return K;
  }
  let KEYS = [];

  // ───────────────────────────── utilidades ─────────────────────────────
  function E(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const op = (el, v) => S(el, 'opacity', f3(clamp(v, 0, 1)));
  function disp(p, str, size, o = {}) {
    const t = E('text', { x: o.x || 0, y: o.y || 0, 'font-size': size, 'font-family': DISP, 'font-weight': o.weight || 650,
      'text-anchor': o.anchor || 'middle', fill: o.fill || C.ink, 'letter-spacing': f1(LOOK.type.display.tracking * size) }, p);
    t.textContent = str; return t;
  }
  function text(p, str, size, o = {}) {
    const t = E('text', { x: o.x || 0, y: o.y || 0, 'font-size': size, 'font-family': TEXT, 'font-weight': o.weight || 500,
      'text-anchor': o.anchor || 'middle', fill: o.fill || C.mute }, p);
    t.textContent = str; return t;
  }
  const ITEMS = [];
  // un elemento del mundo: aparece en t con popIn; hl = [[a,b]] tramos en que se resalta; dim = tramos en que se atenúa
  function item(stage, x, y, t, build, o = {}) {
    const [ox, oy] = ST[stage];
    const g = E('g', { opacity: 0 }, R.world);
    build(g);
    const it = Object.assign({ g, x: ox + x, y: oy + y, t, kind: 'pop' }, o);
    ITEMS.push(it); return it;
  }
  function card(g, w, h, { title, sub, color = C.line, fill = C.card, size = 32, subSize = 22, dash = false, icon = null, align = 'middle' } = {}) {
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 18, fill, stroke: color, 'stroke-width': 2.5 }, g);
    if (dash) S(r, 'stroke-dasharray', '10 8');
    g._rect = r;
    const tx = align === 'start' ? -w / 2 + 34 : 0;
    const ty = sub ? -h * 0.06 : size * 0.35;
    if (title) disp(g, title, size, { y: ty + (sub ? 0 : 0), x: tx, anchor: align });
    if (sub) text(g, sub, subSize, { y: ty + subSize * 1.5, x: tx, anchor: align });
    if (icon) icon(g);
    return r;
  }
  function chip(g, str, color, { size = 26, h = 54, fillA = 0.16, bold = 600 } = {}) {
    const t = text(g, str, size, { fill: C.ink, weight: bold, y: size * 0.36 });
    const w = Math.max(80, str.length * size * 0.56 + 44);
    g.insertBefore(E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2, fill: color, 'fill-opacity': fillA, stroke: color, 'stroke-width': 2 }), t);
    return w;
  }
  function blob(g, r, color, { face = true, glasses = false } = {}) {
    E('ellipse', { cx: 0, cy: r * 0.98, rx: r * 0.8, ry: r * 0.13, fill: '#000', opacity: 0.28 }, g);
    E('circle', { cx: 0, cy: 0, r, fill: color }, g);
    E('circle', { cx: -r * 0.32, cy: -r * 0.38, r: r * 0.22, fill: '#fff', opacity: 0.18 }, g);
    if (!face) return;
    const eg = E('g', {}, g); g._eyes = eg;
    [-1, 1].forEach(s => {
      E('circle', { cx: s * r * 0.3, cy: -r * 0.1, r: r * 0.16, fill: '#15131c' }, eg);
      E('circle', { cx: s * r * 0.3 + r * 0.05, cy: -r * 0.16, r: r * 0.055, fill: '#fff' }, eg);
    });
    if (glasses) E('path', { d: `M${-r * 0.52},${-r * 0.1} h${r * 0.42} M${r * 0.1},${-r * 0.1} h${r * 0.42}`, stroke: '#15131c', 'stroke-width': r * 0.06 }, g);
    E('path', { d: `M${-r * 0.24},${r * 0.24} Q0,${r * 0.46} ${r * 0.24},${r * 0.24}`, stroke: '#15131c', 'stroke-width': r * 0.08, fill: 'none', 'stroke-linecap': 'round' }, g);
  }
  const ARROWS = [];
  function arrow(stage, x1, y1, x2, y2, t, { color = C.mute, bend = 0, dash = false, w = 3, dur = 0.45 } = {}) {
    const [ox, oy] = ST[stage];
    const a = [ox + x1, oy + y1], b = [ox + x2, oy + y2];
    const mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend;
    const p = E('path', { d: `M${f1(a[0])},${f1(a[1])} Q${f1(mx)},${f1(my)} ${f1(b[0])},${f1(b[1])}`, fill: 'none', stroke: color, 'stroke-width': w,
      'stroke-linecap': 'round', opacity: 0, 'marker-end': 'url(#arr)' }, R.arrows);
    ARROWS.push({ p, t, dash, dur });
  }

  // ───────────────────────────── construcción ─────────────────────────────
  const R = {};
  function build() {
    R.world = $('world'); R.arrows = E('g', {}, R.world);
    R.world.appendChild(R.arrows);

    // ── intro ──
    item('intro', 960, 360, 0.35, g => {
      disp(g, 'Native Crew', 168, { weight: 800, y: 50 });
      E('circle', { cx: 560, cy: 6, r: 22, fill: C.yellow }, g);
    }, { kind: 'rise' });
    item('intro', 960, 470, 0.9, g => text(g, 'Cómo funciona, cliente a cliente', 34, { fill: C.mute }), { kind: 'rise' });
    [[C.blue, 700, 50], [C.red, 830, 40], [C.yellow, 960, 70], [C.green, 1090, 48], [C.violet, 1220, 40]].forEach(([c, x, r], i) =>
      item('intro', x, 640, LF(1, 0.25 + i * 0.1), g => blob(g, r, c), { kind: 'hop' }));
    ['Consultoría', 'Implementación', 'Revisión'].forEach((s, i) => {
      item('intro', 560 + i * 400, 850, LF(2, [0.42, 0.62, 0.86][i]), g => chip(g, s, C.yellow, { size: 32, h: 70 }));
      if (i) arrow('intro', 560 + (i - 1) * 400 + 125, 850, 560 + i * 400 - 135, 850, LF(2, [0.42, 0.62, 0.86][i]) - 0.1, { color: C.yellow });
    });

    // ── cliente: puertas y Consultor ──
    item('cli', 960, 130, LS(3) - 0.2, g => text(g, 'Cada cliente empieza igual', 30, { fill: C.mute, weight: 600 }), { kind: 'rise' });
    item('cli', 290, 540, LF(3, 0.05), g => { card(g, 330, 170, { title: 'Llega un cliente', sub: 'conocido o referido', size: 30 }); });
    item('cli', 780, 400, LF(3, 0.42), g => card(g, 300, 120, { title: 'Formulario', sub: 'por defecto', color: C.yellow, size: 30 }));
    item('cli', 780, 690, LF(3, 0.72), g => card(g, 300, 120, { title: 'Reunión', sub: 'si se da el caso', color: C.violet, size: 30 }));
    arrow('cli', 460, 520, 625, 410, LF(3, 0.38), { bend: -0.1 });
    arrow('cli', 460, 560, 625, 680, LF(3, 0.68), { bend: 0.1 });
    item('cli', 1230, 545, LF(4, 0.02), g => {
      card(g, 360, 260, { fill: '#1a1726', color: C.yellow });
      const b = E('g', { transform: 'translate(0,-38)' }, g); blob(b, 54, C.yellow, { glasses: true });
      disp(g, 'Agente Consultor', 30, { y: 70 }); text(g, 'lee lo que dijo el cliente', 21, { y: 102 });
    });
    arrow('cli', 935, 410, 1045, 500, LF(4, 0.0), { bend: -0.08, color: C.yellow });
    arrow('cli', 935, 680, 1045, 590, LF(4, 0.0), { bend: 0.08, color: C.violet });
    item('cli', 1660, 420, LF(4, 0.5), g => card(g, 300, 120, { title: 'De la carta', sub: 'empleados ya hechos', color: C.green, size: 30 }));
    item('cli', 1660, 680, LF(4, 0.78), g => card(g, 300, 120, { title: 'A medida', sub: 'si hace falta', color: C.violet, dash: true, size: 30 }));
    arrow('cli', 1415, 510, 1505, 430, LF(4, 0.46), { color: C.green });
    arrow('cli', 1415, 590, 1505, 670, LF(4, 0.74), { color: C.violet, dash: true });

    // ── cuatro decisiones ──
    item('dec', 960, 70, LS(5) - 0.2, g => disp(g, 'Cuatro decisiones por cliente', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    const DEC = [
      { line: 6, x: 500, y: 320, title: '1 · La ruta', chips: [['WhatsApp y local', C.blue, 0.55], ['Correo y oficina', C.green, 0.8]] },
      { line: 7, x: 1420, y: 320, title: '2 · El motor', chips: [['Tus agentes', C.blue, 0.42], ['Dot del cliente', C.green, 0.62], ['Meta gratis', C.orange, 0.85]] },
      { line: 8, x: 500, y: 720, title: '3 · El precio', chips: [['Montaje', C.yellow, 0.36], ['Cuota', C.yellow, 0.55], ['Variable', C.yellow, 0.74]] },
      { line: 9, x: 1420, y: 720, title: '4 · La supervisión', sup: true },
    ];
    R.dec = DEC.map(d => {
      const it = item('dec', d.x, d.y, LS(d.line) - 0.05, g => {
        card(g, 820, 330, { fill: C.card });
        disp(g, d.title, 40, { x: -370, y: -88, anchor: 'start', weight: 700 });
      }, { active: [LS(d.line) - 0.1, LE(d.line) + 0.4] });
      if (d.chips) {
        const n = d.chips.length, gap = n === 3 ? 250 : 340;
        d.chips.forEach(([s, c, f], j) => item('dec', d.x + (j - (n - 1) / 2) * gap, d.y + 40, LF(d.line, f), g => chip(g, s, c, { size: 27, h: 64 })));
      }
      return it;
    });
    // barra de supervisión
    R.sup = item('dec', 1420, 760, LF(9, 0.1), g => {
      E('rect', { x: -340, y: -18, width: 680, height: 36, rx: 18, fill: C.deep, stroke: C.line }, g);
      g._bar = E('rect', { x: -340, y: -18, width: 680, height: 36, rx: 18, fill: C.yellow }, g);
      g._pct = disp(g, '100 %', 62, { y: -44, weight: 800, fill: C.yellow });
      text(g, 'mensajes que revisas', 22, { y: 66 });
    });

    // ── portero ──
    item('por', 960, 120, LS(10) - 0.2, g => disp(g, 'El portero', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    item('por', 960, 520, LF(10, 0.05), g => {
      E('rect', { x: -70, y: -230, width: 140, height: 460, rx: 22, fill: '#1a1726', stroke: C.violet, 'stroke-width': 3 }, g);
      text(g, 'PORTERO', 22, { y: 260, fill: C.violet, weight: 700 });
    });
    [['Aviso de IA', 0.42], ['Horario 9–21 h', 0.68], ['Opción de baja', 0.86]].forEach(([s, f], j) =>
      item('por', 960, 230 + j * 0 - 0, LF(10, f), g => { const gg = E('g', { transform: `translate(${[-420, 0, 420][j]},${0})` }, g); chip(gg, '✓ ' + s, C.green, { size: 26, h: 60 }); }));
    R.msg = item('por', 0, 520, LF(10, 0.12), g => {
      E('rect', { x: -190, y: -60, width: 380, height: 120, rx: 26, fill: '#2a2638', stroke: C.blue, 'stroke-width': 2 }, g);
      text(g, 'Hola Ana, ¿te guardo', 24, { y: -6, fill: C.ink }); text(g, 'sitio el jueves?', 24, { y: 26, fill: C.ink });
      g._tag = E('g', { opacity: 0, transform: 'translate(0,-92)' }, g); chip(g._tag, 'Asistente IA de tu estudio', C.violet, { size: 20, h: 40 });
    }, { kind: 'msg' });

    // ── Dots: qué es ──
    item('dot', 960, 110, LS(11) - 0.2, g => disp(g, 'Un Dot', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    R.dotB = item('dot', 960, 470, LF(11, 0.05), g => blob(g, 140, C.green), { kind: 'hop' });
    item('dot', 960, 250, LF(11, 0.45), g => chip(g, 'Dentro de ChatGPT', C.green, { size: 26, h: 58 }));
    item('dot', 1460, 450, LF(11, 0.75), g => {
      E('rect', { x: -120, y: -80, width: 240, height: 150, rx: 16, fill: C.card, stroke: C.green, 'stroke-width': 3 }, g);
      E('rect', { x: -40, y: 70, width: 80, height: 24, rx: 6, fill: C.line }, g);
      E('path', { d: 'M-50,-10 a26,26 0 0 1 40,-26 a32,32 0 0 1 58,14 a22,22 0 0 1 2,44 h-96 a20,20 0 0 1 -4,-32 z', fill: C.green, opacity: 0.85 }, g);
      text(g, 'su propio ordenador', 22, { y: 136 }); text(g, 'en la nube', 22, { y: 164 });
    });
    arrow('dot', 1110, 460, 1330, 450, LF(11, 0.72), { color: C.green });
    const APPS = ['Correo', 'Calendario', 'Facturas', 'Drive', 'Slack', '+ 4.000'];
    APPS.forEach((s, j) => {
      const x = 360 + j * 240;
      item('dot', x, 830, LF(12, 0.3 + j * 0.09), g => card(g, 200, 90, { title: s, size: 28, color: j === 5 ? C.green : C.line }));
      arrow('dot', 960 + (x - 960) * 0.25, 620, x, 782, LF(12, 0.27 + j * 0.09), { color: C.line, w: 2, dur: 0.3 });
    });
    item('dot', 340, 360, LF(13, 0.25), g => card(g, 330, 120, { title: 'Factura vencida', sub: 'hace 12 días', color: C.red, size: 28 }));
    item('dot', 340, 560, LF(13, 0.78), g => card(g, 330, 120, { title: 'Borrador listo', sub: 'para que lo apruebes', color: C.yellow, size: 28 }));
    arrow('dot', 510, 380, 815, 430, LF(13, 0.3), { color: C.red, dash: true });
    arrow('dot', 815, 520, 510, 560, LF(13, 0.74), { color: C.yellow });
    item('dot', 1460, 230, LF(13, 0.45), g => chip(g, 'Segundo plano · solo lectura', C.violet, { size: 22, h: 50 }));

    // ── Dots: reglas y tareas ──
    item('reg', 960, 100, LS(14) - 0.2, g => disp(g, 'Las reglas las pones tú', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    const COLS = [['Lo hace solo', C.green, ['Leer todo', 'Redactar borradores'], 0.36],
      ['Con tu permiso', C.yellow, ['Enviar un correo', 'Mandar una factura'], 0.6],
      ['Nunca', C.red, ['Hacer reembolsos', 'Borrar datos'], 0.84]];
    COLS.forEach(([h, c, cs, f], j) => {
      const x = 400 + j * 560;
      item('reg', x, 250, LF(14, f), g => { card(g, 460, 86, { title: h, size: 34, color: c, fill: '#1a1726' }); });
      cs.forEach((s, k) => item('reg', x, 360 + k * 84, LF(14, f) + 0.25 + k * 0.15, g => chip(g, s, c, { size: 25, h: 60, fillA: 0.1 })));
    });
    item('reg', 470, 780, LF(15, 0.1), g => {
      card(g, 420, 190, { fill: '#1a1726', color: C.green });
      E('circle', { cx: -120, cy: 0, r: 52, fill: 'none', stroke: C.green, 'stroke-width': 6 }, g);
      g._hand = E('path', { d: 'M-120,0 L-120,-34 M-120,0 L-96,10', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      disp(g, 'Cada mañana', 32, { x: 40, y: -6 }); text(g, 'tareas fijas, 9:00', 22, { x: 40, y: 28 });
    });
    item('reg', 1160, 735, LF(15, 0.48), g => chip(g, 'Reclamar facturas vencidas', C.green, { size: 26, h: 62 }));
    item('reg', 1210, 835, LF(15, 0.74), g => chip(g, 'Seguir presupuestos sin respuesta', C.green, { size: 26, h: 62 }));

    // ── implementación: el paquete ──
    item('pkg', 960, 100, LS(16) - 0.2, g => disp(g, 'Tu implementación cabe en una carpeta', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    item('pkg', 640, 470, LF(16, 0.35), g => {
      E('path', { d: 'M-170,-110 h120 l30,30 h190 v210 h-340 z', fill: C.yellow, opacity: 0.9 }, g);
      E('rect', { x: -170, y: -70, width: 340, height: 200, rx: 8, fill: '#e2b23e' }, g);
      disp(g, 'Paquete de', 28, { y: 20, fill: '#15131c', weight: 700 }); disp(g, 'puesta en marcha', 28, { y: 56, fill: '#15131c', weight: 700 });
    }, { kind: 'hop' });
    item('pkg', 200, 470, LF(17, 0.05), g => card(g, 240, 140, { title: 'Formulario', sub: 'lo rellena el cliente', size: 28, color: C.yellow }));
    arrow('pkg', 325, 470, 460, 470, LF(17, 0.2), { color: C.yellow });
    [['Ficha del negocio', 0.5], ['Sus normas', 0.68], ['Sus permisos', 0.86]].forEach(([s, f], j) => {
      item('pkg', 1080, 300 + j * 130, LF(17, f), g => card(g, 330, 100, { title: s, size: 28, color: C.line, fill: C.card }));
      arrow('pkg', 815, 440, 905, 300 + j * 130, LF(17, f) - 0.1, { color: C.line, w: 2 });
    });
    item('pkg', 1080, 690, LF(18, 0.86), g => card(g, 330, 100, { title: 'Pega esto primero', size: 28, color: C.yellow }));
    item('pkg', 1600, 190, LF(18, 0.05), g => text(g, 'LO QUE HACE EL CLIENTE', 22, { weight: 700, fill: C.mute }));
    [['1', 'Crea su Dot', 0.35], ['2', 'Conecta sus cuentas', 0.55], ['3', 'Pega el primer mensaje', 0.82]].forEach(([n, s, f], j) =>
      item('pkg', 1600, 300 + j * 160, LF(18, f), g => {
        card(g, 400, 120, { title: n + ' · ' + s, size: 28, color: C.green, align: 'start' });
        E('circle', { cx: -158, cy: -2, r: 0, fill: C.green }, g);
      }));
    arrow('pkg', 1250, 690, 1395, 640, LF(18, 0.9), { color: C.yellow });

    // ── revisión ──
    item('rev', 960, 100, LS(19) - 0.2, g => disp(g, 'La revisión mensual', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    R.draft = item('rev', 560, 450, LF(19, 0.05), g => {
      card(g, 640, 360, { fill: '#221f2e', color: C.line });
      text(g, 'BORRADOR · recordatorio de pago', 21, { x: -280, y: -128, anchor: 'start', weight: 700 });
      ['Hola, te escribimos de Reformas Ejemplo:', 'la factura 214 venció hace 12 días.', 'Si ya la has pagado, dinos la fecha.'].forEach((s, k) =>
        text(g, s, 24, { x: -280, y: -66 + k * 40, anchor: 'start', fill: C.ink }));
      const a = E('g', { transform: 'translate(-170,118)' }, g); chip(a, 'Aprobar', C.green, { size: 24, h: 56 });
      const b = E('g', { transform: 'translate(10,118)' }, g); chip(b, 'Editar', C.mute, { size: 24, h: 56, fillA: 0.08 });
      g._edit = E('rect', { x: -60, y: 90, width: 140, height: 56, rx: 28, fill: 'none', stroke: C.yellow, 'stroke-width': 4, opacity: 0 }, g);
    });
    item('rev', 560, 760, LF(19, 0.78), g => chip(g, 'Norma ajustada: mensajes más cortos', C.yellow, { size: 25, h: 62 }));
    item('rev', 1420, 380, LF(20, 0.15), g => {
      card(g, 560, 170, { fill: '#2a2414', color: C.yellow });
      disp(g, 'Revisión mensual', 38, { y: -10, weight: 700 }); disp(g, '= tu cuota', 34, { y: 40, fill: C.yellow, weight: 700 });
    }, { kind: 'hop' });
    item('rev', 1420, 680, LF(21, 0.2), g => {
      card(g, 560, 230, { fill: C.card, color: C.green });
      text(g, 'DOTS EN ESPAÑA', 21, { y: -66, weight: 700 });
      disp(g, 'Business Premium', 36, { y: -16, weight: 700 });
    });
    item('rev', 1420, 712, LF(21, 0.55), g => disp(g, '100–125 $/mes', 44, { fill: C.green, weight: 800, y: 16 }));
    item('rev', 1420, 770, LF(21, 0.86), g => text(g, 'lo paga el cliente, a su nombre', 22, { fill: C.ink }));

    // ── lo tuyo ──
    item('tuyo', 960, 100, LS(22) - 0.2, g => disp(g, 'Lo que es tuyo', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    const BASE = [['Carta de agentes', C.yellow], ['Plantillas', C.violet], ['Portero', C.violet], ['Fichas por sector', C.violet]];
    BASE.forEach(([s, c], j) => item('tuyo', 330 + j * 420, 800, LF(22, 0.32 + j * 0.17), g => card(g, 380, 130, { title: s, size: 30, color: c, fill: '#1a1726' }), { kind: 'hop' }));
    R.custom = item('tuyo', 520, 360, LF(23, 0.02), g => card(g, 320, 120, { title: 'Agente a medida', sub: 'lo piden 2–3 clientes', size: 28, color: C.violet, dash: true }), { kind: 'custom' });
    item('tuyo', 1380, 270, LF(23, 0.55), g => text(g, 'HORAS DE MONTAJE POR CLIENTE', 22, { weight: 700 }));
    [[8, 'cliente 1'], [5, '5'], [3, '10'], [2, '15'], [0.8, '20']].forEach(([h, lab], j) =>
      item('tuyo', 1150 + j * 115, 560, LF(23, 0.6 + j * 0.07), g => {
        const H = h * 28;
        E('rect', { x: -38, y: -H, width: 76, height: H, rx: 8, fill: j === 4 ? C.green : C.line }, g);
        text(g, lab, 20, { y: 34 }); disp(g, h < 1 ? '< 1 h' : h + ' h', 24, { y: -H - 14, weight: 700 });
      }, { kind: 'bar' }));

    // ── rutas ──
    item('rut', 500, 330, LF(24, 0.05), g => {
      card(g, 760, 360, { fill: '#14213a', color: C.blue });
      text(g, 'CARA AL PÚBLICO', 22, { y: -128, weight: 700, fill: C.blue });
      const a = E('g', { transform: 'translate(-110,0)' }, g); blob(a, 60, C.blue);
      const b = E('g', { transform: 'translate(40,20)' }, g); blob(b, 46, C.red);
      const c = E('g', { transform: 'translate(170,-20)' }, g); blob(c, 50, C.green);
      text(g, 'tus agentes en WhatsApp, con el portero', 23, { y: 136, fill: C.ink });
    });
    item('rut', 1420, 330, LF(24, 0.58), g => {
      card(g, 760, 360, { fill: '#12291f', color: C.green });
      text(g, 'TRASTIENDA DEL DUEÑO', 22, { y: -128, weight: 700, fill: C.green });
      const a = E('g', { transform: 'translate(0,-6)' }, g); blob(a, 74, C.green);
      text(g, 'el Dot del cliente: correo, facturas, agenda', 23, { y: 136, fill: C.ink });
    });
    item('rut', 960, 700, LF(25, 0.08), g => {
      card(g, 640, 170, { fill: '#2a2414', color: C.yellow });
      const a = E('g', { transform: 'translate(-220,0)' }, g); blob(a, 50, C.green, { glasses: true });
      disp(g, 'Tu propio Dot', 34, { x: -150, y: -14, anchor: 'start', weight: 700 });
      text(g, 'busca clientes y prepara diagnósticos', 22, { x: -150, y: 26, anchor: 'start', fill: C.ink });
    }, { kind: 'hop' });

    // ── fases ──
    item('fas', 960, 200, LS(26) - 0.2, g => disp(g, 'Tres fases', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    [['1', 'Servicio', 'ahora · montas tú', 0.4, C.yellow], ['2', 'Producto con servicio', 'el paquete monta casi todo', 0.62, C.line], ['3', 'Autoservicio', 'el cliente lo hace solo', 0.86, C.line]].forEach(([n, s, sub, f, c], j) => {
      item('fas', 380 + j * 580, 540, LF(26, f), g => {
        card(g, 500, 220, { fill: j === 0 ? '#2a2414' : C.card, color: c });
        disp(g, n, 64, { y: -30, weight: 800, fill: j === 0 ? C.yellow : C.mute }); disp(g, s, 32, { y: 30, weight: 700 }); text(g, sub, 22, { y: 70 });
      });
      if (j) arrow('fas', 380 + (j - 1) * 580 + 260, 540, 380 + j * 580 - 260, 540, LF(26, f) - 0.1, { color: C.mute });
    });

    // ── pilotos ──
    item('pil', 960, 130, LS(27) - 0.2, g => disp(g, 'Tres pilotos', 46, { weight: 700, y: 16 }), { kind: 'rise' });
    [['El estudio', 'de un conocido', C.yellow, 0.2], ['Tu Dot', 'con un negocio inventado', C.green, 0.42], ['Auditoría', 'de 10 negocios de tu ciudad', C.blue, 0.7]].forEach(([a, b, c, f], j) =>
      item('pil', 400 + j * 560, 500, LF(27, f), g => {
        card(g, 480, 300, { fill: C.card, color: c });
        disp(g, String(j + 1), 70, { y: -50, weight: 800, fill: c }); disp(g, a, 38, { y: 22, weight: 700 }); text(g, b, 24, { y: 64, fill: C.ink });
      }, { kind: 'hop' }));

    // ── final ──
    item('fin', 960, 400, LS(28) - 0.1, g => {
      disp(g, 'Native Crew', 150, { weight: 800, y: 50 });
      E('circle', { cx: 498, cy: 8, r: 20, fill: C.yellow }, g);
    }, { kind: 'rise' });
    [[C.blue, 690, 44], [C.red, 830, 32], [C.yellow, 960, 60], [C.green, 1100, 40], [C.violet, 1230, 36]].forEach(([c, x, r], i) =>
      item('fin', x, 640, LS(28) + 0.3 + i * 0.1, g => blob(g, r, c), { kind: 'hop' }));
    item('fin', 960, 820, LF(28, 0.45), g => text(g, 'Tu equipo, montado y supervisado por una persona.', 36, { fill: C.ink, weight: 600 }), { kind: 'rise' });

    // ── pantalla: cabecera, capítulos y subtítulos ──
    const H = $('hud2');
    R.head = E('g', {}, H);
    E('circle', { cx: 60, cy: 54, r: 8, fill: C.yellow }, R.head);
    text(R.head, 'Native Crew · cómo funciona', 22, { x: 80, y: 62, anchor: 'start', fill: C.mute, weight: 600 });
    R.headCh = text(R.head, '', 22, { x: 1860, y: 62, anchor: 'end', fill: C.mute, weight: 600 });
    R.chap = E('g', { opacity: 0 }, H);
    E('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: C.ground, opacity: 0.94 }, R.chap);
    R.chN = disp(R.chap, '', 200, { x: 960, y: 500, weight: 800, fill: C.yellow });
    R.chT = disp(R.chap, '', 76, { x: 960, y: 620, weight: 700 });
    R.sub = E('g', {}, H);
    R.subBg = E('rect', { x: 0, y: 0, width: 10, height: 64, rx: 14, fill: '#0b0a10', opacity: 0.82 }, R.sub);
    R.subT = text(R.sub, '', 34, { x: 960, y: 1004, fill: C.ink, weight: 500 });
    KEYS = camKeys();
  }

  // ───────────────────────────── animación ─────────────────────────────
  function place(it, t) {
    const g = it.g;
    if (t < it.t - 0.01) { op(g, 0); return; }
    let x = it.x, y = it.y, s = 1, o = 1;
    if (it.kind === 'hop') {
      const k = OM.spring(t - it.t, 0.5, 15); const im = OM.impact(t, it.t + 0.22, { sqx: 0.1, sqy: 0.12 });
      y += (1 - k) * 120; o = clamp((t - it.t) * 6, 0, 1); s = 1;
      S(g, 'transform', `translate(${f1(x)},${f1(y)}) scale(${f3(im.sx || 1)},${f3(im.sy || 1)})`); op(g, o); return;
    }
    if (it.kind === 'rise') { const w = OM.wordRise(t, it.t); y += w.y; s = w.s; o = w.op; }
    else if (it.kind === 'bar') { const k = OM.spring(t - it.t, 0.55, 16); S(g, 'transform', `translate(${f1(x)},${f1(y)}) scale(1,${f3(Math.max(0.001, k))})`); op(g, clamp((t - it.t) * 5, 0, 1)); return; }
    else if (it.kind === 'msg') {
      const a = it.t, b = LF(10, 0.95), k = ease.cubicInOut(seg(t, a, b)), [ox] = ST.por;
      x = ox + lerp(260, 1660, k); o = clamp((t - a) * 5, 0, 1);
      op(g._tag, seg(x, ox + 1000, ox + 1080));
      S(g, 'transform', `translate(${f1(x)},${f1(y)})`); op(g, o); return;
    } else if (it.kind === 'custom') {
      const p = OM.popIn(t, it.t); const [ox, oy] = ST.tuyo;
      const h = OM.hop(t, LF(23, 0.32), LF(23, 0.52), { x: it.x, y: it.y }, { x: ox + 330, y: oy + 690 }, { height: 140 });
      const sc = lerp(1, 0.55, seg(t, LF(23, 0.32), LF(23, 0.52)));
      const fade = 1 - seg(t, LF(23, 0.5), LF(23, 0.56));
      S(g, 'transform', `translate(${f1(h.x)},${f1(h.y + p.dy)}) scale(${f3(p.s * sc)})`); op(g, p.op * fade); return;
    } else { const p = OM.popIn(t, it.t); y += p.dy; s = p.s; o = p.op; }
    if (it.active) { // resalta la tarjeta de la frase en curso
      const on = t >= it.active[0] && t <= it.active[1];
      const anyOn = R.dec && R.dec.some(d => t >= d.active[0] && t <= d.active[1]);
      o *= on || !anyOn ? 1 : 0.5;
      if (g.firstChild) S(g.firstChild, 'stroke', on ? C.yellow : C.line);
    }
    S(g, 'transform', `translate(${f1(x)},${f1(y)}) scale(${f3(s)})`); op(g, o);
  }
  function arrows(t) {
    ARROWS.forEach(a => {
      if (!a.len) a.len = a.p.getTotalLength();
      if (t < a.t) { S(a.p, 'opacity', 0); return; }
      const k = ease.cubicOut(seg(t, a.t, a.t + a.dur));
      S(a.p, 'stroke-dasharray', a.dash ? '10 10' : `${f1(a.len)} ${f1(a.len)}`);
      S(a.p, 'stroke-dashoffset', a.dash ? f1(-(t - a.t) * 30) : f1(a.len * (1 - k)));
      S(a.p, 'opacity', f3(a.dash ? 0.9 * k : 0.9));
    });
  }
  function special(t) {
    // barra de supervisión: 100 % → 30 % → 10 %
    if (R.sup) {
      const g = R.sup.g, k1 = ease.cubicInOut(seg(t, LF(9, 0.5), LF(9, 0.62))), k2 = ease.cubicInOut(seg(t, LF(9, 0.82), LF(9, 0.92)));
      const pct = 100 - 70 * k1 - 20 * k2;
      S(g._bar, 'width', f1(680 * pct / 100)); g._pct.textContent = Math.round(pct) + ' %';
    }
    // el Dot mira a los lados mientras revisa en segundo plano
    if (R.dotB && R.dotB.g._eyes) { const look = Math.sin(clamp((t - LS(13)) / 1.2, 0, 99) * 2.2) * (t > LS(13) && t < LE(13) ? 14 : 0); S(R.dotB.g._eyes, 'transform', `translate(${f1(look)},0)`); }
    // botón Editar del borrador
    if (R.draft) { const k = seg(t, LF(19, 0.45), LF(19, 0.5)) * (1 - seg(t, LF(19, 0.85), LF(19, 0.95))); op(R.draft.g._edit, k); }
  }
  function hud(t) {
    let cur = null; CH.forEach(c => { if (t >= chT(c)[0]) cur = c; });
    R.headCh.textContent = cur ? `${cur.n} · ${cur.t}` : '';
    let o = 0, c0 = null;
    CH.forEach(c => { const [a, b] = chT(c); if (t >= a && t <= b) { c0 = c; o = Math.min(seg(t, a, a + 0.3), 1 - seg(t, b - 0.35, b)); } });
    op(R.chap, o);
    if (c0) {
      R.chN.textContent = c0.n; R.chT.textContent = c0.t;
      const w = OM.wordRise(t, chT(c0)[0] + 0.05); S(R.chT, 'transform', `translate(0,${f1(w.y)})`);
    }
    op(R.head, 1 - seg(t, LS(28) - 0.5, LS(28)) + 0 * (t < 1 ? 0 : 0));
    const s = P.subs.find(x => t >= x[0] && t < x[1] + 0.15);
    if (s && o < 0.5 && t < LS(28) - 0.1) {
      R.subT.textContent = s[2];
      const w = R.subT.getComputedTextLength() + 56;
      S(R.subBg, 'x', f1(960 - w / 2)); S(R.subBg, 'y', 960); S(R.subBg, 'width', f1(w));
      op(R.sub, Math.min(seg(t, s[0], s[0] + 0.12), 1));
    } else op(R.sub, 0);
  }
  function seek(t) {
    const cam = OM.camera(t, KEYS);
    S($('world'), 'transform', `matrix(${OM.view(cam).map(v => v.toFixed(4)).join(',')})`);
    S($('lattice'), 'transform', `matrix(${OM.view(cam, { depth: 1.2 }).map(v => v.toFixed(4)).join(',')})`);
    ITEMS.forEach(it => place(it, t)); arrows(t); special(t); hud(t);
    const h = $('hud'); if (h) h.textContent = 't=' + t.toFixed(2);
    return Promise.resolve();
  }

  // ───────────────────────────── sonido ─────────────────────────────
  function events() {
    const ev = [], add = (t, kind, v = 1, extra = {}) => ev.push(Object.assign({ t: +t.toFixed(3), kind, pan: 0, v }, extra));
    ITEMS.forEach(it => { if (it.t > 0.2) add(it.t, it.kind === 'hop' ? 'thud' : it.kind === 'rise' ? 'word' : 'pop', 0.5); });
    CH.forEach(c => add(chT(c)[0], 'whoosh', 0.8));
    STAGE_AT.slice(1).forEach(([s, line]) => add(LS(line) - 1.3, 'swish', 0.5));
    add(LS(28), 'land', 1);
    const vo = L.map(l => [l.t0, l.t0 + l.dur]);
    return { dur: DUR, events: ev.sort((a, b) => a.t - b.t), vo, gaps: CH.map(chT), end0: LS(28) };
  }

  window.__meta = { dur: DUR, fps: 30, w: 1920, h: 1080, cuts: CH.map(c => chT(c)[0]) };
  window.__events = events;
  window.__seek = async t => { await seek(t); return true; };
  window.__ready = LOOK.ready.then(() => { build(); return seek(0); });
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.__ready.then(() => seek(parseFloat(q.get('t'))));
  if (q.has('hud')) window.__ready.then(() => { $('hud').style.display = 'block'; });
})();
