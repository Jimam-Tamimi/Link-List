from django.db import models

from Auth.models import Profile

# Create your models here.
class Link(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='links')  # Replace user with profile
    platform = models.CharField(max_length=255)
    url = models.URLField()
    bg_color = models.CharField(max_length=7, default='#FFFFFF')  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']