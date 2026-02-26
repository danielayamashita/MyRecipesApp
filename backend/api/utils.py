

import requests
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
from django.utils.text import slugify

def save_image_from_url(recipe, image_url):
    response = requests.get(image_url)
    if response.status_code != 200:
        return

    img = Image.open(BytesIO(response.content)).convert("RGB")
    buffer = BytesIO()
    img.save(buffer, format="JPEG")

    recipe.image.save(
        slugify(recipe.title) + ".jpg",
        ContentFile(buffer.getvalue()),
        save=True
    )