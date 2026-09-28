# 0004 — Enviar el diagnóstico por email de forma automática

- **Fecha:** 2026-09-28
- **Estado:** aceptada (pendiente de activar: falta la cuenta de Brevo)

## Contexto

La decisión 0003 dejó el envío en manual: los agentes preparan un borrador y el fundador lo revisa y lo
manda. El fundador quiere que el informe llegue solo a quien responde, en el mismo email que el enlace a la
landing, empezando por la demo con el estudio de un amigo. Todavía no comercializa: el informe va sin precio
y sin enlace de agenda.

## Decisión

Cuando llega una respuesta, la rutina prepara el informe y lo envía por **email con Brevo** al correo que dejó
la persona, con el enlace a la calculadora de la landing al final. El coordinador solo envía si el informe
pasa la lista de comprobación. Si no la pasa (huecos, datos dudosos o una respuesta de prueba), se queda
como borrador para el fundador. El email lo lee y lo usa el script `sistemas/diagnostico/enviar.py`, sin que
lo vea ningún agente.

## Alternativas consideradas

- **Seguir enviando a mano:** es más seguro, pero el fundador quiere probar el flujo completo.
- **WhatsApp automático:** exige la API de WhatsApp Business (verificación de empresa en Meta, plantillas
  aprobadas y coste por conversación). Es demasiado para una demo. WhatsApp se queda en manual.
- **Resend:** sin dominio propio solo deja enviar a tu propia dirección. Brevo permite enviar desde un email
  verificado, tiene un plan gratuito (*hipótesis*: unos 300 emails al día, confirmarlo al crear la cuenta) y es
  una empresa europea.
- **Conector de Gmail:** no está disponible en esta sesión.
- **Que la IA lea el email y lo envíe:** contradice la política de privacidad («la IA nunca ve tu email»).

## Consecuencias

- Sustituye en parte a la decisión 0003: el envío deja de ser siempre manual. La revisión del fundador pasa
  a ser posterior en los informes que pasan la lista de comprobación.
- Riesgo: un informe con errores le llega directamente a un prospecto. Lo asumimos en la demo con un amigo.
  Se revisa con las 3 primeras respuestas reales: si alguna habría necesitado cambios importantes, se vuelve a
  revisar antes de enviar.
- Brevo pasa a ser proveedor en la política de privacidad. Hay que republicarla antes del primer envío real.
- **Para activarlo**, el fundador:
  1. Crea una cuenta en Brevo, verifica su email como remitente y genera una clave de API.
  2. En la configuración del entorno añade `BREVO_API_KEY` (la clave) y `BREVO_REMITENTE` (el email
     verificado), y permite `api.brevo.com` en el acceso a la red.
  3. Cuando la landing esté publicada, su enlace va en `LANDING_URL`, dentro de `enviar.py`.
  - Hecho esto: `python3 sistemas/diagnostico/enviar.py comprobar` y una prueba con `enviar --prueba`, que se
    envía al propio fundador.
