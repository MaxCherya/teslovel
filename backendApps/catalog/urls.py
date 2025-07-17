from django.urls import path
from .views import *

urlpatterns = [
    path('home-bikes/', getCatwalkBikes),
    path('navbar-bikes/', getNavBarBikes),
    path('models-bikes/', getModelsBikes),
    path('admin-bikes/', get_admin_bike_previews, name='admin-bike-previews'),
    path('bike/<int:bike_id>/', getBikePage),
    path('create-bike/', create_bike, name='create-bike'),
    path('update-bike-status/<int:bike_id>/', update_bike_status, name='update-bike-status'),
    path("delete-bike/", delete_bike_with_otp),
]