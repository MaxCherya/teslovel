from django.urls import path
from .views import *

urlpatterns = [
    path("upload-order-request/", upload_order_request, name="upload_order_request"),
    path("<int:bike_id>/busy-days/", get_bike_busy_days, name="get_bike_busy_days"),
    path("admin-orders/", list_orders, name='admin-orders'),
    path('update-order-status/<int:order_id>/', update_order_status),
    path("<int:order_id>/reset/", reset_order_status, name="reset-order-status"),
    path("reviewed/", list_reviewed_orders, name="list-reviewed-orders"),
    path("bike-orders/<int:bike_id>/", list_validated_orders_for_bike),
]