from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.views.decorators.vary import vary_on_headers
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated 
from django.shortcuts import get_object_or_404
from rest_framework import status
from cloudinary.uploader import destroy, upload
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import permission_classes, parser_classes
from .utils import extract_public_id
from backendApps.catalog.models import Bike, BatteryType, BrakesType, EnginePosition

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
@permission_classes([IsAdminUser])
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

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_bike_name(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"error": "Bike not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = BikeNameUpdateSerializer(bike, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_bike_descriptions(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"detail": "Bike not found."}, status=status.HTTP_404_NOT_FOUND)

    description_fields = ['description_uk', 'description_en', 'description_ru']
    for field in description_fields:
        if field in request.data:
            setattr(bike, field, request.data[field])

    bike.save()
    return Response({"detail": "Descriptions updated successfully."})

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_bike_technical_specs(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"detail": "Bike not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    fields = [
        "price_day",
        "max_speed",
        "range",
        "wheels_size",
        "power",
        "battery_current",
    ]
    for field in fields:
        if field in data:
            setattr(bike, field, data[field])

    bike.save()
    return Response({"detail": "Bike technical specs updated."})

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_bike_fk_fields(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"detail": "Bike not found."}, status=status.HTTP_404_NOT_FOUND)

    battery_id = request.data.get("battery_type")
    brakes_id = request.data.get("brakes_type")
    engine_id = request.data.get("engine_position")

    if battery_id is not None:
        bike.battery_type_id = battery_id
    if brakes_id is not None:
        bike.brakes_type_id = brakes_id
    if engine_id is not None:
        bike.engine_position_id = engine_id

    bike.save()
    return Response({"detail": "Bike updated."}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_bike_option_fields(request):
    lang = request.headers.get("X-Language", "en")
    bike_id = request.query_params.get("bike_id")

    battery_types = [
        {"id": bt.id, "name": bt.get_localized_name(lang)} for bt in BatteryType.objects.all()
    ]
    brakes_types = [
        {"id": br.id, "name": br.get_localized_name(lang)} for br in BrakesType.objects.all()
    ]
    engine_positions = [
        {"id": ep.id, "name": ep.get_localized_name(lang)} for ep in EnginePosition.objects.all()
    ]

    current = None
    if bike_id:
        bike = get_object_or_404(Bike, id=bike_id)
        current = {
            "battery_type": bike.battery_type.id if bike.battery_type else None,
            "brakes_type": bike.brakes_type.id if bike.brakes_type else None,
            "engine_position": bike.engine_position.id if bike.engine_position else None,
        }

    return Response({
        "battery_types": battery_types,
        "brakes_types": brakes_types,
        "engine_positions": engine_positions,
        "current": current,
    })

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_bike_image(request, bike_id):
    field_name = request.query_params.get("field")
    image_file = request.FILES.get("image")

    if not field_name or not image_file:
        return Response({"detail": "Missing field or image."}, status=status.HTTP_400_BAD_REQUEST)

    if field_name not in [
        "main_img", "nav_photo", "landscape_img", "side_photo_left", "side_photo_right",
        "front_photo_view", "rear_photo_view", "top_photo_view", "drive_train_closeup_photo",
        "handlebar_controls_photo", "suspension_fork_photo", "wheel_tire_condition_photo",
        "serial_number_or_branding_photo"
    ]:
        return Response({"detail": "Invalid field name."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"detail": "Bike not found."}, status=status.HTTP_404_NOT_FOUND)

    # Deletes old image from Cloudinary
    old_value = getattr(bike, field_name)
    old_url = get_cloudinary_url(old_value)
    if old_url:
        public_id = extract_public_id(old_url)
        if public_id:
            destroy(public_id)

    # Uploads new image
    result = upload(
        image_file,
    )
    new_url = result["secure_url"]

    # Saves to model
    setattr(bike, field_name, new_url)
    bike.save()

    return Response({"detail": "Image updated", "url": new_url}, status=status.HTTP_200_OK)