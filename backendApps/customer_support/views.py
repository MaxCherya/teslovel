from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .utils import send_to_admins, get_client_ip, get_ip_location
import time

@api_view(['POST'])
def upload_contact_request(request):
    data = request.data

    # Honeypot
    if data.get('user_email'):
        return Response({'error': True, 'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

    # Timing
    timestamp = float(data.get("formRenderedAt", 0))
    now = time.time()
    if now - timestamp < 3:
        return Response({'error': 'Forbidden'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ContactRequestUploadSerializer(data=data)

    if serializer.is_valid():
        contact = serializer.save()

        # Get user location from IP
        ip = get_client_ip(request)
        if ip.startswith("127.") or ip.startswith("192.168.") or ip == "0.0.0.0":
            ip = "93.183.203.67"
        location = get_ip_location(ip)

        message = (
            "<b>📩 Новий запит на зв'язок</b>\n\n"
            f"<b>👤 Ім'я:</b> {contact.name}\n"
            f"<b>📞 Телефон:</b> {contact.phone_number}\n"
            f"<b>📝 Додаткові нотатки:</b> {contact.notes or '—'}\n"
            f"<b>🌍 Локація:</b> {location if location != 'Unknown' else 'невідомо'}\n"
            f"<b>⏱️ Відправлено:</b> {contact.created_at.strftime('%d.%m.%Y %H:%M:%S')}"
        )

        send_to_admins(message)
        return Response({'success': True}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)