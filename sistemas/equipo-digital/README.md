# Equipo digital: los agentes que trabajan para los clientes

- **Fecha:** 2026-09-30
- **Estado:** diseño. Aún no hay ningún cliente ni ningún agente en marcha.
- **Relacionado:** `empresa/oferta.md` (catálogo y cascadas), `empresa/modelo-economico.md` (por qué la supervisión
  decide si el negocio escala), decisiones 0005 y 0006.

El diagnóstico (`sistemas/diagnostico/`) es un equipo de agentes **para uso propio**. Este es el equipo que trabaja
**para los estudios clientes**: habla con sus socios por WhatsApp. Por eso lleva tres capas de control desde el
primer cliente:

- **A1:** solo se revisan las excepciones.
- **A2:** un supervisor y un portero automático.
- **A3:** los mensajes salen de plantillas aprobadas.

## Piezas

| Pieza | Archivo | Qué es |
|---|---|---|
| Fichas de puesto de los agentes | [`agentes/`](agentes/) | Instrucciones en Markdown neutro, sin nada específico de Claude, OpenAI ni ninguna plataforma |
| Biblioteca de mensajes (A3) | [`plantillas.md`](plantillas.md) | Mensajes aprobados por situación; los agentes solo rellenan huecos |
| Reglas de escalado (A1) | Este archivo, abajo | Cuándo un agente se para y avisa |
| Portero (A2) | [`portero.py`](portero.py) | Revisa cada mensaje **antes** de enviarlo: lo deja pasar, lo bloquea o lo escala |
| Supervisor (A2) | [`agentes/supervisor.md`](agentes/supervisor.md) | Revisa **después** lo que hicieron los agentes y da la métrica de calidad |

## Cómo trabajan (y por qué no dependen de ningún proveedor)

1. **Cada agente es una ficha de puesto en texto plano**, versionada en Git. El motor que la ejecuta (Managed Agents,
   Agents API de OpenAI, n8n…) es intercambiable: si se cambia de proveedor, se cambia el motor, no el agente.
2. **La memoria de cada cliente vive fuera del repositorio:** una ficha de clientes (Google Sheets o Airtable al
   principio) con estado, último mensaje e historial de cada socio. Son datos personales: **nunca van a Git ni a
   Obsidian**. Tienen que poder exportarse en formato estándar (CSV).
3. **La cascada se hace a través de la ficha,** no con agentes hablando entre ellos. Por ejemplo, Seguimiento
   marca "alta" y Primeros 90 días lo recoge.
4. **Todo mensaje pasa por el portero** antes de salir. Lo que el portero no deja pasar no se envía.

## A1 · Reglas de escalado (comunes a todos los agentes)

Un agente **se para y escala** en lugar de responder cuando:

| Situación | A quién escala | Por qué |
|---|---|---|
| El socio está enfadado, se queja o amenaza con irse | Dueño | Relación de confianza: la lleva una persona |
| Menciona salud: lesión, embarazo, dolor, medicación, médico | Dueño | Datos de salud y riesgo físico; nada de consejos |
| Pagos: cobros erróneos, devoluciones, impagos | Dueño | Dinero: lo decide el dueño |
| Pide hablar con una persona | Dueño | Siempre se respeta |
| Pide algo fuera de lo que el agente sabe hacer | Dueño | El agente no improvisa |
| Pide borrar sus datos o no recibir más mensajes ("BAJA") | Automático + fundador | RGPD / LSSI: se marca "no contactar" y se confirma |
| Parece menor de edad | Dueño | No se hace seguimiento comercial a menores |
| Ninguna plantilla encaja con la situación | Fundador | Hueco en la biblioteca: se añade una plantilla, no se improvisa |
| El portero ha bloqueado el mensaje | Fundador | Error del agente o de la plantilla |

- **Al dueño:** decisiones de su negocio. Se le pregunta por WhatsApp con botones Sí/No (plantilla `DUE-01`).
- **Al fundador:** calidad del sistema. Llega a su lista diaria de excepciones.
- **Regla de parada:** tras dos mensajes sin respuesta del socio, el agente deja de escribir. Nunca insiste más.

## A2 · Supervisión decreciente (la métrica)

La métrica es la **tasa de corrección**: qué porcentaje de los mensajes revisados habría que haber cambiado.

| Fase del cliente | Qué se revisa | Cuándo se pasa a la siguiente |
|---|---|---|
| 1. Arranque (semanas 1–2) | El 100 % de los mensajes, antes de enviarse | Al acabar las 2 semanas si la tasa es < 5 % |
| 2. Muestreo alto | El 30 %, después de enviarse, más todas las excepciones | 4 semanas seguidas con tasa < 2 % |
| 3. Muestreo bajo | El 10 %, más todas las excepciones | Se mantiene mientras la tasa sea < 2 % |
| Vuelta atrás | Un error grave (dato falso, tono ofensivo, mensaje a quien pidió BAJA) devuelve el cliente a la fase 1 | — |

El supervisor calcula la tasa y propone el cambio de fase; **el fundador lo aprueba**. Objetivo: 15–20 minutos al mes
por cliente en fase 3.

## Reglas legales que aplican a todos los mensajes

Las comprueba el portero. **Pendiente de revisar con un abogado antes del primer cliente.**

- **Aviso de IA en el primer mensaje** a cada persona (ley europea de IA, artículo 50, en vigor desde 2026-08-02).
- **Opción de baja en los mensajes comerciales** (recuperación de antiguos socios, recomendaciones), por la LSSI.
- **Solo se escribe primero a quien dio permiso** para recibir WhatsApp del estudio (opt-in, norma de Meta). Si no lo dio, no se le escribe.
- **Solo la API oficial de WhatsApp Business** y plantillas aprobadas también por Meta. Meta permite la IA para
  atención, ventas y citas de un negocio, y desde 2026-01-15 prohíbe los asistentes de uso general; en Europa, Meta los vuelve a permitir durante 12 meses desde 2026-03, pagando una tarifa por mensaje ([TechCrunch](https://techcrunch.com/2026/03/05/meta-will-allow-rival-ai-chatbots-on-whatsapp-in-europe-but-for-a-fee/)). Los nuestros son de negocio: no les afecta.
- **Horario:** los mensajes que inicia el estudio salen solo entre las 9:00 y las 21:00.
- **Nada de datos de salud ni de consejos de salud:** se escala.

## Probar el portero

```bash
python3 sistemas/equipo-digital/portero.py sistemas/equipo-digital/ejemplos/mensajes-prueba.json
```

Los ejemplos usan datos inventados. Nunca pongas datos reales de socios en este repositorio.
