from rest_framework import serializers
from .models import *

class BlogPostSerializer(serializers.ModelSerializer):
    banner = serializers.CharField(source='banner.url', read_only=True)
    poster = serializers.CharField(source='poster.url', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'views_count', 'banner', 'poster', 'content', 'created_at']