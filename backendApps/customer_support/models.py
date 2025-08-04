from django.db import models

class ContactRequest(models.Model):
    name = models.CharField(max_length=240)
    phone_number = models.CharField(max_length=15)
    notes = models.TextField(blank=True, null=True)
    is_contacted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)