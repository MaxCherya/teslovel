from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from .serializers import *

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            refresh = response.data["refresh"]
            access = response.data["access"]

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=not settings.IS_DEV,
                samesite='Lax' if settings.IS_DEV else 'Strict',
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=not settings.IS_DEV,
                samesite='Lax' if settings.IS_DEV else 'Strict',
            )

            response.data = { "message": "Login successful" }

        return response

@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def logout(request):
    response = Response({"message": "Logged out"}, status=status.HTTP_200_OK)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response