from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('logout/', views.log_out_view),
    path('partners/', views.get_partners),
    path('partners/<slug:partner_name>/', views.get_partner),
    path('volunteers/', views.get_volunteers),
    path('user-profile/', views.get_user_profile),
    path('user-profile/create/', views.create_user_profile),
    path('create-interaction/', views.create_interaction_history),
    path('become-partner/', views.become_partner),
    path('become-volunteer/', views.become_volunteer),
]
