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
- **Hecho:** el formulario en Tally (https://tally.so/r/RGpogp) y la política de privacidad
  (https://tally.so/r/J97z1K), publicados y enlazados en la landing. Creados por API con
  `sistemas/tally/formulario.py`; estado en `sistemas/montaje-tally.md`, "Estado". La política va sin NIF ni
  dirección: añadirlos antes de cobrar.
- **Hecho:** borradores automáticos del diagnóstico (decisión 0003). Una rutina de Claude Code ejecuta cada hora
  la skill `diagnostico`: respuestas nuevas de Tally → agentes → borrador y notas internas en la carpeta
  `Diagnósticos` de Google Drive. El fundador revisa y envía a mano. Cómo está montada la rutina y cómo
  recrearla: decisión 0003, "Consecuencias".
- **Siguiente paso:** primera prueba con un estudio de entrenamiento personal de un conocido del fundador. Sirve
  para probar el cuestionario y el informe, **no** como validación. Urgente: decidir precios (`empresa/oferta.md`)
  y crear el enlace de agenda de Google Calendar, que los informes dejan como huecos. Después: publicar la landing
  en Netlify, pruebas del paso 8 de `sistemas/montaje-tally.md` y cliente misterioso.
- **Clave de Tally:** guardada como credencial del entorno; se añade sola como cabecera `Authorization: Bearer …`
  a las peticiones a `api.tally.so` (no es una variable de entorno). Compruébala con
  `python3 sistemas/tally/formulario.py comprobar` (200 = funciona). Nunca pidas la clave en el chat. La red del
  entorno no deja abrir tally.so ni la documentación de la API: solo `api.tally.so`.

Actualiza esta sección cuando cambie la fase o el siguiente paso.

## Mapa

- `fundador/perfil.md` — quién es el fundador. **Léelo antes de proponer o evaluar cualquier idea.**
- `empresa/principios.md` — cómo opera una empresa AI Native. Úsalo como criterio en tus propuestas.
- `empresa/oferta.md` — servicios y precios. El agente de precios solo usa lo que hay aquí.
- `landing/` — la landing con la calculadora privada. Ver `landing/README.md` para configurarla.
- `legal/` — textos legales (borrador de política de privacidad).
- `sistemas/` — equipos de agentes que usa la propia empresa, con su diseño y sus piezas (cuestionarios, plantillas).
  Los agentes del diagnóstico son agentes independientes en `.claude/agents/` (índice y plantilla en
  `sistemas/diagnostico/agentes.md`); la skill `diagnostico` los coordina.
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
