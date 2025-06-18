from rest_framework import serializers
from .models import *

class BikeHomeCatwalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['id', 'name', 'max_speed', 'range', 'wheels_size', 'price_day', 'landscape_img']

class BikeNavBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['id', 'name', 'nav_photo']

class BikeModelsSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    status_original = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'price_day', 'main_img', 'status', 'status_original']

    def get_status(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.status.get_localized_name(lang)
    
    def get_status_original(self, obj):
        return obj.status.name_en
    
class BikePageSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    battery_type = serializers.SerializerMethodField()
    brakes_type = serializers.SerializerMethodField()
    engine_position = serializers.SerializerMethodField()
    status_original = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'price_day', 'main_img', 'landscape_img', 'description', 'side_photo_left', 'side_photo_right',
                    'front_photo_view', 'rear_photo_view', 'top_photo_view', 'drive_train_closeup_photo',
                    'handlebar_controls_photo', 'suspension_fork_photo',
                    'wheel_tire_condition_photo', 'serial_number_or_branding_photo',
                    'max_speed', 'range', 'wheels_size', 'power', 'battery_type', 'battery_current',
                    'brakes_type', 'engine_position', 'status', 'status_original']

    def get_status(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.status.get_localized_name(lang)
    
    def get_description(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return getattr(obj, f"description_{lang}", obj.description_en)
    
    def get_battery_type(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.battery_type.get_localized_name(lang)
    
    def get_brakes_type(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.brakes_type.get_localized_name(lang)
    
    def get_engine_position(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.engine_position.get_localized_name(lang)
    
    def get_status_original(self, obj):
        return obj.status.name_en