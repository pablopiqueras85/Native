#!/usr/bin/env python3
# onetake · © 2026 Patrick (github.com/feitangyuan) · PolyForm Noncommercial 1.0.0 · lineage otk-7f3e1c
"""Banda sonora de "Así trabaja tu equipo": la paleta de onetake, una voz por agente y la música de los otros vídeos.

  python3 agentes_score.py agentes.html agentes.wav
"""
import asyncio, sys, wave
import numpy as np

sys.path.insert(0, "/home/user/feitangyuan/onetake/scripts")
from sfx_palette import SR, Score, air, glass, wood, sub, bubble, hp  # noqa: E402
from score import dump_events, music, NOTE  # noqa: E402

rng = np.random.default_rng(11)


def voice(dur, pitch):
    """Balbuceo de dibujo animado: sílabas cortas, redondas, con la altura del personaje."""
    out = np.zeros(int((dur + 0.3) * SR)); t = 0.0
    while t < dur:
        f = 330 * pitch * (1 + rng.uniform(-0.18, 0.22))
        a, g = bubble(f, rng.uniform(0.07, 0.11)) * 0.9, glass(f * 2, 0.08, 0.3) * 0.15
        syl = np.zeros(max(len(a), len(g))); syl[:len(a)] += a; syl[:len(g)] += g
        i = int(t * SR); out[i:i + len(syl)] += syl[: len(out) - i]
        t += rng.uniform(0.075, 0.11)
    return out


def sfx(ev, dur):
    s = Score(dur=dur, T60=0.9)
    for e in ev:
        t, k, pan, v = e["t"], e["kind"], e["pan"] * 0.6, e["v"]
        if k == "spark":
            s.place(glass(1760, 0.6, 1.0), t, gain=0.14, send=0.3)
        elif k == "pop":
            s.place(bubble(520, 0.24), t, gain=0.4 * v, pan=pan, send=0.35)
            s.place(sub(90, 0.3), t, gain=0.25, send=0.2)
        elif k == "thud":
            s.place(sub(70 * e.get("voice", 1), 0.4), t, gain=0.45 * v, pan=pan, send=0.25)
            s.place(bubble(300 * e.get("voice", 1), 0.2), t, gain=0.3 * v, pan=pan, send=0.3)
        elif k == "hop":
            s.place(air(0.35, 400, 2200, 1.4, 0.4), t, gain=0.25 * v, pan=pan, send=0.35)
        elif k == "talk":
            s.place(voice(e["dur"], e["voice"]), t, gain=0.33, pan=pan, send=0.3)
        elif k == "zip":
            s.place(air(0.3, 900, 3600, 2.2, 0.3), t, gain=0.22 * v, pan=pan, pan_to=e.get("to", 0) * 0.6, send=0.35)
        elif k == "msg":
            s.place(glass(1318.5 if v < 0.7 else 1046.5, 0.5, 0.7), t, gain=0.13, pan=pan, send=0.4)
            s.place(bubble(680, 0.16), t, gain=0.2, pan=pan, send=0.25)
        elif k == "whoosh":
            s.place(air(0.55, 260, 2600, 1.3, 0.45), t, gain=0.38 * v, pan=pan, pan_to=e.get("to", 0) * 0.6, send=0.45)
        elif k == "catch":
            s.place(wood(260, 0.1), t, gain=0.35 * v, pan=pan, send=0.2)
            s.place(bubble(440, 0.18), t + 0.01, gain=0.25 * v, pan=pan, send=0.25)
        elif k == "click":
            s.place(wood(1100, 0.05), t, gain=0.3, pan=pan, send=0.15)
            s.place(wood(900, 0.05), t + 0.06, gain=0.22, pan=pan, send=0.15)
        elif k == "chord":
            for i, f in enumerate([880.0, 1108.73, 1318.5]):
                s.place(glass(f, 0.8, 0.9), t + 0.02 * i, gain=0.16, pan=pan, send=0.35)
            s.place(sub(70, 0.4), t, gain=0.35, send=0.15)
        elif k == "rise":
            s.place(air(e["dur"], 200, 3000, 1.2, 0.9), t, gain=0.25, send=0.45)
        elif k == "note":
            s.place(glass(NOTE[e["n"] % len(NOTE)], 1.0, 0.9), t, gain=0.2 * v, pan=pan, send=0.5)
        elif k == "word":
            s.place(glass(880, 0.7, 0.5), t, gain=0.07 * v, send=0.5)
        elif k == "land":
            s.place(sub(46, 1.0), t, gain=0.9, send=0.25)
            for i, f in enumerate([440.0, 554.37, 659.25, 880.0]):
                s.place(glass(f, 1.1, 0.8), t + 0.015 * i, gain=0.14, send=0.3)
    return s.mix(peak_db=-6.0)


def main(comp, out):
    data = asyncio.run(dump_events(comp))
    dur = data["dur"]
    fx = sfx(data["events"], dur)
    mu = music(data, dur)[: len(fx)] * 10 ** (-19 / 20)
    n = len(mu); t = np.arange(n) / SR; gate = np.ones(n)
    for a, b in data["holds"] + [[0, 1.1], [data["end0"] - 0.4, 99]]:
        gate = np.minimum(gate, 1 - np.clip((t - a + 0.3) / 0.3, 0, 1) * np.clip((b - t) / 0.3 + (b >= 99) * 9, 0, 1))
    mu *= gate[:, None]
    mix = fx + mu
    mix = np.stack([hp(mix[:, c], 30) for c in (0, 1)], 1)
    mix = np.tanh(mix / np.abs(mix).max() * 1.1) / np.tanh(1.1) * 10 ** (-4.5 / 20)
    fr = int(SR / 12); m = mix[: len(mix) // fr * fr].reshape(-1, fr, 2)
    rms = np.sqrt((m ** 2).mean(axis=(1, 2))); print(f"silencio (< -40 dBFS): {(20 * np.log10(rms + 1e-9) < -40).mean():.3f}")
    with wave.open(out, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
    print(f"{out}: {len(data['events'])} eventos, {dur} s")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
