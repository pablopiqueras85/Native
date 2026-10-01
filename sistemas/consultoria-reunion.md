# Consultoría por reunión: de la conversación al presupuesto

- **Fecha:** 2026-10-01
- **Estado:** diseño. Aún no se ha usado con ningún cliente.
- **Relacionado:**
  - `empresa/oferta.md` ("Los tres servicios", catálogo y cascadas);
  - `empresa/empleados-virtuales.md`;
  - el embudo de diagnóstico (`embudo-diagnostico.md`), que hace lo mismo a partir de un cuestionario.

## La idea (en palabras del fundador, 2026-10-01)

> Reunión con el cliente → la reunión se transcribe → un agente experto analiza la conversación → escoge agentes de la
> carta y sugiere uno creado a medida → el cliente paga la integración más el mantenimiento mensual de cada agente.
> Cuantos más agentes hay creados de base, más se reduce el tiempo de implementación.

## El flujo

| Paso | Quién | Qué sale | Dónde se guarda |
|---|---|---|---|
| 1. Reunión (30–45 min) | Fundador | Conversación sobre el negocio, con el guion de abajo | — |
| 2. Transcripción | Herramienta de la videollamada o de grabación (Google Meet, Whisper…) | Texto de la reunión | Drive del fundador. **Nunca en este repositorio**: son datos personales |
| 3. Anonimizar | Fundador o script | Transcripción sin nombres, teléfonos ni emails de terceros | Drive |
| 4. Análisis | Agente **Consultor** (`.claude/agents/consultor.md`) | Dolores con sus cuentas, empleados de la carta, agentes a medida y estructura del presupuesto | Drive |
| 5. Revisión | Fundador | Propuesta corregida y precios puestos | Drive |
| 6. Propuesta al cliente | Fundador | Documento o segunda reunión de 20 min | — |
| 7. Aprendizaje | Fundador | Los agentes a medida que piden 2–3 clientes pasan a la carta | `empresa/oferta.md` |

**El fundador revisa siempre la propuesta antes de enviarla** (paso 5), al menos durante los 10 primeros clientes. La
reunión es también venta: el agente prepara, la persona cierra.

## Grabar la reunión: permiso

- **Al empezar, se pide permiso para grabar** y se explica para qué: preparar la propuesta. Sin permiso, el fundador
  toma notas y el agente trabaja con las notas.
- La grabación y la transcripción se borran cuando se cierra la propuesta. Se guarda solo el análisis.
- *Pendiente:* añadirlo a la política de privacidad (`legal/`).

## Guion de la reunión (para que el agente tenga material)

1. **El negocio:** a qué se dedica, cuántas personas son, cuántos clientes tiene y cuánto vale uno al mes o al año.
2. **Un día normal del dueño:** qué hace de 9 a 21 que no es su trabajo principal.
3. **Los clientes:** por dónde llegan, cuántos preguntan y no compran, cuántos se van y si alguien les escribe.
4. **Herramientas:** programa de reservas o de gestión, WhatsApp, email, redes, hojas de cálculo.
5. **La tarea que más odia** y cuántas horas a la semana le quita.
6. **Qué ha probado ya** (incluida la IA) y por qué no funcionó.
7. **Qué sería un éxito dentro de 3 meses**, en horas o en euros.

## Cómo se cobra

Lo que propone el fundador encaja con `empresa/oferta.md`:

- **Integración (una vez) por agente:** los de la carta tienen precio de tabla; los hechos a medida, presupuesto aparte.
- **Mantenimiento mensual por agente:** la revisión, con la cuota base (Encargado, informe y supervisión).
- **Variable** solo donde se pueda medir: altas y clientes recuperados.

## Por qué el tiempo de implementación baja con cada cliente

- Cada agente a medida es un **candidato a la carta**. Si lo piden 2–3 clientes, se convierte en ficha de puesto,
  plantillas y conexiones reutilizables.
- Cada conexión nueva con un programa (de reservas, de facturación, un CRM) se construye una vez y sirve para los
  siguientes clientes.
- **Nunca llega del todo a 0:** siempre quedan sus datos (horarios, precios, tono), dar de alta sus cuentas y la revisión
  de las dos primeras semanas. Objetivo: menos de 1 hora desde el cliente 20.
- **Métrica:** la tasa de reutilización (decisión 0007), es decir, el % de agentes y conexiones de cada cliente que ya
  existía. El Consultor la estima en cada análisis.
