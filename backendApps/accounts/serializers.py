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

    class Meta:
        model = CustomUser
        fields = ['id', 'phone', 'username', 'is_user']

    def get_is_user(self, obj):
        return self.context.get('is_user', False)