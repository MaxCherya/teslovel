from rest_framework import serializers
from .models import *

class ContactRequestUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ['name', 'phone_number', 'notes']