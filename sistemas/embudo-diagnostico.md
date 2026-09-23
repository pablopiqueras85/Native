# Embudo de diagnóstico

- **Fecha:** 2026-09-23
- **Estado:** diseño. V0 por construir.
- **Idea asociada:** [0001 — Agente comercial para estudios boutique](../exploracion/ideas/0001-agente-comercial-estudios-boutique.md)

## Qué es

El primer equipo de agentes de la empresa, para uso propio. El potencial cliente responde un
cuestionario; los agentes elaboran un diagnóstico personalizado con soluciones y precio; el fundador
lo revisa, y el cliente agenda una reunión directamente.

Cumple dos funciones a la vez:

1. **Validar la idea:** cuántos responden, qué dolores aparecen y cuántos agendan una reunión.
2. **Ser la demo:** el seguimiento automático a quien no agenda es exactamente el servicio que vendemos.
   Si el embudo convierte bien, es la mejor prueba de venta.

## Flujo

```
Cliente misterioso ─► Primer contacto ─► Landing ─────────► Cuestionario ─► Ficha del prospecto
(medir respuesta)     (en persona o por     (calculadora       (5 minutos)
                       teléfono: pedir       privada y
                       permiso para enviar   mensaje libre)
                       el enlace)
                                                              │
    ┌─────────────────────────────────────────────────────────┘
    ▼
Investigador ─► Analista ─► Propuesta ─► Precio ─► REVISIÓN DEL FUNDADOR ─► Envío del informe
                                                                            + enlace de agenda
                                                                                    │
                                                  Reunión o "no" claro ◄─ Seguimiento
```

## Equipo de agentes

| Agente | Recibe | Entrega |
|---|---|---|
| **1. Investigador** | Nombre y web del centro | Ficha pública: tipo de centro, servicios y precios publicados, horarios, reseñas, redes y resultado del cliente misterioso |
| **2. Analista** | Respuestas del cuestionario, datos de la landing (si los compartió) y ficha pública | Dolores detectados, ordenados por dinero en juego y horas de trabajo manual, con las cuentas a la vista y hechas con los datos del propio cliente |
| **3. Propuesta** | Dolores y [`empresa/oferta.md`](../empresa/oferta.md) | Servicios del catálogo que resuelven cada dolor y un piloto de 30 días con su forma de medirlo |
| **4. Precio** | Propuesta y tabla de precios de `empresa/oferta.md` | Presupuesto personalizado. Solo usa precios de la tabla |
| **5. Seguimiento** | Informe enviado | Mensajes de seguimiento hasta que agende o diga que no. Avisa al fundador de cada respuesta |
| **Fundador** | Informe completo | Lo revisa y aprueba antes de enviarlo. Siempre, al menos en V0 y V1 |

## El informe que recibe el cliente

1. **Tres hallazgos clave** sobre cómo capta, atiende y retiene clientes.
2. **Lo que está en juego:** estimación en €/mes y en horas de trabajo manual, con sus propios datos y la fórmula a la vista.
3. **Comparativa** con los demás centros encuestados (a partir de 10 respuestas).
4. **Soluciones propuestas,** por prioridad.
5. **Piloto de 30 días:** qué se hace y cómo se mide el resultado.
6. **Precio.**
7. **Agendar reunión:** Google Meet, Teams, llamada o WhatsApp, a elección del cliente.

**La recompensa por responder es el propio informe:** un diagnóstico personalizado y una comparativa
con otros centros. No cuesta dinero y vale más cuantas más respuestas hay (*hipótesis*: comprobar
si basta como incentivo o hace falta algo más).

## Plan por versiones

### V0: manual con herramientas sin código (objetivo: construirla en 1 semana)

| Pieza | Herramienta |
|---|---|
| Landing con calculadora | [`landing/`](../landing/README.md): hecha. Falta pegar los enlaces y publicarla |
| Cuestionario | Tally, con campos ocultos para recibir los datos de la landing (ver [`cuestionario-diagnostico.md`](cuestionario-diagnostico.md)) |
| Fichas de prospectos | Google Sheets o Airtable. **Nunca en este repositorio:** son datos personales |
| Agentes 1–4 | Prompts ejecutados a mano con Claude sobre cada ficha |
| Agenda | Calendly o Cal.com, con Google Meet, Teams o llamada |
| Envío y seguimiento | Email o WhatsApp a mano |

**Pasar a V1 cuando haya:** al menos 10 cuestionarios completos y 3 reuniones.

### V1: automatizada

- Un flujo con n8n o Make (o una app construida en el curso de AI Builder) encadena: formulario →
  agentes vía API → informe en PDF → envío → seguimiento.
- El fundador sigue aprobando cada informe, con un clic.

## Métricas de validación

| Métrica | Umbral de éxito (*hipótesis*) |
|---|---|
| Contactados que completan el cuestionario | ≥ 30 % (con contacto previo en persona o por teléfono) |
| Informes enviados que acaban en reunión | ≥ 30 % |
| Reuniones que aceptan un piloto | ≥ 1 de cada 3 |

Las respuestas al cuestionario no son el objetivo. Lo que valida la idea son **reuniones y pilotos aceptados**.

## Reglas

- **Pedir permiso antes de enviar:** la LSSI prohíbe comunicaciones comerciales por email o WhatsApp
  no solicitadas ([AEPD](https://www.aepd.es/documento/2018-0164.pdf)). Primero se habla en persona o por
  teléfono y se pregunta si se puede enviar el cuestionario.
- **RGPD:** aviso de privacidad y consentimiento en el cuestionario. Los datos de prospectos viven en la
  herramienta de fichas, nunca en Git.
- **Avisar de que es una IA** cuando el seguimiento lo haga un agente
  ([Reglamento Europeo de IA, art. 50](https://artificialintelligenceact.eu/article/50/)).
- **Revisión humana de cada informe:** un informe con errores quema al prospecto para siempre.
- **No prometer lo que no se pueda medir** en el piloto.
