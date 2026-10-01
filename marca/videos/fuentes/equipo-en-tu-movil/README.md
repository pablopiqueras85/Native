# Tu equipo en tu móvil (HyperFrames)

Vídeo de 31 s con sonido: un iPhone donde el dueño habla con su **Executive Assistant**. Resumen de la noche → "¿Algo
que necesite yo?" → decide lo delicado ("Sí, escríbele") → el Chief of Staff Officer se lo pasa al Responsable de
clientes → aviso de Correo → cierre del día → Native Crew y diagnóstico gratuito. Los datos del chat son un **ejemplo
ilustrativo** (lo dice el propio vídeo).

## Licencias (se puede usar comercialmente)

- **HyperFrames** (HeyGen): Apache-2.0.
- **GSAP** (`assets/vendor/gsap.min.js`): licencia estándar gratuita de GreenSock.
- **Efectos de sonido** (`assets/audio/sfx/`): Pixabay Content License, ver `CREDITS.md`.
- **Música** (`assets/audio/musica.wav`): compuesta por código con `musica.py`; es nuestra.
- **Fuentes**: Barlow Condensed y Figtree, SIL OFL.

## Cómo regenerarlo

Hace falta Node 22+ y ffmpeg en el `PATH`.

```bash
cd marca/videos/fuentes/equipo-en-tu-movil
python3 musica.py                                   # música (numpy + soundfile)
npx hyperframes@0.8.105 check                       # revisión: debe dar "Check passed"
npx hyperframes@0.8.105 snapshot --at 7,13.3,18,23.5 # capturas para revisar
npx hyperframes@0.8.105 render -o ../../equipo-en-tu-movil.mp4
```

- Los textos del chat y los titulares están en `index.html`.
- Los momentos clave están en la constante `T` del `<script>`. Si mueves uno, mueve también su `<audio>` (mismo segundo)
  y, si cambia la entrada o la salida del móvil, el arpegio de `musica.py`.
