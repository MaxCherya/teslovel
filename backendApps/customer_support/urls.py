from django.urls import path
from .views import *

urlpatterns = [
    path('upload-contact-request/', upload_contact_request),
]