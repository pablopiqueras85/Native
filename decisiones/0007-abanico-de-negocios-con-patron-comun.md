# 0007 — Alcance: un abanico de negocios con un patrón común

- **Fecha:** 2026-09-30
- **Estado:** aceptada (la lista de sectores es una propuesta que el fundador puede ajustar)
- **Sustituye:** el punto "Entrada: por nicho" de la decisión 0005.

## Contexto

La decisión 0005 proponía entrar por un solo nicho (estudios boutique de fitness) y abrir nichos vecinos más adelante.
El fundador quiere más amplitud desde el principio, por tres razones:

- conocer varios tipos de negocio le da una visión más completa de procesos y metodologías;
- muchos agentes e integraciones se repiten en sectores distintos, así que se llega a más negocios con el mismo trabajo;
- le motiva más.

El riesgo conocido de la amplitud: la "agencia de IA genérica" es el segmento más saturado. Además, un mensaje para
todos no le habla a nadie, y cada sector trae sus programas, su vocabulario y sus normas.

## Decisión

1. **El cliente se define por un patrón, no por un sector.** Un negocio de servicios que:
   - vive de citas o clases;
   - tiene clientes recurrentes;
   - tiene un dueño que trabaja dentro y decide (hasta ~10 empleados);
   - recibe los mensajes de sus clientes por WhatsApp.
2. **Los agentes se organizan por función** (captar, cuidar, recuperar, recordar, administrar…) y son los mismos en todos
   los sectores. **Lo que cambia por sector** va en una ficha de sector (`conocimiento/sectores/`):
   - el vocabulario;
   - las plantillas de mensajes;
   - el conector con los programas de reservas típicos;
   - la normativa y los dolores típicos.
3. **Tres sectores activos al principio** (propuesta):
   - estudios de fitness boutique;
   - centros de estética y peluquerías (no medicina estética);
   - academias (idiomas, refuerzo, música).

   Los tres encajan en el patrón y no tratan datos de salud.
4. **Se abre un sector nuevo** cuando uno activo llega a 3 clientes, o cuando llega por su cuenta un cliente de otro
   sector que encaja en el patrón.
5. **Sectores con datos de salud** (fisioterapia, nutrición, dental, medicina estética): solo agentes que no tocan datos
   de salud, y revisión legal antes de entrar.

## Alternativas consideradas

- **Un solo nicho hasta dominarlo (0005 original):** más fácil de vender y medir, pero limita el aprendizaje y la
  motivación del fundador, y retrasa comprobar si los agentes se reutilizan entre sectores.
- **Cualquier negocio, sin filtro:** es el segmento saturado; sin patrón común, cada cliente sería un proyecto a medida
  (falla la prueba del doble).

## Consecuencias

- **La tesis se mide.** En cada cliente nuevo se apunta qué porcentaje de sus agentes y conexiones ya existía
  (**tasa de reutilización**). Si tras 3 sectores es menor del 50 %, se revisa esta decisión.
- **Las 10 conversaciones de validación** (0005) se reparten entre los 3 sectores (unas 3–4 por sector). Cada sector
  aprende menos, pero se ve pronto qué patrón se repite.
- **Hay que generalizar piezas pensadas para fitness:** el cuestionario del diagnóstico, los agentes del diagnóstico
  (hablan de "centro" y "socios"), la landing y las plantillas (`sistemas/equipo-digital/plantillas.md`).
  Se hace sector a sector, cuando haya un cliente de ese sector, no todo de golpe.
- **El mensaje de marketing** es común ("amplía tu equipo sin contratar") con ejemplos por sector.
- **Revisión:** tras las 10 primeras conversaciones y con la tasa de reutilización de los primeros clientes.
