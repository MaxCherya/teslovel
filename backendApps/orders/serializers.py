from rest_framework import serializers
from backendApps.catalog.models import Bike
from .models import *

class OrderUploadSerializer(serializers.ModelSerializer):
    bike = serializers.PrimaryKeyRelatedField(queryset=Bike.objects.all())

    class Meta:
        model = Order
        fields = ['bike', 'name', 'phone', 'comments', 'start_date', 'end_date', 'amount']
        read_only_fields = ['amount']  # prevents manual input from user

    def validate(self, data):
        if data['end_date'] < data['start_date']:
            raise serializers.ValidationError("End date must be after start date.")
        return data

    def create(self, validated_data):
        bike = validated_data['bike']
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']

        # Inclusive of both days: (end - start).days + 1
        rental_days = (end_date - start_date).days + 1
        total_price = bike.price_day * rental_days

        validated_data['amount'] = total_price
        return super().create(validated_data)

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