# 0009 — Arquitectura: cara al público delegada, empleados virtuales propios

- **Fecha:** 2026-10-01
- **Estado:** aceptada (el fundador: "seguimos funcionando como habíamos dicho")
- **Amplía:** la decisión 0006 (agentes y memoria portables) y la fase 1 de la decisión 0008.

## Contexto

Se han revisado varias formas de alojar los agentes de los clientes:

- **ElevenLabs Agents:** voz y mensajes; un mismo agente en teléfono, WhatsApp, SMS y web.
- **Dots** (OpenAI): asistente del dueño dentro de ChatGPT.
- **Managed Agents** (Anthropic): agentes alojados, con horario.
- **Hermes Agent:** código abierto, en un servidor propio.
- **Programarlo todo** con Claude Code.

La parte más difícil técnicamente es contestar al momento por WhatsApp y por teléfono. La parte con más valor es lo
que hacen los empleados virtuales: sus roles, sus tareas, sus reglas y el criterio con que trabajan para cada negocio.

## Decisión

1. **La cara al público se delega en ElevenLabs:** WhatsApp y llamadas. Contesta, reserva, recoge datos y pasa al dueño
   lo que toca. Se configura con nuestras fichas de puesto, plantillas y reglas de escalado.
2. **Los empleados virtuales los creamos nosotros, al estilo Marblism:** cada uno con nombre, rol, tareas, horario,
   canal y métrica. Son nuestros y trabajan sobre todo en la trastienda: cobros, seguimiento, clientes en riesgo,
   recuperación, informes y supervisión. Preparan borradores; el dueño aprueba a través del Encargado; lo aprobado sale
   por el canal delegado.
3. **Dónde se ejecutan los empleados propios, por fases:**
   - **Ahora (piloto):** Claude Code, con rutinas con horario, como el diagnóstico.
   - **Primeros clientes:** Managed Agents de Anthropic: un agente por puesto y una ejecución por cliente.
   - **Plan B y fase 3:** servidor propio (SDK de agentes de Claude o Hermes Agent).
4. **Dots no es parte del núcleo.** Es una opción para el cliente que ya lo use, no una dependencia nuestra.
5. **Organización por cliente:**
   - recetas comunes: las fichas de `sistemas/equipo-digital/agentes/`;
   - carpeta por cliente: `clientes/C00X/`, con un código en vez del nombre y sin datos personales;
   - en ElevenLabs, un agente por cliente y puesto;
   - una ficha de clientes separada por negocio.

## Reglas contra la dependencia de proveedores

Amplían la decisión 0006:

- **El original de cada agente vive en este repositorio.** Las plataformas reciben copias.
- **El número de teléfono y la cuenta de WhatsApp (Meta) siempre a nombre del cliente.**
- **Un plan B probado por pieza:**
  - voz y WhatsApp: Vapi, Retell o un agente propio sobre la API oficial;
  - trastienda: servidor propio.

  Una vez al año, un simulacro de cambio.
- **El coste de proveedores, por debajo del 30 % de la cuota de cada cliente.** Se mira cada mes.
- **Cláusula de revisión de precio en los contratos:** si los proveedores suben más de un X %, la cuota se ajusta en la
  misma proporción, con 30 días de aviso.
- **Nada de funciones exclusivas de un proveedor** sin un equivalente en otro.

## Alternativas consideradas

- **Todo en plataformas** (ElevenLabs + Dots): más rápido, pero los empleados, que son el valor, quedarían fuera de
  nuestro control.
- **Todo propio, WhatsApp y voz incluidos:** máxima independencia, pero demasiado mantenimiento técnico para un fundador
  con trabajo a jornada completa.
- **Hermes Agent como base desde ya:** atractivo por independencia, pero está pensado para una persona, no para muchos
  clientes. Queda como experimento personal.

## Consecuencias

- **Siguiente paso:** definir los empleados virtuales al estilo Marblism (nombre, rol, tareas, horario, canal y
  métrica) en `sistemas/equipo-digital/agentes/`, con la plantilla `_plantilla-empleado.md`.
- **Pilotos:**
  - una tarde con ElevenLabs para la cara al público del negocio inventado;
  - el primer empleado de trastienda con datos inventados en Claude Code.
- **Pendiente legal:** contrato de encargo de tratamiento con cada cliente (nosotros somos encargados y ElevenLabs y
  Anthropic, subencargados).
- **Revisión:** con los 3 primeros clientes, o si ElevenLabs cambia precios o condiciones.
