from django.db import models
from backendApps.specs_types.models import *
from cloudinary.models import CloudinaryField

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

    main_img = CloudinaryField('image')
    nav_photo = CloudinaryField('image')
    landscape_img = CloudinaryField('image')
    side_photo_left = CloudinaryField('image')
    side_photo_right = CloudinaryField('image')
    front_photo_view = CloudinaryField('image')
    rear_photo_view = CloudinaryField('image')
    top_photo_view = CloudinaryField('image')
    drive_train_closeup_photo = CloudinaryField('image')
    handlebar_controls_photo = CloudinaryField('image')
    suspension_fork_photo = CloudinaryField('image')
    wheel_tire_condition_photo = CloudinaryField('image')
    serial_number_or_branding_photo = CloudinaryField('image')

    def __str__(self):
        return self.name