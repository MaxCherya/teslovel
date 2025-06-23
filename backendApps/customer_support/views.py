from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .utils import send_to_admins
import time

@api_view(['POST'])
def upload_contact_request(request):
    data = request.data

    # Honeypot anti-bot check
    if data.get('user_email'):
        return Response({'error': True, 'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
    
    # Timing Check
    timestamp = float(data.get("formRenderedAt", 0))
    now = time.time()
    if now - timestamp < 3: # less than 3 seconds
        return Response({'error': 'Forbidden'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ContactRequestUploadSerializer(data=data)

    if serializer.is_valid():
        contact = serializer.save()
        # Format Telegram message
        message = (
            "<b>📩 Новий запит на зв'язок</b>\n\n"
            f"<b>👤 Ім'я:</b> {contact.name}\n"
            f"<b>📞 Телефон:</b> {contact.phone_number}\n"
            f"<b>📝 Додаткові нотатки:</b> {contact.notes or '—'}\n"
            f"<b>⏱️ Відправлено:</b> {contact.created_at.strftime('%d.%m.%Y %H:%M:%S')}"
        )

        # Send to all admins
        send_to_admins(message)
        return Response({'success': True}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)