from django.db import models
from backendApps.specs_types.models import *

class Bike(models.Model):
    name = models.CharField(max_length=100)
    description_uk = models.TextField()
    description_en = models.TextField()
    description_ru = models.TextField()
    price_day = models.IntegerField()
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True)
    added_on = models.DateTimeField(auto_now_add=True)

    max_speed = models.IntegerField()
    range = models.IntegerField()
    wheels_size = models.IntegerField()
    power = models.IntegerField()
    battery_type = models.ForeignKey(BatteryType, on_delete=models.SET_NULL, null=True)
    battery_current = models.IntegerField()
    brakes_type = models.ForeignKey(BrakesType, on_delete=models.SET_NULL, null=True)
    engine_position = models.ForeignKey(EnginePosition, on_delete=models.SET_NULL, null=True)

    main_img = models.URLField()
    nav_photo = models.URLField()
    landscape_img = models.URLField()
    side_photo_left = models.URLField()
    side_photo_right = models.URLField()
    front_photo_view = models.URLField()
    rear_photo_view = models.URLField()
    top_photo_view = models.URLField()
    drive_train_closeup_photo = models.URLField()
    handlebar_controls_photo = models.URLField()
    suspension_fork_photo = models.URLField()
    wheel_tire_condition_photo = models.URLField()
    serial_number_or_branding_photo = models.URLField()

    def __str__(self):
        return self.name
        