# CLAUDE.md

Este repositorio es el **cerebro de una empresa AI Native** que está en su fase inicial. No es una
base de código de producto (todavía): son documentos en Markdown que describen al fundador, los
principios de la empresa, las ideas en exploración y las decisiones tomadas.

## Idioma

Escribe todo en **español**: documentos, mensajes de commit y respuestas.

## Estado actual

- **Fase:** exploración de ideas. No hay idea elegida.
- **Perfil del fundador:** algo técnico (se maneja con herramientas y algo de código, no es desarrollador).
  Explica las cosas técnicas con claridad y sin jerga innecesaria.
- **Descartado:** el sector industrial (ver `decisiones/0002-descartar-sector-industrial.md`).
- **Dirección:** un "agente comercial externo" (responder, cualificar y hacer seguimiento de clientes
  potenciales con agentes de IA). Ver `exploracion/mapa-trabajos-por-encargo.md`.
- **Nicho en estudio:** salud y deporte. Mejor candidato: estudios boutique de fitness independientes,
  con el foco en convertir y retener clientes (la recepción con IA ya está saturada). Ver
  `exploracion/nicho-salud-deporte.md`.
- **Idea en curso:** `exploracion/ideas/0001-agente-comercial-estudios-boutique.md`.
- **Sistema en diseño:** el embudo de diagnóstico (`sistemas/embudo-diagnostico.md`), el primer equipo
  de agentes para uso propio: cuestionario → informe con soluciones y precio → reunión.
- **Hecho:** la landing con calculadora privada (`landing/`), vista previa en
  https://claude.ai/artifact/RSBDcBMg1jU1fvYWmJ8Ccp.
- **Siguiente paso:** Claude crea el formulario en Tally por API con el script `sistemas/tally/formulario.py`
  (uso en `sistemas/montaje-tally.md`, "Opción automática"). La clave de Tally está guardada como credencial
  del entorno: se añade sola como cabecera `Authorization: Bearer …` a las peticiones a `api.tally.so`, así que
  **no** aparece como variable de entorno. Compruébalo con `python3 sistemas/tally/formulario.py comprobar`
  (200 = funciona). **Bloqueado a 2026-09-23:** Tally responde 401 a la clave guardada (el proxy dice
  `upstream auth failed`), así que el fundador tiene que generar una clave nueva en Tally y guardarla de nuevo
  en el entorno. Nunca pidas la clave en el chat. El script está sin probar contra la API: al primer uso,
  créalo como borrador y revisa lo que diga. Crear también la política de privacidad como página de Tally con
  los datos que dé el fundador (responsable, NIF, dirección, email, plazo de conservación, herramienta de
  agenda, alojamiento de la web y proveedor de IA), y pegar ambos enlaces en el `CONFIG` de
  `landing/index.html`. El fundador conecta Google Sheets desde Tally. Después: precios y cliente misterioso.

Actualiza esta sección cuando cambie la fase o el siguiente paso.

## Mapa

- `fundador/perfil.md` — quién es el fundador. **Léelo antes de proponer o evaluar cualquier idea.**
- `empresa/principios.md` — cómo opera una empresa AI Native. Úsalo como criterio en tus propuestas.
- `empresa/oferta.md` — servicios y precios. El agente de precios solo usa lo que hay aquí.
- `landing/` — la landing con la calculadora privada. Ver `landing/README.md` para configurarla.
- `legal/` — textos legales (borrador de política de privacidad).
- `sistemas/` — equipos de agentes que usa la propia empresa, con su diseño y sus piezas (cuestionarios, plantillas).
- `exploracion/criterios.md` — la rúbrica para puntuar ideas. No la cambies sin registrar una decisión.
- `exploracion/mapa-trabajos-por-encargo.md` — qué trabajos por encargo pueden entregar agentes y por qué elegimos la familia comercial.
- `exploracion/nicho-salud-deporte.md` — análisis del nicho de salud y deporte y experimento propuesto.
- `exploracion/backlog.md` — tabla resumen de todas las ideas. Mantenla sincronizada con `exploracion/ideas/`.
- `exploracion/ideas/NNNN-slug.md` — una idea por archivo, creada a partir de `_plantilla.md`.
- `decisiones/NNNN-slug.md` — una decisión por archivo, creada a partir de `_plantilla.md`.

## Reglas de trabajo

- **Sé honesto, no complaciente.** El valor de esta fase está en descartar ideas malas pronto.
  Si una idea puntúa bajo, dilo y explica por qué.
- **No inventes datos de mercado.** Cita la fuente (con enlace) o marca el dato como *hipótesis*.
- **Todo lo importante queda por escrito.** Si en una conversación surge algo relevante (un dato del
  fundador, una decisión, una idea), propón guardarlo en el archivo que corresponda.
- **Decisiones con registro.** Elegir, descartar o pivotar una idea, o cambiar los criterios, es una
  decisión: crea un archivo en `decisiones/`.
- **Nunca guardes datos personales** de prospectos o clientes (nombres, teléfonos, emails, respuestas)
  en este repositorio. Viven en la herramienta de fichas (Google Sheets, Airtable…), no en Git.
- **Fechas absolutas** (AAAA-MM-DD), nunca "ayer" o "la semana que viene".
- **Numeración:** ideas y decisiones usan 4 dígitos correlativos (`0001`, `0002`…). Mira el último
  número existente antes de crear uno nuevo.
