# Path: ml-service/scripts/generate_masks.py
# One-time (or "whenever a layout photo changes") script: runs the wall
# segmentation model over every photo in frontend/src/assets/images/layouts/
# and writes a matching "<name>-mask.png" into a masks/ subfolder there.
#
# Run from ml-service/ with the venv active:
#   python scripts/generate_masks.py

import sys
from pathlib import Path

from PIL import Image

sys.path.append(str(Path(__file__).resolve().parent.parent))
from app.segmentation import get_wall_mask  # noqa: E402

PROJECT_ROOT = Path(__file__).resolve().parents[3]

LAYOUTS_DIR = (
    PROJECT_ROOT
    / "frontend"
    / "src"
    / "assets"
    / "images"
    / "layouts"
)

MASKS_DIR = LAYOUTS_DIR / "masks"

SUPPORTED_EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg"}


def main():
    print("PROJECT_ROOT :", PROJECT_ROOT)
    print("LAYOUTS_DIR  :", LAYOUTS_DIR)
    print("MASKS_DIR    :", MASKS_DIR)
    if not LAYOUTS_DIR.exists():
        raise SystemExit(f"Layouts folder not found: {LAYOUTS_DIR}")

    MASKS_DIR.mkdir(parents=True, exist_ok=True)

    images = [
        p for p in LAYOUTS_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXTENSIONS
    ]
    if not images:
        raise SystemExit(f"No layout images found in {LAYOUTS_DIR}")

    print(f"Found {len(images)} layout image(s). Generating wall masks...")

    for image_path in images:
        print(f"  - {image_path.name} ...", end=" ", flush=True)
        image = Image.open(image_path)
        mask = get_wall_mask(image)

        out_path = MASKS_DIR / f"{image_path.stem}-mask.png"
        mask.save(out_path)
        print(f"saved -> masks/{out_path.name}")

    print("Done. The frontend imports these masks directly - no server needed at runtime.")


if __name__ == "__main__":
    main()