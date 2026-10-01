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
| `native-crew-explicativo.mp4` | Vídeo explicativo con voz en off: cada cliente (puertas, decisiones, portero), cómo funciona Dots, la implementación con el paquete de puesta en marcha, lo que es tuyo, las fases y los pilotos | 3 min 6 s | Voz y sonido |
| `contrata-tu-equipo.mp4` | **Vídeo para la landing** ("¿Buscas contratar a alguien?"): oferta de empleo → lo que cuesta una persona más → "Contrata tu primer equipo digital" → organigrama de la decisión 0010 → reglas → diagnóstico gratuito. Sin sonido, para reproducirse en silencio y en bucle | 36 s | No |
| `spotter.mp4` | Primera versión de la marca ("Conoce Spotter"), con el personaje de la máquina de jalón | 25 s | No |

Los cuatro vídeos están en 1080p a 30 fotogramas por segundo y pasan la comprobación de onetake (`verify_promo.py`). Los nombres que salen en
los vídeos (Ana, Luis, Marta…) son inventados.

## Vídeo de la landing: sí se puede usar comercialmente

`contrata-tu-equipo.mp4` **no usa onetake**: está hecho con código propio (`fuentes/contrata-tu-equipo/video.html` y
`render.py`) y con las fuentes de la landing (Barlow Condensed y Figtree, licencia SIL OFL). Se puede poner en la
landing, en redes y en publicidad.

```bash
cd marca/videos/fuentes/contrata-tu-equipo
python3 render.py --stills 9.5 28      # capturas para revisar
python3 render.py                      # vídeo completo (unos 2 minutos)
```

Los textos están en `video.html`; los tiempos, en la función `seek` del mismo archivo.

## Cómo volver a generarlos (los de onetake)

Las fuentes están en `fuentes/`. Hace falta la skill onetake (sus scripts `render.py` y `sfx_palette.py`), Playwright y
ffmpeg.

```bash
cd marca/videos/fuentes/native-crew
python3 score.py presentacion.html presentacion.wav        # sonido (lee los eventos del propio vídeo)
python3 <onetake>/scripts/render.py presentacion.html --out presentacion.mp4 --sfx presentacion.wav
# igual con pitch.html, y con agentes.html + agentes_score.py
```

Añade `--final` para sacar la versión en 4K60. El Spotter se genera con `fuentes/spotter/comp.html`, que no lleva sonido.

El explicativo (`fuentes/explicativo/`) usa voz sintética local (Kokoro, voz `em_alex`) generada con `vo_tools.py tts vo/lines.txt --read vo/read.txt --lang es`; `read.txt` es la pronunciación ("Néitiv Crú"). Después: `plan.py` (tiempos y subtítulos), `render.py --samples 2` y `explicativo_score.py`.
