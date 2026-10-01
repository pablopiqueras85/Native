#!/usr/bin/env python3
# onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
"""Banda sonora del vídeo explicativo: voz en off + efectos de la paleta de onetake + colchón solo en los capítulos.

  python3 explicativo_score.py explicativo.html vo/vo.wav explicativo.wav
"""
import asyncio, sys, wave
import numpy as np
sys.path.insert(0, "/home/user/feitangyuan/onetake/scripts")
sys.path.insert(0, "/home/user/Native/marca/videos/fuentes/native-crew")
from sfx_palette import SR, Score, air, glass, wood, sub, bubble, hp, lp  # noqa: E402
from score import dump_events  # noqa: E402


def read_wav(p):
    with wave.open(p) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16 if w.getsampwidth() == 2 else np.int32).astype(np.float64)
        x /= 32768 if w.getsampwidth() == 2 else 2 ** 31
        if w.getnchannels() == 2: x = x.reshape(-1, 2).mean(1)
    return x


def sfx(ev, dur):
    s = Score(dur=dur, T60=0.8)
    for e in ev:
        t, k, v = e["t"], e["kind"], e["v"]
        if k == "pop": s.place(bubble(560, 0.16), t, gain=0.16 * v, send=0.25)
        elif k == "thud": s.place(sub(80, 0.3), t, gain=0.22 * v, send=0.2); s.place(bubble(330, 0.16), t, gain=0.14 * v, send=0.25)
        elif k == "word": s.place(glass(880, 0.5, 0.5), t, gain=0.05 * v, send=0.4)
        elif k == "whoosh": s.place(air(0.6, 240, 2600, 1.3, 0.45), t, gain=0.3 * v, send=0.45)
        elif k == "swish": s.place(air(0.45, 400, 2200, 1.6, 0.4), t, gain=0.12 * v, send=0.35)
        elif k == "land":
            s.place(sub(46, 1.0), t, gain=0.6, send=0.3)
            for i, f in enumerate([440.0, 554.37, 659.25, 880.0]): s.place(glass(f, 1.6, 0.8), t + 0.015 * i, gain=0.1, send=0.5)
    return s.mix(peak_db=-6.0)[:, 0]


def pad(dur, spans):
    n = int(dur * SR); t = np.arange(n) / SR; out = np.zeros(n)
    chord = [220.0, 277.18, 329.63, 440.0]
    for a, b in spans:
        i0, i1 = int(max(a, 0) * SR), min(n, int(b * SR)); tt = np.arange(i1 - i0) / SR; L = (i1 - i0) / SR
        env = np.minimum(1, tt / 0.35) * np.clip((L - tt) / 0.5, 0, 1)
        for f in chord:
            for det in (-0.003, 0.003):
                out[i0:i1] += env * np.sin(2 * np.pi * f * (1 + det) * tt) * 0.08
    return lp(out, 1500)


def main(comp, vo_p, out):
    data = asyncio.run(dump_events(comp)); dur = data["dur"]; n = int(dur * SR)
    vo = np.zeros(n); x = read_wav(vo_p)[:n]; vo[:len(x)] = x
    vo = hp(vo, 70); vo = vo / (np.abs(vo).max() + 1e-9) * 10 ** (-4 / 20)
    fx = sfx(data["events"], dur)[:n]; fx = np.pad(fx, (0, n - len(fx)))
    spans = [[0, 2.0]] + [[a - 0.1, b + 0.2] for a, b in data["gaps"]] + [[data["end0"] - 0.2, dur]]
    mu = pad(dur, spans); mu = mu / (np.abs(mu).max() + 1e-9) * 10 ** (-20 / 20)
    mix = vo + fx * 10 ** (-12 / 20) + mu
    mix = mix / np.abs(mix).max() * 10 ** (-3.5 / 20)
    st = np.stack([mix, np.roll(mix, int(0.004 * SR))], 1)
    fr = int(SR / 12); m = mix[: len(mix) // fr * fr].reshape(-1, fr)
    rms = np.sqrt((m ** 2).mean(1)); print(f"silencio (< -40 dBFS): {(20 * np.log10(rms + 1e-9) < -40).mean():.3f}")
    with wave.open(out, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
    print(out, len(data["events"]), "eventos", dur, "s")


if __name__ == "__main__":
    main(*sys.argv[1:4])
