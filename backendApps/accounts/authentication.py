from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import exceptions
from .models import CustomUser

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            return None

        try:
            access = AccessToken(token)
            user = CustomUser.objects.get(id=access['user_id'])
        except Exception:
            raise exceptions.AuthenticationFailed("Invalid token or user")

        return (user, None)