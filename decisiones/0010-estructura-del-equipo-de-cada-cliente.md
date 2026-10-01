# 0010 — Estructura del equipo de cada cliente: Executive Assistant, Chief of Staff Officer y ramas

- **Fecha:** 2026-10-01
- **Estado:** propuesta (idea del fundador, ordenada y con matices). Se acepta o se ajusta tras probarla con el
  primer cliente piloto.

## Contexto

Hasta hoy, el equipo de cada cliente era una lista de empleados con un **Encargado** que hacía dos cosas a la vez:
hablar con el dueño y coordinar a los demás (`empresa/empleados-virtuales.md`). El fundador propone separar esas dos
funciones y agrupar a los empleados por **la dirección del trabajo**: lo que entra al negocio y lo que sale de él.
También quiere dejar sitio a los agentes a medida y a los que vendrán después.

## Decisión

El equipo de cada cliente se organiza así:

```
                         DUEÑO (el "CEO" del negocio)
                                   │  habla, llama, pide
                         EXECUTIVE ASSISTANT
                 (su único interlocutor; le avisa de lo importante)
                                   │
                          CHIEF OF STAFF OFFICER
           (recibe cada petición y la reparte al grupo que toca)
        ┌──────────────────┬───────────────────┬──────────────────┐
  ADMINISTRACIÓN        COMERCIAL            A MEDIDA         HORIZONTE
  lo que entra          lo que sale          por encargo      (no se monta aún)
  Recepcionista         Resp. de clientes    según reunión    Visibilidad (GEO/SEO)
  Correo                Recuperador          y consultor      Web legible por agentes
  Papeles (*)           Comunicación                          Compras por agentes
                        Cobros (*)
```

(*) Propuesta de dónde encajar el Administrativo, que se parte en dos (ver "Matices").

### Los cinco papeles

1. **Executive Assistant.** Trabaja codo con codo con el dueño. Es **el único** con el que habla: le escribe o le
   llama, y el Executive Assistant le cuenta cómo va todo, le avisa de las reuniones próximas y de los cambios importantes, y
   le pide permisos. Recoge los avisos de todos para que el dueño reciba un solo mensaje y no uno por agente.
2. **Chief of Staff Officer.** No habla con el dueño ni con el público. Recibe cada petición (del Executive Assistant o de un
   empleado), decide qué grupo la hace, vigila que se haga y devuelve el resultado al Executive Assistant. Es el patrón *chief of
   staff* del hilo de Dots.
3. **Administración: reacciona a lo que llega de fuera.** Recepcionista (WhatsApp y llamadas de clientes, citas y
   cambios de cita), Correo (clasifica, resume, borradores y reparte) y Papeles (facturas de proveedores, gestoría).
4. **Comercial: inicia hacia fuera.** Las decisiones del negocio hacia sus clientes. Responsable de clientes,
   Recuperador, Comunicación y Cobros.
5. **A medida.** Los que salen del flujo reunión → analista → consultor y se montan a petición del cliente. Cada uno
   usa la misma plantilla de ficha y cuelga del Chief of Staff Officer como los demás.

**La regla para saber en qué rama va un agente:** si espera a que algo llegue, es de Administración; si decide
escribir a alguien, es Comercial.

### Horizonte (se apunta, no se monta)

- **Visibilidad (GEO/SEO)**, al estilo de *Penny* en Marblism: que Google y los asistentes de IA encuentren y
  recomienden el negocio. Enlaza con la idea 0004 (escaparate para IA).
- **Web legible por agentes:** una web hecha para que la lean e interpreten las IA, con precios y reservas claros.
  También idea 0004.
- **Compras y reservas hechas por agentes:** cuando los asistentes de IA compren o reserven en nombre de las personas.
  Más a futuro.

Según la regla contra el ruido, ninguno se monta hasta tener las 10 conversaciones con dueños y un primer cliente.

## Matices (lo que el ordenado añade a la idea del fundador)

- **El Administrativo se parte en dos.** "Papeles" es entrada (le llegan facturas): Administración. "Cobros" es
  salida (el negocio reclama pagos): Comercial. Coincide con la propuesta del hilo de Dots de separarlo.
- **La Recepcionista también responde y reserva.** Sigue siendo de Administración porque nunca escribe primero.
- **Dos papeles, un agente al principio.** Para un negocio pequeño con 2–3 empleados, Executive Assistant y Chief of Staff Officer
  pueden ser el mismo agente con dos sombreros. Se separan cuando un cliente tenga 4 o más empleados o cuando el
  Executive Assistant empiece a fallar en el reparto. En la ficha siempre son dos papeles.
- **Encaja con la decisión 0009:** el Executive Assistant es lo que el dueño ve. Si le llama por teléfono, esa voz es
  ElevenLabs; el Chief of Staff Officer y las ramas trabajan en la trastienda con Claude.
- **Límite de WhatsApp:** Meta no permite asistentes de uso general en WhatsApp desde 2026-01-15 (ver
  `empresa/empleados-virtuales.md`, Encargado). El Executive Assistant solo habla del trabajo del negocio; si el dueño
  le pide algo ajeno, lo declina.
- **El control de calidad no es del cliente.** El portero, el supervisor y la biblioteca de mensajes son de Native
  Crew y vigilan a todas las ramas. El supervisor informa al fundador, no al dueño.
- **Los empleados no hablan entre ellos:** el traspaso sigue haciéndose a través de la ficha de clientes; el jefe de
  gabinete lee la ficha y reparte.

## Alternativas consideradas

- **Seguir con un Encargado único.** Más simple, pero mezcla la conversación con el dueño y la coordinación, y escala
  mal cuando hay agentes a medida. Se conserva como forma de montarlo al principio ("dos sombreros").
- **Agrupar por sector o por canal** (WhatsApp, correo, teléfono). Se descarta: los agentes son por función y comunes
  a todos los sectores (decisión 0007), y el canal ya lo resuelve ElevenLabs (decisión 0009).
- **Que el dueño hable con cada empleado.** Es como lo hace Marblism (*hipótesis*, por las capturas). Se descarta: el
  dueño de un negocio pequeño quiere un interlocutor, no siete.

## Consecuencias

- El **Encargado** de `empresa/empleados-virtuales.md` pasa a ser **Executive Assistant + Chief of Staff Officer**. Hay que
  rehacer su ficha con la plantilla de empleado.
- La ficha `sistemas/equipo-digital/agentes/asistente-del-dueno.md` pasa a ser la de **Correo** (rama
  Administración). Los avisos al dueño pasan al Executive Assistant.
- Executive Assistant y Chief of Staff Officer van **incluidos siempre** en la cuota base; los precios por rama, en
  `empresa/oferta.md` cuando se retomen.
- El organigrama (`empresa/organigrama.html`) refleja esta estructura.
- **Se revisa** con el primer cliente piloto: ¿el dueño entiende la estructura? ¿Usa el canal con el Executive Assistant? ¿Hace
  falta separar los dos sombreros?
