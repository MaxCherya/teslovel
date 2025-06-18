from rest_framework import serializers
from .models import *

class BikeHomeCatwalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['id', 'name', 'max_speed', 'range', 'wheels_size', 'price_day', 'landscape_img']

