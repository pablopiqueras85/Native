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
| WhatsApp (Meta) | Desde 2026-10-01 las respuestas ya no son gratis sin límite: **1.000 mensajes de servicio gratis al mes por número**; a partir del 1.001, 0,0166 €/mensaje en España. Las plantillas de utilidad (recordatorios, cobros) se cobran desde el primer mensaje (0,0166 €) y las de marketing a 0,0585 € ([Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing), [Simla](https://www.simla.com/blog/nueva-tarificacion-whatsapp-business-api), [Infobae](https://www.infobae.com/tecno/2026/09/06/whatsapp-business-cobrara-por-responder-mensajes-en-2026-a-quienes-afecta-y-a-quienes-no/)). Estudio pequeño: casi todo dentro de los 1.000 gratis; las campañas y recordatorios sí cuentan. La cuenta es del cliente, así que Meta le factura a él | 10–25 |
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
| Montaje | 300–900 € una vez, según la cadena; lo a medida, aparte (gratis para los 3 primeros) |
| Piloto 30 días (3 primeros) | Sin montaje ni cuota base, solo el variable |

Ejemplo: primera cadena Cuidar (base + agentes 3 y 8) ≈ 195 €/mes. Referencia: los chatbots para gimnasios cuestan
150–400 €/mes ([Javadex](https://www.javadex.es/blog/ia-para-gimnasios-automatizar-gestion-precios-2026), *no verificado*).

## El montaje: curva de aprendizaje

Modelo híbrido aceptado por el fundador el 2026-09-30: **montaje + cuota mensual + variable** (ver `empresa/oferta.md`).

- Cada implementación parecida abarata la siguiente. Se reutilizan:
  - las plantillas;
  - el conector con cada programa de reservas (Mindbody, Harbiz, Excel…), que se construye una vez por programa;
  - la configuración generada desde el diagnóstico (A5).
- **Nunca llega a cero del todo.** Quedan los datos propios de cada estudio (horarios, precios, tono), el alta y la
  verificación de su número en WhatsApp con Meta, y la revisión de las dos primeras semanas. Objetivo: menos de 1 hora
  de montaje por cliente a partir del cliente 20 (*hipótesis*).
- **El precio del montaje no baja con las horas:** se cobra por lo que vale para el estudio. La diferencia es margen.
- **Métrica:** horas de montaje por cliente, apuntadas en cada implementación.

Efecto en los números: con 3–4 montajes al mes a ~600 €, entran unos 1.800–2.400 €/mes extra mientras se crece hacia
los 50 clientes. Son justo los meses en que las cuotas todavía son pocas.

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
