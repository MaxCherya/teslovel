from django.contrib import admin
from .models import Bike

@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'status',
        'price_day',
        'max_speed',
        'range',
        'wheels_size',
        'power',
        'added_on',
    )
    list_filter = ('status', 'battery_type', 'brakes_type', 'engine_position')
    search_fields = ('name',)
    ordering = ('-added_on',)