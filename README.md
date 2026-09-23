# Native

El cerebro de una empresa AI Native, construido desde el día cero.

Este repositorio no es (todavía) un producto: es la **memoria y el sistema operativo** del negocio.
Aquí vive por escrito todo lo que la empresa sabe — quién la funda, qué principios sigue, qué ideas
se exploran, qué se ha decidido y por qué — de forma que tanto las personas como los agentes de IA
trabajen con el mismo contexto.

> Regla de oro: **si no está escrito aquí, la IA no lo sabe.**

## Fase actual: exploración

Todavía no hay una idea elegida. El objetivo de esta fase es encontrar una oportunidad que encaje
con el fundador y que sea mucho mejor gracias a la IA, y validarla con clientes reales antes de construir.

```
Perfil del fundador  →  Generar ideas  →  Evaluar y filtrar  →  Validar con clientes  →  Decidir
   fundador/            /generar-ideas     /evaluar-idea          experimentos           decisiones/
```

## Mapa del repositorio

| Carpeta | Qué contiene |
|---|---|
| [`fundador/`](fundador/) | Quién funda la empresa: experiencia, accesos, recursos y límites. El punto de partida de todo. |
| [`empresa/`](empresa/) | Principios de cómo opera una empresa AI Native. Más adelante: visión, cliente ideal, procesos. |
| [`exploracion/`](exploracion/) | El embudo de ideas: criterios de evaluación, backlog e ideas individuales. |
| [`decisiones/`](decisiones/) | Registro de decisiones importantes, con su contexto y el porqué. |
| [`.claude/skills/`](.claude/skills/) | Procesos que Claude sabe ejecutar: `/generar-ideas`, `/idea-nueva`, `/evaluar-idea`. |
| [`CLAUDE.md`](CLAUDE.md) | Instrucciones que Claude lee al empezar cada sesión. |

## Cómo trabajar con este repo

1. **Completa tu perfil** en [`fundador/perfil.md`](fundador/perfil.md). O mejor: pídele a Claude que te
   entreviste y lo rellene contigo.
2. **Genera ideas** con `/generar-ideas`, o apunta una propia con `/idea-nueva`.
3. **Evalúa** las más prometedoras con `/evaluar-idea` y revisa el [backlog](exploracion/backlog.md).
4. **Registra** cada decisión importante en [`decisiones/`](decisiones/).
