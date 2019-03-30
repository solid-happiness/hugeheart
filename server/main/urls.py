from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('partners/', views.get_partners),
    path('partners/<slug:partner_name>/', views.get_partner),
    path('volunteers/', views.get_volunteers),
]