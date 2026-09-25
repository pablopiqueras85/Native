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
| 4. Precio | [`precio.md`](../../.claude/agents/precio.md) | Solo lectura | Propuesta y `empresa/oferta.md` | Presupuesto |

Para cambiar cómo trabaja un agente, edita su archivo en `.claude/agents/`.

## Plantilla del informe (para el centro)

Tuteo, frases cortas, sin jerga técnica ni palabras como "agente" o "automatización" si hay una más clara.
Una o dos páginas. Firmado por el fundador.

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
1. **{Servicio}:** {qué hace, en una frase, y qué dolor resuelve}.
2. …

## Una prueba de 30 días
{Qué se hace, con qué cifra se empieza y cómo se mide.}

## Precio
{Del agente de precios.}

## ¿Lo comentamos?
{Si en la pregunta 21 dijo "Sí": propón la llamada de 20 minutos con el enlace de agenda [ENLACE DE AGENDA].
Si dijo "Prefiero solo el informe": ofrécela sin insistir.}

Pablo Piqueras
```

## Notas internas (para el fundador)

1. **Avisos:** precios por decidir, datos dudosos, contradicciones, si parece una respuesta de prueba.
2. **Ficha pública del Investigador**, con enlaces.
3. **Supuestos** de cada cuenta.
4. **Antes de enviar, comprueba:**
   - [ ] Cada cifra cuadra con sus respuestas.
   - [ ] Ningún dato de la ficha pública es de otro centro.
   - [ ] No quedan `[PRECIO POR DECIDIR]` ni `[ENLACE DE AGENDA]`.
   - [ ] El tono es el tuyo: lo firmas tú.
