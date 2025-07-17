from rest_framework import serializers
from .models import *

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['phone', 'password']

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'phone', 'username']


class UserProfileSerializer(serializers.ModelSerializer):
    is_user = serializers.SerializerMethodField()
    has_2fa = serializers.SerializerMethodField()
    is_user_admin = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'phone', 'username', 'is_user', 'has_2fa', 'is_user_admin']

    def get_is_user(self, obj):
        return self.context.get('is_user', False)
    
    def get_has_2fa(self, obj):
        return self.context.get('has_2fa', False)
    
    def get_is_user_admin(self, obj):
        return self.context.get('is_user_admin', False)