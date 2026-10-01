# Empleados virtuales: fichas de puesto

- **Fecha:** 2026-10-01
- **Estado:** borrador para discutir con el fundador. Nada está validado con clientes. Los precios siguen en
  [`oferta.md`](oferta.md), y **por decidir**.
- **Relacionado:**
  - [`oferta.md`](oferta.md): catálogo de agentes, cascadas y precios;
  - [`../sistemas/equipo-digital/`](../sistemas/equipo-digital/): cómo trabajan por dentro (portero, supervisor y
    plantillas);
  - decisión 0007: los mismos empleados sirven en varios sectores.

Esta es la versión detallada de la tabla "El producto" de `oferta.md`. Cada empleado tiene una ficha con las mismas
preguntas, para poder venderlo, montarlo y medirlo igual en cualquier cliente:

- **Para quién:** la frase que dice el dueño y la señal del diagnóstico.
- **Qué hace:** el día a día, con las plantillas que usa.
- **Qué no hace.**
- **Cuándo avisa al dueño.**
- **Por sector:** fitness, estética y peluquería, y academias.
- **Qué necesita del cliente.**
- **Métrica:** cómo se mide.
- **Montaje.**
- **Riesgos.**

## Lo que llevan todos los empleados

Esto viene incluido en la base; no se vende aparte.

- **Dicen que son una IA** en el primer mensaje a cada persona (plantilla `AVISO-IA`). Son "empleados" solo como
  metáfora ante el dueño.
- **Escriben desde las plantillas aprobadas** del negocio. Solo improvisan una frase corta, y la revisa el portero.
- **Todo mensaje pasa por el portero** antes de salir.
- **Se paran y avisan** en los casos de la tabla A1 (`sistemas/equipo-digital/README.md`): enfado, salud, pagos,
  petición de hablar con una persona, menores, BAJA…
- **Regla de parada:** nunca más de dos mensajes seguidos sin respuesta.
- **Horario:**
  - las respuestas a quien escribe salen a cualquier hora;
  - los mensajes que inicia el negocio, solo entre las 9:00 y las 21:00.
- **Las cuentas son del cliente** (WhatsApp, ficha de clientes; decisión 0006). Si se va, se lleva sus datos en CSV.
- **El Encargado los supervisa** y el fundador revisa las excepciones.

## Cómo se pasan el trabajo

```
Interesado ──► RECEPCIONISTA ──alta──► RESPONSABLE DE CLIENTES ──contento──► COMUNICACIÓN ──recomendado──┐
                    ▲                         │ se va igualmente                                       │
                    │                         ▼                                                        │
                    └──────────────────── RECUPERADOR ◄── antiguos clientes                             │
                    ▲                                                                                   │
                    └───────────────────────────────────────────────────────────────────────────────────┘
                               ENCARGADO: revisa a todos y habla con el dueño por WhatsApp
```

El traspaso se hace a través de la ficha de clientes, no con agentes que hablan entre ellos. Por ejemplo, la
Recepcionista marca "alta" y el Responsable de clientes lo recoge al día siguiente.

---

## 1. Recepcionista comercial · ofrecido

**Agentes:** 1 (respuesta a consultas) + 2 (seguimiento de indecisos). Se le añade el 9 (cambios y cancelaciones)
cuando se valide.

**Para quién**

- **La frase del dueño:** *"Me escriben preguntando precios y, cuando contesto por la noche, ya se han ido a otro sitio."*
- **Señal en el diagnóstico:**
  - tarda más de 2 horas en contestar;
  - recibe muchas consultas al mes;
  - pocas acaban en alta.

**Qué hace**

1. **Contesta en minutos** a cada consulta por WhatsApp, a cualquier hora:
   - precios y horarios, solo los que el dueño ha aprobado;
   - qué incluye cada servicio;
   - una propuesta concreta: clase de prueba, primera cita o prueba de nivel.
2. **Reserva el hueco.** Si el programa de reservas lo permite, lo deja apuntado. Si no, propone dos opciones y
   el dueño confirma con un botón (plantilla `DUE-01`).
3. **Persigue al indeciso** con la secuencia `SEG-01` a `SEG-05`:
   - confirmar la reserva;
   - recordarla el día antes;
   - escribir después de la prueba;
   - contestar al "me lo pienso";
   - enviar un último mensaje.

   Pregunta el objetivo antes de la prueba, para que el dueño llegue sabiendo con quién habla.
4. **Cierra el caso** en la ficha como "alta" o "no". Las altas pasan al Responsable de clientes.

**Qué no hace**

- Negociar precios ni dar descuentos sin permiso del dueño.
- Contestar dudas de salud o de tratamientos.
- Prometer resultados ("pierdes 5 kilos").
- Seguir escribiendo a quien no contesta dos veces.

**Cuándo avisa al dueño**

- Alguien pide descuento o un precio especial.
- Piden un grupo, una empresa o un regalo.
- Llega una queja.
- No sabe la respuesta.

**Por sector**

| Sector | Qué ofrece | Lo propio del sector |
|---|---|---|
| Fitness boutique | Clase de prueba | El valor está en el seguimiento: mucha gente prueba y no se apunta |
| Estética y peluquería | Primera cita | La mayoría reserva directo: el valor está en **contestar rápido y reservar**, menos en perseguir. Las preguntas sobre un tratamiento concreto (alergias, piel) se escalan |
| Academias | Prueba de nivel o clase de prueba | Picos fuertes en septiembre y enero (*hipótesis*). Si el alumno es menor, **se habla con el padre o la madre**, nunca con el menor |

**Qué necesita del cliente**

- Su número en la API oficial de WhatsApp Business. Ver los riesgos, abajo.
- Lista de servicios con precios, horarios, huecos para pruebas y el tono del negocio (¿tutea?, ¿emojis?).
- Acceso a su programa de reservas, si tiene.

**Métrica:** altas de interesados que antes se perdían.

- **Punto de partida:** altas ÷ consultas de los 3 meses anteriores. Si no hay datos, dos semanas de registro antes
  de empezar.
- **Cuenta como alta del agente:** quien se apunta y habló con el agente en los 30 días anteriores. Es la regla del
  variable por alta, y se pacta antes de empezar.

**Montaje (*hipótesis*):** 6–10 h el primer cliente; objetivo 1–2 h a partir del vigésimo. Lo más lento es pasar el
número a la API de WhatsApp y que Meta apruebe las plantillas.

**Riesgos**

- **Es el empleado más copiado:** cualquier chatbot contesta. Lo que nos diferencia es el seguimiento hasta el alta
  y la medición. **Nunca se vende solo el agente 1.**
- **El número de WhatsApp.** Pasar el número del negocio a la API puede impedir que el dueño siga usando la app
  normal en ese número. Meta ofrece una opción para usar ambas a la vez, pero hay que comprobar si sirve con el
  proveedor elegido (*por verificar antes del primer cliente*). Si no sirve, es un freno de venta serio.

---

## 2. Responsable de clientes · ofrecido (agente 3); el 8, por validar

**Agentes:** 3 (primeros 90 días) + 8 (clientes en riesgo). Se le añaden el 10, el 11 y el 4 cuando se validen.

**Para quién**

- **La frase del dueño:** *"Me entero de que alguien se ha ido cuando ya se ha dado de baja."*
- **Señal en el diagnóstico:**
  - muchas bajas en los primeros meses;
  - el dueño no sabe quién ha dejado de venir.

**Qué hace**

1. **Acompaña los primeros 90 días** de cada cliente nuevo:
   - bienvenida (`P90-01`);
   - un mensaje a las dos semanas (`P90-02`);
   - si empieza a fallar, avisa al dueño (`P90-03`) o le anima a volver (`P90-04`).
2. **Vigila a todos los demás.** Si alguien rompe su ritmo habitual, le escribe antes de que se dé de baja. Por
   ejemplo: lleva unas 2 semanas sin venir y sigue pagando.
3. **Pasa al Recuperador** a quien se da de baja igualmente.

**Qué no hace**

- No retiene con descuentos sin permiso.
- No pregunta por qué falta si el motivo puede ser de salud. Si el cliente lo cuenta, se escala.

**Cuándo avisa al dueño**

- Un cliente nuevo falta varias veces seguidas.
- Alguien dice que se quiere ir, o está descontento.

**Por sector:** aquí se ve que el mismo empleado vale para los tres sectores. Cambia la forma de detectar el riesgo:

| Sector | Señal de riesgo | Mensaje |
|---|---|---|
| Fitness boutique | Lleva 2 semanas sin venir y sigue pagando | "¿Todo bien? Te guardo sitio el jueves" |
| Estética y peluquería | Pasa más tiempo del habitual sin cita. Por ejemplo, viene cada 5 semanas y lleva 8 | **"Te toca"**: recordar que se acerca su próxima cita y ofrecer hueco. Es el agente "Próxima cita" del 2026-09-30, como variante de sector |
| Academias | Falta a clase o baja la asistencia a mitad de curso | Aviso a la familia, con un tono de "le echamos de menos" y nunca de reproche |

**Qué necesita del cliente:** **saber quién viene.** Puede salir del programa de reservas o de un registro a mano.
Sin ese dato, el agente 8 no puede trabajar. Es la dependencia más fuerte de todo el catálogo.

**Métrica:** bajas evitadas.

- Es difícil de atribuir: no se sabe quién se habría ido sin el mensaje. Por eso este empleado va con **cuota fija,
  sin variable**.
- Se compara la tasa de bajas con la del mismo periodo anterior.

**Montaje (*hipótesis*):** depende del conector con el programa de reservas. El primer cliente con cada programa es
caro; los siguientes, rápidos.

**Riesgos**

- Sin datos de asistencia se queda en bienvenida y poco más.
- **Faltan plantillas** del agente 8 (vigilancia) y de la variante "te toca" para estética.

---

## 3. Recuperador · ofrecido

**Agentes:** 6 (recuperación de antiguos clientes). Se le añade el 5 (renovaciones) cuando se valide.

**Para quién**

- **La frase del dueño:** *"Tengo una lista de 200 antiguos clientes y nunca les escribo."*
- **Señal en el diagnóstico:** muchas bajas acumuladas y ningún contacto después.

**Qué hace**

1. **Prepara la lista** con el dueño:
   - quién se fue y cuándo; se escribe a quienes se fueron hace entre 3 y 24 meses (*hipótesis*);
   - se quita a quien se fue enfadado o pidió no ser contactado.
2. **Escribe poco a poco**, unos 20 al día (*hipótesis*), para no saturar al dueño de respuestas. Usa la secuencia
   `REC-01` a `REC-03`.
3. **Acompaña al que contesta:**
   - la oferta para volver, solo la que el dueño ha aprobado (`DUE-01`);
   - la reserva;
   - la "alta" en la ficha, que pasa al Responsable de clientes.

**Qué no hace**

- Escribir a quien no dio permiso para recibir WhatsApp del negocio.
- Escribir a interesados que nunca fueron clientes (LSSI).
- Más de tres mensajes por persona en toda la campaña.

**Cuándo avisa al dueño**

- Alguien contesta enfadado o cuenta por qué se fue (información valiosa).
- Alguien pide una condición especial.

**Por sector**

| Sector | A quién se escribe | Cuándo funciona mejor (*hipótesis*) |
|---|---|---|
| Fitness boutique | Bajas formales | Septiembre y enero |
| Estética y peluquería | Clientes sin cita desde hace mucho; no hay "baja" formal | Antes de fechas señaladas (verano, Navidad, bodas) |
| Academias | Alumnos del curso pasado que no se han matriculado | **Campaña de matrícula** (junio y septiembre). Es el agente "Matrícula" del 2026-09-30, como variante de sector |

**Qué necesita del cliente**

- La lista de antiguos clientes, con la fecha de baja y la prueba de que dieron permiso para WhatsApp.
- Una oferta para volver, aprobada.

**Métrica:** clientes recuperados.

- **Cuenta como recuperado:** quien vuelve a apuntarse o reserva en los 60 días siguientes a responder a un mensaje
  `REC`.
- Lleva variable: propuesta de 30–50 € por cliente recuperado, en `modelo-economico.md`.

**Montaje (*hipótesis*):** 3–5 h. Lo más lento es limpiar la lista.

**Riesgos**

- **La lista se agota.** El primer mes es el bueno, porque se escribe a todos los antiguos clientes acumulados;
  después solo quedan las bajas nuevas de cada mes, que son pocas. Consecuencias:
  - el precio debería cargar más en el montaje y el variable que en la cuota;
  - es el mejor gancho para el piloto, pero el peor para la cuota.
- **El permiso.** Muchos antiguos clientes nunca dieron permiso para WhatsApp, y la lista real puede quedar en una
  fracción de la que tiene el dueño. Escribir a antiguos clientes es comunicación comercial: hay que
  **revisarlo con un abogado** antes del primer cliente.

---

## 4. Administrativo · por validar

**Agentes:**

- 5 (recordatorios y renovaciones);
- **Cobros pendientes** (propuesta nueva);
- **Papeles para la gestoría** (propuesta nueva).

**Para quién**

- **La frase del dueño:** *"Los domingos los paso con papeles y persiguiendo a quien me debe un bono."*

**Qué hace**

1. **Recuerda** citas, bonos que caducan y renovaciones, antes de que caduquen.
2. **Recuerda pagos pendientes:**
   - con un mensaje de utilidad, neutro y amable;
   - nunca negocia ni amenaza;
   - si el cliente discute el cobro, lo escala al dueño, porque el dinero lo decide el dueño (regla A1).
3. **Ordena los papeles para la gestoría:**
   - el dueño manda al Encargado por WhatsApp las fotos de tickets y facturas;
   - el Administrativo los ordena por mes en su Drive;
   - al cierre del mes, prepara el envío a la gestoría.

   No toca datos de sus clientes, solo del negocio.

**Por qué está por validar**

- Los programas de reservas ya hacen recordatorios. Solo aporta en negocios sin programa.
- Los papeles de la gestoría pueden ser lo que más horas quita a un dueño solo (*hipótesis*). Pero no es
  "comercial", que es la dirección elegida.
- **Hay que preguntarlo en las 10 conversaciones de validación.**

**Métrica:**

- horas liberadas, según lo que diga el dueño antes y después;
- euros cobrados de pagos pendientes.

---

## 5. Responsable de comunicación · por validar

**Agentes:**

- 10 (opinión y alerta temprana);
- 7 (recomendaciones);
- avisos generales: festivos, cambios de horario.

**Para quién**

- **La frase del dueño:** *"Sé que debería pedir reseñas y que me recomienden, pero nunca me acuerdo."*

**Qué hace**

1. **Una pregunta corta al mes** a cada cliente: *"¿Qué tal te va, del 1 al 5?"*. Si alguien está descontento, avisa
   al dueño **ese mismo día**.
2. **Pide reseña en Google.** ⚠️ **Hay que pedírsela a todos los clientes, no solo a los contentos.** Google prohíbe
   pedir reseñas solo a quien va a dar buena nota ([política de contenido de Google](https://support.google.com/contributionpolicy/answer/7400114),
   *por verificar el texto exacto*). El diseño anterior del agente 10 ("si está contento, le pide reseña") hacía
   justo eso y hay que cambiarlo.
3. **Pide recomendaciones a los contentos.** Esto sí se puede filtrar: no es una reseña pública.
   - Solo escribe al recomendado si el recomendado lo pide (LSSI).
   - El recomendado pasa a la Recepcionista.
4. **Avisos generales** a todos: festivos y cambios de horario. El dueño los dicta al Encargado por WhatsApp.

**Por sector**

- **Estética:** un mensaje de "¿qué tal?" al día siguiente del servicio. Es el agente "Después del servicio" del
  2026-09-30. Sin consejos de cuidados, porque pueden ser de salud.
- **Academias:** un resumen al mes para las familias. Es el agente "Informe a familias", que se apoya en el
  agente 11.
- **Fechas especiales** (cumpleaños): solo si el cliente dio la fecha y el permiso. Es marketing, así que lleva BAJA.

**Métrica:**

- descontentos detectados a tiempo;
- reseñas nuevas en Google;
- altas por recomendación.

---

## Encargado · incluido siempre

**Agentes:** supervisor (`sistemas/equipo-digital/agentes/supervisor.md`) + **canal del dueño por WhatsApp**
(propuesta del 2026-09-30).

Es el único empleado que habla con el dueño, y puede ser **lo que más se recuerde del servicio** (*hipótesis*): el dueño
no tiene que aprender ningún panel, habla con su equipo por WhatsApp como con un empleado más.

**Qué hace**

- **Hacia dentro** (para el fundador):
  - revisa lo que hicieron los demás;
  - calcula la tasa de corrección;
  - propone cambios de fase.
- **Hacia el dueño:**
  - le pide permisos con botones Sí/No (`DUE-01`);
  - le pasa los casos que le tocan (`DUE-02`);
  - le manda un resumen corto cada semana y el informe al mes.
- **Recibe órdenes del dueño:**
  - *"esta semana cerramos el jueves"*: se lo pasa a Comunicación como aviso general;
  - *"a Marta no le escribáis"*: la marca como "no contactar";
  - *"¿cuántos han vuelto este mes?"*: contesta con los datos de la ficha.

**Límites**

- Los cambios que el dueño pide por WhatsApp sobre **precios, ofertas o plantillas** no se aplican solos. Al principio
  los confirma el fundador. Una orden mal entendida puede mandar un precio falso a 100 clientes.
- No es un asistente general (Meta los prohíbe en WhatsApp desde 2026-01-15): solo habla del trabajo del equipo.

---

## Otras ideas del 2026-09-30: dónde encajan

La lista de agentes nuevos propuesta el 2026-09-30 se reparte casi entera entre los empleados que ya existen, como
variantes de sector. Es una buena señal para la tesis de reutilización de la decisión 0007.

| Idea | Dónde queda |
|---|---|
| Próxima cita | Responsable de clientes, variante de estética y peluquería |
| Matrícula | Recuperador, variante de academias |
| Lista de espera | Recepcionista, con el agente 9 (recolocar plazas liberadas) |
| Después del servicio | Comunicación, variante de estética |
| Informe a familias | Comunicación, variante de academias (agente 11) |
| Fechas especiales | Comunicación |
| Cobros pendientes, Papeles para la gestoría | Administrativo |
| Presupuestos | **Fuera por ahora.** Encaja mal en el patrón de citas o clases, que tienen precio de tarifa |
| Telefonista (llamada perdida → WhatsApp en un minuto) | **Ampliación de la Recepcionista, por validar.** Necesita conectar la línea de teléfono del negocio, que es otro montaje y otro proveedor |

## Recomendación para empezar

**Lanzar solo con tres empleados y el Encargado:**

- Recepcionista comercial;
- Responsable de clientes;
- Recuperador.

Son los únicos con métrica clara y con plantillas escritas, y entre los tres cubren la cascada completa. El
Administrativo y Comunicación se enseñan como "próximamente". Solo se montan si el diagnóstico de un cliente lo pide, y
lo que salga de esas conversaciones decide si pasan a la carta.

## Qué falta antes de poder venderlos

- [ ] Precios en la tabla de `oferta.md`.
- [ ] Plantillas del agente 8 (vigilancia) y de las variantes de sector ("te toca", matrícula).
- [ ] Cambiar el agente 10 en `oferta.md` para que pida reseña a todos (ver Comunicación).
- [ ] Comprobar si el dueño puede seguir usando la app de WhatsApp con su número conectado a la API.
- [ ] Revisión con un abogado: aviso de IA, campañas a antiguos clientes y mensajes a familias de menores.
- [ ] Fichas de sector en `conocimiento/sectores/` para los tres sectores activos.
- [ ] Fichas de puesto neutras en `sistemas/equipo-digital/agentes/` para cada agente (hoy solo existe la del supervisor).
