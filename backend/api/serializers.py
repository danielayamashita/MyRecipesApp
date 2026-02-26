from rest_framework import serializers
from .models import Recipe
from .utils import save_image_from_url

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        print("------------------------------Recipe created:")
        recipe = Recipe.objects.create(**validated_data)
        

        if recipe.image_url:
            save_image_from_url(recipe, recipe.image_url)

        return recipe