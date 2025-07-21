from django.urls import path
from .views import *

urlpatterns = [
    path('fetch/', fetch_blogs, name='fetch-blogs'),
    path('delete/', delete_blog_with_otp, name='delete-blog')
]