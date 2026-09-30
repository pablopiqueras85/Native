#!/usr/bin/env python3
"""Portero del equipo digital (A2): revisa cada mensaje ANTES de enviarlo.

Lee la biblioteca de plantillas (plantillas.md) y un lote de mensajes en JSON, y decide para cada uno:

  OK         se puede enviar (devuelve el texto final, montado desde la plantilla)
  BLOQUEADO  no se envía; va a la lista de excepciones del fundador
  ESCALAR    el socio ha dicho algo que debe llevar el dueño (salud, queja, pagos...)
  BAJA       el socio pide no recibir más mensajes: se marca "no contactar" y se confirma con BAJA-01

No usa IA ni librerías externas: son reglas fijas, iguales con cualquier motor (Claude, OpenAI, n8n...).
Las reglas están explicadas en README.md.

Uso:
  python3 portero.py mensajes.json            # revisa el lote
  python3 portero.py mensajes.json --json     # salida en JSON, para el motor que envía
  python3 portero.py mensajes.json --probar   # compara con el campo "esperado" de cada caso de prueba
"""
import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

PLANTILLAS = Path(__file__).with_name("plantillas.md")
HUECOS = {"nombre", "estudio", "clase", "dia", "hora", "dias", "motivo", "opcion", "frase"}
MAX_FRASE = 140
MAX_TEXTO = 700
HORARIO = (9 * 60, 21 * 60)  # los mensajes que inicia el estudio, solo entre las 9:00 y las 21:00

# Lo que dice el socio (se comprueba en su último mensaje)
PIDE_BAJA = [r"^\s*baja\s*[.!]*\s*$", r"no me escrib", r"deja(d)? de escribir", r"no quiero recibir"]
ESCALADO_SOCIO = {
    "salud": [r"lesi[o]n", r"lesionad", r"embaraz", r"dolor", r"me duele", r"medic[oa]", r"medicaci",
              r"operaci", r"operad[oa]", r"hernia", r"contractura", r"baja medica"],
    "queja": [r"queja", r"reclamaci", r"verguenza", r"estafa", r"denuncia", r"hart[oa]\b", r"impresentable",
              r"cabread[oa]", r"indignad[oa]"],
    "pide una persona": [r"hablar con (una persona|alguien)", r"persona (real|de verdad)",
                         r"con (el|la) (duen[oa]|responsable)"],
    "pagos": [r"me (habeis|han) cobrado", r"cobrado dos veces", r"cobro indebido", r"devoluci", r"reembolso",
              r"devolver(me)? el dinero"],
    "quiere darse de baja del estudio": [r"\b(dame|dadme|dar|darme|darse|doy|dare) de baja",
                                         r"cancelar (la|mi) (cuota|suscripcion|matricula)"],
    "posible menor": [r"tengo (1[0-7]|[0-9]) anos"],
}
# Lo que escribe el agente (se comprueba en {frase}, en el texto libre y en los huecos)
PROHIBIDO_AGENTE = {
    "habla de salud": ESCALADO_SOCIO["salud"],
    "promete resultados": [r"garantiz", r"garantia", r"te aseguro", r"100 ?%"],
    "ofrece algo sin permiso": [r"descuento", r"gratis", r"gratuit", r"promocion", r"oferta", r"rebaja", r"%"],
}
IMPORTE = re.compile(r"(\d+(?:[.,]\d+)?)\s*(?:€|euros?\b)")


def normalizar(texto):
    """Minúsculas y sin tildes, para que las reglas no dependan de cómo escribe cada uno."""
    t = unicodedata.normalize("NFD", texto.lower())
    return "".join(c for c in t if unicodedata.category(c) != "Mn")


def encaja(texto, patrones):
    t = normalizar(texto)
    return any(re.search(p, t) for p in patrones)


def cargar_plantillas(ruta=PLANTILLAS):
    """Lee plantillas.md: '### ID · título', las líneas '- **Campo:** valor' y el texto en líneas '> '."""
    plantillas, actual = {}, None
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^### ([A-Z0-9-]+) · ", linea)
        if m:
            actual = plantillas.setdefault(m.group(1), {"id": m.group(1), "texto": ""})
            continue
        if actual is None:
            continue
        m = re.match(r"^- \*\*(\w+):\*\* (.+)$", linea)
        if m:
            actual[normalizar(m.group(1))] = m.group(2).strip()
        elif linea.startswith("> "):
            actual["texto"] = (actual["texto"] + " " + linea[2:]).strip()
    for p in plantillas.values():
        p["oferta"] = normalizar(p.get("oferta", "no")) == "si"
        desconocidos = set(re.findall(r"\{(\w+)\}", p["texto"])) - HUECOS
        if desconocidos:
            raise ValueError(f"La plantilla {p['id']} usa huecos no permitidos: {sorted(desconocidos)}")
    return plantillas


def rellenar(plantilla, variables):
    """Monta el texto de una plantilla. Devuelve (texto, huecos que faltan)."""
    faltan = []

    def poner(m):
        clave = m.group(1)
        valor = variables.get(clave)
        if valor in (None, ""):
            if clave != "frase":
                faltan.append(clave)
            return ""
        return str(valor)

    texto = re.sub(r"\{(\w+)\}", poner, plantilla["texto"])
    return re.sub(r"\s{2,}", " ", texto).strip(), faltan


def en_horario(hora):
    try:
        h, m = (int(x) for x in hora.split(":"))
    except (AttributeError, ValueError):
        return False
    return HORARIO[0] <= h * 60 + m < HORARIO[1]


def revisar_texto_del_agente(texto, precios, puede_ofertar):
    """Reglas sobre lo que ha escrito el agente (no sobre la plantilla, que ya está aprobada)."""
    motivos = []
    for motivo, patrones in PROHIBIDO_AGENTE.items():
        if motivo == "ofrece algo sin permiso" and puede_ofertar:
            continue
        if encaja(texto, patrones):
            motivos.append(f"el agente {motivo}")
    if not puede_ofertar:
        for importe in IMPORTE.findall(texto):
            if float(importe.replace(",", ".")) not in precios:
                motivos.append(f"precio no autorizado: {importe} €")
    if re.search(r"[{}\[\]]", texto):
        motivos.append("quedan huecos sin rellenar")
    return motivos


def revisar(msg, cliente, plantillas):
    """Decide qué pasa con un mensaje. Devuelve un dict con estado, motivos y texto final."""
    estudio = cliente.get("estudio", "")
    precios = {float(p) for p in cliente.get("precios_autorizados", [])}
    res = {"id": msg.get("id"), "plantilla": msg.get("plantilla"), "estado": "OK", "motivos": [], "texto": None}
    socio = msg.get("ultimo_mensaje_socio") or ""
    nombre = (msg.get("variables") or {}).get("nombre", "")

    # 1. Lo que ha dicho el socio manda sobre lo que el agente quería enviar
    if socio and encaja(socio, PIDE_BAJA):
        texto, _ = rellenar(plantillas["BAJA-01"], {"nombre": nombre, "estudio": estudio})
        res.update(estado="BAJA", motivos=["el socio pide no recibir más mensajes: marcar 'no contactar'"],
                   texto=texto, plantilla="BAJA-01")
        return res
    escalados = [motivo for motivo, patrones in ESCALADO_SOCIO.items() if socio and encaja(socio, patrones)]
    if escalados:
        texto, _ = rellenar(plantillas["DUE-02"], {"nombre": nombre or "un socio", "motivo": ", ".join(escalados)})
        res.update(estado="ESCALAR", motivos=escalados, texto=texto, plantilla="DUE-02")
        return res

    motivos = []
    modo = msg.get("modo", "iniciado")
    al_dueno = False

    if modo == "iniciado":
        p = plantillas.get(msg.get("plantilla") or "")
        if p is None:
            res.update(estado="BLOQUEADO", motivos=[f"plantilla desconocida: {msg.get('plantilla')}"])
            return res
        al_dueno = normalizar(p.get("tipo", "")) == "interno"
        agente = str(msg.get("agente", ""))
        if p.get("agente") not in ("todos", agente):
            motivos.append(f"la plantilla {p['id']} no es del agente {agente}")
        puede_ofertar = p["oferta"] and msg.get("aprobado_por_dueno") is True
        if p["oferta"] and not puede_ofertar:
            motivos.append("oferta sin aprobación del dueño (DUE-01)")
        if not al_dueno:
            if msg.get("no_contactar"):
                motivos.append("el socio está marcado como 'no contactar'")
            if msg.get("permiso_whatsapp") is not True:
                motivos.append("sin permiso del socio para recibir WhatsApp del estudio")
            if not en_horario(msg.get("hora")):
                motivos.append(f"fuera de horario ({msg.get('hora')}): reprogramar entre 9:00 y 21:00")
        variables = dict(msg.get("variables") or {}, estudio=estudio)
        frase = variables.get("frase") or ""
        if len(frase) > MAX_FRASE:
            motivos.append(f"la frase personal pasa de {MAX_FRASE} caracteres")
        texto, faltan = rellenar(p, variables)
        if faltan:
            motivos.append("faltan huecos: " + ", ".join(faltan))
        escrito_por_agente = " ".join(str(v) for k, v in variables.items() if k not in ("estudio", "opcion"))
        if not p["oferta"]:
            escrito_por_agente += " " + str(variables.get("opcion", ""))
        motivos += revisar_texto_del_agente(escrito_por_agente, precios, puede_ofertar)
        if normalizar(p.get("tipo", "")) == "marketing" and "BAJA" not in texto:
            motivos.append("mensaje comercial sin opción de BAJA")
    else:  # respuesta dentro de una conversación que abrió el socio: texto libre, con las mismas reglas
        texto = (msg.get("texto") or "").strip()
        if not texto:
            motivos.append("respuesta vacía")
        motivos += revisar_texto_del_agente(texto, precios, puede_ofertar=False)

    if msg.get("primer_mensaje") and not al_dueno:
        aviso, _ = rellenar(plantillas["AVISO-IA"], {"estudio": estudio})
        texto = f"{aviso}\n\n{texto}"
    if len(texto) > MAX_TEXTO:
        motivos.append(f"mensaje de más de {MAX_TEXTO} caracteres")

    if motivos:
        res.update(estado="BLOQUEADO", motivos=motivos)
    else:
        res["texto"] = texto
    return res


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lote", help="JSON con 'cliente' y 'mensajes'")
    ap.add_argument("--json", action="store_true", help="salida en JSON")
    ap.add_argument("--probar", action="store_true", help="comprobar contra el campo 'esperado'")
    args = ap.parse_args()

    plantillas = cargar_plantillas()
    lote = json.loads(Path(args.lote).read_text(encoding="utf-8"))
    resultados = [revisar(m, lote.get("cliente", {}), plantillas) for m in lote.get("mensajes", [])]

    if args.json:
        print(json.dumps(resultados, ensure_ascii=False, indent=2))
    else:
        for r in resultados:
            print(f"[{r['estado']}] {r['id']} ({r['plantilla'] or 'respuesta'})")
            for motivo in r["motivos"]:
                print(f"    - {motivo}")
            if r["texto"] and r["estado"] != "BLOQUEADO":
                print("    > " + r["texto"].replace("\n", "\n    > "))
        cuenta = {}
        for r in resultados:
            cuenta[r["estado"]] = cuenta.get(r["estado"], 0) + 1
        print("\nResumen: " + ", ".join(f"{k} {v}" for k, v in sorted(cuenta.items())))

    if args.probar:
        fallos = [(m.get("id"), m.get("esperado"), r["estado"])
                  for m, r in zip(lote.get("mensajes", []), resultados)
                  if m.get("esperado") and m["esperado"] != r["estado"]]
        for id_, esperado, obtenido in fallos:
            print(f"FALLO {id_}: se esperaba {esperado} y salió {obtenido}", file=sys.stderr)
        print(f"\nPruebas: {len(resultados) - len(fallos)}/{len(resultados)} correctas", file=sys.stderr)
        sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main()
