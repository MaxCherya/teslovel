from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.views.decorators.vary import vary_on_headers
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import status
from cloudinary.uploader import destroy
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import permission_classes, parser_classes
from .utils import extract_public_id

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_bike_status(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({'detail': 'Bike not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BikeStatusUpdateSerializer(bike, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'detail': 'Status updated'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser])
def create_bike(request):
    serializer = BikeCreateSerializer(data=request.data)
    if serializer.is_valid():
        bike = serializer.save()
        return Response({'id': bike.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_admin_bike_previews(request):
    bikes = Bike.objects.all().order_by('-added_on')
    serializer = BikeAdminPreview(bikes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
# @cache_page(60 * 5, key_prefix='catwalk_bikes') # Cache for 5 minutes need to add clearing of the cache when admin panel is created and new bike added so used prefix
def getCatwalkBikes(request):
    bikes = Bike.objects.order_by('-added_on')[:3]
    serializer = BikeHomeCatwalkSerializer(bikes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
# @cache_page(60 * 5, key_prefix='navbar_bikes')
def getNavBarBikes(request):
    bikes = Bike.objects.order_by('added_on')[:3]
    serializer = BikeNavBarSerializer(bikes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
@vary_on_headers('X-Language')
# @cache_page(60 * 5, key_prefix='models_bikes')
def getModelsBikes(request):
    bikes = Bike.objects.order_by('added_on')
    serializer = BikeModelsSerializer(bikes, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
@vary_on_headers('X-Language')
# @cache_page(60 * 5, key_prefix='bike_page')
def getBikePage(request, bike_id):
    bike = Bike.objects.get(id=bike_id)
    serializer = BikePageSerializer(bike, context={"request": request})
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_bike_with_otp(request):
    if not request.user.is_superuser:
        return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

    bike_id = request.data.get("bike_id")
    otp_code = request.data.get("otp_code")

    if not bike_id:
        return Response({"detail": "bike_id is required."}, status=status.HTTP_400_BAD_REQUEST)

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
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"detail": "Bike not found."}, status=status.HTTP_404_NOT_FOUND)

    cloudinary_fields = [
        "main_img", "nav_photo", "landscape_img", "side_photo_left", "side_photo_right",
        "front_photo_view", "rear_photo_view", "top_photo_view", "drive_train_closeup_photo",
        "handlebar_controls_photo", "suspension_fork_photo", "wheel_tire_condition_photo",
        "serial_number_or_branding_photo"
    ]

    for field_name in cloudinary_fields:
        file_field = getattr(bike, field_name, None)

        if file_field:
            print(f"[DEBUG] Field: {field_name}, URL: {file_field.url if hasattr(file_field, 'url') else 'No URL'}")

            if hasattr(file_field, 'url') and file_field.url:
                try:
                    public_id = extract_public_id(file_field.url)
                    print(f"[DEBUG] Extracted public_id: {public_id}")

                    if public_id:
                        result = destroy(public_id)
                        print(f"[DEBUG] Cloudinary destroy result for {public_id}: {result}")
                    else:
                        print(f"[WARN] Could not extract public_id from URL: {file_field.url}")
                except Exception as e:
                    print(f"[ERROR] Failed to delete image from Cloudinary - field: {field_name}, error: {e}")

    bike.delete()

    return Response({"detail": "Bike deleted successfully."}, status=status.HTTP_200_OK)