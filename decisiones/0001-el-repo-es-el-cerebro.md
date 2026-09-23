# 0001 — Este repositorio es el cerebro de la empresa

- **Fecha:** 2026-09-23
- **Estado:** aceptada

## Contexto

Queremos construir una empresa AI Native, pero aún no tenemos idea de negocio. Necesitamos un sitio
donde acumular lo que vamos aprendiendo (sobre el fundador, las ideas y las decisiones) que tanto
las personas como los agentes de IA puedan leer y actualizar.

## Decisión

Usar este repositorio de Git como la memoria y el sistema operativo de la empresa: documentos en
Markdown, instrucciones para Claude en `CLAUDE.md` y procesos repetibles como skills en `.claude/skills/`.
Empezamos por la fase de exploración de ideas.

## Alternativas consideradas

- **Notion o Google Docs:** más cómodos de editar, pero sin historial de cambios tan claro, y Claude
  no los lee automáticamente al empezar cada sesión de trabajo.
- **Empezar directamente por un MVP:** descartado porque aún no hay idea validada. Construir antes de
  validar es la forma más cara de aprender.

## Consecuencias

- Todo lo relevante se escribe aquí; lo que no está escrito, la IA no lo sabe.
- El historial de Git permite ver cómo evolucionó el pensamiento y por qué.
- Revisaremos esta estructura cuando elijamos idea y pasemos a construir.
