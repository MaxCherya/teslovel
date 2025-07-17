from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import permission_classes, parser_classes

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