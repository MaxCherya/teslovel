from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page

@api_view(['GET'])
@cache_page(60 * 5, key_prefix='catwalk_bikes') # Cache for 5 minutes need to add clearing of the cache when admin panel is created and new bike added so used prefix
def getCatwalkBikes(request):
    bikes = Bike.objects.order_by('-added_on')[:3]
    serializer = BikeHomeCatwalkSerializer(bikes, many=True)
    return Response(serializer.data)