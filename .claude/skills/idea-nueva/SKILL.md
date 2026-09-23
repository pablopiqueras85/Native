---
name: idea-nueva
description: Registra una idea de negocio aportada por el usuario en exploracion/ideas/ y en el backlog. Úsala cuando el usuario diga "tengo una idea", "apunta esta idea" o describa una oportunidad propia.
---

# Registrar una idea nueva

Objetivo: convertir una idea en bruto del usuario en un archivo estructurado, sin juzgarla todavía.

## Pasos

1. **Escucha la idea** tal como la cuenta el usuario. Si falta lo esencial, haz como máximo 3 preguntas
   cortas, priorizando: ¿quién tiene el problema?, ¿cómo lo resuelve hoy?, ¿qué haría la IA?

2. **Comprueba duplicados** en `exploracion/backlog.md`. Si ya existe algo parecido, díselo y
   pregunta si quiere ampliar esa idea o crear una nueva.

3. **Crea el archivo** `exploracion/ideas/NNNN-slug.md` a partir de `exploracion/ideas/_plantilla.md`:
   - Siguiente número libre de 4 dígitos, slug corto en minúsculas con guiones.
   - Estado `nueva`, fecha de hoy, origen según lo que cuente el usuario.
   - Rellena lo que sepas con sus palabras. Lo que no sepas, déjalo como pregunta en cursiva:
     no inventes.
   - Escribe al menos 2 hipótesis clave, empezando por la más arriesgada.

4. **Añade la fila** al backlog con estado `nueva`, sin puntuación.

5. **Cierra** con un resumen de dos líneas y ofrece evaluarla con `/evaluar-idea`.
