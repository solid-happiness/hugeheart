import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.validators import ValidationError
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

from .models import Partner, UserProfile, InteractionHistory


def get_partners(request):
    """
    View, которая возвращает JSON с информацией о партнерах.
    Доступна по /api/partners
    """
    partners = Partner.objects.all()
    return JsonResponse({
        'partners': [partner.to_dict() for partner in partners],
    })


def get_partner(request, partner_name):
    """
    View, которая возвращает JSON с информацией о партнере partner_name.
    Доступна по /api/partners/<partner_name>
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
        'volunteers': [user.to_dict() for user in users if user.role == 'volunteer']
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


def log_out_view(request):
    logout(request)
    return JsonResponse({'auth': False})


@login_required
def create_user_profile(request):
    try:
        user = UserProfile.objects.create_user(
            username=request.POST.get('username'),
            email=request.POST.get('email'),
            password=validate_password(request.POST.get('password')),
            first_name=request.POST.get('firstName') or '',
            last_name=request.POST.get('lastName') or '',
            short_description=request.POST.get('shortDescription') or '',
            phone_number=request.POST.get('phoneNumber') or '',
            role=request.POST.get('role'),
        )
        for _, file_content in request.FILES.items():
            user.photo = file_content
        user.save()

        return JsonResponse({**user.to_dict()})
    except IntegrityError:
        return JsonResponse({'error': 'Пользователь с таким ником уже существует'})
    except ValidationError:
        return JsonResponse({'error': 'Слишком легкий пароль'})


@login_required
def create_interaction_history(request):
    params = json.loads(request.body.decode('utf8'))
    slug = params.get('partner')
    new_history = InteractionHistory.objects.create(
        partner=Partner.objects.get(slug=slug),
        interaction_link=params.get('interactionLink'),
        date_time=params.get('dateTime'),
        about=f'{params.get('about')} \nАвтор: {request.user.userprofile.get_full_name() or request.user.userprofile.username}',
        result=params.get('result'),
    )
    return get_partner(request, slug)
