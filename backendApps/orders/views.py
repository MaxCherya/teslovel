from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.utils.timezone import localtime
from backendApps.customer_support.utils import send_to_admins, get_client_ip, get_ip_location
import time
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination

@api_view(['POST'])
@permission_classes([AllowAny])
def upload_order_request(request):
    data = request.data

    # Honeypot check
    if data.get('user_email'):
        return Response({'error': True, 'message': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

    # Timing protection
    timestamp = float(data.get("formRenderedAt", 0))
    now = time.time()
    if now - timestamp < 3:
        return Response({'error': 'Forbidden'}, status=status.HTTP_400_BAD_REQUEST)

    # Validates serializer first
    serializer = OrderUploadSerializer(data=data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    bike = validated_data["bike"]
    start_date = validated_data["start_date"]
    end_date = validated_data["end_date"]

    # Overlapping date check
    conflict = Order.objects.filter(
        bike=bike,
        is_validated=True,
        start_date__lte=end_date,
        end_date__gte=start_date,
    ).exists()

    if conflict:
        return Response({
            "error": True,
            "message": "Those dates are already occupied. Please select different range."
        }, status=status.HTTP_409_CONFLICT)

    # Saves order
    order = serializer.save()

    # IP & location
    ip = get_client_ip(request)
    if ip.startswith("127.") or ip.startswith("192.168.") or ip == "0.0.0.0":
        ip = "93.183.203.67"
    location = get_ip_location(ip)

    # TG Message
    message = (
        "<b>🛵 Нова заявка на бронювання</b>\n\n"
        f"<b>👤 Ім'я:</b> {order.name}\n"
        f"<b>📞 Телефон:</b> {order.phone}\n"
        f"<b>🗓️ Дати:</b> {order.start_date.strftime('%d.%m.%Y')} — {order.end_date.strftime('%d.%m.%Y')}\n"
        f"<b>📝 Коментар:</b> {order.comments or '—'}\n"
        f"<b>🌍 Локація:</b> {location if location != 'Unknown' else 'невідомо'}\n"
        f"<b>⏱️ Відправлено:</b> {localtime(order.created_at).strftime('%d.%m.%Y %H:%M:%S')}"
        "<b>🔔 Дія:</b> <i>Зв'яжіться з клієнтом та підтвердіть або скасуйте заявку в системі.</i>"
    )

    send_to_admins(message)
    return Response({'success': True}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_bike_busy_days(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({'error': 'Bike not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BikeBusyDaysSerializer(bike)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_orders(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    orders = Order.objects.select_related("bike").order_by("-created_at")
    result_page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_order_status(request, order_id):
    action = request.data.get("action")
    if action not in ["validate", "reject"]:
        return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

    if action == "validate":
        # Check for overlapping validated orders
        conflict = Order.objects.filter(
            bike=order.bike,
            is_validated=True,
            start_date__lte=order.end_date,
            end_date__gte=order.start_date
        ).exclude(id=order.id).exists()

        if conflict:
            return Response({"detail": "Conflict: another validated order exists for the selected period."},
                            status=status.HTTP_409_CONFLICT)

        order.is_validated = True
        order.is_rejected = False

    elif action == "reject":
        order.is_validated = False
        order.is_rejected = True

    order.save()
    return Response({"detail": f"Order {action}d successfully."})

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def reset_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

    order.is_validated = False
    order.is_rejected = False
    order.save()

    return Response({"detail": "Order status reset successfully."}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_reviewed_orders(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    orders = Order.objects.select_related("bike").filter(
        models.Q(is_validated=True) | models.Q(is_rejected=True)
    ).order_by("-created_at")

    result_page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_validated_orders_for_bike(request, bike_id):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    orders = Order.objects.select_related("bike").filter(
        bike_id=bike_id,
        is_validated=True
    ).order_by("-created_at")

    result_page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)