from django.urls import path
from . import views

urlpatterns = [
    # BatteryType
    path('battery-types/', views.list_battery_types),
    path('battery-types/create/', views.create_battery_type),
    path('battery-types/<int:pk>/', views.delete_battery_type),

    # BrakesType
    path('brakes-types/', views.list_brakes_types),
    path('brakes-types/create/', views.create_brakes_type),
    path('brakes-types/<int:pk>/', views.delete_brakes_type),

    # EnginePosition
    path('engine-positions/', views.list_engine_positions),
    path('engine-positions/create/', views.create_engine_position),
    path('engine-positions/<int:pk>/', views.delete_engine_position),
]