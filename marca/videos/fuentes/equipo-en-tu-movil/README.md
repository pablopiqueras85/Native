# Tu equipo en tu móvil (HyperFrames)

Vídeo de 60 s con sonido. **Vende resultados, no tareas**: lo que el dueño deja de perder y lo que gana, y un equipo
(no un chatbot) que lo consigue.

1. **Gancho (0–7 s):** "Tu negocio no para. Tú tampoco. Y aun así, se te escapan cosas": el cliente de las 23:14 que
   reserva en otro sitio, la clienta que deja de venir, la factura sin cobrar.
2. **El giro (7–11 s):** "No necesitas otra app. Necesitas un equipo."
3. **El equipo por resultados (11–24 s):** organigrama de la decisión 0010 donde cada tarjeta dice lo que consigue
   ("Ningún cliente sin respuesta", "Menos bajas", "Cobras a tiempo"…) y debajo el puesto.
4. **Un día con marcador (24–48 s):** el iPhone con el Executive Assistant y un marcador que sube: reservas, clientes
   que vuelven, euros cobrados y horas de vuelta.
5. **Por qué funciona (48–54 s):** "No es un chatbot. Es tu equipo": a medida, supervisado, medido y tuyo.
6. **Cierre (54–60 s):** "Más clientes. Más tiempo. Nada se te escapa", diagnóstico gratuito y "Buscamos 3 negocios
   piloto" (los 3 primeros clientes de `empresa/oferta.md`).

Las cifras y nombres son un **ejemplo ilustrativo** (lo dice el propio vídeo). No se promete ninguna cifra real.

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
python3 sonidos.py                                  # escribe los <audio> a partir de la tabla T
npx hyperframes@0.8.105 check                       # revisión: debe dar "Check passed"
npx hyperframes@0.8.105 snapshot --at 7,13.3,18,23.5 # capturas para revisar
npx hyperframes@0.8.105 render -o ../../equipo-en-tu-movil.mp4
```

- Los textos del chat y los titulares están en `index.html`.
- Los momentos clave están en la constante `T` del `<script>`. Si mueves uno, vuelve a ejecutar `sonidos.py` (los efectos
  siguen a `T` solos) y, si cambian los actos, ajusta los segundos de `musica.py`.
- Renderiza fuera del repositorio o con `-o` a la carpeta `marca/videos/`: durante el render HyperFrames crea carpetas
  temporales junto al archivo de salida (están en `.gitignore`).
