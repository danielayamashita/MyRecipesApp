from django.db import models



class Recipe(models.Model):
    title = models.CharField(max_length=200)
    url = models.TextField()
    image_url = models.TextField()
    image = models.ImageField(upload_to="images_recipe/", null=True, blank=True)
    ingredients = models.JSONField()
    steps = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
