from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_events),
    path('<slug:event_name>/', views.get_event),
]
