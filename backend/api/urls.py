from django.urls import path
from .views import recipe_marmiton

urlpatterns = [
    path('recipe_marmiton/', recipe_marmiton),
]