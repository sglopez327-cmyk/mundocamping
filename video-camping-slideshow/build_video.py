"""Build camping slideshow MP4 with FFmpeg."""
import json
import subprocess
from pathlib import Path

from detect_beats import compute_slide_times

ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
AUDIO = Path(r"c:\Users\Usuario\Downloads\peace-be-with-you-christopher-galovan-main-version-21330-03-13.mp3")
BEATS = ROOT / "beats.json"
CONCAT = ROOT / "slideshow.ffconcat"
VIDEO_ONLY = ROOT / "slideshow-video.mp4"
OUTPUT = ROOT / "mundocamping-slideshow-20.mp4"

FADE_OUT_SECONDS = 3.5
SLIDE_COUNT = 20


def main() -> None:
    timing = compute_slide_times(str(AUDIO), SLIDE_COUNT)
    BEATS.write_text(json.dumps(timing, indent=2), encoding="utf-8")

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

    vf = (
        "split=2[orig][orig2];"
        "[orig2]scale=1080:1920:force_original_aspect_ratio=increase,"
        "crop=1080:1920,gblur=sigma=35,eq=brightness=-0.06:saturation=0.9[bg];"
        "[orig]scale=1080:-2[fg];"
        "[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p"
    )

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(CONCAT),
            "-vf",
            vf,
            "-r",
            "30",
            "-pix_fmt",
            "yuv420p",
            str(VIDEO_ONLY),
        ],
        check=True,
    )

    af = f"atrim=0:{duration:.3f},asetpts=N/SR/TB,afade=t=out:st={fade_start:.3f}:d={fade_d:.3f}"

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(VIDEO_ONLY),
            "-i",
            str(AUDIO),
            "-filter_complex",
            f"[1:a]{af}[aout]",
            "-map",
            "0:v:0",
            "-map",
            "[aout]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "20",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            "-shortest",
            str(OUTPUT),
        ],
        check=True,
    )

    avg = sum(durations) / len(durations)
    print(f"OK: {OUTPUT}")
    print(
        f"Duration: {duration:.2f}s | ~{avg:.2f}s avg/slide (beat-synced) | "
        f"Fade out from {fade_start:.2f}s | Tempo: {timing['tempo']:.1f} BPM"
    )


if __name__ == "__main__":
    main()
