from rest_framework import serializers
from .models import *
from .utils import get_cloudinary_url


class BikeStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['status']


class BikeHomeCatwalkSerializer(serializers.ModelSerializer):
    landscape_img = serializers.SerializerMethodField()
    main_img = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'max_speed', 'range', 'wheels_size', 'price_day', 'landscape_img', 'main_img']

    def get_landscape_img(self, obj):
        return get_cloudinary_url(obj.landscape_img)
    
    def get_main_img(self, obj):
        return get_cloudinary_url(obj.main_img)


class BikeNavBarSerializer(serializers.ModelSerializer):
    nav_photo = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'nav_photo']

    def get_nav_photo(self, obj):
        return get_cloudinary_url(obj.nav_photo)


class BikeAdminPreview(serializers.ModelSerializer):
    main_img = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'main_img']

    def get_main_img(self, obj):
        return get_cloudinary_url(obj.main_img)


class BikeModelsSerializer(serializers.ModelSerializer):
    main_img = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    status_original = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = ['id', 'name', 'price_day', 'main_img', 'status', 'status_original']

    def get_main_img(self, obj):
        return get_cloudinary_url(obj.main_img)

    def get_status(self, obj):
        request = self.context.get("request")
        lang = request.headers.get("X-Language", "en") if request else "en"
        return obj.status.get_localized_name(lang)

    def get_status_original(self, obj):
        return obj.status.name_en


class BikePageSerializer(serializers.ModelSerializer):
    main_img = serializers.SerializerMethodField()
    landscape_img = serializers.SerializerMethodField()
    side_photo_left = serializers.SerializerMethodField()
    side_photo_right = serializers.SerializerMethodField()
    front_photo_view = serializers.SerializerMethodField()
    rear_photo_view = serializers.SerializerMethodField()
    top_photo_view = serializers.SerializerMethodField()
    drive_train_closeup_photo = serializers.SerializerMethodField()
    handlebar_controls_photo = serializers.SerializerMethodField()
    suspension_fork_photo = serializers.SerializerMethodField()
    wheel_tire_condition_photo = serializers.SerializerMethodField()
    serial_number_or_branding_photo = serializers.SerializerMethodField()

    status = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    battery_type = serializers.SerializerMethodField()
    brakes_type = serializers.SerializerMethodField()
    engine_position = serializers.SerializerMethodField()
    status_original = serializers.SerializerMethodField()

    class Meta:
        model = Bike
        fields = [
            'id', 'name', 'price_day', 'main_img', 'landscape_img', 'description',
            'side_photo_left', 'side_photo_right', 'front_photo_view', 'rear_photo_view',
            'top_photo_view', 'drive_train_closeup_photo', 'handlebar_controls_photo',
            'suspension_fork_photo', 'wheel_tire_condition_photo', 'serial_number_or_branding_photo',
            'max_speed', 'range', 'wheels_size', 'power', 'battery_type', 'battery_current',
            'brakes_type', 'engine_position', 'status', 'status_original', 'description_uk', 'description_ru', 'description_en',
        ]

    def get_main_img(self, obj):
        return get_cloudinary_url(obj.main_img)

    def get_landscape_img(self, obj):
        return get_cloudinary_url(obj.landscape_img)

    def get_side_photo_left(self, obj):
        return get_cloudinary_url(obj.side_photo_left)

    def get_side_photo_right(self, obj):
        return get_cloudinary_url(obj.side_photo_right)

    def get_front_photo_view(self, obj):
        return get_cloudinary_url(obj.front_photo_view)

    def get_rear_photo_view(self, obj):
        return get_cloudinary_url(obj.rear_photo_view)

    def get_top_photo_view(self, obj):
        return get_cloudinary_url(obj.top_photo_view)

    def get_drive_train_closeup_photo(self, obj):
        return get_cloudinary_url(obj.drive_train_closeup_photo)

    def get_handlebar_controls_photo(self, obj):
        return get_cloudinary_url(obj.handlebar_controls_photo)

    def get_suspension_fork_photo(self, obj):
        return get_cloudinary_url(obj.suspension_fork_photo)

    def get_wheel_tire_condition_photo(self, obj):
        return get_cloudinary_url(obj.wheel_tire_condition_photo)

    def get_serial_number_or_branding_photo(self, obj):
        return get_cloudinary_url(obj.serial_number_or_branding_photo)

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
    
class BikeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = [
            'name', 'description_uk', 'description_en', 'description_ru',
            'price_day', 'status', 'max_speed', 'range', 'wheels_size', 'power',
            'battery_type', 'battery_current', 'brakes_type', 'engine_position',
            'main_img', 'nav_photo', 'landscape_img', 'side_photo_left', 'side_photo_right',
            'front_photo_view', 'rear_photo_view', 'top_photo_view',
            'drive_train_closeup_photo', 'handlebar_controls_photo', 'suspension_fork_photo',
            'wheel_tire_condition_photo', 'serial_number_or_branding_photo',
        ]

    def create(self, validated_data):
        return Bike.objects.create(**validated_data)
    
class BikeNameUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ['name']