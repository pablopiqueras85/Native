# Biblioteca de mensajes (A3)

- **Fecha:** 2026-09-30
- **Estado:** borrador para el primer cliente. Cada estudio aprueba sus plantillas una vez, al montar el servicio;
  las que inician conversación también tiene que aprobarlas Meta.

Los agentes **no escriben mensajes desde cero** cuando son ellos los que inician la conversación. Eligen una plantilla
de aquí y rellenan los huecos. La única parte libre es `{frase}`: una frase corta y personal (máximo 140 caracteres)
que el portero revisa igual que el resto.

## Reglas de la biblioteca

- **Huecos permitidos:** `{nombre}`, `{estudio}`, `{clase}`, `{dia}`, `{hora}`, `{dias}`, `{motivo}`, `{opcion}`, `{frase}`.
  Si falta un hueco obligatorio, el portero bloquea el mensaje. `{frase}` es opcional: si no se rellena, desaparece.
- **Tipo** (categoría de Meta y reglas propias):
  - `utilidad`: avisos de una reserva o de una cita;
  - `marketing`: todo lo demás que inicia el estudio, y **siempre lleva la opción de BAJA**;
  - `servicio`: respuestas dentro de una conversación que empezó el socio;
  - `interno`: mensajes al dueño, nunca al socio.
- **Oferta:** solo las plantillas con `Oferta: sí` pueden llevar descuentos o precios, y solo después de que el dueño
  lo apruebe con `DUE-01`.
- **Primer mensaje a una persona:** el portero antepone siempre `AVISO-IA`.
- **Añadir una plantilla** es la forma de cubrir una situación nueva: se escribe aquí, se aprueba y se sube a Meta.
  El agente no improvisa.

## Comunes

### AVISO-IA · Aviso de inteligencia artificial
- **Agente:** todos
- **Tipo:** aviso
- **Oferta:** no
- **Cuándo:** delante del primer mensaje a cada persona (lo añade el portero).

> Te escribe el asistente virtual de {estudio} (una inteligencia artificial). Si prefieres hablar con una persona, dímelo.

### BAJA-01 · Confirmar la baja
- **Agente:** todos
- **Tipo:** servicio
- **Oferta:** no
- **Cuándo:** el socio responde BAJA o pide que no le escriban más. Se marca "no contactar" en la ficha.

> Hecho, {nombre}: no te volveremos a escribir. Si algún día quieres saber de {estudio}, escríbenos cuando quieras.

### DUE-01 · Pedir permiso al dueño
- **Agente:** todos
- **Tipo:** interno
- **Oferta:** no
- **Cuándo:** hace falta una decisión del negocio (ofrecer algo, volver a escribir a alguien).

> {nombre}: {motivo}. ¿Quieres que le ofrezca {opcion}? Responde SÍ o NO.

### DUE-02 · Pasar el caso al dueño
- **Agente:** todos
- **Tipo:** interno
- **Oferta:** no
- **Cuándo:** cualquier situación de escalado al dueño (ver reglas A1 en `README.md`).

> Necesito que lo lleves tú: {nombre}, {motivo}. Tienes la conversación en la ficha.

## Agente 2 · Seguimiento de indecisos

### SEG-01 · Confirmar la clase de prueba
- **Agente:** 2
- **Tipo:** utilidad
- **Oferta:** no
- **Cuándo:** nada más reservar la clase de prueba.

> Hola {nombre}, tienes reservada tu clase de prueba de {clase} el {dia} a las {hora} en {estudio}. Si no puedes venir, responde a este mensaje y buscamos otro hueco.

### SEG-02 · Recordatorio el día antes
- **Agente:** 2
- **Tipo:** utilidad
- **Oferta:** no
- **Cuándo:** la víspera de la clase de prueba.

> Mañana es tu clase de prueba, {nombre}: {clase} a las {hora}. Ven 10 minutos antes y trae ropa cómoda.

### SEG-03 · Después de la prueba
- **Agente:** 2
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** el día después de la clase de prueba, si no se ha dado de alta.

> {nombre}, ¿qué tal la clase de {clase}? {frase} Si quieres, te cuento cómo seguir. Si no quieres recibir más mensajes, responde BAJA.

### SEG-04 · "Me lo pienso"
- **Agente:** 2
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** 3 días después de un "me lo pienso" sin respuesta.

> Hola {nombre}, te escribo por si te quedó alguna duda después de la clase de prueba. {frase} Si no quieres recibir más mensajes, responde BAJA.

### SEG-05 · Último mensaje
- **Agente:** 2
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** 7 días después de SEG-04 sin respuesta. Después, el agente se para.

> {nombre}, no te escribo más para no molestarte. Si algún día quieres volver a probar, aquí estamos. Si no quieres recibir más mensajes, responde BAJA.

## Agente 3 · Primeros 90 días

### P90-01 · Bienvenida
- **Agente:** 3
- **Tipo:** utilidad
- **Oferta:** no
- **Cuándo:** el día del alta.

> Te damos la bienvenida a {estudio}, {nombre}. {frase} Si tienes cualquier duda sobre horarios o reservas, escríbeme por aquí.

### P90-02 · Dos semanas
- **Agente:** 3
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** a los 14 días del alta.

> {nombre}, ya llevas dos semanas en {estudio}. ¿Cómo te estás encontrando? Si hay algo que podamos mejorar, cuéntamelo. Si no quieres recibir más mensajes, responde BAJA.

### P90-03 · Aviso al dueño: socio nuevo que falta
- **Agente:** 3
- **Tipo:** interno
- **Oferta:** no
- **Cuándo:** un socio de menos de 90 días lleva 10 días o más sin venir.

> {nombre} (socio nuevo) lleva {dias} días sin venir. ¿Le escribo para ver qué tal? Responde SÍ o NO.

### P90-04 · Volver a la rutina
- **Agente:** 3
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** solo si el dueño respondió SÍ a P90-03.

> Hola {nombre}, hace unos días que no te vemos por {estudio}. ¿Va todo bien? Si te viene mejor otro horario, dímelo y te busco hueco. Si no quieres recibir más mensajes, responde BAJA.

## Agente 6 · Recuperación de antiguos socios

### REC-01 · Primer contacto
- **Agente:** 6
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** antiguos socios con permiso para recibir mensajes y baja hace entre 1 y 12 meses.

> Hola {nombre}, hace tiempo que no te vemos por {estudio} y queríamos saber qué tal estás. {frase} Si te apetece volver, te cuento cómo está ahora el estudio. Si no quieres recibir más mensajes, responde BAJA.

### REC-02 · Oferta para volver
- **Agente:** 6
- **Tipo:** marketing
- **Oferta:** sí
- **Cuándo:** el antiguo socio respondió con interés y el dueño aprobó la oferta con DUE-01.

> {nombre}, en {estudio} te ofrecemos {opcion} para volver. {frase} ¿Te guardo sitio? Si no quieres recibir más mensajes, responde BAJA.

### REC-03 · Último mensaje
- **Agente:** 6
- **Tipo:** marketing
- **Oferta:** no
- **Cuándo:** 10 días después de REC-01 sin respuesta. Después, el agente se para.

> {nombre}, no te escribo más para no molestarte. Si algún día quieres volver, {estudio} te espera. Si no quieres recibir más mensajes, responde BAJA.
