# Equipo interno: los agentes que trabajan para el fundador

- **Fecha:** 2026-10-01
- **Estado:** en montaje.
- **Idea:** aplicar a Native Crew lo mismo que se vende a los clientes. Cada agente interno es también una prueba en casa.

El fundador tiene un trabajo a jornada completa. Su tiempo va a lo que solo puede hacer él: hablar con dueños, vender
y decidir. Lo demás lo preparan los agentes; **ninguno envía nada en su nombre**.

## El equipo

| Agente | Archivo | Qué le quita | Cuándo | Estado |
|---|---|---|---|---|
| **Cofundador virtual** | `.claude/agents/cofundador.md` | Ordenar la semana, recordar, retar ideas nuevas y repartir trabajo | Cada lunes y cuando se le llame | Creado (2026-10-01) |
| **Seguimiento comercial** | `.claude/agents/seguimiento-comercial.md` | Acordarse de a quién escribir y redactar el mensaje | Cada mañana | Creado (2026-10-01) |
| **Investigador** | `.claude/agents/investigador.md` | Preparar cada conversación con un dueño | Antes de cada reunión | En uso (diagnóstico) |
| **Consultor** | `.claude/agents/consultor.md` | Convertir una reunión o un formulario en una propuesta | Después de cada reunión | Creado |
| **Diagnóstico** (Analista, Propuesta, Precio) | `.claude/agents/` | Informe para quien rellena el formulario | Al llegar una respuesta | Rutina en pausa |
| **Auditor de agentes** | — | Comprobar si un agente encuentra el precio y reserva en la web de un negocio | Bajo demanda | Pendiente (piloto de auditoría) |
| **Radar** | — | Resumir novedades sin perder el foco | Una vez por semana | Pendiente. De momento lo hace el cofundador |
| **Contenido** | — | Borradores de textos y piezas | Bajo demanda | Más adelante |

## Reglas del equipo
Son las mismas que se aplicarán a los clientes:

- **Las 5 pruebas:** una tarea propia, sus fuentes, su forma de trabajar, un límite de permiso y un horario o detonante.
- **Ley de la reversibilidad:** leer, analizar y redactar, libre. Enviar, publicar o cambiar datos, siempre el fundador.
- **Datos personales fuera del repositorio.** La lista de conocidos vive en la hoja de fichas. A los agentes solo les
  llega lo que necesitan, sin teléfonos ni emails.
- **Regla contra el ruido:** ninguna novedad cambia el plan hasta tener 10 conversaciones con dueños.

## La hoja de conocidos (en Google Sheets, nunca aquí)

Columnas propuestas:

| Columna | Ejemplo | ¿Llega a los agentes? |
|---|---|---|
| Alias | "Marta (pilates)" | Sí |
| Teléfono / email | — | **No** |
| Negocio y sector | Estudio de pilates · fitness boutique | Sí |
| Cómo nos conocemos | Excompañera de trabajo | Sí |
| Tipo de cliente (1–4) | 1 · local con citas | Sí |
| Estado | sin contactar / primer mensaje / respondió / reunión agendada / reunión hecha / propuesta enviada / piloto / cliente / no ahora / no | Sí |
| Último contacto | AAAA-MM-DD | Sí |
| Empleado que le encajaría | Recuperador | Sí |
| Notas | "abrió segundo local en junio" | Sí, si no hay datos sensibles |

## Cómo se usa
- **Ahora:** se les llama desde Claude Code ("cofundador, ¿qué toca esta semana?").
- **Después:** rutinas con horario, el lunes para el cofundador y cada mañana para el seguimiento, que dejan el
  resultado en Drive. Se crean cuando el fundador lo confirme.
