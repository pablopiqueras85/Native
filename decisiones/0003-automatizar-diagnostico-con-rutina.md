# 0003 — Automatizar los borradores del diagnóstico con una rutina de Claude Code

- **Fecha:** 2026-09-23
- **Estado:** aceptada

## Contexto

El [embudo de diagnóstico](../sistemas/embudo-diagnostico.md) preveía una V0 manual (el fundador pasa cada
ficha por Claude a mano) y automatizar solo en la V1, con al menos 10 cuestionarios y 3 reuniones. El
formulario de Tally ya funciona y el fundador quiere que los agentes se pongan en marcha solos cuando llega
una respuesta. Aún no hay ningún informe real enviado ni precios decididos.

## Decisión

Una **rutina de Claude Code** se despierta cada hora (de 8:00 a 22:00, hora de Madrid), lee las respuestas
nuevas de Tally sin datos de contacto, ejecuta los agentes Investigador, Analista, Propuesta y Precio, y deja
en Google Drive un **borrador** del informe y unas notas internas. El fundador los revisa y los envía a mano.
El Investigador recibe el nombre del centro y la ciudad, y la política de privacidad se ha actualizado para
decirlo.

## Alternativas consideradas

- **Script en Google Sheets con la API de Anthropic:** instantáneo y sin datos personales en ninguna sesión,
  pero necesita una clave de API de pago aparte. El fundador prefirió usar su suscripción.
- **n8n o Make:** otra herramienta más, también con clave de API.
- **Seguir en manual hasta la V1:** más barato de montar, pero el fundador quiere probar ya el flujo automático.
- **Dejar fuera al Investigador:** evitaba cambiar la política, pero el informe pierde la parte pública del centro.

## Consecuencias

- Lo automático es solo el borrador. **El envío sigue siendo manual y con revisión** del fundador, como exige el
  diseño: un informe con errores quema al prospecto.
- Riesgo: automatizar un informe que aún no se ha validado con ningún centro. Se revisa con las primeras 3
  respuestas reales: si el fundador tiene que reescribir la mayor parte, se corrigen los agentes antes de seguir.
- Las respuestas pasan por la sesión de Claude Code, pero el script `fichas.py` quita el nombre de la persona,
  el email y el WhatsApp antes de que los vean los agentes. Nada se guarda en Git.
- Sin precios en `empresa/oferta.md`, los informes llevan `[PRECIO POR DECIDIR]`: decidir precios es ahora
  más urgente.
- El envío automático por email o WhatsApp sigue en la V1.
