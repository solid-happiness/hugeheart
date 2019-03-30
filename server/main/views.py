import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Partner, UserProfile


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
        return JsonResponse({'auth': 'true', **request.user.userprofile.to_dict()})
    else:
        return JsonResponse({'auth': 'false'})



def login_view(request):
    params = json.loads(request.body.decode('utf8'))
    username = params.get('username')
    password = params.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'auth': 'true', **user.userprofile.to_dict()})

    else:
        return JsonResponse({'auth': 'false'})
