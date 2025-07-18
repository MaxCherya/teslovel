from django.db import models
from backendApps.catalog.models import Bike

class Order(models.Model):
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    name = models.CharField(max_length=240)
    phone = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_validated = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    end_date = models.DateField()