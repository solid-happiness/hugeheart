import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Partner, UserProfile
from events import models

def main(request):
    """
    View, которая возвращает JSON с информацией для главной страницы.
    Доступна по /api/
    """
    events = models.Event.objects.all()
    partners = Partner.objects.all()
    volunteers = [volunteer.to_dict() for volunteer in UserProfile.objects.all() if volunteer.role == '1']
    return JsonResponse({
        'events': [event.to_dict() for event in events],
        'partners': [partner.to_dict() for partner in partners],
        'volunteers': volunteers
    })


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
