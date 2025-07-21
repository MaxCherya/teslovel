from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from backendApps.catalog.utils import extract_public_id
from cloudinary.uploader import destroy
from rest_framework.pagination import PageNumberPagination
from django_otp.plugins.otp_totp.models import TOTPDevice

from .models import *
from .serializers import *

@api_view(['GET'])
@permission_classes([IsAdminUser])
def fetch_blogs(request):
    try:
        blogs = BlogPost.objects.all()
        serializer = BlogPostSerializer(blogs, many=True)
        return Response({"results": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_blog_with_otp(request):
    if not request.user.is_superuser:
        return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

    blog_id = request.data.get("blog_id")
    otp_code = request.data.get("otp_code")

    if not blog_id:
        return Response({"detail": "blog_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    if request.user.has_2fa_enabled:
        if not otp_code:
            return Response({"detail": "OTP code is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            device = TOTPDevice.objects.get(user=request.user, confirmed=True)
        except TOTPDevice.DoesNotExist:
            return Response({"detail": "No 2FA device found."}, status=status.HTTP_403_FORBIDDEN)

        if not device.verify_token(otp_code):
            return Response({"detail": "Invalid OTP code."}, status=status.HTTP_403_FORBIDDEN)

    try:
        blog = BlogPost.objects.get(id=blog_id)
    except BlogPost.DoesNotExist:
        return Response({"detail": "Blog not found."}, status=status.HTTP_404_NOT_FOUND)

    cloudinary_fields = ["banner_uk", "banner_en", "banner_ru", "poster"]

    for field_name in cloudinary_fields:
        file_field = getattr(blog, field_name, None)
        if file_field and hasattr(file_field, 'url') and file_field.url:
            try:
                public_id = extract_public_id(file_field.url)
                if public_id:
                    result = destroy(public_id)
                    print(f"[DEBUG] Cloudinary destroy result for {public_id}: {result}")
                else:
                    print(f"[WARN] Could not extract public_id from URL: {file_field.url}")
            except Exception as e:
                print(f"[ERROR] Failed to delete image from Cloudinary - field: {field_name}, error: {e}")

    blog.delete()
    return Response({"detail": "Blog deleted successfully."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser])
def upload_blog_post(request):
    serializer = BlogPostUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Blog post uploaded successfully."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def fetch_blog_posts(request):
    posts = BlogPost.objects.all().order_by("-created_at")
    paginator = PageNumberPagination()
    paginator.page_size = 6
    result_page = paginator.paginate_queryset(posts, request)
    serializer = BlogPostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
def fetch_blog_post_by_id(request, blog_id):
    try:
        blog = BlogPost.objects.get(id=blog_id)
        serializer = BlogPostSerializer(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except BlogPost.DoesNotExist:
        return Response({"detail": "Blog post not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)