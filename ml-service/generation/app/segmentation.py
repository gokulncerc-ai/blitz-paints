# Path: ml-service/app/segmentation.py
# Loads a pretrained SegFormer model (fine-tuned on ADE20K) once and exposes
# get_wall_mask() to extract a binary wall mask from any room photo.
#
# ADE20K class index 0 = "wall" (https://github.com/CSAILVision/sceneparsing)
# We don't train anything ourselves - training a wall-segmentation model from
# scratch would need thousands of labeled room photos; a scene-parsing model
# already trained on 20,000+ indoor/outdoor images generalizes far better
# than anything realistically trainable here, and needs zero labeled data
# from us to use.

from functools import lru_cache
from io import BytesIO

import numpy as np
import torch
from PIL import Image
from transformers import SegformerForSemanticSegmentation, SegformerImageProcessor

MODEL_NAME = "nvidia/segformer-b0-finetuned-ade-512-512"
WALL_CLASS_ID = 0  # "wall" in the ADE20K 150-class label set


@lru_cache(maxsize=1)
def _load_model():
    processor = SegformerImageProcessor.from_pretrained(MODEL_NAME)
    model = SegformerForSemanticSegmentation.from_pretrained(MODEL_NAME)
    model.eval()
    return processor, model


def get_wall_mask(image: Image.Image) -> Image.Image:
    """
    Returns a single-channel ('L' mode) mask the same size as the input
    image: 255 where the model predicts "wall", 0 everywhere else.
    """
    processor, model = _load_model()
    image = image.convert("RGB")

    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)

    # Upscale logits back to the original image resolution
    logits = torch.nn.functional.interpolate(
        outputs.logits,
        size=image.size[::-1],  # (height, width)
        mode="bilinear",
        align_corners=False,
    )
    predicted = logits.argmax(dim=1)[0].cpu().numpy()

    mask = np.where(predicted == WALL_CLASS_ID, 255, 0).astype(np.uint8)
    return Image.fromarray(mask, mode="L")


def mask_to_png_bytes(mask: Image.Image) -> bytes:
    buf = BytesIO()
    mask.save(buf, format="PNG")
    return buf.getvalue()