"""Escribe los <audio> de index.html a partir de la tabla T del propio index.html.

Cada efecto va en la primera pista libre (sin solaparse), para que HyperFrames no avise de pistas duplicadas.
Uso: python3 sonidos.py
"""
import json
import re
from pathlib import Path

HTML = Path(__file__).with_name("index.html")
DUR = {"whoosh-short": 0.57, "notification": 2.46, "pop": 0.72, "typing": 1.5, "click-soft": 0.37,
       "ping": 1.32, "chime": 2.5, "key-press": 0.4}

s = HTML.read_text()
T = json.loads(re.search(r"const T = (\{.*?\});", s, re.S).group(1))

# (segundo, efecto, volumen)
ev = []
for i in range(8):                                   # 1 · cada tarea que haces tú
    ev.append((0.9 + i * 0.3, "pop", 0.35))
ev.append((3.7, "whoosh-short", 0.45))
b = T["s2"]                                          # 2 · se monta el organigrama
for dt in (0.3, 0.9, 1.6, 2.6, 4.5, 6.6, 7.9):
    ev.append((b + dt, "pop", 0.4))
ev.append((b + 9.0, "chime", 0.35))
ev += [                                              # 3 · un día
    (T["s3"], "whoosh-short", 0.5),
    (T["m1"], "notification", 0.5), (T["m2"], "pop", 0.4),
    (T["type"], "typing", 0.45), (T["send"], "whoosh-short", 0.5),
    (T["m4"], "notification", 0.5), (T["tap1"], "click-soft", 0.9), (T["m5"], "pop", 0.45), (T["m6"], "notification", 0.45),
    (T["banner"], "ping", 0.4), (T["m7"], "notification", 0.5),
    (T["m8"], "notification", 0.5), (T["tap2"], "click-soft", 0.9), (T["m9"], "pop", 0.45),
    (T["m10"], "notification", 0.5), (T["m12"], "notification", 0.5),
    (T["s3out"], "whoosh-short", 0.45),
]
for i in range(3):                                   # 4 · tres pasos
    ev.append((T["s4"] + 1.0 + i * 0.7, "pop", 0.4))
ev.append((T["s5"] + 0.2, "chime", 0.5))             # 5 · cierre

ev.sort()
ends = {}  # pista -> segundo en que queda libre
tags = ['      <audio id="bgm" src="assets/audio/musica.wav" data-start="0" data-duration="64" data-track-index="10" data-volume="0.55"></audio>']
for n, (t, name, vol) in enumerate(ev):
    track = next(k for k in range(11, 40) if ends.get(k, -1) <= t)
    ends[track] = t + DUR[name] + 0.01
    tags.append(f'      <audio id="sx-{n:02d}" src="assets/audio/sfx/{name}.mp3" data-start="{t:.2f}" '
                f'data-duration="{DUR[name]}" data-track-index="{track}" data-volume="{vol}"></audio>')

block = "<!-- AUDIO:INICIO (generado por sonidos.py) -->\n" + "\n".join(tags) + "\n      <!-- AUDIO:FIN -->"
s = re.sub(r"<!-- AUDIO:INICIO.*?<!-- AUDIO:FIN -->", block, s, flags=re.S)
HTML.write_text(s)
print(len(ev), "efectos en", len(ends), "pistas")
