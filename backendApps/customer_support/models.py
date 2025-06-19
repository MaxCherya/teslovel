from django.db import models

class ContactRequest(models.Model):
    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)