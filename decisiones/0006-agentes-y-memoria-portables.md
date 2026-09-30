# 0006 — Agentes y memoria portables

- **Fecha:** 2026-09-30
- **Estado:** aceptada

## Contexto

El negocio se construye sobre modelos y plataformas de terceros (decisión 0005): Claude, OpenAI, n8n, WhatsApp.
El fundador quiere blindarse ante la dependencia de un proveedor (*vendor lock-in*): si uno sube precios, cambia
condiciones o desaparece, el negocio tiene que seguir funcionando. Plataformas como Dots guardan una memoria que ni
siquiera se puede ver ni corregir.

## Decisión

1. **Los agentes son fichas de puesto en Markdown neutro,** versionadas en este repositorio
   (`sistemas/equipo-digital/agentes/`). El motor que las ejecuta es intercambiable.
2. **El conocimiento de la empresa vive en Markdown y en Git,** legible con Obsidian, VS Code o cualquier editor.
   Incluye guiones que funcionan, plantillas, aprendizajes por nicho y decisiones. Obsidian es la ventana, no el almacén.
   Se sincroniza con Git, no con un servicio propietario.
3. **Los datos operativos de los clientes** (fichas de socios, estado de conversaciones) viven en una herramienta de
   fichas exportable (CSV, y más adelante una base de datos estándar). **Nunca en Git ni en Obsidian:** son datos personales.
4. **Las reglas críticas no dependen del modelo.** El portero (`sistemas/equipo-digital/portero.py`) es código sin IA
   ni dependencias externas.
5. **La memoria interna de una plataforma** (la de Dots, los almacenes de memoria de Managed Agents) se usa, como
   mucho, como copia, nunca como fuente de verdad.

## Alternativas consideradas

- **Construir todo dentro de una plataforma** (Dots, Managed Agents, n8n): más rápido al principio, pero el
  conocimiento y los agentes quedan atrapados en ella.
- **Programar todo desde cero sin plataformas:** máxima independencia, pero demasiado trabajo para un fundador que no es
  desarrollador.

## Consecuencias

- Cambiar de motor supone adaptar la conexión, no rehacer los agentes.
- Hay que mantener la disciplina de escribir en el repositorio lo que se aprende, aunque la plataforma ofrezca guardarlo.
- **Revisión:** al elegir el motor del primer piloto, comprobar que puede leer las fichas de `agentes/` y llamar al portero.
