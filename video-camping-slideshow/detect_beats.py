"""Detect beat-synced slide timings for a relaxing slideshow (~5–6 s per image)."""
import json
import sys
from pathlib import Path

import librosa
import numpy as np

TARGET_SECONDS = 5.5
MIN_SECONDS = 5.0
MAX_SECONDS = 6.0
FADE_OUT_SECONDS = 3.5


def compute_slide_times(audio: str, slide_count: int) -> dict:
    y, sr = librosa.load(audio, sr=22050, mono=True)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
    beat_times = np.unique(np.round(librosa.frames_to_time(beat_frames, sr=sr), 3))
    tempo = float(np.atleast_1d(tempo)[0])
    beat_period = 60.0 / tempo

    best = None
    for beats_per in range(4, 16):
        interval = beats_per * beat_period
        if interval < MIN_SECONDS - 0.2 or interval > MAX_SECONDS + 0.2:
            continue

        times = [float(beat_times[0])]
        while len(times) < slide_count + 1:
            target = times[-1] + interval
            candidates = beat_times[beat_times >= target - 0.05]
            if len(candidates) == 0:
                break
            t = float(candidates[0])
            if t <= times[-1]:
                break
            times.append(t)

        if len(times) < slide_count + 1:
            continue

        times = times[: slide_count + 1]
        durations = np.diff(times)
        score = abs(durations.mean() - TARGET_SECONDS) + durations.std() * 0.5
        cand = (score, beats_per, times, durations)
        if best is None or cand[0] < best[0]:
            best = cand

    if best is None:
        # Fallback: fixed 5.5 s intervals
        times = np.linspace(0.0, TARGET_SECONDS * slide_count, slide_count + 1)
        durations = np.full(slide_count, TARGET_SECONDS)
        beats_per = None
    else:
        _, beats_per, times, durations = best
        times = np.array(times)
        durations = np.array(durations)

    video_duration = float(times[-1])
    fade_start = max(float(times[-2]), video_duration - FADE_OUT_SECONDS)

    return {
        "tempo": tempo,
        "beats_per_slide": beats_per,
        "slide_count": slide_count,
        "transition_times": [round(float(t), 3) for t in times],
        "slide_durations": [round(float(d), 3) for d in durations],
        "video_duration": round(video_duration, 3),
        "fade_start": round(fade_start, 3),
        "fade_end": round(video_duration, 3),
    }


def main() -> None:
    audio = sys.argv[1] if len(sys.argv) > 1 else ""
    slide_count = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    out = Path(sys.argv[3]) if len(sys.argv) > 3 else Path("beats.json")

    payload = compute_slide_times(audio, slide_count)
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
