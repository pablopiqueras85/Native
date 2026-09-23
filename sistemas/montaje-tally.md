# Montar el formulario en Tally

- **Fecha:** 2026-09-23
- **Qué se monta:** el [cuestionario de diagnóstico](cuestionario-diagnostico.md), conectado a la
  [landing](../landing/README.md) y a una hoja de Google Sheets que hace de ficha de prospectos.
- **Por qué Tally:** es gratis con campos ocultos, lógica condicional e integración con Google Sheets, y
  guarda los datos en la UE ([campos ocultos](https://tally.so/help/hidden-fields),
  [lógica condicional](https://tally.so/help/conditional-form-logic),
  [Google Sheets](https://tally.so/help/google-sheets-integration), [RGPD](https://tally.so/help/gdpr)).

## Opción automática

Si el entorno tiene acceso a `api.tally.so` y la clave de la API de Tally en la variable `TALLY_API_KEY`,
Claude puede crear el formulario completo por API siguiendo esta guía (la API de Tally es gratuita,
[fuente](https://tally.so/help/api)). El fundador solo tiene que conectar Google Sheets (paso 5), porque
exige entrar con su cuenta de Google.

## Antes de empezar

- [ ] Cuenta en [tally.so](https://tally.so).
- [ ] Política de privacidad publicada: completa el [borrador](../legal/politica-privacidad.md) y publícalo
      (por ejemplo, como una página de Tally sin preguntas o una página pública de Notion). Necesitas su enlace
      para la pregunta 22.

## Paso 1. Crear el formulario

1. **Create form** → formulario en blanco.
2. **Título:** `Diagnóstico comercial de tu estudio`
3. **Texto de entrada** (debajo del título):

   > Responde unas preguntas sobre cómo captas, atiendes y retienes clientes y te enviaré un diagnóstico
   > personalizado: dónde se te escapan clientes, cuánto dinero supone al mes, cuántas horas de trabajo manual
   > te podrías quitar y cómo compara tu estudio con otros centros como el tuyo. Son 5 minutos y sin compromiso.

## Paso 2. Campos ocultos

Escribe `/hidden` y añade estos siete nombres, **exactamente así, en minúsculas** (Tally distingue
mayúsculas y minúsculas):

```
origen
nota
calc_horas_manuales
calc_facturacion_mensual
calc_horas_totales
calc_precio_sesion
calc_coste_mensual
```

La landing los rellena por la URL. Si alguien entra directamente al formulario, llegan vacíos.

## Paso 3. Preguntas

Separa cada bloque en una página nueva con `/page` (*page break*). Tipos de bloque de Tally:

- **Opción única:** *Multiple choice*.
- **Varias opciones:** *Checkboxes*.
- **Texto corto:** *Short answer*. **Texto largo:** *Long answer*.

Marca como obligatorias las preguntas indicadas.

### Página 1 · Tu centro

| # | Pregunta | Bloque | Opciones | Obligatoria |
|---|---|---|---|---|
| 1 | ¿Qué tipo de centro tienes? | Multiple choice | Pilates reformer · Pilates suelo · Entrenamiento personal · Funcional o cross-training · Fisioterapia · Otro | Sí |
| 2 | ¿Cuántos socios activos tienes al mes? | Multiple choice | Menos de 50 · 50–100 · 100–200 · 200–400 · Más de 400 | Sí |
| 3 | ¿Cuál es la cuota media mensual por socio? | Multiple choice | Menos de 50 € · 50–80 € · 80–120 € · 120–180 € · Más de 180 € | Sí |
| 4 | ¿Quién responde WhatsApp, teléfono y redes? | Multiple choice | Yo · Un recepcionista · Varias personas del equipo · Nadie en concreto | Sí |

### Página 2 · Captación

| # | Pregunta | Bloque | Opciones | Obligatoria |
|---|---|---|---|---|
| 5 | ¿Cuántas consultas nuevas recibes a la semana, sumando todas las vías? | Multiple choice | Menos de 5 · 5–10 · 10–20 · Más de 20 · No lo sé | Sí |
| 6 | ¿Por dónde llegan? | Checkboxes | WhatsApp · Instagram · Teléfono · Formulario web · Google · En persona · Plataformas de reservas | Sí |
| 7 | ¿Cuánto soléis tardar en responder a una consulta nueva? | Multiple choice | Menos de 15 minutos · Menos de 1 hora · El mismo día · Al día siguiente o más · Depende del día | Sí |
| 8 | Cuando alguien dice "me lo pienso" o no viene a la clase de prueba, ¿qué hacéis? | Multiple choice | Nada · Le enviamos un mensaje · Varios seguimientos · Tenemos un sistema automático | Sí |
| 9 | De cada 10 personas que hacen una clase de prueba, ¿cuántas se dan de alta? | Multiple choice | 0–2 · 3–4 · 5–6 · 7 o más · No lo sé | Sí |

### Página 3 · Retención

| # | Pregunta | Bloque | Opciones | Obligatoria |
|---|---|---|---|---|
| 10 | ¿Cuántas bajas tienes al mes, aproximadamente? | Multiple choice | 0–2 · 3–5 · 6–10 · Más de 10 · No lo sé | Sí |
| 11 | En los últimos 6 meses, ¿habéis contactado a antiguos socios para que vuelvan? | Multiple choice | No · Alguna vez · De forma sistemática | Sí |

### Página 4 · Lo que envías a tus clientes

| # | Pregunta | Bloque | Opciones | Obligatoria |
|---|---|---|---|---|
| 12 | Además de confirmar citas, ¿qué envías a mano a tus clientes? | Checkboxes | Entrenamientos o rutinas · Pautas de nutrición · Ejercicios para casa · Seguimiento de progreso o mediciones · Recordatorios y mensajes de motivación · Vídeos o explicaciones · Nada | Sí |
| 13 | ¿Por dónde lo envías? | Checkboxes | WhatsApp · Email · PDF · App de entrenamiento · Programa de gestión · Redes sociales | No |
| 14 | ¿Cómo de personalizado es? | Multiple choice | Igual para todos · Por grupos o niveles · Individual para cada cliente | No |
| 15 | ¿Cuántas horas a la semana dedicáis a prepararlo y enviarlo? | Multiple choice | Menos de 1 · 1–3 · 3–5 · 5–10 · Más de 10 · No lo sé | No |

**Lógica condicional:** justo debajo de la pregunta 12, escribe `/logic` y configura:
**si** la pregunta 12 **contiene** "Nada" → **ocultar** las preguntas 13, 14 y 15.

### Página 5 · Herramientas y prioridades

| # | Pregunta | Bloque | Obligatoria |
|---|---|---|---|
| 16 | ¿Qué programa usáis para reservas y gestión? | Short answer | No |
| 17 | ¿Habéis pagado alguna vez a alguien (una persona o una herramienta) para captar o retener clientes? ¿Qué tal fue? | Long answer | No |
| 18 | Si mañana pudieras quitarte de encima una tarea repetitiva con tus clientes, ¿cuál sería? | Long answer | No |

### Página 6 · Para enviarte tu diagnóstico

| # | Pregunta | Bloque | Opciones | Obligatoria |
|---|---|---|---|---|
| 19a | Tu nombre | Short answer | — | Sí |
| 19b | Nombre del centro | Short answer | — | Sí |
| 19c | Ciudad | Short answer | — | Sí |
| 20a | Email | Email | — | Sí |
| 20b | WhatsApp (si prefieres recibirlo por ahí) | Phone number | — | No |
| 21 | ¿Quieres comentar el diagnóstico en una llamada de 20 minutos? | Multiple choice | Sí · Prefiero solo el informe | Sí |
| 22 | Consentimiento | Checkboxes (una sola opción) | "He leído la [política de privacidad](ENLACE) y acepto que se traten mis datos para elaborar y enviarme el diagnóstico." | Sí |

La casilla de la pregunta 22 **no** debe venir marcada.

## Paso 4. Página de agradecimiento

Al final del formulario, añade una página de agradecimiento (*thank you page*) con este texto:

> **¡Gracias!** Ya tengo tus respuestas. Te enviaré tu diagnóstico personalizado en los próximos días.
> Si mientras tanto quieres añadir algo, responde al email en el que te llegue.

Pon un plazo concreto ("en 3 días laborables") solo si puedes cumplirlo siempre con tu trabajo actual.

## Paso 5. Integraciones

1. **Google Sheets** (pestaña *Integrations*): conecta una hoja nueva llamada `Fichas de prospectos`.
   Cada respuesta será una fila, con una columna por pregunta y por campo oculto.
2. **Notificaciones por email** (pestaña *Notifications*): actívalas para enterarte de cada respuesta.

## Paso 6. Ajustes

- **Idioma** del formulario en español, para que los botones no salgan en inglés.
- Publica el formulario y copia su enlace (`https://tally.so/r/XXXXXX`).

## Paso 7. Conectar la landing

En `landing/index.html`, al principio del `<script>`, rellena:

```js
var CONFIG = {
  cuestionarioUrl: "https://tally.so/r/XXXXXX",
  privacidadUrl: "ENLACE A TU POLÍTICA DE PRIVACIDAD"
};
```

O pásale los dos enlaces a Claude y lo hace por ti.

## Paso 8. Probar antes de enviarlo a nadie

| Prueba | Qué comprobar en la hoja de Google Sheets |
|---|---|
| Desde la landing, **sin** marcar la casilla y escribiendo un mensaje | Llegan `origen` y `nota`; las columnas `calc_…` están vacías |
| Desde la landing, **marcando** la casilla | Llegan también las cinco columnas `calc_…` con los valores de la calculadora |
| Entrando directamente al enlace de Tally | Todos los campos ocultos vacíos |
| Marcando "Nada" en la pregunta 12 | Las preguntas 13–15 no aparecen |

Cuando todo cuadre, borra las filas de prueba de la hoja.

## Después: versión para fisioterapia

Duplica el formulario y cambia las palabras según la
[versión para fisioterapia](cuestionario-diagnostico.md#versión-para-fisioterapia) del cuestionario.
