"""Música de fondo del vídeo «Tu equipo en tu móvil» (31 s), compuesta aquí: sin licencias de terceros.

Pad cálido + arpegio suave + pulso discreto, en Fa mayor, a 92 BPM. Los cambios siguen los momentos del vídeo:
entra el pulso cuando llega el primer mensaje y todo se resuelve en el cierre (24,6 s).
Uso: python3 musica.py  ->  assets/audio/musica.wav  (necesita numpy y soundfile)
"""
import numpy as np
import soundfile as sf

SR = 48000
DUR = 31.0
BPM = 92
BEAT = 60 / BPM
N = int(SR * DUR)
t_all = np.arange(N) / SR
rng = np.random.default_rng(7)

def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)

# acordes (MIDI): Fmaj9, Am7, Dm9, Bbmaj9 — 2 compases cada uno
CHORDS = [[53, 57, 60, 64, 67], [57, 60, 64, 67, 72], [50, 57, 60, 64, 65], [46, 53, 57, 60, 62]]
BAR = 4 * BEAT

def env(n, a, r):
    e = np.ones(n)
    ai, ri = int(a * SR), int(r * SR)
    if ai: e[:ai] = np.linspace(0, 1, ai)
    if ri: e[-ri:] *= np.linspace(1, 0, ri)
    return e

def onepole(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc; y[i] = acc
    return y

L = np.zeros(N); R = np.zeros(N)

def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR); j = min(N, i + len(sig))
    if j <= i: return
    s = sig[: j - i] * gain
    L[i:j] += s * np.sqrt(0.5 * (1 - pan)); R[i:j] += s * np.sqrt(0.5 * (1 + pan))

# pad
end_music = 24.6
pos = 0.0; k = 0
while pos < end_music:
    chord = CHORDS[k % 4]; dur = min(2 * BAR, end_music - pos) + 0.6
    n = int(dur * SR); tt = np.arange(n) / SR
    sig = np.zeros(n)
    for m in chord:
        for det in (-0.08, 0.0, 0.07):
            sig += np.sin(2 * np.pi * hz(m) * (1 + det / 100) * tt + rng.uniform(0, 6.28))
    sig *= env(n, 1.2, 0.8) / (len(chord) * 3)
    add(sig, pos, pan=0.0, gain=0.55)
    pos += 2 * BAR; k += 1

# arpegio (corcheas) desde que entra el móvil hasta que sale
start_arp, end_arp = 2.8, 24.1
step = BEAT / 2; i = 0; tcur = start_arp
while tcur < end_arp:
    chord = CHORDS[int((tcur) // (2 * BAR)) % 4]
    note = sorted(chord)[[0, 2, 4, 3, 1, 3, 4, 2][i % 8]] + 12
    n = int(0.9 * SR); tt = np.arange(n) / SR
    tone = np.sin(2 * np.pi * hz(note) * tt) + 0.25 * np.sin(4 * np.pi * hz(note) * tt)
    tone *= np.exp(-tt * 5.5) * env(n, 0.004, 0.05)
    add(tone, tcur, pan=0.35 if i % 2 else -0.35, gain=0.16)
    tcur += step; i += 1

# pulso: bombo suave en 1 y 3, desde el primer mensaje
tcur = 4.4
while tcur < 24.2:
    n = int(0.35 * SR); tt = np.arange(n) / SR
    f = 95 * np.exp(-tt * 18) + 45
    kick = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9)
    add(kick, tcur, gain=0.30)
    tcur += 2 * BEAT

# shaker suave en contratiempos, desde que el dueño envía
tcur = 9.25 + BEAT / 2
while tcur < 24.2:
    n = int(0.08 * SR)
    noise = rng.standard_normal(n)
    noise = noise - onepole(noise, 3500)  # paso alto sencillo
    noise *= np.exp(-np.arange(n) / SR * 60)
    add(noise, tcur, pan=0.2, gain=0.035)
    tcur += BEAT

# cierre: acorde abierto de Fa con campana, que se apaga al final
n = int((DUR - 24.6) * SR); tt = np.arange(n) / SR
sig = np.zeros(n)
for m in [41, 53, 60, 64, 67, 72]:
    sig += np.sin(2 * np.pi * hz(m) * tt + rng.uniform(0, 6.28))
sig *= env(n, 0.6, 3.0) / 6
add(sig, 24.6, gain=0.6)
bell = (np.sin(2 * np.pi * hz(84) * tt) + 0.4 * np.sin(2 * np.pi * hz(91) * tt)) * np.exp(-tt * 1.6)
add(bell, 24.6, gain=0.08)

mix = np.stack([L, R], axis=1)
mix = onepole(mix[:, 0], 9000)[:, None] * [1, 0] + onepole(mix[:, 1], 9000)[:, None] * [0, 1]
fade = np.ones(N); fi = int(0.8 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]
fo = int(1.5 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix *= 10 ** (-3 / 20) / np.max(np.abs(mix))
sf.write("assets/audio/musica.wav", mix.astype(np.float32), SR, subtype="PCM_16")
print("musica.wav", round(DUR, 1), "s")
