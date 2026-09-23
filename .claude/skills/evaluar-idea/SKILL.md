---
name: evaluar-idea
description: Puntúa una idea del backlog con la rúbrica de exploracion/criterios.md, investiga el mercado y propone el siguiente experimento. Úsala cuando el usuario pida evaluar, puntuar, analizar o comparar ideas.
---

# Evaluar una idea

Objetivo: dar una puntuación honesta y con evidencia a una idea, y decidir qué hacer con ella.

## Pasos

1. **Identifica la idea.** Si el usuario no dice cuál, muestra las ideas con estado `nueva` del
   backlog y pregunta.

2. **Lee el contexto:** el archivo de la idea, `fundador/perfil.md`, `empresa/principios.md` y
   `exploracion/criterios.md`.

3. **Investiga** (si puedes buscar en la web):
   - Competidores y alternativas actuales, incluida la opción de "no hacer nada" o hacerlo a mano.
   - Qué pagan hoy los clientes por resolverlo (precios, salarios de quien lo hace, horas invertidas).
   - Señales de demanda: foros, reseñas negativas de las alternativas, ofertas de empleo para ese trabajo.
   Cita cada dato con su enlace. Sin fuente, es una hipótesis.

4. **Puntúa cada criterio de 1 a 5** con una línea de justificación. Respeta la guía: sin evidencia,
   máximo 3. Calcula la puntuación ponderada sobre 100 y revisa los criterios eliminatorios.

5. **Escribe la sección "Evaluación"** del archivo de la idea con esta tabla:

   | Criterio | Nota | Peso | Justificación |
   |---|---|---|---|

   Añade debajo: puntuación total, competidores encontrados (con enlaces) y los 2–3 mayores riesgos.

6. **Propón el siguiente experimento** según el umbral de `criterios.md`: el más barato y rápido que
   ponga a prueba la hipótesis más arriesgada (por ejemplo, 10 conversaciones con clientes, una landing
   con lista de espera o hacer el servicio a mano para un primer cliente). Escríbelo en "Siguiente experimento".

7. **Actualiza** el estado de la idea (`evaluada` o `descartada`) y su fila en el backlog, reordenando
   por puntuación. Si se descarta, crea también una decisión en `decisiones/`.

8. **Resume** al usuario en pocas líneas: nota, veredicto y siguiente paso. Sé directo si la idea es débil.
