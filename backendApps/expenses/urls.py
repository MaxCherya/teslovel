from django.urls import path
from . import views

urlpatterns = [
    path('upload-expense/', views.upload_bike_expense, name='upload_bike_expense'),
    path('list-expenses/', views.list_bike_expenses, name='list_bike_expenses'),
    path('delete-expense/<int:expense_id>/', views.delete_bike_expense, name='delete_bike_expense'),
]