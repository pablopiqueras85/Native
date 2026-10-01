"""Escribe los <audio> de index.html a partir de la tabla T del propio index.html.

Cada efecto va en la primera pista libre (sin solaparse), para que HyperFrames no avise de pistas duplicadas.
Uso: python3 sonidos.py
"""
import json
import re
from pathlib import Path

HTML = Path(__file__).with_name("index.html")
DUR = {"sparkle": 1.8, "impact-bass-1": 2.12, "whoosh-short": 0.57, "notification": 2.46, "pop": 0.72, "typing": 1.5, "click-soft": 0.37,
       "ping": 1.32, "chime": 2.5, "key-press": 0.4}

s = HTML.read_text()
T = json.loads(re.search(r"const T = (\{.*?\});", s, re.S).group(1))

# (segundo, efecto, volumen)
ev = [(0.2, "whoosh-short", 0.45), (1.2, "pop", 0.4)]
for i in range(3):                                   # 1 · lo que se te escapa
    ev.append((2.7 + i * 1.1, "key-press", 0.6))
ev += [(T["s2"] + 1.2, "whoosh-short", 0.5), (T["s2"] + 1.9, "impact-bass-1", 0.55)]   # 2 · el giro
b = T["s3"]                                          # 3 · el equipo
for dt in (0.3, 0.8, 1.5, 2.4, 4.3, 6.4):
    ev.append((b + dt, "pop", 0.4))
ev.append((b + 8.0, "chime", 0.4))
ev += [                                              # 4 · un día con marcador
    (T["s4"], "whoosh-short", 0.5),
    (T["m1"], "notification", 0.5), (T["m2"], "notification", 0.45), (T["tap1"], "click-soft", 0.9),
    (T["m3"], "pop", 0.45), (T["m4"], "sparkle", 0.45), (T["m5"], "sparkle", 0.45),
    (T["m6"], "notification", 0.5), (T["type"], "typing", 0.4), (T["send"], "whoosh-short", 0.5),
    (T["m9"], "notification", 0.5), (T["m9"] + 0.5, "sparkle", 0.4), (T["s4out"], "whoosh-short", 0.45),
]
for i in range(4):                                   # 5 · por qué funciona
    ev.append((T["s5"] + 1.2 + i * 0.5, "pop", 0.4))
ev += [(T["s6"] + 0.2, "impact-bass-1", 0.5), (T["s6"] + 1.3, "chime", 0.45)]   # 6 · cierre

ev.sort()
ends = {}  # pista -> segundo en que queda libre
tags = ['      <audio id="bgm" src="assets/audio/musica.wav" data-start="0" data-duration="60" data-track-index="10" data-volume="0.55"></audio>']
for n, (t, name, vol) in enumerate(ev):
    track = next(k for k in range(11, 40) if ends.get(k, -1) <= t)
    ends[track] = t + DUR[name] + 0.01
    tags.append(f'      <audio id="sx-{n:02d}" src="assets/audio/sfx/{name}.mp3" data-start="{t:.2f}" '
                f'data-duration="{DUR[name]}" data-track-index="{track}" data-volume="{vol}"></audio>')

block = "<!-- AUDIO:INICIO (generado por sonidos.py) -->\n" + "\n".join(tags) + "\n      <!-- AUDIO:FIN -->"
s = re.sub(r"<!-- AUDIO:INICIO.*?<!-- AUDIO:FIN -->", block, s, flags=re.S)
HTML.write_text(s)
print(len(ev), "efectos en", len(ends), "pistas")
