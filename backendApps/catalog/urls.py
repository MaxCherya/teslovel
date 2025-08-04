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
    path('bike/<int:bike_id>/update-name/', update_bike_name, name='update-bike-name'),
    path("update-bike-descriptions/<int:bike_id>/", update_bike_descriptions),
    path("update-bike-specs/<int:bike_id>/", update_bike_technical_specs),
    path("update-bike-fks/<int:bike_id>/", update_bike_fk_fields),
    path("bike-option-fields/", list_bike_option_fields),
    path("bike/<int:bike_id>/update-image/", update_bike_image, name="update-bike-image"),
]