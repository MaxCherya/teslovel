from rest_framework import serializers
from .models import BatteryType, BrakesType, EnginePosition

class BatteryTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatteryType
        fields = '__all__'

class BrakesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrakesType
        fields = '__all__'

class EnginePositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnginePosition
        fields = '__all__'