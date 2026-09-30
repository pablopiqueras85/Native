# Vídeos de marca

Vídeos hechos con la skill **onetake** entre el 2026-09-28 y el 2026-09-30.

> **Solo uso no comercial.** onetake tiene licencia PolyForm Noncommercial 1.0.0. Estos vídeos sirven para
> enseñárselos a colegas. No se pueden usar para vender, en publicidad, en redes sociales ni ante inversores. Para
> eso habría que rehacerlos con otra herramienta o conseguir una licencia comercial. No quites las cabeceras de
> licencia de los archivos en `fuentes/`.

| Archivo | Qué es | Duración | Sonido |
|---|---|---|---|
| `native-crew-presentacion.mp4` | Presenta Native Crew: empleados virtuales a la carta y sus combinaciones | 23,5 s | Sí |
| `native-crew-pitch.mp4` | Pitch: problema → agentes a la carta → cascadas → modelo | 41 s | Sí |
| `native-crew-equipo.mp4` | "Así trabaja tu equipo": el Encargado (amarillo) y los agentes azul, verde y rojo se pasan el trabajo | 32 s | Sí |
| `spotter.mp4` | Primera versión de la marca ("Conoce Spotter"), con el personaje de la máquina de jalón | 25 s | No |

Los cuatro vídeos están en 1080p a 30 fotogramas por segundo y pasan la comprobación de onetake (`verify_promo.py`). Los nombres que salen en
los vídeos (Ana, Luis, Marta…) son inventados.

## Cómo volver a generarlos

Las fuentes están en `fuentes/`. Hace falta la skill onetake (sus scripts `render.py` y `sfx_palette.py`), Playwright y
ffmpeg.

```bash
cd marca/videos/fuentes/native-crew
python3 score.py presentacion.html presentacion.wav        # sonido (lee los eventos del propio vídeo)
python3 <onetake>/scripts/render.py presentacion.html --out presentacion.mp4 --sfx presentacion.wav
# igual con pitch.html, y con agentes.html + agentes_score.py
```

Añade `--final` para sacar la versión en 4K60. El Spotter se genera con `fuentes/spotter/comp.html`, que no lleva sonido.
