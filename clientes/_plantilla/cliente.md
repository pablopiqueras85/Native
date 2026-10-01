# Cliente C000 · plantilla

<!-- Copia esta carpeta como clientes/C001/ para cada cliente nuevo (decisión 0009).
     Aquí NO van datos personales: ni el nombre del dueño, ni teléfonos, ni emails, ni datos de sus clientes.
     La relación entre el código y el negocio real vive en la hoja de fichas, fuera de Git. -->

- **Código:** C000
- **Tipo de cliente:** {local con citas / profesional u oficio / tienda online / pyme}
- **Sector:** {estudio de fitness, peluquería, academia, reformas…}
- **Fecha de alta:** AAAA-MM-DD
- **Fase de supervisión:** {1 · arranque (100 %) / 2 · muestreo alto (30 %) / 3 · muestreo bajo (10 %)}

## Empleados contratados

| Empleado | Ficha (receta común) | Dónde trabaja | Versión | Estado |
|---|---|---|---|---|
| {Nombre · puesto} | `sistemas/equipo-digital/agentes/{archivo}.md` | {Claude / ElevenLabs} | {fecha de la versión} | {montaje / en prueba / en uso} |

## Canales (siempre a nombre del cliente)

- **WhatsApp Business:** {sí/no} · cuenta de Meta del cliente
- **Teléfono:** {sí/no} · desvío por {Twilio / su centralita}
- **Agente en ElevenLabs:** "C000 · {puesto}"

## El negocio

- **Servicios y precios:** {lista o enlace al documento del cliente en su Drive}
- **Horario:**
- **Tono:** {tutea o no, emojis o no, cómo se despide}
- **Programa de reservas o de facturación:**

## Ajustes respecto a las recetas

- {"aquí no se ofrecen descuentos sin preguntar", "la clase de prueba es gratis"…}

## Permisos acordados con el dueño

- **Lo hacen solos:**
- **Con su permiso:**
- **Nunca:**

## Registro de cambios

- AAAA-MM-DD · {qué se cambió y por qué}
