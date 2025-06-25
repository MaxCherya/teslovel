from django.urls import path
from .views import *

urlpatterns = [
    path("login/", CookieTokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("register/", register, name="register"),
    path("logout/", logout, name="logout"),
]