from rest_framework import serializers
from .models import *

class BlogPostSerializer(serializers.ModelSerializer):
    banner_uk = serializers.CharField(source='banner_uk.url', read_only=True)
    banner_en = serializers.CharField(source='banner_en.url', read_only=True)
    banner_ru = serializers.CharField(source='banner_ru.url', read_only=True)
    poster = serializers.CharField(source='poster.url', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
                    'id', 'banner_uk', 'banner_en', 'banner_ru', 'poster',
                    'title_uk', 'title_en', 'title_ru',
                    'content_uk', 'content_en', 'content_ru', 'created_at'
                ]

class BlogPostUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'banner_uk', 'banner_en', 'banner_ru', 'poster',
            'title_uk', 'title_en', 'title_ru',
            'content_uk', 'content_en', 'content_ru',
        ]

class BlogPostSerializer(serializers.ModelSerializer):
    banner_uk = serializers.CharField(source='banner_uk.url')
    banner_en = serializers.CharField(source='banner_en.url')
    banner_ru = serializers.CharField(source='banner_ru.url')
    poster = serializers.CharField(source='poster.url')

    class Meta:
        model = BlogPost
        fields = "__all__"