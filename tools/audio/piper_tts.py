"""Piper local text-to-speech provider tool."""

from __future__ import annotations

import importlib.util
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

from tools.base_tool import (
    BaseTool,
    Determinism,
    ExecutionMode,
    ResourceProfile,
    RetryPolicy,
    ToolResult,
    ToolRuntime,
    ToolStability,
    ToolStatus,
    ToolTier,
)


class PiperTTS(BaseTool):
    name = "piper_tts"
    version = "0.1.0"
    tier = ToolTier.VOICE
    capability = "tts"
    provider = "piper"
    stability = ToolStability.EXPERIMENTAL
    execution_mode = ExecutionMode.SYNC
    determinism = Determinism.DETERMINISTIC
    runtime = ToolRuntime.LOCAL

    dependencies = []
    install_instructions = (
        "Install Piper TTS:\n"
        "  pip install piper-tts\n"
        "Or download from https://github.com/rhasspy/piper/releases\n"
        "Then download a voice model:\n"
        "  piper --download-dir ~/.piper/models --model en_US-lessac-medium"
    )
    agent_skills = ["text-to-speech"]

    capabilities = [
        "text_to_speech",
        "offline_generation",
    ]
    supports = {
        "voice_cloning": False,
        "multilingual": False,
        "offline": True,
        "native_audio": True,
    }
    best_for = [
        "offline narration fallback",
        "privacy-sensitive local-only workflows",
    ]
    not_good_for = [
        "best-in-class expressive voice quality",
        "voice clone matching",
    ]

    input_schema = {
        "type": "object",
        "required": ["text"],
        "properties": {
            "text": {"type": "string"},
            "model": {
                "type": "string",
                "default": "en_US-lessac-medium",
            },
            "speaker_id": {
                "type": "integer",
                "default": 0,
            },
            "length_scale": {
                "type": "number",
                "default": 1.0,
            },
            "sentence_silence": {
                "type": "number",
                "default": 0.3,
            },
            "noise_scale": {
                "type": "number",
                "description": "Generator noise (Piper default 0.667). Higher = more varied, expressive intonation; too high gets unstable.",
            },
            "noise_w": {
                "type": "number",
                "description": "Phoneme-width noise (Piper default 0.8). Higher = more rhythm variation between phonemes.",
            },
            "volume": {
                "type": "number",
                "description": "Output volume multiplier (Piper default 1.0).",
            },
            "output_path": {"type": "string"},
        },
    }

    resource_profile = ResourceProfile(
        cpu_cores=2, ram_mb=512, vram_mb=0, disk_mb=200, network_required=False
    )
    retry_policy = RetryPolicy(max_retries=1, retryable_errors=[])
    idempotency_key_fields = ["text", "model", "speaker_id", "length_scale", "noise_scale", "noise_w"]
    side_effects = ["writes audio file to output_path"]
    user_visible_verification = ["Listen to generated audio for intelligibility"]

    def get_status(self) -> ToolStatus:
        if self._piper_command():
            return ToolStatus.AVAILABLE
        return ToolStatus.UNAVAILABLE

    @staticmethod
    def _piper_command() -> list[str] | None:
        """Return the command prefix for Piper: the `piper` binary, else `python -m piper` (pip install)."""
        if shutil.which("piper"):
            return ["piper"]
        if importlib.util.find_spec("piper") is not None:
            return [sys.executable, "-m", "piper"]
        return None

    @staticmethod
    def _resolve_model(model: str) -> str:
        """Map a voice name (e.g. es_ES-davefx-medium) to ~/.piper/models/<name>.onnx when present."""
        if Path(model).exists():
            return model
        candidate = Path.home() / ".piper" / "models" / f"{model}.onnx"
        return str(candidate) if candidate.exists() else model

    def estimate_cost(self, inputs: dict[str, Any]) -> float:
        return 0.0

    def execute(self, inputs: dict[str, Any]) -> ToolResult:
        if self.get_status() != ToolStatus.AVAILABLE:
            return ToolResult(success=False, error="Piper TTS not available. " + self.install_instructions)

        start = time.time()
        try:
            result = self._generate(inputs)
        except Exception as exc:
            return ToolResult(success=False, error=f"Local TTS generation failed: {exc}")

        result.duration_seconds = round(time.time() - start, 2)
        return result

    def _generate(self, inputs: dict[str, Any]) -> ToolResult:
        output_path = Path(inputs.get("output_path", "tts_output.wav"))
        output_path.parent.mkdir(parents=True, exist_ok=True)

        extra: list[str] = []
        if inputs.get("noise_scale") is not None:
            extra += ["--noise-scale", str(inputs["noise_scale"])]
        if inputs.get("noise_w") is not None:
            extra += ["--noise-w-scale", str(inputs["noise_w"])]
        if inputs.get("volume") is not None:
            extra += ["--volume", str(inputs["volume"])]

        proc = subprocess.run(
            [
                *self._piper_command(),
                "--model", self._resolve_model(inputs.get("model", "en_US-lessac-medium")),
                "--speaker", str(inputs.get("speaker_id", 0)),
                "--length-scale", str(inputs.get("length_scale", 1.0)),
                "--sentence-silence", str(inputs.get("sentence_silence", 0.3)),
                *extra,
                "--output_file", str(output_path),
            ],
            input=inputs["text"].encode("utf-8"),
            capture_output=True,
            timeout=300,
            env={**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"},
        )

        if proc.returncode != 0:
            return ToolResult(success=False, error=f"Piper failed (exit {proc.returncode}): {proc.stderr.decode('utf-8', 'replace')}")
        if not output_path.exists():
            return ToolResult(success=False, error=f"Piper output file missing: {output_path}")

        return ToolResult(
            success=True,
            data={
                "provider": self.provider,
                "model": inputs.get("model", "en_US-lessac-medium"),
                "speaker_id": inputs.get("speaker_id", 0),
                "text_length": len(inputs["text"]),
                "output": str(output_path),
                "format": "wav",
            },
            artifacts=[str(output_path)],
            model=inputs.get("model", "en_US-lessac-medium"),
        )
