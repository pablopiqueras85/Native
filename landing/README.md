# Landing: Horas fuera de sala

Primera pieza del [embudo de diagnóstico](../sistemas/embudo-diagnostico.md). Es una página estática
(`index.html`) con una calculadora que convierte las horas de trabajo manual de un estudio en facturación
equivalente, una caja de texto para que el dueño cuente qué le gustaría automatizar y un botón que lleva
al cuestionario.

- **Vista previa privada:** https://claude.ai/artifact/RSBDcBMg1jU1fvYWmJ8Ccp

## Cómo funciona la privacidad

- La calculadora hace las cuentas **en el navegador del visitante**. La página no envía nada a ningún
  servidor, no usa cookies ni analítica, y las fuentes se sirven desde la propia carpeta (`fuentes/`),
  no desde Google.
- Las cifras **solo** salen del navegador si el visitante **marca** la casilla "Quiero que estas cifras se
  incluyan en mi diagnóstico". Por defecto está desmarcada: el RGPD exige protección de datos por defecto
  (art. 25) y no admite casillas premarcadas ni el silencio como consentimiento (considerando 32)
  ([texto del RGPD](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)).
- El mensaje de la caja de texto sí se envía siempre, y la página lo dice claramente.
- Antes de ver lo que se va a enviar, el visitante puede leerlo en el recuadro "Se enviará con tu cuestionario".

## Qué hay que configurar antes de publicarla

1. **Crear el cuestionario en Tally** (ver [`sistemas/cuestionario-diagnostico.md`](../sistemas/cuestionario-diagnostico.md))
   y añadirle estos **campos ocultos** (*hidden fields*), que la landing rellena por la URL:
   `origen`, `nota`, `calc_horas_manuales`, `calc_facturacion_mensual`, `calc_horas_totales`,
   `calc_precio_sesion`, `calc_coste_mensual`.
2. **Pegar los enlaces** en el bloque `CONFIG` al principio del `<script>` de `index.html`:
   - `cuestionarioUrl`: el enlace público del formulario de Tally.
   - `privacidadUrl`: la política de privacidad (debe mencionar Tally y el alojamiento de la web).
   Mientras `cuestionarioUrl` esté vacío, el botón muestra un aviso de vista previa en lugar de navegar.
3. **Publicarla** en cualquier alojamiento de páginas estáticas (por ejemplo, Netlify o Cloudflare Pages,
   subiendo la carpeta `landing/` completa).

## Cómo se calcula

| Resultado | Fórmula |
|---|---|
| Horas manuales al mes | horas manuales a la semana × 4,33 |
| Valor medio de la hora | facturación mensual ÷ (horas trabajadas a la semana × 4,33) |
| Facturación equivalente al mes | horas manuales al mes × valor medio de la hora |
| Lo que deja de ganar al mes | horas manuales al mes × precio de una sesión de una hora (si tuviera clientes para llenarlas) |

Los valores que aparecen al abrir la página son de ejemplo y están marcados como tales.

## Fuentes tipográficas

Barlow Condensed y Figtree, ambas con licencia SIL Open Font License 1.1, que permite incrustarlas y
redistribuirlas con la página.
