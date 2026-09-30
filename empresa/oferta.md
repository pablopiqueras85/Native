# Oferta y precios

- **Estado:** borrador. **Precios por decidir** con el fundador.
- **Cliente:** estudios boutique de fitness independientes (ver idea 0001).
- **Usado por:** el agente de Propuesta del [embudo de diagnóstico](../sistemas/embudo-diagnostico.md), que
  elige agentes de este catálogo, y el agente de Precio (en pausa).

## Qué vendemos

> **Tú entrenas. Las respuestas, los seguimientos, las rutinas y los recordatorios los hacemos nosotros.**

Quitamos al estudio las tareas manuales con sus clientes y, de paso, recuperamos los clientes que hoy se
le escapan. No es un programa que el dueño tenga que aprender: el trabajo lo hacen nuestros agentes, en los
canales que el estudio ya usa (sobre todo WhatsApp), y el fundador los supervisa.

**Desde 2026-09-30:** se vende como **empleados virtuales en paquetes cerrados** (ver "El producto", abajo) para
cualquier negocio del patrón de la decisión 0007, no solo estudios.

- **Las horas abren la conversación** ("te quitamos estas tareas") y **los euros cierran la venta**
  ("y recuperamos estos clientes"). *Hipótesis:* un dueño paga más fácil por socios que por horas.
- **Frente a Harbiz, Trainingym, Glofox y parecidos:** ellos venden una herramienta que el dueño tiene que
  usar; nosotros, la tarea hecha y medida. Podemos trabajar encima de la herramienta que ya tenga.

## Cómo se vende: a la carta, con sentido (2026-09-30)

Sustituye al modelo de "solo menús" del 2026-09-28. El cliente elige su combinación de agentes, pero dentro de
unas reglas, porque **unos agentes alimentan a otros** y trabajan en cascada.

- **Base (obligatoria):** conexión con sus canales (WhatsApp, programa de reservas), ficha de clientes,
  supervisión del fundador e informe mensual. Todos los agentes beben de estos datos.
- **Agentes a la carta:** cada uno con su precio mensual (tabla de precios, abajo).
- **Requisitos:** un agente no se vende sin el que lo alimenta (tabla de cascadas, abajo).
- **Cadenas:** si el cliente elige varios agentes conectados, pagan menos juntos que sueltos, porque comparten
  datos y montaje (*hipótesis*).
- **El diagnóstico recomienda** una combinación de partida y el presupuesto sale solo de la tabla. El cliente puede
  añadir o quitar agentes respetando los requisitos.
- **Para empezar, una sola cadena** en el piloto de 30 días, para tener un resultado limpio y saber qué ha funcionado.
- **A medida:** lo que no está en el catálogo se cobra aparte (montaje + mensual). Lo que piden 2–3 clientes del
  mismo nicho pasa al catálogo.

Riesgo que se asume (*hipótesis*): demasiadas opciones frenan la decisión de un dueño sin tiempo. Por eso el
diagnóstico siempre llega con una recomendación, y los menús de abajo se mantienen como sugerencias.

### Cascadas: quién alimenta a quién

| Agente | Necesita (requisito) | Alimenta a |
|---|---|---|
| 1. Respuesta a consultas | Base | 2 (interesados) |
| 2. Seguimiento de indecisos | 1 | 3 (altas nuevas) |
| 3. Primeros 90 días | Base | 8 (socios que pasan los 90 días), 10 |
| 4. Rutinas y seguimiento | Base | 11 (datos de progreso) |
| 5. Recordatorios y renovaciones | Base | 6 (bonos que no se renuevan) |
| 6. Recuperación de antiguos socios | Base | 3 (los que vuelven empiezan de nuevo) |
| 7. Recomendaciones | 10 (sabe quién está contento) | 2 (recomendados que piden información) |
| 8. Socios en riesgo | Base con datos de asistencia | 6 (los que se van igualmente), aviso al dueño |
| 9. Cambios y cancelaciones | Base con programa de reservas | — |
| 10. Opinión y alerta temprana | Base | 7 (contentos), 8 y aviso al dueño (descontentos) |
| 11. Resumen de progreso | 4, o datos que apunte el entrenador | 8 (motiva a quedarse, *hipótesis*) |

La cascada completa: **interesado → cliente → cliente que se queda → cliente que recomienda → nuevo interesado**,
y los que se van vuelven a entrar por la recuperación.

### El producto: empleados virtuales (2026-09-30)

Lo que se vende son **empleados virtuales**: paquetes cerrados de agentes, cada uno con su **ficha de puesto** (qué
tareas le quita al dueño), su **métrica** y su **precio**. Sustituyen a los menús Captar, Cuidar y Recuperar.

- **Qué nos separa de la "IA genérica para todos":** no hacemos proyectos a medida con alcance abierto. El cliente
  contrata un puesto cerrado.
- **El mismo empleado sirve en todos los sectores del patrón** (decisión 0007). Lo que cambia es el uniforme: vocabulario y
  plantillas de `conocimiento/sectores/`.
- **Varios empleados trabajan en equipo:** la cascada de arriba es cómo se pasan el trabajo. La carta sigue existiendo
  para quien quiera ajustar; lo normal es contratar uno o dos empleados.

| Empleado virtual | Tareas que le quita al dueño | Agentes | Métrica | Estado |
|---|---|---|---|---|
| **Recepcionista comercial** | Contestar a cada interesado y perseguir a los indecisos hasta el alta o un "no" | 1 + 2 (+ 9 cuando se valide) | Altas de interesados que antes se perdían | Ofrecido |
| **Responsable de clientes** | Estar pendiente de los nuevos y de quien deja de venir | 3 + 8 (+ 10, 11 y 4 cuando se validen) | Bajas evitadas | Ofrecido (3); 8 por validar |
| **Recuperador** | Escribir a quien se fue | 6 (+ 5 cuando se valide) | Clientes recuperados | Ofrecido |
| **Administrativo** | Recordatorios de pago, bonos que caducan, papeles para la gestoría | 5 + agentes nuevos por definir | Horas liberadas y cobros recuperados | **Por validar** |
| **Responsable de comunicación** | Pedir reseñas, avisos generales, recomendaciones | 10 + 7 | Reseñas y altas por recomendación | **Por validar** |
| **Encargado** (incluido en la base) | Revisar el trabajo de los demás y dar el informe mensual | Supervisor (`sistemas/equipo-digital/agentes/supervisor.md`) | Tasa de corrección | Siempre |

Regla honesta de comunicación: son "empleados" como metáfora de venta para el dueño. Ante sus clientes, los agentes
**siempre dicen que son una IA** (ley europea de IA, artículo 50) y nunca se hacen pasar por una persona.

## Catálogo de agentes

Cada agente se encarga de **una tarea manual** y tiene **una métrica** (principio 8).

| Agente | Tarea que le quita al estudio | Qué hace | Cómo se mide | Estado |
|---|---|---|---|---|
| **1. Respuesta a consultas** | Contestar a cada interesado | Responde en minutos por WhatsApp, Instagram o la web y propone la clase de prueba | Tiempo de respuesta y clases de prueba agendadas | Ofrecido. Solo no se vende: los chatbots ya lo hacen barato. Va con el 2 |
| **2. Seguimiento de indecisos** | Perseguir a quien dice "me lo pienso" o no viene a la prueba | Confirma y recuerda la clase de prueba, pregunta el objetivo antes de venir y hace seguimiento hasta el alta o un "no" claro | Altas conseguidas de interesados que antes se perdían | Ofrecido |
| **3. Primeros 90 días** | Estar pendiente de los socios nuevos | Bienvenida, recordatorios y aviso al estudio cuando un socio nuevo empieza a fallar | Bajas de socios nuevos frente a antes | Ofrecido |
| **4. Envío de rutinas y seguimiento** | Preparar y mandar rutinas, ejercicios para casa y seguimientos | Los prepara y envía a partir de lo que diseña el profesional, que los aprueba antes de enviarlos | Horas liberadas y respuesta de los socios | **Por validar** (compite con Harbiz; ventaja: sin app, en WhatsApp) |
| **5. Recordatorios y renovaciones** | Avisar de citas, bonos que caducan, pagos pendientes y avisos generales (festivos, horarios) | Recuerda y propone la renovación antes de que caduque el bono | Ausencias y bonos renovados | **Por validar** (los programas de gestión ya lo cubren; útil en estudios sin programa) |
| **6. Recuperación de antiguos socios** | Escribir a quien se fue | Mensajes personales a quienes se dieron de baja | Socios recuperados | Ofrecido |
| **7. Recomendaciones** | Pedir recomendaciones a los socios contentos | Pide la recomendación en el momento justo y acompaña al recomendado hasta el alta. Solo contacta al recomendado si él lo pide (LSSI) | Altas por recomendación | **Por validar** |
| **8. Socios en riesgo** | Darse cuenta de quién ha dejado de venir | Vigila a todos los socios: si alguien lleva unas 2 semanas sin venir y sigue pagando, le escribe antes de que se dé de baja | Bajas evitadas entre socios que dejaron de venir | **Por validar** (necesita saber quién viene: programa de reservas o registro a mano) |
| **9. Cambios y cancelaciones** | Reorganizar la agenda por WhatsApp | Propone huecos libres, confirma el cambio y ofrece las plazas liberadas a quien las quería | Cambios gestionados sin el dueño y plazas recolocadas | **Por validar** (útil sobre todo en estudios sin programa de reservas) |
| **10. Opinión y alerta temprana** | Preguntar a los socios qué tal les va | Una pregunta corta al mes: avisa al dueño si alguien está descontento y, si está contento, le pide reseña o recomendación | Descontentos detectados a tiempo y reseñas conseguidas | **Por validar** |
| **11. Resumen de progreso** | Contar a cada socio cómo avanza | Un mensaje al mes con sus sesiones, marcas o evolución | Asistencia y bajas de quienes lo reciben (*hipótesis*: motiva a quedarse) | **Por validar** (necesita que el entrenador apunte los datos) |
| **Informe mensual** (incluido siempre) | Saber qué ha pasado | Resumen de horas liberadas, altas, bajas evitadas e ingresos atribuidos | — | Siempre |

**Qué no ofrecemos:** recepcionista o chatbot genérico (mercado saturado), programa de reservas o gestión,
gestión de reseñas suelta (barato y saturado), publicidad, redes sociales, facturación, horarios de instructores,
fichas de salud o lesiones (datos de salud), pautas de nutrición (datos de salud y posible exigencia de titulación,
*hipótesis*) ni mensajes a interesados antiguos que nunca fueron clientes (LSSI) (ver [`exploracion/nicho-salud-deporte.md`](../exploracion/nicho-salud-deporte.md)).

**Agentes por validar:** solo pasan a "ofrecido" si el cuestionario muestra que muchos estudios pierden
horas o clientes en esa tarea (agente 4: preguntas 12–15 y 18; agente 5 y 7: por medir). *Hipótesis:* el
agente 4 puede reforzar el 3, porque un socio que recibe su plan cada semana tiene más motivos para quedarse.

El fundador diseña los mensajes con cada estudio, revisa las conversaciones cada semana y atiende los
casos que los agentes escalan.

## Estructura de precio (*hipótesis*)

Modelo híbrido (2026-09-30), en tres partes:

1. **Montaje (una vez):** proporcional a la cadena que se monta; lo a medida, aparte. Deja al cliente el sistema a su
   nombre (sus cuentas de WhatsApp y de la ficha, decisión 0006). Filtra al cliente serio y da caja al principio.
2. **Cuota mensual:** base + suma de agentes elegidos − descuento por cadena. Paga la operación y la supervisión.
3. **Variable por resultado** en los agentes que lo permiten (altas en 1–2 y 7; socios recuperados en 6). Es lo que
   nos diferencia de una agencia que solo cobra por montar.

**El montaje se cobra por valor, no por horas.** Con cada implementación parecida las horas bajan (plantillas,
conectores con cada programa de reservas, configuración generada desde el diagnóstico), pero el precio del montaje no
baja con ellas: esa diferencia es el margen que premia estandarizar.

- Referencia: los chatbots para gimnasios cuestan 150–400 €/mes según un blog del sector
  ([Javadex](https://www.javadex.es/blog/ia-para-gimnasios-automatizar-gestion-precios-2026), *no verificado*).
  Nuestro precio se justifica por resultados, no por funciones.
- **Los 3 primeros clientes:** sin montaje y piloto de 30 días de una cadena pagando solo el variable, a cambio de poder
  publicar el caso con datos. La regla de medición se pacta antes de empezar. **A partir del cuarto, montaje completo.**
- **A medida:** cuota de montaje + mensual, fuera de esta tabla.

## Tabla de precios

| Concepto | Cuota (€/mes) | Variable | Notas |
|---|---|---|---|
| Montaje (una vez) | *por decidir* (propuesta: 300–900 € según la cadena) | — | Gratis para los 3 primeros; lo a medida, aparte |
| Base | *por decidir* | — | Obligatoria |
| 1 + 2 (van juntos) | *por decidir* | *por decidir* por alta | |
| 3. Primeros 90 días | *por decidir* | — | |
| 4. Rutinas | *por decidir* | — | Por validar |
| 5. Recordatorios y renovaciones | *por decidir* | — | Por validar |
| 6. Recuperación | *por decidir* | *por decidir* por socio recuperado | |
| 7. Recomendaciones | *por decidir* | *por decidir* por alta | Por validar; requiere 10 |
| 8. Socios en riesgo | *por decidir* | — | Por validar |
| 9. Cambios y cancelaciones | *por decidir* | — | Por validar |
| 10. Opinión | *por decidir* | — | Por validar |
| 11. Resumen de progreso | *por decidir* | — | Por validar |
| Descuento por cadena | *por decidir* (%) | — | Cuando 2 o más agentes elegidos se alimentan entre sí |

## Reglas para el agente de precios

- Usa **solo** los precios de esta tabla. Si falta un precio, deja el hueco marcado y avisa al fundador.
- Respeta los requisitos de la tabla de cascadas: si falta un agente necesario, añádelo y dilo.
- No inventes descuentos ni condiciones: solo el descuento por cadena de la tabla.
- A los primeros 3 clientes, ofrece el piloto.
