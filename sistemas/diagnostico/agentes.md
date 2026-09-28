# Agentes del diagnóstico

- **Fecha:** 2026-09-23
- **Usado por:** la skill [`diagnostico`](../../.claude/skills/diagnostico/SKILL.md), que lanza la rutina programada.
- **Diseño del embudo:** [`embudo-diagnostico.md`](../embudo-diagnostico.md).

Cada agente es un agente independiente de Claude Code, con sus propias instrucciones y solo las herramientas
que necesita. El **coordinador** (la skill `diagnostico`) los lanza por turnos, pasa a cada uno solo lo que
necesita y monta el informe final con la plantilla de abajo. Ninguno recibe datos de contacto.

| Agente | Archivo | Herramientas | Recibe | Entrega |
|---|---|---|---|---|
| 1. Investigador | [`investigador.md`](../../.claude/agents/investigador.md) | Búsqueda web | Nombre del centro y ciudad | Ficha pública con fuentes |
| 2. Analista | [`analista.md`](../../.claude/agents/analista.md) | Solo lectura | Ficha anónima y ficha pública | Dolores con sus cuentas |
| 3. Propuesta | [`propuesta.md`](../../.claude/agents/propuesta.md) | Solo lectura | Dolores y `empresa/oferta.md` | Soluciones y piloto de 30 días |
| 4. Precio (**en pausa**) | [`precio.md`](../../.claude/agents/precio.md) | Solo lectura | Propuesta y `empresa/oferta.md` | Presupuesto |

Para cambiar cómo trabaja un agente, edita su archivo en `.claude/agents/`.

**Precio en pausa (2026-09-28):** por decisión del fundador, el informe sale sin precio y el coste se habla en la
llamada. El agente sigue en su archivo; para reactivarlo, vuelve a añadirlo en el paso 4 de la skill y recupera
la sección "Precio" de la plantilla.

## Plantilla del informe (para el centro)

Tuteo, frases cortas, sin jerga técnica ni palabras como "agente" o "automatización" si hay una más clara.
Una o dos páginas. Firmado por el fundador. Es también el cuerpo del email (decisión 0004): `enviar.py` lo
convierte a HTML y añade al final el enlace a la calculadora de la landing.

```markdown
# Diagnóstico comercial de {centro}

{Una frase: gracias por responder y qué vas a encontrar aquí.}

## Tres cosas que hemos visto
1. **{Hallazgo}.** {Qué pasa, con su dato.}
2. …
3. …

## Lo que está en juego
| Qué | Al mes | Cómo lo calculamos |
|---|---|---|
| {Dolor} | {€ u horas} | {fórmula con sus datos y el punto medio de cada rango} |

Son estimaciones a partir de tus respuestas, que eran rangos. En una llamada las afinamos con tus datos reales.

## Cómo compara tu centro
Cuando tengamos respuestas de al menos 10 centros como el tuyo, te enviaremos la comparativa.

## Qué haríamos
1. **{Agente}:** {qué tarea te quita, en una frase, y qué dolor resuelve}.
2. …

## Una prueba de 30 días
{Qué se hace, con qué cifra se empieza y cómo se mide.}

## ¿Lo comentamos?
{Si en la pregunta 21 dijo "Sí": propón una llamada de 20 minutos; para quedar, que responda a este mensaje.
Si dijo "Prefiero solo el informe": ofrécela sin insistir. En los dos casos, di que en la llamada vemos también
cuánto costaría. Sin enlace de agenda: de momento no hay (fase de demo, 2026-09-28).}

Pablo Piqueras
```

## Notas internas (para el fundador)

1. **Avisos:** datos dudosos, contradicciones, si parece una respuesta de prueba.
2. **Ficha pública del Investigador**, con enlaces.
3. **Supuestos** de cada cuenta.
4. **Antes de enviar, comprueba:**
   - [ ] Cada cifra cuadra con sus respuestas.
   - [ ] Ningún dato de la ficha pública es de otro centro.
   - [ ] No queda ningún hueco entre corchetes ni ninguna cifra de precio.
   - [ ] El tono es el tuyo: lo firmas tú.
