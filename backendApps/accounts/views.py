from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from urllib.parse import quote
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from qrcode.image.pil import PilImage
from rest_framework.authentication import BasicAuthentication
from django_otp.plugins.otp_totp.models import TOTPDevice
import qrcode
import base64
from io import BytesIO
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework.views import APIView
from rest_framework import status
from django.conf import settings

from .serializers import *

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:

            user = CustomUser.objects.get(phone=request.data["phone"])

            if user.has_2fa_enabled:
                return Response({"require_2fa": True}, status=status.HTTP_206_PARTIAL_CONTENT)

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
    
@method_decorator(csrf_exempt, name='dispatch')
class CookieTokenRefreshView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []
    authentication_classes = [BasicAuthentication]

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
@permission_classes([AllowAny])
def verify_otp_login(request):
    phone = request.data.get("phone")
    password = request.data.get("password")
    otp_code = request.data.get("otp_code")

    user = authenticate(phone=phone, password=password)

    if not user:
        return Response({"detail": "Invalid credentials."}, status=400)

    try:
        device = TOTPDevice.objects.get(user=user, confirmed=True)
    except TOTPDevice.DoesNotExist:
        return Response({"detail": "No OTP device found."}, status=404)

    if not device.verify_token(otp_code):
        return Response({"detail": "Invalid OTP code."}, status=400)

    # Success: issue tokens
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    response = Response(UserAuthSerializer(user).data, status=200)
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
    return response

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setup_otp(request):
    user = request.user

    # Delete unconfirmed devices
    TOTPDevice.objects.filter(user=user, confirmed=False).delete()

    # Create unconfirmed device
    device = TOTPDevice.objects.create(user=user, confirmed=False)

    # Encode the secret in base32 for manual entry
    secret = base64.b32encode(device.bin_key).decode('utf-8').replace('=', '')
    label = f"Teslovel | {user.phone}"
    issuer = "Teslovel Website"

    # Construct OTP URI manually
    otp_uri = f"otpauth://totp/{quote(label)}?secret={secret}&issuer={quote(issuer)}&algorithm=SHA1&digits=6&period=30"

    # Generate QR code
    qr = qrcode.make(otp_uri, image_factory=PilImage)
    buffer = BytesIO()
    qr.save(buffer, format='PNG')
    base64_qr = base64.b64encode(buffer.getvalue()).decode()

    return Response({
        "qr_code_base64": base64_qr,
        "otp_uri": otp_uri
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_otp(request):
    user = request.user
    otp_code = request.data.get("otp_code")

    if not otp_code:
        return Response({"detail": "OTP code is required."}, status=400)

    try:
        device = TOTPDevice.objects.filter(user=user, confirmed=False).latest('created_at')
    except TOTPDevice.DoesNotExist:
        return Response({"detail": "No pending OTP setup found."}, status=404)

    if device.verify_token(otp_code):
        TOTPDevice.objects.filter(user=user, confirmed=True).delete()

        device.confirmed = True
        device.save()

        user.has_2fa_enabled = True
        user.save(update_fields=["has_2fa_enabled"])

        return Response({"detail": "2FA has been enabled successfully."})
    else:
        return Response({"detail": "Invalid OTP code."}, status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def disable_otp(request):
    user = request.user
    otp_code = request.data.get("otp_code")

    if not otp_code:
        return Response({"detail": "OTP code is required."}, status=400)

    try:
        device = TOTPDevice.objects.filter(user=user, confirmed=True).latest('created_at')
    except TOTPDevice.DoesNotExist:
        return Response({"detail": "No active 2FA device found."}, status=404)

    if not device.verify_token(otp_code):
        return Response({"detail": "Invalid OTP code."}, status=400)

    TOTPDevice.objects.filter(user=user, confirmed=True).delete()
    user.has_2fa_enabled = False
    user.save(update_fields=["has_2fa_enabled"])

    return Response({"detail": "2FA has been disabled successfully."})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):
    try:
        user = CustomUser.objects.get(id=pk)
    except Exception:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    requested_user = CustomUser.objects.get(id=request.user.id)
    
    is_user = user.id == request.user.id
    has_2fa = requested_user.has_2fa_enabled

    serialized = UserProfileSerializer(instance=user, context={'is_user': is_user, 'has_2fa': has_2fa})
    return Response(serialized.data)