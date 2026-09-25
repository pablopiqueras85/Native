---
name: diagnostico
description: Ejecuta los agentes del embudo de diagnóstico sobre las respuestas nuevas del cuestionario de Tally y deja en Google Drive un borrador del informe para que el fundador lo revise. Úsala cuando la lance la rutina programada o cuando el usuario pida "haz los diagnósticos", "procesa las respuestas" o el diagnóstico de una respuesta concreta.
---

# Diagnóstico de las respuestas nuevas

Objetivo: por cada respuesta nueva del cuestionario, un **borrador** de informe en Google Drive que el
fundador revisa y envía a mano. Nunca se envía nada al centro desde aquí.

Diseño completo del embudo: `sistemas/embudo-diagnostico.md`. Instrucciones de cada agente:
`sistemas/diagnostico/agentes.md`.

## Reglas que no se saltan

- **Solo datos anónimos.** Lee las respuestas únicamente con `sistemas/diagnostico/fichas.py`, que quita el
  nombre de la persona, el email y el WhatsApp. No llames a la API de Tally por otro camino ni intentes
  recuperar esos datos. El nombre del centro y la ciudad sí se usan: los necesita el Investigador.
- **Nada al repositorio.** Las fichas y los informes contienen datos de prospectos: van a Google Drive,
  nunca a Git. No hagas commits en esta tarea.
- **Nada al centro.** Ni emails ni WhatsApp. El fundador revisa y envía.
- **No inventes cifras ni precios.** Las cuentas salen de las respuestas, con la fórmula a la vista. Los
  precios, solo de `empresa/oferta.md`; si faltan, se deja el hueco marcado.

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
   4. `precio`: la propuesta.

   Si un tipo de agente no está disponible en la sesión (los de `.claude/agents/` se cargan al empezar la
   sesión), lanza uno general con el contenido de su archivo `.claude/agents/{nombre}.md` como instrucciones.
   Tú, como coordinador, no rehaces su trabajo: si una salida está incompleta o incoherente, relanza ese agente
   una vez explicándole qué falta; si sigue mal, dilo en las notas internas.

5. **Guarda en la carpeta `Diagnósticos` de Drive dos documentos** (Markdown convertido a documento de
   Google: `contentMimeType: text/markdown`):
   - `Diagnóstico {id} · {centro} · BORRADOR`: el informe para el centro, que montas tú con la plantilla de
     `sistemas/diagnostico/agentes.md` a partir de lo que entregan los agentes.
   - `Diagnóstico {id} · {centro} · notas internas`: lo que el fundador necesita para revisarlo (fuentes
     del Investigador, supuestos de las cuentas, huecos de precio, dudas y la lista de comprobación).

6. **Avisa al fundador** con una notificación (si está disponible) o en tu respuesta final: cuántos
   informes hay listos y sus enlaces de Drive. Recuérdale que los datos de contacto están en Tally o en
   Google Sheets, buscando por el `id`.

## Si algo falla

- Tally o Drive no responden: no reintentes en bucle. Avisa de qué falló; la siguiente ejecución lo
  volverá a intentar, porque la ficha seguirá sin informe en Drive.
- Una ficha con respuestas absurdas o de prueba: haz el informe igualmente y dilo en las notas internas.
