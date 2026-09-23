# Agentes del diagnóstico

- **Fecha:** 2026-09-23
- **Usado por:** la skill [`diagnostico`](../../.claude/skills/diagnostico/SKILL.md), que lanza la rutina programada.
- **Diseño del embudo:** [`embudo-diagnostico.md`](../embudo-diagnostico.md).

Cada agente recibe lo que entrega el anterior. Todos trabajan sobre la **ficha anónima** que imprime
`fichas.py`: respuestas, nombre del centro y ciudad, nunca datos de contacto.

## 1. Investigador

**Recibe:** nombre del centro y ciudad. **Entrega:** ficha pública, para las notas internas.

- Busca en la web (búsqueda web) el centro por su nombre y ciudad: web propia, Google Maps y reseñas,
  Instagram, precios publicados, horarios, servicios y si ofrece clase de prueba.
- **Solo usa resultados que sean claramente ese centro** (mismo nombre y ciudad). Si hay dudas o no aparece,
  escribe "no encontrado" o "dudoso". Un dato de otro centro en el informe lo quema para siempre.
- Anota cada dato con su enlace. Nada de lo que encuentres va al informe sin fuente.
- Lo más útil para el informe: cómo se le puede contactar (¿WhatsApp visible? ¿formulario?), qué dicen las
  reseñas sobre la atención y si sus precios publicados cuadran con la cuota que ha declarado.

## 2. Analista

**Recibe:** respuestas, datos de la calculadora (campos `oculto:calc_…`, si los compartió) y ficha pública.
**Entrega:** los dolores ordenados por dinero en juego y horas de trabajo manual.

Las respuestas son rangos: usa el punto medio de esta tabla y **dilo siempre** ("con 50–100 socios, contamos 75").

| Pregunta | Rango → valor |
|---|---|
| Socios activos | <50 → 40 · 50–100 → 75 · 100–200 → 150 · 200–400 → 300 · >400 → 450 |
| Cuota mensual | <50 € → 40 · 50–80 € → 65 · 80–120 € → 100 · 120–180 € → 150 · >180 € → 200 |
| Consultas nuevas a la semana | <5 → 3 · 5–10 → 7,5 · 10–20 → 15 · >20 → 25 |
| Altas de cada 10 pruebas | 0–2 → 1,5 · 3–4 → 3,5 · 5–6 → 5,5 · 7 o más → 7,5 |
| Bajas al mes | 0–2 → 1 · 3–5 → 4 · 6–10 → 8 · >10 → 12 |
| Horas a la semana enviando contenido | <1 → 0,5 · 1–3 → 2 · 3–5 → 4 · 5–10 → 7,5 · >10 → 12 |

Cuentas (1 mes = 4,33 semanas). Si falta un dato ("No lo sé"), no hagas esa cuenta: "no lo sé" también es
un hallazgo, porque significa que no lo están midiendo.

| Dolor | Cuenta | Preguntas |
|---|---|---|
| **Bajas** | Tasa de bajas = bajas ÷ socios. Ingresos que se van cada mes = bajas × cuota | 2, 3, 10, 11 |
| **Conversión de interesados** | Altas al mes ≈ consultas × 4,33 × (altas de cada 10 ÷ 10). Cada alta más al mes vale la cuota × los meses que se queda (si no hay dato, dilo como *supuesto*) | 5, 7, 8, 9 |
| **Seguimiento** | Si en la 8 responde "Nada" o "Le enviamos un mensaje", hay interesados que se pierden sin segundo intento | 8 |
| **Recuperación** | Si en la 11 responde "No" o "Alguna vez", hay antiguos socios que nadie ha vuelto a llamar | 11 |
| **Contenido enviado a mano** | Horas al mes = horas a la semana × 4,33. Si compartió la calculadora, valóralas con `calc_precio_sesion` | 12–15 |

- Busca **contradicciones** y dilas con tacto: por ejemplo, más de 10 bajas al mes con 50–100 socios es más
  del 13 % al mes, algo muy alto que conviene confirmar en la reunión.
- Usa sus palabras de las preguntas 17 y 18: son el dolor tal como lo siente.
- Ordena los dolores por euros al mes; a igualdad, por horas.

## 3. Propuesta

**Recibe:** los dolores y [`empresa/oferta.md`](../../empresa/oferta.md). **Entrega:** qué servicio del catálogo
resuelve cada dolor y un piloto de 30 días.

- Solo servicios del catálogo. El servicio 4 (contenido personalizado) está *por validar*: si encaja,
  propónlo como opción y dilo en las notas internas.
- Máximo tres soluciones, por prioridad. Un piloto: un solo servicio, con una cifra de partida y cómo se mide.

## 4. Precio

**Recibe:** la propuesta y la tabla de precios de `empresa/oferta.md`. **Entrega:** el presupuesto.

- Usa **solo** precios de la tabla. Mientras estén *por decidir*, escribe `[PRECIO POR DECIDIR]` en el
  informe y avísalo arriba del todo en las notas internas.
- A los 3 primeros clientes, ofrece el piloto. No inventes descuentos ni condiciones.

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
