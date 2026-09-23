---
name: generar-ideas
description: Genera una tanda de ideas de negocio AI Native a partir del perfil del fundador y las guarda en el backlog. Úsala cuando el usuario pida ideas, oportunidades o "qué negocio podría montar".
---

# Generar ideas

Objetivo: proponer ideas de negocio AI Native que encajen con el fundador, y guardarlas en `exploracion/`.

## Pasos

1. **Lee el contexto:** `fundador/perfil.md`, `empresa/principios.md`, `exploracion/criterios.md` y
   `exploracion/backlog.md` (para no repetir ideas ya exploradas o descartadas).
   - Si el perfil está casi vacío, avisa de que las ideas serán genéricas y ofrece entrevistar
     primero al fundador. Continúa solo si el usuario lo prefiere.

2. **Genera 8–10 ideas en bruto** combinando estas fuentes:
   - **Problemas vividos:** los que aparecen en el perfil del fundador.
   - **Servicios que la IA puede entregar:** trabajos que hoy se pagan a personas por horas o por
     encargo en sectores que el fundador conoce (principio 4: vender resultados).
   - **Accesos del fundador:** necesidades de las redes y comunidades a las que puede llegar.
   - **Capacidades recientes de la IA:** cosas que hace poco no eran posibles. Si puedes buscar en
     la web, compruébalo y cita fuentes.

3. **Filtra en voz alta:** descarta las que choquen con las líneas rojas del perfil o que claramente
   fallen un criterio eliminatorio. Di cuáles descartas y por qué, en una línea cada una.

4. **Presenta las 3–5 mejores** al usuario, cada una con su frase ("Para [cliente] que [problema]…"),
   por qué encaja con el fundador y cuál es su mayor riesgo. Pregunta cuáles quiere guardar.

5. **Guarda las elegidas:** para cada una, crea `exploracion/ideas/NNNN-slug.md` a partir de
   `_plantilla.md` (estado `nueva`, origen `generada con IA`, fecha de hoy) y añade su fila a
   `exploracion/backlog.md`.

6. **Propón el siguiente paso:** normalmente, `/evaluar-idea` sobre la que más ilusión le haga al fundador.
