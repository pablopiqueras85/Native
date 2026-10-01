# Tu equipo en tu móvil (HyperFrames)

Vídeo de 64 s con sonido que explica **qué resuelve Native Crew, cómo está organizado el equipo y cómo trabaja**:

1. **El problema (0–5 s):** "Hoy lo haces todo tú": WhatsApp, teléfono, correo, facturas, clientes que se van, cobros,
   avisos y reseñas… y tu trabajo de verdad.
2. **La estructura (5–19 s):** el organigrama de la decisión 0010 se monta pieza a pieza, cada puesto con el problema que
   resuelve: Tú → Executive Assistant → Chief of Staff Officer → Administración (Recepcionista, Correo, Papeles),
   Comercial (Responsable de clientes, Recuperador, Comunicación, Cobros), A medida y el control de calidad (portero,
   aprobación del dueño, supervisión mensual).
3. **Un día (19–50 s):** el iPhone con el chat del Executive Assistant y, al lado, un mini organigrama que **se enciende
   con quien trabaja en cada momento**: Recepcionista por la noche; el dueño decide y el Chief of Staff Officer lo pasa al
   Responsable de clientes; Correo y Papeles; Cobros con su permiso; Comunicación y Recuperador; el cierre del día.
4. **Cómo empezamos (51–58 s):** diagnóstico gratis → montaje a tu nombre → revisión cada mes.
5. **Cierre (58–64 s):** Native Crew y "Pide tu diagnóstico gratuito".

Los datos del chat son un **ejemplo ilustrativo** (lo dice el propio vídeo).

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
