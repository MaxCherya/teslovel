from django.urls import path
from .views import *

urlpatterns = [
    path('fetch/', fetch_blogs, name='fetch-blogs'),
    path('delete/', delete_blog_with_otp, name='delete-blog'),
    path('upload-blog/', upload_blog_post),
    path("fetch-list/", fetch_blog_posts, name="fetch_blog_posts"),
    path("<int:blog_id>/", fetch_blog_post_by_id, name="fetch_blog_post_by_id"),
]