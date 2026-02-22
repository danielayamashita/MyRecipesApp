from django.urls import path
from .views import save_recipe,get_all_recipes,recipe_marmiton

urlpatterns = [
    path('recipe_marmiton/', recipe_marmiton),
    path('recipes/', save_recipe),
    path('recipes/all/', get_all_recipes)
]


