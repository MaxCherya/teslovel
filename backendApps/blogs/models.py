from django.db import models
from cloudinary.models import CloudinaryField

class BlogPost(models.Model):
    banner_uk = CloudinaryField('image')
    banner_en = CloudinaryField('image')
    banner_ru = CloudinaryField('image')
    poster = CloudinaryField('image')
    title = models.CharField(max_length=250, default='')
    content = models.TextField()
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)