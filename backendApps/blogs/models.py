from django.db import models
from cloudinary.models import CloudinaryField

class BlogPost(models.Model):
    banner_uk = CloudinaryField('image')
    banner_en = CloudinaryField('image')
    banner_ru = CloudinaryField('image')
    poster = CloudinaryField('image')
    title_uk = models.CharField(max_length=250, default='')
    title_en = models.CharField(max_length=250, default='')
    title_ru = models.CharField(max_length=250, default='')
    content_uk = models.TextField()
    content_en = models.TextField()
    content_ru = models.TextField()
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)