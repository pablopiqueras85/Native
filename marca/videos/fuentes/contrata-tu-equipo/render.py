"""Renderiza video.html a MP4 (1920x1080, 30 fps), fotograma a fotograma.

Código propio de Native Crew (no usa onetake): el vídeo se puede usar comercialmente.

Uso:
    python3 render.py                      # vídeo completo -> contrata-tu-equipo.mp4
    python3 render.py --stills 2 9 24 34   # solo capturas PNG de esos segundos, para revisar
"""
import argparse
import subprocess
from pathlib import Path

from playwright.sync_api import sync_playwright

AQUI = Path(__file__).resolve().parent
FPS = 30


def ffmpeg_bin():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return "ffmpeg"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(AQUI.parent.parent / "contrata-tu-equipo.mp4"))
    ap.add_argument("--stills", nargs="*", type=float)
    args = ap.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto((AQUI / "video.html").as_uri())
        page.evaluate("document.fonts.ready")
        duracion = page.evaluate("window.DURATION")

        if args.stills:
            for s in args.stills:
                page.evaluate(f"window.seek({s})")
                page.screenshot(path=str(AQUI / f"still-{s:g}.png"))
            browser.close()
            return

        total = int(duracion * FPS)
        ff = subprocess.Popen(
            [ffmpeg_bin(), "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS),
             "-c:v", "png", "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "18",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", args.out],
            stdin=subprocess.PIPE,
        )
        for i in range(total):
            page.evaluate(f"window.seek({i / FPS})")
            ff.stdin.write(page.screenshot(type="png"))
            if i % 150 == 0:
                print(f"{i}/{total}", flush=True)
        ff.stdin.close()
        ff.wait()
        browser.close()
        print("listo:", args.out)


if __name__ == "__main__":
    main()
