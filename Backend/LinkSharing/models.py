from django.db import models

from Auth.models import Profile

# Create your models here.
class Link(models.Model): 
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='links')  # Replace user with profile
    platform = models.CharField(max_length=255, null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   
    order = models.PositiveIntegerField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if self.order is None:
            max_order = Link.objects.filter(profile=self.profile).aggregate(models.Max('order'))['order__max']
            self.order = (max_order or 0) + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.platform
    
    class Meta:
        ordering = ['-order']