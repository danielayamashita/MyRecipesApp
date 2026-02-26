from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup
from rest_framework import status
from .serializers import RecipeSerializer
from .models import Recipe
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile

def save_image_from_url(recipe, image_url):
    response = requests.get(image_url)

    if response.status_code == 200:
        img = Image.open(BytesIO(response.content)).convert("RGB")

        buffer = BytesIO()
        img.save(buffer, format="JPEG")
        file_name = f"{recipe.title}.jpg"

        recipe.image.save(file_name, ContentFile(buffer.getvalue()), save=True)

@api_view(['POST'])
def recipe_marmiton(request):


    print("Received data:", request.data)
    # Get the query parameter 'q' from the request
    url = request.data['query']

    print("Query 1234:", url)


    # Fetch HTML
    response = requests.get(url)

    # Check if request was successful
    if response.status_code == 200:
        html = response.text

        # Parse HTML
        soup = BeautifulSoup(html, "html.parser")

        # Get image
        image = soup.find("div", class_="recipe-media-viewer-thumbnail-container")
        print("image:", image)

        if image:
            img_tag = image.find("img", attrs={"data-src": True})
            img = img_tag['data-src'] if img_tag else None
        else:
            image = soup.find("div", class_="recipe-media-viewer-media-container")
            print("image2:", image)
            img_tag = image.find("img", attrs={"src": True})
            img = img_tag['src'] if img_tag else None

        print("img_tag:", img_tag)
        

        # Get page title
        title = soup.select("div.main-title h1")
        print("Page title:", title)

        # Get all ingredients
        ingredients = soup.find_all("div", class_="card-ingredient-content")

        # Get all isteps
        steps = soup.find_all("div", class_="recipe-step-list__container")


    else:
        print("Failed to fetch page")

    return Response({
        "title": title[0].text.strip() if title else "No title found",
        "url": url,
        "image_url": img,
        "ingredients": [" ".join(i.text.split()) for i in ingredients],
        "steps": [" ".join(s.text.split()) for s in steps]
    })




@api_view(['POST'])
def save_recipe(request):
    print("Received data:", request.data)
    serializer = RecipeSerializer(data=request.data,context={'request': request})

    if serializer.is_valid():
        print("is_valid")
        serializer.save()  # Saves to database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        

    print("Errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_recipes(request):
    print("get_all_recipes")
    recipes = Recipe.objects.all()   # Query database
    print("test",recipes)
    serializer = RecipeSerializer(recipes, many=True,context={'request': request})
    print("serializer:", serializer)
    print("Serialized data:", serializer.data)
    return Response(serializer.data)



@api_view(['DELETE'])
def delete_recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response(
            {"error": "Recipe not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Delete image file from media folder first
    if recipe.image:
        recipe.image.delete(save=False)

    recipe.delete()
    return Response(
        {"message": "Recipe deleted successfully"},
        status=status.HTTP_204_NO_CONTENT
    )


