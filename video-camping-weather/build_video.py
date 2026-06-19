"""Build adverse-weather camping slideshow for TikTok (9:16)."""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent / "video-camping-slideshow"))

from detect_beats import compute_slide_times

FRAMES = ROOT / "frames"
AUDIO = Path(r"c:\Users\Usuario\Downloads\heavy-rainfall-thunder-ftus-1-00-06.mp3")
CONCAT = ROOT / "slideshow.ffconcat"
VIDEO_ONLY = ROOT / "slideshow-video.mp4"
OUTPUT = ROOT / "mundocamping-mal-tiempo.mp4"
DESKTOP = Path(r"C:\Users\Usuario\Desktop\mundocamping-mal-tiempo.mp4")

SLIDE_COUNT = 20
FADE_OUT_SECONDS = 3.5

BLUR_FILL_VF = (
    "split=2[orig][orig2];"
    "[orig2]scale=1080:1920:force_original_aspect_ratio=increase,"
    "crop=1080:1920,gblur=sigma=35,eq=brightness=-0.06:saturation=0.9[bg];"
    "[orig]scale=1080:-2[fg];"
    "[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p"
)


def main() -> None:
    timing = compute_slide_times(str(AUDIO), SLIDE_COUNT)
    durations = timing["slide_durations"]
    duration = timing["video_duration"]
    fade_start = timing["fade_start"]
    fade_d = duration - fade_start

    lines = ["ffconcat version 1.0"]
    for i, slide_d in enumerate(durations):
        frame = FRAMES / f"frame-{i + 1:02d}.png"
        if not frame.exists():
            raise FileNotFoundError(frame)
        lines.append(f"file '{frame.as_posix()}'")
        lines.append(f"duration {slide_d:.4f}")
    last = (FRAMES / f"frame-{SLIDE_COUNT:02d}.png").as_posix()
    lines.append(f"file '{last}'")
    CONCAT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    subprocess.run(
        [
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0",
            "-i", str(CONCAT),
            "-vf", BLUR_FILL_VF,
            "-r", "30",
            "-pix_fmt", "yuv420p",
            str(VIDEO_ONLY),
        ],
        check=True,
    )

    # Loop short rain SFX to cover full slideshow; fade out at end
    af = (
        f"[1:a]aloop=loop=-1:size=2e+09,atrim=0:{duration:.3f},"
        f"asetpts=N/SR/TB,afade=t=out:st={fade_start:.3f}:d={fade_d:.3f}[aout]"
    )

    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(VIDEO_ONLY),
            "-i", str(AUDIO),
            "-filter_complex", af,
            "-map", "0:v:0",
            "-map", "[aout]",
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", "20",
            "-c:a", "aac",
            "-b:a", "192k",
            "-movflags", "+faststart",
            "-shortest",
            str(OUTPUT),
        ],
        check=True,
    )

    subprocess.run(["copy", "/Y", str(OUTPUT), str(DESKTOP)], shell=True, check=True)

    avg = sum(durations) / len(durations)
    print(f"OK: {OUTPUT}")
    print(f"Desktop: {DESKTOP}")
    print(
        f"Duration: {duration:.2f}s | ~{avg:.2f}s/slide | "
        f"Fade out from {fade_start:.2f}s"
    )


if __name__ == "__main__":
    main()
