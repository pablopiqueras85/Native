# Nicho: salud y deporte

- **Fecha:** 2026-09-23
- **Pregunta:** ¿Encaja el agente comercial externo (ver `mapa-trabajos-por-encargo.md`) en salud y deporte?

## Hallazgo principal: la recepción con IA ya está cubierta

- **Fisioterapia:** varias empresas españolas ya venden recepcionistas de IA que atienden WhatsApp y
  teléfono, agendan sesiones y gestionan bonos: [BeepCall](https://beepcall.ai/soluciones/recepcionista-virtual-fisioterapia),
  [ClinicAI](https://clinicai.es/funcionalidades/empleado-ia), [ConverPilot](https://converpilot.es/fisioterapeutas/),
  [Clinicbot](https://clinicbot.es/), [Minute Call](https://www.minute-call.com/lp/recepcionista-ia-fisioterapia).
- **Gimnasios:** chatbots de WhatsApp y CRMs con IA para captar socios y reservar clases de prueba
  ([ConverPilot](https://converpilot.es/gimnasios/), [BTO Digital](https://btodigital.com/chatbot-whatsapp-gimnasios/),
  [Xora](https://www.xoraagencia.com/blog/chatbot-whatsapp-gimnasios-centros-deportivos-2026.html)).
  Un blog del sector sitúa estos sistemas en 150–400 €/mes más 800–3.500 € de implantación
  ([Javadex](https://www.javadex.es/blog/ia-para-gimnasios-automatizar-gestion-precios-2026), *dato no verificado*).

**Consecuencia:** "responder y agendar" ya es un producto de software que compite en precio. Un
solopreneur que empieza no gana ahí. Lo bueno es que confirma que estos negocios ya pagan por atender
mejor a sus clientes potenciales.

## Dónde sí puede haber hueco: convertir y retener (*hipótesis*)

Los chatbots cubren la parte reactiva: contestar y reservar. La parte comercial es otra cosa: perseguir
al que no se decide, convertir la clase de prueba en alta, acompañar al socio nuevo para que no se dé de
baja y recuperar a los que se fueron. Ahí hace falta criterio de ventas, y ahí está el dinero.

- **Mercado:** el fitness en España cerró 2024 con 6,2 millones de abonados y 4.833 instalaciones
  ([El Boletín](https://www.elboletin.com/gimnasios-en-espana-62-millones-de-socios-y-record-de-clubes/))
  y creció hasta 7,1 millones de abonados en 2025
  ([Gym Factory](https://gymfactory.net/2026/04/15/fuerte-crecimiento-de-socios-e-ingresos-en-el-mercado-europeo-del-fitness-en-2025/)).
- **Abandono:** las cifras publicadas varían mucho según la fuente y el tipo de centro
  ([Statista](https://es.statista.com/estadisticas/1101250/tasa-de-abandono-en-las-instalaciones-deportivas-en-espana-segun-modelo-de-negocio/),
  [Virtuagym](https://business.virtuagym.com/es/blog/evitar-que-la-gente-abandone-el-gimnasio/)).
  Que las bajas se concentren en los primeros meses es una *hipótesis* a verificar con los propios centros.

## Subnichos comparados

| Subnicho | Datos sensibles | Competencia en IA | Veredicto |
|---|---|---|---|
| **Estudios boutique independientes** (pilates reformer, entrenamiento personal, funcional) | En general no | Media | ✅ Mejor candidato |
| Fisioterapia y osteopatía | Sí (salud) | Alta | ⏸ Solo con el ángulo de reactivación de pacientes y cuidando el RGPD |
| Gimnasios independientes | No | Alta (CRMs del sector) | ⏸ |
| Clínicas dentales y de estética | Sí (salud) | Alta | ❌ Para empezar: grandes plataformas y datos sensibles |
| Clubes y escuelas deportivas | Menores | Baja | ❌ Cuota baja y datos de menores |
| Nutricionistas y entrenadores online | Sí (salud) | Media | ❌ Presupuestos pequeños |

**Por qué los estudios boutique (*hipótesis* salvo los datos citados):**

- Cuota más alta que un gimnasio convencional: cada socio perdido duele.
- El dueño suele estar dando clase: no puede contestar ni hacer seguimiento.
- Decide el dueño, rápido.
- Segmento en crecimiento: el pilates reformer es el segmento boutique que más crece, y solo Club Pilates
  tenía 27 estudios en España a cierre de 2025 con un plan de 65 para 2027
  ([Lexpress Franchise](https://lexpress-franchise.com/es/articulos/estado-sector-pilates/)).
- Ojo: las franquicias suelen tener sistemas centrales. El objetivo son los **independientes**.

## La idea candidata

> *Para estudios boutique de fitness independientes que pierden interesados entre la primera consulta
> y el alta, y socios en los primeros meses, un servicio que convierte, acompaña y recupera clientes
> por WhatsApp con agentes de IA, y cobra en función de los socios conseguidos o recuperados.*

**Entregables:**

1. **Conversión:** seguimiento de cada interesado y cada clase de prueba hasta el alta o un "no" claro.
2. **Primeros 90 días:** acompañamiento de socios nuevos (bienvenida, recordatorios, detección de riesgo de baja).
3. **Recuperación:** campañas personalizadas a antiguos socios.
4. **Informe mensual:** altas conseguidas, bajas evitadas, socios recuperados e ingresos atribuidos.

**Precio:** cuota base más un variable por socio conseguido o recuperado (*hipótesis a validar*). Cobrar
por resultados es lo que lo separa del software de 150–400 €/mes.

## Cuidado legal

- **Reglamento Europeo de IA, art. 50:** desde el 2 de agosto de 2026, quien habla con un chatbot debe
  saber que es una IA ([fuente](https://artificialintelligenceact.eu/article/50/)).
- **LSSI, art. 21.2:** permite enviar comunicaciones comerciales a clientes previos sobre productos
  similares, lo que cubre la recuperación de antiguos socios
  ([AEPD](https://www.aepd.es/documento/2018-0164.pdf)).
- **RGPD:** contrato de encargado del tratamiento con cada cliente. En fisioterapia hay datos de salud
  (categoría especial): los agentes no deben pedir más información clínica de la necesaria.

## Siguiente experimento: cliente misterioso en dos pasos

En 20 estudios boutique y 20 clínicas de fisioterapia:

1. Pedir información o una clase de prueba por WhatsApp o formulario. **Medir cuánto tardan en responder.**
2. Contestar "me lo pienso" y **ver si alguien hace seguimiento en los 7 días siguientes.**

El paso 2 mide justo el hueco comercial que los chatbots no cubren. Si casi nadie hace seguimiento,
el dolor existe; si la mayoría lo hace bien, la idea se debilita.
