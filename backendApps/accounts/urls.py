from django.urls import path
from .views import *

urlpatterns = [
    path("login/", CookieTokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("register/", register, name="register"),
    path("logout/", logout, name="logout"),

    path('user/<int:pk>', get_user, name='get_user'),
    path("2fa/setup/", setup_otp, name="setup-otp"),
    path('2fa/confirm/', confirm_otp, name='confirm-otp'),
    path('2fa/verify-login/', verify_otp_login, name='verify-otp-login'),
    path('2fa/disable/', disable_otp, name='disable-otp'),
    path("2fa-status/", get_2fa_status, name="get-2fa-status"),
]