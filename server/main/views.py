from django.http import JsonResponse

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
