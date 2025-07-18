from django.urls import path
from .views import *

urlpatterns = [
    path('upload-contact-request/', upload_contact_request),
    path('contact-requests/', list_contact_requests),
    path('contact-request/<int:contact_id>/mark-contacted/', mark_contacted),
    path('contact-request/<int:contact_id>/reset-status/', reset_contacted_status),
]