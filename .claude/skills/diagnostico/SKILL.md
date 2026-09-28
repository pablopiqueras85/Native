---
name: diagnostico
description: Ejecuta los agentes del embudo de diagnóstico sobre las respuestas nuevas del cuestionario de Tally, deja el informe en Google Drive y, si el envío automático está activo y el informe pasa la revisión, lo envía por email a quien respondió. Úsala cuando la lance la rutina programada o cuando el usuario pida "haz los diagnósticos", "procesa las respuestas" o el diagnóstico de una respuesta concreta.
---

# Diagnóstico de las respuestas nuevas

Objetivo: por cada respuesta nueva del cuestionario, un informe en Google Drive y, si el envío automático está
activo, el mismo informe enviado por email a quien respondió (decisión 0004).

Diseño completo del embudo: `sistemas/embudo-diagnostico.md`. Instrucciones de cada agente:
`sistemas/diagnostico/agentes.md`.

## Reglas que no se saltan

- **Solo datos anónimos.** Lee las respuestas únicamente con `sistemas/diagnostico/fichas.py`, que quita el
  nombre de la persona, el email y el WhatsApp. No llames a la API de Tally por otro camino ni intentes
  recuperar esos datos. El nombre del centro y la ciudad sí se usan: los necesita el Investigador.
- **Nada al repositorio.** Las fichas y los informes contienen datos de prospectos: van a Google Drive,
  nunca a Git. No hagas commits en esta tarea.
- **Al centro, solo el email del informe y solo con `enviar.py`.** Ese script lee el email de Tally y lo pasa a
  Brevo sin mostrarlo. Nunca lo leas tú ni lo pases a un agente. Nada de WhatsApp.
- **No inventes cifras ni precios.** Las cuentas salen de las respuestas, con la fórmula a la vista. Los
  informes no llevan precio mientras el agente `precio` esté en pausa.

## Pasos

1. **Comprueba el acceso a Tally:** `python3 sistemas/tally/formulario.py comprobar`. Si no da 200, para y
   avisa al fundador (notificación) de que la clave de Tally no funciona.

2. **Lee las fichas:** `python3 sistemas/diagnostico/fichas.py --dias 14` (o `--id ID` si el usuario pide
   una concreta).

3. **Descarta las ya hechas.** En Google Drive, busca en la carpeta `Diagnósticos` (id
   `1gDmW7QEs6Nq05PC1RepKaZhHxv75YFVx`; si ya no existe, búscala por nombre y, si no está, créala en
   "Mi unidad") un archivo cuyo título contenga el `id` de la ficha: `parentId = '…' and title contains '{id}'`. Si existe, esa ficha ya está hecha.
   Si no queda ninguna ficha nueva, termina sin avisar a nadie.

4. **Por cada ficha nueva, lanza los agentes en orden** con la herramienta Agent, uno detrás de otro (cada uno
   necesita lo que entrega el anterior). Pásale a cada uno **solo** lo que indica la tabla de
   `sistemas/diagnostico/agentes.md`:
   1. `investigador`: nombre del centro y ciudad.
   2. `analista`: la ficha anónima (el JSON de `fichas.py`, sin el `id`) y la ficha pública del Investigador.
   3. `propuesta`: los dolores del Analista.

   El agente `precio` está **en pausa** (desde 2026-09-28, por decisión del fundador): no lo lances. El informe
   sale sin precio; se habla en la llamada.

   Si un tipo de agente no está disponible en la sesión (los de `.claude/agents/` se cargan al empezar la
   sesión), lanza uno general con el contenido de su archivo `.claude/agents/{nombre}.md` como instrucciones.
   Tú, como coordinador, no rehaces su trabajo: si una salida está incompleta o incoherente, relanza ese agente
   una vez explicándole qué falta; si sigue mal, dilo en las notas internas.

5. **Guarda en la carpeta `Diagnósticos` de Drive dos documentos** (Markdown convertido a documento de
   Google: `contentMimeType: text/markdown`):
   - `Diagnóstico {id} · {centro} · BORRADOR`: el informe para el centro, que montas tú con la plantilla de
     `sistemas/diagnostico/agentes.md` a partir de lo que entregan los agentes.
   - `Diagnóstico {id} · {centro} · notas internas`: lo que el fundador necesita para revisarlo (fuentes
     del Investigador, supuestos de las cuentas, dudas y la lista de comprobación).

6. **Envía el informe por email** (decisión 0004), solo si `python3 sistemas/diagnostico/enviar.py comprobar`
   funciona. Si falla (sin clave de Brevo o sin red), no envíes: el informe se queda como borrador y lo dices en
   el aviso al fundador.
   - Antes, repasa tú la lista de comprobación de las notas internas. No envíes si hay huecos entre corchetes,
     alguna cifra de precio, datos de la ficha pública que no sean seguro de ese centro, o si parece una
     respuesta de prueba o absurda: en esos casos se queda como borrador para el fundador.
   - Guarda el informe (el mismo Markdown del documento BORRADOR) en el scratchpad de la sesión, nunca en el
     repositorio, y ejecuta `python3 sistemas/diagnostico/enviar.py enviar --id {id} --informe {ruta}`.
   - Si se envía, renombra el documento a `Diagnóstico {id} · {centro} · ENVIADO {AAAA-MM-DD}` y borra el
     archivo del scratchpad.

7. **Avisa al fundador** con una notificación (si está disponible) o en tu respuesta final: cuántos
   informes hay, de qué centros, si se enviaron o por qué no, y sus enlaces de Drive. Los datos de contacto
   están en Tally o en Google Sheets, buscando por el `id`.

## Si algo falla

- Tally o Drive no responden: no reintentes en bucle. Avisa de qué falló; la siguiente ejecución lo
  volverá a intentar, porque la ficha seguirá sin informe en Drive.
- Una ficha con respuestas absurdas o de prueba: haz el informe igualmente, dilo en las notas internas y no
  lo envíes.
- Brevo falla al enviar: no reintentes. El documento se queda como BORRADOR y avisas al fundador; como ya
  existe en Drive, la siguiente ejecución no lo repite, así que el fundador lo envía a mano.
