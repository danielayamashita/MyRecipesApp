from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup
from rest_framework import status
from .serializers import RecipeSerializer
from .models import Recipe



@api_view(['GET'])
def recipe_marmiton(request):


    # Get the query parameter 'q' from the request
    url = request.GET.get('q')  # returns 'a'

    print("Query:", url)


    # Fetch HTML
    response = requests.get(url)

    # Check if request was successful
    if response.status_code == 200:
        html = response.text

        # Parse HTML
        soup = BeautifulSoup(html, "html.parser")

        # Get page title
        title = soup.select("div.main-title h1")
        #title = soup.title.string
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
        "ingredients": [" ".join(i.text.split()) for i in ingredients],
        "steps": [" ".join(s.text.split()) for s in steps]
    })




@api_view(['POST'])
def save_recipe(request):
    print("Received data:", request.data)
    serializer = RecipeSerializer(data=request.data)

    if serializer.is_valid():
        print("is_valid")
        serializer.save()  # Saves to database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        

    print("Errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_recipes(request):
    recipes = Recipe.objects.all()   # Query database
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)