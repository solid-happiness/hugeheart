import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.password_validation import validate_password
from django.core.validators import ValidationError
from django.db import IntegrityError

from .models import Partner, UserProfile
from events import models
from django.contrib.auth import authenticate


def get_partners(request):
    """
    View, которая возвращает JSON с информацией о партнерах.
    Доступна по /api/partners
    """
    partners = Partner.objects.all()
    volunteers = [volunteer.to_dict()
                  for volunteer in UserProfile.objects.all() if volunteer.role == '1']
    return JsonResponse({
        'partners': [partner.to_dict() for partner in partners],
    })


def get_partner(request, partner_name):
    """
    View, которая возвращает JSON с информацией о партнере partner_name.
    Доступна по /api/events/<partner_name>
    """
    try:
        partner = Partner.objects.get(slug=partner_name)
    except Partner.DoesNotExist:
        return JsonResponse({})

    return JsonResponse(partner.to_dict())


def get_volunteers(request):
    """
    View, которая возвращает JSON с информацией о волонтерах.
    Доступна по /api/volunteers
    """
    users = UserProfile.objects.all()
    return JsonResponse({
        'volunteers': [user.to_dict() for user in users if user.role == '1']
    })


def get_user_profile(request):
    if request.user.is_authenticated:
        return JsonResponse({'auth': True, **request.user.userprofile.to_dict()})
    else:
        return JsonResponse({'auth': False})


def login_view(request):
    params = json.loads(request.body.decode('utf8'))
    username = params.get('username')
    password = params.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'auth': True, **user.userprofile.to_dict()})

    else:
        return JsonResponse({'auth': False})


def create_user_profile(request):
    try:
        user = UserProfile.objects.create_user(
            username=request.POST.get('username'), 
            email=request.POST.get('email'), 
            password=validate_password(request.POST.get('password')), 
            first_name=request.POST.get('first_name') or '', 
            last_name=request.POST.get('last_name') or '',
            short_description = request.POST.get('short_description') or '',
            phone_number = request.POST.get('phone_number') or '',
            role = request.POST.get('role'),
        )
        for _, file_content in request.FILES.items():
            user.photo=file_content
        user.save()
        
        return JsonResponse({**user.to_dict()})
    except IntegrityError:
        return JsonResponse({'error': 'Пользователь с таким ником уже существует'})
    except ValidationError:
        return JsonResponse({'error': 'Слишком легкий пароль'})

    

