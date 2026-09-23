#!/usr/bin/env python3
"""Lee las respuestas del cuestionario en Tally y las entrega a los agentes SIN datos de contacto.

Uso:
    python3 sistemas/diagnostico/fichas.py [--dias 14]
        Imprime en JSON las respuestas completadas en los últimos días, una ficha por respuesta.
    python3 sistemas/diagnostico/fichas.py --id ID_RESPUESTA
        Imprime solo esa respuesta.

Qué se quita: el nombre de la persona, el email, el WhatsApp y la casilla de consentimiento. Nunca se
imprimen, así que los agentes no los ven. Se mantienen el nombre del centro y la ciudad, que el agente
Investigador necesita para buscar la información pública del centro (lo dice la política de privacidad).

Cada ficha lleva el identificador de la respuesta en Tally ("id"): es lo único que enlaza el informe con
los datos de contacto, que el fundador consulta en Tally o en Google Sheets al enviarlo.
"""

import argparse
import datetime
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tally"))
from formulario import peticion  # noqa: E402

FORMULARIO = "RGpogp"

# Preguntas que nunca salen del script (se comparan por el principio del título).
CONTACTO = ("Tu nombre", "Email", "WhatsApp", "Consentimiento")


def respuestas(dias):
    pagina, todas = 1, []
    while True:
        _estado, datos = peticion("GET", f"/forms/{FORMULARIO}/submissions?page={pagina}&limit=100")
        todas.append(datos)
        if not datos.get("hasMore"):
            return todas
        pagina += 1


def ficha(envio, preguntas):
    campos = {}
    for r in envio["responses"]:
        pregunta = preguntas.get(r["questionId"], {})
        titulo = pregunta.get("title") or ""
        if titulo.startswith(CONTACTO):
            continue
        respuesta = r["answer"]
        if pregunta.get("type") == "HIDDEN_FIELDS":
            # Los campos ocultos llegan agrupados; se guardan por su nombre.
            if isinstance(respuesta, dict):
                campos.update({f"oculto:{k}": v for k, v in respuesta.items()})
            else:
                campos["oculto"] = respuesta
            continue
        if isinstance(respuesta, list) and len(respuesta) == 1 and pregunta.get("type") == "MULTIPLE_CHOICE":
            respuesta = respuesta[0]
        campos[titulo] = respuesta
    return {
        "id": envio["id"],
        "enviado": envio.get("submittedAt"),
        "centro": campos.pop("Nombre del centro", None),
        "ciudad": campos.pop("Ciudad", None),
        "respuestas": campos,
    }


def main():
    p = argparse.ArgumentParser(description="Fichas anónimas de las respuestas del cuestionario.")
    p.add_argument("--dias", type=int, default=14)
    p.add_argument("--id")
    args = p.parse_args()

    desde = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=args.dias)
    fichas = []
    for datos in respuestas(args.dias):
        preguntas = {q["id"]: q for q in datos.get("questions", [])}
        for envio in datos.get("submissions", []):
            if not envio.get("isCompleted"):
                continue
            if args.id and envio["id"] != args.id:
                continue
            enviado = datetime.datetime.fromisoformat(envio["submittedAt"].replace("Z", "+00:00"))
            if not args.id and enviado < desde:
                continue
            fichas.append(ficha(envio, preguntas))
    print(json.dumps(fichas, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
