from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from frontend.views import CSRFAwareIndexView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('api/catalog/', include('backendApps.catalog.urls')),
    path('api/support/', include('backendApps.customer_support.urls')),
    path('api/accounts/', include('backendApps.accounts.urls')),
    path('api/orders/', include('backendApps.orders.urls')),
    path('api/specs/', include('backendApps.specs_types.urls')),
    path('api/admin-expenses/', include('backendApps.expenses.urls')),
    path('api/blogs/', include('backendApps.blogs.urls')),
]

# Serve static files in production
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# React frontend (exclude static/api/admin/accounts paths)
urlpatterns += [
    path("", CSRFAwareIndexView.as_view(), name="home"),
    re_path(r"^(?!static/|admin/|api/|accounts/).*", CSRFAwareIndexView.as_view()),
]