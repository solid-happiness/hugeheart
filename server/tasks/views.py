from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import Task
from events.models import Event


@login_required
def get_tasks(request):
    """
    View, которая возвращает JSON с информацией о задачах, автором которых является конкретный пользователь.
    Доступна по /api/tasks
    """
    user = request.user

    if user.userprofile.role == 'admin':
        tasks = Task.objects.all()
    elif user.userprofile.role == 'organizer':
        try:
            events = Event.objects.filter(responsible=user)
        except Event.DoesNotExist:
            return JsonResponse({})

        tasks = [event.tasks.get() for event in events]

    elif user.userprofile.role == 'volunteer':
        try:
            tasks = Task.objects.filter(task_performers=user)
        except Task.DoesNotExist:
            return JsonResponse({})

    return JsonResponse({
        'tasks': [task.to_dict() for task in tasks],
    })


def get_task(request, task_id):
    """
    View, которая возвращает JSON с информацией о задаче, с id task_id.
    Доступна по /api/tasks/<task_id>
    """
    return JsonResponse()


def search(request):
    query = request.GET.get('query')
    tasks = Task.objects.filter(title__icontains=query)

    return JsonResponse({
        'tasks': [task.to_dict() for task in tasks],
        'query': query,
    })
