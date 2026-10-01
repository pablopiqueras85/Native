# Plugins para los dots de OpenAI

- **Fecha:** 2026-10-01
- **Pregunta:** Con la presentación de los *dots* de OpenAI (DevDay, 2026-09-29), ¿cómo se abre el mercado de
  plugins para ChatGPT y Codex, y en qué nichos tiene más futuro crear uno?
- **Método y límites:** la red de este entorno bloquea la lectura directa de casi todas las webs. Los datos salen
  de los resúmenes del buscador y del catálogo público [`openai/plugins`](https://github.com/openai/plugins)
  (último cambio: 2026-09-28). Antes de basar una decisión en una cifra, hay que comprobarla en su fuente.

## Qué presentó OpenAI

Un **plugin** es un paquete que se instala en ChatGPT o en Codex. Puede llevar instrucciones reutilizables
(*skills*), conexiones con otras aplicaciones (por MCP, el estándar abierto con el que las apps se conectan a los
asistentes de IA) y, desde ahora, pantallas propias.

| Pieza | Qué es | Por qué importa a quien hace plugins |
|---|---|---|
| **Dots** | Agentes "siempre encendidos" dentro de ChatGPT, con ordenador y navegador propios en la nube y memoria. Se les encarga una responsabilidad, no una orden, y siguen reglas sobre qué pueden hacer solos y qué necesita tu aprobación ([OpenAI](https://openai.com/index/introducing-dots/), [ayuda de OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)) | Llegan a más de 4.000 apps **a través de plugins** ([The Next Web](https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday)). Sin plugin, un dot no ve ni toca el sistema de un negocio |
| **Extensiones de plugins** | Un plugin puede tener su sitio en la barra lateral, paneles interactivos junto a la conversación y visores de archivos ([Dataconomy](https://dataconomy.com/2026/09/30/openai-chatgpt-plugin-extensions-sidebar-apps/)) | El plugin deja de ser una herramienta que responde y pasa a ser una aplicación completa dentro de ChatGPT y Codex |
| **MCP Events** | El plugin avisa a ChatGPT cuando pasa algo en la app conectada (un mensaje nuevo, un cambio de estado) y el usuario decide qué debe hacer ChatGPT entonces ([OpenAI](https://developers.openai.com/plugins/build/mcp-events)) | Es lo que convierte al dot en un empleado que reacciona solo, sin que nadie se lo pida ([Nerds Chalk](https://nerdschalk.com/chatgpt-plugin-extensions-mcp-events/)) |
| **Directorio único y Plugin Creator** | Desde el 2026-07-09, ChatGPT y Codex comparten un directorio: el plugin se publica una vez, tras una revisión. Plugin Creator permite crear un plugin conversando con ChatGPT ([OpenAI Developers](https://developers.openai.com/plugins), [ayuda de OpenAI](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt)) | Baja la barrera técnica. OpenAI dice que recomendará los plugins relevantes dentro de las conversaciones de sus 1.200 millones de usuarios semanales ([9to5Mac](https://9to5mac.com/2026/09/29/openai-teases-20-announcements-at-devday-watch-live/)) |
| **OpenAI Marketplace** (beta) | Las grandes empresas pueden gastar parte de lo que ya han comprometido con OpenAI en software de 32 socios: Salesforce, ServiceNow, Adobe, Harvey, CrowdStrike… ([Channel Insider](https://www.channelinsider.com/ai/news-openai-marketplace-enterprise-ai-partner-software/)) | El canal de venta a grandes empresas existe, pero solo para socios elegidos |

**El cambio de fondo:** hasta ahora un plugin era algo que el usuario usaba dentro de un chat. Con los dots y
MCP Events, el plugin pasa a ser **los ojos y las manos de un agente que trabaja las 24 horas**: avisa cuando
entra un contacto, vence una factura o se cancela una clase, y el dot prepara la respuesta. El valor se desplaza
hacia quien controla el aviso, la acción (con sus permisos) y el saber hacer del oficio.

## Las reglas del juego

1. **Cobrar dentro de ChatGPT es difícil.** Según la documentación de OpenAI, el pago se hace en la web del
   desarrollador, la aprobación está limitada a la venta de bienes físicos y no se admiten apps que cobren por
   productos o servicios digitales ([OpenAI](https://developers.openai.com/apps-sdk/build/monetization); comprobar
   si cambia después del DevDay). En la práctica, el plugin es el **escaparate**: el dinero entra por fuera, con
   una suscripción o un servicio propios.
2. **OpenAI compite con su propio catálogo.** En junio lanzó seis plugins por puesto de trabajo (ventas, marketing,
   finanzas, RR. HH., producto y operaciones) conectados a 62 aplicaciones, y prepara otros de legal, finanzas
   corporativas, capital riesgo y consultoría
   ([9to5Mac](https://9to5mac.com/2026/06/02/openai-putting-codex-inside-chatgpt-app-everywhere-releasing-6-business-plugins/),
   [Digital Applied](https://www.digitalapplied.com/blog/openai-codex-chatgpt-business-plugins-june-2026-agentic-work)).
   En su catálogo oficial de ejemplos hay 62 plugins: 24 son para programadores, 12 de productividad y 9 creativos,
   y 26 los firma la propia OpenAI (Gmail, Outlook, Teams, GitHub, Google Drive…). Ninguno está pensado para salud,
   deporte o pequeños negocios de servicios como estudios, clínicas o academias. Anthropic hizo lo mismo con un
   plugin legal en febrero, y las acciones de las empresas de software legal se hundieron
   ([CNN](https://www.cnn.com/2026/02/04/investing/us-stocks-anthropic-software),
   [LawNext](https://www.lawnext.com/2026/02/anthropics-legal-plugin-for-claude-cowork-may-be-the-opening-salvo-in-a-competition-between-foundation-models-and-legal-tech-incumbents.html)).
   **Un plugin genérico es una función que el fabricante del modelo puede regalar mañana.**
3. **Gana quien tiene los datos.** Las empresas dueñas del programa donde vive la información publican su propio
   plugin: Shopify, Stripe, HubSpot, Canva… En fitness, Playlist (Mindbody y ClassPass), que se fusionó con la
   alemana EGYM en marzo por 7.500 millones de dólares, lanzó en julio un recepcionista de IA incluido sin coste
   extra en su plan más alto, de momento solo en EE. UU., Canadá, Australia, Reino Unido, Hong Kong y Singapur
   ([Playlist](https://www.playlist.com/press/playlist-launches-ai-concierge-247-front-desk-assistant-fitness-and-wellness-operators),
   [TechCrunch](https://techcrunch.com/2026/03/31/the-company-behind-classpass-and-mindbody-just-got-a-lot-bigger-with-a-7-5b-merger/)).
4. **Europa llega tarde.** En España los dots no están en el plan Pro, solo en Business Premium: una plaza de un
   espacio de empresa que exige al menos dos plazas, con un coste mínimo de unos 120 $/mes con pago anual o
   150 $/mes mes a mes ([Sergio Comerón](https://sergiocomeron.com/blog/en/posts/llegan-los-dots/),
   [eesel](https://www.eesel.ai/blog/openai-dots-pricing)). Muchos plugins están limitados en el Espacio Económico
   Europeo ([ayuda de OpenAI](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt)), ChatGPT Health
   lo dejó fuera ([Euronews](https://www.euronews.com/next/2026/01/08/open-ai-launches-dedicated-chatgpt-health-feature-with-medical-record-integrations))
   y Muse for Small Business, el agente gratuito para pymes que Meta presentó el mismo día, solo funciona en
   EE. UU. y Canadá ([Meta](https://about.fb.com/news/2026/09/introducing-muse-small-business/),
   [Carly](https://www.usecarly.com/blog/meta-muse-availability/)). Para España es una ventana: ahora hay menos
   competencia, pero también menos clientes que usen estas herramientas.
5. **La plataforma cambia las reglas cada pocos meses.** Los plugins de 2023 se cerraron en abril de 2024
   ([Drag](https://www.dragapp.com/blog/what-happened-to-chatgpt-plugins/)); la GPT Store anunció el reparto de
   ingresos solo para EE. UU. ([VentureBeat](https://venturebeat.com/ai/openai-launches-gpt-store-but-revenue-sharing-is-still-to-come)),
   y el directorio de apps de diciembre de 2025 ([OpenAI](https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/))
   lo sustituyó el de plugins siete meses después. **Defensa:** construir sobre estándares abiertos (MCP para
   conectar apps y *skills* en Markdown para las instrucciones), que ya usan casi todos los asistentes
   ([The New Stack](https://thenewstack.io/openais-codex-gets-plugins/)), para no depender de una sola tienda.

## Tendencias de mercado

- **Programar es el mayor gasto en IA de las empresas:** 4.000 millones de dólares en 2025, el 55 % del gasto por
  departamentos ([Menlo Ventures](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)).
  Codex tenía 4 millones de desarrolladores semanales en abril de 2026 y en julio llegó a 10 millones de usuarios
  semanales sumando ChatGPT Work; en junio, uno de cada cinco usuarios ya no era programador
  ([Digital Applied](https://www.digitalapplied.com/blog/openai-codex-4m-weekly-developers-growth-data),
  [Unite.AI](https://www.unite.ai/openai-says-codex-and-chatgpt-work-hit-10-million-users/),
  [Tech Jack Solutions](https://techjacksolutions.com/ai-brief/openai-codex-passes-5-million-weekly-users-and-1-in-5-arent/)).
- **La IA hecha para un sector concreto casi se triplicó:** 3.500 millones de dólares en 2025; la sanidad se lleva
  casi la mitad ([Menlo Ventures](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)).
- **Consumo:** 230 millones de personas preguntan cada semana a ChatGPT por salud y bienestar, según OpenAI en
  enero de 2026 ([MacRumors](https://www.macrumors.com/2026/01/07/openai-chatgpt-health-apple-health-integration/)), y más del
  70 % del uso no es de trabajo ([NBER](https://www.nber.org/system/files/working_papers/w34255/w34255.pdf)).
- **Del chat al agente que trabaja solo:** OpenAI presentó los dots el mismo día que Meta llevó su agente Muse a
  las pymes ([OpenAI](https://openai.com/index/introducing-dots/),
  [Meta](https://about.fb.com/news/2026/09/introducing-muse-small-business/)), y todos estos agentes necesitan
  conectores para actuar.
- **Las pymes españolas van despacio:** usan IA el 21,1 % de las empresas de 10 o más empleados y el 13,4 % de las
  de menos de 10 ([INE](https://www.ine.es/dyngs/Prensa/ETICCE20241T2025.htm)). *Hipótesis:* durante un tiempo
  preferirán que alguien les haga el trabajo antes que configurar un dot por su cuenta.

## Los nichos, puntuados

Las valoraciones de crecimiento y encaje son criterio propio a partir de los datos de arriba (*hipótesis*), no cifras.

| Nicho | Crecimiento | Competencia y riesgo | Encaje con el fundador | Veredicto |
|---|---|---|---|---|
| Herramientas para programadores en Codex (revisión de código, pruebas, seguridad, migraciones) | Muy alto | Muy alta: Vercel, Sentry, CodeRabbit, Stripe… y la propia OpenAI | Muy bajo: no es desarrollador | ❌ |
| Trabajo de oficina genérico (ventas, marketing, finanzas, RR. HH.) | Alto | Máxima: plugins de OpenAI por puesto, HubSpot y Salesforce oficiales | Medio | ❌ |
| Consumo: viajes, comida, compras, ocio | Alto | Grandes marcas con producto propio; solo se cobra por bienes físicos | Bajo: no tiene producto | ❌ |
| Salud y bienestar del consumidor | Muy alto | Apple Health, Peloton, MyFitnessPal; datos de salud; ChatGPT Health no está en el EEE | Le atrae, pero bloqueado en España | ⏸ Vigilar |
| Software para grandes empresas (legal, ciberseguridad, atención al cliente) | Muy alto | Empresas con mucha financiación (Harvey, Legora, Sierra, Decagon) | Bajo, y choca con la línea roja de no levantar rondas | ❌ |
| **Puentes con el software local de las pymes** (el programa de reservas, gestión o facturación que no tiene plugin oficial) | Medio hoy; alto cuando los dots lleguen a las pymes | El fabricante puede lanzar su propio plugin o su propia IA, como Mindbody con su recepcionista | Medio: depende de que el fabricante abra su API (ver abajo) | ⏸ Prometedor |
| **Trabajo comercial que reacciona a avisos** (seguimiento de contactos y presupuestos, reactivación, cobros) | Alto: es justo el trabajo de un dot | Alta en genérico (CRMs, OpenAI, Muse); baja en un sector concreto y en español | **Alto: es su oficio** | ✅ Como motor de la idea 0001 |
| Licitaciones y subvenciones (vigilar convocatorias y preparar la primera versión) | Medio | Media | Medio: sabe ofertar, pero exige conocimiento experto | ⏸ Igual que en el [mapa](mapa-trabajos-por-encargo.md) |
| Implantar plugins privados para empresas (agencia) | Alto a corto plazo | Media | Alto en venta, bajo en técnica | ⏸ Solo si se convierte en un paquete repetible ([decisión 0002](../decisiones/0002-descartar-sector-industrial.md)) |

### Por qué destaca el trabajo comercial que reacciona a avisos

- **Es el trabajo para el que están hechos los dots:** vigilar, insistir y no olvidarse. El ejemplo de lanzamiento
  fue un dot que detectó una factura que nunca se había enviado, la preparó y la mandó tras pedir permiso
  ([The Next Web](https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday)).
- **Hay dinero a la vista:** un contacto que se enfría o una factura sin cobrar son euros perdidos. En España, el
  sector privado tardó de media 67 días en pagar en 2025 y el 85 % de las grandes empresas incumple los plazos
  legales ([PMcM](https://pmcm.es/wp-content/uploads/2026/04/Informe-Morosidad-2025_PMcM-VF.pdf)).
- **Lo genérico ya tiene dueño; lo concreto, no tanto.** Un plugin "de ventas" compite con OpenAI y HubSpot. Uno
  que sabe convertir una clase de prueba en un alta en un estudio de pilates, y que se conecta a su programa de
  reservas, tiene mucha menos competencia (*hipótesis*). No hemos encontrado plugins oficiales de los programas
  que usan los estudios en España (bsport, Glofox, Aimharder…,
  [Fitnova](https://www.fitnova.eu/blog/mejor-software-gimnasios)); solo un conector no oficial de Aimharder,
  para socios, de solo lectura y sin terminar ([GitHub](https://github.com/rudeayelo/aimharder-mcp)).
- **La base técnica existe:** bsport y Glofox tienen API para empresas asociadas, con avisos automáticos
  (*webhooks*) de reservas, socios y facturas, justo lo que necesita MCP Events
  ([bsport](https://api-docs.dev.bsport.io/), [Glofox](https://apidocs-plat.aws.glofox.com/cdc-webhooks/)).
  Aimharder no parece tener API pública, aunque sí integraciones con socios como Urban Sports Club
  ([Urban Sports Club](https://uscpam.zendesk.com/hc/en-gb/articles/24430240241682-All-about-the-integration-with-AimHarder);
  *por confirmar*).
- **WhatsApp no es la diferencia:** Meta permite que un negocio atienda a sus propios clientes con IA por la API de
  WhatsApp Business (lo que restringió en 2026 fueron los asistentes de uso general,
  [respond.io](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban)), y ya hay conectores de terceros
  para usarlo desde ChatGPT ([LetsBot](https://letsbot.net/en/chatgpt.html),
  [Composio](https://composio.dev/toolkits/whatsapp/framework/chatgpt)). El hueco está en el programa de reservas
  y en el saber hacer comercial.
- **El criterio comercial del fundador es el control de calidad,** igual que en el servicio: qué decir, cuándo
  insistir y cuándo parar.

## Qué significa para la idea 0001

Los dots son a la vez una **amenaza** y una **herramienta** para el
[agente comercial para estudios boutique](ideas/0001-agente-comercial-estudios-boutique.md):

- **Amenaza.** Con los dots y Muse, hacer seguimiento a cada contacto se convierte en una función que viene de serie
  con el asistente. La pregunta "¿lo puede hacer el cliente solo?" del
  [mapa de trabajos](mapa-trabajos-por-encargo.md) pasa de "no" a "pronto, en parte". Nuestro valor tiene que estar
  en el resultado, en el criterio y en la conexión con los sistemas del estudio, no en redactar mensajes.
- **Pero hoy, en España, es difícil que el estudio lo haga solo:** necesitaría Business Premium (desde unos
  120 $/mes), un conector de terceros para WhatsApp, conectar su programa de reservas, que no tiene plugin oficial,
  y saber qué decir. Ni Muse para pymes ni el recepcionista de Mindbody han llegado todavía.
- **Herramienta.** El fundador puede usar dots y plugins como su propio equipo para dar servicio a varios estudios a
  la vez, lo que refuerza la prueba del doble. El plugin "puente" (contactos, reservas, WhatsApp y guiones de
  seguimiento) sería el motor interno del servicio y, más adelante, un producto para los estudios que ya usen
  ChatGPT de empresa.
- **Ventana de tiempo** (*hipótesis*): de 12 a 24 meses antes de que los grandes (Playlist-EGYM, Meta, OpenAI)
  cubran España. Refuerza el principio 7: experimentos de días, no de meses.

**Propuesta, pendiente de que el fundador la apruebe:** añadir a la idea 0001 la hipótesis *"Durante 2026 y 2027,
los dueños de estudios no montarán por su cuenta un dot o un agente equivalente para hacer el seguimiento
comercial"*, y vigilar como competidores a los dots, a Muse for Small Business y al recepcionista de Playlist.

## Recomendación

1. **No convertir la empresa en un fabricante de plugins.** El plugin es un canal y un motor, no el negocio
   (principio 4: vender resultados). Hoy no se puede cobrar dentro de ChatGPT por un servicio digital, y lo genérico
   lo regala la plataforma.
2. **Si se hace un plugin, que sea de trabajo comercial para estudios boutique:** el mismo cliente y el mismo dolor
   de la idea 0001, en otro formato.
3. **Construir sobre estándares abiertos** (MCP y *skills*), para que el mismo trabajo sirva en ChatGPT, Codex,
   Claude o el agente que acabe ganando.
4. **No pagar Business Premium todavía.** Los dots compensan cuando haya clientes a los que dar servicio.

## Siguiente experimento

Tres pasos baratos que encajan con el [embudo de diagnóstico](../sistemas/embudo-diagnostico.md):

1. **Dos preguntas más en el cuestionario:** qué programa de reservas usa el estudio y si usa ChatGPT (y con qué
   plan). Dicen qué conector habría que construir primero y si los estudios podrían usar un plugin. Coste: 10 minutos.
2. **Un plugin solo de instrucciones, para uso propio,** hecho con Plugin Creator: guiones de seguimiento,
   cualificación y reactivación para estudios boutique. Sirve para el embudo, es práctica del curso de AI Builder y
   queda como portfolio. Coste: una tarde. Antes, comprobar que Plugin Creator funciona en España con el plan
   actual del fundador.
3. **Pedir acceso de empresa asociada a las API de bsport y Glofox, y preguntar a Aimharder cómo integrarse.**
   Sin esos avisos automáticos no hay MCP Events ni dot que reaccione. Las respuestas de cada uno a esa petición
   también dicen si verían con buenos ojos un plugin hecho por otro. Coste: 1–2 horas.

**Cuándo revisar este análisis:** si los dots llegan al plan Pro en el EEE, si Muse para pymes o el recepcionista
de Playlist llegan a España, o si OpenAI permite cobrar servicios digitales dentro de ChatGPT. Si no pasa nada de
eso, el 2027-01-15.
