from rest_framework import serializers
from .models import *

class BlogPostSerializer(serializers.ModelSerializer):
    banner = serializers.CharField(source='banner.url', read_only=True)
    poster = serializers.CharField(source='poster.url', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'views_count', 'banner', 'poster', 'content', 'created_at']

class BlogPostUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'banner_uk', 'banner_en', 'banner_ru', 'poster',
            'title_uk', 'title_en', 'title_ru',
            'content_uk', 'content_en', 'content_ru',
        ]