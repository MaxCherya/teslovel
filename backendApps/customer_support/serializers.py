from rest_framework import serializers
from .models import *

class ContactRequestUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ['name', 'phone_number', 'notes']

class ContactRequestListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = [
            'id',
            'name',
            'phone_number',
            'notes',
            'is_contacted',
            'created_at',
        ]