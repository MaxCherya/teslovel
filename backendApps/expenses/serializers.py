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

class BikeStatsSerializer(serializers.Serializer):
    totalExpenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    expensesThisMonth = serializers.DecimalField(max_digits=12, decimal_places=2)
    expensesToday = serializers.DecimalField(max_digits=12, decimal_places=2)

    totalRevenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    revenueThisMonth = serializers.DecimalField(max_digits=12, decimal_places=2)
    revenueToday = serializers.DecimalField(max_digits=12, decimal_places=2)

    totalRides = serializers.IntegerField()
    ridesThisMonth = serializers.IntegerField()
    ridesToday = serializers.IntegerField()