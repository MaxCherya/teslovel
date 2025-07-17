from rest_framework import serializers
from backendApps.catalog.models import Bike
from .models import *

class OrderUploadSerializer(serializers.ModelSerializer):
    bike = serializers.PrimaryKeyRelatedField(queryset=Bike.objects.all())

    class Meta:
        model = Order
        fields = ['bike', 'name', 'phone', 'comments', 'start_date', 'end_date']

class BikeBusyDaysSerializer(serializers.ModelSerializer):
    busy_days = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'busy_days']

    def get_busy_days(self, bike):
        orders = Order.objects.filter(bike=bike, is_validated=True).values('start_date', 'end_date')
        return [{'start': o['start_date'], 'end': o['end_date']} for o in orders]
    
class OrderSerializer(serializers.ModelSerializer):
    bike = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = "__all__"