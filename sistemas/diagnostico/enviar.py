#!/usr/bin/env python3
"""Envía por email el informe del diagnóstico a quien respondió el cuestionario, con el enlace a la landing.

Uso:
    python3 sistemas/diagnostico/enviar.py comprobar
        Comprueba que la clave de Brevo funciona y que el remitente está configurado.
    python3 sistemas/diagnostico/enviar.py enviar --id ID_RESPUESTA --informe RUTA.md [--prueba]
        Envía el informe (Markdown) a la persona que dejó su email en esa respuesta de Tally.
        Con --prueba se envía al remitente (el fundador) en lugar de al centro.

Por qué es un script aparte: el email del destinatario lo lee este script directamente de Tally y se lo pasa a
Brevo. Nunca lo imprime entero (solo enmascarado, p. ej. "pa***@gmail.com"), así que ni los agentes ni la
sesión de Claude lo ven. El informe no lleva datos de contacto.

Configuración (en el entorno, nunca en el repositorio):
    BREVO_API_KEY   clave de la API de Brevo (https://app.brevo.com, "SMTP y API").
    BREVO_REMITENTE email del remitente, verificado en Brevo como "sender".
La red del entorno tiene que permitir api.brevo.com.
"""

import argparse
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tally"))
from formulario import peticion  # noqa: E402

FORMULARIO = "RGpogp"
BREVO = "https://api.brevo.com/v3"
NOMBRE_REMITENTE = "Pablo Piqueras"

# Enlace a la landing con la calculadora. Vacío mientras no esté publicada: entonces el email sale sin él.
LANDING_URL = ""


def brevo(metodo, ruta, datos=None):
    clave = os.environ.get("BREVO_API_KEY")
    if not clave:
        sys.exit("Falta BREVO_API_KEY en el entorno.")
    cabeceras = {"api-key": clave, "Content-Type": "application/json", "Accept": "application/json"}
    cuerpo = json.dumps(datos).encode("utf-8") if datos is not None else None
    req = urllib.request.Request(BREVO + ruta, data=cuerpo, headers=cabeceras, method=metodo)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            contenido = r.read().decode("utf-8")
            return r.status, json.loads(contenido) if contenido else None
    except urllib.error.HTTPError as e:
        sys.exit(f"Brevo respondió {e.code} a {metodo} {ruta}: {e.read().decode('utf-8', 'replace')}")
    except urllib.error.URLError as e:
        sys.exit(f"No se pudo conectar con Brevo ({e.reason}). ¿Está api.brevo.com permitido en la red?")


def remitente():
    email = os.environ.get("BREVO_REMITENTE")
    if not email:
        sys.exit("Falta BREVO_REMITENTE en el entorno.")
    return email


def enmascarar(email):
    usuario, _, dominio = email.partition("@")
    return f"{usuario[:2]}***@{dominio}"


def contacto(id_respuesta):
    """Devuelve (email, centro) de una respuesta. El email no sale de este script sin enmascarar."""
    pagina = 1
    while True:
        _estado, datos = peticion("GET", f"/forms/{FORMULARIO}/submissions?page={pagina}&limit=100")
        preguntas = {q["id"]: q.get("title") or "" for q in datos.get("questions", [])}
        for envio in datos.get("submissions", []):
            if envio["id"] != id_respuesta:
                continue
            campos = {preguntas.get(r["questionId"], ""): r["answer"] for r in envio["responses"]}
            email = next((v for k, v in campos.items() if k.startswith("Email")), None)
            centro = campos.get("Nombre del centro") or "tu centro"
            if not email or "@" not in str(email):
                sys.exit(f"La respuesta {id_respuesta} no tiene un email válido.")
            return str(email).strip(), centro
        if not datos.get("hasMore"):
            sys.exit(f"No encuentro la respuesta {id_respuesta} en Tally.")
        pagina += 1


def en_linea(texto):
    texto = html.escape(texto)
    texto = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", texto)
    texto = re.sub(r"(?<!\*)\*(?!\s)(.+?)(?<!\s)\*(?!\*)", r"<em>\1</em>", texto)
    texto = re.sub(r"\[(.+?)\]\((https?://[^)\s]+)\)", r'<a href="\2">\1</a>', texto)
    return texto


def a_html(markdown):
    """Markdown sencillo (títulos, párrafos, listas, tablas, negrita, enlaces) a HTML para el email."""
    salida, lista, tabla = [], None, []

    def cerrar_lista():
        nonlocal lista
        if lista:
            salida.append(f"</{lista}>")
            lista = None

    def cerrar_tabla():
        if not tabla:
            return
        filas = [f for f in tabla if not re.fullmatch(r"\|?[\s:|-]+\|?", f)]
        celdas = [[c.strip() for c in f.strip().strip("|").split("|")] for f in filas]
        partes = ['<table cellpadding="6" style="border-collapse:collapse;margin:12px 0">']
        for i, fila in enumerate(celdas):
            etiqueta = "th" if i == 0 else "td"
            partes.append("<tr>" + "".join(
                f'<{etiqueta} style="border:1px solid #ddd;text-align:left">{en_linea(c)}</{etiqueta}>'
                for c in fila) + "</tr>")
        partes.append("</table>")
        salida.append("".join(partes))
        tabla.clear()

    for linea in markdown.splitlines():
        if linea.strip().startswith("|"):
            cerrar_lista()
            tabla.append(linea)
            continue
        cerrar_tabla()
        titulo = re.match(r"(#{1,3})\s+(.*)", linea)
        vineta = re.match(r"\s*[-*]\s+(.*)", linea)
        numero = re.match(r"\s*\d+\.\s+(.*)", linea)
        if titulo:
            cerrar_lista()
            nivel = len(titulo.group(1))
            salida.append(f"<h{nivel}>{en_linea(titulo.group(2))}</h{nivel}>")
        elif vineta or numero:
            tipo = "ul" if vineta else "ol"
            if lista != tipo:
                cerrar_lista()
                salida.append(f"<{tipo}>")
                lista = tipo
            salida.append(f"<li>{en_linea((vineta or numero).group(1))}</li>")
        elif linea.strip():
            cerrar_lista()
            salida.append(f"<p>{en_linea(linea.strip())}</p>")
        else:
            cerrar_lista()
    cerrar_lista()
    cerrar_tabla()
    return "\n".join(salida)


def cuerpo_email(informe):
    partes = [a_html(informe)]
    if LANDING_URL:
        partes.append(
            f'<hr><p>Si quieres hacer tus propias cuentas, en <a href="{html.escape(LANDING_URL)}">esta '
            "calculadora</a> puedes ver cuánto tiempo y dinero se va en tareas repetitivas. Las cuentas se hacen "
            "en tu navegador y no nos llegan.</p>")
    return ('<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#222;max-width:640px">'
            + "\n".join(partes) + "</div>")


def comprobar(_args):
    estado, cuenta = brevo("GET", "/account")
    print(f"La clave de Brevo funciona ({estado}). Remitente configurado: {enmascarar(remitente())}.")
    if not LANDING_URL:
        print("Aviso: LANDING_URL está vacío; los emails saldrán sin el enlace a la landing.")


def enviar(args):
    with open(args.informe, encoding="utf-8") as f:
        informe = f.read()
    if re.search(r"\[[A-ZÁÉÍÓÚÑ ]{4,}\]", informe):
        sys.exit("El informe tiene huecos entre corchetes (p. ej. [PRECIO POR DECIDIR]). No lo envío.")
    email, centro = contacto(args.id)
    de = remitente()
    destino = de if args.prueba else email
    datos = {
        "sender": {"name": NOMBRE_REMITENTE, "email": de},
        "to": [{"email": destino}],
        "replyTo": {"email": de, "name": NOMBRE_REMITENTE},
        "subject": f"Tu diagnóstico comercial · {centro}" + (" [PRUEBA]" if args.prueba else ""),
        "htmlContent": cuerpo_email(informe),
        "textContent": informe + (f"\n\nCalculadora: {LANDING_URL}" if LANDING_URL else ""),
        "tags": ["diagnostico"],
    }
    _estado, respuesta = brevo("POST", "/smtp/email", datos)
    print(f"Enviado a {enmascarar(destino)}" + (" (prueba)" if args.prueba else "")
          + f". Id del mensaje: {(respuesta or {}).get('messageId', '?')}")


def main():
    p = argparse.ArgumentParser(description="Envía el informe del diagnóstico por email con Brevo.")
    sub = p.add_subparsers(dest="orden", required=True)
    sub.add_parser("comprobar").set_defaults(func=comprobar)
    e = sub.add_parser("enviar")
    e.add_argument("--id", required=True)
    e.add_argument("--informe", required=True)
    e.add_argument("--prueba", action="store_true")
    e.set_defaults(func=enviar)
    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
