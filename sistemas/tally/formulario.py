#!/usr/bin/env python3
"""Crea en Tally el formulario del cuestionario de diagnóstico y la página de la política de privacidad.

Traslada a la API de Tally lo que describe sistemas/montaje-tally.md. Solo usa la biblioteca estándar
de Python.

Uso:
    python3 sistemas/tally/formulario.py comprobar
        Comprueba que la clave de Tally funciona (debe responder 200).
    python3 sistemas/tally/formulario.py ver [--privacidad-url URL] [--con-logica]
        Imprime el JSON que se enviaría, sin tocar Tally.
    python3 sistemas/tally/formulario.py crear [--privacidad-url URL] [--con-logica]
        Crea el formulario como BORRADOR y comprueba que Tally lo ha guardado entero. Sin
        --privacidad-url, la pregunta 22 lleva un enlace provisional y el formulario no se puede publicar.
    python3 sistemas/tally/formulario.py enlace ID URL
        Cambia el enlace a la política de la pregunta 22 en un formulario ya creado.
    python3 sistemas/tally/formulario.py publicar ID
        Publica el formulario (o lo reabre si estaba cerrado) y muestra su enlace público. Se niega si
        la pregunta 22 sigue con el enlace provisional. Ojo: la API no permite volver a borrador; para
        retirarlo hay que cerrarlo (ajuste isClosed).
    python3 sistemas/tally/formulario.py privacidad RUTA.md
        Crea la política de privacidad como una página de Tally sin preguntas, a partir del texto
        completado (sin corchetes pendientes).

La clave:
    En el entorno de Claude no hace falta nada: el proxy añade la cabecera Authorization a cada
    petición a api.tally.so. En otro ordenador, exporta TALLY_API_KEY con la clave antes de ejecutarlo.

Lo aprendido de la API (probado el 2026-09-23):
    - Tally valida bloque a bloque y dice qué campo falla. Acepta "html" y lo guarda como safeHTMLSchema.
    - Los encabezados usan su propio tipo como groupType (HEADING_2 → HEADING_2).
    - La página de agradecimiento es un PAGE_BREAK con "isThankYouPage": true (THANK_YOU_PAGE solo
      existe como groupType y no se acepta como tipo de bloque).
    - El bloque CONDITIONAL_LOGIC (--con-logica) se guarda tal cual, pero la API no dice si Tally lo
      interpreta bien: hay que comprobarlo en la vista previa del editor. Si falla, se añade a mano.
"""

import argparse
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request
import uuid

API = "https://api.tally.so"

TITULO = "Diagnóstico comercial de tu estudio"

ENTRADA = (
    "Responde unas preguntas sobre cómo captas, atiendes y retienes clientes y te enviaré un diagnóstico "
    "personalizado: dónde se te escapan clientes, cuánto dinero supone al mes, cuántas horas de trabajo "
    "manual te podrías quitar y cómo compara tu estudio con otros centros como el tuyo. Son 5 minutos y "
    "sin compromiso."
)

CAMPOS_OCULTOS = [
    "origen",
    "nota",
    "calc_horas_manuales",
    "calc_facturacion_mensual",
    "calc_horas_totales",
    "calc_precio_sesion",
    "calc_coste_mensual",
]

# Tipos de pregunta: "opcion" (Multiple choice), "varias" (Checkboxes), "corto" (Short answer),
# "largo" (Long answer), "email" y "telefono".
PAGINAS = [
    ("Tu centro", [
        ("1", "¿Qué tipo de centro tienes?", "opcion",
         ["Pilates reformer", "Pilates suelo", "Entrenamiento personal", "Funcional o cross-training",
          "Fisioterapia", "Otro"], True),
        ("2", "¿Cuántos socios activos tienes al mes?", "opcion",
         ["Menos de 50", "50–100", "100–200", "200–400", "Más de 400"], True),
        ("3", "¿Cuál es la cuota media mensual por socio?", "opcion",
         ["Menos de 50 €", "50–80 €", "80–120 €", "120–180 €", "Más de 180 €"], True),
        ("4", "¿Quién responde WhatsApp, teléfono y redes?", "opcion",
         ["Yo", "Un recepcionista", "Varias personas del equipo", "Nadie en concreto"], True),
    ]),
    ("Captación", [
        ("5", "¿Cuántas consultas nuevas recibes a la semana, sumando todas las vías?", "opcion",
         ["Menos de 5", "5–10", "10–20", "Más de 20", "No lo sé"], True),
        ("6", "¿Por dónde llegan?", "varias",
         ["WhatsApp", "Instagram", "Teléfono", "Formulario web", "Google", "En persona",
          "Plataformas de reservas"], True),
        ("7", "¿Cuánto soléis tardar en responder a una consulta nueva?", "opcion",
         ["Menos de 15 minutos", "Menos de 1 hora", "El mismo día", "Al día siguiente o más",
          "Depende del día"], True),
        ("8", "Cuando alguien dice \"me lo pienso\" o no viene a la clase de prueba, ¿qué hacéis?", "opcion",
         ["Nada", "Le enviamos un mensaje", "Varios seguimientos", "Tenemos un sistema automático"], True),
        ("9", "De cada 10 personas que hacen una clase de prueba, ¿cuántas se dan de alta?", "opcion",
         ["0–2", "3–4", "5–6", "7 o más", "No lo sé"], True),
    ]),
    ("Retención", [
        ("10", "¿Cuántas bajas tienes al mes, aproximadamente?", "opcion",
         ["0–2", "3–5", "6–10", "Más de 10", "No lo sé"], True),
        ("11", "En los últimos 6 meses, ¿habéis contactado a antiguos socios para que vuelvan?", "opcion",
         ["No", "Alguna vez", "De forma sistemática"], True),
    ]),
    ("Lo que envías a tus clientes", [
        ("12", "Además de confirmar citas, ¿qué envías a mano a tus clientes?", "varias",
         ["Entrenamientos o rutinas", "Pautas de nutrición", "Ejercicios para casa",
          "Seguimiento de progreso o mediciones", "Recordatorios y mensajes de motivación",
          "Vídeos o explicaciones", "Nada"], True),
        ("13", "¿Por dónde lo envías?", "varias",
         ["WhatsApp", "Email", "PDF", "App de entrenamiento", "Programa de gestión", "Redes sociales"], False),
        ("14", "¿Cómo de personalizado es?", "opcion",
         ["Igual para todos", "Por grupos o niveles", "Individual para cada cliente"], False),
        ("15", "¿Cuántas horas a la semana dedicáis a prepararlo y enviarlo?", "opcion",
         ["Menos de 1", "1–3", "3–5", "5–10", "Más de 10", "No lo sé"], False),
    ]),
    ("Herramientas y prioridades", [
        ("16", "¿Qué programa usáis para reservas y gestión?", "corto", None, False),
        ("17", "¿Habéis pagado alguna vez a alguien (una persona o una herramienta) para captar o retener "
               "clientes? ¿Qué tal fue?", "largo", None, False),
        ("18", "Si mañana pudieras quitarte de encima una tarea repetitiva con tus clientes, ¿cuál sería?",
         "largo", None, False),
    ]),
    ("Para enviarte tu diagnóstico", [
        ("19a", "Tu nombre", "corto", None, True),
        ("19b", "Nombre del centro", "corto", None, True),
        ("19c", "Ciudad", "corto", None, True),
        ("20a", "Email", "email", None, True),
        ("20b", "WhatsApp (si prefieres recibirlo por ahí)", "telefono", None, False),
        ("21", "¿Quieres comentar el diagnóstico en una llamada de 20 minutos?", "opcion",
         ["Sí", "Prefiero solo el informe"], True),
    ]),
]

CONSENTIMIENTO = (
    "He leído la política de privacidad y acepto que se traten mis datos para elaborar y enviarme el "
    "diagnóstico."
)

# Lógica condicional: si la 12 contiene "Nada", se ocultan la 13, la 14 y la 15.
LOGICA = {"pregunta": "12", "opcion": "Nada", "ocultar": ["13", "14", "15"]}

GRACIAS = [
    "<strong>¡Gracias!</strong> Ya tengo tus respuestas. Te enviaré tu diagnóstico personalizado en los "
    "próximos días.",
    "Si mientras tanto quieres añadir algo, responde al email en el que te llegue.",
]

ENLACE_PENDIENTE = "https://enlace-pendiente.invalid/politica-de-privacidad"

TIPOS_ENTRADA = {
    "corto": "INPUT_TEXT",
    "largo": "TEXTAREA",
    "email": "INPUT_EMAIL",
    "telefono": "INPUT_PHONE_NUMBER",
}


def nuevo_id():
    return str(uuid.uuid4())


def bloque(tipo, tipo_grupo, payload, grupo=None):
    return {
        "uuid": nuevo_id(),
        "type": tipo,
        "groupUuid": grupo or nuevo_id(),
        "groupType": tipo_grupo,
        "payload": payload,
    }


def opciones(tipo, tipo_grupo, textos, obligatoria):
    grupo = nuevo_id()
    return [
        bloque(tipo, tipo_grupo, {
            "isRequired": obligatoria,
            "index": i,
            "isFirst": i == 0,
            "isLast": i == len(textos) - 1,
            "text": texto,
        }, grupo)
        for i, texto in enumerate(textos)
    ]


def pregunta(titulo, tipo, textos, obligatoria):
    """Devuelve los bloques de una pregunta: su título y su campo (o sus opciones)."""
    bloques = [bloque("TITLE", "QUESTION", {"html": html.escape(titulo, quote=False)})]
    if tipo == "opcion":
        bloques += opciones("MULTIPLE_CHOICE_OPTION", "MULTIPLE_CHOICE", textos, obligatoria)
    elif tipo == "varias":
        bloques += opciones("CHECKBOX", "CHECKBOXES", textos, obligatoria)
    else:
        entrada = TIPOS_ENTRADA[tipo]
        bloques.append(bloque(entrada, entrada, {"isRequired": obligatoria, "placeholder": ""}))
    return bloques


def salto_de_pagina(indice, total):
    return bloque("PAGE_BREAK", "PAGE_BREAK", {
        "index": indice,
        "isFirst": indice == 0,
        "isLast": indice == total - 1,
    })


def texto(contenido_html):
    return bloque("TEXT", "TEXT", {"html": contenido_html})


def logica_condicional(preguntas):
    """Bloque CONDITIONAL_LOGIC. Formato supuesto: validarlo contra la API antes de fiarse."""
    origen = preguntas[LOGICA["pregunta"]]
    opcion = next(b for b in origen[1:] if b["payload"]["text"] == LOGICA["opcion"])
    ocultar = [b["uuid"] for n in LOGICA["ocultar"] for b in preguntas[n]]
    return bloque("CONDITIONAL_LOGIC", "CONDITIONAL_LOGIC", {
        "logicalOperator": "AND",
        "conditionals": [{
            "uuid": nuevo_id(),
            "type": "SINGLE",
            "payload": {
                "field": {
                    "uuid": origen[1]["groupUuid"],
                    "type": "INPUT_FIELD",
                    "questionType": "CHECKBOXES",
                    "blockGroupUuid": origen[1]["groupUuid"],
                    "title": origen[0]["payload"]["html"],
                },
                "comparison": "CONTAINS",
                "value": opcion["uuid"],
            },
        }],
        "actions": [{
            "uuid": nuevo_id(),
            "type": "HIDE_BLOCKS",
            "payload": {"hideBlocks": ocultar},
        }],
    })


def cuerpo_formulario(privacidad_url, con_logica):
    bloques = [
        bloque("FORM_TITLE", "TEXT", {"html": TITULO, "title": TITULO}),
        texto(html.escape(ENTRADA, quote=False)),
        bloque("HIDDEN_FIELDS", "HIDDEN_FIELDS", {
            "hiddenFields": [{"uuid": nuevo_id(), "name": nombre} for nombre in CAMPOS_OCULTOS],
        }),
    ]
    preguntas = {}
    for i, (seccion, lista) in enumerate(PAGINAS):
        if i > 0:
            bloques.append(salto_de_pagina(i - 1, len(PAGINAS)))
        bloques.append(bloque("HEADING_2", "HEADING_2", {"html": html.escape(seccion, quote=False)}))
        for numero, titulo, tipo, textos, obligatoria in lista:
            preguntas[numero] = pregunta(titulo, tipo, textos, obligatoria)
            bloques += preguntas[numero]
            if con_logica and numero == LOGICA["pregunta"]:
                bloques.append(None)  # hueco para la lógica, que necesita las preguntas de después

    # Pregunta 22: el enlace va en un texto justo encima, porque las opciones no admiten enlaces.
    enlace = html.escape(privacidad_url or ENLACE_PENDIENTE, quote=True)
    bloques += [
        bloque("TITLE", "QUESTION", {"html": "Consentimiento"}),
        texto(f'Antes de enviar, lee la <a href="{enlace}" target="_blank">política de privacidad</a>.'),
    ]
    bloques += opciones("CHECKBOX", "CHECKBOXES", [CONSENTIMIENTO], True)

    bloques.append(bloque("PAGE_BREAK", "PAGE_BREAK", {
        "index": len(PAGINAS) - 1, "isFirst": False, "isLast": True, "isThankYouPage": True,
    }))
    bloques += [texto(parrafo) for parrafo in GRACIAS]

    if con_logica:
        bloques[bloques.index(None)] = logica_condicional(preguntas)

    return {"status": "DRAFT", "blocks": bloques, "settings": {"language": "es"}}


def resumen(bloques):
    cuenta = {}
    for b in bloques:
        cuenta[b["type"]] = cuenta.get(b["type"], 0) + 1
    return cuenta


def peticion(metodo, ruta, datos=None):
    # Cloudflare, delante de Tally, bloquea el User-Agent por defecto de Python (error 1010).
    cabeceras = {"Content-Type": "application/json", "Accept": "application/json",
                 "User-Agent": "native-montaje-tally/1.0"}
    if os.environ.get("TALLY_API_KEY"):
        cabeceras["Authorization"] = "Bearer " + os.environ["TALLY_API_KEY"]
    cuerpo = json.dumps(datos).encode("utf-8") if datos is not None else None
    req = urllib.request.Request(API + ruta, data=cuerpo, headers=cabeceras, method=metodo)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            contenido = r.read().decode("utf-8")
            return r.status, json.loads(contenido) if contenido else None
    except urllib.error.HTTPError as e:
        detalle = e.read().decode("utf-8", "replace")
        aviso = e.headers.get("X-Proxy-Error")
        sys.exit(f"Tally respondió {e.code} a {metodo} {ruta}: {detalle}" + (f"\nProxy: {aviso}" if aviso else ""))


def comprobar(_):
    estado, _datos = peticion("GET", "/users/me")
    print(f"La clave funciona ({estado}).")


def ver(args):
    cuerpo = cuerpo_formulario(args.privacidad_url, args.con_logica)
    print(json.dumps(cuerpo, ensure_ascii=False, indent=2))
    print(f"\nBloques: {resumen(cuerpo['blocks'])}", file=sys.stderr)


def crear(args):
    if not args.privacidad_url:
        print("Aviso: sin --privacidad-url, la pregunta 22 lleva un enlace provisional y no se podrá publicar.")
    cuerpo = cuerpo_formulario(args.privacidad_url, args.con_logica)
    _estado, form = peticion("POST", "/forms", cuerpo)
    form_id = form["id"]
    print(f"Formulario creado como borrador: {form_id}")

    # Se vuelve a leer para comprobar que Tally ha guardado todos los bloques enviados.
    _estado, guardado = peticion("GET", f"/forms/{form_id}")
    enviados, recibidos = resumen(cuerpo["blocks"]), resumen(guardado.get("blocks", []))
    diferencias = {t: (enviados.get(t, 0), recibidos.get(t, 0))
                   for t in set(enviados) | set(recibidos) if enviados.get(t, 0) != recibidos.get(t, 0)}
    if diferencias:
        print("Atención: Tally no guardó lo mismo que se envió (tipo: enviados, guardados):")
        for tipo, (a, b) in sorted(diferencias.items()):
            print(f"  {tipo}: {a}, {b}")
    else:
        print(f"Comprobado: Tally guardó los {len(cuerpo['blocks'])} bloques.")
    print(f"Revísalo en el editor: https://tally.so/forms/{form_id}/edit")
    print(f"Para publicarlo: python3 {sys.argv[0]} publicar {form_id}")


def publicar(args):
    _estado, form = peticion("GET", f"/forms/{args.id}")
    if ENLACE_PENDIENTE in json.dumps(form):
        sys.exit("No se publica: falta el enlace a la política de privacidad en la pregunta 22.")
    peticion("PATCH", f"/forms/{args.id}", {"status": "PUBLISHED", "settings": {"isClosed": False}})
    print(f"Publicado: https://tally.so/r/{args.id}")


def enlace(args):
    """Cambia el enlace a la política de privacidad de la pregunta 22 en un formulario ya creado."""
    _estado, form = peticion("GET", f"/forms/{args.id}")
    cambiados = 0
    for b in form["blocks"]:
        for trozo in b["payload"].get("safeHTMLSchema", []) if b["type"] == "TEXT" else []:
            if len(trozo) > 1 and trozo[0] == "política de privacidad":
                for atributo in trozo[1]:
                    if atributo[0] == "href":
                        atributo[1] = args.url
                        cambiados += 1
    if cambiados != 1:
        sys.exit(f"Se esperaba un enlace a la política y hay {cambiados}: no se cambia nada.")
    peticion("PATCH", f"/forms/{args.id}", {"blocks": form["blocks"]})
    print(f"Enlace de la pregunta 22 cambiado a {args.url}")


def html_en_linea(linea):
    """Convierte **negrita** y [texto](enlace) de Markdown a HTML."""
    linea = html.escape(linea, quote=False)
    linea = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", linea)
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2" target="_blank">\1</a>', linea)


def bloques_desde_markdown(md):
    """Convierte la política (desde su título '## ...') en bloques de Tally."""
    lineas = md.splitlines()
    inicio = next(i for i, l in enumerate(lineas) if l.startswith("## "))
    titulo = lineas[inicio][3:].strip()
    bloques = [bloque("FORM_TITLE", "TEXT", {"html": titulo, "title": titulo})]
    parrafo = []  # líneas del párrafo o del punto de lista en curso

    def cerrar_parrafo():
        if parrafo:
            bloques.append(texto(html_en_linea(" ".join(parrafo))))
            parrafo.clear()

    for linea in lineas[inicio + 1:]:
        l = linea.strip()
        if l.startswith("### "):
            cerrar_parrafo()
            bloques.append(bloque("HEADING_2", "HEADING_2", {"html": html_en_linea(l[4:])}))
        elif l.startswith("|"):
            cerrar_parrafo()
            celdas = [c.strip() for c in l.strip("|").split("|")]
            if set("".join(celdas)) <= set("-: ") or celdas[0] == "Proveedor":
                continue  # separador o cabecera de la tabla
            bloques.append(texto(html_en_linea("• " + ": ".join(celdas))))
        elif re.match(r"^(-|\d+\.) ", l):
            cerrar_parrafo()
            vineta = "•" if l.startswith("-") else l.split(" ", 1)[0]
            parrafo += [vineta, l.split(" ", 1)[1]]
        elif not l or l == "---":
            cerrar_parrafo()
        elif l.startswith(">"):
            continue
        else:
            parrafo.append(l)  # también une las líneas que continúan un punto de lista
    cerrar_parrafo()
    return bloques


def privacidad(args):
    with open(args.ruta, encoding="utf-8") as f:
        md = f.read()
    pendientes = re.findall(r"\[[^\]]+\](?!\()", md)
    if pendientes:
        sys.exit(f"Quedan huecos por rellenar: {', '.join(sorted(set(pendientes)))}")
    cuerpo = {"status": "PUBLISHED", "blocks": bloques_desde_markdown(md), "settings": {"language": "es"}}
    _estado, form = peticion("POST", "/forms", cuerpo)
    print(f"Política publicada: https://tally.so/r/{form['id']}")


def main():
    p = argparse.ArgumentParser(description="Monta en Tally el formulario del diagnóstico.")
    sub = p.add_subparsers(dest="orden", required=True)
    sub.add_parser("comprobar").set_defaults(fn=comprobar)
    for nombre, fn in (("ver", ver), ("crear", crear)):
        s = sub.add_parser(nombre)
        s.add_argument("--privacidad-url")
        s.add_argument("--con-logica", action="store_true",
                       help="añade la lógica de la pregunta 12 (formato por validar)")
        s.set_defaults(fn=fn)
    s = sub.add_parser("publicar")
    s.add_argument("id")
    s.set_defaults(fn=publicar)
    s = sub.add_parser("enlace")
    s.add_argument("id")
    s.add_argument("url")
    s.set_defaults(fn=enlace)
    s = sub.add_parser("privacidad")
    s.add_argument("ruta")
    s.set_defaults(fn=privacidad)
    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
