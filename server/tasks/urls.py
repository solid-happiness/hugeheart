from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_tasks),
    path('search/', views.search),
    path('create/', views.create_task),
    path('<int:task_id>/', views.get_task),
    path('change-status/', views.change_task_status)
]