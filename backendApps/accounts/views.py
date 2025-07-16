from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
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

            try:
                user = CustomUser.objects.get(phone=request.data['phone'])
                serialized = UserAuthSerializer(instance=user)
                response.data = serialized.data
            except CustomUser.DoesNotExist:
                pass

        return response
    
class CookieTokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"detail": "Refresh token not found."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)

            try:
                user = CustomUser.objects.get(id=refresh["user_id"])
                serialized = UserAuthSerializer(instance=user)
                data = serialized.data
            except CustomUser.DoesNotExist:
                data = {"detail": "User not found."}

            response = Response(data, status=status.HTTP_200_OK)

            # Set new access token cookie
            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=not settings.IS_DEV,
                samesite='Lax' if settings.IS_DEV else 'Strict',
            )

            return response

        except TokenError:
            return Response({"detail": "Invalid or expired token."}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        user.username = f"user-{user.id}"
        user.save(update_fields=["username"])

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