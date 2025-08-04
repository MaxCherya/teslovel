from django.db import models
from backendApps.catalog.models import Bike

class BikeExpense(models.Model):
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)