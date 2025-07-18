from rest_framework import serializers
from .models import *
from backendApps.catalog.models import Bike

class BikeExpenseUploadSerializer(serializers.ModelSerializer):
    bike = serializers.PrimaryKeyRelatedField(queryset=Bike.objects.all())

    class Meta:
        model = BikeExpense
        fields = ['bike', 'description', 'amount']

class BikeExpenseListSerializer(serializers.ModelSerializer):
    bike = serializers.StringRelatedField()

    class Meta:
        model = BikeExpense
        fields = ['id', 'bike', 'description', 'amount', 'date']