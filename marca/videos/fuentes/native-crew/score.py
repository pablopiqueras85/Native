#!/usr/bin/env python3
# onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
"""Banda sonora de Native Crew: efectos de la paleta de onetake + música sintetizada (sin derechos de terceros).

  python3 score.py presentacion.html presentacion.wav
  python3 score.py pitch.html pitch.wav

Lee los eventos del propio vídeo (window.__events()), así un cambio de tiempos arrastra su sonido.
"""
import asyncio, json, pathlib, sys, wave
import numpy as np
from scipy import signal

sys.path.insert(0, "/home/user/feitangyuan/onetake/scripts")
from sfx_palette import SR, Score, air, glass, wood, sub, bubble, lp, hp  # noqa: E402


async def dump_events(comp):
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        await pg.goto(pathlib.Path(comp).resolve().as_uri())
        await pg.evaluate("window.__ready")
        data = await pg.evaluate("window.__events()")
        await b.close()
    return data


# la mayor: notas para el cliente que avanza y los acordes
NOTE = [554.37, 659.25, 739.99, 880.0, 987.77, 1108.73]
CHORD_END = [440.0, 554.37, 659.25, 880.0]


def drone(dur, f0=46, f1=64):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f0 * (f1 / f0) ** (t / dur); ph = 2 * np.pi * np.cumsum(f) / SR
    env = (t / dur) ** 1.8
    return (np.sin(ph) + 0.35 * np.sin(2 * ph)) * env * 0.8


def sfx(ev, dur):
    s = Score(dur=dur, T60=1.4)
    for e in ev:
        t, k, pan, v = e["t"], e["kind"], e["pan"] * 0.6, e["v"]
        if k == "tick":
            s.place(wood(150 + 18 * (int(t * 10) % 6), 0.12), t, gain=0.5 * v, pan=pan, send=0.2)
        elif k == "rise":
            s.place(drone(e["dur"]), t, gain=0.35, send=0.3)
            s.place(air(e["dur"], 150, 3200, 1.1, 0.97), t, gain=0.35, send=0.4)
        elif k == "boom":
            s.place(sub(52, 1.6), t, gain=1.0, send=0.35)
            s.place(air(0.9, 2600, 180, 1.0, 0.08), t, gain=0.55, send=0.5)
        elif k == "logo":
            s.place(glass(1318.5, 1.4, 1.0), t, gain=0.22, pan=pan, send=0.55)
            s.place(bubble(760, 0.2), t, gain=0.25, pan=pan, send=0.3)
        elif k == "word":
            s.place(glass(880, 0.7, 0.5), t, gain=0.07 * v, send=0.5)
        elif k == "whoosh":
            s.place(air(0.5, 280, 2400, 1.3, 0.45), t, gain=0.4 * v, pan=pan, pan_to=e.get("to", 0) * 0.6, send=0.45)
        elif k == "pop":
            s.place(bubble(480 + 80 * (int(t * 7) % 4), 0.22), t, gain=0.28 * v, pan=pan, send=0.3)
        elif k == "click":
            s.place(wood(1100, 0.05), t, gain=0.3, pan=pan, send=0.15)
            s.place(wood(900, 0.05), t + 0.06, gain=0.22, pan=pan, send=0.15)
            s.place(glass(NOTE[e.get("n", 0) % len(NOTE)] * 2, 0.5, 0.6), t + 0.02, gain=0.08, pan=pan, send=0.4)
        elif k == "note":
            s.place(glass(NOTE[e["n"] % len(NOTE)], 1.1, 0.9), t, gain=0.26 * v, pan=pan, send=0.5)
        elif k == "chord":
            for i, f in enumerate([880.0, 1108.73, 1318.5]):
                s.place(glass(f, 1.4, 0.9), t + 0.02 * i, gain=0.16, pan=pan, send=0.55)
            s.place(sub(70, 0.5), t, gain=0.35, send=0.2)
        elif k == "flip":
            s.place(wood(420 + 60 * e.get("n", 0), 0.08), t + 0.2, gain=0.3, send=0.2)
            s.place(air(0.2, 900, 3200, 2.0, 0.3), t, gain=0.18, send=0.3)
        elif k == "bubble":
            s.place(bubble(640, 0.2), t, gain=0.3 * v, pan=pan, send=0.25)
        elif k == "land":
            s.place(sub(46, 1.8), t, gain=0.95, send=0.4)
            for i, f in enumerate(CHORD_END):
                s.place(glass(f, 2.6, 0.8), t + 0.015 * i, gain=0.14, send=0.65)
    return s.mix(peak_db=-6.0)


def music(data, dur):
    """Colchón en La mayor (A–F#m–D–E), arpegio y pulso suave. Entra con la marca, se aparta en los golpes."""
    n = int(dur * SR); t = np.arange(n) / SR; out = np.zeros((n, 2))
    bpm = 104.0; beat = 60 / bpm; bar = 4 * beat
    start, casc, end0 = data["burst"] + 0.35, data["casc0"], data["end0"]
    chords = [[220.0, 277.18, 329.63], [185.0, 220.0, 277.18], [146.83, 220.0, 293.66], [164.81, 207.65, 246.94]]
    # colchón
    pad = np.zeros(n)
    for i in range(int((dur - start) / bar) + 2):
        t0 = start + i * bar
        if t0 >= dur: break
        ch = chords[i % 4] if t0 < end0 + 0.6 else [220.0, 277.18, 329.63]
        a, b = int(t0 * SR), min(n, int((t0 + bar + 0.6) * SR)); tt = np.arange(b - a) / SR
        env = np.minimum(1, tt / 0.5) * np.minimum(1, (bar + 0.6 - tt) / 0.6)
        for f in ch:
            for det in (-0.004, 0, 0.004):
                ph = 2 * np.pi * f * (1 + det) * tt
                pad[a:b] += env * sum(np.sin(k * ph) / k for k in range(1, 7)) * 0.12
    pad = lp(pad, 1300)
    # arpegio desde la cascada
    arp = np.zeros(n); k = 0; tt0 = casc
    while tt0 < min(dur, end0 + 0.6):
        bi = int((tt0 - start) / bar) % 4
        f = chords[bi][k % 3] * (2 if (k // 3) % 2 else 4)
        a = int(tt0 * SR); L = int(0.45 * SR); b = min(n, a + L); tt = np.arange(b - a) / SR
        arp[a:b] += (np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt / 0.13) * 0.18
        tt0 += beat / 2; k += 1
    # pulso
    kick = np.zeros(n); tt0 = casc
    while tt0 < min(dur, end0 + 0.3):
        a = int(tt0 * SR); L = int(0.3 * SR); b = min(n, a + L); tt = np.arange(b - a) / SR
        f = 58 * np.exp(-tt * 18) + 42
        kick[a:b] += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.09) * 0.5
        tt0 += beat
    mono = pad * 0.9 + arp + kick
    # ducking bajo los golpes
    duck = np.ones(n)
    for e in data["events"]:
        if e["kind"] in ("boom", "land", "chord", "note"):
            a = int(e["t"] * SR); L = int(0.7 * SR); b = min(n, a + L); tt = np.arange(b - a) / SR
            duck[a:b] = np.minimum(duck[a:b], 1 - 0.55 * np.exp(-tt / 0.25))
    mono *= duck
    # final: silencio limpio
    fade_end = end0 + 2.6
    mono *= np.clip((fade_end - t) / 1.6, 0, 1)
    mono *= np.clip((t - start) / 0.4, 0, 1)
    wide = np.stack([mono, np.roll(mono, int(0.011 * SR))], 1)
    return wide / (np.abs(wide).max() + 1e-9)


def main(comp, out):
    data = asyncio.run(dump_events(comp))
    dur = data["dur"]
    fx = sfx(data["events"], dur)
    mu = music(data, dur)[: len(fx)] * 10 ** (-17 / 20)
    mix = fx + mu
    mix = np.stack([hp(mix[:, c], 30) for c in (0, 1)], 1)
    mix = np.tanh(mix / np.abs(mix).max() * 1.1) / np.tanh(1.1) * 10 ** (-4.5 / 20)
    with wave.open(out, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
    print(f"{out}: {len(data['events'])} eventos, {dur} s")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
