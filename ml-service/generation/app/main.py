# Path: ml-service/app/main.py
# FastAPI service that identifies the wall in a room photo and returns it as
# a black/white mask. Used two ways:
#   1. Offline, via scripts/generate_masks.py, to precompute masks for the
#      fixed layout photos shipped with the frontend today - this is the
#      "best performance" path, since it means zero ML inference while a
#      customer is actually picking colours on the site.
#   2. At runtime, via POST /segment-wall, for any *new* layout photo an
#      admin uploads later (Phase 2) - so the pipeline isn't limited to only
#      the 5 images that exist right now.

import io

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from PIL import Image

from app.segmentation import get_wall_mask, mask_to_png_bytes

app = FastAPI(title="Blitz Paints - Wall Segmentation Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "wall-segmentation"}


@app.post("/segment-wall")
async def segment_wall(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Uploaded file must be an image")

    try:
        image = Image.open(io.BytesIO(await file.read()))
    except Exception:
        raise HTTPException(400, "Could not read the uploaded image")

    mask = get_wall_mask(image)
    png_bytes = mask_to_png_bytes(mask)

    return Response(content=png_bytes, media_type="image/png")