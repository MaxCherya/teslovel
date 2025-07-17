from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import BatteryType, BrakesType, EnginePosition
from .serializers import BatteryTypeSerializer, BrakesTypeSerializer, EnginePositionSerializer

# --- BatteryType ---
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_battery_type(request):
    serializer = BatteryTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_battery_types(request):
    batteries = BatteryType.objects.all()
    serializer = BatteryTypeSerializer(batteries, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_battery_type(request, pk):
    try:
        battery = BatteryType.objects.get(pk=pk)
        battery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except BatteryType.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

# --- BrakesType ---
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_brakes_type(request):
    serializer = BrakesTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_brakes_types(request):
    brakes = BrakesType.objects.all()
    serializer = BrakesTypeSerializer(brakes, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_brakes_type(request, pk):
    try:
        brakes = BrakesType.objects.get(pk=pk)
        brakes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except BrakesType.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

# --- EnginePosition ---
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_engine_position(request):
    serializer = EnginePositionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_engine_positions(request):
    engines = EnginePosition.objects.all()
    serializer = EnginePositionSerializer(engines, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_engine_position(request, pk):
    try:
        engine = EnginePosition.objects.get(pk=pk)
        engine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except EnginePosition.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)