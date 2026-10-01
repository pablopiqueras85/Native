# 0004 — Escaparate para IA: que la IA te recomiende y te reserve

- **Estado:** nueva
- **Creada:** 2026-10-01
- **Origen:** radar de mercado del 2026-10-01 (`exploracion/radar-mercado-2026-10.md`), paquete B. Al fundador le
  gusta.
- **Relacionado:** idea 0002 (el equipo digital) y `empresa/empleados-virtuales.md` (el Responsable de comunicación).

## En una frase

Para negocios locales del patrón de la decisión 0007 que no saben si ChatGPT, Gemini o Google los recomiendan,
ofrecemos que aparezcan cuando un cliente pregunta a una IA por su zona, y lo medimos cada mes con agentes que hacen
esas preguntas por ellos.

## El problema

- **Los clientes empiezan a preguntar a una IA en vez de buscar en Google:** "¿mejor pilates reformer en Ruzafa?".
  - El Modo IA de Google está en España desde 2025-10-08.
  - Según SOCi, ChatGPT recomienda solo el 1,2 % de los negocios locales (datos de EE. UU.).
  - Un blog afirma que el 58 % de las búsquedas locales en España ya se hacen en IAs. Es un *dato de un vendedor* y
    parece exagerado: no usarlo para vender.
- **El dueño no sabe si sale ni por qué.** No es su trabajo saberlo.
- **La IA saca a los negocios de varias fuentes:**
  - el Perfil de Empresa de Google;
  - Bing Places, Apple, Yelp;
  - Foursquare: se discute si ChatGPT saca de ahí la mayoría de los nombres
    ([a favor](https://vyzz.io/blog/foursquare-is-the-directory-chatgpt-reads-first-for-local-business-names),
    [en contra](https://www.steadydemand.com/chatgpts-local-results-arent-coming-from-foursquare-and-probably-never-really-were/));
  - las reseñas y la web del negocio.

  Si el nombre, la dirección o el teléfono no coinciden entre fuentes, la IA se fía menos.
- **Ya hay agencias "GEO"** (optimización para que la IA te cite) en España. Según blogs del sector cobran
  800–5.000 €/mes y algunas desde 190 €/mes
  ([fuente](https://www.javadex.es/blog/cuanto-cuesta-proyecto-geo-consultor-precios-espana-2026), *dato de un
  vendedor*). Para un estudio o una peluquería, el precio alto queda fuera de su alcance (*hipótesis*).

## La solución AI Native

| Pieza | Qué hace | ¿Agente o persona? |
|---|---|---|
| **Auditoría "¿Te recomienda la IA?"** | Hace 10–20 preguntas típicas de un cliente de la zona en ChatGPT, Gemini, Perplexity y el Modo IA de Google. Apunta quién sale, en qué posición y con qué fuentes | Agente (*por comprobar:* lo que contesta la IA por API puede no coincidir con lo que ve un usuario en la app) |
| **Puesta a punto de fichas** | Mismos datos en Google, Bing, Apple, Foursquare y Yelp: categorías, servicios, precios, horario y fotos | Agente que prepara y persona que publica (muchas fichas no tienen API abierta) |
| **Web legible por la IA** | Página de servicios clara, preguntas frecuentes y datos estructurados del negocio | Agente que redacta y dueño que aprueba |
| **Reseñas** | Pedir reseña a todos los clientes, no solo a los contentos (política de Google) y contestarlas | Responsable de comunicación (empleado que ya existe) |
| **Reservable por agentes** | Conectar el programa de reservas con Google (Reserve with Google o los socios del programa) para que la IA pueda reservar | Persona en el montaje (*por comprobar qué hay disponible en España y por sector*) |
| **Seguimiento mensual** | Repetir la auditoría, corregir datos que no coinciden y enseñar la evolución en el informe del Encargado | Agente |

**Cascada:** el Escaparate trae interesados y la Recepcionista los convierte. Se cierra el círculo de la oferta:
**que te encuentren → que te contesten → que se queden → que vuelvan**.

## Cliente ideal

- Los tres sectores activos (fitness boutique, estética y peluquería, academias) en ciudades con competencia.
- **Primero como complemento** para los clientes de los empleados virtuales; después, quizá, como paquete suelto.

## Modelo de negocio

*Hipótesis* de precio, por validar:

- **La auditoría, gratis**, dentro del diagnóstico. Es el gancho.
- **Montaje:** 200–400 €.
- **Cuota:**
  - 49–99 €/mes como complemento;
  - 99–149 €/mes si se vende suelto.
- **Sin variable:** no se puede atribuir una venta a "salir en ChatGPT" con rigor.

Se compara con no hacer nada, con una agencia de SEO local o GEO, o con una herramienta de autoservicio.

## Hipótesis clave

1. **(La más arriesgada)** Los clientes de estos negocios en España ya eligen por IA lo bastante como para que el dueño
   pague por aparecer. Si casi nadie pregunta a una IA por "pilates cerca de mí", es humo.
2. Lo que hacemos (fichas, coherencia de datos, reseñas, web) **mejora de verdad** la aparición en 60–90 días, y se
   puede medir aunque las respuestas de la IA varíen de un día a otro.
3. La auditoría gratuita funciona como **gancho de venta**: abre la conversación mejor que hablar de horas y euros.
4. Una agencia de SEO local no lo copia en un mes. Riesgo: buena parte es SEO local de siempre con otro nombre. Nos
   diferencia ir junto a los empleados, las reseñas y la medición.

## Evaluación

*Se completa con `/evaluar-idea`.*

Ventajas vistas el 2026-10-01:

- se demuestra en 30 segundos ("pregúntale a ChatGPT por tu barrio");
- encaja con lo que ya hacemos;
- el agente investigador del diagnóstico ya busca información pública del negocio.

Riesgos vistos:

- **no se puede garantizar** salir: quien promete "salir en ChatGPT" es una señal de alarma;
- las respuestas cambian y la medición es ruidosa;
- parte del trabajo es manual (las fichas);
- casi todos los datos son de EE. UU.

## Siguiente experimento

1. **Auditoría a mano** de 5 negocios por sector (15 en total) en la ciudad del fundador, con 10 preguntas en 4 IAs:
   - ¿cuántos salen?;
   - ¿qué tienen en común los que salen?;
   - ¿cambia la respuesta si se pregunta otro día?
2. **Usarla en las 10 conversaciones de validación** (decisión 0005) para abrir la conversación. Medir la reacción del
   dueño: ¿le importa?, ¿pagaría?
3. Si funciona, **añadir una sección "¿Te recomienda la IA?" al informe del diagnóstico**. El agente investigador ya
   tiene casi todo lo necesario.
