from django.urls import path
from .views import *

urlpatterns = [
    path('home-bikes/', getCatwalkBikes),
    path('navbar-bikes/', getNavBarBikes),
    path('models-bikes/', getModelsBikes),
    path('bike/<int:bike_id>/', getBikePage)
]