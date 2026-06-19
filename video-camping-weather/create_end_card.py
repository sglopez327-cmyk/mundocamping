"""Create branded end card for weather camping TikTok video."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent / "frames" / "frame-20.png"
W, H = 1536, 1024


def main() -> None:
    img = Image.new("RGB", (W, H), (8, 12, 10))
    draw = ImageDraw.Draw(img)

    try:
        title_font = ImageFont.truetype("arial.ttf", 52)
        brand_font = ImageFont.truetype("arialbd.ttf", 44)
    except OSError:
        title_font = ImageFont.load_default()
        brand_font = ImageFont.load_default()

    line1 = "No hay mal tiempo,"
    line2 = "solo mal equipamiento."
    brand = "MUNDOCAMPING.NET"

    y1 = H // 2 - 90
    for line, y in ((line1, y1), (line2, y1 + 70)):
        bbox = draw.textbbox((0, 0), line, font=title_font)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) / 2, y), line, fill=(235, 240, 236), font=title_font)

    bbox = draw.textbbox((0, 0), brand, font=brand_font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) / 2, y1 + 175), brand, fill=(120, 200, 140), font=brand_font)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT)
    print(f"OK: {OUT}")


if __name__ == "__main__":
    main()
