from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .models import BikeExpense
from .serializers import BikeExpenseUploadSerializer, BikeExpenseListSerializer


@api_view(['POST'])
@permission_classes([IsAdminUser])
def upload_bike_expense(request):
    serializer = BikeExpenseUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_bike_expenses(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    bike_id = request.query_params.get('bike')
    expenses = BikeExpense.objects.select_related('bike').order_by('-date')

    if bike_id:
        expenses = expenses.filter(bike__id=bike_id)

    page = paginator.paginate_queryset(expenses, request)
    serializer = BikeExpenseListSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_bike_expense(request, expense_id):
    try:
        expense = BikeExpense.objects.get(id=expense_id)
        expense.delete()
        return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
    except BikeExpense.DoesNotExist:
        return Response({'error': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)