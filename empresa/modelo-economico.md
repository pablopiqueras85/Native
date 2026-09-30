# Modelo económico

- **Fecha:** 2026-09-30
- **Estado:** borrador. **Todo es *hipótesis*** salvo los datos con fuente. Se afina con las 10 primeras conversaciones
  (decisión 0005): socios por estudio, bajas al mes, cuota media y disposición a pagar.
- **Relacionado:** `empresa/oferta.md` (qué se vende y cómo se combina), `sistemas/equipo-digital/` (cómo se supervisa).

## Lo que vale para el estudio (el ancla)

- Cuota de pilates reformer en Madrid: 100–220 €/mes, a menudo unos 180 €
  ([ReformerFinder](https://reformerfinder.com/madrid-reformer-pilates)). En Valencia, *hipótesis*: 80–150 €.
- Un socio recuperado que se queda 6 meses ≈ 500–900 € para el estudio.
- Argumento de venta: *"si te recupero un socio al mes, el servicio se paga solo"*. Se demuestra en el piloto.

## Coste por cliente al mes (estudio de ~100–150 socios)

| Concepto | Cálculo | €/mes |
|---|---|---|
| Modelo de IA | ~600 respuestas o seguimientos, céntimos cada una | 20–30 (*hipótesis*) |
| WhatsApp (Meta) | Respuestas a quien escribe: gratis. Utilidad 0,0166 €/mensaje, marketing 0,0585 €/mensaje en España desde 2026-10-01 ([Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing), [Agencia Reinicia](https://www.agenciareinicia.com/en/blog/whatsapp-business-api-price-changes-in-october-2026-what-this-means-for-your-bill/)) | 10–15 |
| Proveedor de WhatsApp + alojamiento | Cuota del proveedor y servidor | 30–60 (*por verificar*) |
| Supervisión del fundador | 1–2 h/mes al principio; objetivo 15–20 min con `sistemas/equipo-digital/` | 40–80 → 10–15 |

**Lo caro no es la IA, es la supervisión.** Por eso la supervisión automática (sistemas/equipo-digital) va desde el
primer cliente: decide si el negocio pasa la prueba del doble.

## Precios propuestos (a validar; la tabla oficial sigue en `empresa/oferta.md`)

| Concepto | Propuesta |
|---|---|
| Base (conexiones, supervisión, informe) | 99 €/mes |
| Cada agente | 49–79 €/mes |
| Variable (Captar y Recuperar) | 30–50 € por socio conseguido o recuperado |
| Descuento por cadena | 10–15 % |
| Montaje | 150–300 € una vez (gratis para los 3 primeros) |
| Piloto 30 días | Sin cuota base, solo el variable |

Ejemplo: primera cadena Cuidar (base + agentes 3 y 8) ≈ 195 €/mes. Referencia: los chatbots para gimnasios cuestan
150–400 €/mes ([Javadex](https://www.javadex.es/blog/ia-para-gimnasios-automatizar-gestion-precios-2026), *no verificado*).

## Escenarios con 50 clientes (al mes, sin IVA)

| | Conservador | Medio | Optimista |
|---|---|---|---|
| Ingreso medio por cliente | 150 € | 235 € | 300 € |
| Coste directo por cliente | 80 € | 70 € | 90 € |
| Margen × 50 | 3.500 € | 8.250 € | 10.500 € |
| Gastos fijos (autónomo, gestoría, herramientas, seguro, marketing) | −1.000 € | −1.000 € | −1.200 € |
| **Beneficio antes de impuestos** | **2.500 €** | **7.250 €** | **9.300 €** |
| Neto aprox. tras IRPF (tipo efectivo 20–30 %, *a confirmar con gestoría*) | ≈ 2.000 € | ≈ 5.200 € | ≈ 6.500 € |

Avisos:

1. **Bajas de clientes.** Con un 3–5 % mensual (*hipótesis*), hacen falta ~2 clientes nuevos al mes solo para mantenerse en 50.
2. **Tiempo.** A 2–4 clientes nuevos al mes, llegar a 50 lleva 1–2 años.
3. **Nada validado.** El escenario medio depende sobre todo de que el variable funcione (≈ 1 socio recuperado al mes por cliente).

## Palancas para ganar más sin revisar más

**Menos horas por cliente** (se montan desde el primer cliente, ver `sistemas/equipo-digital/`):

- **A1.** Solo se revisan las excepciones: cada agente escala lo que no debe decidir solo.
- **A2.** Un agente supervisor revisa a los demás. Antes de cada envío, un "portero" automático bloquea lo que incumple las reglas.
- **A3.** Los mensajes salen de una biblioteca de plantillas aprobadas, no se escriben desde cero.
- **A4.** Supervisión decreciente: se revisa todo al principio y se pasa a muestreo cuando el error medido baja del umbral.
- **A5.** El montaje sale de las respuestas del diagnóstico.
- **A6.** El dueño aprueba las decisiones de negocio con un botón Sí/No.

**Más ingresos por las mismas horas:**

- **B1.** Variable por resultado.
- **B2.** Clientes más grandes (más socios, varias sedes).
- **B3.** Ampliar la cascada en clientes que ya están.
- **B4.** Contratos anuales.
- **B5.** Más adelante: licencias a consultores o revendedores, o versión autoservicio.

**Objetivo:** 15–20 minutos de supervisión por cliente al mes (50 clientes ≈ 15 h/mes).
