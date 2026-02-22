from django.db import models



class Recipe(models.Model):
    title = models.CharField(max_length=200)
    url = models.TextField()
    ingredients = models.JSONField()
    steps = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
