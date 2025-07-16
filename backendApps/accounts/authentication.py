from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from rest_framework import exceptions
from .models import CustomUser

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            return None  # no token = skip authentication (no error)

        try:
            access = AccessToken(token)
            user = CustomUser.objects.get(id=access['user_id'])
        except (TokenError, CustomUser.DoesNotExist, KeyError):
            return None  # invalid = unauthenticated, but don’t raise error

        return (user, None)