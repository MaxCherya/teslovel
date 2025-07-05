from django.urls import path
from .views import *

urlpatterns = [
    path("upload-order-request/", upload_order_request, name="upload_order_request"),
    path("<int:bike_id>/busy-days/", get_bike_busy_days, name="get_bike_busy_days"),
]