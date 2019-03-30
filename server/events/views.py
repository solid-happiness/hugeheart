import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Event


def get_events(request):
    """
    View, которая возвращает JSON с информацией о мероприятиях.
    Доступна по /api/events
    """
    events = Event.objects.all()
    return JsonResponse({
        'events': [event.to_dict() for event in events],
    })


def get_event(request, event_name):
    """
    View, которая возвращает JSON с информацией о мероприятии event_name.
    Доступна по /api/events/<event_name>
    """
    try:
        event = Event.objects.get(slug=event_name)
    except Event.DoesNotExist:
        return JsonResponse({})

    return JsonResponse(event.to_dict())
